
from django.db import models

from label.models import Label
from github_user.models import GitHubUser
from project.models import Project

task_states_choice = \
        (('open', 'open'), ('in progress', 'in progress'), ('in review', 'in review'), ('closed', 'closed'))


class Task(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    title = models.CharField('title', max_length=500)
    description = models.CharField('description', max_length=1000)
    due_date = models.DateTimeField('due date')
    opened = models.BooleanField('opened')
    task_state = models.CharField('task state', max_length=300, choices=task_states_choice)
    project = models.ForeignKey(Project, verbose_name='project', on_delete=models.CASCADE)
    assignee = models.ForeignKey(GitHubUser, verbose_name='assignee', on_delete=models.CASCADE, related_name='assignee')
    author = models.ForeignKey(GitHubUser, verbose_name='author', on_delete=models.CASCADE, related_name='author')
    labels = models.ManyToManyField(Label)
