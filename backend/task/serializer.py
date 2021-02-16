from rest_framework import serializers

from project.serializers import *
from task.models import Task
from project.models import Project


class TaskSerializer(serializers.ModelSerializer):
    assignee = GitHubUserSerializer(read_only=True, many=False)
    author = GitHubUserSerializer(read_only=True, many=False)
    project = ProjectSerializer(read_only=True, many=False)
    labels = LabelSerializer(read_only=True, many=True)

    class Meta:
        model = Task
        fields = ('title', 'description', 'due_date', 'assignee', 'author', 'labels', 'project', 'opened', 'task_state')


class CreateTaskSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=500)
    description = serializers.CharField(max_length=1000)
    due_date = serializers.CharField(max_length=10)
    assignee = serializers.CharField(max_length=500)
    author = serializers.CharField(max_length=500)
    task_state = serializers.CharField(max_length=500)
    labels = serializers.ListField()
    project = serializers.CharField(max_length=500)
    opened = serializers.BooleanField()

    def create(self, validated_data):
        _labels = []
        _assignee = User.objects.get(id=validated_data['assignee'])
        _author = User.objects.get(id=validated_data['author'])
        _project = Project.objects.get(id=validated_data['project'])

        for lab_id in validated_data['labels']:
            _labels.append(Label.objects.get(id=lab_id))

        return Task.objects.create(
            title=validated_data['title'],
            description=validated_data['description'],
            due_date=validated_data['due_date'],
            task_state='open',
            labels=_labels,
            assignee=_assignee,
            author=_author,
            project=_project
        )

    def update(self, instance, validated_data):
        _labels = []
        _assignee = User.objects.get(id=validated_data['assignee'])
        _author = User.objects.get(id=validated_data['author'])

        for lab_id in validated_data['labels']:
            label = Label.objects.get(id=lab_id)
            _labels.append(label)

        instance.labels.set(_labels)
        instance.assignee.set(_assignee)
        instance.author.set(_author)
        instance.title.set(validated_data['title'])
        instance.due_date.set(validated_data['due_date'])
        instance.description.set(validated_data['description'])
        instance.opened.set(validated_data['opened'])
        instance.task_state.set(validated_data['task_state'])

        return instance
