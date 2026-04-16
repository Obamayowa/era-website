import { HeroSection } from '@/components/home/HeroSection'
import { MarqueeStrip } from '@/components/home/MarqueeStrip'
import { MissionPillars } from '@/components/home/MissionPillars'
import { FeaturedArtworks } from '@/components/home/FeaturedArtworks'
import { ProcessStrip } from '@/components/home/ProcessStrip'
import { RoadmapTeaser } from '@/components/home/RoadmapTeaser'
import { NewsletterSignup } from '@/components/home/NewsletterSignup'

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <MarqueeStrip />
      <MissionPillars />
      <FeaturedArtworks />
      <ProcessStrip />
      <RoadmapTeaser />
      <NewsletterSignup />
    </main>
  )
}
