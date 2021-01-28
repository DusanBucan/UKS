from django.db import models

# Create your models here.
from github_user.models import GitHubUser
from project.models import Project

#fali nam branch, issue, repository

class Commit(models.Model):
    date = models.DateTimeField('date')
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user=models.ForeignKey(GitHubUser, verbose_name='user', on_delete=models.CASCADE)
    #many to many user details - izmeniti da pripada jesnom useru