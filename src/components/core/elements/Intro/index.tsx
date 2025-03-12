import React from 'react'
import SectionCommon from '../../common/SectionCommon'
import ButtonCommon from '../../common/ButtonCommon'
import { StarFilled, UserAddOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { Avatar } from 'antd'

const Intro = () => {
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
                        initial={{ x: -50, opacity: 1 }} // Luôn hiển thị
                        animate="floating1"
                        whileHover="hover"
                        variants={floatingVariants}
                        className="absolute -left-28 top-36 w-1/4"
                        src="/images/Intro/Comment1.png"
                    />

                    {/* Đánh giá bên phải */}
                    <motion.img
                        initial={{ x: 50, opacity: 1 }} // Luôn hiển thị
                        animate="floating2"
                        whileHover="hover"
                        variants={floatingVariants}
                        className="absolute -right-28 top-36 w-1/4"
                        src="/images/Intro/Comment2.png"
                    />
                </div>

                <p className="gap flex items-center gap-3 font-Be_Vietnam_Pro font-bold">
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
                </p>
                <p className="bg-gradient-to-b from-[#2D84BE] to-blue-500 bg-clip-text font-Be_Vietnam_Pro text-3xl font-bold text-transparent">
                    Nâng tầm trải nghiệm công nghệ, tối ưu mọi nhu cầu
                </p>

                <p className="w-2/3 text-center font-Be_Vietnam_Pro text-base">
                    Techrental cho thuê đa dạng thiết bị công nghệ, giúp khách
                    hàng tiếp cận công nghệ với chi phí hợp lý.
                </p>
                <ButtonCommon
                    type="primary"
                    className="flex items-center !gap-2 !rounded-lg !border-white !px-4 !py-4 !shadow-[-6px_-6px_12px_#fff]"
                >
                    <span>Đăng ký để trải nghiệm</span>
                    <UserAddOutlined />
                </ButtonCommon>
            </div>
            <div className="flex items-center gap-2 text-xs">
                <Avatar.Group>
                    <Avatar src="/images/Intro/avt3.png" />
                    <Avatar src="/images/Intro/avt2.png" />
                    <Avatar src="/images/Intro/avt4.png" />
                    <Avatar src="/images/Intro/avt1.png" />
                </Avatar.Group>

                <div className="flex items-center gap-1 font-bold">
                    <StarFilled style={{ color: 'yellow', fontSize: 18 }} />
                    <p> 4,8/5</p>
                </div>
                <p> Đánh giá từ khách hàng</p>
            </div>
        </SectionCommon>
    )
}

export default Intro
