import React from 'react'
import { useActions, useValues } from 'kea'
import { Popover, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { filterButtonLogic } from './filterButtonLogic'

interface Props {
    id: number
    label: string | null
    applied: boolean
    content: any
}

const FilterButton: React.FC<Props> = ({ label, applied, content, id }) => {
    const { visibility } = useValues(filterButtonLogic({ id }))
    const { setVisibility } = useActions(filterButtonLogic({ id }))

    return (
        <Popover
            trigger="click"
            placement="bottom"
            arrowPointAtCenter
            className="pr"
            content={content}
            visible={visibility}
            onVisibleChange={(value) => setVisibility(value)}
        >
            <Button
                size="large"
                disabled
                style={{
                    background: applied ? '#333333' : '',
                    color: applied ? 'white' : 'black',
                    borderRadius: '8px',
                }}
            >
                {label} <DownOutlined />
            </Button>
        </Popover>
    )
}

export default FilterButton
