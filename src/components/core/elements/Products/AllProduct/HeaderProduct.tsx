import SectionCommon from '@/components/core/common/SectionCommon'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

const images = [
    '/images/Products/HeaderProduct/ws1.png',
    '/images/Products/HeaderProduct/ws2.png',
    '/images/Products/HeaderProduct/ws3.png',
    '/images/Products/HeaderProduct/ws4.png',
    '/images/Products/HeaderProduct/ws5.png',
]

const HeaderProducts = () => {
    const [current, setCurrent] = useState(0)
    const totalImages = images.length

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % totalImages)
    }

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + totalImages) % totalImages)
    }

    return (
        <SectionCommon className="relative flex h-80 items-center justify-center">
            {/* Slider */}
            <div className="relative flex w-[800px] items-center justify-center">
                <img
                    src={images[(current + totalImages - 2) % totalImages]}
                    className="z-[2] h-48 w-auto rounded-2xl object-cover opacity-80 transition-all duration-500 ease-in-out"
                    style={{ transform: 'translateX(300px)' }}
                />
                <img
                    src={images[(current + totalImages - 1) % totalImages]}
                    className="z-[3] h-64 w-auto rounded-2xl object-cover opacity-90 transition-all duration-500 ease-in-out"
                    style={{ transform: 'translateX(150px)' }}
                />
                <img
                    src={images[current]}
                    className="z-[4] h-80 w-auto rounded-2xl object-cover opacity-100 transition-all duration-500 ease-in-out"
                />
                <img
                    src={images[(current + 1) % totalImages]}
                    className="z-[3] h-64 w-auto rounded-2xl object-cover opacity-90 transition-all duration-500 ease-in-out"
                    style={{ transform: 'translateX(-150px)' }}
                />
                <img
                    src={images[(current + 2) % totalImages]}
                    className="z-[2] h-48 w-auto rounded-2xl object-cover opacity-80 transition-all duration-500 ease-in-out"
                    style={{ transform: 'translateX(-300px)' }}
                />
                {/* Nút điều hướng cố định */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 z-[5] -translate-y-1/2 rounded-full bg-white/80 p-3 opacity-50 transition-opacity hover:bg-white hover:opacity-100 focus:opacity-100"
                    style={{ transform: 'translateX(-200%)' }}
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 z-[5] -translate-y-1/2 rounded-full bg-white/80 p-3 opacity-50 transition-opacity hover:bg-white hover:opacity-100 focus:opacity-100"
                    style={{ transform: 'translateX(200%)' }}
                    aria-label="Next slide"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            </div>
        </SectionCommon>
    )
}

export default HeaderProducts
