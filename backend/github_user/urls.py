from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .rest import *

app_name = 'github_user'

urlpatterns = [
    path('', GithubUserList.as_view()),
    path('<int:pk>/', api_github_user_detail),
    path('loggedIn/', api_github_user_logged_in),
    path('get-github-user-by-name/<str:first_name>/<str:last_name>/', api_get_github_user_by_name)
]
