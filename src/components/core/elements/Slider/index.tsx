import React from 'react'
import SectionCommon from '../../common/SectionCommon'
import { Carousel } from '../../common/ResponsiveCarousel'

const carouselItems = [
    {
        id: 1,
        title: 'adhkadlsjdla',
        image: '/images/Slider/TEST.webp',
        alt: 'adadhlajdla',
    },
    {
        id: 2,
        title: 'kjhflfjlsdfjlsdf',
        image: '/images/Slider/Slider1.png',

        alt: 'dsklfhslfjlsfs',
    },
    {
        id: 3,
        title: 'kjhflfjlsdfjlsdf',
        image: '/images/Slider/Slider1.png',

        alt: 'dsklfhslfjlsfs',
    },
    {
        id: 4,
        title: 'kjhflfjlsdfjlsdf',
        image: '/images/Slider/Slider1.png',

        alt: 'dsklfhslfjlsfs',
    },
]

const Slider: React.FC = () => (
    <SectionCommon className="flex flex-col gap-12">
        <Carousel
            items={carouselItems}
            autoPlay
            autoPlayInterval={2000}
            dotType="line"
            // cornerRadius={10}
        />
    </SectionCommon>
)

export default Slider
