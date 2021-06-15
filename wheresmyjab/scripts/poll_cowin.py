import time

from wheresmyjab.models import Districts
from wheresmyjab.cowin import fetch_slots_in_district


def run():
    while True:
        time.sleep(30)  # Sleep for 30 seconds before running again
        districts = Districts.objects.all()
        for district in districts:
            fetch_slots_in_district(district.district_id)
            time.sleep(4)  # Poll cowin every 4 seconds to avoid crossing limit
