import { kea } from 'kea'
import { notificationLogicType } from './notificationLogicType'

export const notificationLogic = kea<notificationLogicType>({
    actions: () => ({
        setTokenSentToServer: (isTokenSentToServer: boolean) => ({ isTokenSentToServer }),
        setFilterSettings: (filterSettings: string) => ({ filterSettings }),
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
    }),
})
