import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSanity } from '@/hooks/useSanity'

const COMMISSIONS_QUERY = `*[_type == "commissionsPage"][0] {
  headline, subheadline, ctaLabel,
  successHeadline, successMessage,
  commissionTypes[] { id, label, icon, description, priceRange, timeline },
  materialOptions
}`

const FALLBACK_TYPES = [
  { id: 'portrait', icon: '🎨', label: 'Personal Portrait', description: "A bespoke portrait or personal piece using your chosen recycled materials.", priceRange: '€300 – €1,500', timeline: '4–6 weeks' },
  { id: 'corporate', icon: '🏢', label: 'Corporate Installation', description: "Large-scale artwork for offices, lobbies, or public spaces using your company's own waste.", priceRange: '€2,000 – €25,000+', timeline: '8–16 weeks' },
  { id: 'mural', icon: '🖼️', label: 'Mural Project', description: 'Wall-scale recycled material art for communities, businesses, or public infrastructure.', priceRange: '€1,500 – €10,000', timeline: '6–10 weeks' },
]

const FALLBACK_MATERIALS = ['Plastic', 'Metal', 'Textile', 'Paper', 'E-Waste', 'Organic', 'Mixed', "Artist's Choice"]
const TIMELINE_OPTIONS = ['2–4 weeks', '4–6 weeks', '6–10 weeks', '3+ months', 'Flexible']

interface CommissionsData {
  headline?: string
  subheadline?: string
  ctaLabel?: string
  successHeadline?: string
  successMessage?: string
  commissionTypes?: { id?: string; label?: string; icon?: string; description?: string; priceRange?: string; timeline?: string }[]
  materialOptions?: string[]
}

export function CommissionsPage() {
  const { data } = useSanity<CommissionsData | null>(COMMISSIONS_QUERY, null)

  const headline = data?.headline || 'Your Vision, Sustainably Made.'
  const subheadline = data?.subheadline || 'Work directly with ERA-verified artists to create a one-of-a-kind recycled artwork tailored to your space, brand, and story.'
  const ctaLabel = data?.ctaLabel || 'Submit Commission Brief →'
  const successHeadline = data?.successHeadline || 'Commission Received!'
  const successMessage = data?.successMessage || "We'll review your brief and match you with the ideal ERA-verified artist within 48 hours. You'll receive a detailed proposal before any work begins."

  const commissionTypes = (data?.commissionTypes && data.commissionTypes.length > 0)
    ? data.commissionTypes.map(t => ({
        id: t.id || t.label || '',
        icon: t.icon || '✨',
        label: t.label || '',
        description: t.description || '',
        priceRange: t.priceRange || '',
        timeline: t.timeline || '',
      }))
    : FALLBACK_TYPES

  const materialOptions = (data?.materialOptions && data.materialOptions.length > 0)
    ? data.materialOptions
    : FALLBACK_MATERIALS

  const [selectedType, setSelectedType] = useState('')
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', description: '', budget: '', timeline: '', location: '' })

  const toggleMaterial = (m: string) => setSelectedMaterials(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-offwhite">
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, var(--color-amber) 0%, transparent 50%)' }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Commission a Work</span>
            <h1 className="mt-3 font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-offwhite leading-tight">
              {headline}
            </h1>
            <p className="mt-4 text-offwhite/60 text-lg max-w-xl">
              {subheadline}
            </p>
          </motion.div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-offwhite/50">
            {['Matched to the right artist', 'Full material documentation', 'Impact report on completion', '15% ERA coordination fee'].map(f => (
              <div key={f} className="flex items-center gap-2"><CheckCircle size={14} className="text-accent" />{f}</div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎨</span>
            </div>
            <h2 className="font-heading text-3xl font-bold text-primary mb-3">{successHeadline}</h2>
            <p className="text-stone/60 max-w-md mx-auto leading-relaxed">{successMessage}</p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', description: '', budget: '', timeline: '', location: '' }) }}
              className="mt-8 rounded-full border border-stone/20 px-6 py-3 text-sm font-medium hover:bg-sand transition-colors"
            >
              Submit Another
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Step 1: Type */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-2">What type of commission?</h2>
              <p className="text-stone/60 text-sm mb-6">Select the commission type that best fits your project.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {commissionTypes.map(({ id, icon, label, description, priceRange, timeline }) => (
                  <button key={id} type="button" onClick={() => setSelectedType(id)}
                    className={cn('text-left rounded-2xl border-2 p-6 transition-all', selectedType === id ? 'border-accent bg-accent/5' : 'border-stone/10 hover:border-accent/30')}
                  >
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-2xl', selectedType === id ? 'bg-accent/20' : 'bg-sand')}>
                      {icon}
                    </div>
                    <h3 className="font-heading font-bold text-primary">{label}</h3>
                    <p className="text-sm text-stone/60 mt-1 leading-relaxed">{description}</p>
                    <div className="mt-4 space-y-1 text-xs text-stone/50">
                      {priceRange && <div className="flex items-center gap-1.5"><CheckCircle size={11} className="text-accent" />{priceRange}</div>}
                      {timeline && <div className="flex items-center gap-1.5"><Clock size={11} className="text-accent" />{timeline}</div>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Materials */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-2">Preferred materials</h2>
              <p className="text-stone/60 text-sm mb-6">Select all that apply — or let the artist choose.</p>
              <div className="flex flex-wrap gap-3">
                {materialOptions.map(m => (
                  <button key={m} type="button" onClick={() => toggleMaterial(m)}
                    className={cn('rounded-full px-4 py-2 text-sm font-medium border transition-all', selectedMaterials.includes(m) ? 'bg-primary text-offwhite border-primary' : 'border-stone/20 text-stone hover:border-primary/30')}
                  >{m}</button>
                ))}
              </div>
            </div>

            {/* Step 3: Details */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">Tell us about your project</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { key: 'name', label: 'Your Name', placeholder: 'Full name', type: 'text' },
                  { key: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email' },
                  { key: 'company', label: 'Company / Organization', placeholder: 'Optional', type: 'text' },
                  { key: 'location', label: 'Installation Location', placeholder: 'City, Country', type: 'text' },
                  { key: 'budget', label: 'Budget (€)', placeholder: 'e.g. 5000', type: 'number' },
                ].map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-stone mb-1.5">{label}</label>
                    <input type={type} required={key !== 'company'} value={(form as any)[key]} placeholder={placeholder}
                      onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                      className="w-full rounded-xl border border-stone/15 px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors bg-sand/30"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-semibold text-stone mb-1.5">Timeline</label>
                  <select value={form.timeline} onChange={e => setForm(p => ({ ...p, timeline: e.target.value }))} required
                    className="w-full rounded-xl border border-stone/15 px-4 py-3 text-sm focus:outline-none focus:border-accent/50 bg-sand/30 bg-offwhite"
                  >
                    <option value="">Select timeline</option>
                    {TIMELINE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <label className="block text-sm font-semibold text-stone mb-1.5">Describe Your Vision</label>
                <textarea rows={5} required value={form.description}
                  placeholder="Describe what you're looking for — dimensions, mood, purpose, any specific references or inspiration..."
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  className="w-full rounded-xl border border-stone/15 px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors bg-sand/30 resize-none"
                />
              </div>
            </div>

            <button type="submit" disabled={!selectedType}
              className="w-full rounded-full bg-primary text-offwhite py-4 font-bold text-base hover:bg-primary-light transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01]"
            >
              {ctaLabel}
            </button>
            <p className="text-center text-xs text-stone/40">We respond within 48 hours with a matched artist proposal. No commitment required.</p>
          </form>
        )}
      </div>
    </main>
  )
}
