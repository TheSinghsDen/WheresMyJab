import React from 'react'
import { Row, Typography, Select } from 'antd'
import './index.scss'

const { Title } = Typography
const { Option } = Select

const HomePage = (): JSX.Element => {
    return (
        <div>
            <Row justify="center" align="middle" className="title">
                <Title level={2}>WheresMyJab</Title>
            </Row>
            <Row justify="center" align="middle" className="select">
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="State"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
            </Row>

            <Row justify="center" align="middle" className="select">
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="District"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
            </Row>
        </div>
    )
}

export default HomePage
