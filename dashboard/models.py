from django.db import models


class TaskStatus(models.Model):
    ready_to_take = models.BooleanField(default=False)
    in_progress = models.BooleanField(default=False)
    ready_to_verify = models.BooleanField(default=False)
    done = models.BooleanField(default=False)


class Task(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    status = models.OneToOneField(TaskStatus, on_delete=models.CASCADE, blank=True, null=True)
    planned_ords = models.FloatField(blank=True, null=True)
    storypoints = models.FloatField(blank=True, null=True)
    real_ords = models.FloatField(blank=True, null=True)
