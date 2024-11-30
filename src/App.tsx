import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import PostAd from './pages/PostAd';
import ListingDetail from './pages/ListingDetail';
import SearchResults from './pages/SearchResults';
import Signup from './pages/Signup';
import Login from './pages/Login';
import FeaturedItems from './pages/FeaturedItems';
import HotDeals from './pages/HotDeals';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/featured" element={<FeaturedItems />} />
            <Route path="/hot-deals" element={<HotDeals />} />
            <Route path="/post-ad" element={<PostAd />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
