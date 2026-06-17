'use client'

import { Plus, TrendingUp, ShoppingBag, Star, Bell, Package, BarChart2, Settings } from 'lucide-react'

const STATS = [
  { label: 'Today',    value: '₦24,500', sub: '+12% vs yesterday', icon: '📈' },
  { label: 'Orders',   value: '8',        sub: '2 pending',          icon: '📦' },
  { label: 'Rating',   value: '4.9',      sub: '47 reviews',         icon: '⭐' },
  { label: 'Products', value: '12',       sub: '10 active',          icon: '🏪' },
]

const ORDERS = [
  { id: 'ORD001', item: 'Small Chops (50 pcs)', buyer: 'Fatima A.', amount: 15000, status: 'pending',   time: '2 min ago' },
  { id: 'ORD002', item: 'Spring Rolls (30 pcs)', buyer: 'Chidi O.',  amount: 9000,  status: 'confirmed', time: '15 min ago' },
  { id: 'ORD003', item: 'Puff Puff + Samosa',    buyer: 'Amaka N.', amount: 5500,  status: 'delivered', time: '1 hr ago' },
]

const STATUS_STYLES: Record<string, string> = {
  pending:   'bg-amber-500/15 text-amber-400',
  confirmed: 'bg-blue-500/15 text-blue-400',
  delivered: 'bg-emerald-500/15 text-emerald-400',
}

export default function VendorDashboardPage() {
  return (
    <main className="min-h-dvh bg-vendora-dark pb-24">

      <div className="sticky top-0 z-50 bg-vendora-dark/95 backdrop-blur-md border-b border-vendora-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-vendora-muted text-xs font-medium">Your Shop</p>
            <p className="font-black text-sm">Mama Titi's Kitchen 🍱</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative">
              <Bell size={20} className="text-vendora-muted" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-vendora-coral rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-vendora-green flex items-center justify-center">
              <span className="text-black font-black text-xs">MT</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-6">

        <div className="grid grid-cols-2 gap-3">
          {STATS.map(s => (
            <div key={s.label} className="bg-vendora-card border border-vendora-border rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-vendora-muted text-xs font-semibold uppercase tracking-wider">
                  {s.label}
                </span>
                <span className="text-lg">{s.icon}</span>
              </div>
              <p className="font-black text-xl mb-0.5">{s.value}</p>
              <p className="text-vendora-muted text-xs">{s.sub}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-black text-sm mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-vendora-green text-black rounded-2xl p-4 flex items-center gap-3
                               font-bold text-sm hover:bg-emerald-400 active:scale-95 transition-all">
              <Plus size={20} />
              Add Product
            </button>
            <button className="bg-vendora-card border border-vendora-border rounded-2xl p-4
                               flex items-center gap-3 font-bold text-sm
                               hover:border-gray-600 active:scale-95 transition-all">
              <span className="text-xl">⚡</span>
              Flash Sale
            </button>
            <button className="bg-vendora-card border border-vendora-border rounded-2xl p-4
                               flex items-center gap-3 font-bold text-sm
                               hover:border-gray-600 active:scale-95 transition-all">
              <TrendingUp size={20} className="text-vendora-blue" />
              Boost Shop
            </button>
            <button className="bg-vendora-card border border-vendora-border rounded-2xl p-4
                               flex items-center gap-3 font-bold text-sm
                               hover:border-gray-600 active:scale-95 transition-all">
              <span className="text-xl">🗓</span>
              Pre-Orders
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-black text-sm">Recent Orders</h2>
            <button className="text-vendora-green text-xs font-semibold">View all</button>
          </div>
          <div className="space-y-3">
            {ORDERS.map(order => (
              <div key={order.id}
                className="bg-vendora-card border border-vendora-border rounded-2xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{order.item}</p>
                    <p className="text-vendora-muted text-xs">{order.buyer} · {order.time}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ml-2 flex-shrink-0
                                   ${STATUS_STYLES[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-black text-vendora-green text-sm">
                    ₦{order.amount.toLocaleString()}
                  </span>
                  {order.status === 'pending' && (
                    <div className="flex gap-2">
                      <button className="text-xs bg-vendora-green text-black font-bold px-3 py-1.5 rounded-lg">
                        Accept
                      </button>
                      <button className="text-xs bg-vendora-coral/20 text-vendora-coral font-bold px-3 py-1.5 rounded-lg">
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-vendora-dark/95 backdrop-blur-md
                      border-t border-vendora-border safe-bottom">
        <div className="flex items-center justify-around py-3">
          {[
            { icon: <BarChart2 size={20} />,   label: 'Dashboard', active: true },
            { icon: <Package size={20} />,     label: 'Products',  active: false },
            { icon: <ShoppingBag size={20} />, label: 'Orders',    active: false },
            { icon: <Star size={20} />,        label: 'Reviews',   active: false },
            { icon: <Settings size={20} />,    label: 'Settings',  active: false },
          ].map(item => (
            <button key={item.label}
              className={`flex flex-col items-center gap-1 transition-colors
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
