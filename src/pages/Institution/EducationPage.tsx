import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, Monitor, School, Home, Clock, Users, Star,
  Calendar, Leaf, Zap, Shirt, Cpu, ArrowRight, CheckCircle,
  MapPin, DollarSign
} from 'lucide-react'
import { SectionHeading } from '@/components/institution/SectionHeading'
import { cn } from '@/lib/utils'

/* ── Tab definitions ──────────────────────────────── */
const tabs = [
  { id: 'workshops', label: 'Workshops', icon: BookOpen },
  { id: 'online', label: 'Online Courses', icon: Monitor },
  { id: 'schools', label: 'School Programs', icon: School },
  { id: 'residency', label: 'Residency', icon: Home },
] as const

type TabId = (typeof tabs)[number]['id']

/* ── Data ──────────────────────────────────────────── */
const workshops = [
  {
    title: 'Foundations of Recycled Art',
    level: 'Beginner',
    format: 'In-Person · 2 Days',
    price: '$180',
    spots: '12 max',
    desc: 'Learn material identification, preparation techniques, and foundational assemblage methods.',
  },
  {
    title: 'Advanced Sculptural Assemblage',
    level: 'Intermediate',
    format: 'In-Person · 5 Days',
    price: '$450',
    spots: '8 max',
    desc: 'Complex structural techniques for large-scale recycled material sculpture.',
  },
  {
    title: 'Digital Meets Physical',
    level: 'All Levels',
    format: 'Hybrid · 3 Days',
    price: '$320',
    spots: '20 max',
    desc: 'Integrate digital fabrication tools with found-object practices.',
  },
  {
    title: 'Certification Prep Intensive',
    level: 'Advanced',
    format: 'In-Person · 4 Days',
    price: '$580',
    spots: '6 max',
    desc: 'Comprehensive preparation for ERA Level 2 and Level 3 certification review.',
  },
]

const onlineCourses = [
  {
    title: 'Material Science for Artists',
    duration: '6 weeks',
    modules: 12,
    price: '$149',
    desc: 'Understanding material properties, safety protocols, and sourcing ethics for recycled art.',
  },
  {
    title: 'The Business of Sustainable Art',
    duration: '4 weeks',
    modules: 8,
    price: '$99',
    desc: 'Pricing, marketing, collector relations, and building a sustainable art practice.',
  },
  {
    title: 'Curatorial Perspectives',
    duration: '8 weeks',
    modules: 16,
    price: '$199',
    desc: 'Exhibition design, storytelling through curation, and the institutional framework of recycled art.',
  },
]

const schoolPrograms = [
  {
    title: 'ERA Junior Artists',
    ages: 'Ages 6–12',
    format: 'On-site field trip',
    desc: 'Hands-on workshops where students create art from classroom-collected recyclables.',
  },
  {
    title: 'High School Portfolio Lab',
    ages: 'Ages 13–18',
    format: 'Semester program',
    desc: 'Portfolio-building program for students interested in sustainability and fine arts.',
  },
  {
    title: 'University Partnerships',
    ages: 'Higher Education',
    format: 'Ongoing collaboration',
    desc: 'Joint research, guest lectures, and semester-long studio residencies for university students.',
  },
]

const materialWeeks = [
  { icon: Leaf, name: 'Plastic Week', color: 'bg-blue-50 text-blue-600', desc: 'Exploring single-use plastics as sculptural medium' },
  { icon: Shirt, name: 'Textile Week', color: 'bg-pink-50 text-pink-600', desc: 'Fiber arts from reclaimed fabrics and fashion waste' },
  { icon: Cpu, name: 'E-Waste Week', color: 'bg-purple-50 text-purple-600', desc: 'Circuit boards, components, and electronic assemblage' },
  { icon: Zap, name: 'Organic Week', color: 'bg-green-50 text-green-600', desc: 'Natural and biodegradable materials in contemporary art' },
]

const residencySteps = [
  { step: 1, title: 'Apply', desc: 'Submit portfolio, project proposal, and material sourcing plan.' },
  { step: 2, title: 'Review', desc: 'ERA curatorial panel evaluates artistic merit and sustainability alignment.' },
  { step: 3, title: 'Residency', desc: '3–6 month studio access with material supply, mentorship, and stipend.' },
  { step: 4, title: 'Exhibition', desc: 'Culminating solo or group show with catalog and collector preview.' },
]

const residencySupport = [
  'Dedicated studio space with industrial tools',
  'Monthly stipend of $2,000–$4,000',
  'Curated material supply from waste partners',
  'Weekly mentorship with ERA certified artists',
  "Access to ERA's collector and gallery network",
  'Certification pathway fast-track',
]

/* ── Subcomponents ─────────────────────────────────── */
function WorkshopCard({ w, i }: { w: typeof workshops[number]; i: number }) {
  const levelColor: Record<string, string> = {
    Beginner: 'bg-accent/10 text-accent',
    Intermediate: 'bg-gold/10 text-gold',
    Advanced: 'bg-amber/10 text-amber',
    'All Levels': 'bg-primary/10 text-primary',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.1 }}
      className="rounded-xl border border-stone/10 bg-offwhite p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', levelColor[w.level] || 'bg-stone/10 text-stone')}>
          {w.level}
        </span>
        <span className="font-heading text-lg font-bold text-primary">{w.price}</span>
      </div>
      <h3 className="font-heading text-xl font-semibold text-primary">{w.title}</h3>
      <p className="mt-2 text-sm text-stone/70 leading-relaxed">{w.desc}</p>
      <div className="mt-4 flex items-center gap-4 text-xs text-stone/60">
        <span className="flex items-center gap-1"><Clock size={12} /> {w.format}</span>
        <span className="flex items-center gap-1"><Users size={12} /> {w.spots}</span>
      </div>
    </motion.div>
  )
}

