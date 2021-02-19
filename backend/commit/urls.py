from django.urls import path

from .rest import *

app_name = 'commit'

urlpatterns = [
    path('', api_commit_new),
    path('<int:pk>/', api_commit_detail),
    path('project/<int:pk>/', api_commit_by_project),
    path('project/<int:ppk>/<int:upk>/', api_commit_by_project_and_user),
    path('project/<int:ppk>/order/<int:o>/', api_commit_by_project_and_order),
]
