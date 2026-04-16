import { motion } from 'framer-motion'
import { Recycle, Palette, Shield, Globe, Users, Lightbulb } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollAnimation'

const pillars = [
  {
    icon: Recycle,
    title: 'Zero-Waste Art',
    description: 'Every piece is crafted from 100% recycled, reclaimed, or repurposed materials — nothing new, everything renewed.',
  },
  {
    icon: Palette,
    title: 'Artist Empowerment',
    description: 'We provide funding, materials, and global exposure to artists who transform discarded objects into masterpieces.',
  },
  {
    icon: Shield,
    title: 'Authenticated Origins',
    description: 'Each artwork includes a verified provenance trail — from source material to finished piece, fully transparent.',
  },
  {
    icon: Globe,
    title: 'Global Community',
    description: 'Connecting recycled art creators and collectors across continents through exhibitions and digital experiences.',
  },
  {
    icon: Users,
    title: 'Inclusive Access',
    description: 'Art should be for everyone. We offer works at varied price points and free educational programs worldwide.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Lab',
    description: 'Pioneering new techniques for material recovery, pushing the boundaries of what recycled art can become.',
  },
]

function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl border border-primary/8 bg-offwhite p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:border-accent/20 hover:-translate-y-1"
    >
      <div className="mb-5 inline-flex items-center justify-center rounded-xl bg-accent/10 p-3 text-accent transition-colors group-hover:bg-accent group-hover:text-primary">
        <pillar.icon size={24} />
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

export function MissionPillars() {
  const { ref, opacity, y } = useScrollReveal()

  return (
    <section id="mission" className="py-20 lg:py-28 bg-sand" aria-labelledby="mission-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          style={{ opacity, y }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            Our Mission
          </span>
          <h2 id="mission-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary text-balance">
            Six Pillars of Purpose
          </h2>
          <p className="mt-4 text-lg text-stone/60 max-w-2xl mx-auto">
            Everything we do is guided by our commitment to art, sustainability, and community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
