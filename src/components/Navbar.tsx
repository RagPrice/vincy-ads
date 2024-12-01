import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Vincy Ads
        </Link>
        
        <div className="flex-1 mx-8">
          <div className="flex">
            <input
              type="text"
              placeholder="Search listings..."
              className="w-full px-4 py-2 rounded-l text-gray-800"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-r font-semibold transition-colors">
              Search
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/about" className="hover:text-gray-200">About</Link>
          <Link to="/contact" className="hover:text-gray-200">Contact</Link>
          <Link to="/post-ad" className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded font-semibold">
            Post Ad
          </Link>
          <Link to="/signin" className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded border border-white">
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
