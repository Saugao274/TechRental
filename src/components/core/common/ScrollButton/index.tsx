import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'

const ScrollButton = () => {
    const [showTop, setShowTop] = useState(false)
    const [showBottom, setShowBottom] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const scrollHeight = document.documentElement.scrollHeight
            const innerHeight = window.innerHeight

            setShowTop(scrollY > 50)
            setShowBottom(scrollY + innerHeight < scrollHeight - 50)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            {showTop && (
                <motion.div
                    whileHover={{ scale: 1.2, opacity: 1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-2 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-pink-500 text-white opacity-40 shadow-lg"
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                >
                    <ArrowUpOutlined />
                </motion.div>
            )}

            {showBottom && (
                <motion.div
                    whileHover={{ scale: 1.2, opacity: 1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-2 left-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white opacity-40 shadow-lg"
                    onClick={() =>
                        window.scrollTo({
                            top: document.body.scrollHeight,
                            behavior: 'smooth',
                        })
                    }
                >
                    <ArrowDownOutlined />
                </motion.div>
            )}
        </>
    )
}

export default ScrollButton
