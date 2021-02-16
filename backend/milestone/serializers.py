from rest_framework import serializers

from milestone.models import Milestone

from project.serializers import *


class MilestoneSerializer(serializers.ModelSerializer):
    labels = LabelSerializer(read_only=True, many=True)

    class Meta:
        model = Milestone
        fields = ('id', 'title', 'description', 'start_date', 'due_date', 'project', 'tasks', 'labels')


class CreateMilestoneSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=500)
    description = serializers.CharField(max_length=1000)
    start_date = serializers.DateTimeField()
    due_date = serializers.DateTimeField()
    project = serializers.IntegerField()
    tasks = serializers.ListField()
    labels = serializers.ListField()

    def create(self, validated_data):
        project_id = validated_data['project']
        milestone = Milestone.objects.create(title=validated_data['title'],
                                             description=validated_data['description'],
                                             start_date=validated_data['start_date'],
                                             due_date=validated_data['due_date'],
                                             project=Project.objects.get(id=project_id))

        set_labels_and_tasks(milestone, validated_data)
        return milestone

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.due_date = validated_data.get('due_date', instance.due_date)
        instance.project = Project.objects.get(id=validated_data.get('project', instance.project))
        set_labels_and_tasks(instance, validated_data)
        return instance


def set_labels_and_tasks(milestone, validated_data):
    # todo dodati kasnije task
    labels_ = validated_data['labels']
    tasks_ = validated_data['tasks']
    the_labels = [Label.objects.get(id=label_id) for label_id in labels_]
    # the_tasks = [Task.objects.get(id=task_id) for task_id in tasks_]
    milestone.labels.set(the_labels)
    # milestone.tasks.set(the_tasks)
