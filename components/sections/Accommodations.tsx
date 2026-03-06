export default function Accommodations() {
    return (
        <section className="section" id="accommodations" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🏨</div>

            <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '2rem',
                fontWeight: 600,
                color: 'var(--text-dark)',
                marginBottom: '0.4rem',
            }}>
                Alojamientos
            </h2>
            <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                color: 'var(--text-mid)',
                fontSize: '1.05rem',
                marginBottom: '1.75rem',
            }}>
                Opciones cerca del lugar
            </p>

            <div style={{
                padding: '1.5rem',
                border: '1.5px dashed var(--border)',
                borderRadius: '10px',
                background: '#fffdf8',
                maxWidth: '340px',
                margin: '0 auto',
            }}>
                <p style={{ fontFamily: 'var(--font-lato)', color: 'var(--text-mid)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    Pronto compartiremos opciones de alojamiento cerca del lugar del evento. ✨
                </p>
            </div>
        </section>
    )
}
