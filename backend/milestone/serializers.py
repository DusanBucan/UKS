from rest_framework import serializers

from milestone.models import Milestone

from project.models import Project


class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = ('id', 'title', 'description', 'start_date', 'due_date', 'project')


class CreateMilestoneSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=500)
    description = serializers.CharField(max_length=1000)
    start_date = serializers.DateField()
    due_date = serializers.DateField()
    project = serializers.IntegerField()

    def create(self, validated_data):
        project_id = validated_data['project']
        milestone = Milestone.objects.create(title=validated_data['title'],
                                             description=validated_data['description'],
                                             start_date=validated_data['start_date'],
                                             due_date=validated_data['due_date'],
                                             project=Project.objects.get(id=project_id))
        return milestone

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.due_date = validated_data.get('due_date', instance.due_date)
        instance.project = Project.objects.get(id=validated_data.get('project', instance.project))
        return instance
