import { kea } from 'kea'
import api from 'lib/api'

import { findSlotsLogicType } from './findSlotsLogicType'

export const findSlotsLogic = kea<findSlotsLogicType>({
    actions: () => ({
        setSelectedState: (selectedState: number | null) => ({ selectedState }),
        setSelectedDistrict: (selectedDistrict: number | null) => ({ selectedDistrict }),
        setSelectedAgeGroup: (selectedAgeGroup: string | null) => ({ selectedAgeGroup }),
    }),

    reducers: () => ({
        selectedState: [
            null as null,
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
        selectedAgeGroup: [
            null as null,
            {
                setSelectedAgeGroup: (_: any, { selectedAgeGroup }) => selectedAgeGroup,
            },
        ],
    }),

    listeners: ({ actions }) => ({
        setSelectedState: () => {
            actions.setSelectedDistrict(null)
            actions.loadDistricts()
        },
    }),

    loaders: ({ values }) => ({
        states: {
            loadStates: async () => {
                const response = await api.get('https://cdn-api.co-vin.in/api/v2/admin/location/states')
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

    actionToUrl: ({ values }) => ({
        setSelectedState: () => ['/findSlots', { state_id: values.selectedState }],
        setSelectedDistrict: () => [
            '/findSlots',
            { state_id: values.selectedState, district_id: values.selectedDistrict },
        ],
        setSelectedAgeGroup: () => [
            '/findSlots',
            {
                state_id: values.selectedState,
                district_id: values.selectedDistrict,
                age_group: values.selectedAgeGroup,
            },
        ],
    }),

    events: ({ actions }) => ({
        afterMount: [actions.loadStates],
    }),
})
