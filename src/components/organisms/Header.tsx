import { Search, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router';

const Header = () => {
  return (
    <div>
      {/* Announcement Header */}
      <div className="bg-blue-500 text-white text-center py-2">
        <p>
          Transform your aviation experience with our services -{' '}
          <Link to="#" className="text-pink-400 hover:text-pink-300">
            See how
          </Link>
        </p>
      </div>

      {/* Main Header */}
      <div className="w-[90%] mx-auto flex justify-between items-center py-4">
        <div>
          <Link to="/" className="text-2xl font-bold text-blue-600">
            AviationX
          </Link>
        </div>

        {/* Search Bar */}
        <div className="w-[50%] flex items-center bg-white border-2 border-blue-500 rounded-lg px-5 overflow-hidden">
          <input
            className="py-3 w-full focus-visible:outline-none"
            type="text"
            placeholder="Search for Products"
          />
          <Search size={24} color="#3b82f6" />
        </div>

        {/* User and Cart Icons */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-md font-bold">Sign in</span>
            <User size={32} color="#3b82f6" />
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-md font-bold">Cart</span>
            <ShoppingCart size={32} color="#3b82f6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
