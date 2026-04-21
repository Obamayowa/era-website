import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollAnimation'

const FALLBACK_ARTWORKS = [
  { id: '1', title: 'Tidal Memory', artist: { name: 'Maria Santos' }, material: 'Ocean Plastics', gradient: 'from-blue-600/80 to-teal-500/80', span: 'tall' as const },
  { id: '2', title: 'Iron Bloom', artist: { name: 'James Okafor' }, material: 'Reclaimed Metal', gradient: 'from-amber-700/80 to-orange-500/80', span: 'normal' as const },
  { id: '3', title: 'Paper Forest', artist: { name: 'Yuki Tanaka' }, material: 'Recycled Cardboard', gradient: 'from-emerald-700/80 to-lime-500/80', span: 'normal' as const },
  { id: '4', title: 'Circuit Dreams', artist: { name: 'Elena Voss' }, material: 'E-Waste Components', gradient: 'from-violet-700/80 to-purple-400/80', span: 'normal' as const },
  { id: '5', title: 'Woven Light', artist: { name: 'Ama Diallo' }, material: 'Textile Remnants', gradient: 'from-rose-600/80 to-pink-400/80', span: 'normal' as const },
  { id: '6', title: 'Glass Cathedral', artist: { name: 'Liam Chen' }, material: 'Discarded Glass', gradient: 'from-cyan-600/80 to-sky-400/80', span: 'tall' as const },
]

const GRADIENTS = [
  'from-blue-600/80 to-teal-500/80',
  'from-amber-700/80 to-orange-500/80',
  'from-emerald-700/80 to-lime-500/80',
  'from-violet-700/80 to-purple-400/80',
  'from-rose-600/80 to-pink-400/80',
  'from-cyan-600/80 to-sky-400/80',
]

interface SanityArtwork {
  _id: string
  title?: string
  price?: number
  material?: string
  artist?: { name?: string }
  imageUrl?: string
  slug?: { current?: string }
}

interface FeaturedData {
  featuredBadge?: string
  featuredHeadline?: string
  featuredSubtext?: string
  featuredCTALabel?: string
  featuredCTAHref?: string
}

interface Props {
  artworks?: SanityArtwork[] | null
  data?: FeaturedData | null
}

function ArtworkCard({ artwork, index }: { artwork: typeof FALLBACK_ARTWORKS[0] & { imageUrl?: string }; index: number }) {
  const span = index === 0 || index === 5 ? 'tall' : 'normal'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer ${span === 'tall' ? 'row-span-2' : ''}`}
    >
      {artwork.imageUrl ? (
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${artwork.gradient || GRADIENTS[index % GRADIENTS.length]}`} />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className={`relative flex flex-col justify-end p-6 ${span === 'tall' ? 'min-h-[420px] sm:min-h-[500px]' : 'min-h-[240px] sm:min-h-[280px]'}`}>
        <div className="transform transition-all duration-300 group-hover:translate-y-[-4px]">
          <span className="inline-block text-xs font-medium uppercase tracking-wider text-white/70 mb-2 bg-white/10 rounded-full px-3 py-1">
            {artwork.material}
          </span>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1">
            {artwork.title}
          </h3>
          <p className="text-sm text-white/70">by {artwork.artist?.name}</p>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <motion.div initial={false} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
              <ArrowUpRight size={20} className="text-stone" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturedArtworks({ artworks, data }: Props) {
  const { ref, opacity, y } = useScrollReveal()

  const badge = data?.featuredBadge || 'Gallery'
  const headline = data?.featuredHeadline || 'Featured Artworks'
  const ctaLabel = data?.featuredCTALabel || 'View All Works'
  const ctaHref = data?.featuredCTAHref || '/gallery'

  const displayArtworks = (artworks && artworks.length > 0)
    ? artworks.map((a, i) => ({
        id: a._id,
        title: a.title || '',
        material: a.material || '',
        artist: a.artist,
        imageUrl: a.imageUrl,
        gradient: GRADIENTS[i % GRADIENTS.length],
        span: (i === 0 || i === 5 ? 'tall' : 'normal') as 'tall' | 'normal',
      }))
    : FALLBACK_ARTWORKS

  return (
    <section id="artworks" className="py-20 lg:py-28 bg-offwhite" aria-labelledby="artworks-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          style={{ opacity, y }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14"
        >
          <div>
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-accent mb-3">
              {badge}
            </span>
            <h2 id="artworks-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
              {headline}
            </h2>
          </div>
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-primary transition-colors group"
          >
            {ctaLabel}
            <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-auto">
          {displayArtworks.map((artwork, i) => (
            <ArtworkCard key={artwork.id} artwork={artwork} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
