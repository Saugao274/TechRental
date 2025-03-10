'use client'

import { Layout } from 'antd'
import Header from '@elements/Header'
import { Content } from 'antd/es/layout/layout'

interface MainLayoutProps {
    readonly children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
    return (
        <Layout>
            <Header />
            <Content>
                {children}
            </Content>
        </Layout>
    )
}

export default MainLayout
