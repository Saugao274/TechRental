import React, { useState, useRef, useEffect } from 'react'
import { Input } from 'antd'
import { useRouter } from 'next/navigation'
import { useProducts } from '@/context/ProductContext'

export default function SearchSuggestion() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const { productsData } = useProducts()
    const router = useRouter()
    const inputRef = useRef<HTMLDivElement>(null)

    const filteredProducts = searchTerm
        ? productsData
              .filter((product: any) =>
                  product.title
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase()),
              )
              .slice(0, 5)
        : []

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div style={{ position: 'relative', width: 300 }} ref={inputRef}>
            <Input
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setShowDropdown(true)
                }}
                onFocus={() => setShowDropdown(true)}
            />
            {showDropdown && searchTerm && (
                <div
                    style={{
                        position: 'absolute',
                        top: 30,
                        left: 0,
                        right: 0,
                        background: '#fff',
                        border: '1px solid #eee',
                        zIndex: 1000,
                        borderRadius: 8,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                >
                    <div
                        style={{
                            padding: 2,
                            borderBottom: '1px solid #eee',
                            color: '#888',
                        }}
                    >
                        Sản phẩm gợi ý
                    </div>
                    {filteredProducts.length === 0 && (
                        <div style={{ padding: 8, color: '#aaa' }}>
                            Không tìm thấy sản phẩm
                        </div>
                    )}
                    {filteredProducts.map((product: any) => (
                        <div
                            key={product._id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: 8,
                                cursor: 'pointer',
                                borderBottom: '1px solid #f5f5f5',
                            }}
                            onClick={() => {
                                router.push(`/products/${product._id}`)
                                setShowDropdown(false)
                            }}
                        >
                            <img
                                src={product.images?.[0] || '/placeholder.png'}
                                alt={product.title}
                                width={40}
                                height={29}
                                style={{ marginRight: 8, borderRadius: 4 }}
                            />
                            <div>
                                <div style={{ fontWeight: 500 }}>
                                    {product.title}
                                </div>
                                <div style={{ color: 'red' }}>
                                    {product.price?.toLocaleString('vi-VN')} đ
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
