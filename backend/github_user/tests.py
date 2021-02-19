from django.test import TestCase
# Create your tests here.
import json
from django.test import TestCase, Client
from rest_framework.test import APIClient
from django.utils import timezone

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



    def test_api_get_github_users(self):
        c = Client()
        response = c.get('/api/github_users/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)
        self.assertEquals(response.status_code, 200)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(len(res_obj), 6)


    def test_api_get_github_user_by_id(self):
        c = Client()
        response = c.get('/api/github_users/1/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(res_obj['user']['username'], 'maki')
        self.assertEquals(res_obj['user']['first_name'], 'Marina')
        self.assertEquals(res_obj['user']['last_name'], 'Vojnovic')

    def test_api_get_github_user_by_id_not_found_because_does_not_exist(self):
        c = Client()
        response = c.get('/api/github_users/1111/', HTTP_AUTHORIZATION=self.token,
                         content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 404)

    #POST
    def test_api_post_github_user_succesful(self):
        c = Client()
        githubUser = {
        "user": {
            "id": 1,
            "first_name": "Marina",
            "last_name": "Vojnovic",
            "is_staff": True,
            "is_superuser": True,
            "is_active": True,
            "email": "marina@gmail.com",
            "username": "maki3",
            "password": "pbkdf2_sha256$216000$1yZJoabL7pZy$X7MKF+aAUhDIyU1/DKD4Tmnig42IAz/C72ej5KkZ35I="
        },
        "photo": "photo of user",
        "github_profile_url": "http://githubofuser.com",
        "organization": "Some organisation",
        "skype": "http://skypeofuser.com",
        "twitter": "http://twitterofuser.com",
        "linkedin": "http://linkedinofuser.com"
        }
        response = c.post(
            '/api/github_users/',
            data=json.dumps(githubUser),
            HTTP_AUTHORIZATION=self.token,
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 201)

    # #PUT
    def test_put_github_user_succesful(self):
        c = Client()
        githubUser = {
            "user": {
                "id": 1,
                "first_name": "Marina",
                "last_name": "Vojnovic",
                "is_staff": True,
                "is_superuser": True,
                "is_active": True,
                "email": "marina@gmail.com",
                "username": "maki4",
                "password": "pbkdf2_sha256$216000$1yZJoabL7pZy$X7MKF+aAUhDIyU1/DKD4Tmnig42IAz/C72ej5KkZ35I="
            },
            "photo": "photo of user",
            "github_profile_url": "http://githubofuser.com",
            "organization": "Some organisation",
            "skype": "http://skypeofuser.com",
            "twitter": "http://twitterofuser.com",
            "linkedin": "http://linkedinofuser.com"
        }
        response = c.put(
            '/api/github_users/1/',
            data=json.dumps(githubUser),
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(res_obj, {'success': 'github user successfully edited'})

    def test_put_github_user_not_found(self):
        c = Client()
        githubUser = {
            "user": {
                "id": 1,
                "first_name": "Marina",
                "last_name": "Vojnovic",
                "is_staff": True,
                "is_superuser": True,
                "is_active": True,
                "email": "marina@gmail.com",
                "username": "maki4",
                "password": "pbkdf2_sha256$216000$1yZJoabL7pZy$X7MKF+aAUhDIyU1/DKD4Tmnig42IAz/C72ej5KkZ35I="
            },
            "photo": "photo of user",
            "github_profile_url": "http://githubofuser.com",
            "organization": "Some organisation",
            "skype": "http://skypeofuser.com",
            "twitter": "http://twitterofuser.com",
            "linkedin": "http://linkedinofuser.com"
        }
        response = c.put(
            '/api/github_users/11111/',
            data=json.dumps(githubUser),
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 404)
        self.assertEquals(res_obj, {'error': 'invalid or missing object id'})

    # DELETE
    def test_api_delete_github_user_successful(self):
        c = Client()
        response = c.delete(
            '/api/github_users/1/',
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(res_obj, {'success': 'github user successfully deleted'})

    def test_api_delete_github_user_not_found(self):
        c = Client()
        response = c.delete(
            '/api/github_users/122/',
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(response.status_code, 404)
        self.assertEquals(res_obj, {'error': 'invalid or missing object id'})

    def test_api_github_user_logged_in(self):
        c = Client()
        response = c.get(
            '/api/github_users/loggedIn/',
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(res_obj['user']['first_name'],"Marina")
        self.assertEquals(res_obj['user']['last_name'], "Vojnovic")

    def test_api_get_github_user_by_name(self):
        c = Client()
        response = c.get(
            '/api/github_users/get-github-user-by-name/Marina/Vojnovic/',
            content_type='application/json', HTTP_AUTHORIZATION=self.token
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEquals(res_obj['user']['first_name'],"Marina")
        self.assertEquals(res_obj['user']['last_name'], "Vojnovic")
        self.assertEquals(res_obj['id'], 1)


