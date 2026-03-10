'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { capitalizeName } from '@/lib/utils'

interface EnvelopeAnimationProps {
    guestName: string
    onComplete: () => void
}

export default function EnvelopeAnimation({ guestName, onComplete }: EnvelopeAnimationProps) {
    const [phase, setPhase] = useState<'closed' | 'opening' | 'letter'>('closed')

    const handleOpen = () => {
        setPhase('opening')
        setTimeout(() => setPhase('letter'), 1500)
    }

    return (
        <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{ background: 'rgba(10,22,40,0.98)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <AnimatePresence mode="wait">
                {phase !== 'letter' && (
                    <motion.div
                        key="envelope"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6, y: -50 }}
                        transition={{ duration: 0.7 }}
                        style={{
                            width: 'min(340px, 90vw)',
                            position: 'relative',
                            cursor: phase === 'closed' ? 'pointer' : 'default',
                        }}
                        onClick={phase === 'closed' ? handleOpen : undefined}
                    >
                        {/* Floating icons when opening */}
                        {phase === 'opening' && (
                            <>
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 0, y: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0],
                                            x: (i % 2 === 0 ? 1 : -1) * (30 + i * 15),
                                            y: -80 - i * 20,
                                        }}
                                        transition={{ duration: 1.2, delay: i * 0.1 }}
                                        style={{
                                            position: 'absolute',
                                            top: '20%',
                                            left: '50%',
                                            fontSize: '1.2rem',
                                            pointerEvents: 'none',
                                            zIndex: 10,
                                        }}
                                    >
                                        {['🌹', '⭐', '🕊️', '💛', '🌹', '⭐'][i]}
                                    </motion.div>
                                ))}
                            </>
                        )}

                        {/* Envelope body */}
                        <svg viewBox="0 0 340 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Envelope body */}
                            <rect x="2" y="60" width="336" height="178" rx="4" fill="#0f2040" stroke="#c9a84c" strokeWidth="2.5" />

                            {/* Bottom flap fold lines */}
                            <line x1="2" y1="238" x2="170" y2="150" stroke="#c9a84c" strokeWidth="1" opacity="0.4" />
                            <line x1="338" y1="238" x2="170" y2="150" stroke="#c9a84c" strokeWidth="1" opacity="0.4" />

                            {/* V mark in center */}
                            <circle cx="170" cy="150" r="22" fill="#c0392b" stroke="#c9a84c" strokeWidth="2" />
                            <text x="170" y="155" textAnchor="middle" fontSize="12" fill="#fdf6e3" fontFamily="serif" fontWeight="bold">B&D</text>

                            {/* Corner roses */}
                            <g transform="translate(20,80)">
                                <circle cx="0" cy="0" r="8" fill="#c0392b" />
                                <circle cx="0" cy="-5" r="5" fill="#c9a84c" />
                                <rect x="-1" y="8" width="2" height="8" fill="#1a6b3c" />
                            </g>
                            <g transform="translate(320,80)">
                                <circle cx="0" cy="0" r="8" fill="#c0392b" />
                                <circle cx="0" cy="-5" r="5" fill="#c9a84c" />
                                <rect x="-1" y="8" width="2" height="8" fill="#1a6b3c" />
                            </g>

                            {/* Top flap */}
                            <motion.g
                                animate={phase === 'opening' ? { rotateX: -160 } : { rotateX: 0 }}
                                style={{ transformOrigin: '170px 60px', originY: '60px' }}
                            >
                                <path d="M2,60 L170,145 L338,60Z" fill="#0d1f3c" stroke="#c9a84c" strokeWidth="2" />
                                <path d="M12,60 L170,133 L328,60" fill="none" stroke="#c9a84c" strokeWidth="0.8" opacity="0.3" />
                            </motion.g>

                            {/* Border decoration */}
                            <rect x="2" y="60" width="336" height="178" rx="4" fill="none" stroke="#c9a84c" strokeWidth="2.5" />
                            <rect x="10" y="68" width="320" height="162" rx="2" fill="none" stroke="#c9a84c" strokeWidth="0.8" opacity="0.4" />
                        </svg>

                        {phase === 'closed' && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                style={{
                                    textAlign: 'center',
                                    color: 'var(--gold)',
                                    fontFamily: 'var(--font-lora)',
                                    fontStyle: 'italic',
                                    fontSize: '0.9rem',
                                    marginTop: '1rem',
                                }}
                            >
                                Haz clic para abrir ✨
                            </motion.p>
                        )}
                    </motion.div>
                )}

                {phase === 'letter' && (
                    <motion.div
                        key="letter"
                        initial={{ opacity: 0, y: 60, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        style={{
                            width: 'min(400px, 90vw)',
                            background: 'var(--cream)',
                            color: 'var(--navy)',
                            padding: '2.5rem 2rem',
                            position: 'relative',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        }}
                    >
                        {/* Letter frame */}
                        <div style={{
                            position: 'absolute', inset: '8px',
                            border: '1px solid rgba(10,22,40,0.2)',
                            pointerEvents: 'none',
                        }} />

                        {/* Wax seal decoration */}
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <svg width="50" height="50" viewBox="0 0 50 50">
                                <circle cx="25" cy="25" r="24" fill="#c0392b" stroke="#0a1628" strokeWidth="1.5" />
                                <circle cx="25" cy="25" r="18" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                                <text x="25" y="30" textAnchor="middle" fontSize="10" fill="#fdf6e3" fontFamily="serif" fontWeight="bold">B&D</text>
                            </svg>
                        </div>

                        <p style={{
                            fontFamily: 'var(--font-lora)',
                            fontStyle: 'italic',
                            textAlign: 'center',
                            fontSize: '1rem',
                            color: 'var(--navy)',
                            lineHeight: 1.7,
                            marginBottom: '1.5rem',
                        }}>
                            Con mucha alegría te invitamos a celebrar con nosotros,
                        </p>

                        <h2 style={{
                            fontFamily: 'var(--font-cinzel)',
                            textAlign: 'center',
                            fontSize: 'clamp(1.2rem, 5vw, 1.8rem)',
                            color: '#800000',
                            marginBottom: '1rem',
                            fontWeight: '700',
                        }}>
                            {guestName ? capitalizeName(guestName) : ''}
                        </h2>

                        <p style={{
                            fontFamily: 'var(--font-playfair)',
                            fontStyle: 'italic',
                            textAlign: 'center',
                            fontSize: '1rem',
                            color: 'var(--navy)',
                            marginBottom: '2rem',
                            lineHeight: 1.6,
                        }}>
                            eres parte especial de este día 💛
                        </p>

                        {/* Divider */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #0a1628)' }} />
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <polygon points="10,1 12,7 19,7 13,11 15,18 10,14 5,18 7,11 1,7 8,7" fill="#c9a84c" />
                            </svg>
                            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #0a1628)' }} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <motion.button
                                onClick={onComplete}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '0.75rem 1.75rem',
                                    background: 'var(--navy)',
                                    color: 'var(--gold)',
                                    border: '2px solid var(--gold)',
                                    fontFamily: 'var(--font-cinzel)',
                                    fontSize: '0.8rem',
                                    letterSpacing: '0.12em',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                }}
                                aria-label="Ver invitación completa"
                            >
                                Ver invitación completa →
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
