from django.urls import path

from .rest import *

app_name = 'project'

urlpatterns = [
    path('', ProjectList.as_view()),
    path('<int:pk>/', api_project_detail),
    path('user/', api_projects_by_user),
    path('<int:pk>/labels/', api_project_labels),
    path('<int:pk>/users/', api_project_users)
]
