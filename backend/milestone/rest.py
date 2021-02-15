from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse

from milestone.serializers import *
from project.models import Project


def get_queryset_milestones(request):
    return Milestone.objects.all()


class MilestoneList(APIView):
    def get(self, request, format=None):
        print("get alll")
        milestones = get_queryset_milestones(request)
        serializer = MilestoneSerializer(milestones, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        print("post")
        serializer = CreateMilestoneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("Milestone successfully added.", status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE', 'GET', 'PUT'])
def api_milestone_detail(request, pk):
    try:
        milestone = Milestone.objects.get(id=pk)
    except (KeyError, Milestone.DoesNotExist) as ex:
        return Response({'error': 'Invalid or missing object id'}, status=status.HTTP_404_NOT_FOUND,
                        content_type="application/json")
    if request.method == 'GET':
        print("get")
        serializer = MilestoneSerializer(milestone)
        if not milestone.deleted:
            return JsonResponse(serializer.data)
        return Response({'error': 'Invalid or missing object id'}, status=status.HTTP_404_NOT_FOUND,
                        content_type="application/json")
    elif request.method == 'DELETE':

        print("delete")
        milestone.deleted = True
        milestone.save()
        return Response({'success': 'Milestone successfully deleted'}, status=status.HTTP_200_OK)
    print("put")
    serializer = CreateMilestoneSerializer(milestone, data=request.data)
    if serializer.is_valid():
        milestone = serializer.save()
        milestone.save()
        return Response({'success': 'Milestone successfully edited'}, status=status.HTTP_200_OK,
                        content_type="application/json")
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, content_type="application/json")
