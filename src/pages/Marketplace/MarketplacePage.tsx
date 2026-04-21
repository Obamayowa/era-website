import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X, Heart, ShoppingCart, Shield, Award, Recycle } from 'lucide-react'
import { useMarketplaceStore } from '@/stores/useMarketplaceStore'
import { SectionHeading } from '@/components/institution/SectionHeading'
import { useSanity } from '@/hooks/useSanity'
import type { MarketplaceListing } from '@/data/marketplaceData'
import { cn } from '@/lib/utils'

const MARKETPLACE_QUERY = `*[_type == "marketplacePage"][0] {
  headline, subheadline, cartDrawerTitle,
  cartEmptyText, checkoutButtonLabel, shippingInfo,
  trustStrip[] { icon, label }
}`

const MATERIAL_FILTERS = ['All', 'Plastic', 'Metal', 'Textile', 'Paper', 'E-Waste', 'Organic'] as const
const SIZE_FILTERS = ['All', 'S', 'M', 'L', 'Installation'] as const
const CERT_FILTERS = ['All', 'Level 2', 'Level 3'] as const

const FALLBACK_TRUST = [
  { icon: '🛡️', label: 'Verified Provenance' },
  { icon: '🏆', label: 'Certified Artists' },
  { icon: '♻️', label: 'Environmental Impact' },
  { icon: '🛒', label: 'Lowest Fees — 15%' },
]

interface MarketplaceData {
  headline?: string
  subheadline?: string
  cartDrawerTitle?: string
  cartEmptyText?: string
  checkoutButtonLabel?: string
  shippingInfo?: string
  trustStrip?: { icon?: string; label?: string }[]
}

function CertBadge({ level }: { level: string }) {
  if (level === 'Level 3') return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber">
      <Award size={10} /> Certified
    </span>
  )
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold">
      <Shield size={10} /> Verified
    </span>
  )
}

function StatusBadge({ status }: { status: MarketplaceListing['status'] }) {
  if (status === 'sold') return (
    <div className="absolute inset-0 flex items-center justify-center bg-stone/60 rounded-xl z-10">
      <span className="bg-stone text-offwhite text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">Sold</span>
    </div>
  )
  if (status === 'auction') return (
    <div className="absolute top-3 left-3 z-10">
      <span className="bg-accent text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">In Auction</span>
    </div>
  )
  return null
}

