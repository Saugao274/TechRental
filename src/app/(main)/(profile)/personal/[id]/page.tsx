'use client'
import ProductUserView from '@/components/modules/Products/ProductUserView'
import PersonalProfile from '@/components/modules/Profile/Personal'
import { useAuth } from '@/context/AuthContext'
import { useParams } from 'next/navigation'
import React from 'react'

export default function ProfileUserPage() {
    const params = useParams()
    const { id } = params
    const { user } = useAuth()
    return user?._id === id ? <PersonalProfile /> : <ProductUserView />
}
