from rest_framework import viewsets, mixins
from wheresmyjab.models import Districts, Topics


class SubscribeViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin,):
    def create(self, request):
        data = request.data

        Districts.objects.get_or_create(
            district_id=data.district_id,
            name=data.district_name,
        )

        Topics.objects.get_or_create(
            name=data.topic_name,
            district_id=data.district_id,
        )
