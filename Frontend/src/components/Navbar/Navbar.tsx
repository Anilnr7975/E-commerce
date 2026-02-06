import { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Shop', href: '#' },
    { name: 'New Arrivals', href: '#' },
    { name: 'Collections', href: '#' },
    { name: 'Sale', href: '#' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <a href="#" className="text-2xl font-bold text-gray-900 tracking-tighter hover:text-blue-600 transition-colors">
              GOKIFY
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors relative group"
              >
                {link.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
              </a>
            ))}
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-blue-600 transition-colors p-1">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors p-1">
              <User className="h-5 w-5" />
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors p-1 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                2
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-100">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex justify-around border-t border-gray-100 mt-2">
              <button className="p-2 text-gray-600 hover:text-blue-600">
                <Search className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600">
                <User className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute top-1 right-0 bg-blue-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                  2
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar