import { motion } from 'framer-motion'
import { FilterBar } from '@/components/gallery/FilterBar'
import { ArtworkGrid } from '@/components/gallery/ArtworkGrid'
import { ArtworkModal } from '@/components/gallery/ArtworkModal'
import { useGalleryStore } from '@/stores/useGalleryStore'

export function GalleryPage() {
  const { filteredArtworks, artworks } = useGalleryStore()

  return (
    <main className="min-h-screen bg-offwhite">
      {/* Page Hero */}
      <section className="pt-28 md:pt-36 pb-10 md:pb-14 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-10 right-20 w-96 h-96 border border-white rounded-full" />
          <div className="absolute bottom-10 left-10 w-64 h-64 border border-white rotate-45" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Gallery
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-offwhite mb-4 leading-tight">
              Explore the Collection
            </h1>
            <p className="text-base sm:text-lg text-offwhite/60 max-w-2xl leading-relaxed">
              Discover {artworks.length} certified recycled artworks from pioneering artists transforming waste into wonder.
              Each piece is blockchain-verified and traceable to its material origins.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-6 flex items-center gap-6 text-sm text-offwhite/40"
          >
            <span>{filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''} shown</span>
            <span className="w-1 h-1 rounded-full bg-offwhite/20" />
            <span>6 material categories</span>
            <span className="w-1 h-1 rounded-full bg-offwhite/20" />
            <span>2 certification levels</span>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <FilterBar />

      {/* Gallery Grid */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ArtworkGrid />
        </div>
      </section>

      {/* Detail Modal */}
      <ArtworkModal />
    </main>
  )
}
