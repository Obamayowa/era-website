import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HomePage } from '@/pages/HomePage'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { NewsletterSignup } from '@/components/home/NewsletterSignup'
import { useNewsletterStore } from '@/stores/useNewsletterStore'

// Mock framer-motion to simplify testing
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')
  return {
    ...actual,
    motion: new Proxy({} as Record<string, unknown>, {
      get: (_target, prop: string) => {
        return ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
          const filteredProps: Record<string, unknown> = {}
          for (const [key, val] of Object.entries(props)) {
            if (
              typeof val !== 'object' &&
              typeof val !== 'function' &&
              !key.startsWith('initial') &&
              !key.startsWith('animate') &&
              !key.startsWith('exit') &&
              !key.startsWith('transition') &&
              !key.startsWith('viewport') &&
              !key.startsWith('whileInView') &&
              !key.startsWith('whileHover') &&
              key !== 'style'
            ) {
              filteredProps[key] = val
            }
          }
          const Tag = prop as keyof JSX.IntrinsicElements
          return <Tag {...filteredProps}>{children}</Tag>
        }
      },
    }),
    AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
    useScroll: () => ({
      scrollYProgress: { get: () => 0, onChange: () => () => {} },
    }),
    useTransform: () => 0,
    useSpring: () => 0,
  }
})

describe('HomePage', () => {
  it('renders the hero section with tagline', () => {
    render(<HomePage />)
    expect(screen.getByText('From')).toBeInTheDocument()
    expect(screen.getByText('Waste')).toBeInTheDocument()
    expect(screen.getByText('to Wonder')).toBeInTheDocument()
  })

  it('renders the mission pillars section', () => {
    render(<HomePage />)
    expect(screen.getByText('Six Pillars of Purpose')).toBeInTheDocument()
    expect(screen.getByText('Zero-Waste Art')).toBeInTheDocument()
    expect(screen.getByText('Artist Empowerment')).toBeInTheDocument()
    expect(screen.getByText('Authenticated Origins')).toBeInTheDocument()
    expect(screen.getByText('Global Community')).toBeInTheDocument()
    expect(screen.getByText('Inclusive Access')).toBeInTheDocument()
    expect(screen.getByText('Innovation Lab')).toBeInTheDocument()
  })

  it('renders the featured artworks section', () => {
    render(<HomePage />)
    expect(screen.getByText('Featured Artworks')).toBeInTheDocument()
    expect(screen.getByText('Tidal Memory')).toBeInTheDocument()
    expect(screen.getByText('Iron Bloom')).toBeInTheDocument()
  })

  it('renders the process strip section', () => {
    render(<HomePage />)
    expect(screen.getByText('From Discard to Display')).toBeInTheDocument()
    expect(screen.getByText('Material Collected')).toBeInTheDocument()
    expect(screen.getByText('Artist Creates')).toBeInTheDocument()
    expect(screen.getByText('ERA Certifies')).toBeInTheDocument()
    expect(screen.getByText('Collector Acquires')).toBeInTheDocument()
  })

  it('renders the roadmap section', () => {
    render(<HomePage />)
    expect(screen.getByText('Building the Future of Recycled Art')).toBeInTheDocument()
    expect(screen.getByText('Foundation')).toBeInTheDocument()
    expect(screen.getByText('Marketplace')).toBeInTheDocument()
    expect(screen.getByText('Cultural Institution')).toBeInTheDocument()
  })

  it('renders the newsletter section', () => {
    render(<HomePage />)
    expect(screen.getByText('Join the Movement')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
  })
})

describe('Header', () => {
  it('renders navigation links', () => {
    render(<BrowserRouter><Header /></BrowserRouter>)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Gallery')).toBeInTheDocument()
    expect(screen.getByText('Marketplace')).toBeInTheDocument()
    expect(screen.getByText('Auctions')).toBeInTheDocument()
    expect(screen.getByText('Institution')).toBeInTheDocument()
    expect(screen.getByText('Artist Portal')).toBeInTheDocument()
  })

  it('renders ERA logo/branding', () => {
    render(<BrowserRouter><Header /></BrowserRouter>)
    expect(screen.getByText('ERA')).toBeInTheDocument()
  })

  it('has a CTA button', () => {
    render(<BrowserRouter><Header /></BrowserRouter>)
    const cta = screen.getAllByText('Shop Art')
    expect(cta.length).toBeGreaterThan(0)
  })

  it('has mobile menu toggle', () => {
    render(<BrowserRouter><Header /></BrowserRouter>)
    const menuButton = screen.getByLabelText('Open menu')
    expect(menuButton).toBeInTheDocument()
  })
})

describe('Footer', () => {
  it('renders footer with company name', () => {
    render(<Footer />)
    expect(screen.getByText('Everything Recycled Arts')).toBeInTheDocument()
  })

  it('renders footer navigation sections', () => {
    render(<Footer />)
    expect(screen.getByText('explore')).toBeInTheDocument()
    expect(screen.getByText('about')).toBeInTheDocument()
    expect(screen.getByText('connect')).toBeInTheDocument()
  })

  it('renders copyright', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${year}`))).toBeInTheDocument()
  })
})

describe('Newsletter Signup', () => {
  beforeEach(() => {
    useNewsletterStore.setState({ status: 'idle', email: '', subscriberCount: 2847 })
  })

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup()
    render(<NewsletterSignup />)
    
    const submitBtn = screen.getByRole('button', { name: /join era/i })
    await user.click(submitBtn)
    
    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument()
  })

  it('shows subscriber count', () => {
    render(<NewsletterSignup />)
    expect(screen.getByText('2,847')).toBeInTheDocument()
  })
})

describe('Newsletter Store', () => {
  beforeEach(() => {
    useNewsletterStore.setState({ status: 'idle', email: '', subscriberCount: 2847 })
  })

  it('has correct initial state', () => {
    const state = useNewsletterStore.getState()
    expect(state.status).toBe('idle')
    expect(state.subscriberCount).toBe(2847)
  })

  it('sets email', () => {
    useNewsletterStore.getState().setEmail('test@example.com')
    expect(useNewsletterStore.getState().email).toBe('test@example.com')
  })

  it('handles subscribe', async () => {
    await useNewsletterStore.getState().subscribe('test@example.com')
    const state = useNewsletterStore.getState()
    expect(state.status).toBe('success')
    expect(state.subscriberCount).toBe(2848)
  })

  it('resets state', () => {
    useNewsletterStore.setState({ status: 'success', email: 'test@test.com' })
    useNewsletterStore.getState().reset()
    const state = useNewsletterStore.getState()
    expect(state.status).toBe('idle')
    expect(state.email).toBe('')
  })
})
