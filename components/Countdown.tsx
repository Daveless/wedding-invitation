'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const TARGET_DATE = new Date('2026-04-24T14:00:00-05:00')

function TimeBox({ value, label }: { value: number; label: string }) {
    const display = String(value).padStart(2, '0')
    return (
        <div style={{ textAlign: 'center', flex: 1 }}>
            <div
                style={{
                    width: '100%',
                    padding: '0.8rem 0',
                    border: '1px solid var(--ink)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.4)',
                }}
            >
                <span
                    className="masthead"
                    style={{
                        fontSize: 'clamp(2rem, 6vw, 2.8rem)',
                        color: 'var(--ink)',
                        lineHeight: 1,
                    }}
                >
                    {display}
                </span>
            </div>
            <p
                className="sans"
                style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-mid)',
                    marginTop: '0.4rem',
                    fontWeight: 600,
                }}
            >
                {label}
            </p>
        </div>
    )
}

export default function Countdown() {
    const { t } = useTranslation()
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
        <div style={{ margin: '2rem 0', padding: '1.5rem', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.2)' }}>
            <p className="section-label" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                {expired ? t('elGranDia') : t('faltan')}
            </p>

            {!expired && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.8rem',
                    maxWidth: '400px',
                    margin: '0 auto',
                }}>
                    <TimeBox value={timeLeft.days} label={t('dias')} />
                    <TimeBox value={timeLeft.hours} label={t('horas')} />
                    <TimeBox value={timeLeft.minutes} label={t('minutos')} />
                    <TimeBox value={timeLeft.seconds} label={t('segundos')} />
                </div>
            )}
        </div>
    )
}
