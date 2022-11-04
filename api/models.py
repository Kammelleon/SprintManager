from django.db import models


class TaskStatus(models.IntegerChoices):
    TODO = 0
    IN_PROGRESS = 1
    READY_TO_VERIFY = 2
    DONE = 3


class Task(models.Model):
    def __init__(self):
        title = models.CharField(max_length=255)
        description = models.TextField()
        status = models.IntegerField(default=TaskStatus.TODO, choices=TaskStatus.choices)
        planned_ords = models.FloatField()
        real_ords = models.FloatField()
        storypoints = models.FloatField()
