import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { account_type, name } = await req.json()

    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    if (account_type === 'vendor') {
      const { error } = await supabase.from('vendors').insert({
        id:                user.id,
        phone:             user.phone ?? '',
        business_name:     name,
        category:          [],
        state:             '',
        lga:               '',
        rating:            0,
        total_orders:      0,
        avg_response_mins: 0,
        is_verified:       false,
        is_pro:            false,
        commission_rate:   6,
        lang_preference:   'en',
      })
      if (error) throw error
    } else {
      const { error } = await supabase.from('buyers').insert({
        id:              user.id,
        phone:           user.phone ?? '',
        name,
        saved_addresses: [],
        account_type:    'retail',
        lang_preference: 'en',
      })
      if (error) throw error
    }

    return NextResponse.json({ success: true, account_type })

  } catch (err: any) {
    console.error('onboard error:', err)
    return NextResponse.json(
      { error: err.message || 'Onboarding failed' },
      { status: 500 }
    )
  }
}
