import time
import logging

from celery import shared_task

from wheresmyjab.models import Districts
from wheresmyjab.cowin import fetch_slots_in_district

logger = logging.getLogger(__name__)


@shared_task
def poll_cowin_for_updates():
    while True:
        districts = Districts.objects.all()
        for district in districts:
            fetch_slots_in_district(district.district_id)
            time.sleep(4)  # Poll cowin every 4 seconds to avoid crossing limit
