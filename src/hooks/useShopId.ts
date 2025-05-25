// hooks/useShopId.ts
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
}
