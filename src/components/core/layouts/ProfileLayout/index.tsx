'use client'
import { Divider, Layout } from 'antd'
import React from 'react'
import SectionCommon from '../../common/SectionCommon'
import {
    Clock,
    CreditCard,
    Home,
    Lock,
    ReplaceAll,
    ShoppingCart,
    User,
    UserPlus,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/libs/utils'
import { HTMLMotionProps, motion } from 'framer-motion'

export default function ProfileRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Layout className="mx-auto max-w-[1440px] !bg-transparent">
            <SectionCommon>
                <div className="flex flex-row gap-[20px]">
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
            <div className="flex flex-col">
                <div>
                    <h3 className="text-2xl font-bold text-primary">
                        Trang cá nhân
                    </h3>
                    <p className="">Quản lý thông tin cá nhân và các dịch vụ</p>
                </div>
                <Divider />
                <ProfileOptionsNavigation />
            </div>
        </motion.div>
    )
}

interface SidebarNavProps extends HTMLMotionProps<'nav'> {
    isLessor?: boolean
}

export function ProfileOptionsNavigation({
    className,
    isLessor = false,
    ...props
}: SidebarNavProps) {
    const pathname = usePathname()
    const router = useRouter()
    const routes = [
        {
            href: '/personal',
            label: 'Trang cá nhân',
            icon: Home,
            active: pathname === '/personal',
        },
        {
            href: '/personal/update-info',
            label: 'Cập nhật thông tin',
            icon: User,
            active: pathname === '/personal/update-info',
        },
        {
            href: '/personal/payment',
            label: 'Thanh toán',
            icon: CreditCard,
            active: pathname === '/personal/payment',
        },
        {
            href: '/personal/rented-history',
            label: 'Lịch sử thuê',
            icon: Clock,
            active: pathname === '/personal/rented-history',
        },
        {
            href: '/personal/rental-registry',
            label: 'Đăng ký làm người cho thuê',
            icon: UserPlus,
            active: pathname === '/personal/rental-registry',
        },
        {
            href: '/personal/orders',
            label: 'Đơn hàng của bạn',
            icon: ShoppingCart,
            active: pathname === '/personal/orders',
        },
        {
            href: '/personal/password',
            label: 'Thay đổi mật khẩu',
            icon: Lock,
            active: pathname === '/personal/password',
        },
        {
            href: '/rental',
            label: 'Chế độ người cho thuê',
            icon: ReplaceAll,
            active: false,
            hidden: isLessor,
        },
    ]
    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={cn('!font-vietnam flex flex-col space-y-2', className)}
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
