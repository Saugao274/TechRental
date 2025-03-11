import React from 'react'
import SectionCommon from '../../common/SectionCommon'

const NavIcons = () => {
    const navIconsData = [
        {
            keyId: '/OsmoPocket3',
            image: '/images/NavIcons/Osmo_Pocket_3.png',
            alt: 'Osmo Pocket 3',
            title: 'Osmo Pocket 3',
        },
        {
            keyId: '/ChanMay',
            image: '/images/NavIcons/ChanMay.png',
            alt: 'Chân Máy',
            title: 'Chân Máy',
        },
        {
            keyId: '/FPV',
            image: '/images/NavIcons/FPV.png',
            alt: 'FPV',
            title: 'FPV',
        },
        {
            keyId: '/DJIGoggles',
            image: '/images/NavIcons/DJIGoggles.png',
            alt: 'DJI Goggles',
            title: 'DJI Goggles',
        },
        {
            keyId: '/Flycam',
            image: '/images/NavIcons/Flycam.png',
            alt: 'Flycam',
            title: 'Flycam',
        },
        {
            keyId: '/MicThuAm',
            image: '/images/NavIcons/MicThuAm.png',
            alt: 'Mic Thu Âm',
            title: 'Mic Thu Âm',
        },
        {
            keyId: '/Gimbal',
            image: '/images/NavIcons/Gimbal.png',
            alt: 'Gimbal',
            title: 'Gimbal',
        },
        {
            keyId: '/Camera',
            image: '/images/NavIcons/Camera.png',
            alt: 'Máy ảnh',
            title: 'Máy ảnh',
        },
        {
            keyId: '/GoPro',
            image: '/images/NavIcons/GoPro.png',
            alt: 'Go Pro',
            title: 'Go Pro',
        },
    ]

    return (
        <SectionCommon className="flex flex-wrap justify-center !pb-0">
            {navIconsData.map((navIcon, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                    <img
                        src={navIcon.image}
                        alt={navIcon.alt}
                        className="h-20 w-20"
                    />
                    <span className="text-[16px] font-semibold">
                        {navIcon.title}
                    </span>
                </div>
            ))}
        </SectionCommon>
    )
}

export default NavIcons
