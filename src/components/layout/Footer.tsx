import { Heart, ArrowUpRight } from 'lucide-react'
import { useSanity } from '@/hooks/useSanity'

const FOOTER_QUERY = `*[_type == "navigation"][0] {
  logoText, footerTagline, footerCopyright, instagramUrl, twitterUrl, linkedinUrl,
  footerColumns[] { heading, links[] { label, href } }
}`

const FALLBACK_COLUMNS = [
  {
    heading: 'Explore',
    links: [
      { label: 'Artworks', href: '#artworks' },
      { label: 'Artists', href: '#' },
      { label: 'Materials', href: '#' },
      { label: 'Process', href: '#process' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'Mission', href: '#mission' },
      { label: 'Roadmap', href: '#roadmap' },
      { label: 'Team', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Newsletter', href: '#newsletter' },
      { label: 'Contact', href: '#' },
      { label: 'Partnerships', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
]

interface FooterData {
  logoText?: string
  footerTagline?: string
  footerCopyright?: string
  instagramUrl?: string
  twitterUrl?: string
  linkedinUrl?: string
  footerColumns?: { heading?: string; links?: { label?: string; href?: string }[] }[]
}

export function Footer() {
  const { data } = useSanity<FooterData | null>(FOOTER_QUERY, null)

  const logoText = data?.logoText || 'Everything Recycled Arts'
  const tagline = data?.footerTagline || 'Transforming waste into wonder. We believe in the power of art to reimagine our relationship with discarded materials and inspire sustainable creativity.'
  const copyright = data?.footerCopyright || `© ${new Date().getFullYear()} Everything Recycled Arts. All rights reserved.`
  const columns = (data?.footerColumns && data.footerColumns.length > 0) ? data.footerColumns : FALLBACK_COLUMNS
  const instagramUrl = data?.instagramUrl || '#'
  const twitterUrl = data?.twitterUrl || '#'
  const linkedinUrl = data?.linkedinUrl || '#'

  return (
    <footer className="bg-primary text-offwhite/80" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary font-heading font-bold text-lg">
                {logoText.charAt(0)}
              </div>
              <span className="font-heading text-xl font-bold text-offwhite">
                {logoText}
              </span>
            </div>
            <p className="text-offwhite/60 max-w-sm leading-relaxed">
              {tagline}
            </p>
            <div className="flex gap-4 mt-6">
              <a href={instagramUrl} className="p-2 rounded-full bg-offwhite/10 hover:bg-accent/20 hover:text-accent transition-all" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href={twitterUrl} className="p-2 rounded-full bg-offwhite/10 hover:bg-accent/20 hover:text-accent transition-all" aria-label="Twitter / X">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l16 16M4 20 20 4"/></svg>
              </a>
              <a href={linkedinUrl} className="p-2 rounded-full bg-offwhite/10 hover:bg-accent/20 hover:text-accent transition-all" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-offwhite mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {(col.links || []).map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href || '#'}
                      className="text-sm text-offwhite/60 hover:text-accent transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-offwhite/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-offwhite/40">
            {copyright}
          </p>
          <p className="text-xs text-offwhite/40 flex items-center gap-1">
            Made with <Heart size={12} className="text-accent" /> for the planet
          </p>
        </div>
      </div>
    </footer>
  )
}
