importScripts('/__/firebase/8.6.3/firebase-app.js')
importScripts('/__/firebase/8.6.3/firebase-messaging.js')
importScripts('/__/firebase/init.js')

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload)

    //Disabled to prevent over-crowding of notifications

    // const notificationTitle = payload.notification.title
    // const notificationOptions = {
    //     body: payload.notification.body,
    //     icon: '/logo.png',
    // }

    // self.registration.showNotification(notificationTitle, notificationOptions)
})
