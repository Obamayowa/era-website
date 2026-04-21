import { motion } from 'framer-motion'
import { Recycle, Palette, Gem, Leaf, Sparkles } from 'lucide-react'

const FALLBACK_ITEMS = [
  'Reclaimed Wood',
  'Ocean Plastics',
  'Vintage Metals',
  'Maria Santos',
  'Textile Remnants',
  'Discarded Glass',
  'James Okafor',
  'Industrial Scrap',
  'Paper & Cardboard',
  'Yuki Tanaka',
  'E-Waste Components',
  'Elena Voss',
]

const ICONS = [Recycle, Sparkles, Gem, Palette, Leaf, Recycle, Palette, Sparkles, Leaf, Palette, Gem, Palette]

interface Props {
  items?: string[] | null
}

function MarqueeRow({ direction = 1, displayItems }: { direction?: number; displayItems: string[] }) {
  const tripled = [...displayItems, ...displayItems, ...displayItems]
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-6 py-3"
        animate={{ x: direction > 0 ? [0, -2400] : [-2400, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {tripled.map((text, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <div
              key={i}
              className="flex shrink-0 items-center gap-2 rounded-full border border-primary/10 bg-offwhite px-5 py-2 text-sm font-medium text-stone whitespace-nowrap"
            >
              <Icon size={14} className="text-accent" />
              {text}
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export function MarqueeStrip({ items }: Props) {
  const displayItems = (items && items.length > 0) ? items : FALLBACK_ITEMS

  return (
    <section className="relative py-8 bg-sand overflow-hidden border-y border-primary/5" aria-label="Material categories and artists">
      <div className="space-y-3">
        <MarqueeRow direction={1} displayItems={displayItems} />
        <MarqueeRow direction={-1} displayItems={displayItems} />
      </div>
    </section>
  )
}
