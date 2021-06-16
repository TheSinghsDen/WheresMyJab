from rest_framework import viewsets, mixins, serializers, status
from rest_framework.response import Response
from datetime import timedelta
from django.utils import timezone
from wheresmyjab.models import Districts, Topics
from wheresmyjab.fcm import fcm_subscribe_device_to_topic


class SubscribeSerializer(serializers.Serializer):
    topic_name = serializers.CharField(max_length=250)
    device_token = serializers.CharField(max_length=250)


class SubscribeViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin,):
    serializer_class = SubscribeSerializer

    def create(self, request):
        topic_name = request.data["topic_name"]
        device_token = request.data["device_token"]
        district_id = topic_name.split('_')[0]
        district_name = topic_name.split('_')[1]

        district = Districts.objects.get_or_create(
            district_id=district_id,
            name=district_name,
        )

        topic = Topics.objects.get_or_create(
            name=topic_name,
            district_id=district_id,
            defaults={'last_notified_at': timezone.now() - timedelta(hours=1)},
        )

        if district and topic:
            isSubscribed = fcm_subscribe_device_to_topic(
                tokens=[device_token], topic=topic_name)

            if isSubscribed:
                return Response({"detail": "Device has been registered with the provided topic"})

            else:
                return Response({"error": "Device could not be registered with topic"}, status=status.HTTP_400_BAD_REQUEST)
