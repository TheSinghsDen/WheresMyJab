from django.db import models


class Districts(models.Model):
    district_id: models.CharField = models.CharField(max_length=400)
    name: models.CharField = models.CharField(max_length=400)
