import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { HomePage } from '@/pages/HomePage'
import { GalleryPage } from '@/pages/GalleryPage'
import { ArtistSignup, ArtistDashboard } from '@/pages/ArtistPortal'
import { MarketplacePage, AuctionsPage, CommissionsPage } from '@/pages/Marketplace'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <ScrollProgress />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/artists/signup" element={<ArtistSignup />} />
          <Route path="/artists/dashboard" element={<ArtistDashboard />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/marketplace/auctions" element={<AuctionsPage />} />
          <Route path="/marketplace/commissions" element={<CommissionsPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
