'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import RSVPForm from './RSVPForm'
import SongRequest from './SongRequest'

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
    const [showGifts, setShowGifts] = useState(false)
    const [showPaypal, setShowPaypal] = useState(false)
    const [showBank, setShowBank] = useState(false)
    const [needsTransport, setNeedsTransport] = useState(false)
    const [transportSaved, setTransportSaved] = useState(false)

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
                </div>
            </div>

            {/* Inner content padding */}
            <div style={{ padding: '3rem 2.25rem 4rem', position: 'relative' }}>

                {/*─────────────────────────────────────────
                TOP DECORATIVE ROW
                ───────────────────────────────────────── */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    {/* Left corner flourish */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', opacity: 0.55, lineHeight: 1 }}>
                        <span style={{ fontSize: '1.5rem', fontFamily: 'Georgia' }}>❦</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <div style={{ height: '1px', width: '28px', background: 'var(--ink)', marginTop: '8px', opacity: 0.4 }} />
                            <div style={{ height: '1px', width: '14px', background: 'var(--ink)', marginTop: '8px', opacity: 0.25 }} />
                        </div>
                    </div>

                    {/* Right: "Guarda la fecha" box */}
                    <div style={{ border: '1px solid var(--ink)', padding: '0.4rem 0.8rem', flexShrink: 0, marginLeft: '1rem' }}>
                        <span className="birthstone" style={{ fontSize: '1.8rem', lineHeight: 1 }}>
                            Guarda la fecha
                        </span>
                    </div>
                </div>

                {/*─────────────────────────────────────────
                GOTHIC HERO TITLE  "Nos vemos el 24 de Abril"
                ───────────────────────────────────────── */}
                <Reveal>
                    <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.1rem' }}>
                        <h1 className="masthead" style={{ fontSize: 'clamp(3.5rem, 13vw, 8rem)', lineHeight: 0.9, color: 'var(--ink)', width: '100%' }}>
                            Nos vemos
                        </h1>
                        <h1 className="masthead" style={{ fontSize: 'clamp(3.5rem, 13vw, 7rem)', lineHeight: 0.9, color: 'var(--ink)', width: '100%' }}>
                            el 24 de Abril
                        </h1>
                    </div>
                </Reveal>

                <hr className="rule" />

                {/*─────────────────────────────────────────
                EXCLUSIVA + INTRO PARAGRAPH
                ───────────────────────────────────────── */}
                <Reveal>
                    {/* Two-column: stamp col (black bg) | text col */}
                    <div style={{
                        display: 'flex',
                        gap: 0,
                        alignItems: 'stretch',
                        marginBottom: '1.25rem',
                        border: '1px solid var(--border)',
                    }}>
                        {/* Left: stamp block full height */}
                        <div style={{
                            background: 'var(--ink)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1rem 0.6rem',
                            flexShrink: 0,
                            width: '40px',
                        }}>
                            <span className="sans" style={{
                                color: 'var(--parchment)',
                                fontSize: '0.58rem',
                                fontWeight: 700,
                                letterSpacing: '3px',
                                textTransform: 'uppercase',
                                writingMode: 'vertical-rl',
                                transform: 'rotate(180deg)',
                                whiteSpace: 'nowrap',
                            }}>Exclusiva</span>
                        </div>
                        {/* Right: paragraph */}
                        <p style={{
                            flex: 1,
                            padding: '0.9rem 1rem',
                            textAlign: 'justify',
                            fontSize: '0.86rem',
                            lineHeight: 1.65,
                        }}>
                            Hay momentos en la vida que son especiales, pero compartirlos con quienes amamos los hace
                            inolvidables. Por eso queremos que seas parte de esta pequeña y muy íntima celebración del
                            amor que nos tenemos.
                        </p>
                    </div>
                </Reveal>

                <hr className="rule" />

                {/*─────────────────────────────────────────
                TE INVITAMOS + GUEST NAME
                ───────────────────────────────────────── */}
                <Reveal>
                    <h2 className="sans" style={{
                        textAlign: 'center',
                        fontSize: 'clamp(1rem, 3.5vw, 1.4rem)',
                        letterSpacing: '5px',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        marginBottom: '2rem',
                    }}>
                        Te invitamos a nuestra boda
                    </h2>
                </Reveal>

                {/*─────────────────────────────────────────
                2-COLUMN: story left | photo right
                ───────────────────────────────────────── */}
                <Reveal>
                    <div className="news-grid" style={{ marginBottom: '1.25rem' }}>
                        <div className="col-text" style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                            <p>
                                Nuestra historia comenzó un 24 de abril de 2018, casi sin imaginar que ese día marcaría
                                el inicio del viaje más hermoso de nuestras vidas.
                            </p>
                            <p>
                                El 17 de septiembre de 2022, frente al mar y con el sonido de las olas como testigo, ya
                                nos habíamos dicho &ldquo;sí&rdquo; a una vida juntos, prometiéndonos amor, paciencia, respeto y
                                complicidad.
                            </p>
                            <p>
                                Elegimos esta fecha tan significativa para dar el siguiente paso al celebrar nuestro
                                octavo aniversario, con la certeza de haber encontrado el uno en el otro nuestro lugar
                                seguro, nuestro refugio, nuestro hogar.
                            </p>
                        </div>
                        <div className="col-photo">
                            <img
                                src="/CELEBRACION.jpg"
                                alt="Nuestra historia"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    aspectRatio: '4/5',
                                    borderRadius: '2px',
                                    border: '1px solid rgba(26,18,8,0.2)',
                                }}
                            />
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <p style={{ marginBottom: '0.75rem' }}>
                        Queremos que solo quienes verdaderamente han sido parte esencial de nuestro camino, quienes
                        han reído con nosotros, nos han sostenido y han sido testigos de nuestra historia individual
                        y como pareja, nos acompañen en este momento tan especial.
                    </p>
                    <p>
                        Tenerlos a nuestro lado hará aún más significativo este día extraordinario para nosotros.
                    </p>
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

                {/*── 3-column: photo | text col 1 | text col 2 ──*/}
                <Reveal>
                    <div style={{
                        display: 'flex',
                        gap: '1.25rem',
                        alignItems: 'stretch',
                        marginBottom: '1.5rem',
                    }}>
                        {/* Photo col — fills height */}
                        <div style={{ flex: '0 0 38%', minHeight: '100%' }}>
                            <img
                                src="/HISTORIA.jpg"
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
                            <p>
                                Nuestra boda no será una celebración tradicional, será una experiencia pensada para
                                vivirla juntos, paso a paso. Nos veremos en Yaruquí, para comenzar la tarde en un
                                ambiente cálido y relajado.
                            </p>
                            <p>
                                El primer outfit será casual, ideal para compartir risas, karaoke, billar, bebidas y
                                bocaditos mientras el sol nos acompaña.
                            </p>
                            <p>
                                Si el clima lo permite y lo deseas, podrás cambiar a un segundo outfit: terno de baño,
                                para disfrutar de la piscina y seguir celebrando bajo el cielo abierto.
                            </p>
                            <p>
                                Y cuando llegue la noche, los invitamos a transformar la energía y vestir su mejor
                                atuendo formal para ser testigos de nuestra ceremonia y la fiesta que sigue.
                            </p>
                        </div>
                    </div>
                </Reveal>

                {/*─────────────────────────────────────────
                INFORMACIÓN section
                ───────────────────────────────────────── */}
                <Reveal>
                    <p className="section-label">Información</p>
                    <hr className="rule-thick" style={{ margin: '0.3rem 0 1.5rem' }} />
                </Reveal>

                {/*── 2-column: info left | photo right ──*/}
                <Reveal>
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
                        {/* Left: all event info */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* Dónde */}
                            <div>
                                <p className="serif" style={{ fontStyle: 'italic', fontSize: '1.15rem', fontWeight: 600, textAlign: 'left', marginBottom: '0.25rem' }}>
                                    ¿Dónde?
                                </p>
                                <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>
                                    Samariwasi AirPort hotel<br />
                                    Yaruquí, calle Juan<br />
                                    Montalvo y Antonio Sucre
                                </p>
                            </div>
                            {/* Cuándo */}
                            <div>
                                <p className="serif" style={{ fontStyle: 'italic', fontSize: '1.15rem', fontWeight: 600, textAlign: 'left', marginBottom: '0.15rem' }}>
                                    ¿Cuándo?
                                </p>
                                <p className="sans" style={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase', textAlign: 'left' }}>
                                    24 de Abril 2026
                                </p>
                            </div>
                            {/* Hora */}
                            <div>
                                <p className="serif" style={{ fontStyle: 'italic', fontSize: '1.15rem', fontWeight: 600, textAlign: 'left', marginBottom: '0.15rem' }}>
                                    Hora
                                </p>
                                <p className="serif" style={{ fontStyle: 'italic', fontSize: '1rem', textAlign: 'left' }}>
                                    3 pm a 12 am
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
                                        Dress code <strong className="sans" style={{ fontStyle: 'normal', letterSpacing: '1px' }}>formal</strong>
                                    </p>
                                    <p style={{ textAlign: 'left', color: 'var(--ink-mid)', fontSize: '0.78rem' }}>
                                        No blanco, marfil, hueso, perla ni rojo. No jeans.
                                    </p>
                                </div>
                            </div>
                            {/* QR */}
                            <div style={{ border: '1px solid var(--ink)', padding: '5px', background: '#fff', width: '80px' }}>
                                <div style={{
                                    width: '100%', aspectRatio: '1',
                                    background: 'repeating-conic-gradient(#000 0% 25%, #fff 0% 50%) 0 0 / 10px 10px',
                                }} />
                            </div>
                        </div>
                        {/* Right: photo fills full height */}
                        <div style={{ flex: '0 0 40%' }}>
                            <img
                                src="/FOTO-LUGAR.jpg"
                                alt="Lugar"
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
                    </div>
                </Reveal>

                {/*── "Gracias por ser parte" ──*/}
                <Reveal>
                    <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '1.5rem' }}>
                        <p className="birthstone" style={{
                            fontSize: 'clamp(3rem, 11vw, 5rem)',
                            lineHeight: 1.05,
                            color: 'var(--ink)',
                            width: '100%',
                        }}>
                            Gracias por ser parte<br />de nuestra historia
                        </p>
                    </div>
                </Reveal>

                <hr className="rule-double" />

                {/*─────────────────────────────────────────
                TRANSPORTE
                ───────────────────────────────────────── */}
                <Reveal>
                    <p className="section-label">Traslados</p>
                    <div style={{ padding: '1rem 0' }}>
                        <p style={{ marginBottom: '1.25rem' }}>
                            Para su comodidad, contaremos con servicio de bus que saldrá desde <strong>Yaruquí</strong> con destino al sur de Quito a las <strong>12:00 AM (medianoche)</strong> del día del evento.
                        </p>
                        {/* Transport checkbox */}
                        {!transportSaved ? (
                            <div style={{
                                border: '1px solid var(--border)',
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.35)',
                                borderRadius: '2px',
                            }}>
                                <p style={{ marginBottom: '0.75rem', fontStyle: 'italic', fontSize: '0.88rem' }}>
                                    ¿Necesitas transporte de regreso?
                                </p>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    cursor: 'pointer',
                                    padding: '0.6rem 0.8rem',
                                    border: `1px solid ${needsTransport ? 'var(--ink)' : 'var(--border)'}`,
                                    background: needsTransport ? 'var(--ink)' : 'rgba(255,255,255,0.4)',
                                    color: needsTransport ? 'var(--parchment)' : 'var(--ink)',
                                    borderRadius: '2px',
                                    transition: 'all 0.2s',
                                    marginBottom: '0.75rem',
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={needsTransport}
                                        onChange={e => setNeedsTransport(e.target.checked)}
                                        style={{ width: '16px', height: '16px', accentColor: 'var(--ink)', cursor: 'pointer' }}
                                    />
                                    <span className="sans" style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                        Sí, necesito transporte de regreso
                                    </span>
                                </label>
                                <button
                                    className="btn-ink"
                                    onClick={() => setTransportSaved(true)}
                                    style={{ width: 'auto', padding: '0.6rem 1.5rem', fontSize: '0.7rem' }}
                                >
                                    Guardar preferencia
                                </button>
                            </div>
                        ) : (
                            <div style={{
                                padding: '0.8rem 1rem',
                                border: '1px solid var(--border)',
                                background: 'rgba(255,255,255,0.35)',
                                borderRadius: '2px',
                                fontSize: '0.85rem',
                                fontStyle: 'italic',
                            }}>
                                {needsTransport
                                    ? '✓ Hemos registrado que necesitas transporte de regreso. ¡Gracias!'
                                    : '✓ Preferencia guardada: no necesitas transporte.'}
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
                        <p className="section-label" style={{ marginBottom: '0.5rem' }}>Confirma tu asistencia</p>
                        <h2 className="gothic" style={{ fontSize: 'clamp(2rem, 7vw, 2.8rem)', marginBottom: '1.25rem' }}>
                            ¿Nos acompañas?
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
                        <p className="section-label" style={{ marginBottom: '0.5rem' }}>Playlist Oficial</p>
                        <h2 className="gothic" style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', marginBottom: '0.5rem' }}>
                            ¿Qué canción no puede faltar para bailar?
                        </h2>
                        <p style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
                            Comparte el tema que no puede faltar en la pista de baile esta noche. Lo añadiremos a la setlist de la fiesta.
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
                        <p className="section-label" style={{ marginBottom: '0.5rem' }}>Música para la cena</p>
                        <h2 className="gothic" style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', marginBottom: '0.5rem' }}>
                            ¿Qué escucharías durante la cena?
                        </h2>
                        <p style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
                            Comparte una canción que te guste escuchar durante la cena. Crearemos el ambiente perfecto con tus sugerencias.
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
                        <p className="section-label" style={{ marginBottom: '0.5rem' }}>Regalos</p>
                        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>💛</div>
                        <p style={{
                            textAlign: 'center',
                            maxWidth: '440px',
                            margin: '0 auto 1.5rem',
                            fontStyle: 'italic',
                            fontSize: '0.9rem',
                            lineHeight: 1.7,
                        }}>
                            Su presencia es nuestro mejor regalo.<br />
                            Si desean darnos algo más, pueden ayudarnos a construir nuestros próximos sueños y nuestra luna de miel.
                        </p>
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
                        <p className="sans" style={{ fontSize: '0.65rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--ink-light)', marginTop: '0.5rem' }}>
                            24 · 04 · 2026 · Quito, Ecuador
                        </p>
                    </div>
                </Reveal>

            </div>

            {/* ─── BANK MODAL ─── */}
            {showBank && (
                <Modal onClose={() => setShowBank(false)} title="Transferencia — Produbanco">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {[
                            { label: 'Banco', value: 'Produbanco' },
                            { label: 'Titular', value: 'Brenda [Apellido] / David [Apellido]' },
                            { label: 'Tipo de cuenta', value: 'Corriente / Ahorros' },
                            { label: 'Número de cuenta', value: '0000000000' },
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
                        Por favor incluye tu nombre en el concepto de la transferencia. ¡Gracias!
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
                        <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--ink-mid)' }}>
                            Puedes enviar tu regalo directamente a través de PayPal.<br />
                            Por favor incluye tu nombre en el mensaje.
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
