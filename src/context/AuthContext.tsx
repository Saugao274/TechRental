'use client'
import { User } from '@/data/authData'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
    user: User | null
    login: (userData: User) => void
    logout: () => void
    updateIdentifier: () => void
    registeredLessor: () => void

    updateUser: (userData: User) => void
}

// Tạo context mặc định
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = (userData: User) => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
        router.push('/')
    }

    const updateIdentifier = () => {
        if (user) {
            const updatedUser = { ...user, isVerified: true }
            console.log("IÊ",updateUser)
            setUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))
        }
    }
    const updateUser = (newUser: User) => {
        setUser(newUser)
        localStorage.setItem('user', JSON.stringify(newUser))
    }
    const registeredLessor = () => {
        if (user) {
            const updatedUser = { ...user, registeredLessorr: true }
            setUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))
        }
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                updateIdentifier,
                updateUser,
                registeredLessor,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
