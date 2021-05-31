import React from 'react'
import { Row, Col, Typography, Input, DatePicker, Skeleton } from 'antd'
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons'
import { BackTo } from 'lib/components/BackTo'
import CentersSessionCard from 'lib/components/CentersSessionCard/CentersSessionCard'
import { findSlotsLogic } from '../findSlots/findSlotsLogic'
import { listDailySlotsLogic } from './listDailySlotsLogic'
import { useValues, useActions } from 'kea'
import { AgeFilter, DoseFilter, VaccineFilter } from 'lib/components/Filter/FIlters'
import { humanFriendlyDate, validDate } from 'lib/utils'
import moment from 'moment'

const { Text, Title } = Typography

const ListDailySlots: React.FC = () => {
    const { selectedDistrictName } = useValues(findSlotsLogic)
    const { date, filteredSessions, centersLoading } = useValues(listDailySlotsLogic)
    const { setDate, loadCenters } = useActions(listDailySlotsLogic)

    const handlePicker = (d, ds): void => {
        setDate(ds)
        loadCenters()
    }

    return (
        <div>
            <Row justify="space-between" align="middle" className="ml mt-05 mr-05">
                <Col flex="10px">
                    <BackTo />
                </Col>

                <Col flex="auto">
                    <Text className="pl" style={{ fontSize: '20px' }}>
                        {selectedDistrictName}
                    </Text>
                </Col>

                <Col flex="10px">
                    <DatePicker
                        inputReadOnly
                        allowClear={false}
                        mode="date"
                        format="DD-MM-YYYY"
                        bordered={false}
                        suffixIcon={<CalendarOutlined style={{ color: 'black', fontSize: '16px' }} />}
                        disabledDate={(current) => {
                            return current < moment().subtract(1, 'day') || current > moment().add(1, 'month')
                        }}
                        value={moment(validDate(date))}
                        onChange={handlePicker}
                    />
                </Col>
            </Row>

            <Row justify="center" align="middle" className="pt pl pr">
                <Title level={4}>{humanFriendlyDate(date)}</Title>
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

            <Row justify="center" align="middle" className="pa">
                <Input placeholder="Search by Hospital or Pincode" size="large" suffix={<SearchOutlined />} />
            </Row>
            {centersLoading ? (
                <Skeleton active />
            ) : (
                <div className="pa mt2">
                    {filteredSessions && filteredSessions.length ? (
                        filteredSessions.map((center) => {
                            return <CentersSessionCard key={center.center_id} details={center} />
                        })
                    ) : (
                        <Row justify="center" align="middle">
                            <Title level={5}>No Slots available in this area</Title>
                        </Row>
                    )}
                </div>
            )}
        </div>
    )
}

export default ListDailySlots
