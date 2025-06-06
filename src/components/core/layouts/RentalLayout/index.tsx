'use client'

import React, { useEffect, useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Layout, Divider, Drawer, Button, message } from 'antd'
import {
    Contact,
    FileCog,
    HandCoins,
    BadgeIcon as IdCard,
    Menu,
    Package,
    PackageCheck,
    ShoppingCart,
    X,
} from 'lucide-react'
import { type HTMLMotionProps, motion } from 'framer-motion'
import { cn } from '@/libs/utils'
import SectionCommon from '../../common/SectionCommon'
import { useAuth } from '@/context/AuthContext'

interface RentalRootLayoutProps {
    children: React.ReactNode
}

export default function RentalRootLayout({ children }: RentalRootLayoutProps) {
    const { id: shopId } = useParams() as { id: string }
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const { user } = useAuth()
    const router = useRouter()
    useEffect(() => {
        if (!user) return

        if (!user.isVerified || !user.roles?.includes('owner')) {
            message.warning('Bạn không có quyền truy cập.')
            router.replace('/')
        }
    }, [user])
    // responsive check
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <Layout className="mx-auto max-w-[1440px] !bg-transparent !font-vietnam">
            <SectionCommon>
                {isMobile && (
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-primary">
                                Chế độ người cho thuê
                            </h3>
                            <p className="text-sm text-gray-600">
                                Quản lý sản phẩm và đơn hàng cho thuê
                            </p>
                        </div>
                        <Button
                            type="text"
                            icon={<Menu size={24} />}
                            onClick={() => setIsMobileMenuOpen(true)}
                        />
                    </div>
                )}

                <Drawer
                    title={
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary">
                                Chế độ người cho thuê
                            </span>
                            <Button
                                type="text"
                                icon={<X size={18} />}
                                onClick={() => setIsMobileMenuOpen(false)}
                            />
                        </div>
                    }
                    placement="left"
                    open={isMobileMenuOpen}
                    width={280}
                    onClose={() => setIsMobileMenuOpen(false)}
                    bodyStyle={{ padding: 16 }}
                    headerStyle={{
                        padding: 16,
                        borderBottom: '1px solid #f0f0f0',
                    }}
                >
                    <RentalProfileOptionsNavigation
                        className="mt-2"
                        onItemClick={() => setIsMobileMenuOpen(false)}
                    />
                </Drawer>

                <div className="flex flex-col gap-[20px] md:flex-row">
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
    onItemClick?: () => void
}

export function RentalProfileOptionsNavigation({
    className,
    isLessor = false,
    onItemClick,
    ...props
}: SidebarNavProps) {
    const pathname = usePathname()
    const router = useRouter()

    const { id: shopId } = useParams() as { id: string }

    const routes = [
        {
            href: `/rental/${shopId}`,
            label: 'Quản Lý Sản Phẩm',
            icon: Package,
            active: pathname === `/rental/${shopId}`,
        },

        {
            href: `/rental/${shopId}/manage-orders`,
            label: 'Quản Lý Đơn Thuê',
            icon: ShoppingCart,

            active: pathname === `/rental/${shopId}/manage-orders`,
        },
        {
            href: `/rental/${shopId}/transactions`,
            label: 'Thống Kê Giao Dịch',
            icon: HandCoins,

            active: pathname === '/rental/transactions',
        },
        {
            href: `/rental/${shopId}/feedback`,
            label: 'Đánh Giá & Phản Hồi',
            icon: Contact,

            active: pathname === '/rental/feedback',
        },
        {
            href: `/rental/${shopId}/package`,
            label: 'Chọn gói dịch vụ',
            icon: PackageCheck,
            active: pathname === '/rental/package',
        },

        {
            href: `/rental/${shopId}/information`,
            label: 'Xác Minh Định Danh',
            icon: IdCard,
            active: pathname === '/rental/Information',
            hidden: isLessor,
        },
    ]

    const handleNavigation = (route: any) => {
        router.push(route.href)

        // Close mobile menu if onItemClick is provided
        if (onItemClick) {
            onItemClick()
        }
    }

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
                        onClick={() => handleNavigation(route)}
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
