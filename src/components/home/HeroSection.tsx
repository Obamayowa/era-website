import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Leaf } from 'lucide-react'

const HERO_IMAGE = 'https://static.prod-images.emergentagent.com/jobs/0abb3382-c7dc-49d3-9a90-e40de9d6fe8b/images/03368d01c8e8339db8de4bf8c79923ab9104cf390a5ea609aa0dd844e3a27bea.jpeg'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <img
          src={HERO_IMAGE}
          alt=""
          className="absolute inset-0 h-[120%] w-full object-cover"
          loading="eager"
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
        {/* Subtle vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(27,67,50,0.5) 100%)',
        }} />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity, scale }}
        className="relative z-10 mx-auto max-w-5xl px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm px-4 py-2 text-sm text-accent"
        >
          <Leaf size={14} />
          <span>Redefining Art Through Sustainability</span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-offwhite leading-[1.05] drop-shadow-lg"
          >
            From{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Waste</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1.2, ease: 'easeOut' }}
                className="absolute bottom-2 left-0 right-0 h-3 bg-amber/30 origin-left -z-0 rounded-sm"
              />
            </span>
          </motion.h1>
        </div>

        <div className="overflow-hidden mt-2">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] drop-shadow-lg"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-gold to-amber">
              to Wonder
            </span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8 text-lg sm:text-xl text-offwhite/80 max-w-2xl mx-auto leading-relaxed drop-shadow-sm"
        >
          Everything Recycled Arts curates extraordinary works born from discarded materials — 
          proving that beauty thrives where others see only waste.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#artworks"
            className="rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-primary hover:bg-accent/90 transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
          >
            Explore Artworks
          </a>
          <a
            href="#mission"
            className="rounded-full border border-offwhite/30 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-offwhite hover:bg-offwhite/10 transition-all"
          >
            Our Mission
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-offwhite/50"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
