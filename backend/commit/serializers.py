from rest_framework import serializers

from commit.models import Commit
from github_user.models import GitHubUser
from project.models import Project

from github_user.serializers import GitHubUserSerializer


class CommitSerializer(serializers.ModelSerializer):
    user = GitHubUserSerializer()

    class Meta:
        model = Commit
        fields = ('id', 'date', 'hash', 'summary', 'description', 'project', 'user')


class CreateCommitSerializer(serializers.Serializer):
    date = serializers.DateTimeField()
    hash = serializers.CharField(max_length=1000)
    summary = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=1000, min_length=0)
    project = serializers.IntegerField()
    user = serializers.IntegerField()

    def create(self, validated_data):
        project_id = validated_data['project']
        user_id = validated_data['user']
        commit = Commit.objects.create(date=validated_data['date'],
                                       hash=validated_data['hash'],
                                       summary=validated_data['summary'],
                                       description=validated_data['description'],
                                       project=Project.objects.get(id=project_id),
                                       user=GitHubUser.objects.get(id=user_id))
        return commit
