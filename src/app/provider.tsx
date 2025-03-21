'use client'
import React from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App, ConfigProvider } from 'antd'
import { themes } from '@/style/themes'
import { Provider } from 'react-redux'
import { store } from '@/store'

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
                        Input: {
                            paddingBlock: 8,
                        },
                        Typography: {
                            titleMarginBottom: 0,
                            titleMarginTop: 0,
                        },
                        Table: {
                            headerBg: '#fff',
                            headerColor: '#000',
                            headerBorderRadius: 10,
                            footerBg: '#fff',
                            footerColor: '#000',
                            borderRadius: 10,
                        },
                        Select: {
                            controlHeight: 40,
                            fontSizeLG: 14,
                        },
                    },
                    token: {
                        colorPrimary: themes.default.colors.primary,
                        // fontFamily: "'__Be_Vietnam_Pro_e90ede', '__Be_Vietnam_Pro_Fallback_e90ede'",
                    },
                }}
            >
                <App>
                    <Provider store={store}>{children}</Provider>
                </App>
            </ConfigProvider>
        </AntdRegistry>
    )
}
