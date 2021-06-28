import React, { useState, useEffect } from 'react'
import { Row, Col, Typography, Input, DatePicker, Skeleton } from 'antd'
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import IconButton from '@material-ui/core/IconButton'
import { BackTo } from 'lib/components/BackTo'
import CentersSessionCard from 'lib/components/CentersSessionCard/CentersSessionCard'
import { findSlotsLogic } from 'scenes/findSlots/findSlotsLogic'
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
    const [search, setToSearch] = useState('')

    const handlePicker = (ds): void => {
        setDate(ds)
        loadCenters()
    }

    useEffect(() => {
        loadCenters()
    }, [])

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
                        suffixIcon={<CalendarOutlined style={{ fontSize: '16px' }} />}
                        disabledDate={(current) => {
                            return current < moment().subtract(1, 'day') || current > moment().add(1, 'month')
                        }}
                        value={moment(validDate(date))}
                        onChange={(d, ds) => handlePicker(ds)}
                    />
                </Col>
            </Row>

            <Row justify="space-between" align="middle" className="pt mb">
                <IconButton
                    disabled={moment().format('DD-MM-YYYY') == date}
                    onClick={() => handlePicker(moment(validDate(date)).subtract(1, 'day').format('DD-MM-YYYY'))}
                >
                    <KeyboardArrowLeftIcon fontSize="large" />
                </IconButton>

                <Title level={4} style={{ marginBottom: '0', fontWeight: '450' }}>
                    {humanFriendlyDate(date)}
                </Title>

                <IconButton
                    disabled={moment().add(1, 'month').format('DD-MM-YYYY') == date}
                    onClick={() => handlePicker(moment(validDate(date)).add(1, 'day').format('DD-MM-YYYY'))}
                >
                    <KeyboardArrowRightIcon fontSize="large" />
                </IconButton>
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
                <Input
                    placeholder="Search by Hospital or Pincode"
                    size="large"
                    suffix={<SearchOutlined />}
                    value={search}
                    onChange={(e) => setToSearch(e.target.value)}
                />
            </Row>
            {centersLoading ? (
                <Skeleton active />
            ) : (
                <div className="pa mt2">
                    {filteredSessions && filteredSessions.length ? (
                        search.length ? (
                            filteredSessions
                                .filter(
                                    (item) =>
                                        item.name.toLowerCase().includes(search.toLowerCase()) ||
                                        item.pincode.toString().includes(search)
                                )
                                .map((center) => {
                                    return <CentersSessionCard key={center.center_id} details={center} />
                                })
                        ) : (
                            filteredSessions.map((center, index) => {
                                return <CentersSessionCard key={index} details={center} />
                            })
                        )
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
