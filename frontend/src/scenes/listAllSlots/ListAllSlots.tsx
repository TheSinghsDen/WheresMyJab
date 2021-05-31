import React, { useRef } from 'react'
import { Row, Col, Typography, Select, Skeleton } from 'antd'
import { BackTo } from 'lib/components/BackTo'
import { findSlotsLogic } from '../findSlots/findSlotsLogic'
import { useActions, useValues } from 'kea'
import { AgeFilter, DoseFilter, VaccineFilter } from 'lib/components/Filter/FIlters'
import { listAllSlotsLogic } from './listAllSlotsLogic'
import DayWiseList from 'lib/components/DayWiseList/DayWiseList'

import './index.scss'

const { Text, Title } = Typography
const { Option } = Select

const ListAllSlots = (): JSX.Element => {
    const { districts, selectedDistrict } = useValues(findSlotsLogic)
    const { setUniversalSelectedDistrict } = useActions(findSlotsLogic)
    const { slotsLoading } = useValues(listAllSlotsLogic)
    const { loadSlots } = useActions(listAllSlotsLogic)

    const districtRef = useRef(null)

    const changeDistrict = (value: number): void => {
        setUniversalSelectedDistrict(value)
        setTimeout(() => {
            districtRef.current.blur()
        }, 20)
        loadSlots()
    }

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
                    onChange={changeDistrict}
                    ref={districtRef}
                    dropdownAlign={{
                        points: ['tl', 'bl'], // align dropdown top-left to bottom-left  of input element
                        offset: [0, 2], // align offset
                        overflow: {
                            adjustX: 0,
                            adjustY: 0, // do not auto flip in y-axis
                        },
                    }}
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

            <Row justify="start" align="middle" className="pl" gutter={[0, 10]}>
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
            {slotsLoading ? <Skeleton active /> : <DayWiseList />}
        </div>
    )
}

export default ListAllSlots
