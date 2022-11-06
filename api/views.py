from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Task
from .serializers import TaskSerializer


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


class TaskCreate(APIView):
    def post(self, request):
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)


class TaskUpdate(APIView):
    def post(self, request, pk):
        task = Task.objects.get(id=pk)
        serializer = TaskSerializer(instance=task, data=request.data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)
