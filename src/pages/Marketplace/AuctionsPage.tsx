import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, TrendingUp, X, Gavel, Users, Award, Shield } from 'lucide-react'
import { useMarketplaceStore } from '@/stores/useMarketplaceStore'
import { auctionListings, AUCTION_CATEGORIES } from '@/data/marketplaceData'
import type { AuctionListing, AuctionCategory } from '@/data/marketplaceData'
import { cn } from '@/lib/utils'

function useCountdown(endsAt: Date) {
  const [timeLeft, setTimeLeft] = useState('')
  const [urgent, setUrgent] = useState(false)
  useEffect(() => {
    const calc = () => {
      const diff = endsAt.getTime() - Date.now()
      if (diff <= 0) { setTimeLeft('Ended'); return }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setUrgent(h < 2)
      setTimeLeft(h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`)
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [endsAt])
  return { timeLeft, urgent }
}

function AuctionCard({ auction, onBid }: { auction: AuctionListing; onBid: (id: string) => void }) {
  const { timeLeft, urgent } = useCountdown(auction.endsAt)
  const pct = Math.min(100, Math.round((auction.currentBid / auction.reservePrice) * 100))
  const reserveMet = auction.currentBid >= auction.reservePrice

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.4 }}
      className="rounded-2xl bg-offwhite border border-stone/10 overflow-hidden hover:shadow-xl hover:border-accent/20 transition-all duration-300 group"
    >
      {/* Gradient image */}
      <div className={`relative aspect-[4/3] bg-gradient-to-br ${auction.gradient}`}>
        <div className="absolute inset-0 bg-primary/20" />
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-offwhite/90 text-primary px-2.5 py-1 rounded-full">
            {auction.category}
          </span>
        </div>
        <div className={cn('absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold', urgent ? 'bg-red-500 text-white' : 'bg-offwhite/90 text-primary')}>
          <Clock size={11} />
          {timeLeft}
        </div>
        <div className="absolute bottom-3 left-3">
          {auction.certification === 'Level 3'
            ? <span className="inline-flex items-center gap-1 bg-amber/90 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full"><Award size={10} /> Certified</span>
            : <span className="inline-flex items-center gap-1 bg-gold/90 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full"><Shield size={10} /> Verified</span>
          }
        </div>
      </div>

      <div className="p-6">
        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent mb-1">{auction.material}</div>
        <h3 className="font-heading text-xl font-bold text-primary leading-tight">{auction.title}</h3>
        <p className="text-sm text-stone/60 mt-0.5">{auction.artist}</p>
        <p className="text-sm text-stone/60 mt-3 leading-relaxed line-clamp-2">{auction.description}</p>

        {/* Bid progress */}
        <div className="mt-5">
          <div className="flex justify-between text-xs text-stone/50 mb-1.5">
            <span>Reserve progress</span>
            <span className={cn('font-semibold', reserveMet ? 'text-accent' : 'text-stone/50')}>
              {reserveMet ? '✓ Reserve met' : `${pct}% of reserve`}
            </span>
          </div>
          <div className="h-1.5 bg-sand rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.3 }}
              className={cn('h-full rounded-full', reserveMet ? 'bg-accent' : 'bg-gold')}
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-stone/40 uppercase tracking-wider">Current Bid</p>
            <p className="font-heading text-2xl font-bold text-primary">€{auction.currentBid.toLocaleString()}</p>
            <p className="text-xs text-stone/40 mt-0.5 flex items-center gap-1"><Users size={10} /> {auction.bidCount} bids</p>
          </div>
          <div>
            <p className="text-xs text-stone/40 uppercase tracking-wider">Est. Value</p>
            <p className="font-heading text-xl font-bold text-stone/60">€{auction.estimatedValue.toLocaleString()}</p>
            <p className="text-xs text-stone/40 mt-0.5">Starting: €{auction.startingBid.toLocaleString()}</p>
          </div>
        </div>

        <button
          onClick={() => onBid(auction.id)}
          className="mt-5 w-full rounded-full bg-primary text-offwhite py-3 font-semibold text-sm hover:bg-primary-light hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          <Gavel size={15} />
          Place Bid
        </button>
      </div>
    </motion.div>
  )
}

function BidModal({ auctionId, onClose }: { auctionId: string; onClose: () => void }) {
  const auction = auctionListings.find(a => a.id === auctionId)
  const [bidAmount, setBidAmount] = useState('')
  const [submitted, setSubmitted] = useState(false)
  if (!auction) return null
  const minBid = auction.currentBid + 500

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Number(bidAmount) >= minBid) setSubmitted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-stone/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
        className="bg-offwhite rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className={`h-32 bg-gradient-to-br ${auction.gradient} relative`}>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-offwhite/20 hover:bg-offwhite/30 rounded-full flex items-center justify-center text-offwhite"><X size={16} /></button>
        </div>
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4"><Gavel size={28} className="text-accent" /></div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-2">Bid Placed!</h3>
              <p className="text-stone/60 text-sm">Your bid of <strong>€{Number(bidAmount).toLocaleString()}</strong> has been submitted.</p>
              <p className="text-xs text-stone/40 mt-2">You'll be notified if you're outbid.</p>
              <button onClick={onClose} className="mt-6 w-full rounded-full bg-primary text-offwhite py-3 font-semibold">Done</button>
            </div>
          ) : (
            <>
              <h3 className="font-heading text-xl font-bold text-primary mb-1">{auction.title}</h3>
              <p className="text-sm text-stone/60 mb-5">{auction.artist}</p>
              <div className="bg-sand/50 rounded-xl p-4 mb-5 grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-stone/40 text-xs">Current Bid</p><p className="font-bold text-primary">€{auction.currentBid.toLocaleString()}</p></div>
                <div><p className="text-stone/40 text-xs">Minimum Bid</p><p className="font-bold text-accent">€{minBid.toLocaleString()}</p></div>
              </div>
              <h5 className="text-xs font-semibold uppercase tracking-wider text-stone/50 mb-3">Recent Bids</h5>
              <div className="space-y-2 mb-5 max-h-32 overflow-y-auto">
                {auction.bidHistory.slice(0, 4).map((b, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-stone/60">{b.bidder}</span>
                    <span className="font-medium text-primary">€{b.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmit}>
                <label className="block text-sm font-semibold text-stone mb-1.5">Your Bid (€)</label>
                <input
                  type="number" min={minBid} step={100} value={bidAmount} onChange={e => setBidAmount(e.target.value)}
                  placeholder={`Min €${minBid.toLocaleString()}`}
                  className="w-full rounded-xl border border-stone/20 px-4 py-3 text-lg font-bold focus:outline-none focus:border-accent transition-colors"
                  required
                />
                <button type="submit" className="mt-4 w-full rounded-full bg-primary text-offwhite py-3.5 font-bold flex items-center justify-center gap-2 hover:bg-primary-light transition-colors">
                  <Gavel size={16} /> Confirm Bid
                </button>
                <p className="text-center text-xs text-stone/40 mt-3">Buyer's premium: 15–25% on hammer price</p>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function AuctionsPage() {
  const { auctionCategoryFilter, setAuctionCategoryFilter, openBidModal, closeBidModal, bidModalAuctionId } = useMarketplaceStore()

  const filtered = auctionCategoryFilter === 'All' ? auctionListings : auctionListings.filter(a => a.category === auctionCategoryFilter)

  return (
    <main className="min-h-screen bg-offwhite">
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 30% 60%, var(--color-gold) 0%, transparent 50%)' }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">ERA Auction House</span>
            <h1 className="mt-3 font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-offwhite leading-tight">
              Live Auctions
            </h1>
            <p className="mt-4 text-offwhite/60 text-lg max-w-xl">
              High-impact certified works — from quarterly themed collections to celebrity collaborations and emergency climate sales.
            </p>
          </motion.div>
          <div className="mt-8 flex flex-wrap gap-3">
            {(['All', ...AUCTION_CATEGORIES] as const).map(cat => (
              <button key={cat} onClick={() => setAuctionCategoryFilter(cat === 'All' ? 'All' : cat as AuctionCategory)}
                className={cn('rounded-full px-5 py-2 text-sm font-medium transition-all', auctionCategoryFilter === cat ? 'bg-accent text-primary' : 'bg-offwhite/10 text-offwhite/70 hover:bg-offwhite/20')}
              >{cat}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Live stats */}
      <div className="bg-primary/95 border-t border-offwhite/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-8 text-sm text-offwhite/50 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0"><span className="w-2 h-2 bg-accent rounded-full animate-pulse" /><span className="text-offwhite font-medium">{auctionListings.length} Live Auctions</span></div>
          {auctionListings.map(a => (
            <div key={a.id} className="flex items-center gap-2 shrink-0"><TrendingUp size={12} className="text-accent" /><span>{a.title.split('—')[0].trim()}: <strong className="text-offwhite">€{a.currentBid.toLocaleString()}</strong></span></div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map(auction => (
              <AuctionCard key={auction.id} auction={auction} onBid={openBidModal} />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {bidModalAuctionId && <BidModal auctionId={bidModalAuctionId} onClose={closeBidModal} />}
      </AnimatePresence>
    </main>
  )
}
