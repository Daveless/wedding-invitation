'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Unique key for each particle so React doesn't complain
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.8,
    opacity: Math.random() * 0.45 + 0.1,
    duration: Math.random() * 6 + 5,
    delay: Math.random() * 6,
    rise: Math.random() * 90 + 30,
}))

export default function EnvelopeScene({ onOpen, guestName }: { onOpen: () => void, guestName?: string }) {
    const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4 | 5>(0)
    // 0 = idle (front) | 1 = spin to back | 2 = seal breaks | 3 = flap opens | 4 = paper slides | 5 = fade done
    const [hint, setHint] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setHint(true), 1800)
        return () => clearTimeout(t)
    }, [])

    const handleClick = () => {
        if (phase !== 0) return
        setPhase(1)                                         // spin envelope 180deg
        setTimeout(() => setPhase(2), 1000)                 // crack seal
        setTimeout(() => setPhase(3), 1500)                 // flap opens
        setTimeout(() => setPhase(4), 2400)                 // paper slides up
        setTimeout(() => { setPhase(5); onOpen() }, 3700)   // fade out → letter mounts
    }

    const envelopeFlipped = phase >= 1
    const sealGone = phase >= 2
    const flapOpen = phase >= 3
    const paperOut = phase >= 4
    const bgFade = phase >= 4

    return (
        <motion.div
            onClick={handleClick}
            style={{
                position: 'fixed', inset: 0, zIndex: 200,
                background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #241808 0%, #0d0a04 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: phase === 0 ? 'pointer' : 'default',
                overflow: 'hidden',
            }}
            animate={{ opacity: bgFade ? 0 : 1 }}
            transition={{ duration: 1.1, delay: bgFade ? 0.7 : 0 }}
        >

            {/* ── Ambient glow behind envelope ── */}
            <div style={{
                position: 'absolute', width: '55vw', height: '38vh',
                background: 'radial-gradient(ellipse, rgba(195,148,55,0.13) 0%, transparent 75%)',
                top: '28%', left: '22%', pointerEvents: 'none',
            }} />

            {/* ── Floating dust particles ── */}
            {PARTICLES.map(p => (
                <motion.div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        width: p.size, height: p.size,
                        borderRadius: '50%',
                        background: `rgba(220,188,110,${p.opacity})`,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        pointerEvents: 'none',
                    }}
                    animate={{ y: [0, -p.rise, 0], opacity: [0, p.opacity, 0] }}
                    transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
                />
            ))}

            {/* ── THE ENVELOPE ── */}
            <motion.div
                // Gentle float when idle and perform 3D flip when phase >= 1
                animate={{
                    y: phase === 0 ? [0, -9, 0] : 0,
                    rotateY: envelopeFlipped ? 180 : 0
                }}
                transition={{
                    y: { duration: 3.5, repeat: phase === 0 ? Infinity : 0, ease: 'easeInOut' },
                    rotateY: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
                }}
                style={{ position: 'relative', width: 'min(85vw, 430px)', perspective: '1400px', transformStyle: 'preserve-3d' }}
            >
                {/* Aspect-ratio wrapper */}
                <div style={{ position: 'relative', width: '100%', paddingTop: '66%' }}>

                    {/* ── Envelope body (clip inner letter) ── */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: '#f8f3e3',
                        borderRadius: '3px',
                        boxShadow: '0 22px 60px rgba(0,0,0,0.65), 0 6px 20px rgba(0,0,0,0.38)',
                        overflow: 'hidden',  // clips sliding letter
                    }}>
                        {/* Diagonal fold lines (SVG overlay) */}
                        <svg
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
                            viewBox="0 0 320 210"
                            preserveAspectRatio="none"
                        >
                            <line x1="0" y1="0" x2="160" y2="108" stroke="#cfc5a0" strokeWidth="0.8" />
                            <line x1="320" y1="0" x2="160" y2="108" stroke="#cfc5a0" strokeWidth="0.8" />
                            <line x1="0" y1="210" x2="160" y2="108" stroke="#cfc5a0" strokeWidth="0.8" />
                            <line x1="320" y1="210" x2="160" y2="108" stroke="#cfc5a0" strokeWidth="0.8" />
                        </svg>

                        {/* Subtle shading on triangles */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to right, rgba(0,0,0,0.035) 0%, transparent 28%, transparent 72%, rgba(0,0,0,0.035) 100%)',
                            pointerEvents: 'none',
                        }} />

                        {/* ── Guest Name Text on the BACK of the physical view (which is now the logical back) ── */}
                        {/* We use backface-visibility so we only see it when envelope rotates to face away */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: '#fcf8eb', zIndex: 30,
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)'
                        }}>
                            {guestName && phase < 2 && (
                                <div
                                    style={{
                                        position: 'absolute', top: '35%', left: 0, width: '100%',
                                        textAlign: 'center', zIndex: 35, pointerEvents: 'none',
                                        color: '#5a4f38'
                                    }}
                                >
                                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                        Para
                                    </p>
                                    <p style={{ fontFamily: 'var(--font-birthstone)', fontSize: '3rem', lineHeight: 1 }}>
                                        {guestName}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* ── Letter paper (slides up when open) ── */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                bottom: 0, left: '10%', right: '10%',
                                background: '#f0ebe0',
                                borderRadius: '2px 2px 0 0',
                                zIndex: 3,
                                display: 'flex', flexDirection: 'column'
                            }}
                            initial={{ height: 0 }}
                            animate={paperOut ? { height: '88%' } : {}}
                            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        >
                            <img
                                src="/portada-invitacion.png"
                                alt="Portada"
                                style={{
                                    width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top',
                                    borderRadius: '2px 2px 0 0', opacity: 0.9,
                                }}
                            />
                        </motion.div>
                    </div>

                    {/* ── Top flap (outside overflow:hidden so 3D fold works) ── */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: '-1px', left: '-1px', right: '-1px',
                            height: '53%',
                            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                            background: 'linear-gradient(160deg, #faf6ea 40%, #ece3c4 100%)',
                            transformOrigin: 'top center',
                            transformStyle: 'preserve-3d',
                            zIndex: 10,
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))',
                            backfaceVisibility: 'hidden'
                        }}
                        animate={{ rotateX: flapOpen ? -172 : 0 }}
                        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    />

                    {/* ── Wax seal ── */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: '42%', left: '50%',
                            translate: '-50% -50%',
                            zIndex: 15,
                            backfaceVisibility: 'hidden'
                        }}
                        animate={sealGone
                            ? { scale: 0.3, opacity: 0, rotate: 25 }
                            : { scale: 1, opacity: 1, rotate: 0 }
                        }
                        transition={{ duration: 0.38, ease: [0.6, 0, 1, 0.8] }}
                    >
                        <svg width="100" height="100" viewBox="0 0 100 100">
                            {/* Outer Red Heart Wax */}
                            <path d="M50 88C50 88 15 62 15 36C15 22 26 12 40 12C46.5 12 50 18 50 18C50 18 53.5 12 60 12C74 12 85 22 85 36C85 62 50 88 50 88Z" fill="#7d1509" />
                            <path d="M50 84C50 84 19 60 19 36C19 24.5 28.5 16.5 40 16.5C45.5 16.5 50 21.5 50 21.5C50 21.5 54.5 16.5 60 16.5C71.5 16.5 81 24.5 81 36C81 60 50 84 50 84Z" fill="#8f1c0e" />
                            {/* Inner Stamp Boundary */}
                            <path d="M50 78C50 78 24 57 24 36.5C24 27.5 31.5 21.5 40 21.5C44.5 21.5 50 25.5 50 25.5C50 25.5 55.5 21.5 60 21.5C68.5 21.5 76 27.5 76 36.5C76 57 50 78 50 78Z" fill="none" stroke="rgba(240,190,180,0.3)" strokeWidth="1.5" />
                            {/* B & D text */}
                            <text x="50" y="52" textAnchor="middle" fontFamily="'Meddon', cursive" fontSize="16" fill="#e8bdb5">B &amp; D</text>
                        </svg>
                    </motion.div>

                </div>
            </motion.div>

            {/* ── "Toca para abrir" hint ── */}
            <AnimatePresence>
                {hint && phase === 0 && (
                    <motion.p
                        style={{
                            position: 'absolute', bottom: '14%',
                            width: '100%', textAlign: 'center',
                            fontFamily: 'var(--font-sans)', fontSize: '0.7rem',
                            letterSpacing: '4px', textTransform: 'uppercase',
                            color: 'rgba(220,188,110,0.65)',
                        }}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: [0.4, 0.8, 0.4], y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2.8, repeat: Infinity, y: { duration: 0.6 } }}
                    >
                        Toca para abrir
                    </motion.p>
                )}
            </AnimatePresence>

        </motion.div>
    )
}
