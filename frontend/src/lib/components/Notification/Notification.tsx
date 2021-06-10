import React, { useEffect } from 'react'
import { useValues, useActions } from 'kea'
import { notificationLogic } from './notificationLogic'
import Subscribe from './Subscribe'
import UnSubscribe from './UnSubscibe'
// const messaging = firebase.messaging()

import './index.scss'

const Notifications: React.FC = () => {
    const { setTokenSentToServer } = useActions(notificationLogic)
    const { isTokenSentToServer } = useValues(notificationLogic)

    useEffect(() => {
        resetUI()
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
        if (!isTokenSentToServer) {
            console.log('Sending token to server...', currentToken)
            // TODO(developer): Send the current token to your server.

            setTokenSentToServer(true)
        } else {
            console.log("Token already sent to server so won't send it again " + 'unless it changes')
        }
    }

    return <div>{!isTokenSentToServer ? <Subscribe /> : <UnSubscribe />}</div>
}

export default Notifications
