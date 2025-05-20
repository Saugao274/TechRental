'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import {
    Bell,
    CircleUserRound,
    Facebook,
    Instagram,
    LogOut,
    Menu,
    MessageCircle,
    Search,
    ShoppingCart,
    X,
} from 'lucide-react'
import Image from 'next/image'
import { Button, Dropdown, type MenuProps, Space } from 'antd'
import ButtonCommon from '../../common/ButtonCommon'
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from 'framer-motion'
import _ from 'lodash'
import { usePathname, useRouter } from 'next/navigation'
import NotificationModal from '@/components/modules/NotificationModal'
import { useAuth } from '@/context/AuthContext'

export default function Header() {
    const { user, logout } = useAuth()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [atTop, setAtTop] = useState(true)

    const menuRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const headerRef = useRef<HTMLElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    const router = useRouter()
    const { scrollY } = useScroll()
    const [bellVisible, setBellVisible] = useState(false)
    const handleBellClose = () => {
        setBellVisible(false)
    }
    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (latest < 10) {
            setIsVisible(true)
            setAtTop(true)
            return
        } else {
            setAtTop(false)
        }

        const direction = latest > lastScrollY ? 'down' : 'up'
        if (direction === 'down' && latest > 100 && isVisible) {
            setIsVisible(false)
        } else if (direction === 'up' && !isVisible) {
            setIsVisible(true)
        }

        setLastScrollY(latest)
    })

    const items: MenuProps['items'] = user
        ? [
              {
                  key: '1',
                  label: (
                      <span
                          onClick={() => router.push(`/personal/${user._id}`)}
                      >
                          Trang cá nhân
                      </span>
                  ),
              },
              // {
              //     key: '2',
              //     label: (
              //         <p
              //             className="block cursor-pointer text-[14px] text-primary"
              //             onClick={() => {
              //                 router.push(`/personal/payment`)
              //                 setMobileMenuOpen(false)
              //             }}
              //         >
              //             Thanh toán
              //         </p>
              //     ),
              // },
              {
                  key: '3',
                  label: <span onClick={logout}>Đăng xuất</span>,
              },
              {
                  key: 'update',
                  label: (
                      <p
                          className="block cursor-pointer text-[14px] text-primary"
                          onClick={() => {
                              router.push(`/personal/${user._id}/update-info`)
                              setMobileMenuOpen(false)
                          }}
                      >
                          Cập nhật thông tin cá nhân
                      </p>
                  ),
              },
              {
                  key: '4',
                  label: (
                      <p
                          className="block cursor-pointer text-[14px] text-primary"
                          onClick={() => {
                              router.push(
                                  `/personal/${user._id}/rented-history`,
                              )
                              setMobileMenuOpen(false)
                          }}
                      >
                          Lịch sử thuê
                      </p>
                  ),
              },
              {
                  key: '5',
                  label: (
                      <p
                          className="block cursor-pointer text-[14px] text-primary"
                          onClick={() => {
                              router.push(
                                  `/personal/${user._id}/rental-registry`,
                              )
                              setMobileMenuOpen(false)
                          }}
                      >
                          Đăng ký làm người cho thuê
                      </p>
                  ),
              },
              {
                  key: '6',
                  label: (
                      <p
                          className="block cursor-pointer text-[14px] text-primary"
                          onClick={() => {
                              router.push(`/personal/${user._id}/orders`)
                              setMobileMenuOpen(false)
                          }}
                      >
                          Đơn hàng của tôi
                      </p>
                  ),
              },
              {
                  key: '7',
                  label: (
                      <p
                          className="block cursor-pointer text-[14px] text-primary"
                          onClick={() => {
                              router.push(`/personal/${user._id}/password`)
                              setMobileMenuOpen(false)
                          }}
                      >
                          Thay đổi mật khẩu
                      </p>
                  ),
              },
              {
                  key: '8',
                  label: (
                      <p
                          className="block cursor-pointer text-[14px] text-primary"
                          onClick={() => {
                              router.push('/rental')
                              setMobileMenuOpen(false)
                          }}
                      >
                          Chế độ người cho thuê
                      </p>
                  ),
              },
          ]
        : []
    const itemsRental: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <p
                    className="block cursor-pointer text-[14px] text-primary"
                    onClick={() => {
                        router.push(`/rental`)
                        setMobileMenuOpen(false)
                    }}
                >
                    Quản lý sản phẩm
                </p>
            ),
        },
        {
            key: '2',
            label: (
                <p
                    className="block cursor-pointer text-[14px] text-primary"
                    onClick={() => {
                        router.push(`/rental/manage-orders`)
                        setMobileMenuOpen(false)
                    }}
                >
                    Quản lý đơn thuê
                </p>
            ),
        },
        {
            key: '3',
            label: (
                <p
                    className="block cursor-pointer text-[14px] text-primary"
                    onClick={() => {
                        router.push(`/rental/transactions`)
                        setMobileMenuOpen(false)
                    }}
                >
                    Thống Kê Giao Dịch
                </p>
            ),
        },
        {
            key: '4',

            label: (
                <p
                    className="block cursor-pointer text-[14px] text-primary"
                    onClick={() => {
                        router.push(`/rental/feedback`)
                        setMobileMenuOpen(false)
                    }}
                >
                    Đánh Giá & Phản Hồi
                </p>
            ),
        },
        {
            key: '5',
            label: (
                <p
                    className="block cursor-pointer text-[14px] text-primary"
                    onClick={() => {
                        router.push(`/rental/policy`)
                        setMobileMenuOpen(false)
                    }}
                >
                    Chính Sách Cho Thuê
                </p>
            ),
        },
        {
            key: '6',
            label: (
                <p
                    className="block cursor-pointer text-[14px] text-primary"
                    onClick={() => {
                        router.push(`/rental/information`)
                        setMobileMenuOpen(false)
                    }}
                >
                    Xác Minh Định Danh
                </p>
            ),
        },
    ]

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    // Handle click outside to close menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                mobileMenuOpen &&
                menuRef.current &&
                buttonRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setMobileMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [mobileMenuOpen])

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [mobileMenuOpen])

    const handleClickSearchButton = (): void => {
        setMobileMenuOpen(true)

        const debouncedFocus = _.debounce(() => {
            searchInputRef.current?.focus()
        }, 1000)

        debouncedFocus()
    }
    const path = usePathname()

    return (
        <motion.header
            ref={headerRef}
            className="sticky top-0 z-50 mt-5 w-full"
            animate={{
                top: isVisible ? 0 : -120,
            }}
            transition={{
                duration: 0.3,
                ease: 'easeInOut',
            }}
        >
            <div className="mx-auto flex max-w-[1080px] flex-row items-center justify-between rounded-[16px] bg-blue-50 bg-opacity-95 !px-3 !py-3 shadow-lg">
                <div className="flex items-center">
                    {/* Mobile menu button */}
                    <button
                        ref={buttonRef}
                        className="mr-2 rounded p-2 text-primary md:hidden"
                        onClick={toggleMobileMenu}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {mobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={24} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={24} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>

                    <div
                        className="max-w-[100px] md:max-w-[140px]"
                        onClick={() => router.push('/')}
                    >
                        <Image
                            src={'/images/TechRentalLogo.png'}
                            width={500}
                            height={100}
                            alt="techrental_logo"
                            priority
                        />
                    </div>
                </div>
                <NotificationModal
                    visible={bellVisible}
                    onClose={handleBellClose}
                />
                {/* Search bar - hidden on smallest screens, visible on sm and up */}
                <div className="hidden sm:relative sm:flex sm:h-fit sm:w-[250px] sm:flex-row sm:items-center sm:gap-2 sm:!rounded-[10px] sm:border sm:border-primary sm:px-[10px] sm:py-[8px] md:w-[300px] lg:w-[308px]">
                    <Search size={16} className="text-primary" />
                    <input
                        className="w-full bg-transparent outline-none placeholder:text-primary placeholder:text-opacity-60"
                        placeholder="Nhập nội dung cần tìm..."
                    ></input>
                    <div className="absolute right-[-1px] top-[-1px] h-full">
                        <Button className="!rounded-none !rounded-br-[10px] !rounded-tr-[10px] !border-primary !bg-primary !p-[19px] !text-white">
                            <Search />
                        </Button>
                    </div>
                </div>

                {/* Desktop navigation */}
                <div className="hidden md:flex md:flex-row md:items-center md:gap-5">
                    <div className="flex flex-row gap-[10px]">
                        <div>
                            <Link href={'/'}>
                                <p className="cursor-pointer text-[16px] text-primary">
                                    Trang chủ
                                </p>
                            </Link>
                        </div>
                        <div>
                            <a
                                className="cursor-pointer"
                                onClick={() => {
                                    router.push('/products')
                                    setMobileMenuOpen(false)
                                }}
                            >
                                <Space className="flex items-center text-[16px] text-primary">
                                    <p>Sản phẩm</p>
                                    {/* <ChevronDown
                                            size={18}
                                            className="mt-1"
                                        /> */}
                                </Space>
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div
                            className="relative cursor-pointer rounded p-2 text-primary transition-all hover:bg-gray-200"
                            onClick={() => user && setBellVisible(true)}
                        >
                            <Bell />
                            {user && (
                                <div className="absolute right-[-5px] top-[-5px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-red-500">
                                    <p className="text-[10px] text-white">2</p>
                                </div>
                            )}
                        </div>
                        <div
                            className="relative cursor-pointer rounded p-2 text-primary transition-all hover:bg-gray-200"
                            onClick={() => router.push('/chat')}
                        >
                            <MessageCircle />
                            {user && (
                                <div className="absolute right-[-5px] top-[-5px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-red-500">
                                    <p className="text-[10px] text-white">7</p>
                                </div>
                            )}
                        </div>
                        <div
                            className="relative cursor-pointer rounded p-2 text-primary transition-all hover:bg-gray-200"
                            onClick={() => router.push('/shopcart')}
                        >
                            <ShoppingCart />
                            {user && (
                                <div className="absolute right-[-5px] top-[-5px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-red-500">
                                    <p className="text-[10px] text-white">4</p>
                                </div>
                            )}
                        </div>
                    </div>
                    {user ? (
                        <DropdownProfile />
                    ) : (
                        <div className="flex flex-row gap-2">
                            <ButtonCommon
                                type="text"
                                className="!text-[16px]"
                                onClick={() => router.push('/signIn')}
                            >
                                Đăng nhập
                            </ButtonCommon>
                            <ButtonCommon
                                type="primary"
                                className="!text-[16px]"
                                onClick={() => router.push('/signUp')}
                            >
                                Đăng ký
                            </ButtonCommon>
                        </div>
                    )}
                </div>

                {/* Mobile icons */}
                <div className="flex items-center gap-2 md:hidden">
                    <div className="relative cursor-pointer rounded p-2 text-primary transition-all hover:bg-gray-200">
                        <ShoppingCart size={20} />
                        {user && (
                            <div className="absolute right-[-5px] top-[-5px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500">
                                <p className="text-[10px] text-white">4</p>
                            </div>
                        )}
                    </div>
                    <div
                        className="relative cursor-pointer rounded p-2 text-primary transition-all hover:bg-gray-200"
                        onClick={() => handleClickSearchButton()}
                    >
                        <Search size={20} />
                    </div>
                </div>
            </div>

            {/* Mobile menu with animation */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-40 bg-black md:hidden"
                        />

                        {/* Menu panel */}
                        <motion.div
                            ref={menuRef}
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 30,
                            }}
                            className="fixed inset-y-0 left-0 z-50 w-4/5 max-w-sm bg-white shadow-xl md:hidden"
                        >
                            <div className="flex h-fit flex-col overflow-y-auto overflow-x-hidden bg-white">
                                <div className="flex w-full flex-row items-center justify-between border-b px-4 py-4">
                                    <div
                                        className="max-w-[100px]"
                                        onClick={() => {
                                            router.push('/')
                                            setMobileMenuOpen(false)
                                        }}
                                    >
                                        <Image
                                            src={'/images/TechRentalLogo.png'}
                                            width={600}
                                            height={120}
                                            alt="techrental_logo"
                                            priority
                                        />
                                    </div>
                                    <button
                                        className="flex items-center gap-1 text-primary"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <X size={20} />
                                        <span className="text-[14px]">
                                            Đóng
                                        </span>
                                    </button>
                                </div>

                                {/* Search bar for mobile */}
                                <div className="mx-4 my-4 flex h-fit flex-row items-center gap-2 !rounded-[10px] border border-primary px-[10px] py-[8px]">
                                    <Search
                                        size={16}
                                        className="text-primary"
                                    />
                                    <input
                                        className="w-full outline-none placeholder:text-primary placeholder:text-opacity-60"
                                        placeholder="Nhập nội dung cần tìm..."
                                        ref={searchInputRef}
                                    ></input>
                                    <Button className="!rounded-[10px] !border-primary !bg-primary !p-[8px] !text-white">
                                        <Search size={16} />
                                    </Button>
                                </div>

                                {/* User profile for mobile */}
                                {user ? (
                                    <motion.div
                                        className="mx-4 mb-4 flex items-center gap-2 border-b pb-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <CircleUserRound
                                            size={24}
                                            className="text-primary"
                                        />
                                        <p
                                            onClick={() => {
                                                router.push(`/personal`)
                                                setMobileMenuOpen(false)
                                            }}
                                            className="cursor-pointer text-[16px] font-semibold text-primary"
                                        >
                                            {user.name}
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        className="mx-4 mb-4 flex items-center gap-2 border-b pb-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <ButtonCommon
                                            type="text"
                                            className="!text-[16px]"
                                            onClick={() => (
                                                router.push('/signIn'),
                                                setMobileMenuOpen(false)
                                            )}
                                        >
                                            Đăng nhập
                                        </ButtonCommon>
                                        <ButtonCommon
                                            type="primary"
                                            className="!text-[16px]"
                                            onClick={() => (
                                                router.push('/signUp'),
                                                setMobileMenuOpen(false)
                                            )}
                                        >
                                            Đăng ký
                                        </ButtonCommon>
                                    </motion.div>
                                )}
                                {/* Navigation links for mobile */}
                                {!path.includes('rental') ? (
                                    <div className="flex cursor-pointer flex-col">
                                        {[
                                            {
                                                href: '#',
                                                label: 'Trang chủ',
                                                delay: 0.15,
                                            },
                                            {
                                                href: '/products',
                                                label: 'Sản phẩm',
                                                delay: 0.25,
                                            },
                                            {
                                                href: '/personal',
                                                label: 'Trang cá nhân',
                                                delay: 0.45,
                                            },
                                        ].map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: item.delay,
                                                }}
                                            >
                                                <p
                                                    onClick={() => {
                                                        router.push(item.href)
                                                        setMobileMenuOpen(false)
                                                    }}
                                                    className="block border-b px-4 py-3 text-[16px] text-primary"
                                                >
                                                    {item.label}
                                                </p>
                                            </motion.div>
                                        ))}

                                        <motion.div
                                            className="border-b px-4 py-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <p className="text-[16px] font-medium text-primary">
                                                Kênh người thuê
                                            </p>
                                            <div className="ml-4 mt-2 flex flex-col gap-2">
                                                {items.map(
                                                    (item: any, index) => (
                                                        <motion.div
                                                            key={item?.key}
                                                            initial={{
                                                                opacity: 0,
                                                                x: -10,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                x: 0,
                                                            }}
                                                            transition={{
                                                                delay:
                                                                    0.2 +
                                                                    index *
                                                                        0.05,
                                                            }}
                                                        >
                                                            {item?.label}
                                                        </motion.div>
                                                    ),
                                                )}
                                            </div>
                                        </motion.div>

                                        {/* Notification links */}
                                        <motion.div
                                            className="border-b px-4 py-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <div
                                                className="flex items-center gap-2"
                                                onClick={() => {
                                                    user && setBellVisible(true)
                                                    setMobileMenuOpen(false)
                                                }}
                                            >
                                                <Bell
                                                    size={18}
                                                    className="text-primary"
                                                />
                                                <p className="text-[16px] text-primary">
                                                    Thông báo
                                                </p>
                                                {user && (
                                                    <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500">
                                                        <p className="text-[10px] text-white">
                                                            2
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            className="border-b px-4 py-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.55 }}
                                        >
                                            <div
                                                className="flex items-center gap-2"
                                                onClick={() => {
                                                    router.push('/chat')
                                                    setMobileMenuOpen(false)
                                                }}
                                            >
                                                <MessageCircle
                                                    size={18}
                                                    className="text-primary"
                                                />
                                                <p className="text-[16px] text-primary">
                                                    Tin nhắn
                                                </p>
                                                {user && (
                                                    <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500">
                                                        <p className="text-[10px] text-white">
                                                            7
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>

                                        {/* Logout for mobile */}
                                        {user && (
                                            <motion.div
                                                className="border-b px-4 py-3"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.6 }}
                                                onClick={logout}
                                            >
                                                <div className="flex items-center gap-2 text-primary">
                                                    <LogOut size={18} />
                                                    <p className="text-[16px]">
                                                        Đăng xuất
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex cursor-pointer flex-col">
                                        {[
                                            {
                                                href: '#',
                                                label: 'Trang chủ',
                                                delay: 0.15,
                                            },
                                            {
                                                href: '/products',
                                                label: 'Sản phẩm',
                                                delay: 0.25,
                                            },
                                            {
                                                href: '/personal',
                                                label: 'Trang cá nhân',
                                                delay: 0.45,
                                            },
                                        ].map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: item.delay,
                                                }}
                                            >
                                                <p
                                                    onClick={() => {
                                                        router.push(item.href)
                                                        setMobileMenuOpen(false)
                                                    }}
                                                    className="block border-b px-4 py-3 text-[16px] text-primary"
                                                >
                                                    {item.label}
                                                </p>
                                            </motion.div>
                                        ))}

                                        <motion.div
                                            className="border-b px-4 py-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <p className="text-[16px] font-medium text-primary">
                                                Kênh người cho thuê
                                            </p>
                                            <div className="ml-4 mt-2 flex flex-col gap-2">
                                                {itemsRental.map(
                                                    (item: any, index) => (
                                                        <motion.div
                                                            key={item?.key}
                                                            initial={{
                                                                opacity: 0,
                                                                x: -10,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                x: 0,
                                                            }}
                                                            transition={{
                                                                delay:
                                                                    0.2 +
                                                                    index *
                                                                        0.05,
                                                            }}
                                                        >
                                                            {item?.label}
                                                        </motion.div>
                                                    ),
                                                )}
                                            </div>
                                        </motion.div>

                                        {/* Notification links */}
                                        <motion.div
                                            className="border-b px-4 py-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <div
                                                className="flex items-center gap-2"
                                                onClick={() => {
                                                    user && setBellVisible(true)
                                                    setMobileMenuOpen(false)
                                                }}
                                            >
                                                <Bell
                                                    size={18}
                                                    className="text-primary"
                                                />
                                                <p className="text-[16px] text-primary">
                                                    Thông báo
                                                </p>
                                                {user && (
                                                    <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500">
                                                        <p className="text-[10px] text-white">
                                                            2
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            className="border-b px-4 py-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.55 }}
                                        >
                                            <div
                                                className="flex items-center gap-2"
                                                onClick={() => {
                                                    router.push('/chat')
                                                    setMobileMenuOpen(false)
                                                }}
                                            >
                                                <MessageCircle
                                                    size={18}
                                                    className="text-primary"
                                                />
                                                <p className="text-[16px] text-primary">
                                                    Tin nhắn
                                                </p>
                                                {user && (
                                                    <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500">
                                                        <p className="text-[10px] text-white">
                                                            7
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>

                                        {/* Logout for mobile */}
                                        {user && (
                                            <motion.div
                                                className="border-b px-4 py-3"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.6 }}
                                                onClick={logout}
                                            >
                                                <div className="flex items-center gap-2 text-primary">
                                                    <LogOut size={18} />
                                                    <p className="text-[16px]">
                                                        Đăng xuất
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                                {/* Social links for mobile */}
                                <motion.div
                                    className="mb-4 mt-4 px-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.65 }}
                                >
                                    <p className="text-[14px] text-gray-500">
                                        Kết nối với chúng tôi
                                    </p>
                                    <div className="mt-2 flex gap-4">
                                        <Link href="#" className="text-primary">
                                            <Facebook size={20} />
                                        </Link>
                                        <Link href="#" className="text-primary">
                                            <Instagram size={20} />
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.header>
    )
}

const DropdownProfile = () => {
    const router = useRouter()
    const { user, logout } = useAuth()

    if (!user) return null // ẩn dropdown khi chưa đăng nhập

    const items: MenuProps['items'] = [
        {
            key: 'personal',
            label: (
                <p
                    onClick={() => router.push(`/personal/${user._id}`)}
                    className="text-[16px]"
                >
                    Trang cá nhân
                </p>
            ),
        },
        {
            key: 'history',
            label: (
                <p
                    onClick={() =>
                        router.push(`/personal/${user._id}/rented-history`)
                    }
                    className="text-[16px]"
                >
                    Lịch sử thuê
                </p>
            ),
        },
        {
            key: 'logout',
            label: (
                <div className="flex items-center gap-2" onClick={logout}>
                    <p className="text-[16px]">Đăng xuất</p>
                    <LogOut size={18} />
                </div>
            ),
        },
    ]

    return (
        <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
                <Space className="flex cursor-pointer items-center gap-2 p-2 text-primary">
                    <CircleUserRound />
                    <span className="w-[120px] overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-semibold">
                        {user.name}
                    </span>
                </Space>
            </a>
        </Dropdown>
    )
}
