import { useSanity } from '@/hooks/useSanity'
import { HeroSection } from '@/components/home/HeroSection'
import { MarqueeStrip } from '@/components/home/MarqueeStrip'
import { MissionPillars } from '@/components/home/MissionPillars'
import { FeaturedArtworks } from '@/components/home/FeaturedArtworks'
import { ProcessStrip } from '@/components/home/ProcessStrip'
import { RoadmapTeaser } from '@/components/home/RoadmapTeaser'
import { NewsletterSignup } from '@/components/home/NewsletterSignup'

const HOME_SECTIONS_QUERY = `*[_type == "homeSections"][0] {
  heroLine1, heroHighlightWord, heroLine2, heroBadgeText, heroSubtext,
  heroCTA1Label, heroCTA1Href, heroCTA2Label, heroCTA2Href,
  "heroImageUrl": heroImage.asset->url,
  marqueeItems,
  missionBadge, missionHeadline, missionSubtext, missionPillars,
  processBadge, processHeadline, processSubtext, processSteps,
  featuredBadge, featuredHeadline, featuredSubtext, featuredCTALabel, featuredCTAHref,
  roadmapBadge, roadmapHeadline, roadmapSubtext, roadmapPhases,
  newsletterBadge, newsletterHeadline, newsletterSubtext, newsletterButtonLabel,
  newsletterSuccessHeadline, newsletterSuccessText, newsletterSubscriberLabel
}`

const FEATURED_ARTWORKS_QUERY = `*[_type == "homePage"][0] {
  "featuredArtworks": featuredArtworks[]->{
    _id, title, price, material, "artist": artist->{ name },
    "imageUrl": images[0].asset->url,
    slug
  }
}`

export function HomePage() {
  const { data: sections } = useSanity(HOME_SECTIONS_QUERY, null)
  const { data: homeData } = useSanity(FEATURED_ARTWORKS_QUERY, null)

  return (
    <main>
      <HeroSection data={sections} />
      <MarqueeStrip items={sections?.marqueeItems} />
      <MissionPillars data={sections} />
      <FeaturedArtworks artworks={homeData?.featuredArtworks} data={sections} />
      <ProcessStrip data={sections} />
      <RoadmapTeaser data={sections} />
      <NewsletterSignup data={sections} />
    </main>
  )
}
