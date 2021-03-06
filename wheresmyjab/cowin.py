import requests
import time
from datetime import timedelta
from django.utils import timezone
import json
from wheresmyjab.fcm import fcm_send_topic_message
from wheresmyjab.models import Topics

message_icon_url = 'https://i.ibb.co/L599jvc/logo.png'


def is_topic_available_for_notification(topic_name):
    time_threshold = timezone.now() - timedelta(hours=1)
    print(f"Checking availability of topic {topic_name} .....")

    # Check if users are subscribed to the given topic and more than 1 hour has elapsed since the last notification
    if (Topics.objects.filter(name=topic_name, last_notified_at__lt=time_threshold).exists()):
        print(f"Topic {topic_name} is available for notification.")
        return True
    else:
        print(f"Topic {topic_name} is not available for notification !")
        return False


def send_notification(topic_name, district_name, available_slots, date, center_name, center_address):
    print(f"Sending notification for topic {topic_name}")

    response = fcm_send_topic_message(
        topic_name=topic_name,
        message_title=f"Slots open in {district_name}",
        message_body=f"There are {available_slots} vaccination slots available on {date} at {center_name}, {center_address}.",
        message_icon=message_icon_url,
        extra_kwargs={
            "webpush": {
                "fcm_options": {
                    "link": "https://wheresmyjab.com"
                }
            }
        },
        color='blue'
    )

    if(response["success"] > 0):
        print(
            f"Notified Successfullly. Updating time field in database for topic {topic_name}")
        Topics.objects.filter(name=topic_name).update(
            last_notified_at=timezone.now())
    else:
        print(f"There was an error sending notification to topic {topic_name}")


def fetch_slots_in_district(district_id):
    print(f"Fecting slots in district_id {district_id}")

    today = timezone.now().today().strftime('%d-%m-%Y')
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
        'Accept-Encoding': 'none',
        'Accept-Language': 'en-US,en;q=0.8',
        'Connection': 'keep-alive'
    }
    api_url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict/'
    payload = {'district_id': district_id, 'date': today}

    response = requests.get(api_url, headers=headers, params=payload)

    if(response.status_code == 200):
        centers = json.loads(response.content)['centers']
        no_slots_available = True
        for center in centers:
            for session in center['sessions']:

                if session['available_capacity_dose1'] and session['min_age_limit'] == 18:
                    no_slots_available = False
                    topic_name = (
                        f"{district_id}_{center['district_name']}_18_dose1").replace(" ", "")
                    if is_topic_available_for_notification(topic_name):
                        send_notification(
                            topic_name,
                            center['district_name'],
                            session['available_capacity_dose1'],
                            session['date'],
                            center['name'],
                            center['address']
                        )

                if session['available_capacity_dose1'] and session['min_age_limit'] == 45:
                    no_slots_available = False
                    topic_name = (
                        f"{district_id}_{center['district_name']}_45_dose1").replace(" ", "")
                    if is_topic_available_for_notification(topic_name):
                        send_notification(
                            topic_name,
                            center['district_name'],
                            session['available_capacity_dose1'],
                            session['date'],
                            center['name'],
                            center['address']
                        )

                if session['available_capacity_dose2'] and session['min_age_limit'] == 18:
                    no_slots_available = False
                    topic_name = (
                        f"{district_id}_{center['district_name']}_18_dose2").replace(" ", "")
                    if is_topic_available_for_notification(topic_name):
                        send_notification(
                            topic_name,
                            center['district_name'],
                            session['available_capacity_dose2'],
                            session['date'],
                            center['name'],
                            center['address']
                        )

                if session['available_capacity_dose2'] and session['min_age_limit'] == 45:
                    no_slots_available = False
                    topic_name = (
                        f"{district_id}_{center['district_name']}_45_dose2").replace(" ", "")
                    if is_topic_available_for_notification(topic_name):
                        send_notification(
                            topic_name,
                            center['district_name'],
                            session['available_capacity_dose2'],
                            session['date'],
                            center['name'],
                            center['address']
                        )
        if(no_slots_available):
            print("No slots are available")
    else:
        print("Error fetching slots with the given parameters !")
        print(response.json())
