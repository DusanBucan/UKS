from rest_framework import serializers

from label.models import Label


class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = ('title', 'description', 'color')


class CreateLabelSerializer(serializers.Serializer):
    title=serializers.CharField(max_length=500)
    description=serializers.CharField(max_length=1000)
    color = serializers.CharField(max_length=10)

    def create(self, validated_data):
        return Label(
            title = validated_data['title'],
            description = validated_data['description'],
            color = validated_data['color']
        )

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description',instance.description)
        instance.color = validated_data.get('color',instance.color)
        return instance
