import { kea } from 'kea'

import { filterLogicType } from './filterLogicType'

export const filterLogic = kea<filterLogicType>({
    actions: () => ({
        setAgeFilter: (age: string) => ({ age }),
        setDoseFilter: (dose: number) => ({ dose }),
        setVaccineFilter: (vaccine: Record<string, unknown>) => ({ vaccine }),
    }),
    reducers: () => ({
        age: [
            null as null,
            {
                setAgeFilter: (_: any, { age }) => age,
            },
        ],
        dose: [
            null as null,
            {
                setDoseFilter: (_: any, { dose }) => dose,
            },
        ],
        vaccine: [
            {
                covaxin: false,
                covishield: false,
            },
            {
                setVaccineFilter: (_: any, { vaccine }) => vaccine,
            },
        ],
    }),
})
