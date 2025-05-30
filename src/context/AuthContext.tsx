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
import webStorageClient from '@/utils/webStorageClient'
import constants from '@/settings/constants'

import { getRequest, postRequest } from '@/request'
import { userEndpoint } from '@/settings/endpoints'
import deleteStorage from '@/utils/deleteStorage'

interface AuthContextType {
    user: User | null
    loading: boolean
    login: (userData: User, token: string) => void
    logout: () => void
    updateIdentifier: () => void
    registeredLessor: (values: any) => Promise<string | null>
    updateUser: (newUser: User) => void
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter()

    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user')
        return storedUser ? JSON.parse(storedUser) : null
    })

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkToken = async () => {
            try {
                const response: any = await getRequest(userEndpoint.GET_MY_USER)
                if (response === 'Unauthorized') {
                    localStorage.clear()
                    return setUser(null)
                }
                setUser(response)
            } catch (error) {
                console.error('Error fetching user:', error)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        checkToken()
    }, [])

    const persist = (u: User | null) =>
        u
            ? localStorage.setItem('user', JSON.stringify(u))
            : localStorage.removeItem('user')

    const login = (userData: User, token: string) => {
        setUser(userData)
        persist(userData)
        webStorageClient.set(constants.ACCESS_TOKEN, token)
    }

    const logout = () => {
        setUser(null)
        localStorage.clear()
        router.push('/')
    }

    const updateUser = (newUser: User) => {
        setUser(newUser)
    }

    const updateIdentifier = async () => {
        const response = await getRequest(
            userEndpoint.VERIFY_USER(
                webStorageClient.get(constants.ACCESS_TOKEN),
            ),
        )
        if (response) setUser(response)
    }
    const registeredLessor = async (values: any): Promise<string | null> => {
        try {
            const response = await postRequest(userEndpoint.REGISTER_LESSOR, {
                data: values,
            })

            if (response?.data?.user) {
                setUser(response.data.user)
            }

            const shopId = response?.data?.shop?._id
            if (shopId) {
                return shopId
            } else {
                console.error('Không tìm thấy shopId trong phản hồi API')
                return null
            }
        } catch (error) {
            console.error('Error registering lessor:', error)
            return null
        }
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
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
