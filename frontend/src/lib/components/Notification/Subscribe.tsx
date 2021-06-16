import React, { useState } from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import { Alert, Typography, Button, Descriptions } from 'antd'
import { findSlotsLogic } from 'scenes/findSlots/findSlotsLogic'
import { useValues, useActions } from 'kea'
import { notificationLogic } from './notificationLogic'
import sad from 'lib/components/HedgehogOverlay/assets/sad.svg'
import CircularProgress from '@material-ui/core/CircularProgress'
import logo from 'public/logo.png'
import './index.scss'

const messaging = firebase.messaging()

const images = {
    sad,
}

const AskPermissionFirst = 'AskPermissionFirst'
const SendTokenToServer = 'SendTokenToServer'

const { Text } = Typography

const Subscribe: React.FC = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const { selectedDistrict, selectedDistrictName, dose, selectedAgeGroup } = useValues(findSlotsLogic)
    const { setTokenSentToServer, setFilterSettings, subscribeToTopic,setToken } = useActions(notificationLogic)
    const { filterSettings } = useValues(notificationLogic)
    const [loading, setLoading] = useState(false)
    const [dialogStatus, setDialogStatus] = useState(AskPermissionFirst)
    const [notificationPermission, setNotificationPermission] = useState(Notification.permission)

    const handleCloseSubscribe = (): void => {
        setOpenDialog(false)
        if (filterSettings) {
            setTokenSentToServer(true)
        }
    }

    const resetUI = (): void => {
        messaging
            .getToken({
                vapidKey: 'BCCy_QI4pW6YNdntCWrikXO5Eq4Eo0IAT1EEPp9a9-MmCHd3Ick88-GP3ndOLJt33KyJtbDmP7v6CTE47Vn8IAQ',
            })
            .then((currentToken: string) => {
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

    const sendTokenToServer = (currentToken: string): void => {
        const topic_name = `${selectedDistrict}_${selectedDistrictName}_${selectedAgeGroup}_${dose == 'available_capacity_dose1' ? 'dose1' : 'dose2'}`
        console.log('Sending token to server...', currentToken)
        const payload = {
            topic_name: topic_name.replace(/ /g,''),
            device_token: currentToken
        }
        subscribeToTopic(payload)
        console.log(topic_name.replace(/ /g,''))
        setLoading(false)
        setFilterSettings(topic_name)
        setToken(currentToken)
        setTimeout(() => {
            setTokenSentToServer(true)
        }, 10000);
    }
1

    const requestPermission = (): void => {
        setDialogStatus(SendTokenToServer)
        setLoading(true)
        console.log('Requesting permission.....')
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted')
                setNotificationPermission(permission)
                resetUI()
            } else {
                console.log('Unable to get permission to notify')
                setNotificationPermission(permission)
            }
        })
    }

    const RequestPermissionDialog: React.FC = () => (
        <>
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
        </>
    )

    const PermissionDeniedDialog: React.FC = () => (
        <>
            <div className="mt-2" id="permission_denied_image">
                <img src={images['sad']} alt="Notifications Blocked" className="hedgehog" />
            </div>
            <div id="permission_denied_dialog_title" className="pa">
                <div className="mt">
                    <Text className="dialog_title">Notifications Blocked</Text>
                </div>

                <div className="pb pr pl mt-025">
                    <Text type="secondary" className="dialog_description">
                        Please enable them in your browser to recieve updates.
                    </Text>
                </div>
            </div>

            <div id="permission_denied_dialog_actions">
                <Divider />

                <Button type="text" className="mt-05 mb-05" onClick={handleCloseSubscribe}>
                    Close
                </Button>
            </div>
        </>
    )

    const SendTokenToServerDialog: React.FC = () => (
        <>
            <div id="sending_token_animation" className="mt sending_token_animation">
                {loading ? (
                    <CircularProgress size="5rem" className="loading" />
                ) : (
                    <img src={logo} className={loading ? 'logo_hide' : 'logo_show'} />
                )}
            </div>

            <div id="send_token_to_sever_dialog_actions" style={{ visibility: loading ? 'hidden' : 'visible' }}>
                <div id="send_token_dialog_title" className="pa">
                    <div>
                        <Text className="dialog_title">Notifications Enabled</Text>
                    </div>

                    <div className="pb pr pl mt-025">
                        <Text type="secondary" className="dialog_description">
                            You will be notified when there's a slot available in your area.
                        </Text>
                    </div>
                </div>
                <Divider />

                <Button type="text" className="mt-05 mb-05" onClick={handleCloseSubscribe}>
                    Close
                </Button>
            </div>
        </>
    )

    return (
        <div>
            <Alert
                message="Notify me when a slot opens up"
                type="info"
                onClick={() => setOpenDialog(true)}
                showIcon
                icon={<NotificationsIcon fontSize="small" className="bell_subscribe" />}
                action={<ArrowForwardIosIcon fontSize="small" className="rightIcon" />}
                className="alert_subscribe cursor-pointer"
            />
            <Dialog
                open={openDialog}
                onClose={handleCloseSubscribe}
                className="text-center"
                id="subscribe_dialog"
                disableBackdropClick={loading}
            >
                {notificationPermission === 'denied' ? (
                    <PermissionDeniedDialog />
                ) : dialogStatus === AskPermissionFirst ? (
                    <RequestPermissionDialog />
                ) : (
                    <SendTokenToServerDialog />
                )}
            </Dialog>
        </div>
    )
}

export default Subscribe
