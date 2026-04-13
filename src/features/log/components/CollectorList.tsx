import React from 'react'
import { ArrowLeft, Search, Filter, TrendingUp, AlertTriangle, ChevronRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const CollectorList: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-brand-dark">Collectors</h1>
                    <p className="text-slate-500">Manage performance and quality of your supply chain.</p>
                </div>
                <button className="bg-brand-blue text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-brand-blue/20 flex items-center space-x-2">
                    <span>Add New Collector</span>
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Search by name or phone..." className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-blue/10" />
                </div>
                <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                </button>
            </div>

            {/* Collector Table */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Collector</th>
                            <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Total Volume</th>
                            <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">High-Value Yield</th>
                            <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Contamination</th>
                            <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <tr key={i} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="font-bold text-brand-dark">Sani Mohammed</div>
                                        <div className="text-xs text-slate-500">+234 802 345 6789</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-700">12.8t</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-bold text-emerald-600">88.4%</span>
                                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">3.2%</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                        Active
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-blue transition-colors inline" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
