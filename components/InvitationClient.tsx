'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import EnvelopeScene from './EnvelopeScene'
import NewspaperLetter from './NewspaperLetter'

interface Props {
    guestName: string
    guestId: string
    hasRsvp: boolean
    rsvpAttending: boolean | null
}

export default function InvitationClient({ guestName, guestId, hasRsvp, rsvpAttending }: Props) {
    const [loading, setLoading] = useState(true)
    const [musicModal, setMusicModal] = useState(false)
    const [musicAccepted, setMusicAccepted] = useState<boolean | null>(null)
    const [opened, setOpened] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    // Simulate image loading delay before showing the Music Modal
    useEffect(() => {
        const t = setTimeout(() => {
            setLoading(false)
            setMusicModal(true)
        }, 1800)
        return () => clearTimeout(t)
    }, [])

    useEffect(() => {
        if (musicAccepted && audioRef.current) {
            audioRef.current.volume = 0.5
            audioRef.current.play().catch(e => console.log("Audio play blocked", e))
        }
    }, [musicAccepted])

    const handleMusicChoice = (accept: boolean) => {
        setMusicAccepted(accept)
        setMusicModal(false)
    }

    return (
        <>
            <audio
                ref={audioRef}
                src="/cancion.m4a"
                onTimeUpdate={(e) => {
                    const audio = e.currentTarget;
                    if (audio.duration && audio.currentTime >= audio.duration - 5) {
                        audio.currentTime = 0;
                        audio.play().catch(err => console.log('Loop play blocked', err));
                    }
                }}
            />

            <AnimatePresence mode="wait">
                {loading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 9999,
                            background: '#0d0a04', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            flexDirection: 'column', gap: '1.5rem'
                        }}
                    >
                        <div className="spinner" style={{
                            width: '40px', height: '40px',
                            border: '3px solid rgba(220,188,110,0.2)',
                            borderTopColor: '#c39437', borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }} />
                        <p style={{ fontFamily: 'var(--font-serif)', color: '#c39437', letterSpacing: '3px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                            Cargando...
                        </p>
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </motion.div>
                )}

                {musicModal && !loading && (
                    <motion.div
                        key="music-modal"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 9998,
                            background: '#0d0a04', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            padding: '2rem'
                        }}
                    >
                        <div style={{
                            background: 'var(--parchment)',
                            padding: '2.5rem 2rem',
                            borderRadius: '4px',
                            maxWidth: '400px',
                            textAlign: 'center',
                            border: '1px solid var(--ink)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                        }}>
                            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--ink)' }}>
                                EXPERIENCIA MUSICAL
                            </h3>
                            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', marginBottom: '2rem', color: 'var(--ink)', lineHeight: 1.6 }}>
                                Esta invitación contiene música de fondo para acompañar tu lectura. ¿Deseas activarla?
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexDirection: 'column' }}>
                                <button
                                    onClick={() => handleMusicChoice(true)}
                                    className="btn-ink"
                                    style={{ padding: '0.8rem' }}
                                >
                                    SÍ, CON MÚSICA
                                </button>
                                <button
                                    onClick={() => handleMusicChoice(false)}
                                    style={{
                                        background: 'transparent', border: '1px solid var(--ink)',
                                        color: 'var(--ink)', padding: '0.8rem', cursor: 'pointer',
                                        fontFamily: 'var(--font-sans)', letterSpacing: '2px', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase'
                                    }}
                                >
                                    NO, SILENCIAR
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {!loading && !musicModal && !opened && (
                    <EnvelopeScene key="envelope" onOpen={() => setOpened(true)} guestName={guestName} />
                )}

                {!loading && !musicModal && opened && (
                    <NewspaperLetter
                        key="letter"
                        guestName={guestName}
                        guestId={guestId}
                        hasRsvp={hasRsvp}
                        rsvpAttending={rsvpAttending}
                    />
                )}
            </AnimatePresence>
        </>
    )
}
