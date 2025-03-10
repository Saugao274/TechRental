'use client'

import { Layout } from 'antd'
import Header from '@elements/Header'
import { Content } from 'antd/es/layout/layout'

interface MainLayoutProps {
    readonly children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
    return (
        <Layout className='!bg-white'>
            <Header />
            <Content className='min-w-full md:min-w-[1440px] mx-auto'>
                {children}
            </Content>
        </Layout>
    )
}

export default MainLayout
