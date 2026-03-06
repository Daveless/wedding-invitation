'use client'

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

// A simple image/photo placeholder box that tells the user the suggested filename
function PhotoBox({ aspectRatio = '4/3', label = '' }: { aspectRatio?: string; label?: string }) {
    return (
        <div
            className="photo-placeholder"
            style={{ aspectRatio, width: '100%', outline: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem' }}
        >
            <p className="sans" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                📸<br />
                Ira una foto aquí.<br />
                <span style={{ opacity: 0.6, fontSize: '0.65rem' }}>(Nombra tu imagen: {label || 'foto.jpg'})</span>
            </p>
        </div>
    )
}

export default function NewspaperLetter({ guestName, guestId, hasRsvp, rsvpAttending }: Props) {
    return (
        <motion.div
            className="letter-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
        >
            {/* Inner content padding */}
            <div style={{ padding: '3rem 2.25rem 4rem', position: 'relative' }}>

                {/*─────────────────────────────────────────
            TOP DECORATIVE ROW
        ─────────────────────────────────────────*/}
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
                        <span className="script" style={{ fontSize: '1.6rem', lineHeight: 1 }}>
                            Guarda la fecha
                        </span>
                    </div>
                </div>

                {/*─────────────────────────────────────────
            GOTHIC HERO TITLE  "Nos vemos el 24 de Abril"
        ─────────────────────────────────────────*/}
                <Reveal>
                    <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.1rem' }}>
                        <h1 className="gothic" style={{ fontSize: 'clamp(3rem, 12vw, 4.8rem)', lineHeight: 0.9, color: 'var(--ink)' }}>
                            Nos vemos
                        </h1>
                        <h1 className="gothic" style={{ fontSize: 'clamp(3rem, 12vw, 4.8rem)', lineHeight: 0.9, color: 'var(--ink)' }}>
                            el 24
                        </h1>
                        <h1 className="gothic" style={{ fontSize: 'clamp(3rem, 12vw, 4.8rem)', lineHeight: 0.9, color: 'var(--ink)' }}>
                            de Abril
                        </h1>
                    </div>
                </Reveal>

                <hr className="rule" />

                {/*─────────────────────────────────────────
            EXCLUSIVA + INTRO PARAGRAPH
        ─────────────────────────────────────────*/}
                <Reveal>
                    <div className="exclusiva-block" style={{ marginBottom: '1.25rem' }}>
                        <span className="stamp" style={{ padding: '0.55rem 2.2rem' }}>Exclusiva</span>
                        <p style={{ flex: 1 }}>
                            Hay momentos en la vida que son especiales, pero compartirlos con quienes amamos los hace
                            inolvidables. Por eso queremos que seas parte de esta pequeña y muy íntima celebración del
                            amor que nos tenemos.
                        </p>
                    </div>
                </Reveal>

                <hr className="rule" />

                {/*─────────────────────────────────────────
            TE INVITAMOS + GUEST NAME
        ─────────────────────────────────────────*/}
                <Reveal>
                    <h2 className="sans" style={{
                        textAlign: 'center', fontSize: 'clamp(0.8rem, 2.5vw, 1.05rem)',
                        letterSpacing: '5px', textTransform: 'uppercase', fontWeight: 400,
                        marginBottom: '2rem',
                    }}>
                        Te invitamos a nuestra boda
                    </h2>
                </Reveal>

                {/*─────────────────────────────────────────
            2-COLUMN: story left | photo right
        ─────────────────────────────────────────*/}
                <Reveal>
                    <div className="news-grid" style={{ marginBottom: '1.25rem' }}>
                        <div className="col-text" style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                            <p>
                                Nuestra historia comenzó un 24 de abril de 2018, casi sin imaginar que ese día marcaría
                                el inicio del viaje más hermoso de nuestras vidas.
                            </p>
                            <p>
                                El 17 de septiembre de 2022, frente al mar y con el sonido de las olas como testigo, ya
                                nos habíamos dicho "sí" a una vida juntos, prometiéndonos amor, paciencia, respeto y
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
                                src="/HISTORIA.jpg"
                                alt="Nuestra historia"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    aspectRatio: '4/5',
                                    borderRadius: '2px',
                                    border: '1px solid rgba(26,18,8,0.2)',
                                    filter: 'sepia(80%) contrast(90%) brightness(90%) saturate(85%)'
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
            BRENDA & DAVID — large script heading
        ─────────────────────────────────────────*/}
                <Reveal>
                    <h1 className="script" style={{
                        fontSize: 'clamp(4rem, 14vw, 6.5rem)',
                        lineHeight: 1,
                        textAlign: 'center',
                        marginBottom: '1.75rem',
                    }}>
                        Brenda &amp; David
                    </h1>
                </Reveal>

                {/*─────────────────────────────────────────
            2-COLUMN: photo left | celebration text right
        ─────────────────────────────────────────*/}
                <Reveal>
                    <div className="news-grid" style={{ marginBottom: '1.5rem' }}>
                        <div className="col-photo-sm">
                            <img
                                src="/CELEBRACION.jpg"
                                alt="Celebración"
                                style={{
                                    width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '3/4',
                                    borderRadius: '2px', border: '1px solid rgba(26,18,8,0.2)',
                                    filter: 'sepia(80%) contrast(90%) brightness(90%) saturate(85%)'
                                }}
                            />
                        </div>
                        <div className="col-text" style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                            <p>
                                Nuestra boda no será una celebración tradicional, será una experiencia pensada para
                                vivirla juntos, paso a paso. Nos veremos en Yaruquí, para comenzar la tarde en un
                                ambiente cálido y relajado; por eso, el primer outfit será casual (la ropa que te
                                guste), ideal para compartir risas, karaoke, billar, bebidas y bocaditos mientras el
                                sol nos acompaña.
                            </p>
                            <p>
                                Si el clima lo permite y lo deseas, podrás cambiar a un segundo outfit: terno de baño,
                                para disfrutar de la piscina y seguir celebrando bajo el cielo abierto.
                            </p>
                            <p>
                                Y cuando llegue la noche, los invitamos a transformar la energía y vestir su mejor
                                atuendo formal para ser testigos del momento más especial: nuestra ceremonia de
                                matrimonio y la fiesta donde celebraremos el amor que nos une.
                            </p>
                        </div>
                    </div>
                </Reveal>

                {/*─────────────────────────────────────────
            INFORMACIÓN section
        ─────────────────────────────────────────*/}
                <Reveal>
                    <p className="section-label">Información</p>
                    <hr className="rule-thick" style={{ margin: '0.3rem 0 1.5rem' }} />
                </Reveal>

                {/*── Location + QR + photo ──*/}
                <Reveal>
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        {/* Dónde */}
                        <div style={{ flex: 1 }}>
                            <p className="serif" style={{ fontStyle: 'italic', fontSize: '1.15rem', fontWeight: 600, textAlign: 'left', marginBottom: '0.25rem' }}>
                                ¿Dónde?
                            </p>
                            <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'left' }}>
                                Samariwasi AirPort hotel<br />
                                Yaruquí, calle Juan<br />
                                Montalvo y Antonio Sucre
                            </p>
                        </div>
                        {/* QR placeholder */}
                        <div style={{
                            flex: '0 0 90px',
                            border: '1px solid var(--ink)',
                            padding: '5px',
                            background: '#fff',
                        }}>
                            <div style={{
                                width: '100%', aspectRatio: '1',
                                background: 'repeating-conic-gradient(#000 0% 25%, #fff 0% 50%) 0 0 / 10px 10px',
                            }} />
                        </div>
                        {/* Night photo */}
                        <div style={{ flex: '0 0 36%' }}>
                            <img
                                src="/FOTO-LUGAR.jpg"
                                alt="Lugar"
                                style={{
                                    width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '4/3',
                                    borderRadius: '2px', border: '1px solid rgba(26,18,8,0.2)',
                                    filter: 'sepia(80%) contrast(90%) brightness(90%) saturate(85%)'
                                }}
                            />
                        </div>
                    </div>
                </Reveal>

                {/*── When + Hour row ──*/}
                <Reveal>
                    <div style={{ display: 'flex', gap: '2.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                        <div>
                            <p className="serif" style={{ fontStyle: 'italic', fontSize: '1.15rem', fontWeight: 600, textAlign: 'left', marginBottom: '0.15rem' }}>
                                ¿Cuándo?
                            </p>
                            <p className="sans" style={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase', textAlign: 'left' }}>
                                24 de Abril 2025
                            </p>
                        </div>
                        <div>
                            <p className="serif" style={{ fontStyle: 'italic', fontSize: '1.15rem', fontWeight: 600, textAlign: 'left', marginBottom: '0.15rem' }}>
                                Hora
                            </p>
                            <p className="serif" style={{ fontStyle: 'italic', fontSize: '1rem', textAlign: 'left' }}>
                                3 pm a 12 am
                            </p>
                        </div>
                    </div>
                </Reveal>

                {/*── Dress code ──*/}
                <Reveal>
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                        {/* Color swatch pie */}
                        <div style={{
                            width: '58px', height: '58px', borderRadius: '50%', flexShrink: 0,
                            background: 'conic-gradient(#f5abd1 0deg 45deg, #f6b5f3 45deg 90deg, #c3aeeb 90deg 135deg, #8fdaff 135deg 180deg, #e8b496 180deg 225deg, #aabb7c 225deg 270deg, #8f8f8f 270deg 315deg, #9cdfd9 315deg 360deg)',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
                        }} />
                        <div>
                            <p className="serif" style={{ fontStyle: 'italic', fontSize: '1.1rem', fontWeight: 600, textAlign: 'left', marginBottom: '0.15rem' }}>
                                Dress code <strong className="sans" style={{ fontStyle: 'normal', letterSpacing: '1px' }}>formal</strong>
                            </p>
                            <p style={{ textAlign: 'left', color: 'var(--ink-mid)', fontSize: '0.84rem' }}>
                                No color blanco, marfil, hueso, perla ni rojo, no jeans.
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div style={{ textAlign: 'center', marginTop: '2.5rem', marginBottom: '1.5rem' }}>
                        <p className="script" style={{ fontSize: '2.8rem', lineHeight: 1.1, color: 'var(--ink)' }}>
                            Gracias por ser parte<br />de nuestra historia
                        </p>
                    </div>
                </Reveal>

                <hr className="rule-double" />

                {/*─────────────────────────────────────────
            TRANSPORTE
        ─────────────────────────────────────────*/}
                <Reveal>
                    <p className="section-label">Traslados</p>
                    <div style={{ padding: '1rem 0' }}>
                        <p>
                            Para su comodidad, contaremos con servicio de bus que saldrá desde <strong>Yaruquí</strong> con destino al sur de Quito a las <strong>12:00 AM (medianoche)</strong> del día del evento.
                        </p>
                    </div>
                </Reveal>

                <hr className="rule-double" />

                {/*─────────────────────────────────────────
            LARGE SEPARATOR PHOTO BEFORE RSVP
        ─────────────────────────────────────────*/}
                <Reveal>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <img
                            src="/FOTO-ANCHA-SEPARADOR.jpg"
                            alt="Separador"
                            style={{
                                width: '100%', height: 'auto', display: 'block', aspectRatio: '16/9',
                                objectFit: 'cover', borderRadius: '3px',
                                border: '1px solid rgba(26,18,8,0.3)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                filter: 'sepia(80%) contrast(90%) brightness(90%) saturate(85%)'
                            }}
                        />
                    </div>
                </Reveal>

                {/*─────────────────────────────────────────
            RSVP FORM
        ─────────────────────────────────────────*/}
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
            SONG REQUEST
        ─────────────────────────────────────────*/}
                <Reveal>
                    <div style={{ marginBottom: '2rem' }}>
                        <p className="section-label" style={{ marginBottom: '0.5rem' }}>Playlist Oficial</p>
                        <h2 className="gothic" style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', marginBottom: '0.5rem' }}>
                            ¿Qué canción no puede faltar?
                        </h2>
                        <p style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
                            Comparte el tema que no puede faltar esta noche. Lo añadiremos a la setlist especial.
                        </p>
                        <SongRequest guestId={guestId} />
                    </div>
                </Reveal>

                <hr className="rule-double" />

                {/*─────────────────────────────────────────
            FOOTER SIGNATURE
        ─────────────────────────────────────────*/}
                <Reveal>
                    <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
                        <span className="script" style={{ fontSize: '3rem' }}>Brenda &amp; David</span>
                        <p className="sans" style={{ fontSize: '0.65rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--ink-light)', marginTop: '0.5rem' }}>
                            24 · 04 · 2025 · Quito, Ecuador
                        </p>
                    </div>
                </Reveal>

            </div>
        </motion.div>
    )
}
