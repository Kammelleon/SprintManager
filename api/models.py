from django.db import models


class TaskStatus(models.IntegerChoices):
    TODO = 0
    IN_PROGRESS = 1
    READY_TO_VERIFY = 2
    DONE = 3


class Task(models.Model):

    title = models.CharField(max_length=255, default="")
    description = models.TextField(default="")
    status = models.IntegerField(default=TaskStatus.TODO, choices=TaskStatus.choices)
    planned_ords = models.FloatField(blank=True, null=True)
    real_ords = models.FloatField(blank=True, null=True)
    storypoints = models.FloatField(blank=True, null=True)

    def __str__(self):
        return self.title
