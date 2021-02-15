from django.urls import path

from .rest import *

app_name = 'milestone'

urlpatterns = [
    path('', MilestoneList.as_view()),
    path('<int:pk>/', api_milestone_detail)
]
