'use client'

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/data/authData'

interface AuthContextType {
    user: User | null
    loading: boolean
    login: (userData: User) => void
    logout: () => void
    updateIdentifier: () => void
    registeredLessor: () => void
    updateUser: (newUser: User) => void
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter()

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const saved = localStorage.getItem('user')
        if (saved) setUser(JSON.parse(saved))
        setLoading(false)
    }, [])

    const persist = (u: User | null) =>
        u
            ? localStorage.setItem('user', JSON.stringify(u))
            : localStorage.removeItem('user')

    const login = (userData: User) => {
        setUser(userData)
        persist(userData)
    }

    const logout = () => {
        setUser(null)
        persist(null)
        router.push('/')
    }


    const updateUser = (newUser: User) => {
        setUser(newUser)
        persist(newUser)
    }

    const updateIdentifier = () => {
        if (user) updateUser({ ...user, isVerified: true })
    }

    const registeredLessor = () => {
        if (user) updateUser({ ...user, registeredLessor: true })
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                updateIdentifier,
                registeredLessor,
                updateUser,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
