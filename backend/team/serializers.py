from rest_framework import serializers
from github_user.serializers import *
from project.serializers import *
from team.models import *

class TeamSerializer(serializers.ModelSerializer):
    git_users = GitHubUserSerializer(read_only=True, many=True)
    projects=ProjectSerializer(read_only=True, many=True)
    class Meta:
        model = Team
        fields = ('id', 'name', 'git_users','projects')


class CreateTeamSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=500)
    git_users = serializers.ListField()
    projects = serializers.ListField()

    def create(self, validated_data):
        git_users2 = validated_data['git_users']
        projects2 = validated_data['projects']
        the_git_users = []
        the_projects = []
        team = Team.objects.create(name=validated_data['name'])
        for git_user_id in git_users2:
            git_user = GitHubUser.objects.get(id=git_user_id)
            the_git_users.append(git_user)
        team.git_users.set(the_git_users)
        for project_id in projects2:
            project = Project.objects.get(id=project_id)
            the_projects.append(project)
        team.projects.set(the_projects)
        return team

    def update(self, instance, validated_data):
        git_users2 = validated_data['git_users']
        the_git_users = []
        for git_user_id in git_users2:
            git_user = GitHubUser.objects.get(id=git_user_id)
            the_git_users.append(git_user)
        instance.git_users.set(the_git_users)

        projects2 = validated_data['projects']
        the_projects = []
        for project_id in projects2:
            project = Project.objects.get(id=project_id)
            the_projects.append(project)

        instance.projects.set(the_projects)
        return instance
