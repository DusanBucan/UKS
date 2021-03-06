from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

from commit.serializers import *


@api_view(['POST'])
def api_commit_new(request):
    request.data['user'] = request.user.id
    serializer = CreateCommitSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response('Commit successfully added.', status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, content_type="application/json")


@api_view(['GET'])
def api_commit_by_project(request, pk):
    commits = Commit.objects.filter(project_id=pk).order_by('date').reverse()
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


@api_view(['GET'])
def api_commit_by_project_and_user(request, ppk, upk):
    commits = Commit.objects.filter(project_id=ppk, user_id=upk).order_by('date').reverse()
    serializer = CommitSerializer(commits, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def api_commit_by_project_and_order(request, ppk, o):
    if o == 1:
        commits = Commit.objects.filter(project_id=ppk).order_by('date').reverse()
    else:
        commits = Commit.objects.filter(project_id=ppk).order_by('date')
    serializer = CommitSerializer(commits, many=True)
    return Response(serializer.data)