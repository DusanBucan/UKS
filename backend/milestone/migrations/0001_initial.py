# Generated by Django 3.1.5 on 2021-01-27 23:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('label', '0001_initial'),
        ('project', '0001_initial'),
        ('task', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Milestone',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=500, verbose_name='title')),
                ('description', models.CharField(max_length=1000, verbose_name='description')),
                ('start_date', models.DateTimeField(verbose_name='start date')),
                ('due_date', models.DateTimeField(verbose_name='due date')),
                ('labels', models.ManyToManyField(to='label.Label')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project.Project',
                                              verbose_name='project')),
                ('tasks', models.ManyToManyField(to='task.Task')),
            ],
        ),
    ]
