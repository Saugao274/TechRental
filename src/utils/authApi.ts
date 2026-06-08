// Utility for making authenticated API calls
export const authApiCall = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token') || localStorage.getItem('accessToken')

    const defaultHeaders = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
    }

    const response = await fetch(url, {
        ...options,
        headers: defaultHeaders,
    })

    if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`)
    }

    return response.json()
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token') || localStorage.getItem('accessToken')
    return !!token
}

// Get user data from localStorage
export const getUserData = () => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
        try {
            return JSON.parse(userStr)
        } catch (error) {
            console.error('Error parsing user data:', error)
            return null
        }
    }
    return null
}

// Clear authentication data
export const clearAuthData = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
} 