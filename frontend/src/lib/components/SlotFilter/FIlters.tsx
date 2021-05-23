import React from 'react'
import { useActions, useValues } from 'kea'
import FilterButton from './FilterButton'
import { Radio, Checkbox, Space } from 'antd'
import { filterLogic } from './filterLogic'
import { filterButtonLogic } from './filterButtonLogic'

import './index.scss'

export const DoseFilter: React.FC = () => {
    const id = 1
    const { dose } = useValues(filterLogic)
    const { setDoseFilter } = useActions(filterLogic)
    const { setVisibility } = useActions(filterButtonLogic({ id }))

    const handleChange = (e: any): void => {
        setDoseFilter(e.target.value)
        setVisibility(false)
    }
    const doseFilterContnet = (
        <Radio.Group onChange={handleChange} value={dose}>
            <Space direction="vertical">
                <Radio className="text-large" value="Dose 1">
                    Dose 1
                </Radio>
                <Radio className="text-large" value="Dose 2">
                    Dose 2
                </Radio>
            </Space>
        </Radio.Group>
    )
    return (
        <FilterButton id={id} content={doseFilterContnet} applied={dose ? true : false} label={dose ? dose : 'Dose'} />
    )
}

export const AgeFilter: React.FC = () => {
    const id = 2
    const { age } = useValues(filterLogic)
    const { setAgeFilter } = useActions(filterLogic)
    const { setVisibility } = useActions(filterButtonLogic({ id }))

    const handleChange = (e: any): void => {
        setAgeFilter(e.target.value)
        setVisibility(false)
    }

    const ageFilterContent = (
        <Radio.Group onChange={handleChange} value={age}>
            <Space direction="vertical">
                <Radio className="text-large" value="18+">
                    18+
                </Radio>
                <Radio className="text-large" value="45+">
                    45+
                </Radio>
            </Space>
        </Radio.Group>
    )
    return <FilterButton id={id} content={ageFilterContent} applied={age ? true : false} label={age ? age : 'Age'} />
}

export const VaccineFilter: React.FC = () => {
    const id = 3
    const { vaccine } = useValues(filterLogic)
    const { covaxin, covishield } = vaccine
    const { setVaccineFilter } = useActions(filterLogic)
    const { setVisibility } = useActions(filterButtonLogic({ id }))

    const handleChange = (e: any): void => {
        setVaccineFilter({ ...vaccine, [e.target.value]: e.target.checked })
        setVisibility(false)
    }

    const vaccineFilterContent = (
        <Checkbox.Group>
            <Space direction="vertical">
                <Checkbox className="text-large" value="covaxin" checked={covaxin} onChange={handleChange}>
                    Covaxin
                </Checkbox>

                <Checkbox className="text-large" value="covishield" checked={covishield} onChange={handleChange}>
                    Covishield
                </Checkbox>
            </Space>
        </Checkbox.Group>
    )
    return (
        <FilterButton
            id={3}
            content={vaccineFilterContent}
            applied={covaxin || covishield ? true : false}
            label={
                covaxin && covishield
                    ? 'Vaccine(2)'
                    : covaxin || covishield
                    ? covaxin
                        ? 'Covaxin'
                        : 'Covishield'
                    : 'Vaccine'
            }
        />
    )
}
