from rest_framework import serializers

from project.serializers import *
from task.models import Task
from project.models import Project
from github_user.models import GitHubUser
from milestone.serializers import *


class TaskSerializer(serializers.ModelSerializer):
    assignee = GitHubUserSerializer(read_only=True, many=False)
    author = GitHubUserSerializer(read_only=True, many=False)
    project = ProjectSerializer(read_only=True, many=False)
    labels = LabelSerializer(read_only=True, many=True)
    milestones = MilestoneSerializer(read_only=True, many=True)

    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'due_date', 'assignee', 'author', 'labels', 'project', 'opened',
                  'task_state', 'milestones')


class CreateTaskSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=500)
    description = serializers.CharField(max_length=1000)
    due_date = serializers.DateTimeField()
    assignee = serializers.CharField(max_length=500)
    author = serializers.IntegerField()
    task_state = serializers.CharField(max_length=500)
    labels = serializers.ListField()
    project = serializers.IntegerField()
    opened = serializers.BooleanField()


    def create(self, validated_data):
        _labels = []
        _assignee = GitHubUser.objects.get(id=validated_data['assignee'])
        _author = GitHubUser.objects.get(id=validated_data['author'])
        _project = Project.objects.get(id=validated_data['project'])

        for lab_id in validated_data['labels']:
            _labels.append(Label.objects.get(id=lab_id))

        new_task = Task.objects.create(
            title=validated_data['title'],
            description=validated_data['description'],
            due_date=validated_data['due_date'],
            task_state='open',
            assignee=_assignee,
            author=_author,
            project=_project,
            opened=True,
        )

        new_task.labels.set(_labels)

        return new_task

    def update(self, instance, validated_data):
        _labels = []
        _assignee = GitHubUser.objects.get(id=validated_data['assignee'])

        for lab_id in validated_data['labels']:
            label = Label.objects.get(id=lab_id)
            _labels.append(label)

        instance.labels.set(_labels)
        instance.assignee = _assignee
        instance.title = validated_data['title']
        instance.due_date = validated_data['due_date']
        instance.description = validated_data['description']
        instance.opened = validated_data['opened']
        instance.task_state = validated_data['task_state']

        return instance
