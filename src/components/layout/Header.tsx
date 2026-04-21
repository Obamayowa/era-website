import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useMarketplaceStore } from '@/stores/useMarketplaceStore'
import { useSanity } from '@/hooks/useSanity'

const FALLBACK_NAV = [
  { label: 'Home', href: '/', isDropdown: false, dropdownItems: [] },
  { label: 'Gallery', href: '/gallery', isDropdown: false, dropdownItems: [] },
  { label: 'Marketplace', href: '/marketplace', isDropdown: false, dropdownItems: [] },
  { label: 'Auctions', href: '/marketplace/auctions', isDropdown: false, dropdownItems: [] },
  {
    label: 'Institution', href: '#', isDropdown: true,
    dropdownItems: [
      { label: 'About', href: '/about' },
      { label: 'Education', href: '/education' },
      { label: 'Corporate', href: '/corporate' },
    ],
  },
  { label: 'Artist Portal', href: '/artists/signup', isDropdown: false, dropdownItems: [] },
]

const NAV_QUERY = `*[_type == "navigation"][0] {
  logoText, ctaLabel, ctaHref,
  navLinks[] { label, href, isDropdown, dropdownItems[] { label, href } }
}`

interface NavItem {
  label: string
  href: string
  isDropdown?: boolean
  dropdownItems?: { label: string; href: string }[]
}

interface NavData {
  logoText?: string
  ctaLabel?: string
  ctaHref?: string
  navLinks?: NavItem[]
}

function DropdownMenu({ items, onNavigate }: {
  items: { label: string; href: string }[]
  onNavigate?: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 rounded-xl bg-offwhite shadow-lg border border-stone/10 py-2 z-50"
    >
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.href}
          onClick={onNavigate}
          className="block px-4 py-2 text-sm text-stone/80 hover:text-primary hover:bg-primary/5 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </motion.div>
  )
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { toggleCart, getCartCount } = useMarketplaceStore()
  const cartCount = getCartCount()
  const { data: navData } = useSanity<NavData | null>(NAV_QUERY, null)

  const logoText = navData?.logoText || 'ERA'
  const ctaLabel = navData?.ctaLabel || 'Shop Art'
  const ctaHref = navData?.ctaHref || '/marketplace'
  const navLinks: NavItem[] = (navData?.navLinks && navData.navLinks.length > 0)
    ? navData.navLinks
    : FALLBACK_NAV

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setDropdownOpen(null)
    setMobileOpen(false)
  }, [location.pathname])

  const isInnerPage = location.pathname !== '/'
  const headerSolid = isScrolled || isInnerPage

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        headerSolid ? 'bg-offwhite/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="flex items-center gap-3 group" aria-label="ERA Home">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-offwhite font-heading font-bold text-lg">
              {logoText.charAt(0)}
            </div>
            <span className={cn('font-heading text-lg font-semibold transition-colors', headerSolid ? 'text-primary' : 'text-offwhite')}>
              {logoText}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => {
              if (link.isDropdown && link.dropdownItems && link.dropdownItems.length > 0) {
                const isActive = link.dropdownItems.some(c => c.href === location.pathname)
                return (
                  <div key={link.label} ref={dropdownRef} className="relative">
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === link.label ? null : link.label)}
                      className={cn(
                        'flex items-center gap-1 text-sm font-medium transition-colors hover:text-accent',
                        headerSolid ? 'text-stone' : 'text-offwhite/90',
                        isActive && 'text-accent'
                      )}
                      aria-expanded={dropdownOpen === link.label}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown size={14} className={cn('transition-transform', dropdownOpen === link.label && 'rotate-180')} />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen === link.label && (
                        <DropdownMenu items={link.dropdownItems} onNavigate={() => setDropdownOpen(null)} />
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              const isRoute = link.href && link.href.startsWith('/') && !link.href.includes('#')
              if (isRoute) {
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-accent',
                      headerSolid ? 'text-stone' : 'text-offwhite/90',
                      location.pathname === link.href && 'text-accent'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              }
              return (
                <a key={link.label} href={link.href || '#'}
                  className={cn('text-sm font-medium transition-colors hover:text-accent', headerSolid ? 'text-stone' : 'text-offwhite/90')}
                >
                  {link.label}
                </a>
              )
            })}

            <button
              onClick={toggleCart}
              className={cn('relative p-2 rounded-lg transition-colors', headerSolid ? 'text-stone hover:text-primary' : 'text-offwhite/90 hover:text-accent')}
              aria-label="Shopping cart"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-primary text-[9px] font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            <Link
              to={ctaHref}
              className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-primary transition-all hover:bg-accent/80 hover:scale-105"
            >
              {ctaLabel}
            </Link>
          </nav>

          <button
            className={cn('md:hidden p-2 rounded-lg transition-colors', headerSolid ? 'text-stone' : 'text-offwhite')}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 bg-primary/98 backdrop-blur-lg md:hidden z-40"
          >
            <nav className="flex flex-col items-center justify-center gap-8 pt-20" aria-label="Mobile navigation">
              {navLinks.map((link, i) => {
                if (link.isDropdown && link.dropdownItems && link.dropdownItems.length > 0) {
                  return (
                    <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <span className="text-lg font-heading text-offwhite/50 uppercase tracking-wider text-xs">{link.label}</span>
                      {link.dropdownItems.map((child) => (
                        <Link key={child.label} to={child.href}
                          className="text-xl font-heading text-offwhite hover:text-accent transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )
                }
                const isRoute = link.href && link.href.startsWith('/') && !link.href.includes('#')
                return (
                  <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                    {isRoute ? (
                      <Link to={link.href} className="text-2xl font-heading text-offwhite hover:text-accent transition-colors" onClick={() => setMobileOpen(false)}>
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href || '#'} className="text-2xl font-heading text-offwhite hover:text-accent transition-colors" onClick={() => setMobileOpen(false)}>
                        {link.label}
                      </a>
                    )}
                  </motion.div>
                )
              })}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: navLinks.length * 0.08 }}>
                <Link to={ctaHref} className="mt-4 rounded-full bg-accent px-8 py-3 text-lg font-semibold text-primary" onClick={() => setMobileOpen(false)}>
                  {ctaLabel}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
