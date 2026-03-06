'use client'

import { useState } from 'react'

export default function EventDetails() {
    const [open, setOpen] = useState(false)
    const mapsUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ||
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7!2d-78.5!3d-0.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a4002427c9f%3A0x44b991e158ef5572!2sJuan%20Montalvo%2C%20Quito%20170184%2C%20Ecuador!5e0!3m2!1ses!2sec!4v1!5m2!1ses!2sec'

    return (
        <>
            <section className="section" id="event-details" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📍</div>

                <h2 style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: 'var(--text-dark)',
                    marginBottom: '0.4rem',
                }}>
                    El Lugar
                </h2>
                <p style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontStyle: 'italic',
                    color: 'var(--text-mid)',
                    fontSize: '1.05rem',
                    marginBottom: '2.5rem',
                }}>
                    Te esperamos en este lugar especial
                </p>

                {/* Info blocks */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', border: '1.5px solid var(--border)', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.75rem' }}>
                    {[
                        {
                            icon: '📅',
                            label: 'Fecha',
                            value: 'Viernes 24 de Abril de 2025',
                        },
                        {
                            icon: '🕐',
                            label: 'Hora',
                            value: '2:00 PM (hora local de Quito)',
                        },
                        {
                            icon: '🗺️',
                            label: 'Dirección',
                            value: 'Juan Montalvo, Quito 170184, Ecuador',
                        },
                    ].map((item, i, arr) => (
                        <div
                            key={item.label}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1.1rem 1.25rem',
                                background: i % 2 === 0 ? '#fff' : '#fffdf8',
                                borderBottom: i < arr.length - 1 ? '1px solid rgba(184,147,90,0.1)' : 'none',
                                textAlign: 'left',
                            }}
                        >
                            <span style={{ fontSize: '1.6rem', flexShrink: 0, width: '2.2rem', textAlign: 'center' }}>{item.icon}</span>
                            <div>
                                <p style={{
                                    fontFamily: 'var(--font-lato)',
                                    fontSize: '0.65rem',
                                    letterSpacing: '0.18em',
                                    textTransform: 'uppercase',
                                    color: 'var(--gold)',
                                    marginBottom: '0.15rem',
                                }}>
                                    {item.label}
                                </p>
                                <p style={{
                                    fontFamily: 'var(--font-cormorant)',
                                    fontSize: '1.1rem',
                                    color: 'var(--text-dark)',
                                    lineHeight: 1.3,
                                }}>
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="btn-gold"
                    aria-label="Ver ubicación en el mapa"
                >
                    <span>🗺</span> Ver en el mapa
                </button>
            </section>

            {/* ── MODAL ── */}
            {open && (
                <div className="modal-overlay" onClick={() => setOpen(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()}>
                        <div style={{
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1rem 1.25rem',
                            borderBottom: '1px solid rgba(184,147,90,0.15)',
                        }}>
                            <div>
                                <p style={{ fontFamily: 'var(--font-lato)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                                    Juan Montalvo, Quito
                                </p>
                                <p style={{ fontFamily: 'var(--font-lato)', fontSize: '0.75rem', color: 'var(--text-light)' }}>
                                    Ecuador 170184
                                </p>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                aria-label="Cerrar mapa"
                                style={{
                                    background: 'none', border: '1px solid var(--border)',
                                    borderRadius: '50%', width: '32px', height: '32px',
                                    cursor: 'pointer', fontSize: '1rem', color: 'var(--text-mid)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}
                            >
                                ✕
                            </button>
                        </div>
                        <iframe
                            src={mapsUrl}
                            width="100%"
                            height="380"
                            style={{ border: 0, display: 'block', flex: 1 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa del evento"
                        />
                    </div>
                </div>
            )}
        </>
    )
}
