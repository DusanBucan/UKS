from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from task.serializer import *

# http://locahost:8000/api/tasks/


def get_queryset_tasks(request):
   return Task.objects.all()


class TaskList(APIView):

    def get(self, request, format=None):
        tasks = get_queryset_tasks(request)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        data = request.data
        data['author'] = request.user.id
        serializer = CreateTaskSerializer(data=data)
        if serializer.is_valid():
            task = serializer.save()
            return Response('SUCCESS', status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE', 'GET', 'PUT'])
def api_task_detail(request, pk):
    try:
        task = Task.objects.get(id=pk)
    except (KeyError, Task.DoesNotExist) as ex:
        return Response({'error': 'invalid or missing object id'}, status=status.HTTP_404_NOT_FOUND,
                        content_type="application/json")
    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        task.delete()
        return Response(True, status=status.HTTP_200_OK)

    request.data['author'] = task.author.id
    serializer = CreateTaskSerializer(task, data=request.data)
    if serializer.is_valid():
        task = serializer.save()
        task.save()
        return Response('SUCCESS', status=status.HTTP_200_OK,
                        content_type="application/json")
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, content_type="application/json")


@api_view(['GET'])
def api_tasks_by_milestone(request, pk):
    tasks = Task.objects.filter(milestones__in=[pk])
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def api_tasks_by_project(request, pk):
    tasks = Task.objects.filter(project_id=pk)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)
