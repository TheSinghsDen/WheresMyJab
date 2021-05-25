import { kea } from 'kea'

import { listAllSlotsLogic } from 'scenes/listAllSlots/listAllSlotsLogic'
import { findSlotsLogic } from 'scenes/findSlots/findSlotsLogic'
import { dayWiseListLogicType } from './dayWiseListLogicType'

export const dayWiseListLogic = kea<dayWiseListLogicType>({
    connect: {
        values: [listAllSlotsLogic, ['slots']],
    },
    selectors: {
        slotsForAllDays: [
            (selectors) => [selectors.slots],
            (slots) => {
                const arr = []
                const appliedVaccineFilter = Object.keys(findSlotsLogic.values.vaccine).filter((k) => {
                    return findSlotsLogic.values.vaccine[k]
                })
                const appliedAgeFilter = findSlotsLogic.values.selectedAgeGroup
                const appliedDoseFilter = findSlotsLogic.values.dose

                slots.map((center) => {
                    center.sessions.map((session) => {
                        if (appliedAgeFilter == session.min_age_limit) {
                            if (appliedVaccineFilter.length && appliedVaccineFilter.includes(session.vaccine)) {
                                const i = arr.findIndex((o) => o.date === session.date)
                                if (i > -1) {
                                    arr[i].slotCapacity += session[appliedDoseFilter]
                                } else {
                                    arr.push({
                                        date: session.date,
                                        slotCapacity: session[appliedDoseFilter],
                                    })
                                }
                            } else if (!appliedVaccineFilter.length) {
                                arr.push({
                                    date: session.date,
                                    slotCapacity: session.available_capacity_dose1,
                                })
                            }
                        }
                    })
                })

                return arr.sort((a, b) => {
                    new Date(b.date) - new Date(a.date)
                })
            },
        ],
    },
})
