import json
from django.test import TestCase, Client


def get_jwt_token():
    c = Client()
    response = c.post('/api/token/', {'username': 'maki', 'password': 'branko'})
    return json.loads(response.content.decode('UTF-8'))['access']


class TestApi(TestCase):
    fixtures = [
        'label',
        'user',
        'github_user',
        'project',
        'milestone',
        'task'
    ]

    def setUp(self) -> None:
        self.token = f'Bearer {get_jwt_token()}'

    def test_api_new_milestone(self):
        c = Client()
        milestone = {
            "title": "Feature",
            "description": "Feature description",
            "start_date": "2021-03-03",
            "due_date": "2021-04-04",
            "project": 1,
        }
        response = c.post(
            '/api/milestones/',
            data=json.dumps(milestone),
            HTTP_AUTHORIZATION=self.token,
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 201)

    def test_api_new_milestone_failed(self):
        c = Client()
        milestone = {
            "title": "Feature",
            "description": "Feature description",
            "start_date": "2021-03-03",
            "due_date": "2021-04-04",
            "project": 0,
        }
        response = c.post(
            '/api/milestones/',
            data=json.dumps(milestone),
            HTTP_AUTHORIZATION=self.token,
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 404)

    def test_api_milestone_by_project(self):
        c = Client()
        response = c.get(
            '/api/milestones/project/1/',
            HTTP_AUTHORIZATION=self.token,
            content_type='application/json'
        )
        response_body = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response_body), 3)

    def test_api_milestone_by_project_id_does_not_exist(self):
        c = Client()
        response = c.get(
            '/api/milestones/project/0/',
            HTTP_AUTHORIZATION=self.token,
            content_type='application/json'
        )
        response_body = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response_body), 0)

    def test_api_milestone_detail_get(self):
        c = Client()
        response = c.get(
            '/api/milestones/1/',
            HTTP_AUTHORIZATION=self.token,
            content_type='application/json'
        )
        response_body = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response_body['id'], 1)

    def test_api_milestone_detail_get_does_not_exist(self):
        c = Client()
        response = c.get(
            '/api/milestones/50/',
            HTTP_AUTHORIZATION=self.token,
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 404)

    def test_api_milestone_detail_delete(self):
        c = Client()
        milestone_id = 1
        response = c.delete(
            '/api/milestones/' + str(milestone_id) + '/',
            HTTP_AUTHORIZATION=self.token,
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 200)
        response = c.get(
            '/api/milestones/' + str(milestone_id) + '/',
            HTTP_AUTHORIZATION=self.token,
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 404)

    def test_api_milestone_detail_put(self):
        c = Client()
        milestone = {
            "title": "Feature",
            "description": "Feature description",
            "start_date": "2021-03-03",
            "due_date": "2021-04-04",
            "project": 1,
        }
        response = c.put(
            '/api/milestones/2/',
            data=json.dumps(milestone),
            HTTP_AUTHORIZATION=self.token,
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 200)

    def test_api_milestone_detail_put_empty_date(self):
        c = Client()
        milestone = {
            "title": "Feature",
            "description": "Feature description",
            "start_date": "",
            "due_date": "2021-04-04",
            "project": 1,
        }
        response = c.put(
            '/api/milestones/2/',
            data=json.dumps(milestone),
            HTTP_AUTHORIZATION=self.token,
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 400)

    def test_api_milestone_statistic(self):
        c = Client()
        response = c.get(
            '/api/milestones/statistic/1/',
            HTTP_AUTHORIZATION=self.token,
            content_type='application/json'
        )
        response_body = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response_body['categories']), 3)
