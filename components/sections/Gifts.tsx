export default function Gifts() {
    return (
        <section className="section" id="gifts" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🎁</div>

            <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '2rem',
                fontWeight: 600,
                color: 'var(--text-dark)',
                marginBottom: '0.4rem',
            }}>
                Regalos
            </h2>
            <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                color: 'var(--text-mid)',
                fontSize: '1.05rem',
                marginBottom: '2rem',
            }}>
                Si deseas hacernos un detalle...
            </p>

            {/* Bank card */}
            <div style={{
                border: '1.5px solid var(--border)',
                borderRadius: '12px',
                overflow: 'hidden',
                maxWidth: '360px',
                margin: '0 auto 1.75rem',
            }}>
                {[
                    { label: 'Banco', value: '[Nombre del Banco]' },
                    { label: 'Cuenta', value: '[Número de cuenta]' },
                    { label: 'Titular', value: 'Brenda & David' },
                    { label: 'Tipo', value: '[Tipo de cuenta]' },
                ].map((field, i, arr) => (
                    <div key={field.label} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '0.85rem 1.25rem',
                        background: i % 2 === 0 ? '#fff' : '#fffdf8',
                        borderBottom: i < arr.length - 1 ? '1px solid rgba(184,147,90,0.1)' : 'none',
                    }}>
                        <span style={{ fontFamily: 'var(--font-lato)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-light)' }}>
                            {field.label}
                        </span>
                        <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem', color: 'var(--text-dark)', fontWeight: 500 }}>
                            {field.value}
                        </span>
                    </div>
                ))}
            </div>

            {/* Note */}
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.5rem',
                background: '#fffdf8',
                border: '1.5px solid var(--border)',
                borderRadius: '40px',
            }}>
                <span style={{ fontSize: '1.2rem' }}>💛</span>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: 'var(--text-mid)', fontSize: '1.05rem' }}>
                    Tu presencia es nuestro mayor regalo
                </p>
                <span style={{ fontSize: '1.2rem' }}>💛</span>
            </div>
        </section>
    )
}