function OnlineCourseCard({ c, i }: { c: typeof onlineCourses[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.1 }}
      className="rounded-xl border border-stone/10 bg-offwhite p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-2 mb-3">
        <Monitor size={16} className="text-accent" />
        <span className="text-xs text-stone/60">{c.duration} · {c.modules} modules</span>
      </div>
      <h3 className="font-heading text-xl font-semibold text-primary">{c.title}</h3>
      <p className="mt-2 text-sm text-stone/70 leading-relaxed">{c.desc}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-heading text-lg font-bold text-primary">{c.price}</span>
        <button className="text-sm font-medium text-accent hover:text-primary transition-colors flex items-center gap-1">
          Learn More <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  )
}

function SchoolCard({ s, i }: { s: typeof schoolPrograms[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.1 }}
      className="rounded-xl border border-stone/10 bg-offwhite p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-2 mb-3">
        <School size={16} className="text-accent" />
        <span className="text-xs font-medium text-accent">{s.ages}</span>
      </div>
      <h3 className="font-heading text-xl font-semibold text-primary">{s.title}</h3>
      <p className="mt-2 text-sm text-stone/70 leading-relaxed">{s.desc}</p>
      <div className="mt-4 flex items-center gap-1 text-xs text-stone/60">
        <MapPin size={12} /> {s.format}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════
   EDUCATION PAGE
   ═════════════════════════ */
export function EducationPage() {
  const [activeTab, setActiveTab] = useState<TabId>('workshops')

  return (
    <main>
      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary pt-32 pb-20 lg:pt-40 lg:pb-28" aria-label="Education hero">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 70% 30%, var(--color-accent) 0%, transparent 50%)`
        }} />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-6">
            Education
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-offwhite leading-[1.1] text-balance"
          >
            Learn the Art of{' '}
            <span className="text-accent">Sustainable Creation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-2xl mx-auto text-lg text-offwhite/70 leading-relaxed"
          >
            From beginner workshops to advanced residencies, ERA's education programs equip artists 
            with the skills, knowledge, and certification pathways to excel in recycled art.
          </motion.p>
        </div>
      </section>

      {/* ── Tabbed Interface ──────────────────── */}
      <section className="py-16 lg:py-24" aria-label="Education programs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Tab bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all',
                    activeTab === tab.id
                      ? 'bg-primary text-offwhite shadow-md'
                      : 'bg-stone/5 text-stone/70 hover:bg-stone/10'
                  )}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {activeTab === 'workshops' && (
              <motion.div
                key="workshops"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                role="tabpanel"
                aria-label="Workshops"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {workshops.map((w, i) => (
                    <WorkshopCard key={w.title} w={w} i={i} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'online' && (
              <motion.div
                key="online"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                role="tabpanel"
                aria-label="Online Courses"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {onlineCourses.map((c, i) => (
                    <OnlineCourseCard key={c.title} c={c} i={i} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'schools' && (
              <motion.div
                key="schools"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                role="tabpanel"
                aria-label="School Programs"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {schoolPrograms.map((s, i) => (
                    <SchoolCard key={s.title} s={s} i={i} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'residency' && (
              <motion.div
                key="residency"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                role="tabpanel"
                aria-label="Residency"
              >
                {/* Application Flow */}
                <div className="mb-14">
                  <h3 className="font-heading text-2xl font-bold text-primary text-center mb-10">Application Process</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {residencySteps.map((s, i) => (
                      <motion.div
                        key={s.step}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.12 }}
                        className="relative rounded-xl border border-stone/10 bg-offwhite p-6 text-center"
                      >
                        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary font-bold text-sm">
                          {s.step}
                        </div>
                        <h4 className="font-heading text-lg font-semibold text-primary">{s.title}</h4>
                        <p className="mt-2 text-sm text-stone/70 leading-relaxed">{s.desc}</p>
                        {i < residencySteps.length - 1 && (
                          <ArrowRight size={16} className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-accent z-10" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Support Structure */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="rounded-2xl bg-primary p-8 lg:p-12"
                >
                  <h3 className="font-heading text-2xl font-bold text-offwhite mb-6">Residency Support</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {residencySupport.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent" />
                        <span className="text-sm text-offwhite/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Material Weeks ────────────────────── */}
      <section className="py-20 lg:py-28 bg-sand/50" aria-label="Material weeks">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Featured Series"
            title="Material Weeks"
            subtitle="Themed intensive series exploring specific waste streams as artistic medium."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {materialWeeks.map((m, i) => {
              const Icon = m.icon
              return (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-xl border border-stone/10 bg-offwhite p-6 text-center hover:shadow-md transition-shadow"
                >
                  <div className={cn('mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl', m.color)}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-primary">{m.name}</h3>
                  <p className="mt-2 text-sm text-stone/70 leading-relaxed">{m.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
