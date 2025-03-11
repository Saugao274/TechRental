'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/libs/utils'

interface CarouselProps {
    items: {
        id: number | string
        title?: string
        image: string
        alt?: string
    }[]
    autoPlay?: boolean
    autoPlayInterval?: number
    showDots?: boolean
    showArrows?: boolean
    className?: string
    dotType?: 'circle' | 'line'
    cornerRadius?: number
}

export function Carousel({
    items,
    autoPlay = true,
    autoPlayInterval = 5000,
    showDots = true,
    showArrows = false,
    className,
    dotType = 'circle',
    cornerRadius = 0,
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovering, setIsHovering] = useState(false)
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
    const totalItems = items.length

    // Go to next slide
    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === totalItems - 1 ? 0 : prevIndex + 1,
        )
    }, [totalItems])

    // Go to previous slide
    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? totalItems - 1 : prevIndex - 1,
        )
    }, [totalItems])

    // Go to specific slide
    const goToSlide = useCallback((index: number) => {
        setCurrentIndex(index)
    }, [])

    // Handle autoplay
    useEffect(() => {
        if (autoPlay && !isHovering) {
            autoPlayRef.current = setInterval(() => {
                nextSlide()
            }, autoPlayInterval)
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current)
            }
        }
    }, [autoPlay, autoPlayInterval, isHovering, nextSlide])

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                prevSlide()
            } else if (e.key === 'ArrowRight') {
                nextSlide()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [nextSlide, prevSlide])

    // Apply corner radius based on prop
    const borderRadiusStyle = cornerRadius
        ? { borderRadius: `${cornerRadius}px` }
        : {}

    return (
        <div
            className={cn(
                'relative w-full overflow-hidden',
                className,
                `rounded-[${cornerRadius}px]`,
            )}
            style={borderRadiusStyle}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            aria-roledescription="carousel"
        >
            <div
                className="flex h-full w-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className="relative w-full flex-shrink-0"
                        style={{ aspectRatio: '16/9' }}
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${totalItems}`}
                    >
                        <Image
                            src={item.image || '/placeholder.svg'}
                            alt={item.alt || item.title || `Slide ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {showArrows && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-50 transition-opacity hover:bg-white hover:opacity-100 focus:opacity-100"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-50 transition-opacity hover:bg-white hover:opacity-100 focus:opacity-100"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </>
            )}

            {/* Indicator Dots */}
            {showDots && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={cn(
                                'transition-all',
                                currentIndex === index
                                    ? 'scale-110 bg-white'
                                    : 'bg-white/50 hover:bg-white/80',
                                dotType === 'circle'
                                    ? 'h-2.5 w-2.5 rounded-full'
                                    : 'h-1 w-6 rounded-sm',
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={
                                currentIndex === index ? 'true' : 'false'
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
