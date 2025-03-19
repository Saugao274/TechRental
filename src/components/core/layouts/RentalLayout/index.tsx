'use client'
import { cn } from '@/libs/utils'
import { Divider, Layout } from 'antd'
import {
    CalendarDays,
    Clock,
    Home,
    Contact,
    FileCog,
    HandCoins,
    IdCard,
    Info,
    Package,
    UserPlus,
    ShoppingCart,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import SectionCommon from '../../common/SectionCommon'
import { HTMLMotionProps, motion } from 'framer-motion'

export default function RentalRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Layout className="mx-auto max-w-[1440px] !bg-transparent !font-vietnam">
            <SectionCommon>
                <div className="flex flex-col md:flex-row gap-[20px]">
                    <LeftSideBarElement />
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full md:w-4/5"
                    >
                        {children}
                    </motion.div>
                </div>
            </SectionCommon>
        </Layout>
    )
}

export function LeftSideBarElement() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden w-1/5 md:block"
        >
            <div className="flex flex-col p-5">
                <div>
                    <h3 className="text-2xl font-bold text-primary">
                        Chế độ người cho thuê
                    </h3>
                    <p className="text-sm text-gray-600">
                        Quản lý sản phẩm và đơn hàng cho thuê
                    </p>
                </div>
                <Divider />
                <RentalProfileOptionsNavigation />
            </div>
        </motion.div>
    )
}

interface SidebarNavProps extends HTMLMotionProps<'nav'> {
    isLessor?: boolean
}

export function RentalProfileOptionsNavigation({
    className,
    isLessor = false,
    ...props
}: SidebarNavProps) {
    const pathname = usePathname()
    const router = useRouter()

    const routes = [
        {
            href: '/rental',
            label: 'Quản Lý Sản Phẩm',
            icon: Package,
            active: pathname === '/rental',
        },
        {
            href: '/rental/manage-orders',
            label: 'Quản Lý Đơn Thuê',
            icon: ShoppingCart,
            active: pathname === '/rental/manage-orders',
        },
        {
            href: '/rental/transactions',
            label: 'Thống Kê Giao Dịch',
            icon: HandCoins,
            active: pathname === '/rental/transactions',
        },
        {
            href: '/rental/feedback',
            label: 'Đánh Giá & Phản Hồi',
            icon: Contact,
            active: pathname === '/rental/feedback',
        },
        {
            href: '/rental/policy',
            label: 'Chính Sách Cho Thuê',
            icon: FileCog,
            active: pathname === '/rental/policy',
        },

        {
            href: '/rental/information',
            label: 'Xác Minh Định Danh',
            icon: IdCard,
            active: pathname === '/rental/Information',
            hidden: isLessor,
        },
    ]

    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={cn('flex flex-col space-y-2', className)}
            {...props}
        >
            {routes.map((route) =>
                route.hidden ? null : (
                    <motion.div
                        key={route.href}
                        onClick={() => router.push(route.href)}
                        className={cn(
                            route.active
                                ? 'bg-blue-100 font-semibold text-blue-600'
                                : 'text-gray-800 hover:bg-gray-200',
                            'flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-all',
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <route.icon className="h-5 w-5" />
                        {route.label}
                    </motion.div>
                ),
            )}
        </motion.nav>
    )
}
