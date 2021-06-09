from django.db import models
from django.utils import timezone


class Topics(models.Model):
    name: models.CharField = models.CharField(max_length=400)
    district_id: models.CharField = models.CharField(max_length=400)
    last_notified_at: models.DateTimeField = models.DateTimeField(
        default=timezone.now, blank=True)
