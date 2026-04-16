import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useMarketplaceStore } from '@/stores/useMarketplaceStore'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Auctions', href: '/marketplace/auctions' },
  { label: 'Mission', href: '/#mission' },
  { label: 'Artist Portal', href: '/artists/signup' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { toggleCart, getCartCount } = useMarketplaceStore()
  const cartCount = getCartCount()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isInnerPage = location.pathname !== '/'
  const headerSolid = isScrolled || isInnerPage

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        headerSolid
          ? 'bg-offwhite/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="flex items-center gap-3 group" aria-label="ERA Home">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-offwhite font-heading font-bold text-lg">
              E
            </div>
            <span
              className={cn(
                'font-heading text-lg font-semibold transition-colors',
                headerSolid ? 'text-primary' : 'text-offwhite'
              )}
            >
              ERA
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isRoute = link.href.startsWith('/') && !link.href.includes('#')
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
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-accent',
                    headerSolid ? 'text-stone' : 'text-offwhite/90'
                  )}
                >
                  {link.label}
                </a>
              )
            })}

            {/* Cart icon */}
            <button
              onClick={toggleCart}
              className={cn(
                'relative p-2 rounded-lg transition-colors',
                headerSolid ? 'text-stone hover:text-primary' : 'text-offwhite/90 hover:text-accent'
              )}
              aria-label="Shopping cart"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-primary text-[9px] font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            <Link
              to="/marketplace"
              className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-primary transition-all hover:bg-accent/80 hover:scale-105"
            >
              Shop Art
            </Link>
          </nav>

          <button
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors',
              headerSolid ? 'text-stone' : 'text-offwhite'
            )}
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
                const isRoute = link.href.startsWith('/') && !link.href.includes('#')
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    {isRoute ? (
                      <Link
                        to={link.href}
                        className="text-2xl font-heading text-offwhite hover:text-accent transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-2xl font-heading text-offwhite hover:text-accent transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.div>
                )
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
              >
                <Link
                  to="/marketplace"
                  className="mt-4 rounded-full bg-accent px-8 py-3 text-lg font-semibold text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  Shop Art
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
