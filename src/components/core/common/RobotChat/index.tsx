import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ChatPopup from './ChatPopup'

const RobotChat = () => {
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [isThinking, setIsThinking] = useState(false)

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen)
    }

    return (
        <>
            {!isChatOpen && (
                <motion.div
                    className="fixed bottom-1/2 right-1 flex h-14 w-14 cursor-pointer items-center justify-center opacity-30"
                    whileHover={{
                        scale: 1.1,
                        opacity: 1,
                        filter: 'drop-shadow(0px 0px 10px cyan)',
                    }}
                    animate={{
                        y: [0, -5, 0],
                        transition: { repeat: Infinity, duration: 2 },
                    }}
                    onHoverStart={() => setIsThinking(true)}
                    onHoverEnd={() => setIsThinking(false)}
                    onClick={toggleChat}
                >
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 shadow-lg">
                        {/* Mắt LED */}
                        <motion.div
                            className="absolute left-1/2 top-5 h-3 w-8 -translate-x-1/2 rounded-full bg-white"
                            animate={{
                                opacity: [0.8, 1, 0.8],
                                transition: { repeat: Infinity, duration: 1.5 },
                            }}
                        />
                        <motion.div className="absolute left-0 -ml-2 h-3 w-3 rounded-full bg-blue-500" />
                        <motion.div className="absolute right-0 -mr-2 h-3 w-3 rounded-full bg-blue-500" />
                        <motion.div className="absolute bottom-0 left-0 h-4 w-4 rounded-full bg-blue-700" />
                        <motion.div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-blue-700" />
                    </div>

                    {!isThinking && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-14 rounded-lg bg-white px-1 py-2 text-xs text-black shadow-md"
                        >
                            Tôi sẽ hỗ trợ bạn...
                        </motion.div>
                    )}
                </motion.div>
            )}

            {/* Popup Chat */}
            {isChatOpen && <ChatPopup onClose={toggleChat} showRobot />}
        </>
    )
}

export default RobotChat
