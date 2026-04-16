import { create } from 'zustand'
import type { GalleryArtwork } from '@/types'
import { galleryArtworks } from '@/data/galleryData'
import type { MaterialCategory, CertificationLevel } from '@/data/galleryData'

type LayoutMode = 'masonry' | 'uniform'

interface GalleryState {
  artworks: GalleryArtwork[]
  filteredArtworks: GalleryArtwork[]
  selectedArtwork: GalleryArtwork | null
  materialFilter: MaterialCategory
  certificationFilter: CertificationLevel
  searchQuery: string
  layoutMode: LayoutMode
  isModalOpen: boolean

  setMaterialFilter: (material: MaterialCategory) => void
  setCertificationFilter: (level: CertificationLevel) => void
  setSearchQuery: (query: string) => void
  setLayoutMode: (mode: LayoutMode) => void
  openModal: (artwork: GalleryArtwork) => void
  closeModal: () => void
  getRelatedWorks: (artwork: GalleryArtwork) => GalleryArtwork[]
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

export const useGalleryStore = create<GalleryState>((set, get) => ({
  artworks: galleryArtworks,
  filteredArtworks: galleryArtworks,
  selectedArtwork: null,
  materialFilter: 'All',
  certificationFilter: 'All',
  searchQuery: '',
  layoutMode: 'masonry',
  isModalOpen: false,

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
