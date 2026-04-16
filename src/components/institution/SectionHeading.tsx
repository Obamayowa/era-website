import { motion } from 'framer-motion'

interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionHeading({ label, title, subtitle, align = 'center', light = false }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={align === 'center' ? 'text-center' : 'text-left'}
    >
      {label && (
        <span className={`inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-3 ${light ? 'text-accent' : 'text-accent'}`}>
          {label}
        </span>
      )}
      <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${light ? 'text-offwhite' : 'text-primary'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-lg leading-relaxed ${align === 'center' ? 'mx-auto' : ''} ${light ? 'text-offwhite/70' : 'text-stone/70'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
