import React, { useEffect, useState } from 'react'
import { Search, Filter, Download, MoreVertical, Users, CheckCircle2, Package, Banknote, Plus } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { entitiesApi, ApiError } from '../../../lib/api'
import type { Collector } from '../../../lib/types'

export const CollectorList: React.FC = () => {
    const [collectors, setCollectors] = useState<Collector[]>([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        entitiesApi.getCollectors()
            .then(res => setCollectors(res.collectors))
            .catch(err => setError(err instanceof ApiError ? err.message : 'Failed to load suppliers'))
            .finally(() => setLoading(false))
    }, [])

    const filtered = collectors.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    )

    return (
        <div className="space-y-8 w-full max-w-7xl mx-auto pb-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-0">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-8">
                        <div className="border-b-2 border-slate-900 pb-2">
                            <h1 className="text-[20px] font-bold text-slate-900">Suppliers</h1>
                        </div>
                        <Link to="/buyers" className="pb-2 text-[20px] font-medium text-slate-500 hover:text-slate-700">
                            Buyers
                        </Link>
                    </div>
                    <p className="text-[15px] font-medium text-slate-500 mb-4">Manage performance and quality of your supply chain.</p>
                </div>
                <div className="pb-4 w-full sm:w-auto">
                    <Link to="/collectors/new" className="w-full sm:w-auto bg-[#4285F4] text-white px-5 py-2.5 rounded-lg text-[14px] font-bold shadow-sm hover:bg-[#3367D6] transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" /> Add New Supplier
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#EBF3FC] flex items-center justify-center text-[#3B82F6]">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>
                    <p className="text-[32px] font-bold text-slate-900 leading-none mb-1">{collectors.length}</p>
                    <p className="text-[13px] font-medium text-slate-500">Total Suppliers</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-[#EDF7ED] flex items-center justify-center text-[#0E8A43] mb-4">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <p className="text-[32px] font-bold text-slate-900 leading-none mb-1">{collectors.length}</p>
                    <p className="text-[13px] font-medium text-slate-500">Active Partners</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 mb-4">
                        <Package className="w-5 h-5" />
                    </div>
                    <p className="text-[32px] font-bold text-slate-900 leading-none mb-1">—</p>
                    <p className="text-[13px] font-medium text-slate-500">Inbound Volume (MT)</p>
                </div>

                <div className="bg-[#FAF9F5] rounded-2xl border border-[#FDE68A] p-6 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-[#FDE68A] flex items-center justify-center text-[#D97706] mb-4">
                        <Banknote className="w-5 h-5" />
                    </div>
                    <p className="text-[32px] font-bold text-slate-900 leading-none mb-1">—</p>
                    <p className="text-[13px] font-medium text-slate-500">Avg. Sourcing Price</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between bg-[#FDFDFD] p-3 rounded-xl border border-slate-100">
                <div className="flex-1 relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name or phone..."
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-lg text-[14px] outline-none focus:ring-1 focus:ring-slate-200"
                    />
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50">
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                    <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Supplier</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Location</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Added</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-500">Loading suppliers...</td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-500">
                                        No suppliers yet. <Link to="/collectors/new" className="text-brand-blue font-bold hover:underline">Add your first supplier</Link>
                                    </td>
                                </tr>
                            ) : filtered.map(collector => (
                                <tr key={collector.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="font-bold text-[14px] text-slate-900 mb-0.5">{collector.name}</div>
                                        <div className="text-[12px] text-slate-500 font-medium">{collector.phone}</div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-[13px] text-slate-600">
                                        {collector.location || '—'}
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-[13px] text-slate-600">
                                        {new Date(collector.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className="px-2.5 py-1 rounded-[4px] text-[12px] font-bold bg-[#A8E6B8] text-[#0A5C2F]">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right whitespace-nowrap">
                                        <Link to="/collectors/$collectorId" params={{ collectorId: collector.id }} className="inline-flex p-1 hover:bg-slate-100 rounded text-slate-400">
                                            <MoreVertical className="w-5 h-5" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 flex items-center justify-between border-t border-slate-50 bg-[#FCFCFD]">
                    <span className="text-[12px] font-medium text-slate-500">
                        Showing {filtered.length} supplier{filtered.length === 1 ? '' : 's'}
                    </span>
                </div>
            </div>
        </div>
    )
}
