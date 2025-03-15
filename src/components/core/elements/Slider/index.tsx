import React from 'react'
import SectionCommon from '../../common/SectionCommon'
import { Carousel } from '../../common/ResponsiveCarousel'

const carouselItems = [
    {
        id: 1,
        title: 'adhkadlsjdla',
        image: '/images/Slider/Slider0.png',
        alt: 'adadhlajdla',
    },
    {
        id: 0,
        title: 'adhkadlsjdla',
        alt: 'adadhlajdla',
        video: '/videos/slider.mp4',
        autoPlayInterval: 20000,
    },

    {
        id: 2,
        title: 'kjhflfjlsdfjlsdf',
        image: '/images/Slider/Slider1.png',
        alt: 'dsklfhslfjlsfs',
    },

    {
        id: 4,
        title: 'kjhflfjlsdfjlsdf',
        image: '/images/Slider/Slider3.png',
        alt: 'dsklfhslfjlsfs',
    },
    {
        id: 5,
        title: 'kjhflfjlsdfjlsdf',
        image: '/images/Slider/Slider4.png',
        alt: 'dsklfhslfjlsfs',
    },
    {
        id: 6,
        title: 'kjhflfjlsdfjlsdf',
        image: '/images/Slider/Slider5.png',
        alt: 'dsklfhslfjlsfs',
    },
]

const Slider: React.FC = () => (
    <SectionCommon className="md:full flex h-full flex-col gap-12 xl:h-[40em]">
        <Carousel
            items={carouselItems}
            autoPlay
            autoPlayInterval={10000}
            dotType="line"
            // cornerRadius={10}
        />
    </SectionCommon>
)

export default Slider
