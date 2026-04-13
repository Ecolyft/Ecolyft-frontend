import React from 'react'
import { ArrowLeft, Search, Filter, ShoppingBag, ChevronRight, Phone, Mail } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const BuyerList: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-brand-dark">Buyers</h1>
                    <p className="text-slate-500">Manage your outbound supply chain and verified sales.</p>
                </div>
                <button className="bg-brand-blue text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-brand-blue/20 flex items-center space-x-2">
                    <span>Add New Buyer</span>
                </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex space-x-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search buyers..." className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                    </div>
                </div>
                <div className="divide-y divide-slate-100">
                    {[1, 2, 3].map((v) => (
                        <div key={v} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-brand-light rounded-xl">
                                    <ShoppingBag className="w-6 h-6 text-brand-blue" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-brand-dark">RecyclePoints Nigeria</h3>
                                    <div className="flex items-center space-x-4 text-xs text-slate-500 font-medium">
                                        <span className="flex items-center space-x-1">
                                            <Phone className="w-3 h-3" />
                                            <span>+234 1 234 5678</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <Mail className="w-3 h-3" />
                                            <span>sales@recyclepoints.com</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right space-y-1">
                                <div className="text-sm font-bold text-brand-dark">12.4t Purchased</div>
                                <div className="text-xs text-slate-400">Last Sale: 3 days ago</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
