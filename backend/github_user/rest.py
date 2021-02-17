from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from project.models import Project
from team.models import Team
from django.db import connection
from rest_framework.permissions import IsAuthenticated, AllowAny
from project.serializers import ProjectSerializer
#from team.serializers import TeamSerializer

from github_user.models import GitHubUser
from github_user.serializers import *

def get_queryset_projects(request):
    return GitHubUser.objects.all()

class GithubUserList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        github_users = get_queryset_projects(request)
        serializer=GitHubUserSerializer(github_users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        githubSerializer = GitHubUserSerializer()
        serializer = githubSerializer.create(validated_data=request.data)
        githubUser = serializer.save()
        return Response("Label successfully added.", status=status.HTTP_201_CREATED)

#        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE', 'GET', 'PUT'])
#@permission_classes([IsAuthenticated])
def api_githubUser_detail(request, pk):
    try:
        githubUser = GitHubUser.objects.get(id=pk)
        # if request.user.is_staff:
        #     project = Project.objects.get(id=pk, obrisan=False)
        # else:
        #     radnik = request.user.profile
        #     tender = Tender.objects.get(odg_lice=radnik, id=pk, obrisan=False)
    except (KeyError, GithubUserList.DoesNotExist) as ex:
        return Response({'error': 'invalid or missing object id'}, status=status.HTTP_404_NOT_FOUND,
                        content_type="application/json")
    if request.method == 'GET':
        serializer = GitHubUserSerializer(githubUser)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        user = User.objects.get(pk = githubUser.user.pk)
        githubUser.delete()
        user.delete()
        return Response({'success': 'github user successfully deleted'}, status=status.HTTP_200_OK)
    serializer = GitHubUserSerializer()
    serilize = serializer.update(instance = githubUser, validated_data=request.data)
    serilize.save()
    return Response({'success': 'github user successfully edited'}, status=status.HTTP_200_OK,
                    content_type="application/json")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_githubUser_loggedIn(request):
    githubUser = GitHubUser.objects.get(id=request.user.id)
    return Response(GitHubUserSerializer(githubUser).data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_githubUser_projects(request):
    if request.method == 'GET':
        userId = request.user.id
        raw_query = "SELECT * FROM project_project_users where githubuser_id = "+str(userId)
        cursor = connection.cursor()
        cursor.execute(raw_query)
        projects = cursor.fetchall()
        users_projects = []
        for project in projects:
            try:
                users_projects.append(ProjectSerializer(Project.objects.get(id=project[1])).data)
            except(KeyError,Project.DoesNotExist) as ex:
                return Response({'error': 'invalid or missing object id'}, status=status.HTTP_404_NOT_FOUND,
                         content_type="application/json")
        return Response(users_projects)

def api_githubUser_teams(request):
    pass
    # if request.method == 'GET':
    #     userId = request.user.id
    #     raw_query = "SELECT * FROM team_team_git_users where githubuser_id = "+str(userId)
    #     cursor = connection.cursor()
    #     cursor.execute(raw_query)
    #     projects = cursor.fetchall()
    #     users_teams= []
    #     for team in users_teams:
    #         try:
    #             users_teams.append(TeamSerializer(Team.objects.get(id=team[1])).data)
    #         except(KeyError,Project.DoesNotExist) as ex:
    #             return Response({'error': 'invalid or missing object id'}, status=status.HTTP_404_NOT_FOUND,
    #                      content_type="application/json")
    #     return Response(users_teams)



