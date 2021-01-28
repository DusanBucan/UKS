
from django.db import models

# Create your models here.
from label.models import Label
from project.models import Project


class Task(models.Model):
    title = models.CharField('title', max_length=500)
    description = models.CharField('description', max_length=1000)
    due_date=models.DateTimeField('due date')
    task_states_choice = (('open', 'open'), ('in progress', 'in progress'), ('closed', 'closed'))
    task_state = models.CharField('task state', max_length=300, choices=task_states_choice)
    project = models.ForeignKey(Project, verbose_name='project', on_delete=models.CASCADE)
    labels = models.ManyToManyField(Label)
    #many to many user