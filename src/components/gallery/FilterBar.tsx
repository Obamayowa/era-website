import { Search, LayoutGrid, Columns3 } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useGalleryStore } from '@/stores/useGalleryStore'
import { MATERIAL_CATEGORIES, CERTIFICATION_LEVELS } from '@/data/galleryData'

export function FilterBar() {
  const {
    materialFilter,
    certificationFilter,
    searchQuery,
    layoutMode,
    setMaterialFilter,
    setCertificationFilter,
    setSearchQuery,
    setLayoutMode,
  } = useGalleryStore()

  return (
    <div className="sticky top-16 md:top-20 z-30 bg-offwhite/95 backdrop-blur-md border-b border-stone/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        {/* Search + Layout Toggle Row */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/40" />
            <input
              type="text"
              placeholder="Search by artist, title, or material…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-stone/10 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors placeholder:text-stone/35 font-body"
              aria-label="Search artworks"
            />
          </div>

          <div className="hidden sm:flex items-center gap-1 bg-white border border-stone/10 rounded-lg p-1">
            <button
              onClick={() => setLayoutMode('masonry')}
              className={cn(
                'p-2 rounded-md transition-colors',
                layoutMode === 'masonry'
                  ? 'bg-primary text-offwhite'
                  : 'text-stone/50 hover:text-stone'
              )}
              aria-label="Masonry layout"
              aria-pressed={layoutMode === 'masonry'}
            >
              <Columns3 size={16} />
            </button>
            <button
              onClick={() => setLayoutMode('uniform')}
              className={cn(
                'p-2 rounded-md transition-colors',
                layoutMode === 'uniform'
                  ? 'bg-primary text-offwhite'
                  : 'text-stone/50 hover:text-stone'
              )}
              aria-label="Uniform grid layout"
              aria-pressed={layoutMode === 'uniform'}
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>

        {/* Material Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-stone/40 mr-1">
            Material
          </span>
          {MATERIAL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setMaterialFilter(cat)}
              className={cn(
                'relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors',
                materialFilter === cat
                  ? 'text-offwhite'
                  : 'text-stone/60 hover:text-stone bg-white border border-stone/10'
              )}
            >
              {materialFilter === cat && (
                <motion.span
                  layoutId="material-pill"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}

          <span className="text-stone/10 mx-2 hidden sm:inline">|</span>

          <span className="text-xs font-semibold uppercase tracking-widest text-stone/40 mr-1">
            Certification
          </span>
          {CERTIFICATION_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => setCertificationFilter(level)}
              className={cn(
                'relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors',
                certificationFilter === level
                  ? 'text-offwhite'
                  : 'text-stone/60 hover:text-stone bg-white border border-stone/10'
              )}
            >
              {certificationFilter === level && (
                <motion.span
                  layoutId="cert-pill"
                  className="absolute inset-0 bg-accent rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{level}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
