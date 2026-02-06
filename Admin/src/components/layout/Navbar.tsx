import { Bell, Search, User, Menu } from 'lucide-react';

interface NavbarProps {
    onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
    return (
        <header className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8">

            {/* Left: Mobile Menu & Search */}
            <div className="flex items-center gap-4 w-full max-w-xl">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Search Bar */}
                <div className="relative w-full max-w-md hidden sm:block text-gray-500 focus-within:text-blue-600">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5" />
                    </div>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 sm:text-sm transition-all duration-200"
                        placeholder="Search..."
                    />
                </div>
                {/* Mobile Search Icon (visible only on small screens) */}
                <button className="sm:hidden p-2 text-gray-500">
                    <Search className="w-5 h-5" />
                </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
                {/* Notifications */}
                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-gray-200">
                    <div className="flex flex-col text-right hidden md:block">
                        <span className="text-sm font-semibold text-gray-900">Admin User</span>
                        <span className="text-xs text-gray-500">Super Admin</span>
                    </div>
                    <button className="h-8 w-8 sm:h-9 sm:w-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:ring-2 hover:ring-blue-100 transition-all">
                        <User className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
