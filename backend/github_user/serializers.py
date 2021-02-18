import uuid
from rest_framework import serializers
from github_user.models import *
import datetime
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProxy
        fields = ('id', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'is_active', 'email','username','password')

class GitHubUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model=GitHubUser
        fields = ('id', 'user', 'photo', 'github_profile_url', 'organization', 'member_since', 'skype', 'twitter', 'linkedin')
    def create(self, validated_data):
        user = User(
            first_name = validated_data['user']['first_name'],
            last_name = validated_data['user']['last_name'],
            is_staff = True,
            is_superuser = True,
            is_active = True,
            email = validated_data['user']['email'],
            username = validated_data['user']['username'],
        )
        password = user.set_password(validated_data['user']['password'])
        user.save()
        return GitHubUser(
            user = user,
            photo = validated_data['photo'],
            github_profile_url = validated_data['github_profile_url'],
            organization = validated_data['organization'],
            member_since = datetime.datetime.now(),
            skype = validated_data['skype'],
            twitter=validated_data['twitter'],
            linkedin=validated_data['linkedin']
        )

    def update(self, instance, validated_data):
        user = User.objects.get(pk = validated_data.get('user').get('id'))
        user.first_name = validated_data.get('user').get('first_name', instance.user.first_name)
        user.last_name = validated_data.get('user').get('last_name', instance.user.last_name)
        user.username = validated_data.get('user').get('username', instance.user.username)
        if validated_data.get('user').get('password') != "":
            user.set_password(validated_data.get('user').get('password'))
        instance.photo = validated_data.get('photo',instance.photo)
        instance.github_profile_url = validated_data.get('github_profile_url', instance.github_profile_url)
        instance.organization = validated_data.get('organization', instance.organization)
        instance.skype = validated_data.get('skype', instance.skype)
        instance.twitter = validated_data.get('twitter', instance.twitter)
        instance.linkedin = validated_data.get('linkedin', instance.linkedin)
        user.save()
        return instance




