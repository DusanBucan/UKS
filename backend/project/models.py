from django.db import models

# Create your models here.
from gitlab_user.models import GitLabUser
from label.models import Label


class Project(models.Model):
    name = models.CharField('name')
    labels = models.ManyToManyField(Label)
    users = models.ManyToManyField(GitLabUser, verbose_name='users')