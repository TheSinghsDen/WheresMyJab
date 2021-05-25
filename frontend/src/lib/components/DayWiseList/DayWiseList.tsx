import React from 'react'
import { useValues } from 'kea'
import { Typography, List } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { dayWiseListLogic } from './dayWiseListLogic'
import { humanFriendlyDate } from 'lib/utils'

const { Text } = Typography

const DayWiseList: React.FC = () => {
    const { slotsForAllDays } = useValues(dayWiseListLogic)

    return (
        <div className="pa mt2">
            <List
                dataSource={slotsForAllDays}
                footer
                itemLayout="horizontal"
                renderItem={(item) => (
                    <List.Item actions={[<RightOutlined key="shit" />]} onClick={() => console.log('Clicked')}>
                        <List.Item.Meta title={<Text>{humanFriendlyDate(item.date)}</Text>} />
                        <div>
                            <Text>{item.slotCapacity}</Text>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default DayWiseList
