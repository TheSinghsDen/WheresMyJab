import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'

export function BackTo(): JSX.Element {
    return (
        <>
            <div>
                <ArrowLeftOutlined onClick={() => window.history.back()} style={{ fontSize: '16px' }} />
            </div>
        </>
    )
}
