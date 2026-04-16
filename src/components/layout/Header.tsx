import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Mission', href: '#mission' },
  { label: 'Artworks', href: '#artworks' },
  { label: 'Process', href: '#process' },
  { label: 'Roadmap', href: '#roadmap' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-offwhite/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <a href="#" className="flex items-center gap-3 group" aria-label="ERA Home">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-offwhite font-heading font-bold text-lg">
              E
            </div>
            <span
              className={cn(
                'font-heading text-lg font-semibold transition-colors',
                isScrolled ? 'text-primary' : 'text-offwhite'
              )}
            >
              ERA
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-accent',
                  isScrolled ? 'text-stone' : 'text-offwhite/90'
                )}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#newsletter"
              className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-primary transition-all hover:bg-accent/80 hover:scale-105"
            >
              Join ERA
            </a>
          </nav>

          <button
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors',
              isScrolled ? 'text-stone' : 'text-offwhite'
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
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-2xl font-heading text-offwhite hover:text-accent transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#newsletter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
                className="mt-4 rounded-full bg-accent px-8 py-3 text-lg font-semibold text-primary"
                onClick={() => setMobileOpen(false)}
              >
                Join ERA
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
