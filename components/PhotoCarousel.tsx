'use client'

import { useState, useEffect, useRef } from 'react'

const PHOTOS = [
    { id: 1, src: null, alt: 'Foto 1' },
    { id: 2, src: null, alt: 'Foto 2' },
    { id: 3, src: null, alt: 'Foto 3' },
    { id: 4, src: null, alt: 'Foto 4' },
    { id: 5, src: null, alt: 'Foto 5' },
]

const AUTOPLAY_MS = 4000

export default function PhotoCarousel() {
    const [current, setCurrent] = useState(0)
    const touchStartX = useRef<number | null>(null)

    // Auto-play
    useEffect(() => {
        const id = setInterval(() => {
            setCurrent(c => (c + 1) % PHOTOS.length)
        }, AUTOPLAY_MS)
        return () => clearInterval(id)
    }, [])

    const prev = () => setCurrent(c => (c - 1 + PHOTOS.length) % PHOTOS.length)
    const next = () => setCurrent(c => (c + 1) % PHOTOS.length)

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return
        const diff = touchStartX.current - e.changedTouches[0].clientX
        if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
        touchStartX.current = null
    }

    return (
        <section id="photos" style={{ padding: 0, position: 'relative' }}>
            {/* Photo area */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '4/3',
                    background: '#000',
                    overflow: 'hidden',
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Placeholder content */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.25)',
                }}>
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                        <rect x="2" y="8" width="48" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
                        <circle cx="17" cy="22" r="5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M2 34 L16 22 L28 32 L38 24 L50 34" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', fontFamily: 'var(--font-lato)', fontStyle: 'italic' }}>
                        Foto {current + 1} — Próximamente
                    </p>
                </div>

                {/* Gradient overlay bottom */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                    pointerEvents: 'none',
                }} />

                {/* Arrow buttons */}
                <button
                    onClick={prev}
                    aria-label="Foto anterior"
                    style={{
                        position: 'absolute', left: '12px', top: '50%',
                        transform: 'translateY(-50%)',
                        width: '36px', height: '36px',
                        border: 'none', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)',
                        color: '#fff', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1rem', transition: 'background 0.2s',
                    }}
                >
                    ‹
                </button>
                <button
                    onClick={next}
                    aria-label="Siguiente foto"
                    style={{
                        position: 'absolute', right: '12px', top: '50%',
                        transform: 'translateY(-50%)',
                        width: '36px', height: '36px',
                        border: 'none', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)',
                        color: '#fff', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1rem', transition: 'background 0.2s',
                    }}
                >
                    ›
                </button>

                {/* Dots */}
                <div style={{
                    position: 'absolute', bottom: '12px', left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex', gap: '6px',
                }}>
                    {PHOTOS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            aria-label={`Ir a foto ${i + 1}`}
                            style={{
                                width: i === current ? '18px' : '6px',
                                height: '6px',
                                borderRadius: '3px',
                                border: 'none',
                                background: i === current ? '#fff' : 'rgba(255,255,255,0.4)',
                                cursor: 'pointer',
                                padding: 0,
                                transition: 'all 0.3s ease',
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
