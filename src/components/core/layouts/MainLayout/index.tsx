'use client'

import { Layout } from 'antd'
import Header from '@elements/Header'
import { Content } from 'antd/es/layout/layout'
import ScrollButton from '../../common/ScrollButton'
import Footer from '../../elements/Footer'
import './style.css'
import { usePathname } from 'next/navigation'

interface MainLayoutProps {
    readonly children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
    const path = usePathname()

    return (
        <Layout className="background">
            <Header />
            <Content className="!md:mx-w-[1440px] mx-auto mt-0 !min-w-full md:mt-5">
                {children}
            </Content>

            {/* <RobotChat /> */}

            <ScrollButton />
            {!(
                path.includes('chat') ||
                path.includes('personal') ||
                path.includes('rental ')
            ) && <Footer />}
        </Layout>
    )
}

export default MainLayout
