from django.urls import path

from .rest import *

app_name = 'label'

urlpatterns = [
    path('', LabelList.as_view()),
    path('add/<int:pk>/', api_label_add),
    path('<int:pk>/', api_label_detail)
]
