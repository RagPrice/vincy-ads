import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import FeaturedItems from './pages/FeaturedItems'
import HotDeals from './pages/HotDeals'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings/featured" element={<FeaturedItems />} />
            <Route path="/listings/hot-deals" element={<HotDeals />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
