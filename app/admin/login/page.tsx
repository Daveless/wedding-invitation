'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TattooPattern from '@/components/TattooPattern'

export default function AdminLoginPage() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        })

        if (res.ok) {
            router.push('/admin')
        } else {
            setError('Contraseña incorrecta')
        }
        setLoading(false)
    }

    return (
        <div style={{
            minHeight: '100vh', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            padding: '2rem', position: 'relative',
        }}>
            <TattooPattern />
            <div style={{
                position: 'relative', zIndex: 1,
                width: '100%', maxWidth: '380px',
            }}>
                <div style={{
                    border: '2px solid var(--gold)',
                    padding: '2.5rem 2rem',
                    background: 'rgba(10,22,40,0.95)',
                }}>
                    <div style={{ position: 'absolute', inset: '8px', border: '1px solid rgba(201,168,76,0.3)', pointerEvents: 'none' }} />

                    <h1 style={{
                        fontFamily: 'var(--font-cinzel)',
                        color: 'var(--gold)',
                        fontSize: '1.3rem',
                        textAlign: 'center',
                        letterSpacing: '0.1em',
                        marginBottom: '0.5rem',
                    }}>
                        Panel Admin
                    </h1>
                    <p style={{
                        fontFamily: 'var(--font-lora)', fontStyle: 'italic',
                        color: 'var(--cream)', opacity: 0.6,
                        textAlign: 'center', fontSize: '0.85rem', marginBottom: '2rem',
                    }}>
                        Brenda & David — Invitaciones
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{
                                display: 'block',
                                fontFamily: 'var(--font-lora)', color: 'var(--gold)',
                                fontSize: '0.75rem', letterSpacing: '0.1em',
                                textTransform: 'uppercase', marginBottom: '0.5rem',
                            }}>
                                Contraseña
                            </label>
                            <input
                                type="password"
                                className="input-vintage"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                aria-label="Contraseña de administrador"
                                required
                            />
                        </div>

                        {error && (
                            <p style={{ color: 'var(--red)', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'var(--font-lora)' }}>
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-vintage"
                            style={{ width: '100%' }}
                            aria-label="Iniciar sesión"
                        >
                            {loading ? 'Verificando...' : 'Entrar'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
