'use client'

import { Layout } from 'antd'
import Header from '@elements/Header'
import { Content } from 'antd/es/layout/layout'

interface OtherProfileLayoutProps {
    readonly children: React.ReactNode
}

function OtherProfileLayout({ children }: OtherProfileLayoutProps) {
    return (
        <Layout className="background">
            <Content className="!md:mx-w-[1440px] mx-auto mt-0 !min-w-full md:mt-5">
                {children}
            </Content>
        </Layout>
    )
}

export default OtherProfileLayout
