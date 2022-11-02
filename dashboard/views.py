from django.shortcuts import render, redirect
from django.urls import reverse
from django.views import View
from .forms import TaskForm
from .models import Task


class DashboardView(View):
    def get(self, request):
        task_creation_form = TaskForm()
        return render(request, "dashboard.html", {"task_creation_form": task_creation_form})

    def post(self, request):
        task_creation_form = TaskForm(request.POST)
        if task_creation_form.is_valid():
            print("Valid form")
            task_object = Task(**task_creation_form.cleaned_data)
            task_object.save()
            return redirect(reverse("dashboard:main-dashboard"))
        else:
            print("Invalid form")
            return redirect(reverse("dashboard:main-dashboard"))

