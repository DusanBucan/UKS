from django.db import models

from github_user.models import GitHubUser
from project.models import Project


class Commit(models.Model):
    date = models.DateTimeField('date')
    summary = models.CharField('summary', max_length=100)
    description = models.CharField('description', max_length=1000)
    hash = models.CharField('hash', max_length=1000)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(GitHubUser, verbose_name='user', on_delete=models.CASCADE)
