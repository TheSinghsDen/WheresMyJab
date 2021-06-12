import React, { useState } from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import { Alert, Typography, Button, Descriptions } from 'antd'
import { useValues, useActions } from 'kea'
import { notificationLogic } from './notificationLogic'
const messaging = firebase.messaging()

import './index.scss'

const { Text } = Typography

const Unsubscribe: React.FC = () => {
    const [openUnsubscribe, setOpenUnsubscribe] = useState(false)
    const { filterSettings } = useValues(notificationLogic)
    const { reset } = useActions(notificationLogic)

    const handleCloseUnsubscribe = (): void => {
        setOpenUnsubscribe(false)
    }

    const deleteToken = (): void => {
        // Delete registration token.
        messaging
            .getToken()
            .then((currentToken: string) => {
                messaging
                    .deleteToken(currentToken)
                    .then(() => {
                        console.log('Token deleted.')
                        reset()
                    })
                    .catch((err) => {
                        console.log('Unable to delete token. ', err)
                    })
            })
            .catch((err) => {
                console.log('Error retrieving registration token. ', err)
            })
    }

    return (
        <div>
            <Alert
                message="Disable / Change Notification Settings"
                type="warning"
                onClick={() => setOpenUnsubscribe(true)}
                showIcon
                icon={<NotificationsIcon fontSize="small" className="bell_unsubscribe" />}
                action={<ArrowForwardIosIcon fontSize="small" className="rightIcon" />}
                className="alert_unsubscribe cursor-pointer"
            />

            <Dialog
                open={openUnsubscribe}
                onClose={handleCloseUnsubscribe}
                className="text-center"
                id="unsubscribe_dialog"
            >
                <div id="unsubscribe_notification_dialog_title" className="pa">
                    <div className="mt">
                        <Text className="dialog_title">Turn off Notifications</Text>
                    </div>

                    <div className="pb pr pl mt-025">
                        <Text type="secondary" className="dialog_description">
                            You have already set notification for the following filters. Turn off to setup again.
                        </Text>
                    </div>
                </div>

                <div id="unsubscribe_notification_dialog_filters" className="pl pr pb-2">
                    <Descriptions bordered>
                        <Descriptions.Item label="District">{filterSettings.split('|')[0]}</Descriptions.Item>
                        <Descriptions.Item label="Age Group">{filterSettings.split('|')[2]}+</Descriptions.Item>
                        <Descriptions.Item label="Dose">
                            {filterSettings.split('|')[1] == 'available_capacity_dose1' ? 'Dose 1' : 'Dose 2'}{' '}
                        </Descriptions.Item>
                    </Descriptions>
                </div>

                <div id="unsubscribe_notification_dialog_actions">
                    <Divider />

                    <Button type="text" className="turn_off_button mt-05 mb-05" onClick={deleteToken}>
                        Turn Off
                    </Button>

                    <Divider />

                    <Button type="text" className="mt-05 mb-05" onClick={handleCloseUnsubscribe}>
                        Not Now
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default Unsubscribe
