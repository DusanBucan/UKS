from django.test import TestCase

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
        'wiki',
        'task'
    ]

    def setUp(self) -> None:
        self.token = f'Bearer {get_jwt_token()}'

    def test_api_get_tasks(self):
        c = Client()
        response = c.get('/api/tasks/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)
        self.assertEquals(response.status_code, 200)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(len(res_obj), 2)

    def test_api_get_task_by_id(self):
        c = Client()
        response = c.get('/api/tasks/1/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(res_obj['title'], 'Task 1')
        self.assertEquals(res_obj['description'], 'Description of Task 1')
        self.assertEquals(res_obj['task_state'],'created' )

    def test_api_get_task_by_id_not_found_because_does_not_exist(self):
        c = Client()
        response = c.get('/api/tasks/1111/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 404)

        # POST

    def test_api_post_task_succesful(self):
        c = Client()
        task = {
            "title": "Task 3",
            "description": "Description of Task 1",
            "due_date": "2021-03-03T17:00:00Z",
            "assignee": 2,
            "author": 1,
            "labels": [1],
            "project": 1,
            "opened": True,
            "task_state": "created",
            "milestones": []
        }
        response = c.post(
            '/api/tasks/',
            data=json.dumps(task),
            HTTP_AUTHORIZATION=self.token,
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 201)

        # #PUT

    def test_put_task_succesful(self):
        c = Client()
        task = {
            "title": "Task 3",
            "description": "Description of Task 1",
            "due_date": "2021-03-03T17:00:00Z",
            "assignee": 2,
            "author": 1,
            "labels": [1],
            "project": 1,
            "opened": True,
            "task_state": "created",
            "milestones": []
        }
        response = c.put(
            '/api/tasks/1/',
            data=json.dumps(task),
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        self.assertEquals(response.status_code, 200)

    def test_put_task_not_found(self):
        c = Client()
        task = {
            "title": "Task 3",
            "description": "Description of Task 1",
            "due_date": "2021-03-03T17:00:00Z",
            "assignee": 2,
            "author": 1,
            "labels": [1],
            "project": 1,
            "opened": True,
            "task_state": "created",
            "milestones": []
        }
        response = c.put(
            '/api/tasks/1111/',
            data=json.dumps(task),
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 404)
        self.assertEquals(res_obj, {'error': 'invalid or missing object id'})

        # DELETE

    def test_api_delete_task_successful(self):
        c = Client()
        response = c.delete(
            '/api/tasks/1/',
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 200)

    def test_api_delete_project_not_found(self):
        c = Client()
        response = c.delete(
            '/api/tasks/122/',
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 404)
        self.assertEquals(res_obj, {'error': 'invalid or missing object id'})

    def test_api_tasks_by_milestone(self):
        c = Client()
        response = c.get(
            '/api/tasks/milestone/1/',
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(len(res_obj), 1)

    def test_api_tasks_by_project(self):
        c = Client()
        response = c.get(
            '/api/tasks/project/1/',
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(len(res_obj), 2)

