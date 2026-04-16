import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Image, ShoppingBag, MessageSquare, Settings,
  TrendingUp, Eye, Heart, DollarSign, Plus, Upload, Edit2,
  Trash2, CheckCircle, Clock, AlertCircle, Star, Package,
  ChevronRight, BarChart2, Award, Leaf
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Mock data ──────────────────────────────────────────────── */
const ARTIST = {
  name: 'Amara Osei',
  handle: '@amara.recycled',
  location: 'Accra, Ghana',
  cert: 'SILVER',
  certLabel: 'ERA Certified – Level 2',
  joined: 'March 2024',
  avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face',
  bio: 'Sculptor working with reclaimed ocean plastic and industrial offcuts to create narrative installations.',
  balance: 4850,
  pendingPayout: 620,
}

const STATS = [
  { label: 'Total Sales', value: '€12,400', change: '+18%', icon: DollarSign, color: 'text-accent' },
  { label: 'Artworks Listed', value: '14', change: '+3 this month', icon: Image, color: 'text-gold' },
  { label: 'Total Views', value: '8,230', change: '+412 this week', icon: Eye, color: 'text-amber' },
  { label: 'Wishlist Saves', value: '341', change: '+29 this week', icon: Heart, color: 'text-rose-400' },
]

const ARTWORKS = [
  { id: '1', title: 'Ocean Archive I', material: 'Ocean Plastic', price: 1800, status: 'active', views: 342, saves: 28, gradient: 'from-teal-400 to-cyan-600' },
  { id: '2', title: 'Reclaimed Steel Study', material: 'Metal', price: 950, status: 'sold', views: 198, saves: 15, gradient: 'from-slate-400 to-zinc-600' },
  { id: '3', title: 'Textile Memory', material: 'Textile', price: 650, status: 'active', views: 271, saves: 22, gradient: 'from-amber-400 to-orange-600' },
  { id: '4', title: 'E-Waste Constellation', material: 'E-Waste', price: 2200, status: 'pending', views: 87, saves: 9, gradient: 'from-violet-400 to-purple-600' },
  { id: '5', title: 'Paper Landscape No.3', material: 'Paper', price: 480, status: 'active', views: 156, saves: 12, gradient: 'from-lime-400 to-green-600' },
]

const ORDERS = [
  { id: '#ERA-2041', artwork: 'Ocean Archive I', buyer: 'Sophie Müller', amount: 1800, date: 'Apr 12, 2026', status: 'shipped' },
  { id: '#ERA-1987', artwork: 'Reclaimed Steel Study', buyer: 'James Okafor', amount: 950, date: 'Mar 28, 2026', status: 'delivered' },
  { id: '#ERA-1854', artwork: 'Textile Memory', buyer: 'Lucia Ferrari', amount: 650, date: 'Mar 14, 2026', status: 'delivered' },
]

const MESSAGES = [
  { id: '1', from: 'ERA Team', subject: 'Your GOLD certification application', preview: 'Congratulations! Your application has been reviewed...', time: '2h ago', unread: true },
  { id: '2', from: 'Sophie Müller', subject: 'Re: Ocean Archive I commission', preview: 'Thank you for the update! The piece looks incredible...', time: '1d ago', unread: false },
  { id: '3', from: 'ERA Marketplace', subject: 'New commission inquiry', preview: 'A buyer is interested in commissioning a large-scale mural...', time: '3d ago', unread: true },
]

/* ─── Status pill ─────────────────────────────────────────────── */
function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; icon: React.FC<{ size: number }> }> = {
    active: { label: 'Active', cls: 'bg-accent/10 text-accent', icon: CheckCircle },
    sold: { label: 'Sold', cls: 'bg-gold/10 text-amber-700', icon: Star },
    pending: { label: 'Under Review', cls: 'bg-stone/10 text-stone/60', icon: Clock },
    shipped: { label: 'Shipped', cls: 'bg-blue-50 text-blue-600', icon: Package },
    delivered: { label: 'Delivered', cls: 'bg-accent/10 text-accent', icon: CheckCircle },
  }
  const { label, cls, icon: Icon } = map[status] || { label: status, cls: 'bg-sand text-stone', icon: AlertCircle }
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full', cls)}>
      <Icon size={10} />{label}
    </span>
  )
}

