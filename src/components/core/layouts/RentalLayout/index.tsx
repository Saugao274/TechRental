'use client'
import { cn } from '@/libs/utils'
import { Divider, Layout } from 'antd'
import {
    CalendarDays,
    Clock,
    Contact,
    FileCog,
    HandCoins,
    IdCard,
    Info,
    Package,
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
        <Layout className="mx-auto max-w-[1440px] !bg-transparent">
            <SectionCommon>
                <div className="flex flex-row gap-[40px]">
                    <LeftSideBarElement />
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full md:w-3/4"
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
            className="hidden w-1/4 md:block"
        >
            <div className="flex flex-col">
                <div>
                    <h3 className="text-2xl font-bold text-primary">
                        Chế độ người cho thuê
                    </h3>
                    <p className="">Quản lý sản phẩm và đơn hàng cho thuê</p>
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
            label: 'Đăng giá sản phẩm',
            icon: Package,
            active: pathname === '/rental',
        },
        {
            href: '/rental/time-ordered',
            label: 'Thời gian thuê/trả hàng',
            icon: Clock,
            active: pathname === '/personal/update-info',
        },
        {
            href: '/rental/rental-history',
            label: 'Lịch sử cho thuê',
            icon: CalendarDays,
            active: pathname === '/rental/rental-history',
        },
        {
            href: '/rental/payment-history',
            label: 'Lịch sử giao dịch',
            icon: HandCoins,
            active: pathname === '/rental/payment-history',
        },
        {
            href: '/rental/order-person-info',
            label: 'Thông tin người thuê sản phẩm',
            icon: Contact,
            active: pathname === '/rental/order-person-info',
        },
        {
            href: '/rental/policy',
            label: 'Chính sách cho thuê',
            icon: FileCog,
            active: pathname === '/rental/policy',
        },
        {
            href: '/rental/info',
            label: 'Thông tin thuê',
            icon: Info,
            active: pathname === '/rental/info',
        },
        {
            href: '/rental/identification',
            label: 'Thông tin định danh người cho thuê',
            icon: IdCard,
            active: pathname === '/rental/identification',
            hidden: !isLessor,
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
                    <motion.p
                        key={route.href}
                        onClick={() => router.push(route.href)}
                        className={cn(
                            route.active
                                ? 'bg-gray-100 hover:bg-gray-200'
                                : 'hover:bg-transparent',
                            'flex cursor-pointer items-center justify-start gap-2 rounded px-2 py-1 transition-all hover:bg-gray-200',
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <route.icon className="h-4 w-4" />
                        {route.label}
                    </motion.p>
                ),
            )}
        </motion.nav>
    )
}
