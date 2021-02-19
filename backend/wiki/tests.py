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
        'wiki'
    ]

    def setUp(self) -> None:
        self.token = f'Bearer {get_jwt_token()}'



    def test_api_get_wiki(self):
        c = Client()
        response = c.get('/api/wiki/1/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)
        self.assertEquals(response.status_code, 200)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(res_obj['text'], 'wiki')
        self.assertEquals(res_obj['project']['id'], 1)


    def test_api_get_wiki_by_id_not_found_because_does_not_exist(self):
        c = Client()
        response = c.get('/api/wiki/111/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 404)

    #POST
    def test_api_post_wiki_succesful(self):
        c = Client()
        wiki = {
            "project": 1,
            "text": "aaa",

        }
        response = c.post(
            '/api/wiki/',
            data=json.dumps(wiki),
            HTTP_AUTHORIZATION=self.token,
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 201)

    # #PUT
    def test_put_wiki_succesful(self):
        c = Client()
        wiki = {
            "project": 1,
            "text": "bbb",

        }
        response = c.put(
            '/api/wiki/du/1/',
            data=json.dumps(wiki),
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(res_obj, {'success': 'wiki successfully edited'})

    def test_put_project_not_found(self):
        c = Client()
        wiki = {
            "project": 1,
            "text": "bbb",

        }
        response = c.put(
            '/api/wiki/du/1111/',
            data=json.dumps(wiki),
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 404)
        self.assertEquals(res_obj, {'error': 'invalid or missing object id'})

    # DELETE
    def test_api_delete_wiki_successful(self):
        c = Client()
        response = c.delete(
            '/api/wiki/du/1/',
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(res_obj, {'success': 'wiki successfully deleted'})

    def test_api_delete_wiki_not_found(self):
        c = Client()
        response = c.delete(
            '/api/wiki/du/122/',
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 404)
        self.assertEquals(res_obj, {'error': 'invalid or missing object id'})


