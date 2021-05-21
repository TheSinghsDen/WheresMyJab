import { kea } from 'kea'
import api from 'lib/api'

import { homePageLogicType } from './homePageLogicType'
export const homePageLogic = kea<homePageLogicType>({
    loaders: () => ({
        states: {
            loadStates: async () => {
                const response = await api.get('https://cdn-api.co-vin.in/api/v2/admin/location/states')
                return response.states
            },
        },
    }),

    events: ({ actions }) => ({
        afterMount: [actions.loadStates],
    }),
})
