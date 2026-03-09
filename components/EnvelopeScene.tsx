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

// Y-coordinate (as % of height) where all 4 fold-lines meet in the front face
const CP = 51.4

export default function EnvelopeScene({ onOpen, guestName }: { onOpen: () => void, guestName?: string }) {
    /**
     * Phase map:
     *  0  idle       → back face visible, guest name, floating
     *  1  flipping   → both faces animating (back→-180, front→0)
     *  2  front      → front face fully visible, seal shown
     *  3  flap-open  → top flap rotates up
     *  4  paper-up   → letter slides out of envelope
     *  5  expand     → fixed fullscreen overlay grows from center
     *  6  done       → onOpen() fired
     */
    const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(0)
    const [hint, setHint] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setHint(true), 1800)
        return () => clearTimeout(t)
    }, [])

    const handleClick = () => {
        if (phase !== 0) return
        setPhase(1)
        setTimeout(() => setPhase(2), 900)    // flip complete → show stable front
        setTimeout(() => setPhase(3), 1600)   // flap opens
        setTimeout(() => setPhase(4), 2500)   // paper slides up
        setTimeout(() => setPhase(5), 3300)   // fullscreen expand
        setTimeout(() => { setPhase(6); onOpen() }, 4500)
    }

    const flipped = phase >= 1  // flip started
    const flapOpen = phase >= 3
    const paperUp = phase >= 4
    const expanding = phase >= 5
    const bgFade = phase >= 5

    /* ── Standard CSS card-flip: each face animates its OWN rotateY ──────────
       Back face  : start=0°  → flipped=-180°   (face away from viewer)
       Front face : start=180° → flipped=0°      (face toward viewer)
       Both have backfaceVisibility:hidden + parent preserve-3d.
       This is the most reliable cross-browser approach.
    ─────────────────────────────────────────────────────────────────────── */
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
            transition={{ duration: 1.2, delay: bgFade ? 0.9 : 0 }}
        >
            {/* Ambient glow */}
            <div style={{
                position: 'absolute', width: '60vw', height: '42vh',
                background: 'radial-gradient(ellipse, rgba(195,148,55,0.13) 0%, transparent 75%)',
                top: '25%', left: '20%', pointerEvents: 'none',
            }} />

            {/* Floating dust particles */}
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

            {/* ══════════════════════════════════════════════════
                FIXED FULLSCREEN OVERLAY (phase 5)
                Expands from envelope-center → fills screen
            ══════════════════════════════════════════════════ */}
            <AnimatePresence>
                {expanding && (
                    <motion.div
                        key="fullscreen"
                        style={{
                            position: 'fixed', inset: 0, zIndex: 500,
                            overflow: 'hidden',
                        }}
                        initial={{ clipPath: 'inset(36% 20% 36% 20% round 4px)' }}
                        animate={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
                        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <img
                            src="/portada-invitacion.png"
                            alt="Portada"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ══════════════════════════════════════════════════
                ENVELOPE CARD FRAME
                No rotation on the frame itself — each face
                carries its own rotateY animation.
                perspective + preserve-3d enable the 3-D flip.
            ══════════════════════════════════════════════════ */}
            <motion.div
                animate={{ y: phase === 0 ? [0, -9, 0] : 0 }}
                transition={{ y: { duration: 3.5, repeat: phase === 0 ? Infinity : 0, ease: 'easeInOut' } }}
                style={{
                    position: 'relative',
                    width: 'min(92vw, 520px)',
                    perspective: '1400px',
                }}
            >
                {/* Aspect-ratio wrapper — preserve-3d so children exist in 3-D space */}
                <div style={{
                    position: 'relative', width: '100%', paddingTop: '66%',
                    transformStyle: 'preserve-3d',
                }}>

                    {/* ─────────────────────────────────────────
                        BACK FACE
                        Phase 0: rotateY=0   → facing viewer
                        After flip: rotateY=-180 → hidden
                    ───────────────────────────────────────── */}
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
                        {/* Back of envelope: ONLY bottom-V seam (no X) */}
                        <svg
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
                            viewBox="0 0 320 210" preserveAspectRatio="none"
                        >
                            <line x1="0" y1="210" x2="160" y2="130" stroke="#c8bfa0" strokeWidth="1" opacity="0.55" />
                            <line x1="320" y1="210" x2="160" y2="130" stroke="#c8bfa0" strokeWidth="1" opacity="0.55" />
                            {/* Horizontal center seam */}
                            <line x1="0" y1="130" x2="320" y2="130" stroke="#c8bfa0" strokeWidth="0.6" opacity="0.25" />
                        </svg>

                        {/* Subtle edge shading */}
                        <div style={{
                            position: 'absolute', inset: 0, pointerEvents: 'none',
                            background: 'linear-gradient(to right, rgba(0,0,0,0.025) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.025) 100%)',
                        }} />

                        {/* Guest name — centred on back face */}
                        <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '0 10%' }}>
                            <p style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: 'clamp(0.55rem, 1.5vw, 0.72rem)',
                                letterSpacing: '5px', textTransform: 'uppercase',
                                marginBottom: '0.4rem', color: '#7a6845',
                            }}>
                                Para
                            </p>
                            <p style={{
                                fontFamily: 'var(--font-birthstone)',
                                fontSize: 'clamp(2rem, 7.5vw, 3.4rem)',
                                lineHeight: 1.1, wordBreak: 'break-word', color: '#3d3320',
                            }}>
                                {guestName || 'Estimado Invitado'}
                            </p>
                        </div>
                    </motion.div>

                    {/* ─────────────────────────────────────────
                        FRONT FACE
                        Phase 0: rotateY=180 → hidden (behind)
                        After flip: rotateY=0 → facing viewer
                    ───────────────────────────────────────── */}
                    <motion.div
                        animate={{ rotateY: frontRotateY }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: 'absolute', inset: 0,
                            background: '#f8f3e3',
                            borderRadius: '3px',
                            boxShadow: '0 22px 60px rgba(0,0,0,0.65), 0 6px 20px rgba(0,0,0,0.38)',
                            backfaceVisibility: 'hidden',
                            overflow: 'hidden',
                        }}
                    >
                        {/* ── Letter paper (z-index 2, BELOW the triangle overlays) ── */}
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
                            animate={paperUp ? { height: '94%' } : {}}
                            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        >
                            <img
                                src="/portada-invitacion.png"
                                alt="Portada"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', opacity: 0.92 }}
                            />
                        </motion.div>

                        {/* ── LEFT flap triangle — over paper (z-index 5) ── */}
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
                            clipPath: `polygon(0 0, 0 100%, 50% ${CP}%)`,
                            background: 'linear-gradient(110deg, #ede5cc 0%, #f5f0e3 60%)',
                        }} />
                        {/* ── RIGHT flap triangle ── */}
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
                            clipPath: `polygon(100% 0, 100% 100%, 50% ${CP}%)`,
                            background: 'linear-gradient(250deg, #e8dfca 0%, #f5f0e3 60%)',
                        }} />
                        {/* ── BOTTOM flap triangle ── */}
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
                            clipPath: `polygon(0 100%, 100% 100%, 50% ${CP}%)`,
                            background: 'linear-gradient(to top, #e0d8be 0%, #f0ead5 50%)',
                        }} />

                        {/* ── Fold-X lines (above triangles) ── */}
                        <svg
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 6 }}
                            viewBox="0 0 320 210" preserveAspectRatio="none"
                        >
                            <line x1="0" y1="0" x2="160" y2="108" stroke="#c8bfa0" strokeWidth="0.8" opacity="0.7" />
                            <line x1="320" y1="0" x2="160" y2="108" stroke="#c8bfa0" strokeWidth="0.8" opacity="0.7" />
                            <line x1="0" y1="210" x2="160" y2="108" stroke="#c8bfa0" strokeWidth="0.8" opacity="0.7" />
                            <line x1="320" y1="210" x2="160" y2="108" stroke="#c8bfa0" strokeWidth="0.8" opacity="0.7" />
                        </svg>
                    </motion.div>

                    {/* ─────────────────────────────────────────
                        TOP FLAP
                        Rendered as a sibling (outside overflow:
                        hidden) and animated via rotateX.
                        We conditionally render it only when the
                        front face is visible (phase ≥ 2) so it
                        doesn't appear on the back.
                    ───────────────────────────────────────── */}
                    {phase >= 2 && (
                        <motion.div
                            style={{
                                position: 'absolute',
                                top: '-1px', left: '-1px', right: '-1px',
                                height: '53%',
                                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                                background: 'linear-gradient(160deg, #faf6ea 40%, #ece3c4 100%)',
                                transformOrigin: 'top center',
                                zIndex: 10,
                                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))',
                            }}
                            initial={{ rotateX: 0 }}
                            animate={{ rotateX: flapOpen ? -172 : 0 }}
                            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        />
                    )}

                    {/* ─────────────────────────────────────────
                        WAX SEAL
                        Only rendered on front face (phase ≥ 2).
                        Disappears when flap opens (phase ≥ 3).
                    ───────────────────────────────────────── */}
                    {phase >= 2 && (
                        <motion.div
                            style={{
                                position: 'absolute',
                                top: '42%', left: '50%',
                                translate: '-50% -50%',
                                zIndex: 15,
                            }}
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={flapOpen
                                ? { scale: 0.3, opacity: 0, rotate: 25 }
                                : { scale: 1, opacity: 1, rotate: 0 }
                            }
                            transition={flapOpen
                                ? { duration: 0.38, ease: [0.6, 0, 1, 0.8] }
                                : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
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
