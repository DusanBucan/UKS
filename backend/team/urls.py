from django.urls import path

from .rest import *

app_name = 'team'

urlpatterns = [
    path('', TeamList.as_view()),
    path('<int:pk>/', api_team_detail),
     path('add-project/<str:projName>/<int:id>/', api_add_project_team),

]
