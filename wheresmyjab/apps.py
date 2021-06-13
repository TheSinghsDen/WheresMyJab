from django.apps import AppConfig


class WheresMyJabConfig(AppConfig):
    name = "wheresmyjab"
    verbose_name = "WheresMyJab"

    # def ready(self):
    #     from wheresmyjab.tasks.poll_cowin import poll_cowin_for_updates
    #     poll_cowin_for_updates()
