'use client'

import React from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App as AntApp, ConfigProvider } from 'antd'
import { themes } from '@/style/themes'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/store'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AppProvider({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AntdRegistry>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            colorPrimary: themes.default.colors.primary,
                            algorithm: true,
                        },
                        Input: { paddingBlock: 8 },
                        Typography: { titleMarginBottom: 0, titleMarginTop: 0 },
                        Table: {
                            headerBg: '#fff',
                            headerColor: '#000',
                            headerBorderRadius: 10,
                            footerBg: '#fff',
                            footerColor: '#000',
                            borderRadius: 10,
                        },
                        Select: { controlHeight: 40, fontSizeLG: 14 },
                    },
                    token: { colorPrimary: themes.default.colors.primary },
                }}
            >
                <AntApp>
                    <ReduxProvider store={store}>
                        <AuthProvider>
                            <CartProvider>
                                {children}

                                <ToastContainer
                                    position="top-right"
                                    autoClose={3000}
                                />
                            </CartProvider>
                        </AuthProvider>
                    </ReduxProvider>
                </AntApp>
            </ConfigProvider>
        </AntdRegistry>
    )
}
