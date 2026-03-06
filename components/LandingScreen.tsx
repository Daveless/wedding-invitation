'use client'

import { motion } from 'framer-motion'

interface LandingScreenProps {
    onOpen: () => void
}

export default function LandingScreen({ onOpen }: LandingScreenProps) {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'var(--navy)' }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
        >
            {/* Outer decorative frame */}
            <div className="relative w-full max-w-md mx-4">
                {/* Main frame */}
                <div
                    style={{
                        border: '3px solid var(--gold)',
                        padding: '2.5rem 2rem',
                        position: 'relative',
                        background: 'rgba(10,22,40,0.95)',
                    }}
                >
                    {/* Inner frame line */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: '8px',
                            border: '1px solid var(--gold)',
                            opacity: 0.5,
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Corner decorations */}
                    <CornerStar pos="top-left" />
                    <CornerStar pos="top-right" />
                    <CornerStar pos="bottom-left" />
                    <CornerStar pos="bottom-right" />

                    {/* Swallow top */}
                    <div className="flex justify-center mb-3">
                        <SwallowSVG />
                    </div>

                    {/* "Tienes una invitación" */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        style={{
                            fontFamily: 'var(--font-lora)',
                            fontStyle: 'italic',
                            color: 'var(--cream)',
                            textAlign: 'center',
                            fontSize: '1rem',
                            letterSpacing: '0.08em',
                            marginBottom: '1rem',
                        }}
                    >
                        Tienes una invitación
                    </motion.p>

                    {/* Divider with roses */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '0.75rem' }}>
                        <RoseSVG />
                        <div style={{ height: '1px', width: '40px', background: 'var(--gold)' }} />
                        <RoseSVG mirror />
                    </div>

                    {/* Names */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                        style={{
                            fontFamily: 'var(--font-cinzel)',
                            color: 'var(--gold)',
                            textAlign: 'center',
                            fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
                            fontWeight: '900',
                            letterSpacing: '0.05em',
                            lineHeight: 1.1,
                            marginBottom: '0.5rem',
                            textShadow: '0 0 20px rgba(201,168,76,0.4)',
                        }}
                    >
                        Brenda & David
                    </motion.h1>

                    {/* "se casan" */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        style={{
                            fontFamily: 'var(--font-playfair)',
                            fontStyle: 'italic',
                            color: 'var(--cream)',
                            textAlign: 'center',
                            fontSize: '1.5rem',
                            marginBottom: '1.5rem',
                        }}
                    >
                        se casan
                    </motion.p>

                    {/* Horseshoe bottom decoration */}
                    <div className="flex justify-center mb-6">
                        <HorseshoeSVG />
                    </div>

                    {/* Open button */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="flex justify-center"
                    >
                        <motion.button
                            onClick={onOpen}
                            className="btn-vintage"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Abrir invitación"
                        >
                            Abrir invitación 💌
                        </motion.button>
                    </motion.div>
                </div>

                {/* Flash tattoo border decorations */}
                <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--navy)',
                    padding: '0 1rem',
                }}>
                    <svg width="60" height="24" viewBox="0 0 60 24">
                        <polygon points="30,2 36,10 30,18 24,10" fill="none" stroke="#c9a84c" strokeWidth="1.5" />
                        <polygon points="30,6 33,10 30,14 27,10" fill="#c9a84c" />
                    </svg>
                </div>
            </div>
        </motion.div>
    )
}

function CornerStar({ pos }: { pos: string }) {
    const styles: Record<string, React.CSSProperties> = {
        'top-left': { top: '12px', left: '12px' },
        'top-right': { top: '12px', right: '12px' },
        'bottom-left': { bottom: '12px', left: '12px' },
        'bottom-right': { bottom: '12px', right: '12px' },
    }
    return (
        <svg
            width="16" height="16" viewBox="0 0 16 16"
            style={{ position: 'absolute', ...styles[pos] }}
        >
            <polygon points="8,1 9.5,6 15,6 10.5,9.5 12,15 8,11.5 4,15 5.5,9.5 1,6 6.5,6" fill="#c9a84c" />
        </svg>
    )
}

function RoseSVG({ mirror }: { mirror?: boolean }) {
    return (
        <svg width="28" height="32" viewBox="0 0 28 32" style={{ transform: mirror ? 'scaleX(-1)' : 'none' }}>
            <circle cx="14" cy="10" r="5" fill="#c9a84c" />
            <circle cx="18" cy="13" r="4" fill="#c9a84c" />
            <circle cx="10" cy="13" r="4" fill="#c9a84c" />
            <circle cx="14" cy="16" r="6" fill="#c0392b" />
            <circle cx="14" cy="14" r="4" fill="#c9a84c" />
            <rect x="13" y="22" width="2" height="8" fill="#1a6b3c" />
            <path d="M13,26 Q8,24 10,22" fill="#1a6b3c" />
        </svg>
    )
}

function SwallowSVG() {
    return (
        <svg width="60" height="30" viewBox="0 0 60 30">
            <path d="M30,15 Q20,5 8,10 Q16,15 30,20 Q44,15 52,10 Q40,5 30,15Z" fill="#c9a84c" />
            <circle cx="30" cy="15" r="2" fill="#0a1628" />
        </svg>
    )
}

function HorseshoeSVG() {
    return (
        <svg width="40" height="36" viewBox="0 0 40 36">
            <path d="M8,30 Q4,18 4,12 Q4,2 20,2 Q36,2 36,12 Q36,18 32,30" fill="none" stroke="#c9a84c" strokeWidth="3" strokeLinecap="round" />
            <line x1="8" y1="30" x2="8" y2="36" stroke="#c9a84c" strokeWidth="3" />
            <line x1="32" y1="30" x2="32" y2="36" stroke="#c9a84c" strokeWidth="3" />
        </svg>
    )
}
