import React from 'react'
import { useActions, useValues } from 'kea'
import FilterButton from './FilterButton'
import { Radio, Checkbox, Space } from 'antd'
import { findSlotsLogic } from '../../../scenes/findSlots/findSlotsLogic'
import { filterButtonLogic } from './filterButtonLogic'

import './index.scss'

export const DoseFilter: React.FC = () => {
    const id = 1
    const { dose } = useValues(findSlotsLogic)
    const { setSelectedDose } = useActions(findSlotsLogic)
    const { setVisibility } = useActions(filterButtonLogic({ id }))

    const handleChange = (e: any): void => {
        setSelectedDose(e.target.value)
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
    const { selectedAgeGroup } = useValues(findSlotsLogic)
    const { setUniversalSelectedAgeGroup } = useActions(findSlotsLogic)
    const { setVisibility } = useActions(filterButtonLogic({ id }))

    const handleChange = (e: any): void => {
        setUniversalSelectedAgeGroup(e.target.value)
        setVisibility(false)
    }

    const ageFilterContent = (
        <Radio.Group onChange={handleChange} value={selectedAgeGroup}>
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
    return (
        <FilterButton
            id={id}
            content={ageFilterContent}
            applied={selectedAgeGroup ? true : false}
            label={selectedAgeGroup ? selectedAgeGroup : 'Age'}
        />
    )
}

export const VaccineFilter: React.FC = () => {
    const id = 3
    const { vaccine } = useValues(findSlotsLogic)
    const { covaxin, covishield } = vaccine
    const { setSelectedVaccine } = useActions(findSlotsLogic)
    const { setVisibility } = useActions(filterButtonLogic({ id }))

    const handleChange = (e: any): void => {
        setSelectedVaccine({ ...vaccine, [e.target.value]: e.target.checked })
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
