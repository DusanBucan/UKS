from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .rest import *

app_name = 'wiki'

urlpatterns=[
    path('', WikiList.as_view()),
    path('<int:fk>/', api_wiki_get_project_wiki),
    path('du/<int:pk>/', api_wiki_delete_update)
]