from django.urls import path
from . import views

urlpatterns = [
    path('', views.ApiOverview.as_view(), name="api-overview"),
    path('tasks-list/', views.TasksList.as_view(), name="tasks-list"),
    path('task-create/', views.TaskCreate.as_view(), name="task-create"),
    path('task-update/<str:pk>/', views.TaskUpdate.as_view(), name="task-update"),
]
