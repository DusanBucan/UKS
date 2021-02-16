from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .rest import *

app_name = 'task'

urlpatterns=[
    path('', TaskList.as_view()),
    path('<int:pk>/', api_task_detail)
]