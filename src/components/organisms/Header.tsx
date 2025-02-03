import { AlignJustify, Heart, Search, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import { Input } from '../atoms/Input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../molecules/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '../molecules/popover';
import { categories } from '@/utils/data/product';

const Header = () => {
  return (
    <div>
      {/* Main Header */}
      <div className="w-[90%] mx-auto flex justify-between items-center py-4">
        <div>
          <Link to="/" className="text-2xl font-bold text-blue-600">
            AviationX
          </Link>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer  rounded-full px-3 py-2 hover:bg-gray-100">
              <AlignJustify size={20} />
              <span>Categories</span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-2 bg-white shadow-md rounded-md">
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category.name}
                  className="p-2 text-sm cursor-pointer hover:bg-gray-200 rounded-md"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>

        {/* Search Bar */}
        <div className="w-[65%] relative flex items-center rounded-lg px-3 overflow-hidden">
          <Input
            type="text"
            placeholder="Search for Products"
            className="border-gray-500 pl-10 rounded-full h-[2.9rem] border-[2px]"
          />
          <div className="absolute right-[1rem] top-1/2  -translate-y-1/2 p-2 bg-blue-400 cursor-pointer rounded-full transition-all duration-100 ease-in-out hover:scale-110 hover:rounded-r-full hover:rounded-l-md">
            <Search size={24} className="text-white" />
          </div>
        </div>

        {/* User and Cart Icons */}
        <TooltipProvider>
          <div className="flex items-center gap-4">
            {/* Sign In */}
            <div className="cursor-pointer">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-md font-bold p-2 rounded-full hover:bg-gray-200">
                    Sign in
                  </span>
                </TooltipTrigger>
                <TooltipContent>Sign in</TooltipContent>
              </Tooltip>
            </div>

            {/* Wishlist */}
            <div className="cursor-pointer">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-2 rounded-full hover:bg-gray-200">
                    <Heart size={28} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>Wishlist</TooltipContent>
              </Tooltip>
            </div>

            {/* Cart */}
            <div className="cursor-pointer">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-2 rounded-full hover:bg-gray-200">
                    <ShoppingCart size={28} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>Cart</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Header;