function ListingCard({ listing }: { listing: MarketplaceListing }) {
  const { addToCart, toggleWishlist, isInWishlist, cart } = useMarketplaceStore()
  const inCart = cart.some(i => i.listing.id === listing.id)
  const wishlisted = isInWishlist(listing.id)

  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      className="group relative rounded-2xl bg-offwhite border border-stone/10 overflow-hidden hover:shadow-xl hover:border-accent/20 transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden">
        {(listing as any).imageUrl ? (
          <img src={(listing as any).imageUrl} alt={listing.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${listing.gradient} transition-transform duration-500 group-hover:scale-105`} />
        )}
        <StatusBadge status={listing.status} />
        <button onClick={() => toggleWishlist(listing.id)}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-offwhite/90 backdrop-blur-sm shadow-sm hover:bg-offwhite transition-colors"
          aria-label="Toggle wishlist"
        >
          <Heart size={15} className={cn('transition-colors', wishlisted ? 'fill-red-500 text-red-500' : 'text-stone/50')} />
        </button>
        <div className="absolute bottom-3 left-3 z-10">
          <CertBadge level={listing.certification} />
        </div>
      </div>
      <div className="p-5">
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">{listing.material}</div>
        <h3 className="font-heading text-lg font-bold text-primary leading-tight line-clamp-1">{listing.title}</h3>
        <p className="mt-0.5 text-sm text-stone/60">{listing.artist}</p>
        <p className="mt-1 text-xs text-stone/40">{listing.dimensions} · {listing.year}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-heading text-xl font-bold text-primary">
            {listing.status === 'sold' ? 'Sold' : `€${listing.price.toLocaleString()}`}
          </span>
          {listing.status === 'available' && (
            <button onClick={() => addToCart(listing)} disabled={inCart}
              className={cn('flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all',
                inCart ? 'bg-accent/10 text-accent cursor-default' : 'bg-primary text-offwhite hover:bg-primary-light hover:scale-105'
              )}
            >
              <ShoppingCart size={13} />
              {inCart ? 'In Cart' : 'Add'}
            </button>
          )}
          {listing.status === 'auction' && (
            <a href="/marketplace/auctions" className="rounded-full bg-accent/10 text-accent px-4 py-2 text-xs font-semibold hover:bg-accent/20 transition-colors">
              Bid Now
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function CartDrawer({ data }: { data: MarketplaceData | null }) {
  const { cart, isCartOpen, closeCart, removeFromCart, getCartSubtotal } = useMarketplaceStore()
  const drawerTitle = data?.cartDrawerTitle || 'Your Cart'
  const emptyText = data?.cartEmptyText || 'Your cart is empty'
  const checkoutLabel = data?.checkoutButtonLabel || 'Proceed to Checkout'
  const shippingInfo = data?.shippingInfo || 'Secure checkout · Verified artworks only'

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone/40 backdrop-blur-sm z-40" onClick={closeCart}
          />
          <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-offwhite shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-stone/10 px-6 py-5">
              <h2 className="font-heading text-xl font-bold text-primary">{drawerTitle} ({cart.length})</h2>
              <button onClick={closeCart} className="p-2 rounded-lg hover:bg-sand transition-colors"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-stone/40">
                  <ShoppingCart size={40} className="mb-3" />
                  <p className="text-sm">{emptyText}</p>
                </div>
              ) : cart.map(({ listing }) => (
                <div key={listing.id} className="flex gap-4 items-start bg-sand/50 rounded-xl p-4">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${listing.gradient} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold text-primary text-sm leading-tight line-clamp-1">{listing.title}</p>
                    <p className="text-xs text-stone/60 mt-0.5">{listing.artist}</p>
                    <p className="font-bold text-primary mt-2">€{listing.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => removeFromCart(listing.id)} className="p-1 hover:text-red-500 transition-colors text-stone/40">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="border-t border-stone/10 px-6 py-5 space-y-3">
                <div className="flex justify-between text-sm"><span className="text-stone/60">Subtotal</span><span className="font-bold text-primary">€{getCartSubtotal().toLocaleString()}</span></div>
                <div className="flex justify-between text-xs text-stone/40"><span>ERA Platform Fee (15%)</span><span>€{Math.round(getCartSubtotal() * 0.15).toLocaleString()}</span></div>
                <button className="w-full rounded-full bg-primary text-offwhite py-3.5 font-semibold hover:bg-primary-light transition-colors mt-2">
                  {checkoutLabel}
                </button>
                <p className="text-center text-xs text-stone/40">{shippingInfo}</p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export function MarketplacePage() {
  const { filteredListings, materialFilter, certificationFilter, sizeFilter, priceRange, searchQuery,
    setMaterialFilter, setCertificationFilter, setSizeFilter, setPriceRange, setSearchQuery, clearFilters
  } = useMarketplaceStore()

  const { data } = useSanity<MarketplaceData | null>(MARKETPLACE_QUERY, null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const hasActiveFilters = materialFilter !== 'All' || certificationFilter !== 'All' || sizeFilter !== 'All' || searchQuery !== ''

  const headline = data?.headline || 'Collect Art. Change the World.'
  const subheadline = data?.subheadline || 'Every purchase directly supports a verified ERA artist and diverts waste from landfills. Only 15% platform fee — the lowest in the industry.'
  const trustItems = (data?.trustStrip && data.trustStrip.length > 0) ? data.trustStrip : FALLBACK_TRUST

  return (
    <main className="min-h-screen bg-offwhite">
      <CartDrawer data={data} />

      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, var(--color-accent) 0%, transparent 50%)' }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">ERA Marketplace</span>
            <h1 className="mt-3 font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-offwhite leading-tight">
              {headline}
            </h1>
            <p className="mt-4 text-offwhite/60 text-lg max-w-xl leading-relaxed">{subheadline}</p>
          </motion.div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-offwhite/50">
            {[['15%', 'Lowest platform fee'], ['100%', 'Verified materials'], ['Free', 'Shipping over €500']].map(([v, l]) => (
              <div key={l}><span className="text-accent font-bold text-lg">{v}</span><span className="ml-2">{l}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <div className="sticky top-[69px] z-30 bg-offwhite/95 backdrop-blur-md border-b border-stone/10 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone/40" />
            <input type="text" placeholder="Search artworks, artists..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-stone/15 bg-sand/50 pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
          <button onClick={() => setFiltersOpen(!filtersOpen)}
            className={cn('flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all',
              filtersOpen || hasActiveFilters ? 'border-accent bg-accent/10 text-accent' : 'border-stone/15 text-stone hover:border-accent/30'
            )}
          >
            <SlidersHorizontal size={15} />
            Filters
            {hasActiveFilters && <span className="w-5 h-5 bg-accent text-primary text-xs rounded-full flex items-center justify-center font-bold">!</span>}
          </button>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-xs text-stone/50 hover:text-stone flex items-center gap-1">
              <X size={12} /> Clear
            </button>
          )}
          <span className="ml-auto text-sm text-stone/40">{filteredListings.length} works</span>
        </div>
        <AnimatePresence>
          {filtersOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-stone/10"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone/50 mb-2 block">Material</label>
                  <div className="flex flex-wrap gap-2">
                    {MATERIAL_FILTERS.map(f => (
                      <button key={f} onClick={() => setMaterialFilter(f as any)}
                        className={cn('rounded-full px-3 py-1 text-xs font-medium transition-all', materialFilter === f ? 'bg-primary text-offwhite' : 'bg-sand text-stone hover:bg-primary/10')}
                      >{f}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone/50 mb-2 block">Certification</label>
                  <div className="flex flex-wrap gap-2">
                    {CERT_FILTERS.map(f => (
                      <button key={f} onClick={() => setCertificationFilter(f as any)}
                        className={cn('rounded-full px-3 py-1 text-xs font-medium transition-all', certificationFilter === f ? 'bg-primary text-offwhite' : 'bg-sand text-stone hover:bg-primary/10')}
                      >{f}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone/50 mb-2 block">
                    Price: up to €{priceRange[1].toLocaleString()}
                  </label>
                  <input type="range" min={0} max={200000} step={500} value={priceRange[1]}
                    onChange={e => setPriceRange([0, Number(e.target.value)])} className="w-full accent-accent"
                  />
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone/50 mb-2 block mt-3">Size</label>
                    <div className="flex flex-wrap gap-2">
                      {SIZE_FILTERS.map(f => (
                        <button key={f} onClick={() => setSizeFilter(f as any)}
                          className={cn('rounded-full px-3 py-1 text-xs font-medium transition-all', sizeFilter === f ? 'bg-primary text-offwhite' : 'bg-sand text-stone hover:bg-primary/10')}
                        >{f}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grid */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-stone/40">
              <Recycle size={48} className="mb-4" />
              <p className="font-heading text-xl font-bold">No artworks match your filters</p>
              <button onClick={clearFilters} className="mt-4 text-sm text-accent hover:underline">Clear all filters</button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              <AnimatePresence mode="popLayout">
                {filteredListings.map(listing => <ListingCard key={listing.id} listing={listing} />)}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-sand/60 border-t border-stone/10 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Why ERA" title="Buy With Confidence" subtitle="Every artwork sold through ERA carries verified proof of its sustainable origins and supports the artist directly." />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {trustItems.map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center mb-3 text-2xl">
                  {icon}
                </div>
                <h4 className="font-heading font-bold text-primary text-sm">{label}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
