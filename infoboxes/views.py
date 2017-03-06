from django.shortcuts import render
from django.views import generic
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils import timezone
from .models import *
from .forms import *

class IndexView(generic.ListView):
    template_name = 'infoboxes/index.html'
    context_object_name = 'boxes_list'

    def get_queryset(self):
        return Box.objects.all()


def add(request):
    template_name = 'infoboxes/add/box.html'

    if request.method == 'POST':
        form = NewBoxForm(request.POST)

        if form.is_valid():
            b = Box(title = form.cleaned_data['box_title'], text = form.cleaned_data['box_text'], date_of_creation = timezone.now())
            b.save()

            for tag in form.cleaned_data['box_tags']:
                tag.boxes.add(b)

            return HttpResponseRedirect(reverse('infoboxes:index'))

    else:
        form = NewBoxForm()

    return render(request, template_name, {'form': form})


def add_tag(request):
    template_name = 'infoboxes/add/tag.html';

    if request.method == 'POST':
        form = NewTagForm(request.POST)

        if form.is_valid():
            t = Tag(title = form.cleaned_data['tag_name'])
            t.save()

            return HttpResponseRedirect(reverse('infoboxes:index'))

    else:
        form = NewTagForm()

    return render(request, template_name, {'form': form})

class GraphView(generic.ListView):
    template_name = 'infoboxes/graph.html'
    context_object_name = 'tags_list'

    def get_queryset(self):
        return Tag.objects.all()