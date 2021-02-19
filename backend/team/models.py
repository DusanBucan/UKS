from django.db import models

# Create your models here.
from github_user.models import UserProxy, GitHubUser
from project.models import Project


class Team(models.Model):
    name = models.CharField('name', max_length=500)
    git_users = models.ManyToManyField(GitHubUser)
    projects = models.ManyToManyField(Project)
    deleted = models.BooleanField(default=False)
