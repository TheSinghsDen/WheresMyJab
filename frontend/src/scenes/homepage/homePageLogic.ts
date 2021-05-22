import { kea } from 'kea'
import api from 'lib/api'

import { homePageLogicType } from './homePageLogicType'

export const homePageLogic = kea<homePageLogicType>({
    actions: () => ({
        setSelectedState: (selectedState: number) => ({ selectedState }),
        setSelectedDistrict: (selectedDistrict: number) => ({ selectedDistrict }),
    }),

    reducers: () => ({
        selectedState: [
            23 as number,
            {
                setSelectedState: (_: any, { selectedState }) => selectedState,
            },
        ],
        selectedDistrict: [
            null as null,
            {
                setSelectedDistrict: (_: any, { selectedDistrict }) => selectedDistrict,
            },
        ],
    }),

    listeners: ({ actions }) => ({
        setSelectedState: () => {
            actions.setSelectedDistrict(null)
            actions.loadDistricts()
        },
    }),

    loaders: ({ values, actions }) => ({
        states: {
            loadStates: async () => {
                const response = await api.get('https://cdn-api.co-vin.in/api/v2/admin/location/states')
                actions.setSelectedState(23) // Change this to the value fetched from the params in the URL
                return response.states
            },
        },
        districts: {
            loadDistricts: async () => {
                const response = await api.get(
                    `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${values.selectedState}`
                )
                return response.districts
            },
        },
    }),

    events: ({ actions }) => ({
        afterMount: [actions.loadStates],
    }),
})
