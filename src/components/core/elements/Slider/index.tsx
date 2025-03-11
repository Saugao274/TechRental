import React from 'react'
import { Carousel, Image } from 'antd'
import SectionCommon from '../../common/SectionCommon'

const Slider: React.FC = () => (
    <SectionCommon className="flex flex-col gap-12">
        <Carousel
            className="grid grid-cols-1 gap-5 md:grid-cols-4"
            autoplay={{ dotDuration: true }}
            autoplaySpeed={5000}
        >
            <Image
                className="h-auto w-full"
                src="/images/Slider/slider1.png"
                alt="slider1"
            />
            <Image
                className="h-auto w-full"
                src="/images/Slider/slider1.png"
                alt="slider1"
            />
            <Image
                className="h-auto w-full"
                src="/images/Slider/slider1.png"
                alt="slider1"
            />
            <Image
                className="h-auto w-full"
                src="/images/Slider/slider1.png"
                alt="slider1"
            />
        </Carousel>
    </SectionCommon>
)

export default Slider
