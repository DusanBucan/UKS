from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

from commit.serializers import *


@api_view(['POST'])
def api_commit_new(request):
    serializer = CreateCommitSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response('Commit successfully added.', status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, content_type="application/json")


@api_view(['GET'])
def api_commit_by_project(request, pk):
    commits = Commit.objects.filter(project_id=pk)
    serializer = CommitSerializer(commits, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def api_commit_detail(request, pk):
    try:
        commit = Commit.objects.get(id=pk)
    except (KeyError, Commit.DoesNotExist) as ex:
        return Response({'error': 'Invalid or missing object id'}, status=status.HTTP_404_NOT_FOUND,
                        content_type="application/json")

    serializer = CommitSerializer(commit)
    return JsonResponse(serializer.data)
