from django.db import models
from project.models import Project


class Wiki(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')
    project = models.ForeignKey(Project, verbose_name='project', on_delete=models.CASCADE)
    text = models.CharField('text', max_length=1000)
