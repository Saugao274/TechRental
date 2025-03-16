"use client"

import type React from "react"

import { useState } from "react"
import { Card } from 'antd'
import { Trophy, Users, ThumbsUp, RefreshCw } from "lucide-react"
import CountUp from "react-countup"

type StatsType = {
  success: number
  users: number
  positive: number
  daily: number
}

export default function StatisticsHome() {
  const [stats, setStats] = useState<StatsType>({
    success: 1287,
    users: 1078,
    positive: 340,
    daily: 37,
  })

  const handleHover = (key: keyof StatsType) => {
    setStats((prevStats) => ({ ...prevStats, [key]: 0 }))
    setTimeout(() => {
      setStats({
        success: 1287,
        users: 1078,
        positive: 340,
        daily: 37,
      })
    }, 100)
  }

  return (
    <div className="w-full px-4 py-8 md:px-8 lg:px-20">
      <Card className="overflow-hidden bg-white p-4 shadow-xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatItem
            value={stats.success}
            label="Giao dịch thành công"
            icon={<Trophy className="h-6 w-6 text-rose-600" />}
            onMouseEnter={() => handleHover("success")}
          />

          <StatItem
            value={stats.users}
            label="Người dùng"
            icon={<Users className="h-6 w-6 text-teal-600" />}
            onMouseEnter={() => handleHover("users")}
          />

          <StatItem
            value={stats.positive}
            label="Đánh giá tích cực"
            icon={<ThumbsUp className="h-6 w-6 text-purple-600" />}
            onMouseEnter={() => handleHover("positive")}
          />

          <StatItem
            value={stats.daily}
            label="Giao dịch mỗi ngày"
            icon={<RefreshCw className="h-6 w-6 text-green-600" />}
            onMouseEnter={() => handleHover("daily")}
          />
        </div>
      </Card>
    </div>
  )
}

interface StatItemProps {
  value: number
  label: string
  icon: React.ReactNode
  onMouseEnter: () => void
}

function StatItem({ value, label, icon, onMouseEnter }: StatItemProps) {
  return (
    <div
      className="flex flex-col items-center justify-center p-2 text-center transition-all hover:scale-105"
      onMouseEnter={onMouseEnter}
    >
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-bold text-[#1D3D85] md:text-3xl">
        <CountUp end={value} separator="," duration={2.5} suffix="+" />
      </div>
      <div className="mt-1 text-base font-semibold text-blue-800 md:text-lg">{label}</div>
    </div>
  )
}

