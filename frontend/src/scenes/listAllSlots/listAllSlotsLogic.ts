import { kea } from 'kea'
import api from 'lib/api'
import { findSlotsLogic } from 'scenes/findSlots/findSlotsLogic'
import { listAllSlotsLogicType } from './listAllSlotsLogicType'

let today: any = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
const yyyy = today.getFullYear()
today = dd + '-' + mm + '-' + yyyy

export const listAllSlotsLogic = kea<listAllSlotsLogicType>({
    connect: {
        actions: [findSlotsLogic, ['setUniversalSelectedAgeGroup', 'setSelectedDose', 'setSelectedVaccine']],
    },
    loaders: () => ({
        slots: {
            loadSlots: async () => {
                console.log('Fetching Slots')
                const response = await api.get(
                    `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict/` +
                        `?district_id=${findSlotsLogic.values.selectedDistrict}&&date=${today}`
                )
                return response.centers
            },
        },
    }),
    listeners: ({ actions }) => ({
        setUniversalSelectedAgeGroup: actions.loadSlots,
        setSelectedDose: actions.loadSlots,
        setSelectedVaccine: actions.loadSlots,
    }),
    events: ({ actions }) => ({
        afterMount: [actions.loadSlots],
    }),
})
