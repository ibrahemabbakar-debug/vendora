'use client'

import { Search, Bell, ShoppingCart, Home, Grid, Heart, User } from 'lucide-react'

const CATEGORIES = [
  { emoji: '🍱', label: 'Small Chops' },
  { emoji: '🍲', label: 'Food' },
  { emoji: '🥤', label: 'Drinks' },
  { emoji: '👗', label: 'Fashion' },
  { emoji: '💄', label: 'Beauty' },
  { emoji: '🎨', label: 'Crafts' },
]

const VENDORS = [
  { id: '1', name: "Mama Titi's Kitchen",  category: 'Small Chops', rating: 4.9, orders: 234, state: 'Lagos', emoji: '🍱', from: 2500,  verified: true,  flash: true },
  { id: '2', name: "Ade Fashion House",    category: 'Fashion',      rating: 4.7, orders: 89,  state: 'Abuja', emoji: '👗', from: 5000,  verified: true,  flash: false },
  { id: '3', name: "GlowUp Beauty",        category: 'Beauty',       rating: 4.8, orders: 156, state: 'Lagos', emoji: '💄', from: 3000,  verified: false, flash: false },
]

export default function BuyerHomePage() {
  return (
    <main className="min-h-dvh bg-vendora-dark pb-24">

      <div className="sticky top-0 z-50 bg-vendora-dark/95 backdrop-blur-md border-b border-vendora-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-vendora-muted text-xs">Good day 👋</p>
            <p className="font-black text-sm tracking-tight">
              VEND<span className="text-vendora-green">O</span>RA
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative">
              <Bell size={20} className="text-vendora-muted" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-vendora-green rounded-full" />
            </button>
            <button>
              <ShoppingCart size={20} className="text-vendora-muted" />
            </button>
          </div>
        </div>

        <div className="px-4 pb-3">
          <div className="flex items-center gap-3 bg-vendora-card border border-vendora-border rounded-2xl px-4 py-3">
            <Search size={15} className="text-vendora-muted flex-shrink-0" />
            <input
              type="search"
              placeholder="Search vendors, food, fashion..."
              className="flex-1 bg-transparent text-sm text-white placeholder-vendora-muted outline-none"
            />
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-6">

        <div className="relative overflow-hidden rounded-2xl p-4"
          style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.15) 0%, rgba(255,107,107,0.15) 100%)', border: '1px solid rgba(245,166,35,0.25)' }}>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-vendora-amber uppercase tracking-wider">
                ⚡ Flash Sale Live
              </span>
              <p className="font-black text-xl mt-1">Up to 40% OFF</p>
              <p className="text-vendora-muted text-xs mt-0.5">Ends in 02:34:17</p>
            </div>
            <span className="text-5xl">🍱</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-black text-sm">Categories</h2>
            <button className="text-vendora-green text-xs font-semibold">See all</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map(cat => (
              <button key={cat.label} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-vendora-card border border-vendora-border
                                flex items-center justify-center text-2xl
                                hover:border-vendora-green transition-colors active:scale-95">
                  {cat.emoji}
                </div>
                <span className="text-xs text-vendora-muted font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-black text-sm">Trending Near You</h2>
            <button className="text-vendora-green text-xs font-semibold">See all</button>
          </div>
          <div className="space-y-3">
            {VENDORS.map(v => (
              <button key={v.id}
                className="w-full text-left bg-vendora-card border border-vendora-border
                           rounded-2xl p-4 flex items-center gap-4
                           hover:border-gray-600 active:scale-99 transition-all">
                <div className="w-16 h-16 rounded-xl bg-vendora-border flex items-center
                                justify-center text-3xl flex-shrink-0">
                  {v.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="font-bold text-sm truncate">{v.name}</p>
                    {v.verified && <span className="text-vendora-green text-xs flex-shrink-0">✓</span>}
                    {v.flash && (
                      <span className="text-xs bg-vendora-amber/15 text-vendora-amber
                                       px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0">
                        ⚡
                      </span>
                    )}
                  </div>
                  <p className="text-vendora-muted text-xs mb-2">{v.category} · {v.state}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-yellow-400">⭐ {v.rating}</span>
                    <span className="text-xs text-vendora-muted">{v.orders} orders</span>
                    <span className="text-xs text-vendora-green font-semibold">
                      From ₦{v.from.toLocaleString()}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-vendora-dark/95 backdrop-blur-md
                      border-t border-vendora-border safe-bottom">
        <div className="flex items-center justify-around py-3">
          {[
            { icon: <Home size={20} />,        label: 'Home',    active: true },
            { icon: <Grid size={20} />,         label: 'Browse',  active: false },
            { icon: <Heart size={20} />,        label: 'Saved',   active: false },
            { icon: <User size={20} />,         label: 'Account', active: false },
          ].map(item => (
            <button key={item.label}
              className={`flex flex-col items-center gap-1 px-4 transition-colors
                          ${item.active ? 'text-vendora-green' : 'text-vendora-muted hover:text-white'}`}>
              {item.icon}
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </main>
  )
}
