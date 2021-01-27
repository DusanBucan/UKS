from django.db import models

# Create your models here.
from gitlab_user.models import GitLabUser
from project.models import Project

#fali nam branch, issue, repository

class Commit(models.Model):
    date = models.DateTimeField('date')
    project = models.ForeignKey(Project)
    user=models.ForeignKey(GitLabUser, verbose_name='user')
    #many to many user details - izmeniti da pripada jesnom useru