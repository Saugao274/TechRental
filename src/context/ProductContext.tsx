'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getRequest } from '@/request'
import { productEndpoint } from '@/settings/endpoints'

const ProductContext = createContext<any>(null)

export const ProductProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [productsData, setProductsData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const response = await getRequest(
                    productEndpoint.GET_ALL_APPROVED,
                )
                if (
                    response.metadata === null ||
                    response.metadata === undefined
                )
                    return setProductsData([])
                setProductsData(response.metadata)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
            setLoading(false)
        }
        fetchProducts()
    }, [])

    return (
        <ProductContext.Provider value={{ productsData, loading }}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProducts = () => useContext(ProductContext)
