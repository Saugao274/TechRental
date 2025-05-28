'use client'
import { Divider, Layout, message, Drawer, Button } from 'antd'
import type React from 'react'
import { useState, useEffect } from 'react'
import SectionCommon from '../../common/SectionCommon'
import {
    Clock,
    Home,
    Lock,
    Menu,
    ReplaceAll,
    ShoppingCart,
    User,
    UserPlus,
    X,
} from 'lucide-react'
import { usePathname, useRouter, useParams } from 'next/navigation'
import { cn } from '@/libs/utils'
import { type HTMLMotionProps, motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import SignIn from '@/components/modules/SignIn'
import { useShopId } from '@/hooks/useShopId'

export default function ProfileRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user } = useAuth()

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // Check if screen is mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        // Initial check
        checkIfMobile()

        // Add event listener
        window.addEventListener('resize', checkIfMobile)

        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile)
    }, [])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return user ? (
        <Layout className="mx-auto max-w-[1440px] !bg-transparent">
            <SectionCommon>
                {/* Mobile Menu Button */}
                {isMobile && (
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-primary">
                                Trang cá nhân
                            </h3>
                            <p className="text-sm">
                                Quản lý thông tin cá nhân và các dịch vụ
                            </p>
                        </div>
                        <Button
                            type="text"
                            icon={<Menu size={24} />}
                            onClick={toggleMobileMenu}
                            className="flex items-center justify-center"
                        />
                    </div>
                )}

                {/* Mobile Sidebar Drawer */}
                <Drawer
                    title={
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary">
                                Trang cá nhân
                            </span>
                            <Button
                                type="text"
                                icon={<X size={18} />}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex h-8 w-8 items-center justify-center p-0"
                            />
                        </div>
                    }
                    placement="left"
                    onClose={() => setIsMobileMenuOpen(false)}
                    open={isMobileMenuOpen}
                    width={280}
                    bodyStyle={{ padding: '16px' }}
                    headerStyle={{
                        padding: '16px',
                        borderBottom: '1px solid #f0f0f0',
                    }}
                >
                    <ProfileOptionsNavigation
                        className="mt-2"
                        onItemClick={() => setIsMobileMenuOpen(false)}
                    />
                </Drawer>

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
    ) : (
        <SignIn />
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
    onItemClick?: () => void
}

export function ProfileOptionsNavigation({
    className,
    isLessor = false,
    onItemClick,
    ...props
}: SidebarNavProps) {
    const { user } = useAuth()
    const { id: userId } = useParams()
    const pathname = usePathname()
    const router = useRouter()
    const shopId = useShopId()
    const rentalHref = shopId ? `/rental/${shopId}` : undefined
    const routes = [
        {
            href: `/personal/${userId}`,
            label: 'Trang cá nhân',
            icon: Home,
            active: pathname === `/personal/${userId}`,
        },
        {
            href: `/personal/${userId}/update-info`,
            label: 'Cập nhật thông tin',
            icon: User,
            active: pathname === `/personal/${userId}/update-info`,
        },
        // {
        //   href: `/personal/${userId}/payment`,
        //   label: 'Thanh toán',
        //   icon: CreditCard,
        //   active: pathname === `/personal/${userId}/payment`,
        // },

        {
            href: `/personal/${userId}/rental-registry`,
            label: 'Đăng ký làm người cho thuê',
            icon: UserPlus,
            active: pathname === `/personal/${userId}/rental-registry`,
            hidden: user?.isVerified && user?.registeredLessor,
        },
        {
            href: `/personal/${userId}/orders`,
            label: 'Đơn hàng của bạn',
            icon: ShoppingCart,
            active: pathname === `/personal/${userId}/orders`,
        },
        {
            href: `/personal/${userId}/password`,
            label: 'Thay đổi mật khẩu',
            icon: Lock,
            active: pathname === `/personal/${userId}/password`,
        },
        {
            href: rentalHref,
            label: 'Chế độ người cho thuê',
            icon: ReplaceAll,
            active: false,
            hidden: !user?.roles?.includes('owner'),
        },
    ]

    const handlePushRouter = (route: any) => {
        if (route.href === router.push(`/rental/${shopId}`)) {
            if (user?.isVerified && user?.roles?.includes('owner')) {
                router.push(route.href)
            } else {
                message.error(
                    'Bạn cần xác minh và trở thành người cho thuê để truy cập',
                )
                return
            }
        }
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
            className={cn('flex flex-col space-y-2 !font-vietnam', className)}
            {...props}
        >
            {routes.map((route) =>
                route.hidden ? null : (
                    <motion.p
                        key={route.href}
                        onClick={() => handlePushRouter(route)}
                        className={cn(
                            route.active
                                ? 'bg-gray-100 hover:bg-gray-200'
                                : 'hover:bg-transparent',
                            'flex cursor-pointer items-center justify-start gap-2 rounded px-2 py-2 transition-all hover:bg-gray-200',
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <route.icon className="h-5 w-5" />
                        {route.label}
                    </motion.p>
                ),
            )}
        </motion.nav>
    )
}
