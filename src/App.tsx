import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { HomePage } from '@/pages/HomePage'

function App() {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Header />
      <HomePage />
      <Footer />
    </div>
  )
}

export default App
