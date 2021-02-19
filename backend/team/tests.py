from django.test import TestCase
# Create your tests here.
import json
from django.test import TestCase, Client
from rest_framework.test import APIClient

JSON = 'application/json'


def get_jwt_token():
    c = Client()
    response = c.post('/api/token/', {'username': 'maki', 'password': 'branko'})
    return json.loads(response.content.decode('UTF-8'))['access']

class TestUgovoriApi(TestCase):
    fixtures = [
        'label',
        'user',
        'github_user',
        'project',
        'milestone',
        'team'
    ]

    def setUp(self) -> None:
        self.token = f'Bearer {get_jwt_token()}'



    def test_api_get_teams(self):
        c = Client()
        response = c.get('/api/teams/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)
        self.assertEquals(response.status_code, 200)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(len(res_obj), 1)


    def test_api_get_team_by_id(self):
        c = Client()
        response = c.get('/api/teams/1/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(res_obj['name'], 'Team One')

    def test_api_get_team_by_id_not_found_because_does_not_exist(self):
        c = Client()
        response = c.get('/api/teams/1111/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 404)

    #POST
    def test_api_post_team_succesful(self):
        c = Client()
        team = {
                  "git_users": [1],
                    "projects": [1],
                "name": "Team One"

             }
        response = c.post(
             '/api/teams/',
            data=json.dumps(team),
            HTTP_AUTHORIZATION=self.token,
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 201)

    # #PUT
    def test_put_team_succesful(self):
        c = Client()
        team = {
            "git_users": [1],
            "projects": [1],
            "name": "Team One"

        }
        response = c.put(
            '/api/teams/1/',
            data=json.dumps(team),
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(res_obj, {'success': 'team successfully edited'})

    def test_put_team_not_found(self):
        c = Client()
        team = {
            "git_users": [1],
            "projects": [1],
            "name": "Team One"

        }
        response = c.put(
            '/api/teams/11111/',
            data=json.dumps(team),
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 404)
        self.assertEquals(res_obj, {'error': 'invalid or missing object id'})

    # # DELETE
    def test_api_delete_team_successful(self):
        c = Client()
        response = c.delete(
            '/api/teams/1/',
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(res_obj, {'success': 'team successfully deleted'})

    def test_api_delete_team_not_found(self):
        c = Client()
        response = c.delete(
            '/api/teams/122/',
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 404)
        self.assertEquals(res_obj, {'error': 'invalid or missing object id'})

