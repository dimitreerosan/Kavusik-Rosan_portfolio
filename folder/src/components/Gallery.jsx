import React, { useState, useEffect } from 'react'
import studentMentorshipImg from '../Moments & Milestones/WhatsApp Image 2025-07-18 at 11.50.34_3b0c05c9.jpg'
import hackathonImg from '../Moments & Milestones/hackathon_coord.jpg'
import deptMagazineImg from '../Moments & Milestones/dept_magazine.png'
import deptNewsletterImg from '../Moments & Milestones/dept_newsletter.png'
import deptEventImg from '../Moments & Milestones/dept_event_symposium.png'
import workshopImg from '../Moments & Milestones/workshop_img.jpg'
import techTalkImg from '../Moments & Milestones/WhatsApp Image 2025-09-26 at 13.20.59_37ffbb1b.jpg'
import deptPromotionalsImg from '../Moments & Milestones/Screenshot 2026-01-22.png'
import nonTechEventImg from '../Moments & Milestones/non tech.png'
import techEventImg from '../Moments & Milestones/tech event.png'
import deptDevChallengeImg from '../Moments & Milestones/Development Challenge.png'
import AICTEAPF2025 from '../Moments & Milestones/WhatsApp Image 2025-11-30 at 15.42.57_df7d9fe5.jpg'
import YuktiChallenge2025 from '../Moments & Milestones/WhatsApp Image 2025-11-30 at 15.42.54_7db44399.jpg'
import MediaGuild from '../Moments & Milestones/SAVE_20240428_182952.jpg'


