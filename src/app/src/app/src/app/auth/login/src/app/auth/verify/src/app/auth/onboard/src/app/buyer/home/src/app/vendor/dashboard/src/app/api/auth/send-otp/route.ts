import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json()
    if (!phone) {
      return NextResponse.json({ error: 'Phone number required' }, { status: 400 })
    }

    const TERMII_KEY = process.env.TERMII_API_KEY

    if (TERMII_KEY) {
      const termiiRes = await fetch('https://api.ng.termii.com/api/sms/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key:          TERMII_KEY,
          message_type:     'NUMERIC',
          to:               phone,
          from:             process.env.TERMII_SENDER_ID || 'N-Alert',
          channel:          'dnd',
          pin_attempts:     3,
          pin_time_to_live: 5,
          pin_length:       6,
          pin_placeholder:  '< 1234 >',
          message_text:     'Your VENDoRA code is < 1234 >. Valid 5 mins. Do not share.',
          pin_type:         'NUMERIC',
        }),
      })

      if (termiiRes.ok) {
        const data = await termiiRes.json()
        return NextResponse.json({ success: true, pin_id: data.pinId })
      }
    }

    const supabase = await createServerSupabaseClient()
    const { error } = await supabase.auth.signInWithOtp({
      phone,
      options: { shouldCreateUser: true },
    })

    if (error) throw error
    return NextResponse.json({ success: true })

  } catch (err: any) {
    console.error('send-otp error:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to send OTP' },
      { status: 500 }
    )
  }
}
