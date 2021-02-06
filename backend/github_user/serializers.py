from rest_framework import serializers
from github_user.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProxy
        fields = ('id', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'is_active', 'email')

class GitHubUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model=GitHubUser
        fields = ('user', 'photo', 'github_profile_url', 'organization', 'member_since', 'skype', 'twitter', 'linkedin')

