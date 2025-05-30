'use client'

import NotFound from '@/app/not-found'
import RentalRootLayout from '@/components/core/layouts/RentalLayout'
import { getRequest } from '@/request'
import { storeEndpoint } from '@/settings/endpoints'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Spin } from 'antd' // Import a loading spinner

export default function RentalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { id } = useParams() as { id: string }
    const [shop, setShop] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchShop = async () => {
            try {
                console.log('id', id)
                const res = await getRequest(`${storeEndpoint.GET_MY_SHOP}`)
                console.log('resSHOP1', res)
                res?.metadata ? setShop(res) : setShop(null)
            } catch (err) {
                console.error('Lỗi lấy shop từ rental:', err)
                setShop(null)
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchShop()
    }, [id])

    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Spin size="large" />
            </div>
        )
    }

    return shop ? (
        <RentalRootLayout> {children} </RentalRootLayout>
    ) : (
        <NotFound />
    )
}
