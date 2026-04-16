import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Upload, ChevronRight, ChevronLeft, Recycle, Shield, Award, User, Palette, FileCheck, ImagePlus, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = [
  { id: 1, label: 'Basic Info', icon: User },
  { id: 2, label: 'Your Practice', icon: Palette },
  { id: 3, label: 'Certification', icon: Shield },
  { id: 4, label: 'First Artwork', icon: ImagePlus },
  { id: 5, label: 'Confirm', icon: CheckCircle },
]

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Master Craftsperson']
const MATERIAL_CATEGORIES = ['Plastic', 'Metal', 'Textile', 'Paper', 'E-Waste', 'Organic', 'Mixed Media']

const CERT_LEVELS = [
  {
    id: 'BRONZE', level: 1, icon: Recycle, name: 'ERA Participating Artist', cost: 'Free',
    color: 'border-accent bg-accent/5', activeColor: 'border-accent bg-accent/10',
    badge: 'bg-accent/10 text-accent',
    requirements: ['Artist declaration form', 'Photo documentation', 'Material source description'],
  },
  {
    id: 'SILVER', level: 2, icon: Shield, name: 'ERA Verified Recycled', cost: '€25',
    color: 'border-gold bg-gold/5', activeColor: 'border-gold bg-gold/10',
    badge: 'bg-gold/10 text-gold',
    requirements: ['Supply chain receipts', 'Source documentation', 'Process photographs'],
  },
  {
    id: 'GOLD', level: 3, icon: Award, name: 'ERA Certified Sustainable', cost: '€100–€500',
    color: 'border-amber bg-amber/5', activeColor: 'border-amber bg-amber/10',
    badge: 'bg-amber/10 text-amber',
    requirements: ['Third-party environmental audit', 'Scientific material analysis', 'Lab testing report'],
  },
]

