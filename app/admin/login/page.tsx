'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
            background: 'var(--paper)',
            color: 'var(--ink)'
        }}>
            <div style={{
                position: 'relative', zIndex: 1,
                width: '100%', maxWidth: '380px',
            }}>
                <div style={{
                    padding: '2.5rem 2rem',
                    background: 'var(--paper)',
                    border: '1px solid rgba(26,18,8,0.2)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                }}>
                    <hr className="rule-double" style={{ margin: '0 0 1.5rem', opacity: 0.6 }} />

                    <h1 style={{
                        fontFamily: "'Libre Caslon Display', serif",
                        color: 'var(--ink)',
                        fontSize: '1.4rem',
                        textAlign: 'center',
                        letterSpacing: '0.05em',
                        marginBottom: '0.25rem',
                        fontWeight: 600,
                    }}>
                        ADMIN JOURNAL
                    </h1>
                    <p style={{
                        fontFamily: 'var(--font-birthstone)',
                        color: 'var(--ink-mid)',
                        textAlign: 'center', fontSize: '1.6rem', marginBottom: '1.5rem',
                        lineHeight: 1
                    }}>
                        Brenda & David
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{
                                display: 'block',
                                fontFamily: "'Inter', sans-serif", color: 'var(--ink-mid)',
                                fontSize: '0.75rem', letterSpacing: '0.1em',
                                textTransform: 'uppercase', marginBottom: '0.5rem',
                                fontWeight: 600
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
                                style={{
                                    border: '1px solid rgba(26,18,8,0.2)',
                                    background: 'rgba(255,255,255,0.4)',
                                    color: 'var(--ink)',
                                    fontWeight: 500
                                }}
                            />
                        </div>

                        {error && (
                            <p style={{ color: '#990000', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-ink"
                            style={{ width: '100%', padding: '0.8rem 1rem', fontSize: '0.85rem', marginTop: '0.5rem' }}
                            aria-label="Iniciar sesión"
                        >
                            {loading ? 'VERIFICANDO...' : 'ENTRAR AL PANEL'}
                        </button>
                    </form>

                    <hr className="rule-double" style={{ margin: '2rem 0 0', opacity: 0.6 }} />
                </div>
            </div>
        </div>
    )
}
