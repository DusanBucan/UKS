from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .rest import *

app_name='label'

urlpatterns=[
    path('', LabelList.as_view()),
    path('<int:pk>/', api_label_detail)
]