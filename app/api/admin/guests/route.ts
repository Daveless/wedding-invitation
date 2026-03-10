import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServiceClient } from '@/lib/supabase'

export async function POST(request: Request) {
    // Use Next.js cookie API (handles URL decoding automatically)
    const cookieStore = cookies()
    const session = cookieStore.get('admin_session')?.value

    if (!session || session !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name } = await request.json()
    if (!name?.trim()) {
        return NextResponse.json({ error: 'Name required' }, { status: 400 })
    }

    const supabase = createServiceClient()
    const { data, error } = await supabase
        .from('guests')
        .insert({ name: name.trim() })
        .select()
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ guest: data })
}

export async function DELETE(request: Request) {
    const cookieStore = cookies()
    const session = cookieStore.get('admin_session')?.value

    if (!session || session !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { id } = await request.json()
        if (!id) {
            return NextResponse.json({ error: 'Guest ID required' }, { status: 400 })
        }

        const supabase = createServiceClient()
        const { error } = await supabase
            .from('guests')
            .delete()
            .eq('id', id)

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (e: any) {
        return NextResponse.json({ error: e.message || 'Error deleting guest' }, { status: 500 })
    }
}
