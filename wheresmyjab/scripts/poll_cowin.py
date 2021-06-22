import time
from django.utils import timezone

from wheresmyjab.models import Districts
from wheresmyjab.cowin import fetch_slots_in_district


def run():
    while True:
        now = timezone.localtime(timezone.now())
        today10pm = now.replace(hour=22, minute=0, second=0, microsecond=0)
        if(now > today10pm):
            print("Its bedtime now. Good Night !")
            time.sleep(32400)

        districts = Districts.objects.all()
        for district in districts:
            fetch_slots_in_district(district.district_id)
            # Poll cowin every 4 seconds to stay under the API limit
            time.sleep(6)
        time.sleep(30)  # Sleep for 30 seconds before running again
