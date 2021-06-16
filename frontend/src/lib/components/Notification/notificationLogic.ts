import { kea } from 'kea'
import api from 'lib/api'
import { notificationLogicType } from './notificationLogicType'

interface SendTokenPayloadInterface {
    topic_name: string
    device_token: string
}

export const notificationLogic = kea<notificationLogicType>({
    actions: () => ({
        setTokenSentToServer: (isTokenSentToServer: boolean) => ({ isTokenSentToServer }),
        setFilterSettings: (filterSettings: string) => ({ filterSettings }),
        setToken: (token: string) => ({ token }),
        reset: true,
    }),
    reducers: () => ({
        isTokenSentToServer: [
            false,
            { persist: true },
            {
                setTokenSentToServer: (_: any, { isTokenSentToServer }) => isTokenSentToServer,
                reset: () => false,
            },
        ],
        filterSettings: [
            '',
            { persist: true },
            {
                setFilterSettings: (_: any, { filterSettings }) => filterSettings,
                reset: () => '',
            },
        ],
        token: [
            '',
            { persist: true },
            {
                setToken: (_: any, { token }) => token,
                reset: () => '',
            },
        ],
    }),
    loaders: () => ({
        subscribeToTopic: [
            null as null,
            {
                subscribeToTopic: async (payload: SendTokenPayloadInterface) => {
                    const response = await api.create(`http://localhost:5000/api/subscribe`, payload)
                    console.log(response)
                    return response
                },
            },
        ],
    }),
})
