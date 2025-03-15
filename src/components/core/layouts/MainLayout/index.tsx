'use client'

import { Layout } from 'antd'
import Header from '@elements/Header'
import { Content } from 'antd/es/layout/layout'
import ScrollButton from '../../common/ScrollButton'
import RobotChat from '../../common/RobotChat'
import Footer from '../../elements/Footer'
import './style.css'

interface MainLayoutProps {
    readonly children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
    return (
        <Layout className="!bg-transparent background"
        >
            <Header />
            <Content className="md:mx-w-[1440px] mx-auto min-w-full mt-0 md:mt-5">
                {children}
            </Content>
            <RobotChat />
            <ScrollButton />
            <Footer />
        </Layout>
    )
}

export default MainLayout
