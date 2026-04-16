import { create } from 'zustand'
import type { MarketplaceListing, SizeCategory, AuctionCategory } from '@/data/marketplaceData'
import { marketplaceListings, auctionListings } from '@/data/marketplaceData'
import type { MaterialCategory, CertificationLevel } from '@/data/galleryData'

export interface CartItem {
  listing: MarketplaceListing
  quantity: number
}

interface MarketplaceState {
  listings: MarketplaceListing[]
  filteredListings: MarketplaceListing[]

  // Filters
  materialFilter: MaterialCategory
  certificationFilter: CertificationLevel
  sizeFilter: SizeCategory | 'All'
  priceRange: [number, number]
  searchQuery: string

  // Cart
  cart: CartItem[]
  isCartOpen: boolean

  // Wishlist
  wishlist: string[]

  // Auction
  auctionCategoryFilter: AuctionCategory | 'All'

  // Bid modal
  bidModalAuctionId: string | null

  // Actions
  setMaterialFilter: (m: MaterialCategory) => void
  setCertificationFilter: (c: CertificationLevel) => void
  setSizeFilter: (s: SizeCategory | 'All') => void
  setPriceRange: (range: [number, number]) => void
  setSearchQuery: (q: string) => void
  setAuctionCategoryFilter: (c: AuctionCategory | 'All') => void
  clearFilters: () => void

  addToCart: (listing: MarketplaceListing) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void

  toggleWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean

  openBidModal: (id: string) => void
  closeBidModal: () => void

  getCartSubtotal: () => number
  getCartCount: () => number
}

function applyFilters(
  listings: MarketplaceListing[],
  material: MaterialCategory,
  certification: CertificationLevel,
  size: SizeCategory | 'All',
  priceRange: [number, number],
  search: string
): MarketplaceListing[] {
  return listings.filter((l) => {
    if (material !== 'All' && l.material !== material) return false
    if (certification !== 'All' && l.certification !== certification) return false
    if (size !== 'All' && l.size !== size) return false
    if (l.price < priceRange[0] || l.price > priceRange[1]) return false
    if (search) {
      const q = search.toLowerCase()
      if (
        !l.title.toLowerCase().includes(q) &&
        !l.artist.toLowerCase().includes(q) &&
        !l.material.toLowerCase().includes(q) &&
        !l.materialDetail.toLowerCase().includes(q)
      )
        return false
    }
    return true
  })
}

const MAX_PRICE = 200000

export const useMarketplaceStore = create<MarketplaceState>((set, get) => ({
  listings: marketplaceListings,
  filteredListings: marketplaceListings,

  materialFilter: 'All',
  certificationFilter: 'All',
  sizeFilter: 'All',
  priceRange: [0, MAX_PRICE],
  searchQuery: '',

  cart: [],
  isCartOpen: false,

  wishlist: [],

  auctionCategoryFilter: 'All',

  bidModalAuctionId: null,

  setMaterialFilter: (m) => {
    set({ materialFilter: m })
    const s = get()
    set({ filteredListings: applyFilters(s.listings, m, s.certificationFilter, s.sizeFilter, s.priceRange, s.searchQuery) })
  },
  setCertificationFilter: (c) => {
    set({ certificationFilter: c })
    const s = get()
    set({ filteredListings: applyFilters(s.listings, s.materialFilter, c, s.sizeFilter, s.priceRange, s.searchQuery) })
  },
  setSizeFilter: (sz) => {
    set({ sizeFilter: sz })
    const s = get()
    set({ filteredListings: applyFilters(s.listings, s.materialFilter, s.certificationFilter, sz, s.priceRange, s.searchQuery) })
  },
  setPriceRange: (range) => {
    set({ priceRange: range })
    const s = get()
    set({ filteredListings: applyFilters(s.listings, s.materialFilter, s.certificationFilter, s.sizeFilter, range, s.searchQuery) })
  },
  setSearchQuery: (q) => {
    set({ searchQuery: q })
    const s = get()
    set({ filteredListings: applyFilters(s.listings, s.materialFilter, s.certificationFilter, s.sizeFilter, s.priceRange, q) })
  },
  setAuctionCategoryFilter: (c) => set({ auctionCategoryFilter: c }),
  clearFilters: () => {
    set({
      materialFilter: 'All',
      certificationFilter: 'All',
      sizeFilter: 'All',
      priceRange: [0, MAX_PRICE],
      searchQuery: '',
      filteredListings: get().listings,
    })
  },

  addToCart: (listing) => {
    const cart = get().cart
    const existing = cart.find((item) => item.listing.id === listing.id)
    if (existing) return
    set({ cart: [...cart, { listing, quantity: 1 }], isCartOpen: true })
  },
  removeFromCart: (id) => {
    set({ cart: get().cart.filter((item) => item.listing.id !== id) })
  },
  clearCart: () => set({ cart: [] }),
  toggleCart: () => set({ isCartOpen: !get().isCartOpen }),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  toggleWishlist: (id) => {
    const w = get().wishlist
    set({ wishlist: w.includes(id) ? w.filter((x) => x !== id) : [...w, id] })
  },
  isInWishlist: (id) => get().wishlist.includes(id),

  openBidModal: (id) => set({ bidModalAuctionId: id }),
  closeBidModal: () => set({ bidModalAuctionId: null }),

  getCartSubtotal: () => get().cart.reduce((sum, item) => sum + item.listing.price * item.quantity, 0),
  getCartCount: () => get().cart.length,
}))
