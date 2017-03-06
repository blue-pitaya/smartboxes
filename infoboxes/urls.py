from django.conf.urls import url

from . import views

app_name = 'infoboxes'

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^add/box/$', views.add, name='add'),
    url(r'^add/tag/$', views.add_tag, name='add_tag'),
    url(r'^graph/$', views.GraphView.as_view(), name='graph'),
]
