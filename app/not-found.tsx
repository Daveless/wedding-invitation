import Link from 'next/link'

export default function NotFound() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '2rem',
            background: 'var(--parchment)',
            backgroundImage: 'url(/mi-pergamino.jpg)',
            backgroundSize: 'cover',
            backgroundBlendMode: 'multiply',
        }}>
            <div style={{ maxWidth: '480px', width: '100%' }}>
                {/* Vintage Newspaper Frame */}
                <div style={{
                    border: '1px solid var(--ink)',
                    padding: '3px',
                    backgroundColor: 'rgba(255,255,255,0.4)',
                }}>
                    <div style={{
                        border: '2px solid var(--ink)',
                        padding: '3rem 2rem',
                        position: 'relative',
                    }}>
                        {/* Decorative corners */}
                        {[
                            { top: -2, left: -2 }, { top: -2, right: -2 },
                            { bottom: -2, left: -2 }, { bottom: -2, right: -2 }
                        ].map((pos, i) => (
                            <div key={i} style={{
                                position: 'absolute', ...pos,
                                width: '12px', height: '12px',
                                border: '2px solid var(--ink)',
                                background: 'var(--parchment)'
                            }} />
                        ))}

                        {/* Top flourish */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', opacity: 0.6 }}>
                            <span style={{ fontSize: '1.8rem', fontFamily: 'Georgia', color: 'var(--ink)' }}>❦</span>
                        </div>

                        {/* Title */}
                        <h1 className="masthead" style={{
                            color: 'var(--ink)',
                            fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
                            lineHeight: 0.9,
                            marginBottom: '1rem',
                            marginTop: '10rem',
                        }}>
                            Edición<br />Extraviada
                        </h1>

                        {/* Subtitle / text */}
                        <p style={{
                            fontFamily: "'Libre Caslon Display', serif",
                            color: 'var(--ink-mid)',
                            fontSize: '1.1rem',
                            marginBottom: '2rem',
                        }}>
                            Página no encontrada
                        </p>

                        <p className="sans" style={{
                            color: 'var(--ink)',
                            lineHeight: 1.7,
                            marginBottom: '2.5rem',
                            fontSize: '0.85rem',
                            textAlign: 'justify',
                        }}>
                            Parece que este enlace no corresponde a una invitación válida en nuestros registros.
                            Si crees que se trata de un error de imprenta, por favor comunícate directamente con los novios.
                        </p>

                        {/* Divider */}
                        <hr className="rule" style={{ marginBottom: '2rem' }} />

                        {/* Signature */}
                        <p className="birthstone" style={{
                            color: 'var(--ink)',
                            fontSize: '3rem',
                            lineHeight: 1,
                        }}>
                            Brenda &amp; David
                        </p>
                        <p className="sans" style={{
                            fontSize: '0.6rem',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            color: 'var(--ink-light)',
                            marginTop: '0.5rem',
                        }}>
                            24 · 04 · 2026
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
