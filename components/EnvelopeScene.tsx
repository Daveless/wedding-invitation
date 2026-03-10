'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

const CP = 51.4 // % from top where fold lines meet

import { capitalizeName } from '@/lib/utils'

export default function EnvelopeScene({ onOpen, guestName }: { onOpen: () => void, guestName?: string }) {
    const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4 | 5>(0)
    const [hint, setHint] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setHint(true), 1800)
        return () => clearTimeout(t)
    }, [])

    const handleClick = () => {
        if (phase !== 0) return
        setPhase(1)
        setTimeout(() => setPhase(2), 900)    // flip done
        setTimeout(() => setPhase(3), 1600)   // flap opens
        setTimeout(() => setPhase(4), 2500)   // paper slides up
        setTimeout(() => { setPhase(5); onOpen() }, 3600)
    }

    const flipped = phase >= 1
    const flapOpen = phase >= 3
    const paperUp = phase >= 4
    const bgFade = phase >= 5

    const backRotateY = flipped ? -180 : 0
    const frontRotateY = flipped ? 0 : 180

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
            transition={{ duration: 1.0, delay: bgFade ? 0 : 0 }}
        >
            <div style={{
                position: 'absolute', width: '60vw', height: '42vh',
                background: 'radial-gradient(ellipse, rgba(195,148,55,0.13) 0%, transparent 75%)',
                top: '25%', left: '20%', pointerEvents: 'none',
            }} />

            {PARTICLES.map(p => (
                <motion.div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        width: p.size, height: p.size,
                        borderRadius: '50%',
                        background: `rgba(220,188,110,${p.opacity})`,
                        left: `${p.x}%`, top: `${p.y}%`,
                        pointerEvents: 'none',
                    }}
                    animate={{ y: [0, -p.rise, 0], opacity: [0, p.opacity, 0] }}
                    transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
                />
            ))}

            <motion.div
                animate={{ y: phase === 0 ? [0, -9, 0] : 0 }}
                transition={{ y: { duration: 3.5, repeat: phase === 0 ? Infinity : 0, ease: 'easeInOut' } }}
                style={{ position: 'relative', width: 'min(92vw, 520px)', perspective: '1400px' }}
            >
                <div style={{ position: 'relative', width: '100%', paddingTop: '66%', transformStyle: 'preserve-3d' }}>

                    {/* ── BACK FACE ── */}
                    <motion.div
                        animate={{ rotateY: backRotateY }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: 'absolute', inset: 0,
                            background: '#f5f0e2',
                            borderRadius: '3px',
                            boxShadow: '0 22px 60px rgba(0,0,0,0.65), 0 6px 20px rgba(0,0,0,0.38)',
                            backfaceVisibility: 'hidden',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        <div style={{
                            position: 'absolute', inset: 0, pointerEvents: 'none',
                            background: 'linear-gradient(to right, rgba(0,0,0,0.02) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.02) 100%)',
                        }} />
                        <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '0 10%' }}>
                            <p style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: 'clamp(0.55rem, 1.5vw, 0.72rem)',
                                letterSpacing: '5px', textTransform: 'uppercase',
                                marginBottom: '0.4rem', color: '#7a6845',
                            }}>Para</p>
                            <p style={{
                                fontFamily: 'var(--font-birthstone)',
                                fontSize: 'clamp(2.5rem, 8vw, 3.8rem)',
                                lineHeight: 1.1, color: '#3d3320',
                                padding: '0 1rem'
                            }}>
                                {guestName ? capitalizeName(guestName) : 'Estimado Invitado'}
                            </p>
                        </div>
                    </motion.div>

                    {/* ── FRONT FACE ── */}
                    <motion.div
                        animate={{ rotateY: frontRotateY }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: 'absolute', inset: 0,
                            background: '#f8f3e3',
                            borderRadius: '3px',
                            boxShadow: '0 22px 60px rgba(0,0,0,0.65), 0 6px 20px rgba(0,0,0,0.38)',
                            backfaceVisibility: 'hidden',
                        }}
                    >
                        {/* ── TOP FLAP ──
                            Moved inside front face so it overlays correctly.
                            Phase < 4: z-index 10 (over everything)
                            Phase >= 4 (paperUp): z-index 1 (so paper is IN FRONT of it)
                        */}
                        {phase >= 2 && (
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    top: '-1px', left: '-1px', right: '-1px',
                                    height: '53%',
                                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                                    background: 'linear-gradient(160deg, #faf6ea 40%, #ece3c4 100%)',
                                    transformOrigin: 'top center',
                                    zIndex: paperUp ? 1 : 10,
                                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))',
                                }}
                                initial={{ rotateX: 0 }}
                                animate={{ rotateX: flapOpen ? -172 : 0 }}
                                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                            />
                        )}

                        {/* ── Letter paper ──
                            Always z-index: 2.
                            When paperUp = true, since top flap becomes z-index: 1, this paper sits ON TOP of the top flap.
                            But it's strictly BEHIND the Triangles (z-index: 5), so it slides out from "inside" the envelope.
                        */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                bottom: 0, left: '8%', right: '8%',
                                background: '#f0ebe0',
                                borderRadius: '2px 2px 0 0',
                                zIndex: 2,
                                overflow: 'hidden',
                            }}
                            initial={{ height: 0 }}
                            animate={paperUp ? { height: '120%' } : {}}
                            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                        >
                            <img
                                src="/portada-invitacion.png"
                                alt="Portada"
                                draggable={false}
                                style={{
                                    width: '100%', height: '100%',
                                    objectFit: 'cover', objectPosition: 'top',
                                    opacity: 0.92, pointerEvents: 'none'
                                }}
                            />
                        </motion.div>

                        {/* ── Triangle flap overlays (Side / Bottom) ──
                            z-index: 5. These NEVER fade out now, and the paper slides behind them. 
                        */}
                        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
                            <div style={{
                                position: 'absolute', inset: 0,
                                clipPath: `polygon(0 0, 0 100%, 50% ${CP}%)`,
                                background: 'linear-gradient(110deg, #ede5cc 0%, #f5f0e3 60%)',
                            }} />
                            <div style={{
                                position: 'absolute', inset: 0,
                                clipPath: `polygon(100% 0, 100% 100%, 50% ${CP}%)`,
                                background: 'linear-gradient(250deg, #e8dfca 0%, #f5f0e3 60%)',
                            }} />
                            <div style={{
                                position: 'absolute', inset: 0,
                                clipPath: `polygon(0 100%, 100% 100%, 50% ${CP}%)`,
                                background: 'linear-gradient(to top, #e0d8be 0%, #f0ead5 50%)',
                            }} />
                        </div>

                        {/* Fold-X lines — z-index 6 so they draw loosely over the triangles */}
                        <svg
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 6 }}
                            viewBox="0 0 320 210" preserveAspectRatio="none"
                        >
                            <line x1="0" y1="0" x2="160" y2="108" stroke="#c8bfa0" strokeWidth="0.8" opacity="0.7" />
                            <line x1="320" y1="0" x2="160" y2="108" stroke="#c8bfa0" strokeWidth="0.8" opacity="0.7" />
                            <line x1="0" y1="210" x2="160" y2="108" stroke="#c8bfa0" strokeWidth="0.8" opacity="0.7" />
                            <line x1="320" y1="210" x2="160" y2="108" stroke="#c8bfa0" strokeWidth="0.8" opacity="0.7" />
                        </svg>

                        {/* ── WAX SEAL ──
                            zIndex: 15 (over top flap when closed). Shrinks and fades when flap opens.
                        */}
                        {phase >= 2 && (
                            <motion.div
                                style={{ position: 'absolute', top: '42%', left: '50%', translate: '-50% -50%', zIndex: 15 }}
                                initial={{ scale: 1, opacity: 1 }}
                                animate={flapOpen
                                    ? { scale: 0.3, opacity: 0, rotate: 20 }
                                    : { scale: 1, opacity: 1, rotate: 0 }
                                }
                                transition={flapOpen
                                    ? { duration: 0.32, ease: [0.6, 0, 1, 0.8] }
                                    : { duration: 0 }
                                }
                            >
                                <svg width="100" height="100" viewBox="0 0 100 100">
                                    <path d="M50 88C50 88 15 62 15 36C15 22 26 12 40 12C46.5 12 50 18 50 18C50 18 53.5 12 60 12C74 12 85 22 85 36C85 62 50 88 50 88Z" fill="#7d1509" />
                                    <path d="M50 84C50 84 19 60 19 36C19 24.5 28.5 16.5 40 16.5C45.5 16.5 50 21.5 50 21.5C50 21.5 54.5 16.5 60 16.5C71.5 16.5 81 24.5 81 36C81 60 50 84 50 84Z" fill="#8f1c0e" />
                                    <path d="M50 78C50 78 24 57 24 36.5C24 27.5 31.5 21.5 40 21.5C44.5 21.5 50 25.5 50 25.5C50 25.5 55.5 21.5 60 21.5C68.5 21.5 76 27.5 76 36.5C76 57 50 78 50 78Z" fill="none" stroke="rgba(240,190,180,0.3)" strokeWidth="1.5" />
                                    <text x="50" y="52" textAnchor="middle" fontFamily="'Meddon', cursive" fontSize="16" fill="#e8bdb5">B &amp; D</text>
                                </svg>
                            </motion.div>
                        )}
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
                            pointerEvents: 'none',
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
