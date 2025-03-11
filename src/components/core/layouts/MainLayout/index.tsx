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
            className="!bg-white"
            // style={{
            //     backgroundImage: 'url(/images/Background.png)',
            //     backgroundSize: 'cover',
            // }}
        >
            <Header />
            <Content className="md:mx-w-[1440px] mx-auto min-w-full">
                {children}
            </Content>
        </Layout>
    )
}

export default MainLayout
