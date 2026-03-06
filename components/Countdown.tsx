'use client'

import { useState, useEffect } from 'react'

const TARGET_DATE = new Date('2025-04-24T14:00:00-05:00')

function TimeBox({ value, label }: { value: number; label: string }) {
    const display = String(value).padStart(2, '0')
    return (
        <div style={{ textAlign: 'center' }}>
            <div
                style={{
                    width: 'clamp(64px, 18vw, 80px)',
                    height: 'clamp(64px, 18vw, 80px)',
                    border: '1.5px solid var(--border)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#fffdf8',
                    boxShadow: '0 2px 8px rgba(184,147,90,0.1)',
                }}
            >
                <span
                    style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
                        fontWeight: 600,
                        color: 'var(--gold)',
                        lineHeight: 1,
                    }}
                >
                    {display}
                </span>
            </div>
            <p
                style={{
                    fontFamily: 'var(--font-lato)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--text-light)',
                    marginTop: '0.5rem',
                }}
            >
                {label}
            </p>
        </div>
    )
}

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    const [mounted, setMounted] = useState(false)
    const [expired, setExpired] = useState(false)

    useEffect(() => {
        setMounted(true)
        const tick = () => {
            const now = new Date()
            const diff = TARGET_DATE.getTime() - now.getTime()
            if (diff <= 0) {
                setExpired(true)
                return
            }
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000),
            })
        }
        tick()
        const interval = setInterval(tick, 1000)
        return () => clearInterval(interval)
    }, [])

    if (!mounted) return null

    return (
        <section className="section" id="countdown" style={{ textAlign: 'center', background: '#fafaf8' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>⏳</div>

            <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '2rem',
                fontWeight: 600,
                color: 'var(--text-dark)',
                marginBottom: '0.4rem',
            }}>
                {expired ? '¡El gran día llegó!' : 'La cuenta regresiva'}
            </h2>
            <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                color: 'var(--text-mid)',
                fontSize: '1.05rem',
                marginBottom: '2.5rem',
            }}>
                Viernes 24 de Abril de 2025, 2:00 PM
            </p>

            {!expired && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 'clamp(0.6rem, 3vw, 1.25rem)',
                }}>
                    <TimeBox value={timeLeft.days} label="días" />
                    <TimeBox value={timeLeft.hours} label="horas" />
                    <TimeBox value={timeLeft.minutes} label="min" />
                    <TimeBox value={timeLeft.seconds} label="seg" />
                </div>
            )}
        </section>
    )
}
