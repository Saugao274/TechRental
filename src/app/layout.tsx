import type { Metadata } from 'next'
import './globals.css'
import { Be_Vietnam_Pro } from 'next/font/google'
import AppProvider from './provider'
import { cn } from '@/libs/utils'

export const metadata: Metadata = {
    title: 'TechRental',
    icons: '/icons/logo.png',
}

const beVietnamPro = Be_Vietnam_Pro({
    subsets: ['vietnamese'],
    weight: ['400', '500', '700'],
    variable: '--font-be-vietnam-pro',
    // display: 'swap',
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={cn(beVietnamPro.variable)}>
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    )
}
