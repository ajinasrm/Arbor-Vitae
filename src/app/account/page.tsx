'use client';
import { useState } from 'react';
import Link from 'next/link';
import { User, MapPin, ShoppingBag, Heart, Settings, LogOut, ChevronRight, Package, Star, Edit } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const MOCK_USER = {
    firstName: 'Arjun',
    lastName: 'Mehta',
    email: 'arjun.mehta@email.com',
    phone: '+91 98765 43210',
    loyaltyPoints: 1250,
};

const MOCK_ORDERS = [
    { id: '#AV-2026-0042', date: '5 Mar 2026', status: 'Delivered', items: 2, total: 8998, tracking: 'BLRD234567' },
    { id: '#AV-2026-0028', date: '18 Feb 2026', status: 'Shipped', items: 1, total: 12999, tracking: 'BLRD198765' },
    { id: '#AV-2026-0015', date: '10 Jan 2026', status: 'Delivered', items: 3, total: 6197, tracking: 'BLRD765432' },
];

const NAV_ITEMS = [
    { id: 'profile', label: 'Profile', Icon: User },
    { id: 'orders', label: 'Orders', Icon: ShoppingBag },
    { id: 'addresses', label: 'Address Book', Icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', Icon: Heart },
    { id: 'loyalty', label: 'Loyalty Points', Icon: Star },
    { id: 'settings', label: 'Account Settings', Icon: Settings },
];

const STATUS_COLORS: Record<string, string> = {
    Delivered: 'var(--forest-green)',
    Shipped: 'var(--earth-brown)',
    Pending: '#666',
    Cancelled: '#c0392b',
};

export default function AccountPage() {
    const { user, logout, isAuthenticated } = useUser();
    const router = useRouter();
    const [tab, setTab] = useState('profile');
    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState(user || MOCK_USER);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-cream">
            {/* Executive Header */}
            <div className="pt-32 pb-20 bg-charcoal relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[50%] h-full opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(45,80,22,0.3),transparent_70%)]" />
                </div>
                <div className="container-lg relative z-10">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-10">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-[2.5rem] flex items-center justify-center font-serif text-5xl text-white shadow-2xl relative z-10 overflow-hidden border border-white/10">
                                <div className="absolute inset-0 bg-forest opacity-80 group-hover:scale-110 transition-transform duration-700" />
                                <span className="relative z-10">{user.firstName[0]}</span>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 cursor-pointer hover:scale-110 transition-transform">
                                <Edit size={16} className="text-forest" />
                            </div>
                        </div>
                        <div className="text-center md:text-left flex-grow">
                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                                <p className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-forest">Executive Membership</p>
                                <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20" />
                                <p className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-white/40 italic">Member since 2024</p>
                            </div>
                            <h1 className="font-serif text-5xl text-white tracking-tight mb-4">{user.firstName} {user.lastName}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-6">
                                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-md">
                                    <Star size={16} className="text-forest" />
                                    <span className="font-sans text-sm text-white font-medium">{MOCK_USER.loyaltyPoints.toLocaleString('en-IN')} <span className="text-white/40 ml-1">Heritage Points</span></span>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-md">
                                    <Package size={16} className="text-forest" />
                                    <span className="font-sans text-sm text-white font-medium">{MOCK_ORDERS.length} <span className="text-white/40 ml-1">Orders</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-lg py-16 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Premium Sidebar */}
                    <aside className="lg:col-span-1">
                        <nav className="bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-white shadow-sm overflow-hidden p-3 space-y-1">
                            {NAV_ITEMS.map(({ id, label, Icon }) => (
                                <button
                                    key={id}
                                    id={`account-tab-${id}`}
                                    onClick={() => setTab(id)}
                                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-sans font-bold uppercase tracking-widest transition-all duration-300 ${
                                        tab === id 
                                        ? 'bg-charcoal text-white shadow-xl shadow-charcoal/20 scale-[1.02]' 
                                        : 'text-gray-400 hover:bg-gray-50 hover:text-charcoal'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <Icon size={18} className={tab === id ? 'text-forest' : ''} />
                                        {label}
                                    </div>
                                    {tab === id && <ChevronRight size={14} className="text-forest" />}
                                </button>
                            ))}
                            <div className="pt-4 mt-4 border-t border-gray-50">
                                <button
                                    onClick={() => { logout(); router.push('/auth/login'); }}
                                    className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-sans font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all duration-300"
                                >
                                    <LogOut size={18} />
                                    Sign Out
                                </button>
                            </div>
                        </nav>

                        <div className="mt-8 p-8 bg-forest rounded-[2.5rem] shadow-xl shadow-forest/20 relative overflow-hidden group cursor-pointer">
                            <div className="absolute top-[-20px] right-[-20px] opacity-10 group-hover:rotate-12 transition-transform duration-700">
                                <Leaf size={100} />
                            </div>
                            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-white/60 mb-2">Concierge Assistance</p>
                            <p className="font-serif text-lg text-white leading-tight">Need help with your bespoke order?</p>
                            <Link href="/contact" className="inline-block mt-4 text-[10px] font-sans font-bold uppercase tracking-widest text-white border-b border-white/30 hover:border-white transition-all">Engage Support</Link>
                        </div>
                    </aside>

                    {/* Main panel with Premium Logic */}
                    <div className="lg:col-span-3 space-y-8 animate-fade-in">
                        {tab === 'profile' && (
                            <div className="bg-white/70 backdrop-blur-md rounded-[3rem] border border-white shadow-sm p-10 md:p-14">
                                <div className="flex items-center justify-between mb-12">
                                    <h2 className="font-serif text-4xl text-charcoal tracking-tight">Identity Details</h2>
                                    <button 
                                        id="edit-profile-btn" 
                                        onClick={() => setEditMode(v => !v)} 
                                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest transition-all ${
                                            editMode ? 'bg-red-50 text-red-600' : 'bg-forest/10 text-forest hover:bg-forest hover:text-white'
                                        }`}
                                    >
                                        {editMode ? <X size={14} /> : <Edit size={14} />} {editMode ? 'Cancel Selection' : 'Refine Profile'}
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                    {[
                                        { label: 'Given Name', field: 'firstName', val: user.firstName },
                                        { label: 'Family Name', field: 'lastName', val: user.lastName },
                                        { label: 'Correspondence Email', field: 'email', val: user.email },
                                        { label: 'Operational Phone', field: 'phone', val: user.phone },
                                    ].map(({ label, field, val }) => (
                                        <div key={field} className="space-y-3">
                                            <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">{label}</label>
                                            {editMode ? (
                                                <input
                                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-sans text-sm focus:ring-2 focus:ring-forest/20 transition-all"
                                                    value={val}
                                                    onChange={e => setUser(u => ({ ...u, [field]: e.target.value }))}
                                                />
                                            ) : (
                                                <p className="font-serif text-xl text-charcoal border-b border-gray-100 pb-3">{val}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {editMode && (
                                    <button className="mt-12 bg-charcoal text-white px-10 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl shadow-charcoal/20 hover:scale-[1.02] transition-all" onClick={() => setEditMode(false)}>
                                        Commit Changes
                                    </button>
                                )}
                            </div>
                        )}

                        {tab === 'orders' && (
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-serif text-4xl text-charcoal tracking-tight">Acquisition Ledger</h2>
                                    <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Transactions: {MOCK_ORDERS.length}</div>
                                </div>
                                {MOCK_ORDERS.length === 0 ? (
                                    <div className="bg-white/50 py-20 rounded-[3rem] border border-dashed border-gray-200 text-center">
                                        <p className="text-gray-400 font-sans italic">Your acquisition ledger is currently void.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {MOCK_ORDERS.map(order => (
                                            <div key={order.id} className="group bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-white p-8 md:p-10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                                                <div className="flex items-start justify-between flex-wrap gap-6 mb-8">
                                                    <div>
                                                        <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-forest mb-2">Order Identification</p>
                                                        <h3 className="font-serif text-2xl text-charcoal tracking-tight group-hover:text-forest transition-colors">{order.id}</h3>
                                                        <p className="text-xs font-sans mt-2 text-gray-400 font-medium uppercase tracking-widest">{order.date} · {order.items} ITEM{order.items > 1 ? 'S' : ''}</p>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-3 text-right">
                                                        <span className={`px-4 py-1.5 text-[10px] font-sans font-bold uppercase tracking-widest rounded-full text-white shadow-lg`} style={{ background: STATUS_COLORS[order.status] || '#666', boxShadow: `0 8px 16px -4px ${STATUS_COLORS[order.status]}44` }}>
                                                            {order.status}
                                                        </span>
                                                        <span className="font-serif text-3xl text-charcoal tracking-tighter">₹{order.total.toLocaleString('en-IN')}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-gray-50">
                                                    <Link href={`/account/orders/${order.id}`} className="px-8 py-3 bg-charcoal text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-forest transition-all duration-300">Detailed Review</Link>
                                                    {order.tracking && (
                                                        <div className="flex items-center gap-3 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400">
                                                            <div className="p-2 bg-gray-50 rounded-lg"><Package size={14} className="text-forest" /></div>
                                                            {order.tracking}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {tab === 'addresses' && (
                            <div className="bg-white/70 backdrop-blur-md rounded-[3rem] border border-white shadow-sm p-10 md:p-14">
                                <div className="flex items-center justify-between mb-12">
                                    <h2 className="font-serif text-4xl text-charcoal tracking-tight">Base Registry</h2>
                                    <button className="bg-forest text-white px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:shadow-lg transition-all">+ Register New</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700" />
                                        <div className="flex items-start justify-between mb-6 relative z-10">
                                            <p className="font-serif text-2xl text-charcoal">{user.firstName} {user.lastName}</p>
                                            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-forest bg-forest/10 px-3 py-1 rounded-full">Default</span>
                                        </div>
                                        <div className="space-y-2 text-sm font-sans text-gray-500 relative z-10 mb-8">
                                            <p>123, MG Road, Indiranagar</p>
                                            <p>Bangalore, Karnataka — 560 038</p>
                                            <p>{user.phone}</p>
                                        </div>
                                        <div className="flex gap-6 relative z-10">
                                            <button className="text-[10px] font-sans font-bold uppercase tracking-widest text-forest hover:tracking-[0.2em] transition-all">Institutionalize</button>
                                            <button className="text-[10px] font-sans font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors">Discard</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {tab === 'loyalty' && (
                            <div className="bg-white/70 backdrop-blur-md rounded-[3rem] border border-white shadow-sm p-10 md:p-14 text-center">
                                <h2 className="font-serif text-4xl text-charcoal tracking-tight mb-4">Heritage Capital</h2>
                                <p className="text-sm text-gray-400 font-sans mb-12 italic">Your accrued value within the Arbor Vitae ecosystem.</p>
                                
                                <div className="max-w-md mx-auto p-12 bg-charcoal rounded-[3rem] shadow-2xl relative overflow-hidden group mb-12">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(45,80,22,0.3),transparent_70%)] opacity-30" />
                                    <div className="relative z-10">
                                        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-forest mb-4">Consolidated Balance</p>
                                        <p className="font-serif text-7xl text-white tracking-tighter mb-2">{MOCK_USER.loyaltyPoints.toLocaleString('en-IN')}</p>
                                        <p className="text-sm font-sans text-white/40 tracking-[0.2em]">EQUIVALENT TO ₹{Math.round(MOCK_USER.loyaltyPoints / 10).toLocaleString('en-IN')}</p>
                                    </div>
                                </div>

                                <div className="space-y-4 max-w-2xl mx-auto">
                                    <div className="p-1.5 bg-gray-50 rounded-[2.5rem]">
                                        {[
                                            { label: 'Bespoke Order #AV-2026-0042', val: '+450 PTS', sub: 'Accrued 5 Mar' },
                                            { label: 'Seasonal Collection #AV-2026-0028', val: '+650 PTS', sub: 'Accrued 18 Feb' },
                                            { label: 'Founders Welcome Bonus', val: '+150 PTS', sub: 'Inaugural Membership' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-6 hover:bg-white rounded-[2rem] transition-all duration-300 group">
                                                <div className="text-left">
                                                    <p className="font-serif text-lg text-charcoal">{item.label}</p>
                                                    <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-gray-400">{item.sub}</p>
                                                </div>
                                                <span className="font-serif text-xl text-forest group-hover:scale-110 transition-transform">{item.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {tab === 'settings' && (
                            <div className="bg-white/70 backdrop-blur-md rounded-[3rem] border border-white shadow-sm p-10 md:p-14">
                                <h2 className="font-serif text-4xl text-charcoal tracking-tight mb-12">System Preferences</h2>
                                <div className="space-y-8">
                                    {[
                                        { title: 'Digital Correspondence', desc: 'Receive high-heritage collection alerts and bespoke insights.', active: true },
                                        { title: 'Logistical Protocol', desc: 'Real-time SMS updates regarding dispatch and fulfillment provenance.', active: false },
                                        { title: 'Encrypted Security', desc: 'Two-factor authentication for sensitive acquisition profile updates.', active: true },
                                    ].map((opt, i) => (
                                        <div key={i} className="flex items-center justify-between py-6 border-b border-gray-50 group">
                                            <div className="max-w-md">
                                                <p className="font-serif text-2xl text-charcoal group-hover:text-forest transition-colors">{opt.title}</p>
                                                <p className="text-sm text-gray-400 font-sans mt-1 leading-relaxed">{opt.desc}</p>
                                            </div>
                                            <div className={`w-14 h-8 rounded-full flex items-center px-1.5 transition-all duration-500 cursor-pointer ${opt.active ? 'bg-forest' : 'bg-gray-200'}`}>
                                                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-500 ${opt.active ? 'translate-x-6' : 'translate-x-0'}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-20 p-12 bg-red-50 rounded-[3rem] border border-red-100">
                                    <h3 className="font-serif text-2xl text-red-700 mb-2 tracking-tight">Acquisition Termination</h3>
                                    <p className="text-sm text-red-600/70 font-sans mb-8">Once an identity is purged from the Arbor Vitae registry, all heritage points and acquisition provenance are permanently redacted.</p>
                                    <button className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-red-600 border-b border-red-200 hover:border-red-600 transition-all">Redact Identity</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