/* ─── Nav tabs ────────────────────────────────────────────────── */
const NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'artworks', label: 'My Artworks', icon: Image },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
]

/* ─── Upload artwork modal ────────────────────────────────────── */
function UploadModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ title: '', material: '', price: '', description: '', dimensions: '' })
  const [dragOver, setDragOver] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-stone/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
        className="bg-offwhite rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-primary px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">Artist Portal</p>
            <h3 className="font-heading text-xl font-bold text-offwhite mt-0.5">
              {done ? 'Artwork Submitted!' : `Upload Artwork — Step ${step} of 2`}
            </h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-offwhite/10 hover:bg-offwhite/20 flex items-center justify-center text-offwhite transition-colors">✕</button>
        </div>

        <div className="p-6">
          {done ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-accent" />
              </div>
              <h4 className="font-heading text-xl font-bold text-primary mb-2">Under Review</h4>
              <p className="text-stone/60 text-sm max-w-xs mx-auto leading-relaxed">
                Your artwork has been submitted for ERA review. You'll be notified within 48 hours.
              </p>
              <button onClick={onClose} className="mt-6 rounded-full bg-primary text-offwhite px-8 py-3 font-semibold text-sm hover:bg-primary-light transition-colors">
                Back to Dashboard
              </button>
            </div>
          ) : step === 1 ? (
            <div className="space-y-4">
              {[
                { key: 'title', label: 'Artwork Title', placeholder: 'e.g. Ocean Archive I' },
                { key: 'material', label: 'Primary Material', placeholder: 'e.g. Ocean Plastic, Metal, Textile' },
                { key: 'dimensions', label: 'Dimensions (cm)', placeholder: 'e.g. 80 × 60 × 20' },
                { key: 'price', label: 'Asking Price (€)', placeholder: 'e.g. 1200', type: 'number' },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-stone mb-1.5">{label}</label>
                  <input
                    type={type || 'text'} placeholder={placeholder}
                    value={(form as any)[key]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    className="w-full rounded-xl border border-stone/15 px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors bg-sand/30"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-stone mb-1.5">Description</label>
                <textarea rows={3} placeholder="Tell the story of this piece — materials, process, concept..."
                  value={form.description}
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  className="w-full rounded-xl border border-stone/15 px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors bg-sand/30 resize-none"
                />
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!form.title || !form.material || !form.price}
                className="w-full rounded-full bg-primary text-offwhite py-3 font-bold text-sm hover:bg-primary-light transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next: Upload Image →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <label
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) setPreview(URL.createObjectURL(f)) }}
                className={cn(
                  'block rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden',
                  dragOver ? 'border-accent bg-accent/5' : 'border-stone/20 hover:border-accent/40',
                  preview ? 'h-48' : 'p-12'
                )}
              >
                <input type="file" accept="image/*" className="sr-only" onChange={handleFile} />
                {preview ? (
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <div className="w-12 h-12 bg-sand rounded-xl flex items-center justify-center mx-auto mb-3"><Upload size={22} className="text-stone/50" /></div>
                    <p className="text-sm font-semibold text-stone">Drop image here or click to browse</p>
                    <p className="text-xs text-stone/40 mt-1">JPG, PNG, WebP · Max 20 MB</p>
                  </div>
                )}
              </label>
              {preview && (
                <button onClick={() => setPreview(null)} className="text-xs text-stone/40 hover:text-stone underline w-full text-center">
                  Remove image
                </button>
              )}
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 rounded-full border border-stone/20 py-3 text-sm font-medium hover:bg-sand transition-colors">
                  ← Back
                </button>
                <button
                  onClick={() => setDone(true)}
                  disabled={!preview}
                  className="flex-2 flex-1 rounded-full bg-primary text-offwhite py-3 font-bold text-sm hover:bg-primary-light transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit for Review
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Tab panels ──────────────────────────────────────────────── */
function OverviewPanel() {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, change, icon: Icon, color }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="bg-offwhite rounded-2xl border border-stone/10 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone/40">{label}</span>
              <div className={cn('w-8 h-8 rounded-xl bg-sand flex items-center justify-center', color)}><Icon size={15} /></div>
            </div>
            <p className="font-heading text-2xl font-bold text-primary">{value}</p>
            <p className="text-xs text-stone/40 mt-1">{change}</p>
          </motion.div>
        ))}
      </div>

      {/* Earnings + Cert */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Earnings card */}
        <div className="lg:col-span-3 bg-primary rounded-2xl p-6 text-offwhite relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, var(--color-accent) 0%, transparent 50%)' }} />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-offwhite/50">Available Balance</p>
            <p className="font-heading text-4xl font-bold mt-1">€{ARTIST.balance.toLocaleString()}</p>
            <p className="text-sm text-offwhite/50 mt-1">€{ARTIST.pendingPayout} pending payout</p>
            <div className="mt-6 flex gap-3">
              <button className="rounded-full bg-accent text-primary px-5 py-2.5 text-sm font-bold hover:scale-[1.02] transition-transform flex items-center gap-2">
                <DollarSign size={14} /> Request Payout
              </button>
              <button className="rounded-full border border-offwhite/20 text-offwhite/70 px-5 py-2.5 text-sm font-medium hover:bg-offwhite/10 transition-colors flex items-center gap-2">
                <BarChart2 size={14} /> View History
              </button>
            </div>
          </div>
        </div>

        {/* Certification card */}
        <div className="lg:col-span-2 bg-offwhite rounded-2xl border border-stone/10 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <Award size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="font-heading font-bold text-primary text-sm">{ARTIST.certLabel}</p>
              <p className="text-xs text-stone/40">Active since {ARTIST.joined}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            {[
              { label: 'ERA Marketplace listing', done: true },
              { label: 'Impact report', done: true },
              { label: 'Material tracking', done: true },
              { label: 'GOLD certification', done: false },
            ].map(({ label, done }) => (
              <div key={label} className="flex items-center gap-2">
                {done
                  ? <CheckCircle size={14} className="text-accent" />
                  : <div className="w-3.5 h-3.5 rounded-full border-2 border-stone/20" />}
                <span className={cn('text-xs', done ? 'text-stone' : 'text-stone/40')}>{label}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-full border border-accent/30 text-accent text-xs font-semibold py-2.5 hover:bg-accent/5 transition-colors flex items-center justify-center gap-1.5">
            <Leaf size={12} /> Apply for GOLD
          </button>
        </div>
      </div>

      {/* Recent artworks mini-list */}
      <div className="bg-offwhite rounded-2xl border border-stone/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone/10 flex items-center justify-between">
          <h3 className="font-heading font-bold text-primary">Recent Artworks</h3>
          <button className="text-xs text-accent font-semibold hover:underline flex items-center gap-1">View All <ChevronRight size={12} /></button>
        </div>
        <div className="divide-y divide-stone/5">
          {ARTWORKS.slice(0, 3).map(a => (
            <div key={a.id} className="flex items-center gap-4 px-6 py-4 hover:bg-sand/30 transition-colors">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.gradient} shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-primary truncate">{a.title}</p>
                <p className="text-xs text-stone/40">{a.material} · €{a.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-stone/40 shrink-0">
                <span className="flex items-center gap-1"><Eye size={11} />{a.views}</span>
                <span className="flex items-center gap-1"><Heart size={11} />{a.saves}</span>
                <StatusPill status={a.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ArtworksPanel({ onUpload }: { onUpload: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-primary">My Artworks</h2>
        <button
          onClick={onUpload}
          className="rounded-full bg-primary text-offwhite px-5 py-2.5 text-sm font-bold hover:bg-primary-light transition-all flex items-center gap-2 hover:scale-[1.02]"
        >
          <Plus size={15} /> Upload Artwork
        </button>
      </div>
      <div className="bg-offwhite rounded-2xl border border-stone/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone/10 text-xs font-semibold uppercase tracking-wider text-stone/40">
                <th className="text-left px-6 py-4">Artwork</th>
                <th className="text-left px-4 py-4">Material</th>
                <th className="text-left px-4 py-4">Price</th>
                <th className="text-left px-4 py-4">Views</th>
                <th className="text-left px-4 py-4">Saves</th>
                <th className="text-left px-4 py-4">Status</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone/5">
              {ARTWORKS.map(a => (
                <tr key={a.id} className="hover:bg-sand/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${a.gradient} shrink-0`} />
                      <span className="font-semibold text-sm text-primary">{a.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-stone/60">{a.material}</td>
                  <td className="px-4 py-4 text-sm font-bold text-primary">€{a.price.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-stone/50 flex items-center gap-1 pt-[18px]"><Eye size={12} />{a.views}</td>
                  <td className="px-4 py-4 text-sm text-stone/50"><span className="flex items-center gap-1"><Heart size={12} />{a.saves}</span></td>
                  <td className="px-4 py-4"><StatusPill status={a.status} /></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-8 h-8 rounded-lg bg-sand hover:bg-sand/80 flex items-center justify-center text-stone/60 hover:text-primary transition-colors"><Edit2 size={13} /></button>
                      <button className="w-8 h-8 rounded-lg bg-sand hover:bg-red-50 flex items-center justify-center text-stone/60 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function OrdersPanel() {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-primary mb-6">Orders</h2>
      <div className="bg-offwhite rounded-2xl border border-stone/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone/10 text-xs font-semibold uppercase tracking-wider text-stone/40">
                <th className="text-left px-6 py-4">Order</th>
                <th className="text-left px-4 py-4">Artwork</th>
                <th className="text-left px-4 py-4">Buyer</th>
                <th className="text-left px-4 py-4">Amount</th>
                <th className="text-left px-4 py-4">Date</th>
                <th className="text-left px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone/5">
              {ORDERS.map(o => (
                <tr key={o.id} className="hover:bg-sand/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-accent font-semibold">{o.id}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-primary">{o.artwork}</td>
                  <td className="px-4 py-4 text-sm text-stone/60">{o.buyer}</td>
                  <td className="px-4 py-4 text-sm font-bold text-primary">€{o.amount.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-stone/50">{o.date}</td>
                  <td className="px-6 py-4"><StatusPill status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function MessagesPanel() {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-primary mb-6">Messages</h2>
      <div className="bg-offwhite rounded-2xl border border-stone/10 divide-y divide-stone/5 overflow-hidden">
        {MESSAGES.map(m => (
          <button
            key={m.id}
            onClick={() => setSelected(m.id === selected ? null : m.id)}
            className={cn('w-full text-left px-6 py-5 hover:bg-sand/40 transition-colors', selected === m.id && 'bg-sand/40')}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                {m.unread && <div className="w-2 h-2 rounded-full bg-accent shrink-0" />}
                <div className={cn('min-w-0', !m.unread && 'pl-5')}>
                  <p className={cn('text-sm truncate', m.unread ? 'font-bold text-primary' : 'font-medium text-stone')}>{m.subject}</p>
                  <p className="text-xs text-stone/40 truncate mt-0.5">{m.from} · {m.preview}</p>
                </div>
              </div>
              <span className="text-xs text-stone/40 shrink-0">{m.time}</span>
            </div>
            <AnimatePresence>
              {selected === m.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-stone/10">
                    <p className="text-sm text-stone/70 leading-relaxed">{m.preview} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget urna id ante iaculis fermentum.</p>
                    <div className="mt-3 flex gap-2">
                      <button className="rounded-full bg-primary text-offwhite px-4 py-2 text-xs font-semibold hover:bg-primary-light transition-colors">Reply</button>
                      <button className="rounded-full border border-stone/20 text-stone px-4 py-2 text-xs font-medium hover:bg-sand transition-colors">Archive</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </div>
  )
}

function SettingsPanel() {
  const [form, setForm] = useState({ name: ARTIST.name, bio: ARTIST.bio, location: ARTIST.location, handle: ARTIST.handle, email: 'amara@example.com', paypal: '' })
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-primary mb-6">Profile Settings</h2>
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-offwhite rounded-2xl border border-stone/10 p-6">
          <h3 className="font-heading font-bold text-primary mb-5">Public Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: 'name', label: 'Display Name' },
              { key: 'handle', label: 'Handle' },
              { key: 'location', label: 'Location' },
              { key: 'email', label: 'Email', type: 'email' },
            ].map(({ key, label, type }) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-stone mb-1.5">{label}</label>
                <input
                  type={type || 'text'}
                  value={(form as any)[key]}
                  onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full rounded-xl border border-stone/15 px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors bg-sand/30"
                />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold text-stone mb-1.5">Bio</label>
            <textarea
              rows={3} value={form.bio}
              onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
              className="w-full rounded-xl border border-stone/15 px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors bg-sand/30 resize-none"
            />
          </div>
        </div>

        <div className="bg-offwhite rounded-2xl border border-stone/10 p-6">
          <h3 className="font-heading font-bold text-primary mb-5">Payout Settings</h3>
          <div>
            <label className="block text-sm font-semibold text-stone mb-1.5">PayPal Email</label>
            <input
              type="email" placeholder="your@paypal.com"
              value={form.paypal}
              onChange={e => setForm(p => ({ ...p, paypal: e.target.value }))}
              className="w-full max-w-sm rounded-xl border border-stone/15 px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors bg-sand/30"
            />
          </div>
          <p className="text-xs text-stone/40 mt-2">ERA processes payouts every Monday. 15% platform fee applies.</p>
        </div>

        <button
          type="submit"
          className={cn('rounded-full px-8 py-3 font-bold text-sm transition-all flex items-center gap-2', saved ? 'bg-accent text-primary' : 'bg-primary text-offwhite hover:bg-primary-light')}
        >
          {saved ? <><CheckCircle size={15} /> Saved!</> : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}

/* ─── Main dashboard ──────────────────────────────────────────── */
export function ArtistDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showUpload, setShowUpload] = useState(false)

  const unreadCount = MESSAGES.filter(m => m.unread).length

  return (
    <main className="min-h-screen bg-sand/30 pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Sidebar ── */}
          <aside className="lg:w-64 shrink-0">
            {/* Artist card */}
            <div className="bg-offwhite rounded-2xl border border-stone/10 p-6 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <img src={ARTIST.avatar} alt={ARTIST.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-accent/20" />
                <div className="min-w-0">
                  <p className="font-heading font-bold text-primary leading-tight truncate">{ARTIST.name}</p>
                  <p className="text-xs text-stone/40 truncate">{ARTIST.handle}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center"><Award size={11} className="text-amber-600" /></div>
                <span className="text-stone/60 font-medium">{ARTIST.certLabel}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-stone/10 text-xs text-stone/40 space-y-1">
                <p>📍 {ARTIST.location}</p>
                <p>📅 Joined {ARTIST.joined}</p>
              </div>
            </div>

            {/* Nav */}
            <nav className="bg-offwhite rounded-2xl border border-stone/10 overflow-hidden">
              {NAV.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors relative',
                    activeTab === id ? 'bg-primary text-offwhite' : 'text-stone hover:bg-sand/50'
                  )}
                >
                  <Icon size={17} />
                  {label}
                  {id === 'messages' && unreadCount > 0 && (
                    <span className={cn('ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full', activeTab === id ? 'bg-accent text-primary' : 'bg-accent/20 text-accent')}>
                      {unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            <button
              onClick={() => setShowUpload(true)}
              className="mt-4 w-full rounded-2xl bg-primary text-offwhite py-3.5 font-bold text-sm hover:bg-primary-light transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              <Plus size={16} /> Upload New Artwork
            </button>
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'overview' && <OverviewPanel />}
                {activeTab === 'artworks' && <ArtworksPanel onUpload={() => setShowUpload(true)} />}
                {activeTab === 'orders' && <OrdersPanel />}
                {activeTab === 'messages' && <MessagesPanel />}
                {activeTab === 'settings' && <SettingsPanel />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
      </AnimatePresence>
    </main>
  )
}
