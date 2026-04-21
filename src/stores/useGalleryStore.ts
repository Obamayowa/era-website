import { create } from 'zustand'
import type { GalleryArtwork } from '@/types'
import { galleryArtworks } from '@/data/galleryData'
import type { MaterialCategory, CertificationLevel } from '@/data/galleryData'
import { sanityClient } from '@/lib/sanity'

type LayoutMode = 'masonry' | 'uniform'

const GRADIENTS = [
  'from-blue-600 to-teal-500',
  'from-amber-700 to-orange-500',
  'from-emerald-700 to-lime-500',
  'from-violet-700 to-purple-400',
  'from-rose-600 to-pink-400',
  'from-cyan-600 to-sky-400',
  'from-slate-700 to-zinc-500',
  'from-indigo-600 to-blue-400',
  'from-yellow-600 to-amber-400',
  'from-fuchsia-600 to-pink-400',
]

const SPANS: Array<'normal' | 'tall' | 'wide'> = [
  'tall', 'normal', 'normal', 'normal', 'wide', 'normal',
  'normal', 'tall', 'normal', 'normal',
]

const SANITY_ARTWORKS_QUERY = `*[_type == "artwork"] | order(_createdAt desc) {
  _id, title,
  "artist": artist->{ name, bio },
  "imageUrl": images[0].asset->url,
  material, description, dimensions, category,
  certificationLevel, price, year, slug
}`

interface GalleryState {
  artworks: GalleryArtwork[]
  filteredArtworks: GalleryArtwork[]
  selectedArtwork: GalleryArtwork | null
  materialFilter: MaterialCategory
  certificationFilter: CertificationLevel
  searchQuery: string
  layoutMode: LayoutMode
  isModalOpen: boolean
  sanityLoaded: boolean

  setMaterialFilter: (material: MaterialCategory) => void
  setCertificationFilter: (level: CertificationLevel) => void
  setSearchQuery: (query: string) => void
  setLayoutMode: (mode: LayoutMode) => void
  openModal: (artwork: GalleryArtwork) => void
  closeModal: () => void
  getRelatedWorks: (artwork: GalleryArtwork) => GalleryArtwork[]
  loadSanityArtworks: () => Promise<void>
}

function filterArtworks(
  artworks: GalleryArtwork[],
  material: MaterialCategory,
  certification: CertificationLevel,
  search: string
): GalleryArtwork[] {
  return artworks.filter((a) => {
    if (material !== 'All' && a.material !== material) return false
    if (certification !== 'All' && a.certification !== certification) return false
    if (search) {
      const q = search.toLowerCase()
      const matchesArtist = a.artist.toLowerCase().includes(q)
      const matchesMaterial = a.material.toLowerCase().includes(q)
      const matchesMaterialDetail = a.materialDetail.toLowerCase().includes(q)
      const matchesTitle = a.title.toLowerCase().includes(q)
      if (!matchesArtist && !matchesMaterial && !matchesMaterialDetail && !matchesTitle) return false
    }
    return true
  })
}

function certLevelFromSanity(cert?: string): 'Level 2' | 'Level 3' {
  if (cert === 'GOLD') return 'Level 3'
  return 'Level 2'
}

function materialCategoryFromSanity(mat?: string): string {
  if (!mat) return 'Mixed Media'
  if (mat.toLowerCase().includes('plastic') || mat.toLowerCase().includes('ocean')) return 'Plastic'
  if (mat.toLowerCase().includes('textile')) return 'Textile'
  if (mat.toLowerCase().includes('metal') || mat.toLowerCase().includes('steel')) return 'Metal'
  if (mat.toLowerCase().includes('paper') || mat.toLowerCase().includes('cardboard')) return 'Paper'
  if (mat.toLowerCase().includes('e-waste') || mat.toLowerCase().includes('electronic')) return 'E-Waste'
  if (mat.toLowerCase().includes('wood') || mat.toLowerCase().includes('glass')) return 'Organic'
  return mat
}

export const useGalleryStore = create<GalleryState>((set, get) => ({
  artworks: galleryArtworks,
  filteredArtworks: galleryArtworks,
  selectedArtwork: null,
  materialFilter: 'All',
  certificationFilter: 'All',
  searchQuery: '',
  layoutMode: 'masonry',
  isModalOpen: false,
  sanityLoaded: false,

  loadSanityArtworks: async () => {
    if (get().sanityLoaded) return
    try {
      const results = await sanityClient.fetch(SANITY_ARTWORKS_QUERY)
      if (!results || results.length === 0) return

      const mapped: GalleryArtwork[] = results.map((a: any, i: number) => ({
        id: a._id,
        title: a.title || 'Untitled',
        artist: a.artist?.name || 'Unknown Artist',
        artistBio: a.artist?.bio || '',
        material: materialCategoryFromSanity(a.material),
        materialDetail: a.material || '',
        dimensions: a.dimensions || 'Dimensions on request',
        category: a.category || 'Mixed Media',
        certification: certLevelFromSanity(a.certificationLevel),
        price: a.price || 0,
        description: a.description || '',
        gradient: GRADIENTS[i % GRADIENTS.length],
        image: a.imageUrl,
        span: SPANS[i % SPANS.length],
        year: a.year || new Date().getFullYear(),
      }))

      const { materialFilter, certificationFilter, searchQuery } = get()
      set({
        artworks: mapped,
        filteredArtworks: filterArtworks(mapped, materialFilter, certificationFilter, searchQuery),
        sanityLoaded: true,
      })
    } catch (err) {
      console.warn('[Gallery] Sanity fetch failed, using fallback data:', err)
    }
  },

  setMaterialFilter: (material) => {
    set({ materialFilter: material })
    const { artworks, certificationFilter, searchQuery } = get()
    set({ filteredArtworks: filterArtworks(artworks, material, certificationFilter, searchQuery) })
  },

  setCertificationFilter: (level) => {
    set({ certificationFilter: level })
    const { artworks, materialFilter, searchQuery } = get()
    set({ filteredArtworks: filterArtworks(artworks, materialFilter, level, searchQuery) })
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query })
    const { artworks, materialFilter, certificationFilter } = get()
    set({ filteredArtworks: filterArtworks(artworks, materialFilter, certificationFilter, query) })
  },

  setLayoutMode: (mode) => set({ layoutMode: mode }),

  openModal: (artwork) => set({ selectedArtwork: artwork, isModalOpen: true }),

  closeModal: () => set({ selectedArtwork: null, isModalOpen: false }),

  getRelatedWorks: (artwork) => {
    const { artworks } = get()
    return artworks
      .filter((a) => a.id !== artwork.id && (a.material === artwork.material || a.artist === artwork.artist))
      .slice(0, 4)
  },
}))
