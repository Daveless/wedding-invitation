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

export default function EnvelopeScene({ onOpen }: { onOpen: () => void }) {
    const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0)
    // 0 = idle | 1 = seal breaks | 2 = flap opens | 3 = paper slides | 4 = fade done
    const [hint, setHint] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setHint(true), 1800)
        return () => clearTimeout(t)
    }, [])

    const handleClick = () => {
        if (phase !== 0) return
        setPhase(1)                                         // crack seal
        setTimeout(() => setPhase(2), 500)                  // flap opens
        setTimeout(() => setPhase(3), 1400)                 // paper slides up
        setTimeout(() => { setPhase(4); onOpen() }, 2700)  // fade out → letter mounts
    }

    const sealGone = phase >= 1
    const flapOpen = phase >= 2
    const paperOut = phase >= 3
    const bgFade = phase >= 3

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
                // Gentle float when idle
                animate={phase === 0 ? { y: [0, -9, 0] } : { y: 0 }}
                transition={{ duration: 3.5, repeat: phase === 0 ? Infinity : 0, ease: 'easeInOut' }}
                style={{ position: 'relative', width: 'min(85vw, 430px)', perspective: '1400px' }}
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

                        {/* ── Letter paper (slides up when open) ── */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                bottom: 0, left: '10%', right: '10%',
                                background: '#f0ebe0',
                                borderRadius: '2px 2px 0 0',
                                zIndex: 3,
                            }}
                            initial={{ height: 0 }}
                            animate={paperOut ? { height: '88%' } : {}}
                            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        >
                            {/* Fake content lines inside the letter */}
                            <div style={{ padding: '10% 14%', paddingTop: '12%' }}>
                                {[78, 92, 64, 85, 55, 88, 70, 60].map((w, i) => (
                                    <div key={i} style={{
                                        height: '5px', marginBottom: '9px',
                                        background: 'rgba(26,18,8,0.14)',
                                        borderRadius: '2px', width: `${w}%`,
                                    }} />
                                ))}
                            </div>
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
                        }}
                        animate={sealGone
                            ? { scale: 0.3, opacity: 0, rotate: 25 }
                            : { scale: 1, opacity: 1, rotate: 0 }
                        }
                        transition={{ duration: 0.38, ease: [0.6, 0, 1, 0.8] }}
                    >
                        <svg width="72" height="72" viewBox="0 0 72 72">
                            {/* Outer gear ring */}
                            <circle cx="36" cy="36" r="34" fill="#7d1509" />
                            {/* Sunburst teeth */}
                            {Array.from({ length: 14 }).map((_, i) => {
                                const a = (i / 14) * Math.PI * 2
                                return (
                                    <line key={i}
                                        x1={36 + 27 * Math.cos(a)} y1={36 + 27 * Math.sin(a)}
                                        x2={36 + 33.5 * Math.cos(a)} y2={36 + 33.5 * Math.sin(a)}
                                        stroke="rgba(240,200,190,0.35)" strokeWidth="2"
                                    />
                                )
                            })}
                            <circle cx="36" cy="36" r="24" fill="#8f1c0e" />
                            <circle cx="36" cy="36" r="21" fill="none" stroke="rgba(240,190,180,0.2)" strokeWidth="1.5" />
                            {/* B & D text */}
                            <text x="36" y="40" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fill="#e8bdb5" letterSpacing="1">B &amp; D</text>
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
