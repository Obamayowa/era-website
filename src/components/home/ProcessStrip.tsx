import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollAnimation'

const FALLBACK_STEPS = [
  {
    step: 1,
    icon: '📦',
    title: 'Material Collected',
    description: 'Waste materials are sourced from partners, communities, and cleanup initiatives worldwide.',
  },
  {
    step: 2,
    icon: '🖌️',
    title: 'Artist Creates',
    description: 'Selected artists transform raw materials into unique, museum-quality artworks.',
  },
  {
    step: 3,
    icon: '✅',
    title: 'ERA Certifies',
    description: 'Each piece receives verified provenance, material documentation, and authenticity certification.',
  },
  {
    step: 4,
    icon: '🛍️',
    title: 'Collector Acquires',
    description: 'Art finds its forever home with collectors who value beauty and sustainability equally.',
  },
]

const STEP_COLORS = ['bg-earth', 'bg-primary-light', 'bg-accent', 'bg-gold']

interface SanityStep {
  icon?: string
  title?: string
  description?: string
}

interface ProcessData {
  processBadge?: string
  processHeadline?: string
  processSubtext?: string
  processSteps?: SanityStep[]
}

interface Props {
  data?: ProcessData | null
}

export function ProcessStrip({ data }: Props) {
  const { ref, opacity, y } = useScrollReveal()

  const badge = data?.processBadge || 'How It Works'
  const headline = data?.processHeadline || 'From Discard to Display'
  const subtext = data?.processSubtext || 'Our four-step process ensures every artwork meets the highest standards of quality and sustainability.'
  const steps = (data?.processSteps && data.processSteps.length > 0)
    ? data.processSteps.map((s, i) => ({
        step: i + 1,
        icon: s.icon || '⭐',
        title: s.title || '',
        description: s.description || '',
      }))
    : FALLBACK_STEPS

  return (
    <section id="process" className="py-20 lg:py-28 bg-primary relative overflow-hidden" aria-labelledby="process-heading">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          style={{ opacity, y }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            {badge}
          </span>
          <h2 id="process-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-offwhite text-balance">
            {headline}
          </h2>
          <p className="mt-4 text-lg text-offwhite/50 max-w-2xl mx-auto">
            {subtext}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative group"
            >
              <div className="rounded-2xl bg-offwhite/5 backdrop-blur-sm border border-offwhite/10 p-6 lg:p-8 text-center transition-all hover:bg-offwhite/10 hover:border-accent/30 h-full">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${STEP_COLORS[i % STEP_COLORS.length]} text-offwhite mb-5 text-2xl`}>
                  {step.icon}
                </div>

                <div className="text-xs font-bold uppercase tracking-widest text-accent/60 mb-2">
                  Step {step.step}
                </div>

                <h3 className="font-heading text-lg font-semibold text-offwhite mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-offwhite/50 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow connector (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-5 -translate-y-1/2 z-10 text-accent/40">
                  <ArrowRight size={18} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
