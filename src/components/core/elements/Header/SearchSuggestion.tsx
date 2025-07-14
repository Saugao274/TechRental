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
                                padding: 12,
                                cursor: 'pointer',
                                borderBottom: '1px solid #f5f5f5',
                                transition: 'all 0.2s ease',
                                backgroundColor: '#fff',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f8f9fa'
                                e.currentTarget.style.transform = 'translateX(4px)'
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#fff'
                                e.currentTarget.style.transform = 'translateX(0)'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                            onClick={() => {
                                router.push(`/products/${product._id}`)
                                setShowDropdown(false)
                                setSearchTerm('')
                            }}
                        >
                            <img
                                src={product.images?.[0] || '/placeholder.png'}
                                alt={product.title}
                                width={45}
                                height={35}
                                style={{ 
                                    marginRight: 12, 
                                    borderRadius: 6,
                                    objectFit: 'cover',
                                    transition: 'transform 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)'
                                }}
                            />
                            <div style={{ flex: 1 }}>
                                <div style={{ 
                                    fontWeight: 600, 
                                    fontSize: '14px',
                                    marginBottom: '4px',
                                    color: '#333'
                                }}>
                                    {product.title}
                                </div>
                                <div style={{ 
                                    color: '#e74c3c', 
                                    fontWeight: 600,
                                    fontSize: '13px'
                                }}>
                                    {product.price?.toLocaleString('vi-VN')} đ
                                </div>
                                {product.brand && (
                                    <div style={{ 
                                        color: '#666', 
                                        fontSize: '12px',
                                        marginTop: '2px'
                                    }}>
                                        {product.brand}
                                    </div>
                                )}
                            </div>
                            <div style={{
                                opacity: 0,
                                transition: 'opacity 0.2s ease',
                                color: '#007bff',
                                fontSize: '12px',
                                fontWeight: 500
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = '1'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = '0'
                            }}>
                                Xem chi tiết →
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
