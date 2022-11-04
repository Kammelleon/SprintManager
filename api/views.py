from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Task
from .serializers import TaskSerializer
# Create your views here.
class ApiOverview(APIView):
    def get(self, request):
        api_urls = {
            'List': '/tasks-list/',
        }

        return Response(api_urls)


class TasksList(APIView):
    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)