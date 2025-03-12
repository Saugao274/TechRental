import React from 'react'
import PageHader from '../../common/PageHeader'
import ProductCard from '../../common/CardCommon/ProductCard'
import SectionCommon from '../../common/SectionCommon'
import { productsData } from '@/data/products'
import { Layout } from 'antd'

const HotProducts = () => {
    const hotProductssData = productsData.filter(
        (product) => product.IsHotProduct,
    )
    return (
        <SectionCommon className="flex flex-col gap-10">
            {/* <SectionCommon className="flex flex-col gap-12"> */}
            <PageHader title="Sản phẩm nổi bật" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 ">
                {hotProductssData.slice(0.4).map((product, index) => (
                    <ProductCard
                        key={index}
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
        </SectionCommon>
    )
}

export default HotProducts
