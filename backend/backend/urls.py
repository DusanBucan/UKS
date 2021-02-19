"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from backend.jwt import RichTokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/projects/', include('project.urls', namespace='project')),
    path('api/labels/', include('label.urls', namespace='label')),
    path('api/milestones/', include('milestone.urls', namespace='milestone')),
    path('api/commit/', include('commit.urls', namespace='commit')),
    path('api/github_users/', include('github_user.urls', namespace='github_user')),
    path('api/token/', RichTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/tasks/', include('task.urls', namespace='task')),
    path('api/wiki/', include('wiki.urls',namespace='wiki')),
    path('api/teams/', include('team.urls',namespace='team')),
]
