import React from 'react';
import { AlignJustify, Heart, Search, ShoppingCart, LogOut, Menu } from 'lucide-react';
import { Link } from 'react-router';
import { Input } from '../atoms/Input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../molecules/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '../molecules/popover';
import { categories } from '@/utils/data/product';
import { useNavigate } from 'react-router';
import { Sheet, SheetContent, SheetTrigger } from '../molecules/sheet';
import { Button } from '../atoms/Button';
import { Avatar, AvatarFallback } from '../molecules/avatar';
import { Badge } from '../atoms/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../molecules/accordion';
import axios from 'axios';

// Create a custom auth context/hook
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await axios.get('http://localhost:8000/api/v1/auth/profile', {
          headers: {
            'With-Credentials': 'false',
          },
        });
        console.log(profile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  return { isAuthenticated, user, logout };
};

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full border-b border-gray-200 sticky top-0 bg-white z-10">
      <div className="w-[95%] md:w-[90%] mx-auto flex justify-between items-center py-3">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:w-[300px]">
              <div className="py-4">
                <Link to="/" className="text-xl font-bold text-blue-600">
                  AviationX
                </Link>
              </div>

              {/* Search Bar inside Sheet */}
              <div className="mt-4 mb-6">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Search for Products"
                    className="pl-10 pr-12 rounded-full h-10 w-full"
                  />
                  <Button
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 p-0 bg-blue-400"
                  >
                    <Search size={16} className="text-white" />
                  </Button>
                </div>
              </div>

              <div className="mt-6 space-y-1">
                {/* Categories as Accordion */}
                <Accordion type="single" collapsible>
                  <AccordionItem value="categories">
                    <AccordionTrigger className="py-3 px-3">Categories</AccordionTrigger>
                    <AccordionContent>
                      <nav className="space-y-1">
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            to={`/category/${category.name.replace(/\s+/g, '-')}`}
                            className="flex items-center px-2 py-2 text-sm rounded-md hover:bg-gray-100"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </nav>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {isAuthenticated ? (
                  <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                    <Link
                      to="/profile"
                      className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/wishlist"
                      className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
                    >
                      <Heart className="mr-2 h-4 w-4" /> Wishlist
                    </Link>
                    <Link
                      to="/cart"
                      className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" /> Cart
                    </Link>
                    <Button
                      variant="ghost"
                      className="flex w-full items-center justify-start px-3 py-2 text-sm rounded-md hover:bg-gray-100"
                      onClick={logout}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Sign out
                    </Button>
                  </div>
                ) : (
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => navigate('/auth')}
                    >
                      Sign in
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl font-bold text-blue-600">
            AviationX
          </Link>
        </div>

        {/* Categories - Desktop only */}
        <div className="hidden md:block">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <AlignJustify size={18} />
                <span>Categories</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              <nav className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={`/category/${category.name.replace(/\s+/g, '-')}`}
                    className="block p-2 text-sm rounded-md hover:bg-gray-100"
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex w-[45%] lg:w-[55%] relative items-center rounded-lg">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search for Products"
              className="pl-10 pr-12 rounded-full h-10"
            />
            <Button
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 p-0 bg-blue-400"
            >
              <Search size={16} className="text-white" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-3">
          {/* <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button> */}

          <TooltipProvider>
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="h-8 w-8 bg-blue-500 text-white cursor-pointer">
                        <AvatarFallback>test</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>Profile</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={logout}>
                        <LogOut size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Sign out</TooltipContent>
                  </Tooltip>
                </div>
              ) : (
                <Button variant="secondary" size="sm" onClick={() => navigate('/auth')}>
                  Sign in
                </Button>
              )}
            </div>
          </TooltipProvider>

          {/* Wishlist - Only show if authenticated */}
          {isAuthenticated && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <Heart size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Wishlist</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {isAuthenticated && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart size={20} />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                      2
                    </Badge>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Cart</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
