import { kea } from 'kea'
import api from 'lib/api'

import { findSlotsLogicType } from './findSlotsLogicType'

export const findSlotsLogic = kea<findSlotsLogicType>({
    actions: () => ({
        setSelectedState: (selectedState: number | null) => ({ selectedState }),
        setSelectedDistrict: (selectedDistrict: number | null) => ({ selectedDistrict }),
        setUniversalSelectedDistrict: (selectedDistrict: number | null) => ({ selectedDistrict }),
        setSelectedAgeGroup: (selectedAgeGroup: string | null) => ({ selectedAgeGroup }),
        setUniversalSelectedAgeGroup: (selectedAgeGroup: string | null) => ({ selectedAgeGroup }),
        setSelectedDose: (dose: number) => ({ dose }),
        setSelectedVaccine: (vaccine: Record<string, unknown>) => ({ vaccine }),
    }),

    reducers: () => ({
        selectedState: [
            null as null,
            { persist: true },
            {
                setSelectedState: (_: any, { selectedState }) => selectedState,
            },
        ],
        selectedDistrict: [
            null as null,
            { persist: true },
            {
                setSelectedDistrict: (_: any, { selectedDistrict }) => selectedDistrict,
                setUniversalSelectedDistrict: (_: any, { selectedDistrict }) => selectedDistrict,
            },
        ],
        selectedAgeGroup: [
            null as null,
            { persist: true },
            {
                setSelectedAgeGroup: (_: any, { selectedAgeGroup }) => selectedAgeGroup,
                setUniversalSelectedAgeGroup: (_: any, { selectedAgeGroup }) => selectedAgeGroup,
            },
        ],
        districts: [[], { persist: true }, {}],
        states: [[], { persist: true }, {}],
        dose: [
            'available_capacity_dose1' as string,
            { persist: true },
            {
                setSelectedDose: (_: any, { dose }) => dose,
            },
        ],
        vaccine: [
            {
                COVAXIN: false,
                COVISHIELD: false,
            },
            { persist: true },
            {
                setSelectedVaccine: (_: any, { vaccine }) => vaccine,
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
                console.log('Loading States')
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
    selectors: {
        selectedDistrictName: [
            (selectors) => [selectors.districts, selectors.selectedDistrict],
            (districts, selectedDistrict) => {
                return districts.find((elem) => elem.district_id === selectedDistrict).district_name
            },
        ],
    },

    // actionToUrl: ({ values }) => ({
    //     setSelectedState: () => ['/findSlots', { state_id: values.selectedState }],
    //     setSelectedDistrict: () => [
    //         '/findSlots',
    //         { state_id: values.selectedState, district_id: values.selectedDistrict },
    //     ],
    //     setSelectedAgeGroup: () => [
    //         '/findSlots',
    //         {
    //             state_id: values.selectedState,
    //             district_id: values.selectedDistrict,
    //             age_group: values.selectedAgeGroup,
    //         },
    //     ],
    // }),

    // urlToAction: ({ actions, values }) => ({
    //     '/findSlots': (
    //         {},
    //         searchParams: Record<'state_id' | 'district_id' | 'age_group', string | string | number>
    //     ) => {
    //         if (searchParams.state_id && searchParams.state_id !== values.selectedState) {
    //             actions.setSelectedState(searchParams.state_id)
    //         }
    //         if (searchParams.district_id && searchParams.district_id !== values.selectedDistrict) {
    //             actions.setSelectedDistrict(searchParams.district_id)
    //         }
    //         if (searchParams.age_group && searchParams.age_group !== values.selectedAgeGroup) {
    //             actions.setSelectedAgeGroup(searchParams.age_group)
    //         }
    //     },
    // }),

    events: ({ actions }) => ({
        afterMount: [actions.loadStates],
    }),
})
