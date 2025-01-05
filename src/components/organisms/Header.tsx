import { Search, ShoppingCart, User } from 'lucide-react';
import logo from '../../assets/logo.webp';

const Header = () => {
  return (
    <div className="w-[90%] mx-auto flex justify-between items-center py-4 ">
      <div className="">
        <img src={logo} alt="logo" />
      </div>
      <div className="w-[50%] flex items-center bg-white border-2 border-blue-500 rounded-lg px-5 overflow-hidden">
        <input
          className="py-3 w-full focus-visible:outline-none"
          type="text"
          placeholder="Search for Products"
        />
        <Search size={24} color="#3b82f6" />
      </div>
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
  );
};
export default Header;
