'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { read, utils } from 'xlsx'

interface Guest {
    id: string
    name: string
    token: string
    created_at: string
}

interface RSVP {
    id: string
    guest_id: string
    attending: boolean
    comments: string | null
    submitted_at: string
    guests?: { name: string } | { name: string }[] | any
}

interface SongReq {
    id: string
    guest_id: string
    song: string
    type?: string
    submitted_at: string
    guests?: { name: string } | { name: string }[] | any
}

interface TransportReq {
    id: string
    guest_id: string
    needs_transport: boolean
    submitted_at: string
    guests?: { name: string } | { name: string }[] | any
}

interface AdminClientProps {
    guests: Guest[]
    rsvps: RSVP[]
    songs: SongReq[]
    transports: TransportReq[]
    rsvpMap: Record<string, boolean>
}

export default function AdminClient({ guests, rsvps, songs, transports, rsvpMap }: AdminClientProps) {
    const [activeTab, setActiveTab] = useState<'guests' | 'rsvp' | 'transport' | 'songs'>('guests')
    const [newName, setNewName] = useState('')
    const [adding, setAdding] = useState(false)
    const [localGuests, setLocalGuests] = useState<Guest[]>(guests)
    const [copied, setCopied] = useState<string | null>(null)
    const [addError, setAddError] = useState('')
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [importing, setImporting] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const defaultTemplate = "Hola \u2728\n¿Cómo estás?\n\nHoy me acordé de ti y quise escribirte.\nQuería compartirte algo y prefiero que lo descubras directamente aquí:\n\n[link]\n\n\uD83D\uDE01"
    const [whatsappMessage, setWhatsappMessage] = useState(defaultTemplate)
    const router = useRouter()

    useEffect(() => {
        const saved = localStorage.getItem('admin_whatsapp_template')
        if (saved) {
            setWhatsappMessage(saved)
        }
    }, [])

    const handleTemplateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value
        setWhatsappMessage(val)
        localStorage.setItem('admin_whatsapp_template', val)
    }

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev)

    const handleLogout = () => {
        document.cookie = 'admin_session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
        router.push('/admin/login')
    }

    const handleAddGuest = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newName.trim()) return
        setAdding(true)
        setAddError('')
        const res = await fetch('/api/admin/guests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName.trim() }),
        })
        if (res.ok) {
            const { guest } = await res.json()
            setLocalGuests(prev => [guest, ...prev])
            setNewName('')
        } else {
            const { error } = await res.json()
            setAddError(error || 'Error al agregar invitado')
        }
        setAdding(false)
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setImporting(true)
        setAddError('')
        try {
            const data = await file.arrayBuffer()
            const workbook = read(data)
            const firstSheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[firstSheetName]

            // Generate array of arrays
            const json: any[][] = utils.sheet_to_json(worksheet, { header: 1 })
            console.log('Parsed Excel JSON (bruto):', json)

            // Find the best column index that contains actual text (names) instead of just numbers (IDs)
            let bestColIndex = 0;
            if (json.length > 0) {
                const maxCols = Math.max(...json.map(row => row.length));
                for (let col = 0; col < maxCols; col++) {
                    const colData = json.map(row => row[col]).filter(val => val != null && String(val).trim() !== '');
                    // Check if this column has mostly non-numeric strings
                    const textCount = colData.filter(val => isNaN(Number(String(val).trim()))).length;
                    if (textCount > 0 && textCount > colData.length * 0.5) {
                        bestColIndex = col;
                        break;
                    }
                }
            }

            // Extract the detected column of each row, filtering empty and pure numbers
            const namesToImport = json
                .map(row => row[bestColIndex])
                .filter(name => name != null && String(name).trim().length > 0)
                .map(name => String(name).trim())
                .filter(name => isNaN(Number(name))) // Remove purely numeric rows (like "1", "2")

            console.log(`Nombres extraídos de la columna ${bestColIndex}:`, namesToImport)

            if (namesToImport.length === 0) {
                setAddError('El archivo no contiene nombres válidos en la primera columna.')
                setImporting(false)
                if (fileInputRef.current) fileInputRef.current.value = ''
                return
            }

            const newGuests: Guest[] = []
            // Process sequentially to be safe
            for (const name of namesToImport) {
                const res = await fetch('/api/admin/guests', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: name.trim() }),
                })
                if (res.ok) {
                    const { guest } = await res.json()
                    newGuests.push(guest)
                }
            }

            setLocalGuests(prev => [...newGuests.reverse(), ...prev])
            if (newGuests.length < namesToImport.length) {
                setAddError(`Se importaron ${newGuests.length} de ${namesToImport.length} invitados. Algunos fallaron.`)
            }

        } catch (err: any) {
            console.error('Error importing excel:', err)
            setAddError('Error al procesar el archivo Excel.')
        } finally {
            setImporting(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    const handleDeleteGuest = async (id: string, name: string) => {
        if (!window.confirm(`¿Seguro que deseas eliminar a ${name}? Esta acción no se puede deshacer y borrará también sus confirmaciones de asistencia y peticiones de canciones.`)) {
            return
        }

        setDeletingId(id)
        try {
            const res = await fetch('/api/admin/guests', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            })
            if (res.ok) {
                setLocalGuests(prev => prev.filter(g => g.id !== id))
            } else {
                const { error } = await res.json()
                alert(`Error al eliminar: ${error}`)
            }
        } catch (err) {
            console.error('Error deleting guest:', err)
            alert('Ocurrió un error al intentar eliminar al invitado.')
        } finally {
            setDeletingId(null)
        }
    }

    const copyText = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopied(id)
        setTimeout(() => setCopied(null), 2000)
    }

    const confirmedCount = rsvps.filter(r => r.attending).length
    const declinedCount = rsvps.filter(r => !r.attending).length
    const pendingCount = localGuests.length - rsvps.length

    const tabs = [
        { id: 'guests' as const, label: 'Invitados', count: localGuests.length },
        { id: 'rsvp' as const, label: 'Confirmaciones', count: rsvps.length },
        { id: 'transport' as const, label: 'Transporte', count: transports.length },
        { id: 'songs' as const, label: 'Playlist', count: songs.length },
    ]

    return (
        <div style={{ minHeight: '100vh', background: '#0f172a', fontFamily: "'Inter', system-ui, sans-serif", position: 'relative' }}>
            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40
                    }}
                />
            )}

            {/* Sidebar */}
            <div style={{ display: 'flex', minHeight: '100vh' }}>
                <aside style={{
                    width: '240px', background: '#0a1020',
                    borderRight: '1px solid rgba(201,168,76,0.15)',
                    display: 'flex', flexDirection: 'column',
                    padding: '0',
                    flexShrink: 0,
                    position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 50,
                    transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease',
                }}
                    className="admin-sidebar">
                    <style>{`
                        @media (min-width: 768px) {
                            .admin-sidebar {
                                position: static !important;
                                transform: translateX(0) !important;
                            }
                            .mobile-menu-btn {
                                display: none !important;
                            }
                        }
                    `}</style>
                    {/* Brand */}
                    <div style={{
                        padding: '1.5rem',
                        borderBottom: '1px solid rgba(201,168,76,0.15)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                            <svg width="18" height="18" viewBox="0 0 18 18">
                                <polygon points="9,1 11,6.5 17,6.5 12.5,10 14,17 9,13 4,17 5.5,10 1,6.5 7,6.5" fill="#c9a84c" />
                            </svg>
                            <span style={{ fontWeight: 700, color: '#c9a84c', fontSize: '0.95rem', letterSpacing: '0.05em' }}>
                                Brenda & David
                            </span>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', marginLeft: '1.6rem' }}>
                            Panel de Administración
                        </p>
                    </div>

                    {/* Nav */}
                    <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id)
                                    setIsSidebarOpen(false)
                                }}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '0.6rem 0.75rem',
                                    borderRadius: '6px',
                                    border: 'none',
                                    background: activeTab === tab.id ? 'rgba(201,168,76,0.12)' : 'transparent',
                                    color: activeTab === tab.id ? '#c9a84c' : 'rgba(255,255,255,0.55)',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    fontWeight: activeTab === tab.id ? 600 : 400,
                                    textAlign: 'left',
                                    transition: 'all 0.15s',
                                    width: '100%',
                                }}
                            >
                                <span>{tab.label}</span>
                                <span style={{
                                    background: activeTab === tab.id ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.08)',
                                    color: activeTab === tab.id ? '#c9a84c' : 'rgba(255,255,255,0.35)',
                                    borderRadius: '10px', padding: '0.05rem 0.45rem',
                                    fontSize: '0.72rem', fontWeight: 600,
                                }}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
                        <button
                            onClick={handleLogout}
                            style={{
                                width: '100%', padding: '0.6rem 0.75rem',
                                background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                                color: 'rgba(255,255,255,0.4)', borderRadius: '6px',
                                cursor: 'pointer', fontSize: '0.8rem', transition: 'all 0.15s',
                            }}
                            aria-label="Cerrar sesión"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </aside>

                {/* Main content */}
                <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {/* Top bar */}
                    <header style={{
                        padding: '1.25rem 2rem',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        background: '#0f172a',
                        display: 'flex', alignItems: 'center', gap: '1rem',
                    }}>
                        <button
                            className="mobile-menu-btn"
                            onClick={toggleSidebar}
                            style={{
                                background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                                color: '#fff', padding: '0.4rem 0.6rem', borderRadius: '4px', cursor: 'pointer'
                            }}
                        >
                            ☰
                        </button>
                        <h1 style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
                            {tabs.find(t => t.id === activeTab)?.label}
                        </h1>
                    </header>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 2rem 6rem 2rem' }}>

                        {/* ─── STATS (always visible) ─── */}
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                            {[
                                { label: 'Total invitados', value: localGuests.length, color: '#c9a84c' },
                                { label: 'Asistirán ✓', value: confirmedCount, color: '#4ade80' },
                                { label: 'No asisten ✗', value: declinedCount, color: '#f87171' },
                                { label: 'Sin respuesta', value: pendingCount, color: '#94a3b8' },
                            ].map(stat => (
                                <div key={stat.label} style={{
                                    background: '#1e293b',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    borderRadius: '10px',
                                    padding: '1rem 1.25rem',
                                    minWidth: '130px',
                                    flex: '1 1 120px',
                                }}>
                                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: stat.color, lineHeight: 1 }}>
                                        {stat.value}
                                    </div>
                                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ─── GUESTS TAB ─── */}
                        {activeTab === 'guests' && (
                            <div>
                                {/* WhatsApp Config */}
                                <div style={{
                                    background: '#1e293b',
                                    borderRadius: '10px',
                                    padding: '1.25rem 1.5rem',
                                    marginBottom: '1.5rem',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }}>
                                    <h2 style={{ color: '#f8fafc', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                                        Mensaje de WhatsApp
                                    </h2>
                                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginBottom: '1rem' }}>
                                        Este texto se usará al enviar el link. Usa <code>[link]</code> donde quieras que aparezca la URL.
                                    </p>
                                    <textarea
                                        value={whatsappMessage}
                                        onChange={handleTemplateChange}
                                        style={{
                                            width: '100%', minHeight: '120px',
                                            padding: '0.8rem', background: '#0f172a',
                                            border: '1px solid rgba(255,255,255,0.12)',
                                            borderRadius: '6px', color: '#f8fafc',
                                            fontSize: '0.875rem', outline: 'none',
                                            resize: 'vertical', fontFamily: 'inherit'
                                        }}
                                    />
                                </div>

                                {/* Add guest */}
                                <div style={{
                                    background: '#1e293b',
                                    borderRadius: '10px',
                                    padding: '1.25rem 1.5rem',
                                    marginBottom: '1.5rem',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }}>
                                    <h2 style={{ color: '#f8fafc', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem' }}>
                                        Agregar invitado
                                    </h2>
                                    <form onSubmit={handleAddGuest} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                        <input
                                            type="text"
                                            value={newName}
                                            onChange={e => setNewName(e.target.value)}
                                            placeholder="Nombre completo del invitado"
                                            aria-label="Nombre del nuevo invitado"
                                            style={{
                                                flex: 1, minWidth: '200px',
                                                padding: '0.6rem 0.875rem',
                                                background: '#0f172a',
                                                border: '1px solid rgba(255,255,255,0.12)',
                                                borderRadius: '6px',
                                                color: '#f8fafc',
                                                fontSize: '0.875rem',
                                                outline: 'none',
                                            }}
                                        />
                                        <button
                                            type="submit"
                                            disabled={adding || !newName.trim()}
                                            aria-label="Agregar invitado"
                                            style={{
                                                padding: '0.6rem 1.25rem',
                                                background: adding || !newName.trim() ? '#334155' : '#c9a84c',
                                                color: adding || !newName.trim() ? 'rgba(255,255,255,0.3)' : '#0a1020',
                                                border: 'none', borderRadius: '6px',
                                                fontWeight: 600, fontSize: '0.875rem',
                                                cursor: adding || !newName.trim() ? 'not-allowed' : 'pointer',
                                                whiteSpace: 'nowrap',
                                                transition: 'all 0.15s',
                                            }}
                                        >
                                            {adding ? 'Agregando...' : '+ Agregar'}
                                        </button>
                                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                                            <input
                                                type="file"
                                                accept=".xlsx, .xls, .csv"
                                                style={{ display: 'none' }}
                                                ref={fileInputRef}
                                                onChange={handleFileUpload}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                disabled={importing}
                                                style={{
                                                    padding: '0.6rem 1.25rem',
                                                    background: 'transparent',
                                                    color: importing ? 'rgba(255,255,255,0.3)' : '#f8fafc',
                                                    border: '1px solid rgba(255,255,255,0.2)',
                                                    borderRadius: '6px',
                                                    fontWeight: 500, fontSize: '0.85rem',
                                                    cursor: importing ? 'not-allowed' : 'pointer',
                                                    whiteSpace: 'nowrap',
                                                    transition: 'all 0.15s',
                                                }}
                                            >
                                                {importing ? 'Importando...' : '📄 Importar Excel'}
                                            </button>
                                        </div>
                                    </form>
                                    {addError && (
                                        <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.5rem' }}>{addError}</p>
                                    )}
                                </div>

                                {/* Guests table */}
                                <div style={{
                                    background: '#1e293b',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                            <thead>
                                                <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                                                    {['Nombre', 'Estado RSVP', 'Link de invitación', 'Copiar Msj', 'Fecha', ''].map((h, idx) => (
                                                        <th key={h} style={{
                                                            padding: '0.75rem 1rem',
                                                            textAlign: 'left',
                                                            color: 'rgba(255,255,255,0.4)',
                                                            fontWeight: 500,
                                                            fontSize: '0.72rem',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.07em',
                                                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                                                        }}>
                                                            {h}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {localGuests.map((g, i) => {
                                                    const link = `${typeof window !== 'undefined' ? window.location.origin : ''}/invite/${g.token}`
                                                    const hasRsvp = g.id in rsvpMap
                                                    return (
                                                        <tr
                                                            key={g.id}
                                                            style={{ borderBottom: i < localGuests.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                                                        >
                                                            <td style={{ padding: '0.875rem 1rem', color: '#f1f5f9', fontWeight: 500 }}>
                                                                {g.name}
                                                            </td>
                                                            <td style={{ padding: '0.875rem 1rem' }}>
                                                                {hasRsvp ? (
                                                                    <span style={{
                                                                        display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                                                        padding: '0.2rem 0.6rem',
                                                                        borderRadius: '20px',
                                                                        background: rsvpMap[g.id] ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)',
                                                                        color: rsvpMap[g.id] ? '#4ade80' : '#f87171',
                                                                        fontSize: '0.78rem', fontWeight: 500,
                                                                    }}>
                                                                        {rsvpMap[g.id] ? '✓ Asistirá' : '✗ No asiste'}
                                                                    </span>
                                                                ) : (
                                                                    <span style={{
                                                                        display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                                                        padding: '0.2rem 0.6rem',
                                                                        borderRadius: '20px',
                                                                        background: 'rgba(148,163,184,0.1)',
                                                                        color: 'rgba(148,163,184,0.6)',
                                                                        fontSize: '0.78rem',
                                                                    }}>
                                                                        Pendiente
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td style={{ padding: '0.875rem 1rem' }}>
                                                                <button
                                                                    onClick={() => copyText(link, 'link-' + g.id)}
                                                                    aria-label={`Copiar link de ${g.name}`}
                                                                    style={{
                                                                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                                                        padding: '0.3rem 0.7rem',
                                                                        background: copied === 'link-' + g.id ? 'rgba(74,222,128,0.12)' : 'rgba(201,168,76,0.1)',
                                                                        border: `1px solid ${copied === 'link-' + g.id ? 'rgba(74,222,128,0.3)' : 'rgba(201,168,76,0.25)'}`,
                                                                        borderRadius: '5px',
                                                                        color: copied === 'link-' + g.id ? '#4ade80' : '#c9a84c',
                                                                        fontSize: '0.78rem',
                                                                        cursor: 'pointer',
                                                                        transition: 'all 0.15s',
                                                                        fontWeight: 500,
                                                                    }}
                                                                >
                                                                    {copied === 'link-' + g.id ? '✓ Copiado' : '🔗 Copiar link'}
                                                                </button>
                                                            </td>
                                                            <td style={{ padding: '0.875rem 1rem' }}>
                                                                <button
                                                                    onClick={() => copyText(whatsappMessage.replace('[link]', link), 'msg-' + g.id)}
                                                                    aria-label={`Copiar mensaje de ${g.name}`}
                                                                    style={{
                                                                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                                                        padding: '0.3rem 0.7rem',
                                                                        background: copied === 'msg-' + g.id ? 'rgba(74,222,128,0.12)' : 'rgba(37, 211, 102, 0.1)',
                                                                        border: `1px solid ${copied === 'msg-' + g.id ? 'rgba(74,222,128,0.3)' : 'rgba(37, 211, 102, 0.3)'}`,
                                                                        borderRadius: '5px',
                                                                        color: copied === 'msg-' + g.id ? '#4ade80' : '#25D366',
                                                                        fontSize: '0.78rem',
                                                                        cursor: 'pointer',
                                                                        transition: 'all 0.15s',
                                                                        fontWeight: 500,
                                                                    }}
                                                                >
                                                                    {copied === 'msg-' + g.id ? '✓ Copiado' : '💬 Copiar'}
                                                                </button>
                                                            </td>
                                                            <td style={{ padding: '0.875rem 1rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}>
                                                                {new Date(g.created_at).toLocaleDateString('es-EC', { day: '2-digit', month: 'short' })}
                                                            </td>
                                                            <td style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>
                                                                <button
                                                                    onClick={() => handleDeleteGuest(g.id, g.name)}
                                                                    disabled={deletingId === g.id}
                                                                    aria-label={`Eliminar a ${g.name}`}
                                                                    style={{
                                                                        background: 'none',
                                                                        border: 'none',
                                                                        color: deletingId === g.id ? 'rgba(248,113,113,0.3)' : '#f87171',
                                                                        cursor: deletingId === g.id ? 'not-allowed' : 'pointer',
                                                                        fontSize: '1rem',
                                                                        padding: '0.4rem',
                                                                        opacity: 0.8,
                                                                        transition: 'opacity 0.15s',
                                                                    }}
                                                                    onMouseOver={e => e.currentTarget.style.opacity = '1'}
                                                                    onMouseOut={e => e.currentTarget.style.opacity = '0.8'}
                                                                >
                                                                    {deletingId === g.id ? '⏳' : '🗑️'}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                                {localGuests.length === 0 && (
                                                    <tr>
                                                        <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>
                                                            No hay invitados aún. Agrega el primero arriba.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ─── RSVP TAB ─── */}
                        {activeTab === 'rsvp' && (
                            <div style={{
                                background: '#1e293b',
                                borderRadius: '10px',
                                border: '1px solid rgba(255,255,255,0.06)',
                                overflow: 'hidden',
                            }}>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                        <thead>
                                            <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                                                {['Invitado', '¿Asiste?', 'Comentarios', 'Fecha de respuesta'].map(h => (
                                                    <th key={h} style={{
                                                        padding: '0.75rem 1rem',
                                                        textAlign: 'left',
                                                        color: 'rgba(255,255,255,0.4)',
                                                        fontWeight: 500,
                                                        fontSize: '0.72rem',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.07em',
                                                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                                                    }}>
                                                        {h}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rsvps.map((r, i) => (
                                                <tr key={r.id} style={{ borderBottom: i < rsvps.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                                                    <td style={{ padding: '0.875rem 1rem', color: '#f1f5f9', fontWeight: 500 }}>
                                                        {(Array.isArray(r.guests) ? r.guests[0]?.name : r.guests?.name) || '—'}
                                                    </td>
                                                    <td style={{ padding: '0.875rem 1rem' }}>
                                                        <span style={{
                                                            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                                            padding: '0.2rem 0.65rem',
                                                            borderRadius: '20px',
                                                            background: r.attending ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)',
                                                            color: r.attending ? '#4ade80' : '#f87171',
                                                            fontSize: '0.78rem', fontWeight: 600,
                                                        }}>
                                                            {r.attending ? '✓ Sí' : '✗ No'}
                                                        </span>
                                                    </td>
                                                    <td style={{
                                                        padding: '0.875rem 1rem',
                                                        color: 'rgba(255,255,255,0.55)',
                                                        fontSize: '0.82rem',
                                                        maxWidth: '240px',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}>
                                                        {r.comments || <span style={{ color: 'rgba(255,255,255,0.2)' }}>Sin comentarios</span>}
                                                    </td>
                                                    <td style={{ padding: '0.875rem 1rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}>
                                                        {new Date(r.submitted_at).toLocaleDateString('es-EC', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                                    </td>
                                                </tr>
                                            ))}
                                            {rsvps.length === 0 && (
                                                <tr>
                                                    <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>
                                                        Sin confirmaciones aún
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                        {/* ─── TRANSPORT TAB ─── */}
                        {activeTab === 'transport' && (
                            <div style={{
                                background: '#1e293b',
                                borderRadius: '10px',
                                border: '1px solid rgba(255,255,255,0.06)',
                                overflow: 'hidden',
                            }}>
                                {transports.length === 0 ? (
                                    <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>
                                        Nadie ha solicitado transporte aún
                                    </div>
                                ) : (
                                    <div>
                                        <div style={{ overflowX: 'auto' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                                <thead>
                                                    <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                                                        {['Invitado', '¿Transporte?', 'Fecha'].map(h => (
                                                            <th key={h} style={{
                                                                padding: '0.75rem 1rem',
                                                                textAlign: 'left',
                                                                color: 'rgba(255,255,255,0.4)',
                                                                fontWeight: 500,
                                                                fontSize: '0.72rem',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.07em',
                                                                borderBottom: '1px solid rgba(255,255,255,0.06)',
                                                            }}>
                                                                {h}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {transports.map((t, i) => (
                                                        <tr key={t.id} style={{ borderBottom: i < transports.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                                                            <td style={{ padding: '0.875rem 1rem', color: '#f1f5f9', fontWeight: 500 }}>
                                                                {(Array.isArray(t.guests) ? t.guests[0]?.name : t.guests?.name) || '—'}
                                                            </td>
                                                            <td style={{ padding: '0.875rem 1rem' }}>
                                                                <span style={{
                                                                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                                                    padding: '0.2rem 0.65rem',
                                                                    borderRadius: '20px',
                                                                    background: t.needs_transport ? 'rgba(96, 165, 250, 0.12)' : 'rgba(148,163,184,0.1)',
                                                                    color: t.needs_transport ? '#60a5fa' : 'rgba(148,163,184,0.6)',
                                                                    fontSize: '0.78rem', fontWeight: 600,
                                                                }}>
                                                                    {t.needs_transport ? '🚌 Sí' : '—'}
                                                                </span>
                                                            </td>
                                                            <td style={{ padding: '0.875rem 1rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}>
                                                                {new Date(t.submitted_at).toLocaleDateString('es-EC', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ─── SONGS TAB ─── */}
                        {activeTab === 'songs' && (
                            <div style={{
                                background: '#1e293b',
                                borderRadius: '10px',
                                border: '1px solid rgba(255,255,255,0.06)',
                                overflow: 'hidden',
                            }}>
                                {songs.length === 0 ? (
                                    <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>
                                        Sin canciones aún
                                    </div>
                                ) : (
                                    <div>
                                        {/* Header */}
                                        <div style={{
                                            padding: '1rem 1.5rem',
                                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        }}>
                                            <span style={{ fontSize: '1rem' }}>🎵</span>
                                            <span style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.9rem' }}>
                                                Setlist — {songs.length} canciones
                                            </span>
                                        </div>
                                        {/* Song rows */}
                                        {songs.map((s_item, i) => (
                                            <div
                                                key={s_item.id}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                                    padding: '0.875rem 1.5rem',
                                                    borderBottom: i < songs.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                                                }}
                                            >
                                                <span style={{
                                                    width: '28px', height: '28px', borderRadius: '50%',
                                                    background: 'rgba(201,168,76,0.1)',
                                                    border: '1px solid rgba(201,168,76,0.2)',
                                                    color: '#c9a84c',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '0.72rem', fontWeight: 700, flexShrink: 0,
                                                }}>
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                                <span style={{ color: '#f1f5f9', flex: 1, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    {s_item.song}
                                                    {s_item.type === 'dinner' ? (
                                                        <span style={{ fontSize: '0.65rem', background: 'rgba(244, 114, 182, 0.15)', color: '#f472b6', padding: '0.1rem 0.4rem', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>🍽️ Cena</span>
                                                    ) : (
                                                        <span style={{ fontSize: '0.65rem', background: 'rgba(96, 165, 250, 0.15)', color: '#60a5fa', padding: '0.1rem 0.4rem', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>🕺 Fiesta</span>
                                                    )}
                                                </span>
                                                <span style={{
                                                    color: 'rgba(255,255,255,0.3)',
                                                    fontSize: '0.78rem',
                                                    fontStyle: 'italic',
                                                    flexShrink: 0,
                                                }}>
                                                    {(Array.isArray(s_item.guests) ? s_item.guests[0]?.name : s_item.guests?.name) || '?'}
                                                </span>
                                                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.72rem', flexShrink: 0 }}>
                                                    {new Date(s_item.submitted_at).toLocaleDateString('es-EC', { day: '2-digit', month: 'short' })}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}
