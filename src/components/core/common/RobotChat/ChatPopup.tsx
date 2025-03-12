import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CloseOutlined } from '@ant-design/icons'

const initialQuestions = [
    'Làm thế nào để đăng ký tài khoản?',
    'Tôi có thể đặt lại mật khẩu không?',
    'Chính sách bảo mật của bạn là gì?',
    'Chuyển sang hỗ trợ với người',
]

const relatedQuestions: Record<string, string[]> = {
    'Làm thế nào để đăng ký tài khoản?': [
        'Tôi cần thông tin gì để đăng ký?',
        'Có thể sử dụng email công ty không?',
    ],
    'Tôi có thể đặt lại mật khẩu không?': [
        'Tôi quên mật khẩu, phải làm sao?',
        'Tôi có thể đặt lại mật khẩu bao nhiêu lần?',
    ],
    'Chính sách bảo mật của bạn là gì?': [
        'Dữ liệu của tôi có an toàn không?',
        'Bạn có chia sẻ dữ liệu với bên thứ ba không?',
    ],
    'Yêu cầu nhân viên hỗ trợ': [],
}

const ChatPopup = ({
    onClose,
    showRobot,
}: {
    onClose: () => void
    showRobot?: boolean
}) => {
    const [messages, setMessages] = useState([
        {
            text: 'Xin chào! Tôi có thể giúp gì cho bạn?',
            sender: 'bot',
            isQuestion: false,
        },
    ])
    const [availableQuestions, setAvailableQuestions] =
        useState(initialQuestions)

    const handleSelectQuestion = (question: string) => {
        const userMessage = {
            text: question,
            sender: 'user',
            isQuestion: false,
        }
        const botResponse = {
            text: 'Tôi đang phân tích dữ liệu...',
            sender: 'bot',
            isQuestion: false,
        }

        setMessages((prev) => [...prev, userMessage, botResponse])

        setTimeout(() => {
            let answer = 'Xin lỗi, tôi chưa có câu trả lời cho câu hỏi này.'
            if (question === 'Làm thế nào để đăng ký tài khoản?') {
                answer =
                    'Bạn có thể đăng ký tài khoản bằng email hoặc số điện thoại trên trang chủ.'
            } else if (question === 'Tôi có thể đặt lại mật khẩu không?') {
                answer =
                    "Bạn có thể đặt lại mật khẩu bằng cách nhấn vào 'Quên mật khẩu' trên trang đăng nhập."
            } else if (question === 'Chính sách bảo mật của bạn là gì?') {
                answer =
                    'Chúng tôi cam kết bảo vệ dữ liệu cá nhân của bạn theo tiêu chuẩn bảo mật cao nhất.'
            } else if (question === 'Yêu cầu nhân viên hỗ trợ') {
                answer = 'Đang kết nối bạn với hỗ trợ viên...'
            }

            setMessages((prev) => [
                ...prev,
                { text: answer, sender: 'bot', isQuestion: false },
            ])

            setTimeout(() => {
                if (relatedQuestions[question]) {
                    setAvailableQuestions(relatedQuestions[question])
                    setMessages((prev) => [
                        ...prev,
                        {
                            text: 'Bạn có thể quan tâm:',
                            sender: 'bot',
                            isQuestion: true,
                        },
                    ])
                }
            }, 1000)
        }, 1500)
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-0 right-6 w-80 rounded-lg bg-white shadow-xl"
        >
            <div className="flex w-full items-center rounded-t-lg border-b bg-gradient-to-b from-blue-700 to-purple-500 p-2 text-white">
                {showRobot && (
                    <motion.div
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 shadow-md"
                        animate={{
                            rotate: [0, 10, -10, 0],
                            transition: { repeat: Infinity, duration: 2 },
                        }}
                    >
                        🤖
                    </motion.div>
                )}
                <span className="flex w-full items-center justify-evenly text-lg font-bold">
                    Hỗ trợ với AI
                </span>
                <CloseOutlined
                    className="cursor-pointer text-gray-600"
                    onClick={onClose}
                />
            </div>
            <div className="h-60 overflow-y-auto p-2">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`my-1 rounded-lg p-2 ${msg.sender === 'bot' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-black'}`}
                    >
                        {msg.text}
                    </div>
                ))}
                {availableQuestions.length > 0 && (
                    <div className="mt-3">
                        {availableQuestions.map((q, index) => (
                            <button
                                key={index}
                                className="mb-2 block w-full rounded-md bg-gray-100 px-3 py-2 text-left text-gray-800 hover:bg-gray-200"
                                onClick={() => handleSelectQuestion(q)}
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default ChatPopup
