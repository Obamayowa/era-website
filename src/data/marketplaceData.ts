import type { GalleryArtwork } from '@/types'
import { galleryArtworks } from './galleryData'

export type SizeCategory = 'S' | 'M' | 'L' | 'Installation'

export interface MarketplaceListing extends GalleryArtwork {
  status: 'available' | 'sold' | 'auction'
  size: SizeCategory
  estimatedValue?: number
}

function inferSize(dimensions: string): SizeCategory {
  if (dimensions.toLowerCase().includes('installation') || dimensions.toLowerCase().includes('room-scale') || dimensions.toLowerCase().includes('monumental') || dimensions.toLowerCase().includes('site-specific')) return 'Installation'
  if (dimensions.toLowerCase().includes('large') || dimensions.toLowerCase().includes('variable')) return 'L'
  if (dimensions.toLowerCase().includes('small')) return 'S'
  const match = dimensions.match(/(\d+)/)
  if (match) {
    const num = parseInt(match[1])
    if (num > 60) return 'L'
    if (num > 30) return 'M'
    return 'S'
  }
  return 'M'
}

export const marketplaceListings: MarketplaceListing[] = galleryArtworks.map((art, i) => ({
  ...art,
  status: i === 6 || i === 11 ? 'sold' : i === 10 || i === 7 ? 'auction' : 'available',
  size: inferSize(art.dimensions),
  estimatedValue: Math.round(art.price * (1.1 + Math.random() * 0.4)),
}))

export type AuctionCategory = 'Quarterly Themed' | 'Celebrity Collaborations' | 'Emergency Climate Auctions'

export interface AuctionListing {
  id: string
  title: string
  artist: string
  gradient: string
  material: string
  category: AuctionCategory
  certification: 'Level 2' | 'Level 3'
  startingBid: number
  currentBid: number
  reservePrice: number
  estimatedValue: number
  bidCount: number
  endsAt: Date
  description: string
  bidHistory: { bidder: string; amount: number; time: Date }[]
}

function futureDate(hours: number): Date {
  return new Date(Date.now() + hours * 3600 * 1000)
}

function pastTime(minutesAgo: number): Date {
  return new Date(Date.now() - minutesAgo * 60 * 1000)
}

