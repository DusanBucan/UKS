from django.urls import path

from .rest import *

app_name = 'milestone'

urlpatterns = [
    path('', api_milestone_new),
    path('<int:pk>/', api_milestone_detail),
    path('project/<int:pk>/', api_milestone_by_project)
]
