export interface Artwork {
  id: string
  title: string
  artist: string
  material: string
  image: string
  span: 'normal' | 'tall' | 'wide'
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
