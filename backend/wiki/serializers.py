from rest_framework import serializers
from project.serializers import ProjectSerializer
from project.models import Project

from wiki.models import Wiki
from django.db import models

class WikiSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True, many=False)
    class Meta:
        model = Wiki
        fields = ('id', 'project', 'text')


class CreateWikiSerializer(serializers.Serializer):
    #id = models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')
    project=serializers.IntegerField()
    text= serializers.CharField(max_length=1000)

    def create(self, validated_data):
        _project = Project.objects.get(id=validated_data['project'])
        new_wiki = Wiki.objects.create(
            project=_project,
            text=validated_data['text'],
        )
        return new_wiki

    def update(self, instance, validated_data):
        instance.text = validated_data.get('text', instance.text)
        return instance
