from django.db import models

from project.models import Project


class Milestone(models.Model):
    title = models.CharField('title', max_length=500)
    description = models.CharField('description', max_length=1000)
    start_date = models.DateField('start date')
    due_date = models.DateField('due date')
    project = models.ForeignKey(Project, verbose_name='project', on_delete=models.CASCADE)
    deleted = models.BooleanField(default=False)
