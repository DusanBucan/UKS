from django.test import TestCase

# Create your tests here.
import json
from django.test import TestCase, Client
from rest_framework.test import APIClient
from django.utils import timezone

JSON = 'application/json'

BASE_PATH = '/api/commit/'

def get_jwt_token():
    c = Client()
    response = c.post('/api/token/', {'username': 'maki', 'password': 'branko'})
    return json.loads(response.content.decode('UTF-8'))['access']


class TestCommitApi(TestCase):
    fixtures = [
        'commit',
        'user',
        'github_user',
        'project',
        'label'
    ]

    def setUp(self) -> None:
        self.token = f'Bearer {get_jwt_token()}'



    def test_api_commit_by_project(self):
        c = Client()
        response = c.get(BASE_PATH + 'project/1/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)

        self.assertEquals(response.status_code, 200)
        res_objs = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(len(res_objs), 2)


    def test_api_commit_detail(self):
        c = Client()
        response = c.get(BASE_PATH + '1/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)

        self.assertEquals(response.status_code, 200)
        res_objs = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(res_objs['summary'], 'this is our first commit')
        self.assertEquals(res_objs['description'], 'added init commit for project')

    def test_api_commit_by_project_and_user(self):
        c = Client()
        response = c.get(BASE_PATH + 'project/1/2/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)

        self.assertEquals(response.status_code, 200)
        res_objs = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(len(res_objs), 1)
        res_obj = res_objs[0]
        self.assertEquals(res_obj['summary'], 'this is our second commit')
        self.assertEquals(res_obj['description'], 'added init commit for project by user 2')


    # testiranje da li vrati commit-e od najmladjeg ka najstarijem
    def test_api_commit_by_project_and_order(self):
        c = Client()
        response = c.get(BASE_PATH + 'project/1/order/1/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)

        self.assertEquals(response.status_code, 200)
        res_objs = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(len(res_objs), 2)
        self.assertEquals(res_objs[0]['id'], 1)
        self.assertEquals(res_objs[1]['id'], 2)


    # testiranje da li vrati commit-e od najstarijeg ka najmladjem
    def test_api_commit_by_project_and_order(self):
        c = Client()
        response = c.get(BASE_PATH + 'project/1/order/0/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)

        self.assertEquals(response.status_code, 200)
        res_objs = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(len(res_objs), 2)
        self.assertEquals(res_objs[0]['id'], 2)
        self.assertEquals(res_objs[1]['id'], 1)


    def test_api_commit_new(self):

        commit1 = {
              "date": "2021-01-06T08:43:57.419Z",
              "summary": "this is our first commit",
              "description": "added init commit for project",
              "hash": "pbkdf2_sha256$216000$1yZJoabL7pZy$X7MKF+aAUhDIyU1/DKD4Tmnig42IAz/C72ej5KkZ35I=",
              "project": 1,
              "user": 1
            }

        c = Client()
        response = c.post(BASE_PATH, commit1, HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)
        self.assertEquals(response.status_code, 201)

        # provera da li ih sada ima 3
        response = c.get(BASE_PATH + 'project/1/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)

        self.assertEquals(response.status_code, 200)
        res_objs = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(len(res_objs), 3)


