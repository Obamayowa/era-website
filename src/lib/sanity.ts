import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'REPLACE_WITH_YOUR_PROJECT_ID',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // fast cached reads for public content
})

// Image URL helper — use like: urlFor(image).width(800).url()
const builder = imageUrlBuilder(sanityClient)
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ── GROQ Queries ────────────────────────────────────────────────

/** All artworks listed for sale */
export const ARTWORKS_QUERY = `*[_type == "artwork" && isForSale == true] | order(_createdAt desc) {
  _id, title, description, material, price, dimensions, year, certificationLevel, category, slug,
  "images": images[].asset->url,
  "artist": artist->{ name, location, certificationLevel }
}`

/** Featured artworks for homepage */
export const FEATURED_ARTWORKS_QUERY = `*[_type == "artwork" && isFeatured == true][0...6] {
  _id, title, price, material,
  "images": images[].asset->url,
  "artist": artist->{ name }
}`

/** All artists */
export const ARTISTS_QUERY = `*[_type == "artist"] | order(name asc) {
  _id, name, location, bio, certificationLevel, primaryMaterials, instagram, website,
  "profileImage": profileImage.asset->url
}`

/** Homepage content */
export const HOME_PAGE_QUERY = `*[_type == "homePage"][0] {
  heroHeadline, heroSubheadline, heroCTALabel,
  "heroImage": heroImage.asset->url,
  stats,
  missionHeadline, missionText,
  "featuredArtworks": featuredArtworks[]->{
    _id, title, price, material,
    "images": images[].asset->url,
    "artist": artist->{ name }
  }
}`

/** About page content */
export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0] {
  headline, founderName, founderBio, missionStatement,
  missionPillars, impactNumbers, certificationInfo,
  "founderPhoto": founderPhoto.asset->url
}`

/** Site settings */
export const SETTINGS_QUERY = `*[_type == "settings"][0] {
  siteName, tagline, contactEmail, instagram, twitter,
  footerText, newsletterHeadline, newsletterSubtext,
  "logo": logo.asset->url
}`
