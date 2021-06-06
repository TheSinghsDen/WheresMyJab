import React, { useState } from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import { Alert, Typography, Button, Descriptions } from 'antd'
import { findSlotsLogic } from 'scenes/findSlots/findSlotsLogic'
import { useValues, useActions } from 'kea'
import { notificationLogic } from './notificationLogic'
// const messaging = firebase.messaging()

import './index.scss'

const { Text } = Typography

const Subscribe: React.FC = () => {
    const [openSubscribe, setOpenSubscribe] = useState(false)
    const { selectedDistrictName, dose, selectedAgeGroup } = useValues(findSlotsLogic)
    const { setTokenSentToServer, setFilterSettings } = useActions(notificationLogic)

    const handleCloseSubscribe = (): void => {
        setOpenSubscribe(false)
    }

    const resetUI = (): void => {
        messaging
            .getToken({
                vapidKey: 'BCCy_QI4pW6YNdntCWrikXO5Eq4Eo0IAT1EEPp9a9-MmCHd3Ick88-GP3ndOLJt33KyJtbDmP7v6CTE47Vn8IAQ',
            })
            .then((currentToken) => {
                if (currentToken) {
                    sendTokenToServer(currentToken)
                    console.log(currentToken)
                } else {
                    console.log('No registration token available. Request permission to generate one.')
                    setTokenSentToServer(false)
                }
            })
            .catch((err) => {
                console.log('An error occurred while retrieving token. ', err)
                setTokenSentToServer(false)
            })
    }

    const sendTokenToServer = (currentToken): void => {
        console.log('Sending token to server...', currentToken)
        // TODO(developer): Send the current token to your server.

        setTokenSentToServer(true)
        setFilterSettings(`${selectedDistrictName}|${dose}|${selectedAgeGroup}`)
    }

    const requestPermission = (): void => {
        console.log('Requesting permission.....')
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted')
                resetUI()
            } else {
                console.log('Unable to get permission to notify')
            }
        })
    }

    return (
        <div>
            <Alert
                message="Notify me when a slot opens up"
                type="info"
                onClick={() => setOpenSubscribe(true)}
                showIcon
                icon={<NotificationsIcon fontSize="small" className="bell_subscribe" />}
                action={<ArrowForwardIosIcon fontSize="small" className="rightIcon" />}
                className="alert_subscribe cursor-pointer"
            />
            <Dialog open={openSubscribe} onClose={handleCloseSubscribe} className="text-center" id="subscribe_dialog">
                <div id="subscribe_notification_dialog_title" className="pa">
                    <div className="mt">
                        <Text className="dialog_title">Turn on Notifications</Text>
                    </div>

                    <div className="pb pr pl mt-025">
                        <Text type="secondary" className="dialog_description">
                            You will get a notification for the following filters:
                        </Text>
                    </div>
                </div>

                <div id="subscribe_notification_dialog_filters" className="pl pr pb-2">
                    <Descriptions bordered>
                        <Descriptions.Item label="District">{selectedDistrictName}</Descriptions.Item>
                        <Descriptions.Item label="Age Group">{selectedAgeGroup}+</Descriptions.Item>
                        <Descriptions.Item label="Dose">
                            {dose == 'available_capacity_dose1' ? 'Dose 1' : 'Dose 2'}{' '}
                        </Descriptions.Item>
                    </Descriptions>
                </div>

                <div id="subscribe_notification_dialog_actions">
                    <Divider />

                    <Button type="text" className="turn_on_button mt-05 mb-05" onClick={requestPermission}>
                        Turn On
                    </Button>

                    <Divider />

                    <Button type="text" className="mt-05 mb-05" onClick={handleCloseSubscribe}>
                        Not Now
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default Subscribe
