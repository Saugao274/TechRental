'use client'

import { Layout } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'

interface MainLayoutProps {
    readonly children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
    return (
        <Layout>
            <Header />
            <Content>{children}</Content>
            <Footer />
        </Layout>
    )
}

export default MainLayout
