'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import RSVPForm from './RSVPForm'
import SongRequest from './SongRequest'
import Countdown from './Countdown'
import { useTranslation } from 'react-i18next'

interface Props {
    guestName: string
    guestId: string
    hasRsvp: boolean
    rsvpAttending: boolean | null
}

// Fade-in-up on scroll
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, ease: 'easeOut', delay }}
        >
            {children}
        </motion.div>
    )
}

export default function NewspaperLetter({ guestName, guestId, hasRsvp, rsvpAttending }: Props) {
    const { t, i18n } = useTranslation()
    const [showGifts, setShowGifts] = useState(false)
    const [showPaypal, setShowPaypal] = useState(false)
    const [showBank, setShowBank] = useState(false)
    const [needsTransport, setNeedsTransport] = useState(false)
    const [transportSaved, setTransportSaved] = useState(false)

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')
    }

    return (
        <motion.div
            className="letter-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
        >
            {/* ─────────────────────────────────────────
                HERO FULL-SCREEN IMAGE
            ───────────────────────────────────────── */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                marginBottom: 0,
            }}>
                <img
                    src="/CELEBRACION.jpg"
                    alt="David y Brenda"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                    }}
                />
                {/* Dark gradient overlay at bottom */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 40%, rgba(10,8,4,0.82) 100%)',
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '2.5rem',
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    padding: '0 1.5rem',
                }}>
                    <p style={{
                        fontFamily: 'var(--font-birthstone)',
                        color: '#fff',
                        fontSize: 'clamp(3.5rem, 14vw, 6rem)',
                        lineHeight: 1,
                        textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                        letterSpacing: '0.03em',
                    }}>
                        David y Brenda
                    </p>
                    <p style={{
                        fontFamily: "'Libre Caslon Display', serif",
                        fontSize: 'clamp(1.1rem, 3.5vw, 1.6rem)',
                        color: '#fff',
                        letterSpacing: '0.4em',
                        marginTop: '0.5rem',
                        fontWeight: 600,
                        marginLeft: '1.5rem'
                    }}>
                        {t('teInvitan')}
                    </p>
                </div>
            </div>

            {/* Language Toggle Button */}
            <button
                onClick={toggleLanguage}
                style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    color: '#fff',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '2px',
                    cursor: 'pointer',
                    zIndex: 50,
                    transition: 'background 0.3s'
                }}
            >
                {t(i18n.language === 'es' ? 'langEN' : 'langES')}
            </button>

            {/* Inner content padding */}
            <div style={{ padding: '3rem 2.25rem 4rem', position: 'relative' }}>

                {/*─────────────────────────────────────────
                TOP DECORATIVE ROW
                ───────────────────────────────────────── */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    {/* Left corner flourish */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', opacity: 0.55, lineHeight: 1 }}>
                        <img src="/adorno-esquina.png" alt="" style={{ width: '400px', height: 'auto', position: 'absolute' }} />
                    </div>

                    {/* Right: "Guarda la fecha" box */}
                    <div style={{ flexShrink: 0, marginLeft: '1rem' }}>
                        <img src="/guarda-la-fecha.png" alt="Guarda la fecha" style={{ width: '140px', height: 'auto' }} />
                    </div>
                </div>

                {/*─────────────────────────────────────────
                GOTHIC HERO TITLE  "Nos vemos el 24 de Abril"
                ───────────────────────────────────────── */}
                <Reveal>
                    <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', position: 'relative' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.5rem', flex: 1 }}>
                            <h1 className="masthead" style={{ fontSize: 'clamp(3.5rem, 13vw, 8rem)', lineHeight: 0.9, color: 'var(--ink)', width: '100%' }}>
                                {t('nosVemos')}
                            </h1>
                            <h1 className="masthead" style={{ fontSize: 'clamp(3.5rem, 13vw, 7rem)', lineHeight: 0.9, color: 'var(--ink)', width: '100%' }}>
                                {t('el24deAbril')}
                            </h1>
                        </div>
                        <img src="/adorno-planta.png" alt="" style={{ width: '45px', height: 'auto', position: 'absolute', right: '0', bottom: '0', transform: 'translateX(30%)' }} />
                    </div>
                </Reveal>

                <Reveal>
                    <Countdown />
                </Reveal>

                <hr className="rule" />

                {/*─────────────────────────────────────────
                EXCLUSIVA + INTRO PARAGRAPH
                ───────────────────────────────────────── */}
                <Reveal>
                    {/* EXCLUSIVA: horizonal — wide black block | paragraph */}
                    <div style={{
                        display: 'flex',
                        gap: 0,
                        alignItems: 'stretch',
                        textAlign: 'justify',
                        marginBottom: '1.25rem',
                    }}>
                        {/* Left: wide black label block */}
                        <div style={{
                            background: 'var(--ink)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0rem 0.6rem',
                            flexShrink: 0,
                            width: '170px',
                        }}>
                            <span className="sans" style={{
                                color: 'var(--parchment)',
                                fontSize: '0.58rem',
                                fontWeight: 700,
                                letterSpacing: '3px',
                                textTransform: 'uppercase',
                                whiteSpace: 'nowrap',
                            }}>{t('exclusiva')}</span>
                        </div>
                        {/* Right: paragraph */}
                        <p style={{
                            flex: 1,
                            padding: '0rem 1rem',
                            textAlign: 'justify',
                            fontSize: '0.86rem',
                            lineHeight: 1.65,
                        }}>
                            {t('exclusivaTexto')}
                        </p>
                    </div>
                </Reveal>

                {/* Full-width square photo after Exclusiva */}
                <Reveal>
                    <div style={{ width: '100%', marginBottom: '1.5rem', overflow: 'hidden', background: 'rgba(26,18,8,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(26,18,8,0.18)' }}>
                        <img src="/portada.jpg" alt="Portada exclusvia" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                </Reveal>

                <hr className="rule" />

                {/*─────────────────────────────────────────
                TE INVITAMOS — newspaper column-wrap layout
                Text fills left ~75%, image in right, text continues
                ───────────────────────────────────────── */}
                <Reveal>
                    <h2 className="sans" style={{
                        textAlign: 'center',
                        fontSize: 'clamp(1rem, 3.5vw, 1.4rem)',
                        letterSpacing: '5px',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        marginBottom: '1.25rem',
                    }}>
                        {t('teInvitamos')}
                    </h2>
                    {/*
                      Newspaper wrap: float the image to the right so text
                      flows around it — starts full-width left, then right
                      side gets occupied by the image, remaining text wraps
                      beneath it on the right.
                    */}
                    <div style={{ marginBottom: '1.25rem', overflow: 'hidden' }}>
                        {/* Floated right: gif/image block */}
                        <div style={{
                            float: 'right',
                            width: '45%',
                            marginLeft: '1.25rem',
                            marginBottom: '0.5rem',
                        }}>
                            <video
                                src="/gif-boda.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{
                                    width: '100%',
                                    aspectRatio: '1',
                                    objectFit: 'cover',
                                    border: '1px dashed rgba(26,18,8,0.3)',
                                    display: 'block'
                                }}
                            />
                        </div>
                        {/* All text flows naturally around the float */}
                        <p style={{ marginBottom: '0.7rem' }}>{t('historia1')}</p>
                        <p style={{ marginBottom: '0.7rem' }}>{t('historia2')}</p>
                        <p style={{ marginBottom: '0.7rem' }}>{t('historia3')}</p>
                        <p style={{ marginBottom: '0.7rem' }}>{t('historia4')}</p>
                        <p>{t('historia5')}</p>
                    </div>
                </Reveal>

                <hr className="rule-double" />

                {/*─────────────────────────────────────────
                BRENDA & DAVID — 3-COLUMN heading + photo + text
                ───────────────────────────────────────── */}
                <Reveal>
                    <h1 className="birthstone" style={{
                        fontSize: 'clamp(4rem, 14vw, 6rem)',
                        lineHeight: 1,
                        textAlign: 'center',
                        marginBottom: '2.3rem',
                        width: '100%',
                        fontWeight: 400
                    }}>
                        Brenda &amp; David
                    </h1>
                </Reveal>

                {/*── 3-COLUMN: photo | text col 1 | text col 2 ──*/}
                <Reveal>
                    <div style={{
                        display: 'flex',
                        gap: '1.25rem',
                        alignItems: 'stretch',
                        marginBottom: '1.5rem',
                    }}>
                        {/* Photo col — fills height */}
                        <div style={{ flex: '0 0 34%' }}>
                            <img
                                src="/foto-1.jpeg"
                                alt="Celebración"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                    borderRadius: '2px',
                                    border: '1px solid rgba(26,18,8,0.2)',
                                }}
                            />
                        </div>
                        {/* Text col 1 */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                            <p>{t('bodaNoTradicional')}</p>
                            <p>{t('outfit1')}</p>
                        </div>
                        {/* Text col 2 */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                            <p>{t('outfit2')}</p>
                            <p>{t('outfit3')}</p>
                        </div>
                    </div>
                </Reveal>

                {/*─────────────────────────────────────────
                INFORMACIÓN section
                ───────────────────────────────────────── */}
                <Reveal>
                    <p className="section-label">{t('informacion')}</p>
                    <hr className="rule-thick" style={{ margin: '0.3rem 0 1.5rem' }} />
                </Reveal>

                {/*── 2-column: info left | photo right ──*/}
                <Reveal>
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
                        {/* Left: all event info */}
                        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem' }}>
                            {/* Dónde */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <p className="serif" style={{ fontStyle: 'italic', fontSize: '1.15rem', fontWeight: 600, textAlign: 'left', marginBottom: '0.25rem' }}>
                                        {t('donde')}
                                    </p>
                                    <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>
                                        Samariwasi AirPort hotel<br />
                                        Yaruquí, calle Juan<br />
                                        Montalvo y Antonio Sucre
                                    </p>
                                </div>
                                {/* QR */}
                                <div style={{ border: '1px solid var(--ink)', padding: '5px', background: '#fff', width: '80px', flexShrink: 0 }}>
                                    <div style={{
                                        width: '100%', aspectRatio: '1',
                                        background: 'repeating-conic-gradient(#000 0% 25%, #fff 0% 50%) 0 0 / 10px 10px',
                                    }} />
                                </div>
                            </div>
                            {/* Cuándo */}
                            <div>
                                <p className="serif" style={{ fontStyle: 'italic', fontSize: '1.15rem', fontWeight: 600, textAlign: 'left', marginBottom: '0.15rem' }}>
                                    {t('cuando')}
                                </p>
                                <p className="sans" style={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase', textAlign: 'left' }}>
                                    {t('el24deAbril')} 2026
                                </p>
                            </div>
                            {/* Hora */}
                            <div>
                                <p className="serif" style={{ fontStyle: 'italic', fontSize: '1.15rem', fontWeight: 600, textAlign: 'left', marginBottom: '0.15rem' }}>
                                    {t('hora')}
                                </p>
                                <p className="serif" style={{ fontStyle: 'italic', fontSize: '1rem', textAlign: 'left' }}>
                                    {t('3a12')}
                                </p>
                            </div>
                            {/* Dress code */}
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <div style={{
                                    width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                                    background: 'conic-gradient(#f5abd1 0deg 45deg, #f6b5f3 45deg 90deg, #c3aeeb 90deg 135deg, #8fdaff 135deg 180deg, #e8b496 180deg 225deg, #aabb7c 225deg 270deg, #8f8f8f 270deg 315deg, #9cdfd9 315deg 360deg)',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
                                }} />
                                <div>
                                    <p className="serif" style={{ fontStyle: 'italic', fontSize: '1.05rem', fontWeight: 600, textAlign: 'left', marginBottom: '0.1rem' }}>
                                        {t('dresscode')} <strong className="sans" style={{ fontStyle: 'normal', letterSpacing: '1px' }}>formal</strong>
                                    </p>
                                    <p style={{ textAlign: 'left', color: 'var(--ink-mid)', fontSize: '0.78rem' }}>
                                        {t('noBlanco')}
                                    </p>
                                </div>
                            </div>

                            <p className="birthstone" style={{
                                fontSize: '1.8rem',
                                color: 'var(--ink)',
                                fontWeight: 300,
                                textAlign: 'left',
                                marginTop: '1rem',
                            }}>
                                {t('gracias')}
                            </p>
                        </div>
                        {/* Right: photo fills full height */}
                        <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                            <img
                                src="/FOTO-LUGAR.jpg"
                                alt="Lugar"
                                style={{
                                    width: '100%',
                                    flex: 1, /* Occupy all available height of column */
                                    objectFit: 'cover',
                                    display: 'block',
                                    borderRadius: '2px',
                                    border: '1px solid rgba(26,18,8,0.2)',
                                    minHeight: '200px'
                                }}
                            />
                        </div>
                    </div>
                </Reveal>

                <hr className="rule-double" />

                {/*─────────────────────────────────────────
                TRANSPORTE
                ───────────────────────────────────────── */}
                <Reveal>
                    <p className="section-label">{t('traslados')}</p>
                    <div style={{ padding: '1rem 0' }}>
                        <p style={{ marginBottom: '1.25rem' }} dangerouslySetInnerHTML={{ __html: t('trasladosTexto') }} />

                        {/* Transport checkbox */}
                        {!transportSaved ? (
                            <button
                                className="btn-ink"
                                onClick={() => { setNeedsTransport(true); setTransportSaved(true); }}
                                style={{ width: '100%', padding: '0.8rem 1.5rem', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px' }}
                            >
                                {t('siTransporte')}
                            </button>
                        ) : (
                            <div style={{
                                padding: '0.8rem 1rem',
                                border: '1px solid var(--border)',
                                background: 'rgba(255,255,255,0.35)',
                                borderRadius: '2px',
                                fontSize: '0.85rem',
                                fontStyle: 'italic',
                                textAlign: 'center'
                            }}>
                                {t('transporteGuardadoSi')}
                            </div>
                        )}
                    </div>
                </Reveal>

                <hr className="rule-double" />

                {/*─────────────────────────────────────────
                FULL-WIDTH SEPARATOR PHOTO
                ───────────────────────────────────────── */}
                <Reveal>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <img
                            src="/FOTO-ANCHA-SEPARADOR.jpg"
                            alt="Separador"
                            style={{
                                width: '100%', height: 'auto', display: 'block', aspectRatio: '16/9',
                                objectFit: 'cover', borderRadius: '3px',
                                border: '1px solid rgba(26,18,8,0.3)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            }}
                        />
                    </div>
                </Reveal>

                {/*─────────────────────────────────────────
                RSVP FORM
                ───────────────────────────────────────── */}
                <Reveal>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <p className="section-label" style={{ marginBottom: '0.5rem' }}>{t('confirmaAsistencia')}</p>
                        <h2 className="gothic" style={{ fontSize: 'clamp(2rem, 7vw, 2.8rem)', marginBottom: '1.25rem' }}>
                            {t('nosAcompanas')}
                        </h2>
                        <RSVPForm guestId={guestId} initialRsvp={hasRsvp ? rsvpAttending : null} />
                    </div>
                </Reveal>

                <hr className="rule" />

                {/*─────────────────────────────────────────
                SONG REQUEST — PARA BAILAR
                ───────────────────────────────────────── */}
                <Reveal>
                    <div style={{ marginBottom: '2rem' }}>
                        <p className="section-label" style={{ marginBottom: '0.5rem' }}>{t('playlistOficial')}</p>
                        <h2 className="gothic" style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', marginBottom: '0.5rem' }}>
                            {t('cancionBailar')}
                        </h2>
                        <p style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
                            {t('cancionBailarSub')}
                        </p>
                        <SongRequest guestId={guestId} type="dance" />
                    </div>
                </Reveal>

                <hr className="rule" />

                {/*─────────────────────────────────────────
                SONG REQUEST — PARA LA CENA
                ───────────────────────────────────────── */}
                <Reveal>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <p className="section-label" style={{ marginBottom: '0.5rem' }}>{t('musicaCena')}</p>
                        <h2 className="gothic" style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', marginBottom: '0.5rem' }}>
                            {t('cancionCena')}
                        </h2>
                        <p style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
                            {t('cancionCenaSub')}
                        </p>
                        <SongRequest guestId={guestId} type="dinner" />
                    </div>
                </Reveal>

                <hr className="rule-double" />

                {/*─────────────────────────────────────────
                REGALO section
                ───────────────────────────────────────── */}
                <Reveal>
                    <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                        <p className="section-label" style={{ marginBottom: '0.5rem' }}>{t('regalos')}</p>
                        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>💛</div>
                        <p style={{
                            textAlign: 'center',
                            maxWidth: '440px',
                            margin: '0 auto 1.5rem',
                            fontStyle: 'italic',
                            fontSize: '0.9rem',
                            lineHeight: 1.7,
                        }} dangerouslySetInnerHTML={{ __html: t('regaloTexto') }} />
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                className="btn-ink"
                                onClick={() => setShowBank(true)}
                                style={{ width: 'auto', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                🏦 Transferencia Bancaria
                            </button>
                            <button
                                className="btn-ink"
                                onClick={() => setShowPaypal(true)}
                                style={{ width: 'auto', padding: '0.75rem 1.5rem', background: '#003087', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                <PaypalIcon /> PayPal
                            </button>
                        </div>
                    </div>
                </Reveal>

                <hr className="rule-double" />

                {/*─────────────────────────────────────────
                FOOTER SIGNATURE
                ───────────────────────────────────────── */}
                <Reveal>
                    <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
                        <span className="birthstone" style={{ fontSize: 'clamp(3rem, 12vw, 5rem)', display: 'block' }}>Brenda &amp; David</span>
                        <p className="sans" style={{ fontSize: '0.65rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--ink-light)', marginTop: '0.5rem', textAlign: 'center', marginRight: '-4px' }}>
                            24 · 04 · 2026 · Quito, Ecuador
                        </p>
                    </div>
                </Reveal>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem', opacity: 0.55 }}>
                    <img src="/adorno-esquina.png" alt="" style={{ width: '400px', height: 'auto', transform: 'rotate(180deg)' }} />
                </div>
            </div>

            {/* ─── BANK MODAL ─── */}
            {showBank && (
                <Modal onClose={() => setShowBank(false)} title="Transferencia — Produbanco">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {[
                            { label: t('banco'), value: 'Produbanco' },
                            { label: t('titular'), value: 'Brenda [Apellido] / David [Apellido]' },
                            { label: t('tipoCuenta'), value: t('tipoCuentaValor') },
                            { label: t('numeroCuenta'), value: '0000000000' },
                            { label: 'Cédula / RUC', value: '0000000000' },
                        ].map((row, i, arr) => (
                            <div key={row.label} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '0.8rem 1rem',
                                borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                                background: i % 2 === 0 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)',
                            }}>
                                <span className="sans" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-light)' }}>{row.label}</span>
                                <span className="serif" style={{ fontWeight: 600, fontSize: '0.95rem' }}>{row.value}</span>
                            </div>
                        ))}
                    </div>
                    <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--ink-light)', marginTop: '1rem', fontStyle: 'italic' }}>
                        {t('notaTransferencia')}
                    </p>
                </Modal>
            )}

            {/* ─── PAYPAL MODAL ─── */}
            {showPaypal && (
                <Modal onClose={() => setShowPaypal(false)} title="PayPal">
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <PaypalIcon size={48} />
                        <p className="serif" style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1rem 0 0.25rem', textAlign: 'center' }}>
                            paypal.me/[usuario]
                        </p>
                        <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--ink-mid)' }} dangerouslySetInnerHTML={{ __html: t('notaPaypal') }}>
                        </p>
                        <a
                            href="https://paypal.me/[usuario]"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-block',
                                marginTop: '1.25rem',
                                padding: '0.7rem 1.5rem',
                                background: '#003087',
                                color: '#fff',
                                textDecoration: 'none',
                                borderRadius: '4px',
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                            }}
                        >
                            Ir a PayPal
                        </a>
                    </div>
                </Modal>
            )}
        </motion.div>
    )
}

// ─── Modal helper ─────────────────────────────────────────────────────────────
function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: 'rgba(10,8,4,0.75)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '1.5rem',
                backdropFilter: 'blur(4px)',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: 'var(--parchment)',
                    backgroundImage: 'url(/mi-pergamino.jpg)',
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'multiply',
                    width: '100%',
                    maxWidth: '420px',
                    border: '2px solid var(--ink)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                    overflow: 'hidden',
                }}
            >
                {/* Modal header */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.9rem 1.25rem',
                    borderBottom: '2px solid var(--ink)',
                    background: 'var(--ink)',
                }}>
                    <span className="sans" style={{ color: 'var(--parchment)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' }}>{title}</span>
                    <button
                        onClick={onClose}
                        aria-label="Cerrar"
                        style={{ background: 'none', border: 'none', color: 'var(--parchment)', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1 }}
                    >
                        ×
                    </button>
                </div>
                {/* Modal body */}
                <div style={{ padding: '1.25rem' }}>
                    {children}
                </div>
            </div>
        </div>
    )
}

function PaypalIcon({ size = 20 }: { size?: number }) {
    return (
        <svg width={size} height={size * 1.2} viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.067 4.41C19.14 3.35 17.4 2.87 15.16 2.87H8.47a.94.94 0 0 0-.93.79L4.97 22.29a.57.57 0 0 0 .56.66h4.05l1.02-6.46-.03.2a.94.94 0 0 1 .93-.8h1.94c3.79 0 6.76-1.54 7.63-5.98.02-.13.04-.26.06-.39.26-1.64-.01-2.76-.06-3.12z" fill="#009cde" />
            <path d="M9.75 8.13a.82.82 0 0 1 .81-.69h5.13c.61 0 1.18.04 1.7.13.15.02.3.05.44.08.14.03.27.07.4.11.07.02.14.04.2.07 1.13.38 1.91 1.09 2.09 2.44-.26 1.64-.01 2.76-.06 3.12C19.56 18 16.6 19.54 12.8 19.54h-1.93a.94.94 0 0 0-.93.8l-1.06 6.72H4.99a.56.56 0 0 1-.56-.65l.95-6.01 1.95-12.27z" fill="#012169" />
        </svg>
    )
}
