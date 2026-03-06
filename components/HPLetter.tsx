'use client'

import React from 'react'
import { motion } from 'framer-motion'
import RSVPForm from './RSVPForm'
import SongRequest from './SongRequest'

// Reveal animation for newspaper sections
function Reveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay }}
        >
            {children}
        </motion.div>
    )
}

export default function HPLetter({ guestName, guestId, hasRsvp, rsvpAttending }: any) {
    return (
        <motion.div
            className="page-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
        >
            {/* Container simulating parchment padding */}
            <div style={{ padding: '3rem 2.5rem', position: 'relative' }}>

                {/* Top corner script */}
                <div style={{ position: 'absolute', top: '2.5rem', right: '2.5rem', border: '1px solid var(--border-dark)', padding: '0.5rem 1rem' }}>
                    <p className="font-script" style={{ fontSize: '1.8rem', color: 'var(--text-dark)', lineHeight: 1 }}>
                        Guarda la fecha
                    </p>
                </div>

                {/* Vintage corner flourishes (CSS approximations) */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', fontSize: '2rem', color: 'var(--text-light)', opacity: 0.6 }}>❦</div>
                <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', fontSize: '2rem', color: 'var(--text-light)', opacity: 0.6, transform: 'rotate(180deg)' }}>❦</div>

                {/* Hero typography */}
                <Reveal>
                    <div style={{ marginTop: '5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <h1 className="font-gothic" style={{ fontSize: 'clamp(3.5rem, 12vw, 5rem)', lineHeight: 0.85, textTransform: 'lowercase', letterSpacing: '0.05em' }}>
                            Nos vemos
                        </h1>
                        <h1 className="font-gothic" style={{ fontSize: 'clamp(3.5rem, 12vw, 5rem)', lineHeight: 0.85, textTransform: 'lowercase', letterSpacing: '0.05em', marginLeft: '2rem' }}>
                            el 24
                        </h1>
                        <h1 className="font-gothic" style={{ fontSize: 'clamp(3.5rem, 12vw, 5rem)', lineHeight: 0.85, textTransform: 'lowercase', letterSpacing: '0.05em', marginRight: '2rem' }}>
                            de Abril
                        </h1>
                    </div>
                </Reveal>

                <hr className="hr-editorial" />

                {/* Exclusiva strip */}
                <Reveal>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                        <div style={{ background: 'var(--bg-dark)', color: 'var(--bg-parchment)', padding: '1rem 1.5rem', letterSpacing: '4px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', flexShrink: 0 }}>
                            EXCLUSIVA
                        </div>
                        <p className="font-sans" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Hay momentos en la vida que son especiales, pero compartirlos con quienes amamos los hace inolvidables. Por eso queremos que seas parte de esta pequeña y muy íntima celebración del amor que nos tenemos.
                        </p>
                    </div>
                </Reveal>

                <hr className="hr-editorial" />

                {/* INVITATION TITLE */}
                <Reveal>
                    <h2 className="font-serif" style={{ textAlign: 'center', fontSize: '1.4rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '2rem', fontWeight: 400 }}>
                        TE INVITAMOS A NUESTRA BODA
                    </h2>

                    {/* Guest Name inserted here uniquely */}
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <span className="font-script" style={{ fontSize: '2.5rem', color: 'var(--gold-accent)' }}>
                            {guestName}
                        </span>
                    </div>
                </Reveal>

                {/* 2-Column Story */}
                <Reveal>
                    <div className="news-layout">
                        <div className="news-col" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                            <p style={{ marginBottom: '1rem' }}>
                                Nuestra historia comenzó un 24 de abril de 2018, casi sin imaginar que ese día marcaría el inicio del viaje más hermoso de nuestras vidas.
                            </p>
                            <p style={{ marginBottom: '1rem' }}>
                                El 17 de septiembre de 2022, frente al mar y con el sonido de las olas como testigo, ya nos habíamos dicho "sí" a una vida juntos, prometiéndonos amor, paciencia, respeto y complicidad.
                            </p>
                            <p>
                                Elegimos esta fecha tan significativa para dar el siguiente paso al celebrar nuestro octavo aniversario, con la certeza de haber encontrado el uno en el otro nuestro lugar seguro, nuestro refugio, nuestro hogar.
                            </p>
                        </div>
                        <div className="news-col">
                            <div style={{ width: '100%', aspectRatio: '4/3', background: '#ccc', position: 'relative', overflow: 'hidden' }}>
                                {/* Photo Placeholder */}
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'rgba(0,0,0,0.2)' }}>
                                    📸
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <p className="font-sans" style={{ fontSize: '0.9rem', lineHeight: 1.6, marginTop: '1.5rem' }}>
                        Queremos que solo quienes verdaderamente han sido parte esencial de nuestro camino, quienes han reído con nosotros, nos han sostenido y han sido testigos de nuestra historia individual y como pareja nos acompañen en este momento tan especial.
                    </p>
                    <p className="font-sans" style={{ fontSize: '0.9rem', lineHeight: 1.6, marginTop: '1rem' }}>
                        Tenerlos a nuestro lado hará aún más significativo este día extraordinario para nosotros.
                    </p>
                </Reveal>

                <hr className="hr-editorial-double" />

                {/* BRENDA & DAVID & Event info */}
                <Reveal>
                    <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative' }}>
                        <h1 className="font-script" style={{ fontSize: 'clamp(4rem, 15vw, 6rem)', lineHeight: 1 }}>
                            Brenda &amp; David
                        </h1>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="news-layout" style={{ marginBottom: '2rem' }}>
                        <div className="news-col">
                            <div style={{ width: '100%', aspectRatio: '3/4', background: '#ccc', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'rgba(0,0,0,0.2)' }}>
                                    📸
                                </div>
                            </div>
                        </div>
                        <div className="news-col" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                            <p style={{ marginBottom: '1rem' }}>
                                Nuestra boda no será una celebración tradicional, será una experiencia pensada para vivirla juntos, paso a paso. Nos veremos en Yaruquí, para comenzar la tarde en un ambiente cálido y relajado; por eso, el primer outfit será casual (la ropa que te guste), ideal para compartir risas, karaoke, billar, bebidas y bocaditos mientras el sol nos acompaña.
                            </p>
                            <p style={{ marginBottom: '1rem' }}>
                                Si el clima lo permite y lo deseas, podrás cambiar a un segundo outfit: terno de baño, para disfrutar de la piscina y seguir celebrando bajo el cielo abierto.
                            </p>
                            <p>
                                Y cuando llegue la noche, los invitamos a transformar la energía y vestir su mejor atuendo formal para ser testigos del momento más especial: nuestra ceremonia de matrimonio y la fiesta donde celebraremos el amor que nos une.
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <h3 className="font-serif" style={{ fontSize: '1rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--text-light)' }}>
                        INFORMACIÓN
                    </h3>
                    <hr className="hr-editorial" style={{ margin: '0 0 1.5rem 0' }} />
                </Reveal>

                <Reveal>
                    <div className="news-layout" style={{ alignItems: 'flex-start' }}>
                        <div className="news-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <h4 className="font-serif" style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '0.2rem' }}>¿Dónde?</h4>
                                <p className="font-serif" style={{ fontSize: '1rem', fontStyle: 'italic' }}>Samariwasi AirPort hotel</p>
                                <p className="font-serif" style={{ fontSize: '1rem', fontStyle: 'italic' }}>Yaruquí, calle Juan Montalvo y Antonio Sucre</p>
                            </div>

                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <div>
                                    <h4 className="font-serif" style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '0.2rem' }}>¿Cuándo?</h4>
                                    <p className="font-sans" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>24 DE ABRIL 2025</p>
                                </div>
                                <div>
                                    <h4 className="font-serif" style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '0.2rem' }}>Hora</h4>
                                    <p className="font-serif" style={{ fontSize: '1rem', fontStyle: 'italic' }}>3 pm a 12 am</p>
                                </div>
                            </div>

                            <div>
                                <p className="font-serif" style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>Dress code <strong className="font-sans" style={{ fontSize: '1.1rem', fontStyle: 'normal', letterSpacing: '1px' }}>formal</strong></p>

                                {/* Visual palette + text */}
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'conic-gradient(#555 0 90deg, #ccc 90deg 180deg, #5b733b 180deg 270deg, #000 270deg 360deg)' }} />
                                    <p className="font-serif" style={{ fontSize: '0.9rem', fontStyle: 'italic', flex: 1 }}>
                                        No color blanco, marfil, hueso, perla ni rojo, no jeans.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="news-col" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <div style={{ border: '1px solid var(--border-dark)', padding: '0.5rem', background: '#fff', width: '160px', aspectRatio: '1/1', position: 'relative' }}>
                                {/* QR Placeholder */}
                                <div style={{ width: '100%', height: '100%', background: 'repeating-linear-gradient(45deg, #000, #000 10px, #fff 10px, #fff 20px)' }}></div>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <hr className="hr-editorial-double" />

                {/* RSVP & SONGS */}
                <Reveal>
                    <div style={{ background: 'rgba(255,255,255,0.4)', padding: '2rem 1.5rem', borderRadius: '4px', border: '1px dashed var(--border-dark)', marginBottom: '2rem' }}>
                        <h4 className="font-serif" style={{ textAlign: 'center', fontSize: '1.4rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>Confirma tu asistencia</h4>
                        <RSVPForm guestId={guestId} initialRsvp={hasRsvp ? rsvpAttending : null} />
                    </div>
                </Reveal>

                <Reveal>
                    <div style={{ background: 'rgba(255,255,255,0.4)', padding: '2rem 1.5rem', borderRadius: '4px', border: '1px dashed var(--border-dark)' }}>
                        <h4 className="font-serif" style={{ textAlign: 'center', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>Playlist Oficial</h4>
                        <p className="font-sans" style={{ textAlign: 'center', fontSize: '0.85rem', marginBottom: '1.5rem' }}>¿Qué canción no puede faltar?</p>
                        <SongRequest guestId={guestId} />
                    </div>
                </Reveal>

            </div>
        </motion.div>
    )
}
