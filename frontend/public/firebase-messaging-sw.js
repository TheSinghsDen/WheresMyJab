importScripts('/__/firebase/8.6.3/firebase-app.js')
importScripts('/__/firebase/8.6.3/firebase-messaging.js')
importScripts('/__/firebase/init.js?useEmulator=true')

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload)
    // Customize notification here
    console.log(payload)
    const notificationTitle = 'Background Message Title'
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png',
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
})
