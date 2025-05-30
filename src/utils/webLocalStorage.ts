const webLocalStorage = {
    set(key: string, rawValue: any) {
        if (typeof window === 'undefined') return
        localStorage.setItem(key, JSON.stringify(rawValue))
    },

    get(key: string) {
        if (typeof window === 'undefined') return null
        const rawData = localStorage.getItem(key) || ''
        const data = rawData ? JSON.parse(rawData) : null
        return data
    },
}

export default webLocalStorage
