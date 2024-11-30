import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Vincy Ads</h3>
            <p className="text-gray-300 text-sm">
              The premier marketplace for buying and selling in Saint Vincent and the Grenadines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white text-sm">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white text-sm">Contact</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white text-sm">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/category/vehicles" className="text-gray-300 hover:text-white text-sm">Vehicles</Link></li>
              <li><Link to="/category/property" className="text-gray-300 hover:text-white text-sm">Property</Link></li>
              <li><Link to="/category/electronics" className="text-gray-300 hover:text-white text-sm">Electronics</Link></li>
              <li><Link to="/category/services" className="text-gray-300 hover:text-white text-sm">Services</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Email: support@vincyads.com</li>
              <li className="text-gray-300">Phone: +1 (784) 123-4567</li>
              <li className="text-gray-300">Kingstown, Saint Vincent</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} Vincy Ads. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                Facebook
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                Twitter
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
