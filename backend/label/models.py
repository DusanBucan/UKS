from django.db import models

# Create your models here.
class Label(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')
    title = models.CharField(max_length=500)
    description=models.CharField(max_length=1000)
    color = models.CharField(max_length=10, null=False, default='#ffffff')



