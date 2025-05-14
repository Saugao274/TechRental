'use client'

import React, { useEffect, useState } from 'react'
import { Checkbox, Collapse, Button, Select } from 'antd'
import { getRequest } from '@/request'
import { productEndpoint } from '@/settings/endpoints'

const { Panel } = Collapse
const { Option } = Select

const priceOptions = [
    '0 - 10 triệu',
    '10 triệu - 20 triệu',
    '20 triệu - 30 triệu',
    '30 triệu - 40 triệu',
    '40 triệu - 50 triệu',
    '50 triệu trở lên',
]

const productOptions = [
    'Chân Máy',
    'FPV',
    'DJI Goggles',
    'Máy Quay',
    'Flycam',
    'Mic Thu Âm',
    'Camera',
    'Đèn quay phim',
    'Đèn Flash',
    'Macbook',
    'Điện Thoại',
    'Trạm Xạc Di Động',
    'Phụ Kiện Đèn',
    'Thiết bị Live',
]

const locationOptions = ['Hà Nội', 'Đà Nẵng', 'Sài Gòn']

const FilterSidebar = ({
    onFilter,
}: {
    onFilter: (filtered: any[]) => void
}) => {
    const [selectedPrices, setSelectedPrices] = useState<string[]>([])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedLocations, setSelectedLocations] = useState<string[]>([])
    const [productsData, setProductsData] = useState<any[]>([])
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getRequest(productEndpoint.GET_ALL)
                setProductsData(response.metadata)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        }

        fetchProducts()
    }, [])

    useEffect(() => {
        const noFilterSelected =
            selectedPrices.length === 0 &&
            selectedCategories.length === 0 &&
            selectedLocations.length === 0

        if (noFilterSelected) {
            onFilter(productsData)
        } else {
            applyFilters()
        }
    }, [productsData, selectedPrices, selectedCategories, selectedLocations])

    const handleFilterChange = (type: string, value: string) => {
        if (type === 'price') {
            setSelectedPrices((prev) =>
                prev.includes(value)
                    ? prev.filter((p) => p !== value)
                    : [...prev, value],
            )
        } else if (type === 'category') {
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

    const applyFilters = () => {
        const filteredProducts = productsData.filter((product) => {
            const matchesPrice =
                selectedPrices.length === 0 ||
                selectedPrices.some((price) => {
                    const [min, max] = price
                        .split('-')
                        .map((p) =>
                            parseInt(p.trim().replace(' triệu', '000000')),
                        )
                    return max
                        ? product.price >= min && product.price <= max
                        : product.price >= min
                })

            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.category)

            const matchesLocation =
                selectedLocations.length === 0 ||
                selectedLocations.includes(product.location)

            return matchesPrice && matchesCategory && matchesLocation
        })

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
                        {productOptions.map((product) => (
                            <Option key={product} value={product}>
                                {product}
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
                        {productOptions.map((product) => (
                            <Checkbox
                                key={product}
                                className="!mb-4 block w-full"
                                onChange={() =>
                                    handleFilterChange('category', product)
                                }
                            >
                                {product}
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
