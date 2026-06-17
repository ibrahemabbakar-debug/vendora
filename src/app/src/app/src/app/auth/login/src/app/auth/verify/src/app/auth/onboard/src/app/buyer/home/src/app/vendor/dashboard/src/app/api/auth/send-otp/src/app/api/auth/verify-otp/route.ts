import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { phone, token } = await req.json()

    if (!phone || !token) {
      return NextResponse.json(
        { error: 'Phone and token required' },
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    })

    if (error) throw error
    if (!data.user) throw new Error('Verification failed')

    const { data: vendorProfile } = await supabase
      .from('vendors')
      .select('id')
      .eq('id', data.user.id)
      .single()

    const { data: buyerProfile } = await supabase
      .from('buyers')
      .select('id, account_type')
      .eq('id', data.user.id)
      .single()

    const is_new_user  = !vendorProfile && !buyerProfile
    const account_type = vendorProfile ? 'vendor' : buyerProfile ? 'buyer' : null

    return NextResponse.json({ success: true, is_new_user, account_type })

  } catch (err: any) {
    console.error('verify-otp error:', err)
    return NextResponse.json(
      { error: err.message || 'Invalid OTP. Try again.' },
      { status: 400 }
    )
  }
}
