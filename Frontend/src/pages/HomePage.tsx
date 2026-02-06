import productData from '../../product.json'
import { ShoppingCart, Star } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    category: string;
    subcategory: string;
    price: number;
    description: string;
    image: string;
    sizes: string[];
    colors: string[];
    stock: number;
    rating: number;
    reviews: number;
}

const products = productData.products;

const HomePage = () => {
    return (
        <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Featured Collection
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our hand-picked selection of premium clothing for every style and occasion.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product: Product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col"
                        >
                            <div className="relative aspect-3/4 overflow-hidden bg-gray-200">
                                <img
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                    src={product.image}
                                    alt={product.name}
                                    loading="lazy"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                                    }}
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center shadow-sm">
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                                    <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                                    <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                                </div>
                                {product.stock < 50 && (
                                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                                        Low Stock
                                    </div>
                                )}
                            </div>

                            <div className="p-5 flex-1 flex flex-col">
                                <div className="mb-2">
                                    <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">
                                        {product.category} • {product.subcategory}
                                    </p>
                                    <h2 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                                        {product.name}
                                    </h2>
                                </div>

                                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
                                    {product.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                    <span className="text-xl font-bold text-gray-900">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <button className="bg-gray-900 hover:bg-blue-600 text-white p-2.5 rounded-xl transition-colors duration-200 flex items-center justify-center group/btn shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        <ShoppingCart className="w-5 h-5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage