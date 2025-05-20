'use client'

import Home from '@/components/modules/Home'
import { useAuth } from '@/context/AuthContext'

export default function UserPage() {
    const { user } = useAuth()

    return (
        <>
            <Home />
        </>
    )
}
