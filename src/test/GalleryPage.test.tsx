import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { GalleryPage } from '@/pages/GalleryPage'
import { useGalleryStore } from '@/stores/useGalleryStore'
import { galleryArtworks } from '@/data/galleryData'

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')

  const motionPropPrefixes = [
    'initial', 'animate', 'exit', 'transition', 'viewport',
    'whileInView', 'whileHover', 'whileTap', 'whileFocus', 'whileDrag',
    'layout', 'drag',
  ]

  return {
    ...actual,
    motion: new Proxy({} as Record<string, unknown>, {
      get: (_target, prop: string) => {
        return ({ children, style: _style, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
          const filteredProps: Record<string, unknown> = {}
          for (const [key, val] of Object.entries(props)) {
            const isMotionProp = motionPropPrefixes.some((p) => key.startsWith(p))
            if (!isMotionProp) {
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

function renderGallery() {
  return render(
    <BrowserRouter>
      <GalleryPage />
    </BrowserRouter>
  )
}

describe('GalleryPage', () => {
  beforeEach(() => {
    useGalleryStore.setState({
      artworks: galleryArtworks,
      filteredArtworks: galleryArtworks,
      selectedArtwork: null,
      materialFilter: 'All',
      certificationFilter: 'All',
      searchQuery: '',
      layoutMode: 'masonry',
      isModalOpen: false,
    })
  })

  it('renders the gallery page hero', () => {
    renderGallery()
    expect(screen.getByText('Explore the Collection')).toBeInTheDocument()
    expect(screen.getByText(/certified recycled artworks/)).toBeInTheDocument()
  })

  it('renders all 14 artwork cards', () => {
    renderGallery()
    expect(screen.getByText("Sappho's Mirror I")).toBeInTheDocument()
    expect(screen.getByText('Untitled Plastic Bag Sculptures')).toBeInTheDocument()
    expect(screen.getByText('Terminal')).toBeInTheDocument()
    expect(screen.getByText('Tate Thames Dig Cabinet')).toBeInTheDocument()
  })

  it('renders the search input', () => {
    renderGallery()
    expect(screen.getByLabelText('Search artworks')).toBeInTheDocument()
  })

  it('renders material filter buttons', () => {
    renderGallery()
    expect(screen.getByRole('button', { name: 'Plastic' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Textile' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Metal' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'E-Waste' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Organic' })).toBeInTheDocument()
    const allButtons = screen.getAllByRole('button', { name: 'All' })
    expect(allButtons).toHaveLength(2)
  })

  it('renders certification filter buttons', () => {
    renderGallery()
    expect(screen.getByRole('button', { name: 'Level 2' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Level 3' })).toBeInTheDocument()
  })

  it('renders layout toggle buttons', () => {
    renderGallery()
    expect(screen.getByLabelText('Masonry layout')).toBeInTheDocument()
    expect(screen.getByLabelText('Uniform grid layout')).toBeInTheDocument()
  })

  it('filters by material when a filter button is clicked', async () => {
    const user = userEvent.setup()
    renderGallery()

    await user.click(screen.getByRole('button', { name: 'Plastic' }))

    expect(screen.getByText("Sappho's Mirror I")).toBeInTheDocument()
    expect(screen.getByText('Untitled Plastic Bag Sculptures')).toBeInTheDocument()
    expect(screen.getByText('"Washed Up" Series')).toBeInTheDocument()
    expect(screen.queryByText('Terminal')).not.toBeInTheDocument()
    expect(screen.queryByText('Tate Thames Dig Cabinet')).not.toBeInTheDocument()
  })

  it('filters by certification level', async () => {
    const user = userEvent.setup()
    renderGallery()

    await user.click(screen.getByRole('button', { name: 'Level 3' }))

    expect(screen.getByText("Sappho's Mirror I")).toBeInTheDocument()
    expect(screen.getByText('Terminal')).toBeInTheDocument()
    expect(screen.queryByText('Untitled Plastic Bag Sculptures')).not.toBeInTheDocument()
  })

  it('searches artworks by artist name', async () => {
    const user = userEvent.setup()
    renderGallery()

    const searchInput = screen.getByLabelText('Search artworks')
    await user.type(searchInput, 'Vik Muniz')

    expect(screen.getByText('"Waste Land" Collaborative Portraits')).toBeInTheDocument()
    expect(screen.queryByText('Terminal')).not.toBeInTheDocument()
  })

  it('searches artworks by material', async () => {
    const user = userEvent.setup()
    renderGallery()

    const searchInput = screen.getByLabelText('Search artworks')
    await user.type(searchInput, 'circuit board')

    expect(screen.getByText('Circuit Board Fossils & Scrapescapes')).toBeInTheDocument()
    expect(screen.queryByText("Sappho's Mirror I")).not.toBeInTheDocument()
  })

  it('shows empty state when no results match', async () => {
    const user = userEvent.setup()
    renderGallery()

    const searchInput = screen.getByLabelText('Search artworks')
    await user.type(searchInput, 'xyznonexistent')

    expect(screen.getByText('No artworks found')).toBeInTheDocument()
  })

  it('toggles layout mode', async () => {
    const user = userEvent.setup()
    renderGallery()

    const uniformBtn = screen.getByLabelText('Uniform grid layout')
    await user.click(uniformBtn)

    expect(useGalleryStore.getState().layoutMode).toBe('uniform')
  })

  it('shows correct artwork count in hero', () => {
    renderGallery()
    expect(screen.getByText('14 artworks shown')).toBeInTheDocument()
  })

  it('updates artwork count when filtered', async () => {
    const user = userEvent.setup()
    renderGallery()

    await user.click(screen.getByRole('button', { name: 'Plastic' }))
    expect(screen.getByText('3 artworks shown')).toBeInTheDocument()
  })
})

describe('Artwork Detail Modal', () => {
  beforeEach(() => {
    useGalleryStore.setState({
      artworks: galleryArtworks,
      filteredArtworks: galleryArtworks,
      selectedArtwork: null,
      materialFilter: 'All',
      certificationFilter: 'All',
      searchQuery: '',
      layoutMode: 'masonry',
      isModalOpen: false,
    })
  })

  it('opens modal when artwork card is clicked', async () => {
    const user = userEvent.setup()
    renderGallery()

    const card = screen.getByLabelText("View Sappho's Mirror I by Pam Longobardi")
    await user.click(card)

    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    const prices = screen.getAllByText('$45,000'); expect(prices.length).toBeGreaterThanOrEqual(2)
  })

  it('displays artwork metadata in modal', async () => {
    const user = userEvent.setup()
    renderGallery()

    await user.click(screen.getByLabelText("View Sappho's Mirror I by Pam Longobardi"))

    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('96 × 50 × 4 inches')).toBeInTheDocument()
    expect(screen.getByText('Found ocean plastic collected at South Point, Hawaii')).toBeInTheDocument()
  })

  it('displays artist bio in modal', async () => {
    const user = userEvent.setup()
    renderGallery()

    await user.click(screen.getByLabelText("View Sappho's Mirror I by Pam Longobardi"))
    await screen.findByRole('dialog')
    expect(screen.getByText(/Drifters Project in 2006/)).toBeInTheDocument()
  })

  it('shows CTA buttons in modal', async () => {
    const user = userEvent.setup()
    renderGallery()

    await user.click(screen.getByLabelText("View Sappho's Mirror I by Pam Longobardi"))
    await screen.findByRole('dialog')

    expect(screen.getByRole('button', { name: /Purchase/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Commission Similar/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Contact Artist/ })).toBeInTheDocument()
  })

  it('shows related works in modal', async () => {
    const user = userEvent.setup()
    renderGallery()

    await user.click(screen.getByLabelText("View Sappho's Mirror I by Pam Longobardi"))
    await screen.findByRole('dialog')

    expect(screen.getByText('Related Works')).toBeInTheDocument()
  })

  it('closes modal when close button is clicked', async () => {
    const user = userEvent.setup()
    renderGallery()

    await user.click(screen.getByLabelText("View Sappho's Mirror I by Pam Longobardi"))
    expect(await screen.findByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByLabelText('Close artwork details'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

describe('Gallery Store', () => {
  beforeEach(() => {
    useGalleryStore.setState({
      artworks: galleryArtworks,
      filteredArtworks: galleryArtworks,
      selectedArtwork: null,
      materialFilter: 'All',
      certificationFilter: 'All',
      searchQuery: '',
      layoutMode: 'masonry',
      isModalOpen: false,
    })
  })

  it('has correct initial state', () => {
    const state = useGalleryStore.getState()
    expect(state.artworks).toHaveLength(14)
    expect(state.filteredArtworks).toHaveLength(14)
    expect(state.materialFilter).toBe('All')
    expect(state.certificationFilter).toBe('All')
    expect(state.searchQuery).toBe('')
    expect(state.layoutMode).toBe('masonry')
    expect(state.isModalOpen).toBe(false)
  })

  it('filters by material', () => {
    useGalleryStore.getState().setMaterialFilter('Metal')
    const state = useGalleryStore.getState()
    expect(state.filteredArtworks.length).toBe(3)
    expect(state.filteredArtworks.every((a) => a.material === 'Metal')).toBe(true)
  })

  it('filters by certification level', () => {
    useGalleryStore.getState().setCertificationFilter('Level 3')
    const state = useGalleryStore.getState()
    expect(state.filteredArtworks.every((a) => a.certification === 'Level 3')).toBe(true)
  })

  it('searches by artist name', () => {
    useGalleryStore.getState().setSearchQuery('Subodh')
    const state = useGalleryStore.getState()
    expect(state.filteredArtworks).toHaveLength(1)
    expect(state.filteredArtworks[0].artist).toBe('Subodh Gupta')
  })

  it('searches by title', () => {
    useGalleryStore.getState().setSearchQuery('Mitochondria')
    const state = useGalleryStore.getState()
    expect(state.filteredArtworks).toHaveLength(1)
    expect(state.filteredArtworks[0].id).toBe('green-mitochondria')
  })

  it('combines material filter and search', () => {
    useGalleryStore.getState().setMaterialFilter('Plastic')
    useGalleryStore.getState().setSearchQuery('ocean')
    const state = useGalleryStore.getState()
    expect(state.filteredArtworks.length).toBeGreaterThanOrEqual(1)
    expect(state.filteredArtworks.every((a) => a.material === 'Plastic')).toBe(true)
  })

  it('opens and closes modal', () => {
    const artwork = galleryArtworks[0]
    useGalleryStore.getState().openModal(artwork)
    let state = useGalleryStore.getState()
    expect(state.isModalOpen).toBe(true)
    expect(state.selectedArtwork).toBe(artwork)

    useGalleryStore.getState().closeModal()
    state = useGalleryStore.getState()
    expect(state.isModalOpen).toBe(false)
    expect(state.selectedArtwork).toBeNull()
  })

  it('gets related works by material', () => {
    const artwork = galleryArtworks[0]
    const related = useGalleryStore.getState().getRelatedWorks(artwork)
    expect(related.length).toBeGreaterThan(0)
    expect(related.every((r) => r.id !== artwork.id)).toBe(true)
  })

  it('sets layout mode', () => {
    useGalleryStore.getState().setLayoutMode('uniform')
    expect(useGalleryStore.getState().layoutMode).toBe('uniform')
  })

  it('returns no results for impossible combination', () => {
    useGalleryStore.getState().setMaterialFilter('Paper')
    const state = useGalleryStore.getState()
    expect(state.filteredArtworks).toHaveLength(0)
  })
})
