'use client'

import React, { useEffect, useState } from 'react'
import { Checkbox, Collapse, Button, Select } from 'antd'
import { getRequest } from '@/request'
import { categoryEndpoint, productEndpoint } from '@/settings/endpoints'
import { useProducts } from '@/context/ProductContext'
import type { CategoryType } from '@/data/products'

const { Panel } = Collapse
const { Option } = Select

const priceOptions = [
    '0 - 100.000',
    '100.000 - 200.000',
    '200.000 - 300.000',
    '300.000 - 400.000',
    '400.000 - 500.000',
    '500.000 trở lên',
]

const locationOptions = ['Hà Nội', 'Đà Nẵng', 'Sài Gòn']

const FilterSidebar = ({
    onFilter,
}: {
    onFilter: (filtered: any[]) => void
}) => {
    const [filteredCount, setFilteredCount] = useState<number>(0)
    const [selectedPrices, setSelectedPrices] = useState<string[]>([])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedLocations, setSelectedLocations] = useState<string[]>([])
    const { productsData } = useProducts()
    const [categories, setCategories] = useState<CategoryType[]>([])

    // Check if any filters are active
    const hasActiveFilters = selectedPrices.length > 0 || selectedCategories.length > 0 || selectedLocations.length > 0

    useEffect(() => {
        const getCategoryData = async () => {
            const res = await getRequest(categoryEndpoint.GET_ALL)
            console.log('res', res)

            if (res?.metadata) {
                setCategories(res.metadata)
            }
        }

        getCategoryData()
    }, [])

    // Initialize filtered count when productsData changes
    useEffect(() => {
        setFilteredCount(productsData.length)
    }, [productsData])

    useEffect(() => {
        // Always apply filters, even when no filters are selected
        // This ensures consistent behavior and handles edge cases
        applyFilters()
    }, [productsData, selectedPrices, selectedCategories, selectedLocations])

    const handleFilterChange = (type: string, value: string) => {
        if (type === 'price') {
            setSelectedPrices((prev) =>
                prev.includes(value)
                    ? prev.filter((p) => p !== value)
                    : [...prev, value],
            )
        } else if (type === 'category') {
            console.log('cate', value)
            setSelectedCategories((prev) =>
                prev.includes(value)
                    ? prev.filter((c) => c !== value)
                    : [...prev, value],
            )
        } else if (type === 'location') {
            setSelectedLocations((prev) =>
                prev.includes(value)
                    ? prev.filter((l) => l !== value)
                    : [...prev, value],
            )
        }
    }

    const clearAllFilters = () => {
        setSelectedPrices([])
        setSelectedCategories([])
        setSelectedLocations([])
    }

    const applyFilters = () => {
        const filteredProducts = productsData.filter((product: any) => {
            // Filter by price - product must match at least one selected price range
            const matchesPrice =
                selectedPrices.length === 0 ||
                selectedPrices.some((priceRange) => {
                    if (priceRange === '500.000 trở lên') {
                        return product.price >= 500000
                    }
                    
                    const [minStr, maxStr] = priceRange.split('-').map(s => s.trim())
                    
                    // Convert "100.000" to 100000
                    const min = parseInt(minStr.replace(/\./g, ''))
                    const max = parseInt(maxStr.replace(/\./g, ''))
                    
                    return product.price >= min && product.price <= max
                })

            // Filter by category - product must match at least one selected category
            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.category._id)

            // Filter by location - product must match at least one selected location
            const matchesLocation =
                selectedLocations.length === 0 ||
                selectedLocations.includes(product.location)

            // Product must match ALL active filter types (price AND category AND location)
            return matchesPrice && matchesCategory && matchesLocation
        })

        setFilteredCount(filteredProducts.length)
        onFilter(filteredProducts)
    }
    const [showMessage, setShowMessage] = useState(false)
    useEffect(() => {
        const toggleMessage = () => {
            setShowMessage((prev) => !prev)
            setTimeout(toggleMessage, 5000)
        }

        return () => clearTimeout(setTimeout(toggleMessage, 5000))
    }, [])

    return (
        <div className="relative h-full w-full rounded-lg bg-white p-4 shadow-2xl shadow-white">
            <div className="lg:hidden">
                <div className="mb-4 flex items-center gap-2">
                    <img
                        src="/images/Products/Recomment/robotNoti.png"
                        width={50}
                        height={50}
                        className="animate-bounce"
                    />
                    <p className="font-semibold text-blue-700">
                        Bạn cần chọn sản phẩm phù hợp không?
                    </p>
                </div>
                <div className="flex flex-col gap-3 lg:hidden">
                    <Select placeholder="Chọn mức giá" className="w-full">
                        {priceOptions.map((price) => (
                            <Option key={price} value={price}>
                                {price}
                            </Option>
                        ))}
                    </Select>

                    <Select placeholder="Chọn sản phẩm" className="w-full">
                        {categories.map((product) => (
                            <Option key={product._id} value={product}>
                                {product.name}
                            </Option>
                        ))}
                    </Select>

                    <Select placeholder="Chọn tỉnh thành" className="w-full">
                        {locationOptions.map((location) => (
                            <Option key={location} value={location}>
                                {location}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="hidden lg:flex">
                <>
                    <img
                        src="/images/Products/Recomment/robotNoti.png"
                        width={80}
                        height={80}
                        className="opacity-1 absolute -left-7 -top-10 z-10 rotate-3"
                        onClick={() => setShowMessage(!showMessage)}
                    />

                    {!showMessage ? (
                        <div className="absolute -left-12 -top-24 w-3/4 rounded-xl bg-[#A7C7E7] px-2 py-1 text-xs text-blue-900 shadow-md">
                            <p>Bạn cần chọn sản phẩm phù hợp không?</p>
                            <span className="absolute -bottom-1 left-8 -z-10 h-3 w-3 rotate-45 bg-[#A7C7E7]"></span>
                        </div>
                    ) : (
                        <div className="absolute -left-2 -top-16 w-1/4 rounded-xl bg-[#A7C7E7] px-2 py-1 text-xs text-blue-900 shadow-md">
                            <p>....</p>
                            <span className="absolute -bottom-1 left-8 -z-10 h-3 w-3 rotate-45 bg-[#A7C7E7]"></span>
                        </div>
                    )}
                </>
                <Collapse defaultActiveKey={['1', '2', '3']} ghost>
                    <Panel
                        header={<p className="font-bold">Chọn Mức Giá</p>}
                        key="1"
                    >
                        {priceOptions.map((price) => (
                            <Checkbox
                                key={price}
                                className="!mb-4 block w-full"
                                checked={selectedPrices.includes(price)}
                                onChange={() =>
                                    handleFilterChange('price', price)
                                }
                            >
                                {price}
                            </Checkbox>
                        ))}
                    </Panel>

                    <Panel
                        header={<p className="font-bold">Sản Phẩm</p>}
                        key="2"
                    >
                        {categories.map((product) => (
                            <Checkbox
                                key={product._id}
                                className="!mb-4 block w-full"
                                checked={selectedCategories.includes(product._id)}
                                onChange={() =>
                                    handleFilterChange('category', product._id)
                                }
                            >
                                {product.name}
                            </Checkbox>
                        ))}
                    </Panel>

                    <Panel
                        header={<p className="font-bold">Tỉnh thành</p>}
                        key="3"
                    >
                        {locationOptions.map((location) => (
                            <Checkbox
                                key={location}
                                className="!mb-4 block w-full"
                                checked={selectedLocations.includes(location)}
                                onChange={() =>
                                    handleFilterChange('location', location)
                                }
                            >
                                {location}
                            </Checkbox>
                        ))}
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
}

export default FilterSidebar
