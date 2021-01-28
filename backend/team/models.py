from django.db import models

# Create your models here.
from github_user.models import UserProxy, GitHubUser


class Team(models.Model):
    #user_proxyy = models.OneToOneField(UserProxy, related_name='profile', on_delete=models.PROTECT)
    git_users = models.ManyToManyField(GitHubUser)
