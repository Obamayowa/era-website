import { motion } from 'framer-motion'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { GalleryArtwork } from '@/types'
import { useGalleryStore } from '@/stores/useGalleryStore'

interface ArtworkCardProps {
  artwork: GalleryArtwork
  index: number
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

export function ArtworkCard({ artwork, index }: ArtworkCardProps) {
  const { openModal, layoutMode } = useGalleryStore()

  const isMasonry = layoutMode === 'masonry'
  const isTall = isMasonry && artwork.span === 'tall'

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={cn(
        'group relative rounded-xl overflow-hidden cursor-pointer',
        isTall ? 'row-span-2' : ''
      )}
      onClick={() => openModal(artwork)}
      role="button"
      tabIndex={0}
      aria-label={`View ${artwork.title} by ${artwork.artist}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(artwork) } }}
    >
      {/* Gradient placeholder for artwork image */}
      <div className={cn(
        `absolute inset-0 bg-gradient-to-br ${artwork.gradient}`,
        'transition-transform duration-500 group-hover:scale-105'
      )} />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.2), transparent 60%)`,
        }}
      />

      {/* Geometric accents */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <div className="absolute top-6 right-6 w-24 h-24 border border-white rounded-full" />
        <div className="absolute bottom-10 left-8 w-14 h-14 border border-white rotate-45" />
      </div>

      {/* Certification Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={cn(
          'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm',
          artwork.certification === 'Level 3'
            ? 'bg-gold/90 text-primary'
            : 'bg-white/20 text-white'
        )}>
          <ShieldCheck size={12} />
          {artwork.certification}
        </span>
      </div>

      {/* Content */}
      <div className={cn(
        'relative flex flex-col justify-end p-6',
        isTall ? 'min-h-[440px] sm:min-h-[520px]' : 'min-h-[260px] sm:min-h-[300px]',
        !isMasonry && 'min-h-[300px] sm:min-h-[340px]'
      )}>
        {/* Bottom gradient for readability */}
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        <div className="relative z-10 transform transition-all duration-300 group-hover:translate-y-[-6px]">
          <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-white/60 mb-2 bg-white/10 rounded-full px-3 py-1">
            {artwork.material} · {artwork.year}
          </span>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-1 leading-snug">
            {artwork.title}
          </h3>
          <p className="text-sm text-white/70 mb-1">
            {artwork.artist}
          </p>
          <p className="text-sm font-semibold text-white/90">
            {formatPrice(artwork.price)}
          </p>
        </div>

        {/* Hover CTA */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={false}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
              <ArrowUpRight size={20} className="text-stone" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}
