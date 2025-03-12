import { Col, Row, Statistic, StatisticProps } from 'antd'
import {
    TrophyOutlined,
    UserOutlined,
    LikeOutlined,
    SyncOutlined,
} from '@ant-design/icons'
import React, { useState } from 'react'
import CountUp from 'react-countup'
import SectionCommon from '../../common/SectionCommon'

type StatsType = {
    success: number
    users: number
    positive: number
    daily: number
}

const StaticHome = () => {
    const [stats, setStats] = useState<StatsType>({
        success: 1287,
        users: 1078,
        positive: 340,
        daily: 37,
    })

    const handleHover = (key: keyof StatsType) => {
        setStats((prevStats) => ({ ...prevStats, [key]: 0 }))
        setTimeout(() => {
            setStats({
                success: 1287,
                users: 1078,
                positive: 340,
                daily: 37,
            })
        }, 100)
    }

    const formatter: StatisticProps['formatter'] = (value) => (
        <CountUp
            end={value as number}
            separator=","
            duration={2.5}
            suffix="+"
        />
    )

    return (
        <SectionCommon>
            <div className="mx-20 flex items-center justify-center rounded-lg border-t border-solid border-cyan-800 bg-white p-2 shadow-xl">
                <Row
                    gutter={32}
                    justify="space-around"
                    wrap={false}
                    className="w-full"
                >
                    <Col className="text-center">
                        <Statistic
                            onMouseEnter={() => handleHover('success')}
                            value={stats.success}
                            formatter={formatter}
                            valueStyle={{
                                color: '#1D3D85',
                                fontSize: '32px',
                                fontWeight: 'bold',
                            }}
                            prefix={
                                <TrophyOutlined
                                    style={{
                                        color: '#9d4657',
                                        fontSize: '24px',
                                    }}
                                />
                            }
                        />
                        <div className="text-lg font-semibold text-blue-800">
                            Giao dịch thành công
                        </div>
                    </Col>
                    <Col className="text-center">
                        <Statistic
                            onMouseEnter={() => handleHover('users')}
                            value={stats.users}
                            formatter={formatter}
                            valueStyle={{
                                color: '#1D3D85',
                                fontSize: '32px',
                                fontWeight: 'bold',
                            }}
                            prefix={
                                <UserOutlined
                                    style={{
                                        color: '#50988a',
                                        fontSize: '24px',
                                    }}
                                />
                            }
                        />
                        <div className="text-lg font-semibold text-blue-800">
                            Người dùng
                        </div>
                    </Col>
                    <Col className="text-center">
                        <Statistic
                            onMouseEnter={() => handleHover('positive')}
                            value={stats.positive}
                            formatter={formatter}
                            valueStyle={{
                                color: '#1D3D85',
                                fontSize: '32px',
                                fontWeight: 'bold',
                            }}
                            prefix={
                                <LikeOutlined
                                    style={{
                                        color: '#9d3fa4',
                                        fontSize: '24px',
                                    }}
                                />
                            }
                        />
                        <div className="text-lg font-semibold text-blue-800">
                            Đánh giá tích cực
                        </div>
                    </Col>
                    <Col className="text-center">
                        <Statistic
                            onMouseEnter={() => handleHover('daily')}
                            value={stats.daily}
                            formatter={formatter}
                            valueStyle={{
                                color: '#1D3D85',
                                fontSize: '32px',
                                fontWeight: 'bold',
                            }}
                            prefix={
                                <SyncOutlined
                                    style={{
                                        color: '#2e8023',
                                        fontSize: '24px',
                                    }}
                                />
                            }
                        />
                        <div className="text-lg font-semibold text-blue-800">
                            Giao dịch mỗi ngày
                        </div>
                    </Col>
                </Row>
            </div>
        </SectionCommon>
    )
}

export default StaticHome
