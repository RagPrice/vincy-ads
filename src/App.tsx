import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vehicles from './pages/categories/Vehicles';
import RealEstate from './pages/categories/RealEstate';
import Electronics from './pages/categories/Electronics';
import Fashion from './pages/categories/Fashion';
import Jobs from './pages/categories/Jobs';
import Services from './pages/categories/Services';
import Events from './pages/categories/Events';
import Furniture from './pages/categories/Furniture';
import Free from './pages/categories/Free';
import Miscellaneous from './pages/categories/Miscellaneous';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/vehicles/*" element={<Vehicles />} />
              <Route path="/category/real-estate/*" element={<RealEstate />} />
              <Route path="/category/electronics/*" element={<Electronics />} />
              <Route path="/category/fashion/*" element={<Fashion />} />
              <Route path="/category/jobs/*" element={<Jobs />} />
              <Route path="/category/services/*" element={<Services />} />
              <Route path="/category/events/*" element={<Events />} />
              <Route path="/category/furniture-home/*" element={<Furniture />} />
              <Route path="/category/free" element={<Free />} />
              <Route path="/category/miscellaneous/*" element={<Miscellaneous />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
