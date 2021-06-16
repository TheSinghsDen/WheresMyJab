import React, { useEffect } from 'react'
import { useValues, useActions } from 'kea'
import { notificationLogic } from './notificationLogic'
import Subscribe from './Subscribe'
import UnSubscribe from './UnSubscibe'
import './index.scss'

const messaging = firebase.messaging()

const Notifications: React.FC = () => {
    const { setTokenSentToServer, subscribeToTopic } = useActions(notificationLogic)
    const { isTokenSentToServer, token, filterSettings } = useValues(notificationLogic)

    useEffect(() => {
        if (isTokenSentToServer) {
            resetUI()
        }
    }, [])

    const resetUI = (): void => {
        if (Notification.permission === 'granted') {
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
    }

    const sendTokenToServer = (currentToken: string): void => {
        if (token !== currentToken && filterSettings !== "") {
            const payload = {
                topic_name: filterSettings,
                device_token: currentToken
            }

            subscribeToTopic(payload) 
        }
    }

    return <div>{!isTokenSentToServer ? <Subscribe /> : <UnSubscribe />}</div>
}

export default Notifications
