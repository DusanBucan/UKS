from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from project.models import Project
from project.serializers import *

def get_queryset_projects(request):
    if request.user.is_staff:
        return Project.objects.all()
    github_user=request.user.profile
    return Project.objects.filter(users_id=github_user.id)

class ProjectList(APIView):
    #permission_classes=[permissions.IsAuthenticated]

    def get(self, request, format=None):
        projects = get_queryset_projects(request)
        serializer=ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CreateProjectSerializer(data=request.data)
        if serializer.is_valid():
            print('serializer valid')
            project = serializer.save()
            #project.users.add(request.user.profile)
            return Response("Project successfully added.", status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE', 'GET', 'PUT'])
def api_project_detail(request, pk):
    try:
        project=Project.objects.get(id=pk)
        # if request.user.is_staff:
        #     project = Project.objects.get(id=pk, obrisan=False)
        # else:
        #     radnik = request.user.profile
        #     tender = Tender.objects.get(odg_lice=radnik, id=pk, obrisan=False)
    except (KeyError, Project.DoesNotExist) as ex:
        return Response({'error': 'invalid or missing object id'}, status=status.HTTP_404_NOT_FOUND,
                        content_type="application/json")
    if request.method == 'GET':
        serializer = ProjectSerializer(project)
        if project.deleted==False:
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
