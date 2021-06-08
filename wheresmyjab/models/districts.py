from django.db import models


class Districts(models.Model):
    name: models.CharField = models.CharField(max_length=400)
    district_id: models.CharField = models.CharField(max_length=400)
