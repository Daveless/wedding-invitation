'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

import { useTranslation } from 'react-i18next'

interface SongRequestProps {
    guestId: string
    type?: 'dance' | 'dinner'
}

export default function SongRequest({ guestId, type = 'dance' }: SongRequestProps) {
    const { t } = useTranslation()
    const [song, setSong] = useState('')
    const [loading, setLoading] = useState(false)
    const [songs, setSongs] = useState<string[]>([])

    const placeholder = type === 'dance'
        ? t('ejemploBailar')
        : t('ejemploCena')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!song.trim()) return
        setLoading(true)
        const { error } = await supabase.from('song_requests').insert({
            guest_id: guestId,
            song: song.trim()
        })
        if (!error) {
            setSongs(prev => [...prev, song.trim()])
            setSong('')
        }
        setLoading(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                    type="text"
                    value={song}
                    onChange={e => setSong(e.target.value)}
                    placeholder={placeholder}
                    className="field"
                    style={{ flex: 1 }}
                />
                <button
                    type="submit"
                    className="btn-ink"
                    disabled={loading || !song.trim()}
                    style={{ width: 'auto', padding: '0 1.5rem' }}
                >
                    {loading ? '...' : t('agregar')}
                </button>
            </form>

            {songs.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {songs.map((s, i) => (
                        <div key={i} style={{ padding: '0.5rem 0', borderBottom: '1px dashed var(--border-light)' }}>
                            <span className="font-serif" style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>{s}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
