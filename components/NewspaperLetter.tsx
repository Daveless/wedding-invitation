'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import RSVPForm from './RSVPForm'
import SongRequest from './SongRequest'
import Countdown from './Countdown'
import { useTranslation } from 'react-i18next'
import { Bus } from 'lucide-react'
import { supabase } from '@/lib/supabase'

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

    const handleTransportClick = async () => {
        setNeedsTransport(true)
        setTransportSaved(true)
        // Fire and forget insert to Supabase
        await supabase.from('transport_requests').insert({ guest_id: guestId, needs_transport: true })
    }

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
                height: '100dvh',
                overflow: 'hidden',
                marginBottom: 0,
            }}>
                <img
                    src="/CELEBRACION.jpg"
                    alt="David y Brenda"
                    draggable={false}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                        pointerEvents: 'none',
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
                        fontSize: 'clamp(3.5rem, 14vw, 5rem)',
                        textAlign: 'left',
                        lineHeight: 1,
                        textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                        letterSpacing: '0.03em',
                    }}>
                        David & Brenda
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

            {/*─────────────────────────────────────────
            CAFESITO FULL WIDTH (OUTSIDE PADDING)
            ───────────────────────────────────────── */}
            <div style={{ width: '100%', marginBottom: '0' }}>
                <img src="/cafesito.jpeg" alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>

            {/*─────────────────────────────────────────
            PORTADA (OUTSIDE PADDING)
            ───────────────────────────────────────── */}
            <Reveal>
                <div style={{ width: '100%', margin: '0 0 1.5rem 0', overflow: 'hidden', background: 'rgba(26,18,8,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid rgba(26,18,8,0.18)', borderBottom: '1px solid rgba(26,18,8,0.18)' }}>
                    <img src="/portada.jpg" alt="Portada exclusiva" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
            </Reveal>

            {/* Inner content padding */}
            <div style={{ padding: '1rem 2.25rem 4rem', position: 'relative' }}>

                {/*─────────────────────────────────────────
                TOP DECORATIVE ROW
                ───────────────────────────────────────── */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', position: 'relative' }}>
                    {/* Left corner flourish */}
                    <div style={{ position: 'absolute', left: '-25px', top: '-10px', opacity: 0.55, zIndex: 0 }}>
                        <img src="/adorno-esquina-2.png" alt="" style={{ width: '40vw', maxWidth: '320px', height: 'auto' }} />
                    </div>

                    {/* Right: "Guarda la fecha" box */}
                    <div style={{ flexShrink: 0, marginLeft: '1rem', zIndex: 1 }}>
                        <img src="/guarda-la-fecha-2.png" alt="Guarda la fecha" style={{ width: '180px', height: 'auto', position: 'absolute', right: '0', top: '0' }} />
                    </div>
                </div>

                {/*─────────────────────────────────────────
                GOTHIC HERO TITLE  "Nos vemos el 24 de Abril"
                ───────────────────────────────────────── */}
                <Reveal>
                    <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', position: 'relative', marginTop: '5rem' }}>
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
                    <style>{`
                        .exclusiva-container {
                            display: flex;
                            gap: 0;
                            align-items: stretch;
                            text-align: justify;
                            margin-bottom: 1.25rem;
                        }
                        .exclusiva-label {
                            background: var(--ink);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 0rem 0.6rem;
                            flex-shrink: 0;
                            width: 170px;
                        }
                        @media (max-width: 768px) {
                            .exclusiva-container {
                                flex-direction: column;
                            }
                            .exclusiva-label {
                                width: 100%;
                                padding: 0.4rem 0.6rem;
                            }
                        }
                    `}</style>
                    {/* EXCLUSIVA: horizonal — wide black block | paragraph */}
                    <div className="exclusiva-container">
                        {/* Left: wide black label block */}
                        <div className="exclusiva-label">
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

                {/*── 3-COLUMN Grid (Responsive) ──*/}
                <style>{`
                    .brenda-david-grid {
                        display: flex;
                        gap: 1.25rem;
                        align-items: stretch;
                        margin-bottom: 1.5rem;
                    }
                    .bd-img-container {
                        flex: 0 0 34%;
                    }
                    .bd-text-container {
                        display: flex;
                        flex: 1;
                        gap: 1.25rem;
                    }
                    .bd-img-styled {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        display: block;
                        border-radius: 2px;
                        border: 1px solid rgba(26,18,8,0.2);
                    }
                    @media (max-width: 768px) {
                        .brenda-david-grid {
                            display: block;
                        }
                        .bd-img-container {
                            float: left;
                            width: 50%;
                            margin-right: 1.25rem;
                            margin-bottom: 0.5rem;
                        }
                        .bd-text-container {
                            display: block;
                        }
                    }
                `}</style>
                <Reveal>
                    <div className="brenda-david-grid">
                        {/* Photo col — floats on mobile */}
                        <div className="bd-img-container">
                            <img
                                src="/foto-1.jpeg"
                                alt="Celebración"
                                className="bd-img-styled"
                            />
                        </div>
                        {/* Text columns wrapping container */}
                        <div className="bd-text-container">
                            <div style={{}}>
                                <p style={{ marginBottom: '0.7rem' }}>{t('bodaNoTradicional')}</p>
                                <p style={{ marginBottom: '0.7rem' }}>{t('outfit1')}</p>
                                <p style={{ marginBottom: '0.7rem' }}>{t('outfit2')}</p>
                                <p>{t('outfit3')}</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/*─────────────────────────────────────────
                PASE PARA X PERSONA (BEFORE INFO)
                ───────────────────────────────────────── */}
                <Reveal>
                    <div style={{ marginBottom: '3rem' }}>
                        <div style={{
                            border: '1px solid rgba(26,18,8,0.15)',
                            padding: '1.5rem 1rem',
                            borderRadius: '6px',
                            background: '#fff',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <img src="/seccion-pago.jpeg" alt="Pase" style={{ width: '100%', height: 'auto', display: 'block', marginBottom: '1.25rem', borderRadius: '4px' }} />
                            <h3 className="serif" style={{ fontSize: '1.3rem', fontStyle: 'italic', marginBottom: '0.2rem', fontWeight: 600 }}>{t('pase1Persona')}</h3>
                            <p className="birthstone" style={{ fontSize: '2rem', color: 'var(--ink)' }}>{guestName}</p>
                            <hr style={{ width: '40px', border: 'none', borderTop: '1px solid var(--ink)', margin: '0.5rem 0 1rem' }} />
                            <p style={{ textAlign: 'center', fontSize: '0.85rem', lineHeight: 1.6 }}>{t('paseTexto')}</p>
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

                {/*── ROW 1: Fecha, Hora, Dresscode | Photo ──*/}
                <Reveal>
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
                        {/* Left: all event info */}
                        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem' }}>
                            {/* Cuándo / Fecha */}
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
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'flex-start' }}>
                                {/* Casual */}
                                <div>
                                    <p className="sans" style={{ fontSize: '0.85rem', fontWeight: 600, textAlign: 'left', marginBottom: '0.1rem', textTransform: 'uppercase' }}>
                                        {t('dresscodeCasual')}
                                    </p>
                                    <p style={{ textAlign: 'left', color: 'var(--ink-mid)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                                        {t('ternoBano')}
                                    </p>
                                </div>

                            </div>
                        </div>
                        {/* Right: Square Photo aligned left center */}
                        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <img
                                src="/FOTO-LUGAR.jpg"
                                alt="Lugar"
                                style={{
                                    width: '100%',
                                    aspectRatio: '1/1',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    display: 'block',
                                    borderRadius: '2px',
                                    border: '1px solid rgba(26,18,8,0.2)'
                                }}
                            />
                        </div>
                    </div>
                </Reveal>
                {/* Formal */}
                <div style={{ display: 'flex', flexDirection: 'row', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div>
                        <p className="sans" style={{ fontSize: '0.85rem', fontWeight: 600, textAlign: 'left', marginBottom: '0.1rem', textTransform: 'uppercase' }}>
                            {t('dresscodeFormal')}
                        </p>
                        <p style={{ textAlign: 'left', color: 'var(--ink-mid)', fontSize: '0.78rem' }}>
                            {t('noBlanco')}
                        </p>
                    </div>
                    {/* Dress Code Circles */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '200px' }}>
                        {[
                            ['#EE7EA0', '#FFA9BA', '#E2C9DC', '#E7CDF6'],
                            ['#F6EFFF', '#CDBDEB', '#9A81B0', '#FFE6F5'],
                            ['#EA7D70', '#F69F95', '#FBA1A0', '#FCE2E3'],
                            ['#FFD7D6', '#FEC6BA', '#F8DCC4', '#E1CFCA'],
                            ['#FFAF6E', '#FFC699', '#FECB7F', '#FFCC80'],
                            ['#FFE2A6', '#FBFBBC', '#FBF8CB', '#FBF4D8'],
                            ['#BCC07B', '#D6D7AB', '#DBE098', '#CADBBB'],
                            ['#BCEACF', '#D5E2D3', '#E2EDE9'],
                            ['#BBE6F0', '#C5DEF2', '#ABCDDE', '#D5EDF8'],
                            ['#7D8BE0', '#B5BEF5', '#E4EBF1'],
                            ['#8E715B', '#C9A98D', '#B19F9A', '#4F3F3E']
                        ].map((colors, idx) => {
                            let gradient = '';
                            if (colors.length === 4) {
                                gradient = `conic-gradient(${colors[0]} 0deg 90deg, ${colors[1]} 90deg 180deg, ${colors[2]} 180deg 270deg, ${colors[3]} 270deg 360deg)`;
                            } else if (colors.length === 3) {
                                gradient = `conic-gradient(${colors[0]} 0deg 120deg, ${colors[1]} 120deg 240deg, ${colors[2]} 240deg 360deg)`;
                            } else {
                                gradient = `conic-gradient(${colors[0]} 0deg 180deg, ${colors[1]} 180deg 360deg)`;
                            }
                            return (
                                <div
                                    key={idx}
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        flexShrink: 0,
                                        background: gradient,
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.12)'
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
                {/*── ROW 2: Dónde + Map ──*/}
                <Reveal>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <p className="serif" style={{ fontStyle: 'italic', fontSize: '1.25rem', fontWeight: 600, textAlign: 'left', marginBottom: '0.25rem' }}>
                                {t('donde')}
                            </p>
                            <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>
                                Samariwasi AirPort hotel<br />
                                Yaruquí, calle Juan<br />
                                Montalvo y Antonio Sucre
                            </p>
                        </div>
                        {/* Map iframe */}
                        <div style={{ width: '100%', marginTop: '0.5rem' }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99489.15105371822!2d-78.38362855873731!3d-0.17971741910849887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d592966df2cca9%3A0xed36f699181ad823!2sSamariwasi%20airport%20hotel!5e0!3m2!1ses!2sec!4v1773005626135!5m2!1ses!2sec"
                                width="100%"
                                height="250"
                                style={{ border: 0, borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </Reveal>

                <hr className="rule-double" />

                {/*─────────────────────────────────────────
                TRANSPORTE
                ───────────────────────────────────────── */}
                <Reveal>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
                        <p className="section-label" style={{ marginBottom: '0.3rem' }}>{t('traslados')}</p>
                        <Bus size={32} strokeWidth={1.2} style={{ color: 'var(--ink)' }} />
                    </div>
                    <div style={{ padding: '0 0 1rem' }}>
                        <p style={{ marginBottom: '1.25rem' }} dangerouslySetInnerHTML={{ __html: t('trasladosTexto') }} />

                        {/* Transport checkbox */}
                        {!transportSaved ? (
                            <button
                                className="btn-ink"
                                onClick={handleTransportClick}
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
                SONG REQUEST — PARA BAILAR
                ───────────────────────────────────────── */}
                <Reveal>
                    <div style={{ marginBottom: '2rem' }}>
                        <p className="section-label" style={{ marginBottom: '0.5rem' }}>{t('playlist')}</p>
                        <h2 className="gothic" style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', marginBottom: '0.5rem' }}>
                            {t('cancionBailar')}
                        </h2>
                        <p style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
                            {t('cancionBailarDesc')}
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
                            {t('cancionCenaDesc')}
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
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <img src="/regalos.png" alt="Regalo de bodas" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>

                        <p style={{
                            textAlign: 'justify',
                            maxWidth: '440px',
                            margin: '1rem auto 1.5rem',
                            fontStyle: 'italic',
                            fontSize: '0.9rem',
                            lineHeight: 1.7,
                        }} dangerouslySetInnerHTML={{ __html: t('regalosTexto') }} />
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

                <hr className="rule" />

                {/*─────────────────────────────────────────
                RSVP FORM (MOVED HERE)
                ───────────────────────────────────────── */}
                <Reveal>
                    <div style={{ padding: '0.5rem 0 2rem' }}>
                        <p className="section-label">{t('confirma')}</p>
                        <h2 className="gothic" style={{
                            textAlign: 'center', fontSize: 'clamp(2rem, 7vw, 3rem)',
                            margin: '0.5rem 0 1.5rem', color: 'var(--ink)'
                        }}>
                            {t('nosAcompanas')}
                        </h2>
                        <RSVPForm guestId={guestId} initialRsvp={hasRsvp ? rsvpAttending : null} />
                    </div>
                </Reveal>

                <hr className="rule-double" />

                {/*─────────────────────────────────────────
                FOOTER SIGNATURE
                ───────────────────────────────────────── */}
                <Reveal>
                    <div style={{ textAlign: 'center', paddingTop: '1rem', paddingBottom: '2.5rem' }}>
                        <span className="birthstone" style={{ fontSize: 'clamp(3rem, 12vw, 5rem)', display: 'block' }}>Brenda &amp; David</span>
                        <p className="sans" style={{ fontSize: '0.65rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--ink-light)', marginTop: '0.5rem', marginBottom: '2.5rem', textAlign: 'center', marginRight: '-4px' }}>
                            24 · 04 · 2026 · Quito, Ecuador
                        </p>
                        <img
                            src="/colage-final.jpeg"
                            alt="Colage Final"
                            style={{
                                width: '100%',
                                maxWidth: '500px',
                                height: 'auto',
                                display: 'block',
                                margin: '0 auto',
                                borderRadius: '4px',
                                border: '1px solid rgba(26,18,8,0.2)',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                            }}
                        />
                    </div>
                </Reveal>

                {/* Bottom Right Corner Flourish (Mirrors Top Left) */}
                <div style={{ position: 'absolute', right: '-25px', bottom: '-10px', opacity: 0.55, zIndex: 0 }}>
                    <img src="/adorno-esquina-2.png" alt="" style={{ width: '40vw', maxWidth: '320px', height: 'auto', transform: 'rotate(180deg)' }} />
                </div>
            </div>

            {/* ─── BANK MODAL ─── */}
            {showBank && (
                <Modal onClose={() => setShowBank(false)} title="Transferencia">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {[
                            { label: t('banco'), value: process.env.NEXT_PUBLIC_BANK_NAME || 'Produbanco' },
                            { label: t('titular'), value: process.env.NEXT_PUBLIC_BANK_HOLDER || 'Brenda / David' },
                            { label: t('tipoCuenta'), value: t('tipoCuentaValor') },
                            { label: t('numCuenta'), value: process.env.NEXT_PUBLIC_BANK_ACCOUNT || '0000000000' },
                            { label: t('cedula'), value: process.env.NEXT_PUBLIC_BANK_ID || '0000000000' },
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

                </Modal>
            )}

            {/* ─── PAYPAL MODAL ─── */}
            {showPaypal && (
                <Modal onClose={() => setShowPaypal(false)} title="PayPal">
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <PaypalIcon size={48} />
                        <p className="serif" style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1rem 0 0.25rem', textAlign: 'center' }}>
                            {process.env.NEXT_PUBLIC_PAYPAL_URL?.replace('https://', '') || 'paypal.me/[usuario]'}
                        </p>
                        <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--ink-mid)' }} dangerouslySetInnerHTML={{ __html: t('notaPaypal') }}>
                        </p>
                        <a
                            href={process.env.NEXT_PUBLIC_PAYPAL_URL || "https://paypal.me/[usuario]"}
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
