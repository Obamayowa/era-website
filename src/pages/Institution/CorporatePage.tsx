import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight, Send, Building, Mail, Phone, MessageSquare
} from 'lucide-react'
import { SectionHeading } from '@/components/institution/SectionHeading'
import { useSanity } from '@/hooks/useSanity'
import { cn } from '@/lib/utils'

const CORPORATE_QUERY = `*[_type == "corporatePage"][0] {
  headline, subheadline, badgeText,
  "heroImageUrl": heroImage.asset->url,
  contactHeadline, contactSubtext, contactButtonLabel,
  contactSuccessHeadline, contactSuccessText,
  industries,
  services[] { icon, title, description, features },
  callForWasteHeadline,
  callForWasteSteps[] { icon, title, description }
}`

const FALLBACK_HERO = 'https://static.prod-images.emergentagent.com/jobs/0abb3382-c7dc-49d3-9a90-e40de9d6fe8b/images/3deb36242c2f122a409076f0c1e3ee9ef54fd591d5af478117fd7d33f55d9e96.jpeg'

const FALLBACK_SERVICES = [
  { icon: '♻️', title: 'Waste-to-Art Consulting', description: 'We audit your waste streams and design bespoke programs to transform discarded materials into branded art installations, employee gifts, or public displays.', features: ['Waste stream analysis', 'Material matching', 'ROI & impact reporting', 'Sustainability certification'] },
  { icon: '🎨', title: 'Custom Installations', description: 'Commission one-of-a-kind recycled art installations for lobbies, conference rooms, or public spaces—each with full provenance documentation.', features: ['Site assessment & design', 'ERA-certified artists', 'Provenance NFT included', 'Installation & maintenance'] },
  { icon: '👥', title: 'Employee Engagement', description: 'Team-building workshops, sustainability challenges, and creative events that align with your ESG goals and energize your workforce.', features: ['On-site workshops', 'Virtual team sessions', 'Impact dashboards', 'CSR reporting support'] },
]

const FALLBACK_STEPS = [
  { icon: '🔍', title: 'Audit', description: 'We analyze your waste streams and identify high-value artistic materials.' },
  { icon: '✅', title: 'Matching', description: 'ERA pairs your waste profile with certified artists whose practice aligns.' },
  { icon: '🚚', title: 'Pickup', description: 'Scheduled collection and material processing at our certified facilities.' },
  { icon: '📖', title: 'Impact Story', description: 'Receive a full impact report with photos, metrics, and the art created.' },
]

const FALLBACK_INDUSTRIES = ['Technology', 'Hospitality', 'Finance', 'Manufacturing', 'Retail', 'Healthcare']

