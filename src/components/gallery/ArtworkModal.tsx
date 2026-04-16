import { useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ShieldCheck,
  Ruler,
  Calendar,
  Tag,
  ShoppingCart,
  Paintbrush,
  Mail,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useGalleryStore } from '@/stores/useGalleryStore'
import type { GalleryArtwork } from '@/types'

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

function RelatedCarousel({ works, onSelect }: { works: GalleryArtwork[]; onSelect: (a: GalleryArtwork) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 280
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  if (works.length === 0) return null

  return (
    <div className="border-t border-stone/10 pt-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold uppercase tracking-widest text-stone/50">
          Related Works
        </h4>
        <div className="flex gap-1">
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-full border border-stone/10 text-stone/40 hover:text-stone hover:border-stone/30 transition-colors"
            aria-label="Scroll related works left"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-full border border-stone/10 text-stone/40 hover:text-stone hover:border-stone/30 transition-colors"
            aria-label="Scroll related works right"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        {works.map((w) => (
          <button
            key={w.id}
            onClick={() => onSelect(w)}
            className="flex-none w-56 rounded-lg overflow-hidden group cursor-pointer text-left"
          >
            <div className={`h-36 bg-gradient-to-br ${w.gradient} relative`}>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-xs font-semibold text-white truncate">{w.title}</p>
                <p className="text-[10px] text-white/60">{w.artist}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export function ArtworkModal() {
  const { isModalOpen, selectedArtwork, closeModal, openModal, getRelatedWorks } = useGalleryStore()

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    },
    [closeModal]
  )

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isModalOpen, handleEscape])

  const relatedWorks = selectedArtwork ? getRelatedWorks(selectedArtwork) : []

  return (
    <AnimatePresence>
      {isModalOpen && selectedArtwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedArtwork.title} by ${selectedArtwork.artist}`}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 bg-offwhite rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm text-stone/60 hover:text-stone hover:bg-white transition-colors shadow-sm"
              aria-label="Close artwork details"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left — Image */}
              <div className={`relative bg-gradient-to-br ${selectedArtwork.gradient} min-h-[300px] lg:min-h-[500px] lg:rounded-l-2xl`}>
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.25), transparent 60%)`,
                  }}
                />
                <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
                  <div className="absolute top-12 right-12 w-40 h-40 border border-white rounded-full" />
                  <div className="absolute bottom-16 left-12 w-20 h-20 border border-white rotate-45" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/50 rounded-full" />
                </div>

                {/* Certification Badge on image */}
                <div className="absolute top-4 left-4">
                  <span className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm',
                    selectedArtwork.certification === 'Level 3'
                      ? 'bg-gold/90 text-primary'
                      : 'bg-white/25 text-white'
                  )}>
                    <ShieldCheck size={14} />
                    ERA {selectedArtwork.certification}
                  </span>
                </div>
              </div>

              {/* Right — Metadata */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col">
                {/* Category tag */}
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent mb-3">
                  {selectedArtwork.category}
                </span>

                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary leading-tight mb-1">
                  {selectedArtwork.title}
                </h2>
                <p className="text-base text-stone/70 mb-6">
                  by <span className="font-semibold text-stone">{selectedArtwork.artist}</span>
                </p>

                {/* Description */}
                <p className="text-sm text-stone/70 leading-relaxed mb-6">
                  {selectedArtwork.description}
                </p>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-2">
                    <Tag size={14} className="text-accent mt-0.5 flex-none" />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-stone/40">Material</p>
                      <p className="text-sm text-stone">{selectedArtwork.materialDetail}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Ruler size={14} className="text-accent mt-0.5 flex-none" />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-stone/40">Dimensions</p>
                      <p className="text-sm text-stone">{selectedArtwork.dimensions}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar size={14} className="text-accent mt-0.5 flex-none" />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-stone/40">Year</p>
                      <p className="text-sm text-stone">{selectedArtwork.year}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck size={14} className="text-accent mt-0.5 flex-none" />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-stone/40">Certification</p>
                      <p className="text-sm text-stone">ERA {selectedArtwork.certification}</p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-white rounded-xl p-4 mb-6 border border-stone/5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-stone/40 mb-1">Price</p>
                  <p className="font-heading text-2xl font-bold text-primary">
                    {formatPrice(selectedArtwork.price)}
                  </p>
                </div>

                {/* Artist Bio */}
                <div className="bg-sand/50 rounded-xl p-4 mb-6">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-stone/40 mb-2">About the Artist</p>
                  <p className="text-sm text-stone/70 leading-relaxed">
                    {selectedArtwork.artistBio}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <button className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-offwhite rounded-full px-5 py-3 text-sm font-semibold hover:bg-primary-light transition-colors">
                    <ShoppingCart size={16} />
                    Purchase
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center gap-2 bg-accent/10 text-primary rounded-full px-5 py-3 text-sm font-semibold hover:bg-accent/20 transition-colors">
                    <Paintbrush size={16} />
                    Commission Similar
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center gap-2 border border-stone/15 text-stone rounded-full px-5 py-3 text-sm font-semibold hover:border-stone/30 transition-colors">
                    <Mail size={16} />
                    Contact Artist
                  </button>
                </div>

                {/* Related Works Carousel */}
                <RelatedCarousel works={relatedWorks} onSelect={openModal} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
