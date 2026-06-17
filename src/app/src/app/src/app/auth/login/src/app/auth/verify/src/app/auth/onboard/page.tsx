'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { ShoppingBag, Store, ArrowRight, ArrowLeft } from 'lucide-react'

const schema = z.object({
  account_type: z.enum(['buyer', 'vendor']),
  name: z.string().min(2, 'Name must be at least 2 characters'),
})
type FormData = z.infer<typeof schema>

export default function OnboardPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [loading, setLoading] = useState(false)
  const [selectedType, setSelectedType] = useState<'buyer' | 'vendor' | null>(null)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error)
      router.push(data.account_type === 'vendor' ? '/vendor/dashboard' : '/buyer/home')
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-dvh bg-vendora-dark flex flex-col">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,200,130,0.08) 0%, transparent 70%)' }} />
      </div>

      {step === 2 && (
        <div className="p-4">
          <button onClick={() => setStep(1)}
            className="flex items-center gap-2 text-vendora-muted text-sm hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
        </div>
      )}

      <div className="flex-1 flex flex-col justify-center px-6 pb-12 max-w-sm mx-auto w-full">

        {step === 1 && (
          <div className="animate-fade-up">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-vendora-green flex items-center justify-center">
                  <span className="text-black font-black text-sm">V</span>
                </div>
                <span className="font-black text-lg">VEND<span className="text-vendora-green">O</span>RA</span>
              </div>
              <h1 className="text-2xl font-black mb-2">Welcome! 👋</h1>
              <p className="text-vendora-muted text-sm">How are you joining VENDoRA?</p>
            </div>

            <div className="space-y-3">
              {[
                {
                  type: 'buyer' as const,
                  icon: <ShoppingBag size={22} />,
                  title: "I'm a Buyer",
                  desc: 'Order food, fashion & more from local vendors',
                  color: 'text-vendora-blue bg-vendora-blue/10',
                },
                {
                  type: 'vendor' as const,
                  icon: <Store size={22} />,
                  title: "I'm a Vendor",
                  desc: 'Sell your products — small chops, fashion & more',
                  color: 'text-vendora-green bg-vendora-green/10',
                },
              ].map(opt => (
                <button
                  key={opt.type}
                  onClick={() => {
                    setSelectedType(opt.type)
                    setValue('account_type', opt.type)
                    setTimeout(() => setStep(2), 150)
                  }}
                  className="w-full text-left p-5 rounded-2xl border bg-vendora-card
                             border-vendora-border hover:border-gray-600 transition-all group"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${opt.color}`}>
                    {opt.icon}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm">{opt.title}</p>
                      <p className="text-vendora-muted text-xs mt-0.5">{opt.desc}</p>
                    </div>
                    <ArrowRight size={16} className="text-vendora-muted group-hover:text-white transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmit)} className="animate-fade-up space-y-6">
            <div>
              <div className="text-4xl mb-6">
                {selectedType === 'vendor' ? '🏪' : '🛍️'}
              </div>
              <h1 className="text-2xl font-black mb-2">
                {selectedType === 'vendor' ? 'Your shop name?' : "What's your name?"}
              </h1>
              <p className="text-vendora-muted text-sm">
                {selectedType === 'vendor'
                  ? 'Buyers will see this on your profile'
                  : 'How should we address you?'}
              </p>
            </div>

            <input type="hidden" {...register('account_type')} value={selectedType || ''} />

            <div>
              <input
                {...register('name')}
                type="text"
                autoFocus
                placeholder={selectedType === 'vendor' ? 'e.g. Mama Titi Small Chops' : 'e.g. Ibrahim Khalil'}
                className="w-full bg-vendora-card border border-vendora-border rounded-2xl
                           px-4 py-4 text-base text-white placeholder-vendora-muted transition-colors"
              />
              {errors.name && (
                <p className="mt-2 text-xs text-red-400">{errors.name.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-vendora-green text-black font-bold text-sm rounded-2xl
                         py-4 flex items-center justify-center gap-2
                         hover:bg-emerald-400 active:scale-95 transition-all disabled:opacity-60"
            >
              {loading
                ? <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                : <> Let's go! <ArrowRight size={16} /></>
              }
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
