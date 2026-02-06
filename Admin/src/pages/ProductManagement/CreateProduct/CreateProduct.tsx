import { useState, useRef, useEffect } from "react"

// Predefined options
const CATEGORIES = ["Men", "Women", "Kids", "Accessories", "Electronics"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
const COLORS = ["White", "Black", "Navy", "Gray", "Red", "Blue", "Green", "Yellow", "Purple", "Pink"];

const CreateProduct = () => {
    const [productDetails, setProductDetails] = useState({
        name: '',
        category: '',
        subcategory: '',
        price: '',
        description: '',
        image: '',
        sizes: [] as string[],
        colors: [] as string[],
        stock: '',
        rating: 0,
        reviews: 0
    })

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductDetails(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    }

    const handleSingleSelect = (name: string, value: string) => {
        setProductDetails(prev => ({ ...prev, [name]: value }));
        setActiveDropdown(null);
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    }

    const toggleArrayItem = (name: 'sizes' | 'colors', item: string) => {
        setProductDetails(prev => {
            const currentArray = prev[name];
            const isSelected = currentArray.includes(item);
            let newArray;
            if (isSelected) {
                newArray = currentArray.filter(i => i !== item);
            } else {
                newArray = [...currentArray, item];
            }
            return { ...prev, [name]: newArray };
        });
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    }

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!productDetails.name.trim()) newErrors.name = "Product name is required";
        if (!productDetails.category) newErrors.category = "Category is required";
        if (!productDetails.subcategory.trim()) newErrors.subcategory = "Subcategory is required";

        if (!productDetails.price) newErrors.price = "Price is required";
        else if (parseFloat(productDetails.price) <= 0) newErrors.price = "Price must be > 0";

        if (!productDetails.stock) newErrors.stock = "Stock is required";
        else if (parseInt(productDetails.stock) < 0) newErrors.stock = "Stock cannot be negative";

        if (productDetails.sizes.length === 0) newErrors.sizes = "Select at least one size";
        if (productDetails.colors.length === 0) newErrors.colors = "Select at least one color";
        if (!productDetails.description.trim()) newErrors.description = "Description is required";
        if (!productDetails.image.trim()) newErrors.image = "Image URL is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log("Submitting Product:", productDetails);
            alert("Product created successfully!");
        } else {
            console.log("Validation failed");
        }
    }

    return (
        <div className="max-w-5xl mx-auto py-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Create New Product</h1>
                    <p className="text-blue-100 mt-2 text-sm">Fill in the details below to add a new item to your inventory.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">

                    {/* Section 1: Basic Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Product Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={productDetails.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${errors.name ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'} outline-none transition-all duration-200`}
                                placeholder="Ex: Classic Cotton T-Shirt"
                            />
                            {errors.name && <p className="text-red-500 text-xs font-medium pl-1">{errors.name}</p>}
                        </div>

                        {/* Category Custom Dropdown */}
                        <div className="space-y-2 relative" ref={dropdownRef}>
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">Category</label>
                            <div
                                onClick={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')}
                                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border cursor-pointer flex justify-between items-center ${errors.category ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-200 hover:border-blue-400'} transition-all`}
                            >
                                <span className={productDetails.category ? "text-gray-900" : "text-gray-400"}>
                                    {productDetails.category || "Select Category"}
                                </span>
                                <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${activeDropdown === 'category' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                            {activeDropdown === 'category' && (
                                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                                    {CATEGORIES.map(cat => (
                                        <div
                                            key={cat}
                                            onClick={() => handleSingleSelect('category', cat)}
                                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 hover:text-blue-700 transition-colors border-b border-gray-100 last:border-0"
                                        >
                                            {cat}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {errors.category && <p className="text-red-500 text-xs font-medium pl-1">{errors.category}</p>}
                        </div>
                    </div>

                    {/* Section 2: Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Subcategory */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">Subcategory</label>
                            <input
                                type="text"
                                name="subcategory"
                                value={productDetails.subcategory}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${errors.subcategory ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'} outline-none transition-all`}
                                placeholder="Ex: T-Shirts"
                            />
                            {errors.subcategory && <p className="text-red-500 text-xs font-medium pl-1">{errors.subcategory}</p>}
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={productDetails.price}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${errors.price ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'} outline-none transition-all`}
                                placeholder="0.00"
                            />
                            {errors.price && <p className="text-red-500 text-xs font-medium pl-1">{errors.price}</p>}
                        </div>

                        {/* Stock */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">Stock Quantity</label>
                            <input
                                type="number"
                                name="stock"
                                value={productDetails.stock}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${errors.stock ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'} outline-none transition-all`}
                                placeholder="0"
                            />
                            {errors.stock && <p className="text-red-500 text-xs font-medium pl-1">{errors.stock}</p>}
                        </div>
                    </div>

                    {/* Section 3: Variants */}
                    <div className="bg-gray-50 p-6 rounded-xl space-y-6 border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">Product Variants</h3>

                        {/* Sizes */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Available Sizes</label>
                            <div className="flex flex-wrap gap-3">
                                {SIZES.map(size => {
                                    const isSelected = productDetails.sizes.includes(size);
                                    return (
                                        <div
                                            key={size}
                                            onClick={() => toggleArrayItem('sizes', size)}
                                            className={`
                                                    px-6 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 select-none border
                                                    ${isSelected
                                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                                                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600'}
                                                `}
                                        >
                                            {size}
                                        </div>
                                    )
                                })}
                            </div>
                            {errors.sizes && <p className="text-red-500 text-xs font-medium mt-2 pl-1">{errors.sizes}</p>}
                        </div>

                        {/* Colors */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Available Colors</label>
                            <div className="flex flex-wrap gap-3">
                                {COLORS.map(color => {
                                    const isSelected = productDetails.colors.includes(color);
                                    return (
                                        <div
                                            key={color}
                                            onClick={() => toggleArrayItem('colors', color)}
                                            className={`
                                                    pl-3 pr-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 select-none border flex items-center gap-2
                                                    ${isSelected
                                                    ? 'bg-gray-900 text-white border-gray-900 shadow-md transform scale-105'
                                                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}
                                                `}
                                        >
                                            <span
                                                className="w-4 h-4 rounded-full border border-gray-200"
                                                style={{ backgroundColor: color.toLowerCase() }}
                                            />
                                            {color}
                                        </div>
                                    )
                                })}
                            </div>
                            {errors.colors && <p className="text-red-500 text-xs font-medium mt-2 pl-1">{errors.colors}</p>}
                        </div>
                    </div>

                    {/* Section 4: Media & Description */}
                    <div className="space-y-6">
                        {/* Image URL */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">Image URL</label>
                            <input
                                type="text"
                                name="image"
                                value={productDetails.image}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${errors.image ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'} outline-none transition-all`}
                                placeholder="https://"
                            />
                            {errors.image && <p className="text-red-500 text-xs font-medium pl-1">{errors.image}</p>}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 tracking-wide">Description</label>
                            <textarea
                                name="description"
                                value={productDetails.description}
                                onChange={handleChange}
                                rows={4}
                                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${errors.description ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'} outline-none transition-all resize-none`}
                                placeholder="Detailed product description..."
                            />
                            {errors.description && <p className="text-red-500 text-xs font-medium pl-1">{errors.description}</p>}
                        </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-800 transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Publish Product
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CreateProduct