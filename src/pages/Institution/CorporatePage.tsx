import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase, Palette, Users, Recycle, ClipboardCheck,
  Truck, BookOpen, ArrowRight, Send, Building, Mail,
  Phone, MessageSquare, Search, UserCheck
} from 'lucide-react'
import { SectionHeading } from '@/components/institution/SectionHeading'
import { cn } from '@/lib/utils'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

/* ── Data ──────────────────────────────────────────── */
const services = [
  {
    icon: Recycle,
    title: 'Waste-to-Art Consulting',
    desc: 'We audit your waste streams and design bespoke programs to transform discarded materials into branded art installations, employee gifts, or public displays.',
    features: ['Waste stream analysis', 'Material matching', 'ROI & impact reporting', 'Sustainability certification'],
  },
  {
    icon: Palette,
    title: 'Custom Installations',
    desc: 'Commission one-of-a-kind recycled art installations for lobbies, conference rooms, or public spaces—each with full provenance documentation.',
    features: ['Site assessment & design', 'ERA-certified artists', 'Provenance NFT included', 'Installation & maintenance'],
  },
  {
    icon: Users,
    title: 'Employee Engagement',
    desc: 'Team-building workshops, sustainability challenges, and creative events that align with your ESG goals and energize your workforce.',
    features: ['On-site workshops', 'Virtual team sessions', 'Impact dashboards', 'CSR reporting support'],
  },
]

const callForWasteSteps = [
  { icon: Search, title: 'Audit', desc: 'We analyze your waste streams and identify high-value artistic materials.' },
  { icon: UserCheck, title: 'Matching', desc: 'ERA pairs your waste profile with certified artists whose practice aligns.' },
  { icon: Truck, title: 'Pickup', desc: 'Scheduled collection and material processing at our certified facilities.' },
  { icon: BookOpen, title: 'Impact Story', desc: 'Receive a full impact report with photos, metrics, and the art created.' },
]

const industries = ['Technology', 'Hospitality', 'Finance', 'Manufacturing', 'Retail', 'Healthcare']

/* ═════════════════════════
   CORPORATE PAGE
   ═════════════════════════ */
export function CorporatePage() {
  const [form, setForm] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    industry: '',
    interest: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main>
      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary pt-32 pb-20 lg:pt-40 lg:pb-28" aria-label="Corporate hero">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, var(--color-accent) 0%, transparent 50%),
                            radial-gradient(circle at 90% 20%, var(--color-gold) 0%, transparent 40%)`
        }} />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-6">
            Corporate Solutions
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-offwhite leading-[1.1] text-balance"
          >
            Turn Your Waste Into{' '}
            <span className="text-accent">Cultural Capital</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-2xl mx-auto text-lg text-offwhite/70 leading-relaxed"
          >
            Partner with ERA to transform your corporate waste streams into certified art, 
            engage employees through creative sustainability, and amplify your ESG narrative.
          </motion.p>
        </div>
      </section>

      {/* ── Service Cards ─────────────────────── */}
      <section className="py-20 lg:py-28" aria-label="Services">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Services"
            title="Comprehensive Corporate Programs"
            subtitle="Three integrated pathways for organizations committed to creative sustainability."
          />
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="rounded-2xl border border-stone/10 bg-offwhite p-8 hover:shadow-lg transition-shadow group"
                >
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                    <Icon size={26} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-primary">{s.title}</h3>
                  <p className="mt-3 text-sm text-stone/70 leading-relaxed">{s.desc}</p>
                  <ul className="mt-5 space-y-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-stone/80">
                        <ArrowRight size={12} className="text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Call for Waste ─────────────────────── */}
      <section className="py-20 lg:py-28 bg-sand/50" aria-label="Call for Waste program">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Signature Program"
            title="Call for Waste"
            subtitle="A streamlined four-step process that turns your organization's waste into documented impact."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {callForWasteSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative text-center"
                >
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-accent shadow-md">
                    <Icon size={28} />
                  </div>
                  {i < callForWasteSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-px bg-accent/30" />
                  )}
                  <h3 className="font-heading text-xl font-semibold text-primary">{step.title}</h3>
                  <p className="mt-2 text-sm text-stone/70 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Inquiry Form ──────────────────────── */}
      <section className="py-20 lg:py-28" aria-label="Corporate inquiry form">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Get Started"
            title="Partner With ERA"
            subtitle="Tell us about your organization and sustainability goals. Our corporate team will respond within 2 business days."
          />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12 rounded-2xl bg-primary p-10 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                <Send size={28} className="text-accent" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-offwhite">Inquiry Submitted</h3>
              <p className="mt-3 text-offwhite/70">Thank you! Our corporate partnerships team will be in touch shortly.</p>
            </motion.div>
          ) : (
            <motion.form
              {...fadeUp}
              onSubmit={handleSubmit}
              className="mt-12 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-stone/80 mb-1.5">Company Name *</label>
                  <div className="relative">
                    <Building size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/40" />
                    <input
                      id="company"
                      name="company"
                      required
                      value={form.company}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stone/20 bg-offwhite py-3 pl-10 pr-4 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone/80 mb-1.5">Contact Name *</label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stone/20 bg-offwhite py-3 px-4 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                    placeholder="Jane Smith"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone/80 mb-1.5">Email *</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/40" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stone/20 bg-offwhite py-3 pl-10 pr-4 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                      placeholder="jane@acme.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-stone/80 mb-1.5">Phone</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/40" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stone/20 bg-offwhite py-3 pl-10 pr-4 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-stone/80 mb-1.5">Industry</label>
                  <select
                    id="industry"
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stone/20 bg-offwhite py-3 px-4 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  >
                    <option value="">Select industry</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-stone/80 mb-1.5">Primary Interest</label>
                  <select
                    id="interest"
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stone/20 bg-offwhite py-3 px-4 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  >
                    <option value="">Select interest</option>
                    <option value="consulting">Waste-to-Art Consulting</option>
                    <option value="installations">Custom Installations</option>
                    <option value="engagement">Employee Engagement</option>
                    <option value="callforwaste">Call for Waste Program</option>
                    <option value="multiple">Multiple Services</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone/80 mb-1.5">Tell us about your goals</label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3 top-3 text-stone/40" />
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stone/20 bg-offwhite py-3 pl-10 pr-4 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
                    placeholder="Describe your sustainability goals, waste types, or specific needs..."
                  />
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-offwhite hover:bg-primary-light transition-colors shadow-md hover:shadow-lg"
                >
                  <Send size={16} />
                  Submit Inquiry
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </section>
    </main>
  )
}
