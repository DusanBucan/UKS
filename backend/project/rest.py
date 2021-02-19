from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from github_user.models import GitHubUser

from project.serializers import *


def get_queryset_projects(request):
    if request.user.is_staff:
        return Project.objects.all()
    github_user = request.user.profile
    return Project.objects.filter(users_id=github_user.id)


class ProjectList(APIView):

    def get(self, request, format=None):
        projects = get_queryset_projects(request)
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    @permission_classes([AllowAny])
    def post(self, request, format=None):
        serializer = CreateProjectSerializer(data=request.data)
        if serializer.is_valid():
            project = serializer.save()
            user = GitHubUser.objects.get(id=request.user.id)
            project.users.add(user)
            return Response("Project successfully added.", status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE', 'GET', 'PUT'])
def api_project_detail(request, pk):
    try:
        project = Project.objects.get(id=pk)
    except (KeyError, Project.DoesNotExist) as ex:
        return Response({'error': 'invalid or missing object id'}, status=status.HTTP_404_NOT_FOUND,
                        content_type="application/json")
    if request.method == 'GET':
        serializer = ProjectSerializer(project)
        if not project.deleted:
            return Response(serializer.data)
        return Response({'error': 'invalid or missing object id'}, status=status.HTTP_404_NOT_FOUND,
                        content_type="application/json")
    elif request.method == 'DELETE':
        project.deleted = True
        project.save()
        return Response({'success': 'project successfully deleted'}, status=status.HTTP_200_OK)

    serializer = CreateProjectSerializer(project, data=request.data)
    if serializer.is_valid():

        project = serializer.save()
        project.save()
        return Response({'success': 'project successfully edited'}, status=status.HTTP_200_OK,
                        content_type="application/json")
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, content_type="application/json")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_projects_by_user(request):
    projects = Project.objects.filter(users__in=[request.user.id])
    return Response(ProjectSerializer(projects, many=True).data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_project_labels(request, pk):
    labels = Project.objects.get(id=pk).labels
    return Response(LabelSerializer(labels, many=True).data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_project_users(request, pk):
    users = Project.objects.get(id=pk).users
    return Response(GitHubUserSerializer(users, many=True).data)
