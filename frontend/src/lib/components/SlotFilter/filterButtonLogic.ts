import { kea } from 'kea'

import { filterButtonLogicType } from './filterButtonLogicType'

export const filterButtonLogic = kea<filterButtonLogicType>({
    key: (props) => props.id,
    actions: () => ({
        setVisibility: (visibility: boolean) => ({ visibility }),
    }),
    reducers: () => ({
        visibility: [
            false as boolean,
            {
                setVisibility: (_: any, { visibility }) => visibility,
            },
        ],
    }),
})
