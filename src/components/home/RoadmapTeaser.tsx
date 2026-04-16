import { motion } from 'framer-motion'
import { Rocket, Store, Building2, Check, Clock, Sparkles } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollAnimation'

const phases = [
  {
    phase: 1,
    title: 'Foundation',
    subtitle: '2024–2025',
    icon: Rocket,
    status: 'active' as const,
    items: [
      'Launch curated artist network',
      'Establish material sourcing partnerships',
      'Build digital gallery & provenance system',
      'Host inaugural exhibition',
    ],
  },
  {
    phase: 2,
    title: 'Marketplace',
    subtitle: '2025–2026',
    icon: Store,
    status: 'upcoming' as const,
    items: [
      'Open ERA online marketplace',
      'Introduce collector membership tiers',
      'Expand to 50+ international artists',
      'Launch educational workshop series',
    ],
  },
  {
    phase: 3,
    title: 'Cultural Institution',
    subtitle: '2027+',
    icon: Building2,
    status: 'future' as const,
    items: [
      'Open physical ERA gallery spaces',
      'Create artist residency program',
      'Establish ERA Foundation grants',
      'Build permanent collection & museum',
    ],
  },
]

const statusConfig = {
  active: {
    badge: 'In Progress',
    badgeColor: 'bg-accent text-primary',
    borderColor: 'border-accent/30',
    iconBg: 'bg-accent',
    dotIcon: Sparkles,
  },
  upcoming: {
    badge: 'Next Phase',
    badgeColor: 'bg-gold/20 text-gold',
    borderColor: 'border-gold/20',
    iconBg: 'bg-gold',
    dotIcon: Clock,
  },
  future: {
    badge: 'Vision',
    badgeColor: 'bg-primary-light/20 text-offwhite/60',
    borderColor: 'border-offwhite/10',
    iconBg: 'bg-primary-light',
    dotIcon: Clock,
  },
}

export function RoadmapTeaser() {
  const { ref, opacity, y } = useScrollReveal()

  return (
    <section id="roadmap" className="py-20 lg:py-28 bg-sand" aria-labelledby="roadmap-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          style={{ opacity, y }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            Roadmap
          </span>
          <h2 id="roadmap-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary text-balance">
            Building the Future of Recycled Art
          </h2>
          <p className="mt-4 text-lg text-stone/60 max-w-2xl mx-auto">
            Our journey from grassroots movement to global cultural institution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {phases.map((phase, i) => {
            const config = statusConfig[phase.status]
            return (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative rounded-2xl border ${
                  phase.status === 'active'
                    ? 'bg-primary text-offwhite border-accent/30'
                    : 'bg-offwhite text-stone border-primary/8'
                } p-6 sm:p-8 transition-all hover:shadow-lg`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${config.iconBg} text-offwhite`}>
                    <phase.icon size={22} />
                  </div>
                  <span className={`text-xs font-semibold uppercase tracking-wider rounded-full px-3 py-1 ${config.badgeColor}`}>
                    {config.badge}
                  </span>
                </div>

                <div className="mb-1 text-xs font-medium uppercase tracking-widest text-accent">
                  Phase {phase.phase}
                </div>
                <h3 className={`font-heading text-2xl font-bold mb-1 ${
                  phase.status === 'active' ? 'text-offwhite' : 'text-primary'
                }`}>
                  {phase.title}
                </h3>
                <p className={`text-sm mb-6 ${
                  phase.status === 'active' ? 'text-offwhite/50' : 'text-stone/50'
                }`}>
                  {phase.subtitle}
                </p>

                <ul className="space-y-3">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <div className={`mt-0.5 flex-shrink-0 ${
                        phase.status === 'active' ? 'text-accent' : 'text-accent/50'
                      }`}>
                        {phase.status === 'active' && j < 2 ? (
                          <Check size={16} />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-current opacity-30" />
                          </div>
                        )}
                      </div>
                      <span className={phase.status === 'active' ? 'text-offwhite/80' : 'text-stone/70'}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
