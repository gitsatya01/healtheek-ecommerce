import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()
    
    // Set the user cookie
    const cookieStore = await cookies()
    cookieStore.set('user', JSON.stringify(userData), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error setting cookie:', error)
    return NextResponse.json({ error: 'Failed to set cookie' }, { status: 500 })
  }
} 