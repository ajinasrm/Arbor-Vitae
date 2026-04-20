'use client';

import { Package, Clock, CheckCircle } from 'lucide-react';

const mockOrders = [
    { id: '#ORD-7829', customer: 'Alice Freeman', date: 'Oct 24, 2023', total: '₹4,500', status: 'Delivered', items: 2 },
    { id: '#ORD-7830', customer: 'Bob Smith', date: 'Oct 24, 2023', total: '₹12,000', status: 'Processing', items: 1 },
    { id: '#ORD-7831', customer: 'Charlie Brown', date: 'Oct 23, 2023', total: '₹2,300', status: 'Shipped', items: 3 },
    { id: '#ORD-7832', customer: 'Diana Prince', date: 'Oct 23, 2023', total: '₹8,900', status: 'Processing', items: 1 },
    { id: '#ORD-7833', customer: 'Evan Wright', date: 'Oct 22, 2023', total: '₹15,000', status: 'Delivered', items: 4 },
];

export default function OrderList() {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
                <h3 className="text-lg font-medium text-primary flex items-center gap-2">
                    <Package className="w-5 h-5" /> Recent Orders
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                        <tr>
                            <th className="px-6 py-3">Order ID</th>
                            <th className="px-6 py-3">Customer</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockOrders.map((order) => (
                            <tr key={order.id} className="border-b border-border hover:bg-muted/30">
                                <td className="px-6 py-4 font-medium text-foreground">{order.id}</td>
                                <td className="px-6 py-4">{order.customer}</td>
                                <td className="px-6 py-4">{order.date}</td>
                                <td className="px-6 py-4">{order.total}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium 
                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-blue-100 text-blue-700'}`}>
                                        {order.status === 'Delivered' && <CheckCircle className="w-3 h-3" />}
                                        {order.status === 'Processing' && <Clock className="w-3 h-3" />}
                                        {order.status === 'Shipped' && <Package className="w-3 h-3" />}
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
