from rest_framework import serializers

from label.models import Label
from django.db import models

class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = ('id','title', 'description', 'color')


class CreateLabelSerializer(serializers.Serializer):
    #id = models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')
    title=serializers.CharField(max_length=500)
    description=serializers.CharField(max_length=1000)
    color = serializers.CharField(max_length=10)

    def create(self, validated_data):
        return Label(
           # id = models.AutoField(primary_key=True),
            title = validated_data['title'],
            description = validated_data['description'],
            color = validated_data['color']
        )

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description',instance.description)
        instance.color = validated_data.get('color',instance.color)
        return instance
