import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, within, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AboutPage } from '@/pages/Institution/AboutPage'
import { EducationPage } from '@/pages/Institution/EducationPage'
import { CorporatePage } from '@/pages/Institution/CorporatePage'

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
              (typeof val !== 'function' || key.startsWith('on')) &&
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

/* ═════════════════════════
   ABOUT PAGE
   ═════════════════════════ */
describe('AboutPage', () => {
  it('renders the hero heading', () => {
    render(<AboutPage />)
    expect(screen.getByText(/Establishing the Foundation for/)).toBeInTheDocument()
    expect(screen.getByText(/Sustainable Artistic Excellence/)).toBeInTheDocument()
  })

  it('renders the founder section with name Oba', () => {
    render(<AboutPage />)
    expect(screen.getByText('Oba')).toBeInTheDocument()
    expect(screen.getByText('Founder & Artistic Director')).toBeInTheDocument()
  })

  it('renders the founder pull quote', () => {
    render(<AboutPage />)
    expect(screen.getByText(/Every discarded material carries a story/)).toBeInTheDocument()
  })

  it('renders all three certification tiers', () => {
    render(<AboutPage />)
    expect(screen.getByText('Participating')).toBeInTheDocument()
    expect(screen.getByText('Verified')).toBeInTheDocument()
    expect(screen.getByText('Certified')).toBeInTheDocument()
  })

  it('renders certification level badges', () => {
    render(<AboutPage />)
    expect(screen.getByText('Level 1')).toBeInTheDocument()
    expect(screen.getByText('Level 2')).toBeInTheDocument()
    expect(screen.getByText('Level 3')).toBeInTheDocument()
  })

  it('renders blockchain call-out', () => {
    render(<AboutPage />)
    expect(screen.getByText('Blockchain-Anchored Provenance')).toBeInTheDocument()
  })

  it('renders impact metrics section', () => {
    render(<AboutPage />)
    expect(screen.getByText('Tons Waste Diverted')).toBeInTheDocument()
    expect(screen.getByText('Artists Empowered')).toBeInTheDocument()
    expect(screen.getByText('Artworks Certified')).toBeInTheDocument()
    expect(screen.getByText('Countries Reached')).toBeInTheDocument()
  })

  it('renders all six organizational divisions', () => {
    render(<AboutPage />)
    expect(screen.getByText('Digital')).toBeInTheDocument()
    expect(screen.getByText('Cultural')).toBeInTheDocument()
    expect(screen.getByText('Research')).toBeInTheDocument()
    expect(screen.getByText('Marketplace')).toBeInTheDocument()
    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByText('Operations')).toBeInTheDocument()
  })
})

/* ═════════════════════════
   EDUCATION PAGE
   ═════════════════════════ */
