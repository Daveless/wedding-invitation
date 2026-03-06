export default function Transportation() {
    return (
        <section className="section" id="transportation" style={{ textAlign: 'center', background: '#fafaf8' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🚌</div>

            <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '2rem',
                fontWeight: 600,
                color: 'var(--text-dark)',
                marginBottom: '0.4rem',
            }}>
                Traslados
            </h2>
            <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                color: 'var(--text-mid)',
                fontSize: '1.05rem',
                marginBottom: '2rem',
            }}>
                Te llevamos al evento
            </p>

            <div style={{
                border: '1.5px solid var(--border)',
                borderRadius: '12px',
                overflow: 'hidden',
                maxWidth: '380px',
                margin: '0 auto',
            }}>
                {[
                    { icon: '📍', label: 'Salida desde', value: 'Yaruqui' },
                    { icon: '🕗', label: 'Hora de salida', value: '8:00 AM' },
                    { icon: '🗓', label: 'Fecha', value: 'Viernes 24 de Abril de 2025' },
                    { icon: '📌', label: 'Destino', value: 'Sur de Quito' },
                ].map((item, i, arr) => (
                    <div key={item.label} style={{
                        display: 'flex', alignItems: 'center', gap: '0.875rem',
                        padding: '0.9rem 1.25rem',
                        background: i % 2 === 0 ? '#fff' : '#fffdf8',
                        borderBottom: i < arr.length - 1 ? '1px solid rgba(184,147,90,0.1)' : 'none',
                        textAlign: 'left',
                    }}>
                        <span style={{ fontSize: '1.4rem', flexShrink: 0, width: '2rem', textAlign: 'center' }}>{item.icon}</span>
                        <div>
                            <p style={{ fontFamily: 'var(--font-lato)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.1rem' }}>
                                {item.label}
                            </p>
                            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.05rem', color: 'var(--text-dark)' }}>
                                {item.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
