import React from 'react'
import { useValues, useActions } from 'kea'
import { router } from 'kea-router'
import { List, Typography } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { dayWiseListLogic } from './dayWiseListLogic'
import { listDailySlotsLogic } from 'scenes/listDailySlots/listDailySlotsLogic'
import { HumanFriendlySlotCapacity, humanFriendlyDate } from 'lib/utils'
import Notification from 'lib/components/Notification/Notification'

const { Text } = Typography

const DayWiseList: React.FC = () => {
    const { slotsForAllDays, availableSlots } = useValues(dayWiseListLogic)
    const { setDate } = useActions(listDailySlotsLogic)
    const { push } = useActions(router)

    const handleClick = (date): void => {
        setDate(date)
        push('/listDailySlots')
    }
    console.log(availableSlots)

    return (
        <div className="pa mt2">
            <Notification />
            <List
                dataSource={slotsForAllDays}
                footer
                itemLayout="horizontal"
                renderItem={(item) => (
                    <List.Item actions={[<RightOutlined key="shit" />]} onClick={() => handleClick(item.date)}>
                        <List.Item.Meta
                            title={<Text type={!item.slotCapacity && 'secondary'}>{humanFriendlyDate(item.date)}</Text>}
                        />
                        <div>
                            <HumanFriendlySlotCapacity slotCapacity={item.slotCapacity} />
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default DayWiseList
