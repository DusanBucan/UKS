from rest_framework import serializers

from commit.models import Commit
from github_user.models import GitHubUser
from project.models import Project


class CommitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commit
        fields = ('id', 'date', 'hash', 'project', 'user')


class CreateCommitSerializer(serializers.Serializer):
    date = serializers.DateTimeField()
    hash = serializers.CharField(max_length=1000)
    project = serializers.IntegerField()
    user = serializers.IntegerField()

    def create(self, validated_data):
        project_id = validated_data['project']
        user_id = validated_data['user']
        commit = Commit.objects.create(date=validated_data['date'],
                                       hash=validated_data['hash'],
                                       project=Project.objects.get(id=project_id),
                                       user=GitHubUser.objects.get(id=user_id))
        return commit
