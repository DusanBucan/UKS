from django.db import models

# Create your models here.
from github_user.models import GitHubUser
from label.models import Label


class Project(models.Model):
    name = models.CharField('name', max_length=500)
    labels = models.ManyToManyField(Label)
    users = models.ManyToManyField(GitHubUser, verbose_name='users')
    deleted = models.BooleanField(default=False)

    def set_labels(self, labels):
        self.labels=labels

    def set_users(self, users):
        self.users=users
