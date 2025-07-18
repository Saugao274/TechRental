// src/app/provider.tsx
'use client'

import React from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App as AntApp, ConfigProvider } from 'antd'
import { themes } from '@/style/themes'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/store'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { ChatProvider } from '@/context/ChatContext'
import { ChatSocketProvider } from '@/context/ChatProvider'
import { ProductProvider } from '@/context/ProductContext'
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
                        <ProductProvider>
                            <AuthProvider>
                                <ChatProvider>
                                    <ChatSocketProvider>
                                        <CartProvider>{children}</CartProvider>
                                    </ChatSocketProvider>
                                </ChatProvider>
                            </AuthProvider>
                        </ProductProvider>
                    </ReduxProvider>
                </AntApp>
            </ConfigProvider>
        </AntdRegistry>
    )
}
