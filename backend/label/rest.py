from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from project.models import Project
from label.serializers import *
from rest_framework.views import APIView

def get_queryset_labels(request):
    return Label.objects.all()

class LabelList(APIView):
    # permission_classes=[permissions.IsAuthenticated]

    def get(self, request, format=None):
        labels = get_queryset_labels(request)
        serializer = LabelSerializer(labels, many=True)
        return Response(serializer.data)


@api_view(['DELETE', 'GET', 'PUT'])
def api_label_detail(request, pk):
    try:
        label = Label.objects.get(id=pk)
    except (KeyError, Project.DoesNotExist) as ex:
        return Response({'error': 'invalid or missing object id'}, status=status.HTTP_404_NOT_FOUND,
                        content_type="application/json")
    if request.method == 'GET':
        serializer = LabelSerializer(label)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        label.delete()
        return Response({'success': 'label successfully deleted'}, status=status.HTTP_200_OK)

    serializer = CreateLabelSerializer(label, data=request.data)
    if serializer.is_valid():
        label = serializer.save()
        label.save()
        return Response({'success': 'label successfully edited'}, status=status.HTTP_200_OK,
                        content_type="application/json")
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, content_type="application/json")


@api_view(['POST'])
def api_label_add(request, pk):
    serializer = CreateLabelSerializer(data=request.data)
    if serializer.is_valid():
        label = serializer.save()
        label.save()
        project = Project.objects.get(id=pk)
        project.labels.add(label)
        return Response("Label successfully added.", status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
