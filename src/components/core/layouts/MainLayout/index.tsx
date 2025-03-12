'use client'

import { Layout } from 'antd'
import Header from '@elements/Header'
import { Content } from 'antd/es/layout/layout'

interface MainLayoutProps {
    readonly children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
    return (
        <Layout
            className="!bg-transparent"
        >
            <Header />
            <Content className="md:mx-w-[1440px] mx-auto min-w-full mt-0 md:mt-5">
                {children}
            </Content>
        </Layout>
    )
}

export default MainLayout
