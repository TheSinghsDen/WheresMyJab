from django.apps import AppConfig


class WheresMyJabConfig(AppConfig):
    name = "wheresmyjab"
    verbose_name = "WheresMyJab"

    def ready(self):
        from .tasks import poll_cowin
        poll_cowin.delay()
