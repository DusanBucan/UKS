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
        'milestone'
    ]

    def setUp(self) -> None:
        self.token = f'Bearer {get_jwt_token()}'



    def test_api_get_labels(self):
        c = Client()
        response = c.get('/api/labels/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)
        self.assertEquals(response.status_code, 200)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(len(res_obj), 3)


    def test_api_get_label_by_id(self):
        c = Client()
        response = c.get('/api/labels/1/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(res_obj['title'], 'enhancement')
        self.assertEquals(res_obj['description'], 'New feature or request')
        self.assertEquals(res_obj['color'], '#34ebc3')


    def test_api_get_label_by_id_not_found_because_does_not_exist(self):
        c = Client()
        response = c.get('/api/labels/1111/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 404)
    #
    #POST
    def test_api_post_label_succesful(self):
        c = Client()
        label = {
            "title": "frontend",
            "description": "new label",
            "color": "#34ebc3",

        }
        response = c.post(
            '/api/labels/add/1/',
            data=json.dumps(label),
            HTTP_AUTHORIZATION=self.token,
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 201)

    # #PUT
    def test_put_label_succesful(self):
        c = Client()
        label = {
                    "title": "newTitle",
                    "description": "newDescription",
                    "color": "#34ebc3"

                }
        response = c.put(
            '/api/labels/1/',
            data=json.dumps(label),
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(res_obj, {'success': 'label successfully edited'})

    def test_put_project_not_found(self):
        c = Client()
        label = {
            "title": "newTitle",
            "description": "newDescription",
            "color": "#34ebc3"

        }
        response = c.put(
            '/api/labels/11111/',
            data=json.dumps(label),
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 404)
        self.assertEquals(res_obj, {'error': 'invalid or missing object id'})

    # DELETE
    def test_api_delete_project_successful(self):
        c = Client()
        response = c.delete(
            '/api/labels/1/',
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(res_obj, {'success': 'label successfully deleted'})

    def test_api_delete_project_not_found(self):
        c = Client()
        response = c.delete(
            '/api/labels/122/',
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 404)
        self.assertEquals(res_obj, {'error': 'invalid or missing object id'})