function ProgressBar({ current }: { current: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-5 h-0.5 bg-stone/10 -z-0" />
        <motion.div
          className="absolute left-0 top-5 h-0.5 bg-accent -z-0 origin-left"
          animate={{ scaleX: (current - 1) / (STEPS.length - 1) }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%' }}
        />
        {STEPS.map(({ id, label, icon: Icon }) => (
          <div key={id} className="flex flex-col items-center gap-2 z-10">
            <motion.div
              animate={{ scale: current === id ? 1.1 : 1 }}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300',
                current > id ? 'bg-accent border-accent text-primary' :
                current === id ? 'bg-primary border-primary text-offwhite' :
                'bg-offwhite border-stone/20 text-stone/40'
              )}
            >
              {current > id ? <CheckCircle size={16} /> : <Icon size={16} />}
            </motion.div>
            <span className={cn('text-xs font-medium hidden sm:block', current >= id ? 'text-primary' : 'text-stone/40')}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Step1({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading text-3xl font-bold text-primary">Tell us about yourself</h2>
        <p className="text-stone/60 mt-1">Basic contact and identity information.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { key: 'firstName', label: 'First Name', placeholder: 'Amina' },
          { key: 'lastName', label: 'Last Name', placeholder: 'Kouyaté' },
          { key: 'displayName', label: 'Artist / Studio Name', placeholder: 'Your public name' },
          { key: 'email', label: 'Email Address', placeholder: 'artist@example.com', type: 'email' },
          { key: 'phone', label: 'Phone (optional)', placeholder: '+1 555 000 0000' },
          { key: 'location', label: 'City, Country', placeholder: 'Lagos, Nigeria' },
          { key: 'website', label: 'Website or Instagram', placeholder: 'instagram.com/yourhandle' },
        ].map(({ key, label, placeholder, type }) => (
          <div key={key} className={cn(key === 'email' || key === 'displayName' ? 'sm:col-span-2' : '')}>
            <label className="block text-sm font-semibold text-stone mb-1.5">{label}</label>
            <input type={type || 'text'} value={data[key] || ''} placeholder={placeholder}
              onChange={e => onChange({ ...data, [key]: e.target.value })}
              className="w-full rounded-xl border border-stone/15 px-4 py-3 text-sm focus:outline-none focus:border-accent/60 transition-colors bg-sand/30"
              required={!['phone', 'website'].includes(key)}
            />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-sm font-semibold text-stone mb-2">How did you hear about ERA?</label>
        <select value={data.referral || ''} onChange={e => onChange({ ...data, referral: e.target.value })}
          className="w-full rounded-xl border border-stone/15 px-4 py-3 text-sm focus:outline-none focus:border-accent/60 bg-offwhite"
        >
          <option value="">Select one</option>
          {['Instagram', 'TikTok', 'Friend / Colleague', 'Google Search', 'Art Fair or Event', 'Other'].map(o => <option key={o}>{o}</option>)}
        </select>
      </div>
    </div>
  )
}

function Step2({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const toggleMaterial = (m: string) => {
    const current = data.materials || []
    onChange({ ...data, materials: current.includes(m) ? current.filter((x: string) => x !== m) : [...current, m] })
  }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-3xl font-bold text-primary">Your artistic practice</h2>
        <p className="text-stone/60 mt-1">Help us understand your work and materials.</p>
      </div>
      <div>
        <label className="block text-sm font-semibold text-stone mb-3">Skill Level</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SKILL_LEVELS.map(level => (
            <button key={level} type="button" onClick={() => onChange({ ...data, skillLevel: level })}
              className={cn('rounded-xl border-2 py-3 px-2 text-sm font-medium text-center transition-all', data.skillLevel === level ? 'border-accent bg-accent/10 text-accent' : 'border-stone/15 text-stone hover:border-accent/30')}
            >{level}</button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-stone mb-3">Primary Material Categories <span className="font-normal text-stone/40">(select all that apply)</span></label>
        <div className="flex flex-wrap gap-3">
          {MATERIAL_CATEGORIES.map(m => (
            <button key={m} type="button" onClick={() => toggleMaterial(m)}
              className={cn('rounded-full border px-4 py-2 text-sm font-medium transition-all', (data.materials || []).includes(m) ? 'bg-primary text-offwhite border-primary' : 'border-stone/15 text-stone hover:border-primary/30')}
            >{m}</button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-stone mb-1.5">Years of Experience</label>
        <input type="number" min={0} max={60} value={data.yearsExperience || ''} placeholder="e.g. 5"
          onChange={e => onChange({ ...data, yearsExperience: e.target.value })}
          className="w-48 rounded-xl border border-stone/15 px-4 py-3 text-sm focus:outline-none focus:border-accent/60 bg-sand/30"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-stone mb-1.5">Artist Bio <span className="font-normal text-stone/40">(max 150 words)</span></label>
        <textarea rows={4} value={data.bio || ''} placeholder="Tell collectors and the ERA community about your practice, your relationship with recycled materials, and what drives your work..."
          onChange={e => onChange({ ...data, bio: e.target.value })}
          className="w-full rounded-xl border border-stone/15 px-4 py-3 text-sm focus:outline-none focus:border-accent/60 transition-colors bg-sand/30 resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-stone mb-1.5">Artist Statement <span className="font-normal text-stone/40">(optional, max 300 words)</span></label>
        <textarea rows={4} value={data.statement || ''} placeholder="A formal artist statement for exhibition and institutional contexts..."
          onChange={e => onChange({ ...data, statement: e.target.value })}
          className="w-full rounded-xl border border-stone/15 px-4 py-3 text-sm focus:outline-none focus:border-accent/60 transition-colors bg-sand/30 resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-stone mb-1.5">Profile Photo</label>
        <div className="border-2 border-dashed border-stone/20 rounded-xl p-8 text-center hover:border-accent/40 transition-colors cursor-pointer">
          <Upload size={24} className="mx-auto text-stone/30 mb-2" />
          <p className="text-sm text-stone/50">Drag and drop or <span className="text-accent font-medium">browse</span></p>
          <p className="text-xs text-stone/30 mt-1">JPG, PNG — max 5MB</p>
        </div>
      </div>
    </div>
  )
}

function Step3({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-3xl font-bold text-primary">Choose your certification level</h2>
        <p className="text-stone/60 mt-1">You can upgrade at any time. Most artists start at Level 1.</p>
      </div>
      <div className="space-y-4">
        {CERT_LEVELS.map(cert => (
          <button key={cert.id} type="button" onClick={() => onChange({ ...data, certLevel: cert.id })}
            className={cn('w-full text-left rounded-2xl border-2 p-6 transition-all', data.certLevel === cert.id ? cert.activeColor : cert.color, 'hover:shadow-md')}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', cert.badge)}>
                  <cert.icon size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-heading font-bold text-primary">{cert.name}</h3>
                    <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full', cert.badge)}>Level {cert.level}</span>
                  </div>
                  <p className="text-sm text-stone/60 mt-2 font-semibold">Cost: {cert.cost}</p>
                  <ul className="mt-3 space-y-1.5">
                    {cert.requirements.map(r => (
                      <li key={r} className="flex items-center gap-2 text-sm text-stone/70">
                        <CheckCircle size={13} className="text-accent shrink-0" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={cn('w-5 h-5 rounded-full border-2 shrink-0 mt-1 transition-all', data.certLevel === cert.id ? 'bg-primary border-primary' : 'border-stone/20')} />
            </div>
          </button>
        ))}
      </div>
      {data.certLevel && data.certLevel !== 'BRONZE' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-stone/10 bg-sand/50 p-5">
          <label className="block text-sm font-semibold text-stone mb-3">Upload Supporting Documents</label>
          <div className="border-2 border-dashed border-stone/20 rounded-xl p-8 text-center hover:border-accent/40 transition-colors cursor-pointer">
            <FileCheck size={24} className="mx-auto text-stone/30 mb-2" />
            <p className="text-sm text-stone/50">Drag and drop your documents or <span className="text-accent font-medium">browse</span></p>
            <p className="text-xs text-stone/30 mt-1">PDF, JPG, PNG — max 20MB per file</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function Step4({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const [previews, setPreviews] = useState<string[]>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const urls = files.map(f => URL.createObjectURL(f))
    setPreviews(prev => [...prev, ...urls].slice(0, 9))
    onChange({ ...data, artworkImages: [...(data.artworkImages || []), ...files].slice(0, 9) })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-3xl font-bold text-primary">Upload your first artwork</h2>
        <p className="text-stone/60 mt-1">You can add more from your dashboard after approval.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { key: 'artworkTitle', label: 'Artwork Title', placeholder: 'Ocean Memory I', span: 2 },
          { key: 'artworkMaterial', label: 'Primary Material', placeholder: 'e.g. Ocean Plastic' },
          { key: 'artworkYear', label: 'Year Created', placeholder: '2024', type: 'number' },
          { key: 'artworkDimensions', label: 'Dimensions', placeholder: 'e.g. 60 × 80 × 5 cm' },
          { key: 'artworkWeight', label: 'Weight (kg)', placeholder: 'e.g. 2.5', type: 'number' },
          { key: 'artworkPrice', label: 'Price (€)', placeholder: 'e.g. 1200', type: 'number' },
        ].map(({ key, label, placeholder, type, span }) => (
          <div key={key} className={span === 2 ? 'sm:col-span-2' : ''}>
            <label className="block text-sm font-semibold text-stone mb-1.5">{label}</label>
            <input type={type || 'text'} value={data[key] || ''} placeholder={placeholder}
              onChange={e => onChange({ ...data, [key]: e.target.value })}
              className="w-full rounded-xl border border-stone/15 px-4 py-3 text-sm focus:outline-none focus:border-accent/60 bg-sand/30"
            />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-sm font-semibold text-stone mb-1.5">Description</label>
        <textarea rows={4} value={data.artworkDescription || ''} placeholder="Describe the artwork, its materials, the process of creation, and the story behind it..."
          onChange={e => onChange({ ...data, artworkDescription: e.target.value })}
          className="w-full rounded-xl border border-stone/15 px-4 py-3 text-sm focus:outline-none focus:border-accent/60 bg-sand/30 resize-none"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-stone mb-3">Artwork Images <span className="font-normal text-stone/40">(1 primary + up to 8 detail shots)</span></label>
        <label className="block border-2 border-dashed border-stone/20 rounded-xl p-8 text-center hover:border-accent/40 transition-colors cursor-pointer">
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
          <ImagePlus size={28} className="mx-auto text-stone/30 mb-2" />
          <p className="text-sm text-stone/50">Drag & drop or <span className="text-accent font-medium">browse</span></p>
          <p className="text-xs text-stone/30 mt-1">JPG, PNG, WEBP — max 10MB each · First image = primary</p>
        </label>
        {previews.length > 0 && (
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-3">
            {previews.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-stone/10">
                <img src={src} alt="" className="h-full w-full object-cover" />
                {i === 0 && <div className="absolute bottom-1 left-1 bg-accent text-primary text-[9px] font-bold px-1.5 py-0.5 rounded-full">Primary</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-stone mb-1.5">Shipping</label>
        <div className="grid grid-cols-2 gap-3">
          {['I handle shipping', 'ERA Logistics Partner'].map(opt => (
            <button key={opt} type="button" onClick={() => onChange({ ...data, shipping: opt })}
              className={cn('rounded-xl border-2 py-3 text-sm font-medium transition-all', data.shipping === opt ? 'border-accent bg-accent/10 text-accent' : 'border-stone/15 text-stone hover:border-accent/30')}
            >{opt}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Step5({ data }: { data: any }) {
  const cert = CERT_LEVELS.find(c => c.id === data.certLevel)
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-3xl font-bold text-primary">Review your application</h2>
        <p className="text-stone/60 mt-1">Everything look right? Submit when ready.</p>
      </div>
      <div className="space-y-4">
        {[
          { label: 'Name', value: `${data.firstName || ''} ${data.lastName || ''}` },
          { label: 'Artist Name', value: data.displayName },
          { label: 'Email', value: data.email },
          { label: 'Location', value: data.location },
          { label: 'Skill Level', value: data.skillLevel },
          { label: 'Materials', value: (data.materials || []).join(', ') },
          { label: 'Certification', value: cert?.name || '' },
          { label: 'Certification Cost', value: cert?.cost || 'Free' },
          { label: 'First Artwork', value: data.artworkTitle },
          { label: 'Artwork Price', value: data.artworkPrice ? `€${Number(data.artworkPrice).toLocaleString()}` : '' },
        ].filter(item => item.value).map(({ label, value }) => (
          <div key={label} className="flex justify-between py-3 border-b border-stone/10 text-sm">
            <span className="text-stone/50 font-medium">{label}</span>
            <span className="text-stone font-semibold text-right max-w-xs">{value}</span>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-sand/50 border border-stone/10 p-5 text-sm text-stone/60 leading-relaxed">
        By submitting, you agree to ERA's <span className="text-accent font-medium cursor-pointer">Artist Agreement</span>, confirm all information is accurate, and consent to ERA verifying your materials and practice. ERA will review your application within 5–7 business days.
      </div>
    </div>
  )
}

export function ArtistSignup() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<Record<string, any>>({})
  const [submitted, setSubmitted] = useState(false)

  const next = () => setStep(s => Math.min(s + 1, 5))
  const prev = () => setStep(s => Math.max(s - 1, 1))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-offwhite flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 1, ease: 'easeOut' }}
            className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Sparkles size={40} className="text-accent" />
          </motion.div>
          <h1 className="font-heading text-4xl font-bold text-primary mb-3">Application Submitted!</h1>
          <p className="text-stone/60 leading-relaxed mb-6">
            Welcome to ERA, <strong>{data.displayName || data.firstName}</strong>! We'll review your application within 5–7 business days and send you a confirmation to <strong>{data.email}</strong>.
          </p>
          <div className="bg-sand/50 rounded-xl p-5 text-sm text-stone/60 mb-8">
            In the meantime, follow ERA on Instagram and TikTok for community updates and inspiration.
          </div>
          <a href="/" className="rounded-full bg-primary text-offwhite px-8 py-3.5 font-semibold hover:bg-primary-light transition-colors inline-block">
            Explore ERA →
          </a>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-offwhite">
      {/* Header banner */}
      <div className="bg-primary pt-28 pb-10 lg:pt-36 lg:pb-12">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Artist Portal</span>
          <h1 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-offwhite">Join ERA as an Artist</h1>
          <p className="mt-2 text-offwhite/60 text-base">5 steps · ~10 minutes · Start for free</p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-12 lg:py-16">
        <ProgressBar current={step} />
        <form onSubmit={step === 5 ? handleSubmit : e => { e.preventDefault(); next() }}>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              {step === 1 && <Step1 data={data} onChange={setData} />}
              {step === 2 && <Step2 data={data} onChange={setData} />}
              {step === 3 && <Step3 data={data} onChange={setData} />}
              {step === 4 && <Step4 data={data} onChange={setData} />}
              {step === 5 && <Step5 data={data} />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between">
            {step > 1 ? (
              <button type="button" onClick={prev} className="flex items-center gap-2 rounded-full border border-stone/20 px-6 py-3 text-sm font-medium text-stone hover:bg-sand transition-colors">
                <ChevronLeft size={16} /> Back
              </button>
            ) : <div />}
            <button type="submit" className="flex items-center gap-2 rounded-full bg-primary text-offwhite px-8 py-3.5 font-semibold hover:bg-primary-light transition-all hover:scale-[1.02]">
              {step === 5 ? 'Submit Application' : 'Continue'}
              <ChevronRight size={16} />
            </button>
          </div>
          <p className="text-center text-xs text-stone/40 mt-4">Step {step} of {STEPS.length}</p>
        </form>
      </div>
    </main>
  )
}
