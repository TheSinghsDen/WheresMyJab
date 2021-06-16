import time

from wheresmyjab.models import Districts
from wheresmyjab.cowin import fetch_slots_in_district


def run():
    while True:
        districts = Districts.objects.all()
        for district in districts:
            fetch_slots_in_district(district.district_id)
            # Poll cowin every 4 seconds to stay under the API limit
            time.sleep(6)
        time.sleep(30)  # Sleep for 30 seconds before running again
