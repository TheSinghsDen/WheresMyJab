import React from 'react'
import { Row, Typography, Select, Radio, Button } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { homePageLogic } from './homePageLogic'
import './index.scss'
import { useValues } from 'kea'

const { Title, Text } = Typography
const { Option } = Select

const HomePage = (): JSX.Element => {
    const { states } = useValues(homePageLogic)

    return (
        <div>
            <Row justify="end" align="middle" className="contribute">
                <Button type="primary" shape="round" icon={<GithubOutlined />}>
                    Collaborate
                </Button>
            </Row>

            <Row justify="center" align="middle" className="title">
                <Title level={2}>WheresMyJab</Title>
            </Row>

            <Row justify="center" align="middle" className="description">
                <Text type="secondary"> Search for vaccination slots and get notified when available</Text>
            </Row>

            <Row justify="center" align="middle" className="select">
                <Select showSearch style={{ width: '100%' }} size="large" placeholder="State" optionFilterProp="title">
                    {states &&
                        states.map((state) => (
                            <Option key={state.state_id} value={state.state_id} title={state.state_name}>
                                {state.state_name}
                            </Option>
                        ))}
                </Select>
            </Row>

            <Row justify="center" align="middle" className="select">
                <Select showSearch style={{ width: '100%' }} size="large" placeholder="District">
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
            </Row>

            <Row justify="center" align="middle" className="ageGroup">
                <Text type="secondary">Age Group</Text>
            </Row>

            <Row justify="center" align="middle" className="radio">
                <Radio.Group defaultValue="18+">
                    <Radio value="18+">18+</Radio>
                    <Radio value="45+">45+</Radio>
                </Radio.Group>
            </Row>

            <Row justify="center" align="middle" className="radio">
                <Button type="primary" shape="round" size="large">
                    Search Slots
                </Button>
            </Row>
        </div>
    )
}

export default HomePage