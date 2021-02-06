from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .rest import *

app_name='project'

urlpatterns=[
    path('', ProjectList.as_view()),
    path('<int:pk>/', api_project_detail)
]