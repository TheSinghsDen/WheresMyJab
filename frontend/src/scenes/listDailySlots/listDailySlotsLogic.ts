import { kea } from 'kea'
import { listDailySlotsLogicType } from './listDailySlotsLogicType'
import { findSlotsLogic } from 'scenes/findSlots/findSlotsLogic'
import api from 'lib/api'

export const listDailySlotsLogic = kea<listDailySlotsLogicType>({
    connect: {
        actions: [findSlotsLogic, ['setUniversalSelectedAgeGroup', 'setSelectedDose', 'setSelectedVaccine']],
    },
    actions: {
        setDate: (date) => ({ date }),
    },
    reducers: {
        date: [
            '',
            { persist: true },
            {
                setDate: (_, { date }) => date,
            },
        ],
    },
    loaders: ({ values }) => ({
        centers: {
            loadCenters: async () => {
                console.log('Fetching Centers')
                const response = await api.get(
                    `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict/` +
                        `?district_id=${findSlotsLogic.values.selectedDistrict}&&date=${values.date}`
                )
                return response.sessions
            },
        },
    }),
    selectors: {
        filteredSessions: [
            (selectors) => [selectors.centers],
            (centers) => {
                const appliedVaccineFilter = Object.keys(findSlotsLogic.values.vaccine).filter((k) => {
                    return findSlotsLogic.values.vaccine[k]
                })
                const appliedAgeFilter = findSlotsLogic.values.selectedAgeGroup
                const appliedDoseFilter = findSlotsLogic.values.dose

                const filteredOutput =
                    centers &&
                    centers.filter((center) => {
                        return (
                            appliedAgeFilter == center.min_age_limit &&
                            ((appliedVaccineFilter.length && appliedVaccineFilter.includes(center.vaccine)) ||
                                !appliedVaccineFilter.length)
                        )
                    })
                return (
                    filteredOutput &&
                    filteredOutput.sort((a, b) => {
                        return b[appliedDoseFilter] - a[appliedDoseFilter]
                    })
                )
            },
        ],
    },
    listeners: ({ actions }) => ({
        setUniversalSelectedAgeGroup: actions.loadCenters,
        setSelectedDose: actions.loadCenters,
        setSelectedVaccine: actions.loadCenters,
    }),
    events: ({ actions }) => ({
        afterMount: [actions.loadCenters],
    }),
})
