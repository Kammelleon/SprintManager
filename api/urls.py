from django.urls import path
from . import views

urlpatterns = [
    path('', views.ApiOverview.as_view(), name="api-overview"),
    path('tasks-list/', views.TasksList.as_view(), name="tasks-list"),
]
