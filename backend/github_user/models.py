from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
# Create your models here.
from django.utils import timezone


class UserProxy(User):
    class Meta:
        proxy = True

    def __str__(self):
        return self.first_name + ' ' + self.last_name + ' (' + self.email + ')'


class GitHubUser(models.Model):
    user = models.OneToOneField(UserProxy, related_name='profile', on_delete=models.PROTECT)
    photo = models.CharField('photo', max_length=500)
    github_profile_url = models.CharField('github profile url', max_length=500)
    organization = models.TextField('organisation', max_length=500)
    member_since = models.DateTimeField('member since', default=timezone.now)
    skype = models.TextField('skype', max_length=500)
    twitter = models.TextField('twitter', max_length=500)
    linkedin = models.TextField('linkedin', max_length=500)


    def __str__(self):
        return self.username

    class Meta:
        verbose_name = 'GitHub user'
        verbose_name_plural = 'GitHub users'
