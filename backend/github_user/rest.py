from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from project.models import Project
from team.models import Team
from django.db import connection
from rest_framework.permissions import IsAuthenticated, AllowAny
from project.serializers import ProjectSerializer
# from team.serializers import TeamSerializer

from github_user.models import GitHubUser
from github_user.serializers import *


def get_queryset_projects(request):
    return GitHubUser.objects.all()


class GithubUserList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        github_users = get_queryset_projects(request)
        serializer = GitHubUserSerializer(github_users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        github_serializer = GitHubUserSerializer()
        serializer = github_serializer.create(validated_data=request.data)
        github_user = serializer.save()
        return Response("github user successfully added.", status=status.HTTP_201_CREATED)

@api_view(['DELETE', 'GET', 'PUT'])
# @permission_classes([IsAuthenticated])
def api_github_user_detail(request, pk):
    try:
        github_user = GitHubUser.objects.get(id=pk)
    except (KeyError, GithubUserList.DoesNotExist) as ex:
        return Response({'error': 'invalid or missing object id'}, status=status.HTTP_404_NOT_FOUND,
                        content_type="application/json")
    if request.method == 'GET':
        serializer = GitHubUserSerializer(github_user)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        user = User.objects.get(pk=github_user.user.pk)
        github_user.delete()
        user.delete()
        return Response({'success': 'github user successfully deleted'}, status=status.HTTP_200_OK)
    serializer = GitHubUserSerializer()
    serilize = serializer.update(instance=github_user, validated_data=request.data)
    serilize.save()
    return Response({'success': 'github user successfully edited'}, status=status.HTTP_200_OK,
                    content_type="application/json")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_github_user_logged_in(request):
    print("USER "+str(request.user.id))
    github_user = GitHubUser.objects.get(user_id=request.user.id)
    return Response(GitHubUserSerializer(github_user).data)


@api_view(['GET'])
@permission_classes([AllowAny])
def api_get_github_user_by_name(request, first_name, last_name):
    user = User.objects.get(first_name=first_name, last_name=last_name)
    github_user = GitHubUser.objects.get(user=user.id)
    return Response(GitHubUserSerializer(github_user).data)

