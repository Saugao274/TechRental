'use client'

import { Layout } from 'antd'
import Header from '@elements/Header'
import { Content } from 'antd/es/layout/layout'
import ScrollButton from '../../common/ScrollButton'

interface MainLayoutProps {
    readonly children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
    return (
        <Layout className="!bg-transparent">
            <Header />
            <Content className="md:mx-w-[1440px] mx-auto min-w-full">
                {children}
            </Content>
            <ScrollButton />
        </Layout>
    )
}

export default MainLayout
