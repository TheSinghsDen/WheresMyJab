import React from 'react'
import { Row, Col, Typography, Select } from 'antd'
import { BackTo } from '../../lib/components/BackTo'
import { findSlotsLogic } from '../findSlots/findSlotsLogic'
import { useActions, useValues } from 'kea'
import { AgeFilter, DoseFilter, VaccineFilter } from '../../lib/components/SlotFilter/FIlters'
import { listAllSlotsLogic } from './listAllSlotsLogic'

import './index.scss'

const { Text, Title } = Typography
const { Option } = Select

const ListAllSlots = (): JSX.Element => {
    const { districts, selectedDistrict } = useValues(findSlotsLogic)
    const { setUniversalSelectedDistrict } = useActions(findSlotsLogic)
    const { slots } = useValues(listAllSlotsLogic)
    console.log(slots)

    return (
        <div>
            <Row justify="start" align="middle" className="ml mt-05">
                <BackTo />
                <Text className="availableSlots pl">Available Slots</Text>
            </Row>

            <Row justify="center" align="middle" className="pa mt">
                <Select
                    showSearch
                    size="large"
                    style={{ width: '100%' }}
                    placeholder="Select District"
                    optionFilterProp="title"
                    value={districts && selectedDistrict}
                    onChange={(v) => setUniversalSelectedDistrict(v)}
                >
                    {districts &&
                        districts.map((district) => (
                            <Option
                                key={district.district_id}
                                value={district.district_id}
                                title={district.district_name}
                            >
                                {district.district_name}
                            </Option>
                        ))}
                </Select>
            </Row>
            <Row justify="start" align="middle" className="pl">
                <Title level={5}>Filters</Title>
            </Row>

            <Row justify="start" align="middle" className="pl">
                <Col>
                    <DoseFilter />
                </Col>
                <Col>
                    <AgeFilter />
                </Col>
                <Col>
                    <VaccineFilter />
                </Col>
            </Row>
        </div>
    )
}

export default ListAllSlots
