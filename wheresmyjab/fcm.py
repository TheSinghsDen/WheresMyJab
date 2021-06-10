from pyfcm import FCMNotification
from .settings import FCM_SERVER_KEY
from .decorators import str_to_list


def fcm_send_topic_message(
        api_key=None,
        json_encoder=None,
        topic_name=None,
        message_body=None,
        message_title=None,
        message_icon=None,
        sound=None,
        condition=None,
        collapse_key=None,
        delay_while_idle=False,
        time_to_live=None,
        restricted_package_name=None,
        low_priority=False,
        dry_run=False,
        data_message=None,
        click_action=None,
        badge=None,
        color=None,
        tag=None,
        body_loc_key=None,
        body_loc_args=None,
        title_loc_key=None,
        title_loc_args=None,
        content_available=None,
        timeout=5,
        extra_notification_kwargs=None,
        extra_kwargs={}):

    if api_key is None:
        api_key = FCM_SERVER_KEY
        push_service = FCMNotification(
            api_key=api_key, json_encoder=json_encoder)

    result = push_service.notify_topic_subscribers(
        topic_name=topic_name,
        message_body=message_body,
        message_title=message_title,
        message_icon=message_icon,
        sound=sound,
        condition=condition,
        collapse_key=collapse_key,
        delay_while_idle=delay_while_idle,
        time_to_live=time_to_live,
        restricted_package_name=restricted_package_name,
        low_priority=low_priority,
        dry_run=dry_run,
        data_message=data_message,
        click_action=click_action,
        badge=badge,
        color=color,
        tag=tag,
        body_loc_key=body_loc_key,
        body_loc_args=body_loc_args,
        title_loc_key=title_loc_key,
        title_loc_args=title_loc_args,
        content_available=content_available,
        timeout=timeout,
        extra_kwargs=extra_kwargs,
        extra_notification_kwargs=extra_notification_kwargs,
    )

    return result


@str_to_list
def fcm_subscribe_device_to_topic(api_key=None, tokens=None, topic=None):
    if api_key is None:
        api_key = FCM_SERVER_KEY
        push_service = FCMNotification(
            api_key=api_key, json_encoder=json_encoder)

    subscribed = push_service.subscribe_registration_ids_to_topic(
        tokens, topic)
    # returns True if successful, raises error if unsuccessful
    return subscribed