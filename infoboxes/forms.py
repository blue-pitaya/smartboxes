from django import forms
from .models import Tag

class NewBoxForm(forms.Form):
    box_title = forms.CharField(label='Tytuł', max_length=200)
    box_text = forms.CharField(label='Treść', max_length=500)
    box_tags = forms.ModelMultipleChoiceField(Tag.objects.all())

class NewTagForm(forms.Form):
    tag_name = forms.CharField(label='Nazwa', max_length=100)
