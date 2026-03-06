import TattooPattern from '@/components/TattooPattern'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '2rem', position: 'relative',
        }}>
            <TattooPattern />
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '480px' }}>
                {/* Frame */}
                <div style={{
                    border: '3px solid var(--gold)',
                    padding: '3rem 2rem',
                    position: 'relative',
                    background: 'rgba(10,22,40,0.9)',
                }}>
                    <div style={{ position: 'absolute', inset: '8px', border: '1px solid rgba(201,168,76,0.4)', pointerEvents: 'none' }} />

                    {/* Skull with flower */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <svg width="70" height="80" viewBox="0 0 70 80">
                            <ellipse cx="35" cy="30" rx="24" ry="26" fill="none" stroke="#c9a84c" strokeWidth="2" />
                            <rect x="20" y="50" width="30" height="15" rx="2" fill="none" stroke="#c9a84c" strokeWidth="1.5" />
                            <circle cx="26" cy="28" r="6" fill="rgba(201,168,76,0.2)" stroke="#c9a84c" strokeWidth="1.5" />
                            <circle cx="44" cy="28" r="6" fill="rgba(201,168,76,0.2)" stroke="#c9a84c" strokeWidth="1.5" />
                            <line x1="25" y1="52" x2="25" y2="65" stroke="#c9a84c" strokeWidth="2" />
                            <line x1="35" y1="52" x2="35" y2="65" stroke="#c9a84c" strokeWidth="2" />
                            <line x1="45" y1="52" x2="45" y2="65" stroke="#c9a84c" strokeWidth="2" />
                            {/* Crown of roses */}
                            <circle cx="25" cy="8" r="7" fill="#c0392b" />
                            <circle cx="35" cy="4" r="8" fill="#c0392b" />
                            <circle cx="45" cy="8" r="7" fill="#c0392b" />
                            <circle cx="25" cy="6" r="5" fill="#c9a84c" />
                            <circle cx="35" cy="2" r="6" fill="#c9a84c" />
                            <circle cx="45" cy="6" r="5" fill="#c9a84c" />
                        </svg>
                    </div>

                    <h1 style={{
                        fontFamily: 'var(--font-cinzel)',
                        color: 'var(--gold)',
                        fontSize: 'clamp(1.5rem, 6vw, 2.2rem)',
                        letterSpacing: '0.1em',
                        marginBottom: '1rem',
                    }}>
                        Invitación no encontrada
                    </h1>

                    <p style={{
                        fontFamily: 'var(--font-playfair)',
                        fontStyle: 'italic',
                        color: 'var(--cream)',
                        opacity: 0.75,
                        lineHeight: 1.7,
                        marginBottom: '2rem',
                        fontSize: '0.95rem',
                    }}>
                        Este enlace no corresponde a una invitación válida. Si crees que es un error, comunícate directamente con los novios. 🌹
                    </p>

                    {/* Decorative divider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem' }}>
                        <div style={{ width: '40px', height: '1px', background: 'var(--gold)', opacity: 0.5 }} />
                        <svg width="14" height="14" viewBox="0 0 14 14">
                            <polygon points="7,1 8.5,5 13,5 9.5,8 10.5,13 7,10 3.5,13 4.5,8 1,5 5.5,5" fill="#c9a84c" />
                        </svg>
                        <div style={{ width: '40px', height: '1px', background: 'var(--gold)', opacity: 0.5 }} />
                    </div>

                    <p style={{
                        fontFamily: 'var(--font-lora)',
                        fontStyle: 'italic',
                        color: 'var(--gold)',
                        fontSize: '0.9rem',
                        opacity: 0.8,
                    }}>
                        Brenda & David 💛
                    </p>
                </div>
            </div>
        </div>
    )
}
