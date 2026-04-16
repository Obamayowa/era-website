import { motion } from 'framer-motion'
import { Recycle, Palette, Gem, Leaf, Sparkles } from 'lucide-react'

const marqueeItems = [
  { text: 'Reclaimed Wood', icon: Recycle },
  { text: 'Ocean Plastics', icon: Sparkles },
  { text: 'Vintage Metals', icon: Gem },
  { text: 'Maria Santos', icon: Palette },
  { text: 'Textile Remnants', icon: Leaf },
  { text: 'Discarded Glass', icon: Recycle },
  { text: 'James Okafor', icon: Palette },
  { text: 'Industrial Scrap', icon: Sparkles },
  { text: 'Paper & Cardboard', icon: Leaf },
  { text: 'Yuki Tanaka', icon: Palette },
  { text: 'E-Waste Components', icon: Gem },
  { text: 'Elena Voss', icon: Palette },
]

function MarqueeRow({ direction = 1 }: { direction?: number }) {
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-6 py-3"
        animate={{ x: direction > 0 ? [0, -2400] : [-2400, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-2 rounded-full border border-primary/10 bg-offwhite px-5 py-2 text-sm font-medium text-stone whitespace-nowrap"
          >
            <item.icon size={14} className="text-accent" />
            {item.text}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function MarqueeStrip() {
  return (
    <section className="relative py-8 bg-sand overflow-hidden border-y border-primary/5" aria-label="Material categories and artists">
      <div className="space-y-3">
        <MarqueeRow direction={1} />
        <MarqueeRow direction={-1} />
      </div>
    </section>
  )
}
