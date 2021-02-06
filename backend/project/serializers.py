from rest_framework import serializers

from github_user.serializers import *
from project.models import *
from label.serializers import *
from project.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    labels = LabelSerializer(read_only=True, many=True)
    users = GitHubUserSerializer(read_only=True, many=True)

    class Meta:
        model = Project
        fields = ('name', 'labels', 'users')

class CreateProjectSerializer(serializers.Serializer):
    name=serializers.CharField(max_length=500)
    labels=serializers.ListField()
    users = serializers.ListField()

    def create(self, validated_data):
        labels2 = validated_data['labels']
        users2=validated_data['users']
        the_labels=[]
        the_users=[]
        project = Project.objects.create(name=validated_data['name'])
        for lab_id in labels2:
            label = Label.objects.get(id=lab_id)
            the_labels.append(label)
        project.labels.set(the_labels)
        for user_id in users2:
            user = User.objects.get(id=user_id)
            the_users.append(user)
        project.users.set(the_users)
        return project

    def update(self, instance, validated_data):
        instance.name=validated_data.get('name', instance.name)

        labels2 = validated_data['labels']
        the_labels = []
        for lab_id in labels2:
            label = Label.objects.get(id=lab_id)
            the_labels.append(label)
        instance.labels.set(the_labels)

        users2 = validated_data['users']
        the_users = []
        for user_id in users2:
            user = User.objects.get(id=user_id)
            the_users.append(user)

        instance.users.set(the_users)
        return instance
