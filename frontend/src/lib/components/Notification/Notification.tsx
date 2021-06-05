import React, { useState } from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import { Alert, Typography, Button, Descriptions } from 'antd'
import { findSlotsLogic } from 'scenes/findSlots/findSlotsLogic'
import { useValues, useActions } from 'kea'
import { notificationLogic } from './notificationLogic'
const messaging = firebase.messaging()

import './index.scss'

const { Text } = Typography

const Notifications: React.FC = () => {
    const [open, setOpen] = useState(false)
    const { selectedDistrictName, dose, selectedAgeGroup } = useValues(findSlotsLogic)
    const { setTokenSentToServer } = useActions(notificationLogic)
    //const { isTokenSentToServer } = useValues(notificationLogic)

    const handleClose = (): void => {
        setOpen(false)
    }

    const getToken = (): void => {
        messaging
            .getToken({
                vapidKey: 'BCCy_QI4pW6YNdntCWrikXO5Eq4Eo0IAT1EEPp9a9-MmCHd3Ick88-GP3ndOLJt33KyJtbDmP7v6CTE47Vn8IAQ',
            })
            .then((currentToken) => {
                if (currentToken) {
                    //sendTokenToServer(currentToken)
                    console.log(currentToken)
                } else {
                    // Show permission request.
                    console.log('No registration token available. Request permission to generate one.')
                    setTokenSentToServer(false)
                }
            })
            .catch((err) => {
                console.log('An error occurred while retrieving token. ', err)
                setTokenSentToServer(false)
            })
    }

    // const sendTokenToServer = (currentToken):void => {
    //     if (!isTokenSentToServer) {
    //         console.log('Sending token to server...', currentToken)
    //         // TODO(developer): Send the current token to your server.

    //         setTokenSentToServer(true)
    //     } else {
    //         console.log("Token already sent to server so won't send it again " + 'unless it changes')
    //     }
    // }

    const requestPermission = (): void => {
        console.log('Requesting permission.....')
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted')
                getToken()
            } else {
                console.log('Unable to get permission to notify')
            }
        })
    }

    const deleteToken = (): void => {
        // Delete registration token.
        messaging
            .getToken()
            .then((currentToken) => {
                messaging
                    .deleteToken(currentToken)
                    .then(() => {
                        console.log('Token deleted.')
                        setTokenSentToServer(false)
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
                message="Notify me when a slot opens up"
                type="info"
                onClick={() => setOpen(true)}
                showIcon
                icon={<NotificationsIcon fontSize="small" className="bell" />}
                action={<ArrowForwardIosIcon fontSize="small" className="rightIcon" />}
                className="alert cursor-pointer"
            />
            <Dialog open={open} onClose={handleClose} className="text-center">
                <div id="notification_dialog_title" className="pa">
                    <div className="mt">
                        <Text className="dialog_title">Turn on Notifications</Text>
                    </div>

                    <div className="pb pr pl mt-025">
                        <Text type="secondary" className="dialog_description">
                            You will get a notification for the following filters:
                        </Text>
                    </div>
                </div>

                <div id="notification_dialog_filters" className="pl pr pb-2">
                    <Descriptions bordered>
                        <Descriptions.Item label="District">{selectedDistrictName}</Descriptions.Item>
                        <Descriptions.Item label="Age Group">{selectedAgeGroup}+</Descriptions.Item>
                        <Descriptions.Item label="Dose">
                            {dose == 'available_capacity_dose1' ? 'Dose 1' : 'Dose 2'}{' '}
                        </Descriptions.Item>
                    </Descriptions>
                </div>

                <div id="notification_dialog_actions">
                    <Divider />

                    <Button type="text" className="turn_on_button mt-05 mb-05" onClick={requestPermission}>
                        Turn On
                    </Button>

                    <Divider />

                    <Button type="text" className="mt-05 mb-05" onClick={deleteToken}>
                        Not Now
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default Notifications
