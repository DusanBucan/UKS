# Generated by Django 3.1.5 on 2021-02-16 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='opened',
            field=models.BooleanField(verbose_name='opened'),
        ),
        migrations.AlterField(
            model_name='task',
            name='task_state',
            field=models.CharField(choices=[('open', 'open'), ('in progress', 'in progress'), ('in review', 'in review'), ('closed', 'closed')], max_length=300, verbose_name='task state'),
        ),
    ]