export default function Gallery() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const galleryItems = [
        {
            id: 1,
            title: 'AICTE APF 2025',
            category: 'Achievement',
            image:AICTEAPF2025,
            alt: 'Award ceremony moment'
        },
        {
            id: 2,
            title: 'HCL GUVI Ambassador',
            category: 'Leadership',
            image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop',
            alt: 'Campus ambassador event'
        },
        {
            id: 3,
            title: 'Hackathon Event',
            category: 'Event',
            image: hackathonImg,
            alt: 'Hackathon team collaboration'
        },
        {
            id: 4,
            title: 'Technical Workshop',
            category: 'Workshop',
            image: workshopImg,
            alt: 'Workshop presentation'
        },
        {
            id: 5,
            title: 'Department Development',
            category: 'Event',
            image: deptDevChallengeImg,
            alt: 'Team coordination meeting'
        },
        {
            id: 6,
            title: 'Department Magazine',
            category: 'Editorial',
            image: deptMagazineImg,
            alt: 'Department magazine cover'
        },
        {
            id: 7,
            title: 'Yukti Challenge 2025',
            category: 'Achievement',
            image: YuktiChallenge2025,
            alt: 'Innovation challenge recognition'
        },
        {
            id: 8,
            title: 'Department Event',
            category: 'Event',
            image: deptEventImg,
            alt: 'Technical symposium coordination'
        },
        {
            id: 9,
            title: 'Tech Talk',
            category: 'Speaking',
            image: techTalkImg,
            alt: 'Tech talk presentation'
        },
        {
            id: 10,
            title: 'Department Promotionals',
            category: 'Marketing',
            image: deptPromotionalsImg,
            alt: 'Campus promotional activities'
        },
        {
            id: 11,
            title: 'Media Guild',
            category: 'Media',
            image: MediaGuild,
            alt: 'Video editing and production'
        },
        {
            id: 12,
            title: 'Department Newsletter',
            category: 'Editorial',
            image: deptNewsletterImg,
            alt: 'Department newsletter design'
        },
        {
            id: 13,
            title: 'Student Mentorship',
            category: 'Mentoring',
            image: studentMentorshipImg,
            alt: 'Mentoring 200+ students'
        },
        {
            id: 14,
            title: 'Technical Event',
            category: 'Event',
            image:techEventImg,
            alt: 'Technical presentation on privacy'
        },
        {
            id: 15,
            title: 'Non Technical Event',
            category: 'Event',
            image: nonTechEventImg,
            alt: 'Volunteer team coordination'
        }
    ]

    const nextSlide = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrentIndex((prev) => (prev + 1) % galleryItems.length)
        setTimeout(() => setIsAnimating(false), 500)
    }

    const prevSlide = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
        setTimeout(() => setIsAnimating(false), 500)
    }

    const goToSlide = (index) => {
        if (isAnimating || index === currentIndex) return
        setIsAnimating(true)
        setCurrentIndex(index)
        setTimeout(() => setIsAnimating(false), 500)
    }

    // Auto-play (optional - can be removed if not needed)
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        }, 6000) // Change slide every 6 seconds for smoother experience
        return () => clearInterval(interval)
    }, [currentIndex, isAnimating])

    const getSlidePosition = (index) => {
        const diff = index - currentIndex
        const total = galleryItems.length

        // Normalize difference to be between -total/2 and total/2
        let normalizedDiff = diff
        if (diff > total / 2) normalizedDiff = diff - total
        if (diff < -total / 2) normalizedDiff = diff + total

        return normalizedDiff
    }

    return (
        <section className="py-24 px-6 md:px-10 bg-black border-t border-gray-900 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ letterSpacing: '-0.04em' }}>
                        Moments & Milestones
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                        A visual journey through achievements, events, and memorable experiences
                    </p>
                </div>

                {/* 3D Carousel Container */}
                <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
                    {/* Carousel Track */}
                    <div className="relative w-full h-full" style={{ perspective: '2000px' }}>
                        {galleryItems.map((item, index) => {
                            const position = getSlidePosition(index)
                            const isCenter = position === 0
                            const isVisible = Math.abs(position) <= 2

                            if (!isVisible) return null

                            return (
                                <div
                                    key={item.id}
                                    className="absolute top-1/2 left-1/2 cursor-pointer"
                                    style={{
                                        transform: `
                      translate(-50%, -50%)
                      translateX(${position * 280}px)
                      rotateY(${position * -25}deg)
                      scale(${isCenter ? 1 : 0.8})
                      translateZ(${isCenter ? 0 : -200}px)
                    `,
                                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                        willChange: 'transform, opacity',
                                        zIndex: isCenter ? 20 : 10 - Math.abs(position),
                                        opacity: Math.abs(position) > 1 ? 0.4 : 1,
                                        pointerEvents: isCenter ? 'auto' : 'none'
                                    }}
                                    onClick={() => !isCenter && goToSlide(index)}
                                >
                                    {/* Card Frame */}
                                    <div
                                        className="relative bg-white p-3 md:p-4 rounded-lg shadow-2xl"
                                        style={{
                                            width: '320px',
                                            height: '400px',
                                            boxShadow: isCenter
                                                ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.1)'
                                                : '0 10px 30px -5px rgba(0, 0, 0, 0.5)'
                                        }}
                                    >
                                        {/* Image */}
                                        <div className="relative w-full h-[280px] bg-gray-100 rounded-sm overflow-hidden mb-4 border border-gray-100">
                                            <img
                                                src={item.image}
                                                alt={item.alt}
                                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                                loading="lazy"
                                                draggable={false}
                                                onContextMenu={(e) => e.preventDefault()}
                                            />
                                        </div>

                                        {/* Caption */}
                                        <div className="flex flex-col items-start px-2 font-sans">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                {item.category}
                                            </span>
                                            <h3 className="text-black font-extrabold text-xl leading-tight tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                {item.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        disabled={isAnimating}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                        aria-label="Previous slide"
                    >
                        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        disabled={isAnimating}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                        aria-label="Next slide"
                    >
                        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Dot Indicators */}
                <div className="flex items-center justify-center gap-2 mt-12">
                    {galleryItems.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            disabled={isAnimating}
                            className={`transition-all duration-300 rounded-full ${index === currentIndex
                                ? 'w-8 h-2 bg-white'
                                : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
