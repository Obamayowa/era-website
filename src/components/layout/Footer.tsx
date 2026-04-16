import { Heart, Globe, MessageCircle, Mail, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  explore: [
    { label: 'Artworks', href: '#artworks' },
    { label: 'Artists', href: '#' },
    { label: 'Materials', href: '#' },
    { label: 'Process', href: '#process' },
  ],
  about: [
    { label: 'Mission', href: '#mission' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Team', href: '#' },
    { label: 'Press', href: '#' },
  ],
  connect: [
    { label: 'Newsletter', href: '#newsletter' },
    { label: 'Contact', href: '#' },
    { label: 'Partnerships', href: '#' },
    { label: 'Careers', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-offwhite/80" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary font-heading font-bold text-lg">
                E
              </div>
              <span className="font-heading text-xl font-bold text-offwhite">
                Everything Recycled Arts
              </span>
            </div>
            <p className="text-offwhite/60 max-w-sm leading-relaxed">
              Transforming waste into wonder. We believe in the power of art to reimagine our 
              relationship with discarded materials and inspire sustainable creativity.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-2 rounded-full bg-offwhite/10 hover:bg-accent/20 hover:text-accent transition-all" aria-label="Follow us on social media">
                <Globe size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-offwhite/10 hover:bg-accent/20 hover:text-accent transition-all" aria-label="Message us">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-offwhite/10 hover:bg-accent/20 hover:text-accent transition-all" aria-label="Email us">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-offwhite mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
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
            © {new Date().getFullYear()} Everything Recycled Arts. All rights reserved.
          </p>
          <p className="text-xs text-offwhite/40 flex items-center gap-1">
            Made with <Heart size={12} className="text-accent" /> for the planet
          </p>
        </div>
      </div>
    </footer>
  )
}
