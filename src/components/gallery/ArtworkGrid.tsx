import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useGalleryStore } from '@/stores/useGalleryStore'
import { ArtworkCard } from './ArtworkCard'

export function ArtworkGrid() {
  const { filteredArtworks, layoutMode } = useGalleryStore()

  if (filteredArtworks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-32 text-center"
      >
        <p className="text-lg font-heading text-stone/50 mb-2">No artworks found</p>
        <p className="text-sm text-stone/35">Try adjusting your filters or search terms</p>
      </motion.div>
    )
  }

  return (
    <div
      className={cn(
        'grid gap-4 sm:gap-6',
        layoutMode === 'masonry'
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      )}
    >
      <AnimatePresence mode="popLayout">
        {filteredArtworks.map((artwork, i) => (
          <ArtworkCard key={artwork.id} artwork={artwork} index={i} />
        ))}
      </AnimatePresence>
    </div>
  )
}
