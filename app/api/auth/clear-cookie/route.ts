import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    // Clear the user cookie
    const cookieStore = await cookies()
    cookieStore.delete('user')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error clearing cookie:', error)
    return NextResponse.json({ error: 'Failed to clear cookie' }, { status: 500 })
  }
} 