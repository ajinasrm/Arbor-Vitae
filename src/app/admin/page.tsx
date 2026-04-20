'use client';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { 
    LayoutDashboard, 
    ShoppingBag, 
    Users, 
    TrendingUp, 
    Package, 
    AlertCircle, 
    ChevronRight,
    Search,
    Bell,
    Settings,
    Eye,
    Plus,
    Upload,
    Download,
    Filter,
    MoreHorizontal,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    Truck,
    X
} from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';

// --- Types & Constants ---

type View = 'dashboard' | 'orders' | 'products' | 'customers' | 'analytics' | 'settings';

const STATS = [
    { label: 'Total Revenue', value: '₹12,84,500', trend: '+12.5%', Icon: TrendingUp, color: 'text-green-600' },
    { label: 'Total Orders', value: '1,248', trend: '+8.2%', Icon: ShoppingBag, color: 'text-blue-600' },
    { label: 'Active Customers', value: '856', trend: '+15.1%', Icon: Users, color: 'text-purple-600' },
    { label: 'Low Stock Items', value: '12', trend: '-2', Icon: AlertCircle, color: 'text-red-600' },
];

const MOCK_ORDERS = [
    { id: '#AV-2026-0042', customer: 'Arjun Mehta', date: 'Just now', status: 'Processing', amount: '₹8,998' },
    { id: '#AV-2026-0041', customer: 'Sanya Sharma', date: '12 mins ago', status: 'Shipped', amount: '₹4,499' },
    { id: '#AV-2026-0040', customer: 'Vikram Singh', date: '45 mins ago', status: 'Delivered', amount: '₹12,197' },
    { id: '#AV-2026-0039', customer: 'Priya Iyer', date: '2 hours ago', status: 'Pending', amount: '₹3,299' },
];

// --- Sub-components ---

