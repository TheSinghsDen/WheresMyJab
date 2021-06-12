import requests
import time
from datetime import datetime, timedelta
import json
from wheresmyjab.fcm import fcm_send_topic_message
from wheresmyjab.models import Topics


def is_topic_available_for_notification(topic_name):
    is_topic_available = False
    time_threshold = datetime.now() - timedelta(hours=1)

    # Check if users are subscribed to the given topic
    topic_exists = Topics.objects.get(name=topic_name).exists()

    # Check if more than 1 hour has elapsed since the last notification
    if topic_exists:
        is_topic_available = Topics.objects.get(
            name=topic_name, last_notified_at__lt=time_threshold).exists()

    return is_topic_available


def fetch_slots_in_district(district_id):
    today = datetime.today().strftime('%d-%m-%Y')
    api_url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict/'
    payload = {'district_id': district_id, 'date': today}

    response = requests.get(api_url, params=payload)

    if(response.status_code == 200):
        centers = json.loads(response.content)['centers']
        for center in centers:
            for session in center['sessions']:

                if session['available_capacity_dose1'] and session['min_age_limit'] == 18:
                    topic_name = f"{district_id}_{center['district_name']}_18_dose1"
                    if is_topic_available_for_notification(topic_name):
                        fcm_send_topic_message(
                            topic_name=topic_name,
                            message_title="Vaccine slots open for 18-44 age group",
                            message_body=f"{session['available_capacity_dose1']} slots available on {session['date']} at {center['name']}."
                        )

                if session['available_capacity_dose1'] and session['min_age_limit'] == 45:
                    topic_name = f"{district_id}_{center['district_name']}_45_dose1"
                    if is_topic_available_for_notification(topic_name):
                        fcm_send_topic_message(
                            topic_name=topic_name,
                            message_title="Vaccine slots open for 45+ age group",
                            message_body=f"{session['available_capacity_dose1']} slots available on {session['date']} at {center['name']}."
                        )

                if session['available_capacity_dose2'] and session['min_age_limit'] == 18:
                    topic_name = f"{district_id}_{center['district_name']}_18_dose2"
                    if is_topic_available_for_notification(topic_name):
                        fcm_send_topic_message(
                            topic_name=topic_name,
                            message_title="Vaccine slots open for 18-44 age group",
                            message_body=f"{session['available_capacity_dose2']} slots available on {session['date']} at {center['name']}."
                        )

                if session['available_capacity_dose2'] and session['min_age_limit'] == 45:
                    topic_name = f"{district_id}_{center['district_name']}_45_dose2"
                    if is_topic_available_for_notification(topic_name):
                        fcm_send_topic_message(
                            topic_name=topic_name,
                            message_title="Vaccine slots open for 45+ age group",
                            message_body=f"{session['available_capacity_dose2']} slots available on {session['date']} at {center['name']}."
                        )
