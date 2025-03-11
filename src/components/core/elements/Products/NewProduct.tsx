import React from 'react'
import PageHader from '../../common/PageHeader'
import ProductCard from '../../common/CardCommon/ProductCard'
import SectionCommon from '../../common/SectionCommon'
import { productsData } from '@/data/products'

const NewProduct = () => {
    const newProductsData = productsData.filter(
        (product) => product.IsNewProduct,
    )
    return (
        <div className="flex flex-col gap-12">
            <PageHader title="Sản phẩm mới" />
            <div className="flex justify-between">
                {newProductsData.slice(0.4).map((product) => (
                    <ProductCard
                        Image={product.Image}
                        Title={product.Title}
                        Details={product.Details}
                        Price={product.Price}
                        view={product.View}
                        id={product.Id}
                        totalReviews={product.TotalReviews}
                    />
                ))}
            </div>
        </div>
    )
}

export default NewProduct