export const auctionListings: AuctionListing[] = [
  {
    id: 'auction-ocean-symphony',
    title: 'Ocean Symphony — Spring Collection',
    artist: 'Pam Longobardi',
    gradient: 'from-blue-600 to-teal-500',
    material: 'Plastic',
    category: 'Quarterly Themed',
    certification: 'Level 3',
    startingBid: 15000,
    currentBid: 27500,
    reservePrice: 35000,
    estimatedValue: 52000,
    bidCount: 14,
    endsAt: futureDate(6),
    description: 'A stunning assemblage from the Spring 2026 Ocean Reclamation series. Collected debris from three continents woven into a meditative seascape.',
    bidHistory: [
      { bidder: 'Collector_A***', amount: 27500, time: pastTime(12) },
      { bidder: 'GreenArt_F***', amount: 25000, time: pastTime(45) },
      { bidder: 'Sustain_X***', amount: 22000, time: pastTime(120) },
      { bidder: 'Collector_A***', amount: 20000, time: pastTime(180) },
      { bidder: 'EcoVault_K***', amount: 18000, time: pastTime(300) },
    ],
  },
  {
    id: 'auction-climate-urgency',
    title: 'Climate Urgency — Red Tide',
    artist: 'Alejandro Durán',
    gradient: 'from-red-700 to-rose-500',
    material: 'Plastic',
    category: 'Emergency Climate Auctions',
    certification: 'Level 2',
    startingBid: 20000,
    currentBid: 41000,
    reservePrice: 45000,
    estimatedValue: 68000,
    bidCount: 22,
    endsAt: futureDate(2.5),
    description: 'Emergency Climate Auction piece created from plastic waste recovered after a catastrophic red tide event. 100% of ERA platform fees donated to ocean cleanup.',
    bidHistory: [
      { bidder: 'Impact_M***', amount: 41000, time: pastTime(8) },
      { bidder: 'GreenArt_F***', amount: 39000, time: pastTime(15) },
      { bidder: 'OceanFund***', amount: 37500, time: pastTime(30) },
      { bidder: 'Impact_M***', amount: 35000, time: pastTime(60) },
      { bidder: 'Collector_B***', amount: 32000, time: pastTime(90) },
    ],
  },
  {
    id: 'auction-celeb-weave',
    title: 'Celebrity Collab: The Weave',
    artist: 'Vanessa Barragão × Stella McCartney',
    gradient: 'from-violet-700 to-purple-400',
    material: 'Textile',
    category: 'Celebrity Collaborations',
    certification: 'Level 3',
    startingBid: 50000,
    currentBid: 87000,
    reservePrice: 75000,
    estimatedValue: 125000,
    bidCount: 31,
    endsAt: futureDate(12),
    description: 'An extraordinary collaboration between textile artist Vanessa Barragão and fashion house Stella McCartney. Dead-stock luxury fabrics meet traditional Portuguese craftsmanship.',
    bidHistory: [
      { bidder: 'LuxArt_V***', amount: 87000, time: pastTime(5) },
      { bidder: 'FashionF***', amount: 82000, time: pastTime(20) },
      { bidder: 'LuxArt_V***', amount: 78000, time: pastTime(40) },
      { bidder: 'PrivateC***', amount: 75000, time: pastTime(80) },
      { bidder: 'FashionF***', amount: 70000, time: pastTime(150) },
    ],
  },
  {
    id: 'auction-quarterly-metal',
    title: 'Quarterly: Urban Alchemy',
    artist: 'Subodh Gupta',
    gradient: 'from-amber-700 to-orange-500',
    material: 'Metal',
    category: 'Quarterly Themed',
    certification: 'Level 3',
    startingBid: 40000,
    currentBid: 58000,
    reservePrice: 60000,
    estimatedValue: 95000,
    bidCount: 18,
    endsAt: futureDate(36),
    description: 'Featured in the Q2 2026 "Urban Alchemy" quarterly theme — domestic brass vessels transformed into an architectural meditation on home, displacement, and renewal.',
    bidHistory: [
      { bidder: 'Metro_A***', amount: 58000, time: pastTime(30) },
      { bidder: 'ArtColl***', amount: 55000, time: pastTime(90) },
      { bidder: 'Metro_A***', amount: 52000, time: pastTime(180) },
      { bidder: 'SustainF***', amount: 48000, time: pastTime(360) },
      { bidder: 'EcoLux_R***', amount: 45000, time: pastTime(600) },
    ],
  },
  {
    id: 'auction-climate-ewaste',
    title: 'Digital Coral Reef',
    artist: 'Peter McFarlane',
    gradient: 'from-cyan-600 to-sky-400',
    material: 'E-Waste',
    category: 'Emergency Climate Auctions',
    certification: 'Level 3',
    startingBid: 12000,
    currentBid: 19500,
    reservePrice: 22000,
    estimatedValue: 35000,
    bidCount: 11,
    endsAt: futureDate(8),
    description: 'Circuit boards arranged to mimic coral reef structures — a commentary on how technology mirrors and threatens natural ecosystems. Emergency Climate Auction proceeds support e-waste recycling programs.',
    bidHistory: [
      { bidder: 'TechArt***', amount: 19500, time: pastTime(60) },
      { bidder: 'GreenTe***', amount: 18000, time: pastTime(120) },
      { bidder: 'TechArt***', amount: 16500, time: pastTime(240) },
      { bidder: 'CircuitC***', amount: 15000, time: pastTime(360) },
      { bidder: 'EcoDigit***', amount: 13500, time: pastTime(500) },
    ],
  },
  {
    id: 'auction-celeb-portrait',
    title: 'Celebrity Collab: Waste Portrait',
    artist: 'Vik Muniz × Pharrell Williams',
    gradient: 'from-fuchsia-600 to-pink-400',
    material: 'Organic',
    category: 'Celebrity Collaborations',
    certification: 'Level 3',
    startingBid: 80000,
    currentBid: 142000,
    reservePrice: 120000,
    estimatedValue: 200000,
    bidCount: 38,
    endsAt: futureDate(48),
    description: "A monumental waste portrait collaboration — Pharrell's likeness rendered in recyclable materials by Vik Muniz, part of the ERA Celebrity Collaborations series.",
    bidHistory: [
      { bidder: 'PrivateC***', amount: 142000, time: pastTime(15) },
      { bidder: 'LuxArt_V***', amount: 135000, time: pastTime(45) },
      { bidder: 'CelebAr***', amount: 128000, time: pastTime(90) },
      { bidder: 'PrivateC***', amount: 120000, time: pastTime(150) },
      { bidder: 'LuxArt_V***', amount: 115000, time: pastTime(300) },
    ],
  },
]

export const AUCTION_CATEGORIES: AuctionCategory[] = [
  'Quarterly Themed',
  'Celebrity Collaborations',
  'Emergency Climate Auctions',
]

export const SIZE_OPTIONS: SizeCategory[] = ['S', 'M', 'L', 'Installation']
