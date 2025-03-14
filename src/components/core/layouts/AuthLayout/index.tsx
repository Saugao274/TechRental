'use client'

import { Layout } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'

interface AuthLayoutProps {
    readonly children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <Layout className="!font-vietnam">
            <Header />
            <Content>{children}</Content>
            <Footer />
        </Layout>
    )
}

export default AuthLayout
