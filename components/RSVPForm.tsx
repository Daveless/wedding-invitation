'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

import { useTranslation } from 'react-i18next'

export default function RSVPForm({ guestId, initialRsvp }: any) {
    const { t } = useTranslation()
    const [attending, setAttending] = useState<boolean | null>(null)
    const [comments, setComments] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(initialRsvp !== null)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (attending === null) return setError(t('rsvpError'))
        setLoading(true); setError('')
        const { error: err } = await supabase.from('rsvp').insert({ guest_id: guestId, attending, comments })
        if (err) { setError(t('errorGuardar')); setLoading(false); return }
        setSubmitted(true); setLoading(false)
    }

    if (submitted) {
        return (
            <div style={{ textAlign: 'center', padding: '1rem' }}>
                <h4 className="font-serif" style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                    {t('respuestaGuardada')}
                </h4>
                <p className="font-sans" style={{ fontSize: '0.9rem' }}>
                    {(attending === false || initialRsvp === false) ? t('lamentamosNoAcompane') : t('graciasConfirmar')}
                </p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', border: '1px solid var(--border)', padding: '0.85rem', background: attending === true ? 'var(--ink)' : 'rgba(255,255,255,0.45)', color: attending === true ? '#fff' : 'inherit', borderRadius: '2px', boxShadow: attending === true ? 'none' : 'inset 0 2px 4px rgba(0,0,0,0.02)' }}>
                    <input type="radio" checked={attending === true} onChange={() => setAttending(true)} style={{ display: 'none' }} />
                    <span className="font-sans" style={{ fontSize: '0.85rem', fontWeight: 600, margin: '0 auto', letterSpacing: '1px', textTransform: 'uppercase' }}>{t('siAsistire')}</span>
                </label>
                <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', border: '1px solid var(--border)', padding: '0.85rem', background: attending === false ? 'var(--ink)' : 'rgba(255,255,255,0.45)', color: attending === false ? '#fff' : 'inherit', borderRadius: '2px', boxShadow: attending === false ? 'none' : 'inset 0 2px 4px rgba(0,0,0,0.02)' }}>
                    <input type="radio" checked={attending === false} onChange={() => setAttending(false)} style={{ display: 'none' }} />
                    <span className="font-sans" style={{ fontSize: '0.85rem', fontWeight: 600, margin: '0 auto', letterSpacing: '1px', textTransform: 'uppercase' }}>{t('noPodre')}</span>
                </label>
            </div>

            <textarea
                className="field"
                placeholder={t('comentarioOpcional')}
                value={comments}
                onChange={e => setComments(e.target.value)}
                rows={2}
                style={{ resize: 'vertical' }}
            />

            {error && <p style={{ color: 'var(--red-seal)', fontSize: '0.8rem', textAlign: 'center' }}>{error}</p>}

            <button
                type="submit"
                className="btn-ink"
                disabled={loading}
            >
                {loading ? '...' : t('enviarConfirmacion')}
            </button>
        </form>
    )
}
