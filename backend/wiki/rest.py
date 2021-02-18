from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from wiki.models import Wiki
from wiki.serializers import WikiSerializer,CreateWikiSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny

def get_queryset_projects(request):
    return Wiki.objects.all()

class WikiList(APIView):
    @permission_classes([AllowAny])
    def post(self, request, format=None):
        serializer = CreateWikiSerializer(data=request.data)
        if serializer.is_valid():
            label = serializer.save()
            label.save()
            return Response("Wiki successfully added.", status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def api_wiki_get_project_wiki(request, fk):
    try:
        wiki = Wiki.objects.get(project_id=fk)
    except (KeyError, Wiki.DoesNotExist) as ex:
        return Response({'error': 'invalid or missing object id'}, status=status.HTTP_404_NOT_FOUND,
                        content_type="application/json")
    if request.method == 'GET':
        serializer = WikiSerializer(wiki)
        return Response(serializer.data)

@api_view(['PUT','DELETE'])
def api_wiki_delete_update(request,pk):
    try:
        wiki = Wiki.objects.get(id=pk)
    except (KeyError, Wiki.DoesNotExist) as ex:
        return Response({'error': 'invalid or missing object id'}, status=status.HTTP_404_NOT_FOUND,
                        content_type="application/json")
    if request.method == 'DELETE':
        wiki.delete()
        return Response({'success': 'wiki successfully deleted'}, status=status.HTTP_200_OK)

    serializer = CreateWikiSerializer(wiki, data=request.data)
    if serializer.is_valid():
        wiki = serializer.save()
        wiki.save()
        return Response({'success': 'wiki successfully edited'}, status=status.HTTP_200_OK,
                        content_type="application/json")
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, content_type="application/json")