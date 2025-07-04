import React, { useContext } from 'react'
import SectionCommon from '../../common/SectionCommon'
import ButtonCommon from '../../common/ButtonCommon'
import { StarFilled, UserAddOutlined, HeartFilled } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { Avatar } from 'antd'
import { useAuth } from "@/context/AuthContext"

const Intro = () => {
    const { user } = useAuth()

    const floatingVariants = {
        floating1: {
            y: [0, -10, 0],
            transition: {
                repeat: Infinity,
                repeatType: 'mirror' as const,
                duration: 2,
                ease: 'easeInOut',
            },
        },
        floating2: {
            y: [0, 0, -10],
            transition: {
                repeat: Infinity,
                repeatType: 'mirror' as const,
                duration: 2,
                ease: 'easeInOut',
            },
        },
        hover: {
            scale: 1.2,
            transition: { duration: 0.3 },
        },
    }

    return (
        <SectionCommon className="flex flex-col items-center gap-12 !pb-4">
            <div className="flex flex-col items-center gap-4">
                <div className="relative h-auto w-full">
                    {/* Đánh giá bên trái */}
                    <motion.img
                        initial={{ x: -50, opacity: 1 }}
                        animate="floating1"
                        whileHover="hover"
                        variants={floatingVariants}
                        className="hidden md:block absolute -left-20 top-36 w-1/4"
                        src="/images/Intro/Comment1.png"
                    />

                    {/* Đánh giá bên phải */}
                    <motion.img
                        initial={{ x: 50, opacity: 1 }}
                        animate="floating2"
                        whileHover="hover"
                        variants={floatingVariants}
                        className="md:block hidden absolute -right-16 top-36 w-1/4"
                        src="/images/Intro/Comment2.png"
                    />
                </div>

                <div className="gap font-Be_Vietnam_Pro flex md:flex-row flex-col items-center gap-3 font-bold">
                    <span className="bg-gradient-to-b from-blue-700 to-blue-500 bg-clip-text text-4xl text-transparent">
                        Tech
                        <span className="bg-gradient-to-r from-blue-500 to-blue-900 bg-clip-text text-4xl text-transparent">
                            Rental
                        </span>
                    </span>

                    <ButtonCommon
                        type="default"
                        className="!pointer-events-none flex items-center !gap-2 !rounded-full !border-white !bg-white/80 !p-1 !px-0 !py-4 !pr-2 !shadow-[-6px_-6px_12px_#fff]"
                    >
                        {/* Icon */}
                        <img
                            src="images/Intro/icon.png"
                            alt="Icon"
                            className="h-8 w-8"
                        />

                        {/* Text Gradient */}
                        <span className="bg-gradient-to-r from-blue-500 to-blue-900 bg-clip-text text-xl font-bold italic text-transparent">
                            Giải pháp thuê đồ
                        </span>
                    </ButtonCommon>
                </div>
                <p className="font-Be_Vietnam_Pro bg-gradient-to-b from-[#2D84BE] to-blue-500 bg-clip-text text-3xl font-bold text-transparent w-full text-wrap">
                    Nâng tầm trải nghiệm công nghệ, tối ưu mọi nhu cầu
                </p>
                <p className="font-Be_Vietnam_Pro md:w-2/3 text-center text-base">
                    Techrental cho thuê đa dạng thiết bị công nghệ, giúp khách
                    hàng tiếp cận công nghệ với chi phí hợp lý.
                </p>
                <ButtonCommon
                    type="primary"
                    className="flex items-center !gap-2 !rounded-lg !border-white !px-4 !py-4 !text-base !shadow-[-6px_-6px_12px_#fff]"
                >
                    {!user ? (
                        <a href="/signUp">Đăng ký để trải nghiệm</a>
                    ) : (
                        <>
                          <span>Chào mừng bạn trở lại!</span>
                          <HeartFilled style={{ color: 'white', fontSize: 20, marginLeft: 8, verticalAlign: 'middle' }} />
                        </>
                    )}
                    {!user && <UserAddOutlined />}
                </ButtonCommon>
            </div>
            <div className="flex items-center gap-2 text-xs">
                <Avatar.Group>
                    <Avatar src="/images/Intro/avt3.png" />
                    <Avatar src="/images/Intro/avt2.png" />
                    <Avatar src="/images/Intro/avt4.png" />
                    <Avatar src="/images/Intro/avt1.png" />
                </Avatar.Group>

                <div className="flex items-center gap-1 text-xs font-bold">
                    <StarFilled style={{ color: 'yellow', fontSize: 18 }} />
                    <p className="text-xs"> 4,8/5</p>
                </div>
                <p className="text-xs"> Đánh giá từ khách hàng</p>
            </div>
        </SectionCommon>
    )
}

export default Intro
