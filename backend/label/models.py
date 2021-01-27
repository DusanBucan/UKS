from django.db import models

# Create your models here.
class Label(models.Model):
    title = models.CharField(max_length=500)
    description=models.CharField(max_length=1000)
    color = models.CharField(max_length=10, null=False, default='#ffffff')



