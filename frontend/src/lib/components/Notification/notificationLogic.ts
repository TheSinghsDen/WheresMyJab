import { kea } from 'kea'
import { notificationLogicType } from './notificationLogicType'

export const notificationLogic = kea<notificationLogicType>({
    actions: () => ({
        setTokenSentToServer: (isTokenSentToServer: boolean) => ({ isTokenSentToServer }),
    }),
    reducers: () => ({
        isTokenSentToServer: [
            false,
            { persist: true },
            {
                setTokenSentToServer: (_: any, { isTokenSentToServer }) => isTokenSentToServer,
            },
        ],
    }),
})
