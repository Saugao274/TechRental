// hooks/useShopId.ts
<<<<<<< HEAD
"use client"

import { useState, useEffect } from "react"
import constants from "@/settings/constants"
import webStorageClient from "@/utils/webStorageClient"

export const useShopId = () => {
  const [shopId, setShopId] = useState<string | null>(null)

  useEffect(() => {
    const fetchShopId = async () => {
      try {
        const token = webStorageClient.get(constants.ACCESS_TOKEN)

        const res = await fetch(`${constants.API_SERVER}/api/shopDetail/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        })

        const data = await res.json()
        if (res.ok) {
          setShopId(data.metadata._id)
        } else {
          console.error("ShopDetail fetch failed:", data.message)
        }
      } catch (err) {
        console.error("Lỗi khi lấy shopId:", err)
      }
    }

    fetchShopId()
  }, [])

  return shopId
=======
'use client'

import { useState, useEffect } from 'react'
import constants from '@/settings/constants'
import webStorageClient from '@/utils/webStorageClient'

export const useShopId = () => {
    const [shopId, setShopId] = useState<string | null>(null)

    useEffect(() => {
        const fetchShopId = async () => {
            try {
                const token = webStorageClient.get(constants.ACCESS_TOKEN)

                const res = await fetch(
                    `${constants.SERVICE_API_SERVIER}/api/shopDetail/me`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        credentials: 'include',
                    },
                )

                const data = await res.json()
                if (res.ok) {
                    setShopId(data.metadata._id)
                } else {
                    console.error('ShopDetail fetch failed:', data.message)
                }
            } catch (err) {
                console.error('Lỗi khi lấy shopId:', err)
            }
        }

        fetchShopId()
    }, [])

    return shopId
>>>>>>> 6ea8f1d20b40c0eb7b72622383fb1737245341c4
}
