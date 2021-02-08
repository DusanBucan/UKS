from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from project.models import Project
from label.serializers import *

def get_queryset_projects(request):
    return Label.objects.all()

class LabelList(APIView):
    #permission_classes=[permissions.IsAuthenticated]

    def get(self, request, format=None):
        labels = get_queryset_projects(request)
        serializer=LabelSerializer(labels, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CreateLabelSerializer(data=request.data)
        if serializer.is_valid():
            print('serializer valid')
            label = serializer.save()
            label.save()
            return Response("Label successfully added.", status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE', 'GET', 'PUT'])
def api_label_detail(request, pk):
    try:
        label=Label.objects.get(id=pk)
        # if request.user.is_staff:
        #     project = Project.objects.get(id=pk, obrisan=False)
        # else:
        #     radnik = request.user.profile
        #     tender = Tender.objects.get(odg_lice=radnik, id=pk, obrisan=False)
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
