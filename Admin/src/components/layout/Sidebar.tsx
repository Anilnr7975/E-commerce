import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, ShoppingCart, Settings, LogOut, X } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { name: 'Product Management', icon: ShoppingBag, path: '/products' },
        { name: 'Order Management', icon: ShoppingCart, path: '/orders' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    return (
        <>
            {/* Backdrop for mobile */}
            <div
                className={clsx(
                    "fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar content */}
            <aside
                className={twMerge(
                    "fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-40 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:z-auto",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 flex-shrink-0">
                    <div className="flex items-center gap-2 text-blue-600">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            A
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900">AdminPanel</span>
                    </div>
                    {/* Close button - Mobile only */}
                    <button
                        onClick={onClose}
                        className="lg:hidden p-1 rounded-md text-gray-500 hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => onClose()} // Close sidebar on link click (mobile)
                            className={({ isActive }) => `
                            flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                            ${isActive
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                        `}
                        >
                            <item.icon className="w-5 h-5 transition-colors" />
                            <span className="font-medium text-sm">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 flex-shrink-0">
                    <button className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-sm">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
