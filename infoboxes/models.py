from django.db import models

class Box(models.Model):
    title = models.CharField(max_length=200)
    text = models.CharField(max_length=500)
    date_of_creation = models.DateTimeField('date of creation')

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('-date_of_creation',)

class Tag(models.Model):
    title = models.CharField(max_length=100)
    boxes = models.ManyToManyField(Box)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('title',)