interface CorporateData {
  headline?: string
  subheadline?: string
  badgeText?: string
  heroImageUrl?: string
  contactHeadline?: string
  contactSubtext?: string
  contactButtonLabel?: string
  contactSuccessHeadline?: string
  contactSuccessText?: string
  industries?: string[]
  services?: { icon?: string; title?: string; description?: string; features?: string[] }[]
  callForWasteHeadline?: string
  callForWasteSteps?: { icon?: string; title?: string; description?: string }[]
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

export function CorporatePage() {
  const { data } = useSanity<CorporateData | null>(CORPORATE_QUERY, null)

  const heroImage = data?.heroImageUrl || FALLBACK_HERO
  const badgeText = data?.badgeText || 'Corporate Solutions'
  const headline = data?.headline || 'Turn Your Waste Into Cultural Capital'
  const subheadline = data?.subheadline || 'Partner with ERA to transform your corporate waste streams into certified art, engage employees through creative sustainability, and amplify your ESG narrative.'
  const contactHeadline = data?.contactHeadline || 'Partner With ERA'
  const contactSubtext = data?.contactSubtext || 'Tell us about your organization and sustainability goals. Our corporate team will respond within 2 business days.'
  const contactButtonLabel = data?.contactButtonLabel || 'Submit Inquiry'
  const contactSuccessHeadline = data?.contactSuccessHeadline || 'Inquiry Submitted'
  const contactSuccessText = data?.contactSuccessText || 'Thank you! Our corporate partnerships team will be in touch shortly.'
  const industries = (data?.industries && data.industries.length > 0) ? data.industries : FALLBACK_INDUSTRIES
  const callForWasteHeadline = data?.callForWasteHeadline || 'Call for Waste'
  const services = (data?.services && data.services.length > 0)
    ? data.services.map(s => ({ icon: s.icon || '✨', title: s.title || '', description: s.description || '', features: s.features || [] }))
    : FALLBACK_SERVICES
  const steps = (data?.callForWasteSteps && data.callForWasteSteps.length > 0)
    ? data.callForWasteSteps.map(s => ({ icon: s.icon || '⭐', title: s.title || '', description: s.description || '' }))
    : FALLBACK_STEPS

  const [form, setForm] = useState({ company: '', name: '', email: '', phone: '', industry: '', interest: '', message: '' })
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
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-primary pt-32 pb-20 lg:pt-40 lg:pb-28" aria-label="Corporate hero">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Corporate art installation" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-6">{badgeText}</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-offwhite leading-[1.1] text-balance mb-6">
              {headline.includes('Cultural') ? (
                <>{headline.split('Cultural')[0]}<span className="text-accent">Cultural{headline.split('Cultural')[1]}</span></>
              ) : headline}
            </h1>
            <p className="text-lg sm:text-xl text-offwhite/70 leading-relaxed">{subheadline}</p>
            <div className="mt-10">
              <a href="#inquiry" className="rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-primary hover:bg-accent/90 transition-all">
                Partner With Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28" aria-label="Services">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Our Services" title="Comprehensive Corporate Programs" subtitle="Three integrated pathways for organizations committed to creative sustainability." />
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
                className="rounded-2xl border border-stone/10 bg-offwhite p-8 hover:shadow-lg transition-shadow group"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-2xl group-hover:bg-accent/10 transition-colors">
                  {s.icon}
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary">{s.title}</h3>
                <p className="mt-3 text-sm text-stone/70 leading-relaxed">{s.description}</p>
                <ul className="mt-5 space-y-2">
                  {(s.features || []).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-stone/80">
                      <ArrowRight size={12} className="text-accent" />{f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call for Waste */}
      <section className="py-20 lg:py-28 bg-sand/50" aria-label="Call for Waste program">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Signature Program" title={callForWasteHeadline} subtitle="A streamlined four-step process that turns your organization's waste into documented impact." />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div key={step.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl shadow-md">
                  {step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-px bg-accent/30" />
                )}
                <h3 className="font-heading text-xl font-semibold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm text-stone/70 leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="py-20 lg:py-28" aria-label="Corporate inquiry form">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Get Started" title={contactHeadline} subtitle={contactSubtext} />

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="mt-12 rounded-2xl bg-primary p-10 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                <Send size={28} className="text-accent" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-offwhite">{contactSuccessHeadline}</h3>
              <p className="mt-3 text-offwhite/70">{contactSuccessText}</p>
            </motion.div>
          ) : (
            <motion.form {...fadeUp} onSubmit={handleSubmit} className="mt-12 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-stone/80 mb-1.5">Company Name *</label>
                  <div className="relative">
                    <Building size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/40" />
                    <input id="company" name="company" required value={form.company} onChange={handleChange}
                      className="w-full rounded-lg border border-stone/20 bg-offwhite py-3 pl-10 pr-4 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone/80 mb-1.5">Contact Name *</label>
                  <input id="name" name="name" required value={form.name} onChange={handleChange}
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
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                      className="w-full rounded-lg border border-stone/20 bg-offwhite py-3 pl-10 pr-4 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                      placeholder="jane@acme.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-stone/80 mb-1.5">Phone</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/40" />
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
                      className="w-full rounded-lg border border-stone/20 bg-offwhite py-3 pl-10 pr-4 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-stone/80 mb-1.5">Industry</label>
                  <select id="industry" name="industry" value={form.industry} onChange={handleChange}
                    className="w-full rounded-lg border border-stone/20 bg-offwhite py-3 px-4 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  >
                    <option value="">Select industry</option>
                    {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-stone/80 mb-1.5">Primary Interest</label>
                  <select id="interest" name="interest" value={form.interest} onChange={handleChange}
                    className="w-full rounded-lg border border-stone/20 bg-offwhite py-3 px-4 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  >
                    <option value="">Select interest</option>
                    {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    <option value="callforwaste">Call for Waste Program</option>
                    <option value="multiple">Multiple Services</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone/80 mb-1.5">Tell us about your goals</label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3 top-3 text-stone/40" />
                  <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange}
                    className="w-full rounded-lg border border-stone/20 bg-offwhite py-3 pl-10 pr-4 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
                    placeholder="Describe your sustainability goals, waste types, or specific needs..."
                  />
                </div>
              </div>
              <div className="flex justify-center pt-2">
                <button type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-offwhite hover:bg-primary-light transition-colors shadow-md hover:shadow-lg"
                >
                  <Send size={16} />
                  {contactButtonLabel}
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </section>
    </main>
  )
}
