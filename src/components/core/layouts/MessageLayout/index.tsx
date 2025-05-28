'use client'

import { Avatar, Layout, Typography } from 'antd'
import React from 'react'
import SectionCommon from '../../common/SectionCommon'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import ShopSideBar from '@/components/modules/ShopSideBar/ShopSideBar'
import PersonSideBar from '@/components/modules/PersonSideBar/PersonSideBar'

const { Text } = Typography

export default function MessageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user } = useAuth()

    const searchParams = useSearchParams()
    const isShopMode = searchParams.get('shopMode') === '1'

    return user ? (
        <Layout className="mx-auto max-w-[1440px] !bg-transparent">
            <SectionCommon>
                <div className="flex flex-col gap-5 md:flex-row">
                    {isShopMode ? <ShopSideBar /> : <PersonSideBar />}
                    <div className="w-full md:w-3/4">{children}</div>
                </div>
            </SectionCommon>
        </Layout>
    ) : null
}
