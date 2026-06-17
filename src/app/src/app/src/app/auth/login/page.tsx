'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { ArrowRight, Globe } from 'lucide-react'

function validateNigerianPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, '')
  return /^(0[789][01]\d{8}|234[789][01]\d{8})$/.test(cleaned)
}

function formatPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('0')) return '+234' + cleaned.slice(1)
  if (cleaned.startsWith('234')) return '+' + cleaned
  return phone
}

const schema = z.object({
  phone: z.string().refine(validateNigerianPhone, {
    message: 'Enter a valid Nigerian number e.g. 08012345678',
  }),
})
type FormData = z.infer<typeof schema>

const TEXT = {
  en: {
    tagline: 'Every vendor. One market.',
    label: 'Phone Number',
    placeholder: '08012345678',
    submit: 'Get OTP',
    sending: 'Sending...',
    note: 'New here? Your account is created automatically.',
    lang: 'Français',
  },
  fr: {
    tagline: 'Chaque vendeur. Un seul marché.',
    label: 'Numéro de Téléphone',
    placeholder: '08012345678',
    submit: 'Recevoir OTP',
    sending: 'Envoi...',
    note: 'Nouveau? Votre compte est créé automatiquement.',
    lang: 'English',
  },
}

export default function LoginPage() {
  const router = useRouter()
  const [lang, setLang] = useState<'en' | 'fr'>('en')
  const [loading, setLoading] = useState(false)
  const tx = TEXT[lang]

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    try {
      const phone = formatPhone(data.phone)
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Failed to send OTP')
      sessionStorage.setItem('vendora_phone', phone)
      router.push('/auth/verify')
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-dvh bg-vendora-dark flex flex-col">

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,200,130,0.12) 0%, transparent 70%)' }}
        />
      </div>

      <div className="flex justify-end p-4">
        <button
          onClick={() => setLang(l => l === 'en' ? 'fr' : 'en')}
          className="flex items-center gap-1.5 text-vendora-muted text-xs font-semibold
                     border border-vendora-border rounded-full px-3 py-1.5
                     hover:border-vendora-green hover:text-vendora-green transition-colors"
        >
          <Globe size={12} />
          {tx.lang}
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 pb-12 max-w-sm mx-auto w-full">

        <div className="mb-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-vendora-green flex items-center justify-center">
              <span className="text-black font-black text-lg leading-none">V</span>
            </div>
            <span className="text-2xl font-black tracking-tight">
              VEND<span className="text-vendora-green">O</span>RA
            </span>
          </div>
          <p className="text-vendora-muted text-sm">{tx.tagline}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-fade-up">

          <div>
            <label className="block text-xs font-semibold text-vendora-muted mb-2 uppercase tracking-wider">
              {tx.label}
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                <span className="text-base">🇳🇬</span>
                <div className="w-px h-4 bg-vendora-border" />
              </div>
              <input
                {...register('phone')}
                type="tel"
                inputMode="numeric"
                placeholder={tx.placeholder}
                className="w-full bg-vendora-card border border-vendora-border rounded-2xl
                           pl-16 pr-4 py-4 text-base font-mono text-white
                           placeholder-vendora-muted transition-colors"
              />
            </div>
            {errors.phone && (
              <p className="mt-2 text-xs text-red-400">{errors.phone.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-vendora-green text-black font-bold text-sm rounded-2xl
                       py-4 flex items-center justify-center gap-2
                       hover:bg-emerald-400 active:scale-95 transition-all
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                {tx.sending}
              </>
            ) : (
              <>
                {tx.submit}
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <p className="text-center text-vendora-muted text-xs leading-relaxed">
            {tx.note}
          </p>
        </form>

        <div className="mt-12 flex flex-wrap gap-2 justify-center animate-fade-up">
          {['🍱 Small Chops', '👗 Fashion', '🥤 Drinks', '💄 Beauty', '🎨 Crafts'].map(c => (
            <span key={c}
              className="text-xs text-vendora-muted border border-vendora-border rounded-full px-3 py-1">
              {c}
            </span>
          ))}
        </div>
      </div>
    </main>
  )
}
