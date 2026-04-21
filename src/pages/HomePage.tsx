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

interface HomeSections {
  heroLine1?: string; heroHighlightWord?: string; heroLine2?: string; heroBadgeText?: string; heroSubtext?: string
  heroCTA1Label?: string; heroCTA1Href?: string; heroCTA2Label?: string; heroCTA2Href?: string; heroImageUrl?: string
  marqueeItems?: string[]
  missionBadge?: string; missionHeadline?: string; missionSubtext?: string
  missionPillars?: { icon?: string; title?: string; description?: string }[]
  processBadge?: string; processHeadline?: string; processSubtext?: string
  processSteps?: { icon?: string; title?: string; description?: string }[]
  featuredBadge?: string; featuredHeadline?: string; featuredSubtext?: string; featuredCTALabel?: string; featuredCTAHref?: string
  roadmapBadge?: string; roadmapHeadline?: string; roadmapSubtext?: string
  roadmapPhases?: { phase?: string; title?: string; status?: string; items?: string[] }[]
  newsletterBadge?: string; newsletterHeadline?: string; newsletterSubtext?: string; newsletterButtonLabel?: string
  newsletterSuccessHeadline?: string; newsletterSuccessText?: string; newsletterSubscriberLabel?: string
}

interface HomeData {
  featuredArtworks?: { _id: string; title?: string; price?: number; material?: string; artist?: { name?: string }; imageUrl?: string; slug?: { current?: string } }[]
}

export function HomePage() {
  const { data: sections } = useSanity<HomeSections | null>(HOME_SECTIONS_QUERY, null)
  const { data: homeData } = useSanity<HomeData | null>(FEATURED_ARTWORKS_QUERY, null)

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
