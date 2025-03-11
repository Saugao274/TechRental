import React from 'react'
import PageHader from '../../common/PageHeader'
import ProductCard from '../../common/CardCommon/ProductCard'

const NewProduct = () => {
    return (
        <div className="flex flex-col gap-5">
            <PageHader title="Sản phẩm mới" />
            <ProductCard
                Image={''}
                Title={'DJI Osmo Pocket 3 Combo'}
                Details="DJI Osmo Pocket 3 Combo là sản phẩm mới nhất của DJI với nhiều cải tiến về chất lượng hình ảnh và chất lượng âm thanh."
                Price={700000}
                view={200}
                id={''}
                totalReviews={30}
            />
        </div>
    )
}

export default NewProduct
