from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from team.models import Team
from team.serializers import *
from project.models import *
def get_queryset_teams(request):
    if request.user.is_staff:
      return Team.objects.filter(deleted=False)
    github_user = request.user.profile
    return Team.objects.filter(git_users_id=github_user.id, deleted=False)


class TeamList(APIView):

    def get(self, request, format=None):
        teams = get_queryset_teams(request)
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data)

    @permission_classes([AllowAny])
    def post(self, request, format=None):
        serializer = CreateTeamSerializer(data=request.data)
        if serializer.is_valid():
            team = serializer.save()
            team.git_users.add(request.user.profile)
            team.save()
            return Response("Team successfully added.", status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['DELETE', 'GET', 'PUT'])
def api_team_detail(request, pk):
    try:
        team = Team.objects.get(id=pk)
    except (KeyError, Team.DoesNotExist) as ex:
        return Response({'error': 'invalid or missing object id'}, status=status.HTTP_404_NOT_FOUND,
                        content_type="application/json")
    if request.method == 'GET':
        serializer = TeamSerializer(team)
        if not team.deleted:
            return Response(serializer.data)
        return Response({'error': 'invalid or missing object id'}, status=status.HTTP_404_NOT_FOUND,
                        content_type="application/json")
    elif request.method == 'DELETE':
        team.deleted = True
        team.save()
        return Response({'success': 'team successfully deleted'}, status=status.HTTP_200_OK)

    serializer = CreateTeamSerializer(team, data=request.data)
    if serializer.is_valid():

        team = serializer.save()
        team.save()
        return Response({'success': 'team successfully edited'}, status=status.HTTP_200_OK,
                        content_type="application/json")
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, content_type="application/json")


@api_view(['GET'])
@permission_classes([AllowAny])
def api_add_project_team(request, projName, id):

    project = Project.objects.get(name=projName)
    team = Team.objects.get(id=id)
    team.projects.add(project)
    team.save()
    return Response({'Project succesfully added to team.'}, status=status.HTTP_404_NOT_FOUND,
                    content_type="application/json")


