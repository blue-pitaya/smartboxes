//zmienne globalne - czy nie zanieczyszczają kodu?
var gCanvas;
var screen;
var boxes;

//kilka stałych
const SCRREN_MOVE_DISTANCE = 50;

var Vector = function(x, y) {
	this.x = x;
	this.y = y;
};

var Object2d = function(position, size) {
    this.position = position;
    this.size = size;
    this.scale = new Vector(1, 1);

    this.getTopLeftCorner = function () {
		return new Vector(this.position.x - this.size.x / 2, this.position.y - this.size.y /2);
    };
};

var Surface = function (position, size) {
	Object2d.call(this, position, size);

	this.viewport = new Object2d(position, size);
	this.elements = [];

	this.draw = function (surface) {
		this.elements.push(surface);
    };

	this.renderBorder = function (offset, context) {
		context.fillStyle = 'black';
		context.beginPath();
		context.moveTo(this.getTopLeftCorner().x + offset.x, this.getTopLeftCorner().y + offset.y);
		context.lineTo(this.getTopLeftCorner().x + this.size.x + offset.x, this.getTopLeftCorner().y + offset.y);
		context.lineTo(this.getTopLeftCorner().x + this.size.x + offset.x, this.getTopLeftCorner().y + this.size.y + offset.y);
		context.lineTo(this.getTopLeftCorner().x + offset.x, this.getTopLeftCorner().y + this.size.y + offset.y);
		context.lineTo(this.getTopLeftCorner().x + offset.x, this.getTopLeftCorner().y + offset.y);
		context.closePath();
	};
};
Surface.prototype = Object.create(Object2d.prototype);
Surface.prototype.render = function (offset, context) {
	offset.x += this.viewport.getTopLeftCorner().x;
	offset.y += this.viewport.getTopLeftCorner().y;

	for(i = 0; i < this.elements.length; i++) {

		this.elements[i].render(offset, context);
	}
};

var Text = function (context, text) {
	this.font = 'Arial';
	this.color = 'blue';
	this.fontSize = '20';

	this.text = text;

	context.font = this.fontSize + 'pt ' + this.font;
	context.fillStyle = this.color;

	textDimension = context.measureText(text);
	Surface.call(this, new Vector(0, 0), new Vector(textDimension.width, parseFloat(this.fontSize)));

	this.render = function (offset, context) {
		context.font = this.fontSize + 'pt ' + this.font;
		context.fillStyle = this.color;
		context.textBaseline = 'middle';
		context.fillText(this.text, this.getTopLeftCorner().x + offset.x, this.position.y + offset.y);
		context.stroke();
    }
};
Text.prototype = Object.create(Surface.prototype);

var Box = function (context, position, title, text) {
	this.title = new Text(context, title);
	this.text = new Text(context, text);

	Surface.call(this, position, new Vector(this.title.size.x + 20, 50));

	this.draw(this.title);
	//this.draw(this.text);

	this.placeTitle = function () {
		this.title.position.x = this.size.x / 2;
		this.title.position.y = this.title.size.y;
    };

    this.placeTitle();

    this.render = function (offset, context) {
    	this.renderBorder(offset, context);
		Surface.prototype.render.call(this, offset, context);
    };

};
Box.prototype = Object.create(Surface.prototype);

function render() {
	var context = gCanvas.getContext('2d');

	context.clearRect(0, 0, gCanvas.width, gCanvas.height);

	screen.render(new Vector(0, 0), context);

	document.getElementById('info').innerHTML = screen.viewport.position.x + " " + screen.viewport.position.y;
}

function init() {
	gCanvas = document.getElementById('graph-canvas');
	var context = gCanvas.getContext('2d');

	screen = new Surface(new Vector(gCanvas.width / 2, gCanvas.height / 2), new Vector(gCanvas.width, gCanvas.height));
	boxes = [];

	boxes.push(new Box(context, new Vector(200,200), 'Pudełeczko', 'Opis pudełeczka'));

	screen.draw(boxes[0]);

	render();
}

function moveScreen(direction) {
	switch (direction) {
		case 'left': screen.viewport.position.x -= SCRREN_MOVE_DISTANCE; break;
		case 'right': screen.viewport.position.x += SCRREN_MOVE_DISTANCE; break;
		case 'down': screen.viewport.position.y += SCRREN_MOVE_DISTANCE; break;
		case 'up': screen.viewport.position.y -= SCRREN_MOVE_DISTANCE; break;

	}

	render();
}