describe('EducationPage', () => {
  it('renders the hero heading', () => {
    render(<EducationPage />)
    expect(screen.getByText(/Learn the Art of/)).toBeInTheDocument()
    expect(screen.getByText(/Sustainable Creation/)).toBeInTheDocument()
  })

  it('renders all four tabs', () => {
    render(<EducationPage />)
    expect(screen.getByRole('tab', { name: /Workshops/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Online Courses/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /School Programs/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Residency/i })).toBeInTheDocument()
  })

  it('shows workshops tab by default with workshop cards', () => {
    render(<EducationPage />)
    expect(screen.getByText('Foundations of Recycled Art')).toBeInTheDocument()
    expect(screen.getByText('Advanced Sculptural Assemblage')).toBeInTheDocument()
    expect(screen.getByText('Digital Meets Physical')).toBeInTheDocument()
    expect(screen.getByText('Certification Prep Intensive')).toBeInTheDocument()
  })

  it('switches to online courses tab', async () => {
    const user = userEvent.setup()
    render(<EducationPage />)
    
    await user.click(screen.getByRole('tab', { name: /Online Courses/i }))
    expect(screen.getByText('Material Science for Artists')).toBeInTheDocument()
    expect(screen.getByText('The Business of Sustainable Art')).toBeInTheDocument()
    expect(screen.getByText('Curatorial Perspectives')).toBeInTheDocument()
  })

  it('switches to school programs tab', async () => {
    const user = userEvent.setup()
    render(<EducationPage />)
    
    await user.click(screen.getByRole('tab', { name: /School Programs/i }))
    expect(screen.getByText('ERA Junior Artists')).toBeInTheDocument()
    expect(screen.getByText('High School Portfolio Lab')).toBeInTheDocument()
    expect(screen.getByText('University Partnerships')).toBeInTheDocument()
  })

  it('switches to residency tab showing application flow', async () => {
    const user = userEvent.setup()
    render(<EducationPage />)
    
    await user.click(screen.getByRole('tab', { name: /Residency/i }))
    expect(screen.getByText('Application Process')).toBeInTheDocument()
    expect(screen.getByText('Apply')).toBeInTheDocument()
    expect(screen.getByText('Review')).toBeInTheDocument()
    expect(screen.getByText('Residency Support')).toBeInTheDocument()
  })

  it('renders Material Weeks section', () => {
    render(<EducationPage />)
    expect(screen.getByText('Material Weeks')).toBeInTheDocument()
    expect(screen.getByText('Plastic Week')).toBeInTheDocument()
    expect(screen.getByText('Textile Week')).toBeInTheDocument()
    expect(screen.getByText('E-Waste Week')).toBeInTheDocument()
    expect(screen.getByText('Organic Week')).toBeInTheDocument()
  })

  it('shows workshop prices', () => {
    render(<EducationPage />)
    expect(screen.getByText('$180')).toBeInTheDocument()
    expect(screen.getByText('$450')).toBeInTheDocument()
  })
})

/* ═════════════════════════
   CORPORATE PAGE
   ═════════════════════════ */
describe('CorporatePage', () => {
  it('renders the hero heading', () => {
    render(<CorporatePage />)
    expect(screen.getByText(/Turn Your Waste Into/)).toBeInTheDocument()
    expect(screen.getByText(/Cultural Capital/)).toBeInTheDocument()
  })

  it('renders all three service cards', () => {
    render(<CorporatePage />)
    expect(screen.getAllByText('Waste-to-Art Consulting').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Custom Installations').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Employee Engagement').length).toBeGreaterThanOrEqual(1)
  })

  it('renders Call for Waste program steps', () => {
    render(<CorporatePage />)
    expect(screen.getByText('Call for Waste')).toBeInTheDocument()
    expect(screen.getByText('Audit')).toBeInTheDocument()
    expect(screen.getByText('Matching')).toBeInTheDocument()
    expect(screen.getByText('Pickup')).toBeInTheDocument()
    expect(screen.getByText('Impact Story')).toBeInTheDocument()
  })

  it('renders the inquiry form', () => {
    render(<CorporatePage />)
    expect(screen.getByLabelText(/Company Name/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Contact Name/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Phone/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Industry/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Primary Interest/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Tell us about your goals/)).toBeInTheDocument()
  })

  it('submits the inquiry form', () => {
    render(<CorporatePage />)

    fireEvent.change(screen.getByLabelText(/Company Name/), { target: { value: 'Acme Corp', name: 'company' } })
    fireEvent.change(screen.getByLabelText(/Contact Name/), { target: { value: 'Jane Smith', name: 'name' } })
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'jane@acme.com', name: 'email' } })

    expect(screen.getByLabelText(/Company Name/)).toHaveValue('Acme Corp')

    const form = screen.getByRole('button', { name: /Submit Inquiry/i }).closest('form')!
    fireEvent.submit(form)

    expect(screen.getByText('Inquiry Submitted')).toBeInTheDocument()
    expect(screen.getByText(/corporate partnerships team/)).toBeInTheDocument()
  })

  it('renders industry dropdown options', () => {
    render(<CorporatePage />)
    const select = screen.getByLabelText(/Industry/) as HTMLSelectElement
    const options = within(select).getAllByRole('option')
    expect(options.length).toBeGreaterThanOrEqual(7) // "Select industry" + 6 industries
  })

  it('renders service features', () => {
    render(<CorporatePage />)
    expect(screen.getByText('Waste stream analysis')).toBeInTheDocument()
    expect(screen.getByText('ERA-certified artists')).toBeInTheDocument()
    expect(screen.getByText('Impact dashboards')).toBeInTheDocument()
  })
})
