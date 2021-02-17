from django.db import models

# Create your models here.
from label.models import Label
from project.models import Project
from task.models import Task


class Milestone(models.Model):
    title = models.CharField('title', max_length=500)
    description = models.CharField('description', max_length=1000)
    start_date = models.DateField('start date')
    due_date = models.DateField('due date')
    project = models.ForeignKey(Project, verbose_name='project', on_delete=models.CASCADE)
    tasks = models.ManyToManyField(Task)
    deleted = models.BooleanField(default=False)
