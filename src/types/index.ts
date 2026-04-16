export interface Artwork {
  id: string
  title: string
  artist: string
  material: string
  image: string
  span: 'normal' | 'tall' | 'wide'
}

export interface GalleryArtwork {
  id: string
  title: string
  artist: string
  artistBio: string
  material: string
  materialDetail: string
  dimensions: string
  category: string
  certification: 'Level 2' | 'Level 3'
  price: number
  description: string
  gradient: string
  span: 'normal' | 'tall' | 'wide'
  year: number
}

export interface MissionPillar {
  icon: string
  title: string
  description: string
}

export interface ProcessStep {
  step: number
  title: string
  description: string
  icon: string
}

export interface RoadmapPhase {
  phase: number
  title: string
  subtitle: string
  items: string[]
  status: 'active' | 'upcoming' | 'future'
}