const DashboardView = ({ orders }: { orders: any[] }) => (
    <div className="space-y-10 animate-fade-in group/main">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="font-serif text-4xl text-charcoal tracking-tight">Executive Dashboard</h1>
                <p className="text-sm text-gray-500 mt-2">Welcome back. Your store intelligence is ready for review.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-sans font-semibold text-gray-600 hover:shadow-lg hover:border-forest/30 transition-all duration-300">
                <Download size={16} /> Export Reports
            </button>
        </div>

        {/* Stats Grid with Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {STATS.map(stat => (
                <div key={stat.label} className="group relative bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-forest/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-forest/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                    <div className="flex items-center justify-between mb-6 relative">
                        <div className={`p-4 rounded-2xl bg-gray-50/50 ${stat.color} shadow-inner`}>
                            <stat.Icon size={24} />
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[11px] font-sans font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">{stat.trend}</span>
                            <span className="text-[9px] text-gray-400 font-sans font-bold uppercase tracking-widest mt-1">vs last month</span>
                        </div>
                    </div>
                    <p className="text-[11px] text-gray-400 font-sans font-bold uppercase tracking-[0.15em] relative">{stat.label}</p>
                    <p className="text-3xl font-serif text-charcoal mt-2 relative">{stat.value}</p>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Recent Orders Table with Premium Styling */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                    <h2 className="font-serif text-2xl text-charcoal">Recent Transactions</h2>
                    <button className="text-[11px] font-sans text-forest font-bold uppercase tracking-widest hover:underline hover:underline-offset-4 transition-all">View Ledger</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-gray-50">
                                <th className="px-8 py-5">Order ID</th>
                                <th className="px-6 py-5">Customer</th>
                                <th className="px-6 py-5">Value</th>
                                <th className="px-8 py-5">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders.map(order => (
                                <tr key={order.id} className="group hover:bg-gray-50/50 transition-all duration-300">
                                    <td className="px-8 py-5 text-sm font-sans font-bold text-charcoal">{order.id}</td>
                                    <td className="px-6 py-5 text-sm font-sans text-gray-600">{order.customer}</td>
                                    <td className="px-6 py-5 text-sm font-serif font-medium text-charcoal">{order.amount}</td>
                                    <td className="px-8 py-5">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                                            order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-100' :
                                            order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                            order.status === 'Processing' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                            'bg-gray-50 text-gray-600 border-gray-100'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                                order.status === 'Delivered' ? 'bg-green-500' :
                                                order.status === 'Shipped' ? 'bg-blue-500' :
                                                order.status === 'Processing' ? 'bg-yellow-500 animate-pulse' :
                                                'bg-gray-400'
                                            }`} />
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-gray-100 p-8 shadow-xl shadow-gray-200/50 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 rounded-full -mr-16 -mt-16" />
                 <h2 className="font-serif text-2xl text-charcoal mb-8 relative">Infrastructure Health</h2>
                 <div className="space-y-6 relative">
                    {[
                        { label: 'Cloud Deployment', progress: 100 },
                        { label: 'Product Metadata', progress: 100 },
                        { label: 'Transaction Gateway', progress: 85 },
                        { label: 'Security Protocols', progress: 100 },
                    ].map(item => (
                        <div key={item.label} className="group">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[11px] font-sans font-bold text-gray-500 uppercase tracking-widest group-hover:text-charcoal transition-colors">{item.label}</span>
                                <span className="text-xs font-serif font-bold text-forest">{item.progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100 p-0.5">
                                <div className="h-full bg-forest rounded-full transition-all duration-1000 ease-out shadow-lg shadow-forest/20" style={{ width: `${item.progress}%` }} />
                            </div>
                        </div>
                    ))}
                 </div>
                 <button className="w-full bg-charcoal text-white py-4 rounded-2xl text-[11px] font-sans font-bold uppercase tracking-[0.2em] mt-10 hover:bg-forest hover:shadow-xl hover:shadow-forest/20 transition-all duration-500 active:scale-95 shadow-lg">
                    System Audit
                 </button>
            </div>
        </div>
    </div>
);

const ProductsView = ({ 
    products, 
    onImportCsv, 
    onEdit, 
    onArchive, 
    onDelete 
}: { 
    products: Product[], 
    onImportCsv: (file: File) => void,
    onEdit: (p: Product) => void,
    onArchive: (id: string) => void,
    onDelete: (id: string) => void,
    onAdd: () => void,
    onSearchChange?: (q: string) => void,
    onCategoryChange?: (cat: string) => void,
    activeCategory?: string
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="font-serif text-4xl text-charcoal tracking-tight">Products</h1>
                    <p className="text-sm text-gray-500 mt-2 max-w-md">Manage your inventory, pricing, and collections with precision.</p>
                </div>
                <div className="flex items-center gap-4">
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={(e) => e.target.files && onImportCsv(e.target.files[0])} 
                        className="hidden" 
                        accept=".csv"
                    />
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-sans font-semibold text-gray-600 hover:shadow-lg hover:border-forest/30 transition-all duration-300"
                    >
                        <Upload size={16} /> Bulk Import
                    </button>
                    <button 
                        onClick={() => onAdd()}
                        className="bg-forest text-white flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-xl shadow-forest/20 shadow-xl hover:shadow-forest/40 hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <Plus size={18} /> Add Product
                    </button>
                </div>
            </div>

            {/* Filter Bar with Glassmorphism */}
            <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm flex flex-wrap items-center justify-between gap-4 sticky top-20 z-40">
                <div className="flex items-center gap-3 bg-gray-50/50 px-4 py-2.5 rounded-xl border border-gray-100 w-full sm:w-96 focus-within:border-forest/30 transition-all">
                    <Search size={18} className="text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search products by name or SKU..." 
                        className="bg-transparent border-none outline-none text-sm w-full font-sans"
                        onChange={(e) => onSearchChange?.(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-sans font-semibold text-gray-600 hover:bg-gray-50 transition-all">
                            <Filter size={18} /> Filter
                        </button>
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                            {['All', 'Shirts', 'T-shirts', 'Trousers', 'Blazers', 'Suits', 'Accessories', 'Industrial Automation'].map(cat => (
                                <button 
                                    key={cat} 
                                    onClick={() => onCategoryChange?.(cat)}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${activeCategory === cat ? 'text-forest font-bold' : 'text-gray-600 font-medium'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-sans font-semibold text-gray-600 hover:bg-gray-50 transition-all">
                        <Download size={18} /> Export List
                    </button>
                </div>
            </div>

            {/* Product Table with Premium Styling */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-gray-400">
                                <th className="px-8 py-5">Product Details</th>
                                <th className="px-6 py-5">SKU ID</th>
                                <th className="px-6 py-5">Price</th>
                                <th className="px-6 py-5">Inventory</th>
                                <th className="px-6 py-5">Collection</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.map(p => {
                                const totalStock = p.variants.reduce((acc, v) => acc + v.stock, 0);
                                return (
                                    <tr key={p.id} className={`group hover:bg-gray-50/50 transition-all duration-300 ${p.isArchived ? 'bg-gray-50/30' : ''}`}>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100 group-hover:shadow-md transition-all duration-300">
                                                    <img src={p.images[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'} alt={p.name} className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${p.isArchived ? 'grayscale' : ''}`} />
                                                </div>
                                                <div>
                                                    <p className={`text-base font-serif font-medium text-charcoal leading-tight ${p.isArchived ? 'opacity-60' : ''}`}>{p.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-sans font-bold uppercase tracking-wider mt-1">{p.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-sm font-sans font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">{p.sku}</span>
                                        </td>
                                        <td className="px-6 py-5 text-base font-serif font-medium text-charcoal">₹{p.basePrice.toLocaleString('en-IN')}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2.5">
                                                <div className={`w-2 h-2 rounded-full ring-4 ${totalStock > 20 ? 'bg-green-500 ring-green-50' : totalStock > 5 ? 'bg-yellow-500 ring-yellow-50' : 'bg-red-500 ring-red-50'}`} />
                                                <span className="text-sm font-sans text-gray-600 font-medium">{totalStock} units</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-sans font-bold text-gray-600 uppercase tracking-wide">
                                                {p.collection}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            {p.isArchived ? (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 border border-gray-200">
                                                    <Clock size={10} className="mr-1.5" /> Archived
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 border border-green-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" /> Active
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-4">
                                                <button 
                                                    onClick={() => onEdit(p)}
                                                    className="p-2.5 bg-white border border-gray-100 hover:border-forest/30 hover:shadow-md text-forest rounded-xl transition-all"
                                                    title="Edit Product"
                                                >
                                                    <Settings size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => onArchive(p.id)}
                                                    className={`p-2.5 bg-white border border-gray-100 hover:shadow-md rounded-xl transition-all ${p.isArchived ? 'text-forest border-forest/30' : 'text-gray-400 hover:border-gray-300'}`}
                                                    title={p.isArchived ? "Unarchive" : "Archive"}
                                                >
                                                    <Download size={18} className={p.isArchived ? "rotate-180" : ""} />
                                                </button>
                                                <button 
                                                    onClick={() => { if(confirm('Are you sure you want to delete this product?')) onDelete(p.id); }}
                                                    className="p-2.5 bg-white border border-gray-100 hover:bg-red-50 hover:border-red-100 hover:shadow-md text-red-500 rounded-xl transition-all"
                                                    title="Delete Product"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const EditModal = ({ product, onClose, onSave }: { product: Product, onClose: () => void, onSave: (p: Product) => void }) => {
    const [formData, setFormData] = useState<Product>({ ...product });

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-xl transition-all duration-500 animate-fade-in" onClick={onClose} />
            <div className="bg-white/90 backdrop-blur-2xl w-full max-w-2xl rounded-[2.5rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] relative z-[10] overflow-hidden border border-white animate-premium-modal">
                <div className="p-10 pb-0 flex items-center justify-between">
                    <div>
                        <h2 className="font-serif text-3xl text-charcoal tracking-tight">{formData.id.includes('p-new') || formData.sku === '' ? 'Add New Product' : 'Edit Product'}</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {formData.sku === '' ? 'Establish new inventory profile' : `Refining details for `}
                            <span className="text-forest font-semibold">{formData.name || 'New Product'}</span>
                        </p>
                    </div>
                    <button onClick={onClose} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-300">
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>
                
                <div className="p-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="col-span-2 group">
                            <label className="text-[11px] font-sans font-bold uppercase tracking-widest text-gray-400 mb-3 block group-focus-within:text-forest transition-colors">Product Name</label>
                            <input 
                                type="text" 
                                value={formData.name} 
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-forest/5 focus:border-forest/30 transition-all duration-300 outline-none font-sans text-charcoal font-medium"
                            />
                        </div>
                        
                        <div className="group">
                            <label className="text-[11px] font-sans font-bold uppercase tracking-widest text-gray-400 mb-3 block group-focus-within:text-forest transition-colors">SKU ID</label>
                            <input 
                                type="text" 
                                value={formData.sku} 
                                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-forest/5 focus:border-forest/30 transition-all duration-300 outline-none font-sans text-charcoal font-medium"
                            />
                        </div>

                        <div className="group">
                            <label className="text-[11px] font-sans font-bold uppercase tracking-widest text-gray-400 mb-3 block group-focus-within:text-forest transition-colors">Base Price (₹)</label>
                            <input 
                                type="number" 
                                value={formData.basePrice} 
                                onChange={(e) => setFormData({ ...formData, basePrice: parseInt(e.target.value) })}
                                className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-forest/5 focus:border-forest/30 transition-all duration-300 outline-none font-sans text-charcoal font-medium"
                            />
                        </div>

                        <div className="group">
                            <label className="text-[11px] font-sans font-bold uppercase tracking-widest text-gray-400 mb-3 block group-focus-within:text-forest transition-colors">Category</label>
                            <div className="relative">
                                <select 
                                    value={formData.category} 
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-forest/5 focus:border-forest/30 transition-all duration-300 outline-none font-sans text-charcoal font-medium appearance-none"
                                >
                                    <option>Shirts</option>
                                    <option>T-shirts</option>
                                    <option>Trousers</option>
                                    <option>Blazers</option>
                                    <option>Suits</option>
                                    <option>Accessories</option>
                                </select>
                                <ChevronRight size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" />
                            </div>
                        </div>

                        <div className="group">
                            <label className="text-[11px] font-sans font-bold uppercase tracking-widest text-gray-400 mb-3 block group-focus-within:text-forest transition-colors">Stock Level</label>
                            <input 
                                type="number" 
                                value={formData.variants[0]?.stock || 0} 
                                onChange={(e) => {
                                    const newVariants = [...formData.variants];
                                    if (newVariants[0]) newVariants[0].stock = parseInt(e.target.value);
                                    setFormData({ ...formData, variants: newVariants });
                                }}
                                className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-forest/5 focus:border-forest/30 transition-all duration-300 outline-none font-sans text-charcoal font-medium"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-10 flex items-center justify-end gap-6 bg-gray-50/50">
                    <button onClick={onClose} className="text-sm font-sans font-bold text-gray-400 hover:text-charcoal transition-colors">
                        Discard Changes
                    </button>
                    <button 
                        onClick={() => onSave(formData)}
                        className="bg-forest text-white px-12 py-4 rounded-2xl font-bold shadow-xl shadow-forest/20 hover:shadow-forest/40 hover:-translate-y-1 transition-all duration-300 active:scale-95"
                    >
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

const OrdersView = ({ orders, onUpdateStatus }: { orders: any[], onUpdateStatus: (id: string, status: string) => void }) => (
    <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="font-serif text-4xl text-charcoal tracking-tight">Orders</h1>
                <p className="text-sm text-gray-500 mt-2">Manage customer fulfillment and track operational lifecycle.</p>
            </div>
            <div className="flex gap-4">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-sans font-semibold text-gray-600 hover:shadow-lg hover:border-forest/30 transition-all duration-300">
                    <Filter size={18} /> Advanced Filters
                </button>
                <button className="bg-forest text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-forest/20 hover:shadow-forest/40 hover:-translate-y-0.5 transition-all duration-300">Export All</button>
            </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-50/50 text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-gray-50">
                        <th className="px-8 py-6">Order Identification</th>
                        <th className="px-6 py-6">Customer Representative</th>
                        <th className="px-6 py-6">Statement Total</th>
                        <th className="px-6 py-6">Workflow Status</th>
                        <th className="px-8 py-6 text-right">Binding Controls</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {orders.map(order => (
                        <tr key={order.id} className="group hover:bg-gray-50/50 transition-all duration-300">
                            <td className="px-8 py-6">
                                <p className="text-base font-sans font-bold text-charcoal">{order.id}</p>
                                <p className="text-xs text-gray-400 font-sans tracking-tight mt-0.5">{order.date}</p>
                            </td>
                            <td className="px-6 py-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-forest/10 text-forest flex items-center justify-center text-[11px] font-bold">
                                        {order.customer.split(' ').map((n: string) => n[0]).join('')}
                                    </div>
                                    <p className="text-sm font-sans font-medium text-charcoal">{order.customer}</p>
                                </div>
                            </td>
                            <td className="px-6 py-6 text-base font-serif font-medium text-charcoal">{order.amount}</td>
                            <td className="px-6 py-6">
                                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
                                    order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-100 shadow-sm shadow-green-100/50' :
                                    order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-100 shadow-sm shadow-blue-100/50' :
                                    order.status === 'Processing' ? 'bg-yellow-50 text-yellow-700 border-yellow-100 shadow-sm shadow-yellow-100/50' :
                                    'bg-gray-50 text-gray-600 border-gray-100'
                                }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                        order.status === 'Delivered' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' :
                                        order.status === 'Shipped' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' :
                                        order.status === 'Processing' ? 'bg-yellow-500 animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.5)]' :
                                        'bg-gray-400'
                                    }`} />
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-4">
                                    {order.status === 'Pending' && (
                                        <button onClick={() => onUpdateStatus(order.id, 'Processing')} className="p-2.5 bg-white border border-gray-100 hover:border-yellow-200 hover:shadow-md text-yellow-600 rounded-xl transition-all">
                                            <Clock size={18} />
                                        </button>
                                    )}
                                    {order.status === 'Processing' && (
                                        <button onClick={() => onUpdateStatus(order.id, 'Shipped')} className="p-2.5 bg-white border border-gray-100 hover:border-blue-200 hover:shadow-md text-blue-600 rounded-xl transition-all">
                                            <Truck size={18} />
                                        </button>
                                    )}
                                    {order.status === 'Shipped' && (
                                        <button onClick={() => onUpdateStatus(order.id, 'Delivered')} className="p-2.5 bg-white border border-gray-100 hover:border-green-200 hover:shadow-md text-green-600 rounded-xl transition-all">
                                            <CheckCircle2 size={18} />
                                        </button>
                                    )}
                                    <button className="p-2.5 bg-white border border-gray-100 hover:shadow-md text-gray-400 rounded-xl transition-all">
                                        <Eye size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// --- Main Page Component ---

export default function AdminDashboard() {
    const { isAdmin, logout } = useUser();
    const router = useRouter();
    const [view, setView] = useState<View>('dashboard');
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [orders, setOrders] = useState(MOCK_ORDERS);
    const [notification, setNotification] = useState<string | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isAddingProduct, setIsAddingProduct] = useState(false);

    useEffect(() => {
        if (!isAdmin) {
            router.push('/auth/login');
            return;
        }

        // Initialize products from local data or localStorage
        const savedProds = localStorage.getItem('av_admin_products');
        if (savedProds) {
            setProducts(JSON.parse(savedProds));
        } else {
            setProducts(PRODUCTS);
        }
    }, [isAdmin, router]);

    const persistProducts = (newProducts: Product[]) => {
        setProducts(newProducts);
        localStorage.setItem('av_admin_products', JSON.stringify(newProducts));
    };

    const handleUpdateOrderStatus = (id: string, status: string) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
        showNotification(`Order ${id} status updated to ${status}`);
    };

    const handleArchiveProduct = (id: string) => {
        const updated = products.map(p => p.id === id ? { ...p, isArchived: !p.isArchived } : p);
        const p = updated.find(p => p.id === id);
        persistProducts(updated);
        showNotification(`Product ${p?.name} ${p?.isArchived ? 'archived' : 'unarchived'}`);
    };

    const handleDeleteProduct = (id: string) => {
        const updated = products.filter(p => p.id !== id);
        persistProducts(updated);
        showNotification(`Product deleted successfully`);
    };

    const handleSaveProduct = (updatedProduct: Product) => {
        let updated: Product[];
        if (isAddingProduct) {
            updated = [updatedProduct, ...products];
            setIsAddingProduct(false);
        } else {
            updated = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
        }
        persistProducts(updated);
        setEditingProduct(null);
        showNotification(`Product ${updatedProduct.name} ${isAddingProduct ? 'created' : 'updated'} successfully`);
    };

    const handleAddNewProduct = () => {
        const newProduct: Product = {
            id: `p-${Date.now()}`,
            sku: '',
            name: '',
            shortDescription: '',
            description: '',
            basePrice: 0,
            category: 'Shirts',
            subcategory: '',
            collection: 'New Arrivals',
            fabric: 'Premium Blend',
            fit: 'Standard',
            care: 'Dry clean only',
            tags: [],
            isTrending: false,
            isNewArrival: true,
            isBestSeller: false,
            isOnSale: false,
            discountPercentage: 0,
            images: [],
            variants: [{ id: `v-${Date.now()}`, size: 'M', color: 'White', colorHex: '#FFF', stock: 0 }],
            reviews: [],
            rating: 0,
            reviewCount: 0,
            deliveryDays: '3-5 days'
        };
        setIsAddingProduct(true);
        setEditingProduct(newProduct);
    };

    // Robust CSV parser to handle quoted content and various delimiters
    const parseCSV = (csvText: string) => {
        const rows = [];
        let currentRow = [];
        let currentToken = '';
        let inQuotes = false;

        for (let i = 0; i < csvText.length; i++) {
            const char = csvText[i];
            const nextChar = csvText[i + 1];

            if (inQuotes) {
                if (char === '"' && nextChar === '"') {
                    currentToken += '"';
                    i++;
                } else if (char === '"') {
                    inQuotes = false;
                } else {
                    currentToken += char;
                }
            } else {
                if (char === '"') {
                    inQuotes = true;
                } else if (char === ',' || char === '\n' || (char === '\r' && nextChar === '\n')) {
                    currentRow.push(currentToken.trim());
                    currentToken = '';
                    if (char !== ',') {
                        rows.push(currentRow);
                        currentRow = [];
                        if (char === '\r') i++;
                    }
                } else {
                    currentToken += char;
                }
            }
        }
        if (currentToken || currentRow.length > 0) {
            currentRow.push(currentToken.trim());
            rows.push(currentRow);
        }
        return rows;
    };

    const handleImportCsv = async (file: File) => {
        try {
            const text = await file.text();
            const rows = parseCSV(text);
            if (rows.length < 2) return;

            const header = rows[0].map(h => h.toLowerCase());
            const dataRows = rows.slice(1);
            
            const newProducts: Product[] = dataRows.map((row, idx) => {
                // Map based on Omron format: sku,title,description,specs_json,datasheet_url
                // Or basic format: name,price,category,stock
                
                const getVal = (field: string) => {
                    const index = header.indexOf(field.toLowerCase());
                    return index !== -1 ? row[index] : null;
                };

                const sku = getVal('sku') || `AV-IMPORT-${Date.now()}-${idx}`;
                const name = getVal('title') || getVal('name') || 'Untitled Product';
                const description = getVal('description') || '';
                const basePrice = parseInt(getVal('price') || '1499');
                const category = getVal('category') || 'Industrial Automation';
                const stock = parseInt(getVal('stock') || '10');
                const specsJson = getVal('specs_json');
                const datasheetUrl = getVal('datasheet_url');

                let specs = {};
                try {
                    if (specsJson) specs = JSON.parse(specsJson);
                } catch (e) { console.error('Failed to parse specs JSON', e); }

                return {
                    id: `p-csv-${Date.now()}-${idx}`,
                    sku,
                    name,
                    shortDescription: description.substring(0, 100),
                    description,
                    basePrice,
                    category,
                    subcategory: '',
                    collection: 'Legacy Collection',
                    fabric: 'Industrial Grade',
                    fit: 'Standard',
                    care: 'N/A',
                    tags: Object.keys(specs),
                    isTrending: false,
                    isNewArrival: true,
                    isBestSeller: false,
                    isOnSale: false,
                    discountPercentage: 0,
                    images: [{ id: 'img', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800', alt: name, isPrimary: true }],
                    variants: [{ id: `v-${Date.now()}`, size: 'N/A', color: 'N/A', colorHex: '#888', stock }],
                    reviews: [],
                    rating: 0,
                    reviewCount: 0,
                    deliveryDays: '5-7 days',
                    datasheetUrl,
                    specs
                } as Product;
            });

            persistProducts([...newProducts, ...products]);
            showNotification(`${newProducts.length} items integrated from system legacy.`);
        } catch (error) {
            console.error('Import failed', error);
            showNotification('Import failed: Invalid file format');
        }
    };

    const showNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    if (!isAdmin) return null;

    return (
        <div className="min-h-screen flex" style={{ background: '#f8f9fa' }}>
            {/* Notification Toast */}
            {notification && (
                <div className="fixed top-20 right-8 z-[1000] animate-slide-right">
                    <div className="bg-forest text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
                        <CheckCircle2 size={18} />
                        <span className="text-sm font-sans font-medium">{notification}</span>
                        <button onClick={() => setNotification(null)} className="ml-2 hover:opacity-70"><X size={14} /></button>
                    </div>
                </div>
            )}

            {editingProduct && (
                <EditModal 
                    product={editingProduct} 
                    onClose={() => setEditingProduct(null)} 
                    onSave={handleSaveProduct} 
                />
            )}

            {/* Premium Sidebar */}
            <aside className="w-72 bg-charcoal hidden lg:block h-screen sticky top-0 overflow-y-auto shadow-2xl z-[100]">
                <div className="p-8 border-b border-white/5">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-forest rounded-xl flex items-center justify-center shadow-lg shadow-forest/20 group-hover:scale-110 transition-transform duration-500">
                             <LayoutDashboard className="text-white" size={20} />
                        </div>
                        <span className="font-serif text-2xl font-bold text-white tracking-tight">Arbor Vitae</span>
                    </Link>
                </div>
                
                <div className="p-6">
                    <p className="px-4 text-[10px] font-sans font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Management</p>
                    <nav className="space-y-2">
                        {[
                            { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
                            { id: 'orders', label: 'Orders', Icon: ShoppingBag },
                            { id: 'products', label: 'Products', Icon: Package },
                            { id: 'customers', label: 'Customers', Icon: Users },
                        ].map(item => (
                            <button 
                                key={item.id}
                                onClick={() => setView(item.id as View)}
                                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-sans font-medium transition-all duration-300 ${view === item.id ? 'bg-white/10 text-white shadow-lg backdrop-blur-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <item.Icon size={20} className={view === item.id ? 'text-forest' : ''} />
                                {item.label}
                                {view === item.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />}
                            </button>
                        ))}
                    </nav>

                    <p className="px-4 text-[10px] font-sans font-bold text-gray-500 uppercase tracking-[0.2em] mt-10 mb-4">Business</p>
                    <nav className="space-y-2">
                        {[
                            { id: 'analytics', label: 'Analytics', Icon: TrendingUp },
                            { id: 'settings', label: 'Settings', Icon: Settings },
                        ].map(item => (
                            <button 
                                key={item.id}
                                onClick={() => setView(item.id as View)}
                                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-sans font-medium transition-all duration-300 ${view === item.id ? 'bg-white/10 text-white shadow-lg backdrop-blur-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <item.Icon size={20} className={view === item.id ? 'text-forest' : ''} />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="absolute bottom-0 w-72 p-8 border-t border-white/5 bg-charcoal-dark/50 backdrop-blur-md">
                    <button 
                        onClick={() => { logout(); router.push('/auth/login'); }}
                        className="w-full flex items-center gap-4 px-4 py-3 text-sm font-sans font-semibold text-red-400/80 hover:text-red-400 hover:bg-red-400/10 rounded-2xl transition-all duration-300"
                    >
                        <X size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-h-screen">
                {/* Premium Glass Topbar */}
                <header className="bg-white/70 backdrop-blur-xl border-b border-gray-100 h-20 flex items-center justify-between px-10 sticky top-0 z-50 transition-all duration-500">
                    <div className="flex items-center gap-4 bg-gray-50/50 px-5 py-2.5 rounded-2xl border border-gray-100 w-[24rem] focus-within:w-[28rem] focus-within:border-forest/30 focus-within:shadow-lg focus-within:shadow-forest/5 transition-all duration-500">
                        <Search size={18} className="text-gray-400" />
                        <input type="text" placeholder="Global command search..." className="bg-transparent border-none outline-none text-sm w-full font-sans text-charcoal font-medium" />
                    </div>
                    
                    <div className="flex items-center gap-8">
                        <div className="hidden xl:flex items-center gap-2 px-4 py-2 bg-yellow-400/5 text-yellow-600/80 border border-yellow-400/20 rounded-xl text-[10px] font-sans font-bold uppercase tracking-widest shadow-inner">
                           <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" /> Launch Mode Active
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <button className="relative p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all duration-300 text-gray-500 group">
                                <Bell size={20} />
                                <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform"></span>
                            </button>
                            
                            <div className="flex items-center gap-4 border-l border-gray-100 pl-8">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold font-serif text-charcoal leading-tight">Ajinas Admin</p>
                                    <p className="text-[10px] text-gray-400 font-sans font-bold uppercase tracking-tighter">System Administrator</p>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-forest text-white flex items-center justify-center text-sm font-bold shadow-2xl shadow-forest/30 hover:rotate-3 transition-transform cursor-pointer overflow-hidden">
                                     <span className="relative z-10">AJ</span>
                                     <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 pb-16">
                    {view === 'dashboard' && <DashboardView orders={orders} />}
                    {view === 'products' && (
                        <ProductsView 
                            products={products.filter(p => {
                                const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
                                const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
                                return matchesSearch && matchesCategory;
                            })} 
                            onImportCsv={handleImportCsv} 
                            onEdit={setEditingProduct}
                            onArchive={handleArchiveProduct}
                            onDelete={handleDeleteProduct}
                            onAdd={handleAddNewProduct}
                            onSearchChange={setSearchQuery}
                            onCategoryChange={setCategoryFilter}
                            activeCategory={categoryFilter}
                        />
                    )}
                    {view === 'orders' && <OrdersView orders={orders} onUpdateStatus={handleUpdateOrderStatus} />}
                    
                    {view === 'settings' && (
                        <div className="max-w-4xl space-y-10 animate-fade-in">
                            <h2 className="font-serif text-3xl text-charcoal">Global System Parameters</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-xl group">
                                    <h3 className="text-[11px] font-sans font-bold uppercase tracking-widest text-gray-400 mb-6">Store Integrity</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                                            <span className="text-sm font-medium text-gray-600">Maintenance Protocol</span>
                                            <div className="w-12 h-6 bg-gray-200 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1" /></div>
                                        </div>
                                        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-forest/10">
                                            <span className="text-sm font-medium text-gray-600">Real-time Stock Sync</span>
                                            <div className="w-12 h-6 bg-forest rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-xl">
                                    <h3 className="text-[11px] font-sans font-bold uppercase tracking-widest text-gray-400 mb-6">API Command Center</h3>
                                    <p className="text-sm text-gray-500 mb-6">Current API Latency: <span className="text-forest font-bold font-serif">12ms</span></p>
                                    <button className="w-full py-3 bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-widest rounded-xl border border-gray-100 cursor-not-allowed">Reset Key Vault</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {['customers', 'analytics'].includes(view) && (
                        <div className="flex flex-col items-center justify-center py-32 bg-white/50 backdrop-blur-sm rounded-[3rem] border-2 border-dashed border-gray-200 group">
                             <div className="p-10 bg-gray-50 rounded-full mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                                <TrendingUp className="text-gray-300 group-hover:text-forest transition-colors duration-500" size={64} />
                             </div>
                             <h3 className="font-serif text-3xl text-charcoal">Calibrating Intelligence Streams</h3>
                             <p className="text-sm text-gray-400 mt-4 max-w-sm text-center font-sans">We are currently synchronizing the {view} matrix with live operational data. Full visualization will be available shortly.</p>
                             <div className="flex gap-4 mt-12">
                                <div className="w-2 h-2 bg-forest rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <div className="w-2 h-2 bg-forest rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <div className="w-2 h-2 bg-forest rounded-full animate-bounce" />
                             </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
