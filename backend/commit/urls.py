from django.urls import path

from .rest import *

app_name = 'commit'

urlpatterns = [
    path('', api_commit_new),
    path('<int:pk>/', api_commit_detail),
    path('project/<int:pk>/', api_commit_by_project)
]
