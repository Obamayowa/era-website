import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollAnimation'

const FALLBACK_PILLARS = [
  {
    icon: '♻️',
    title: 'Zero-Waste Art',
    description: 'Every piece is crafted from 100% recycled, reclaimed, or repurposed materials — nothing new, everything renewed.',
  },
  {
    icon: '🎨',
    title: 'Artist Empowerment',
    description: 'We provide funding, materials, and global exposure to artists who transform discarded objects into masterpieces.',
  },
  {
    icon: '🛡️',
    title: 'Authenticated Origins',
    description: 'Each artwork includes a verified provenance trail — from source material to finished piece, fully transparent.',
  },
  {
    icon: '🌍',
    title: 'Global Community',
    description: 'Connecting recycled art creators and collectors across continents through exhibitions and digital experiences.',
  },
  {
    icon: '👥',
    title: 'Inclusive Access',
    description: 'Art should be for everyone. We offer works at varied price points and free educational programs worldwide.',
  },
  {
    icon: '💡',
    title: 'Innovation Lab',
    description: 'Pioneering new techniques for material recovery, pushing the boundaries of what recycled art can become.',
  },
]

interface SanityPillar {
  icon?: string
  title?: string
  description?: string
}

interface MissionData {
  missionBadge?: string
  missionHeadline?: string
  missionSubtext?: string
  missionPillars?: SanityPillar[]
}

interface Props {
  data?: MissionData | null
}

function PillarCard({ pillar, index }: { pillar: typeof FALLBACK_PILLARS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl border border-primary/8 bg-offwhite p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:border-accent/20 hover:-translate-y-1"
    >
      <div className="mb-5 inline-flex items-center justify-center rounded-xl bg-accent/10 p-3 text-2xl transition-colors group-hover:bg-accent/20">
        {pillar.icon}
      </div>
      <h3 className="font-heading text-lg font-semibold text-primary mb-3">
        {pillar.title}
      </h3>
      <p className="text-sm leading-relaxed text-stone/70">
        {pillar.description}
      </p>
    </motion.div>
  )
}

export function MissionPillars({ data }: Props) {
  const { ref, opacity, y } = useScrollReveal()

  const badge = data?.missionBadge || 'Our Mission'
  const headline = data?.missionHeadline || 'Six Pillars of Purpose'
  const subtext = data?.missionSubtext || 'Everything we do is guided by our commitment to art, sustainability, and community.'
  const pillars = (data?.missionPillars && data.missionPillars.length > 0)
    ? data.missionPillars.map(p => ({
        icon: p.icon || '✨',
        title: p.title || '',
        description: p.description || '',
      }))
    : FALLBACK_PILLARS

  return (
    <section id="mission" className="py-20 lg:py-28 bg-sand" aria-labelledby="mission-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          style={{ opacity, y }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            {badge}
          </span>
          <h2 id="mission-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary text-balance">
            {headline}
          </h2>
          <p className="mt-4 text-lg text-stone/60 max-w-2xl mx-auto">
            {subtext}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <PillarCard key={i} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
