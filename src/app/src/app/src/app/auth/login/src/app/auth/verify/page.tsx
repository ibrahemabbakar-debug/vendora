'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { ArrowLeft, RotateCcw } from 'lucide-react'

export default function VerifyPage() {
  const router = useRouter()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [phone, setPhone] = useState('')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const p = sessionStorage.getItem('vendora_phone')
    if (!p) { router.replace('/auth/login'); return }
    setPhone(p)
    inputRefs.current[0]?.focus()
  }, [router])

  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setInterval(() => setResendTimer(s => s - 1), 1000)
    return () => clearInterval(t)
  }, [resendTimer])

  function handleInput(idx: number, val: string) {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[idx] = val.slice(-1)
    setOtp(next)
    if (val && idx < 5) inputRefs.current[idx + 1]?.focus()
    if (next.every(d => d) && next.join('').length === 6) verifyOtp(next.join(''))
  }

  function handleKeyDown(idx: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0)
      inputRefs.current[idx - 1]?.focus()
  }

  function handlePaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setOtp(pasted.split(''))
      verifyOtp(pasted)
    }
  }

  async function verifyOtp(code: string) {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, token: code }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Invalid OTP')
      sessionStorage.removeItem('vendora_phone')
      if (result.is_new_user) router.push('/auth/onboard')
      else router.push(result.account_type === 'vendor' ? '/vendor/dashboard' : '/buyer/home')
    } catch (err: any) {
      toast.error(err.message)
      setOtp(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  async function resend() {
    if (resendTimer > 0) return
    try {
      await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      })
      toast.success('OTP resent!')
      setResendTimer(60)
      setOtp(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } catch { toast.error('Failed to resend') }
  }

  const masked = phone.replace(/(\+234)(\d{3})(\d+)(\d{4})/, '$1 $2 *** $4')

  return (
    <main className="min-h-dvh bg-vendora-dark flex flex-col">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,200,130,0.10) 0%, transparent 70%)' }} />
      </div>

      <div className="p-4">
        <button onClick={() => router.back()}
          className="flex items-center gap-2 text-vendora-muted text-sm hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 pb-12 max-w-sm mx-auto w-full">

        <div className="mb-10 animate-fade-up">
          <div className="w-14 h-14 rounded-2xl bg-vendora-card border border-vendora-border
                          flex items-center justify-center mb-6 text-2xl">
            📲
          </div>
          <h1 className="text-2xl font-black mb-2">Check your phone</h1>
          <p className="text-vendora-muted text-sm leading-relaxed">
            We sent a 6-digit code to<br />
            <span className="text-white font-mono font-semibold">{masked}</span>
          </p>
        </div>

        <div className="flex gap-2 justify-between mb-6 animate-fade-up">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={el => { inputRefs.current[i] = el }}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleInput(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className={`otp-input ${digit ? 'filled' : ''}`}
              disabled={loading}
            />
          ))}
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-2 py-3 text-vendora-muted text-sm">
            <span className="w-4 h-4 border-2 border-vendora-muted border-t-vendora-green rounded-full animate-spin" />
            Verifying...
          </div>
        )}

        <button
          onClick={resend}
          disabled={resendTimer > 0}
          className="flex items-center justify-center gap-2 text-sm font-semibold mt-2
                     text-vendora-muted hover:text-vendora-green transition-colors
                     disabled:opacity-40 disabled:cursor-not-allowed">
          <RotateCcw size={14} />
          {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
        </button>
      </div>
    </main>
  )
}
