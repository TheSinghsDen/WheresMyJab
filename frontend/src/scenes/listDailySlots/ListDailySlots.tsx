import React from 'react'
import { Row, Col, Typography } from 'antd'
import { BackTo } from 'lib/components/BackTo'
import { findSlotsLogic } from '../findSlots/findSlotsLogic'
import { useValues } from 'kea'
import { AgeFilter, DoseFilter, VaccineFilter } from 'lib/components/Filter/FIlters'

const { Text, Title } = Typography

const ListDailySlots = (): JSX.Element => {
    const { selectedDistrictName } = useValues(findSlotsLogic)

    return (
        <div>
            <Row justify="start" align="middle" className="ml mt-05">
                <BackTo />
                <Text className="pl" style={{ fontSize: '20px' }}>
                    {selectedDistrictName}
                </Text>
            </Row>

            <Row justify="center" align="middle" className="pa mt">
                hello
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

export default ListDailySlots
