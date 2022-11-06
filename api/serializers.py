from rest_framework import serializers
from .models import Task, TaskStatus


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id','title','description','status', 'planned_ords', 'real_ords', 'storypoints']