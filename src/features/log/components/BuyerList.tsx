import React, { useEffect, useState } from 'react'
import { Filter, Download, ExternalLink, Plus } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { entitiesApi, ApiError } from '../../../lib/api'
import type { Buyer } from '../../../lib/types'

export const BuyerList: React.FC = () => {
    const navigate = useNavigate()
    const [buyers, setBuyers] = useState<Buyer[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        entitiesApi.getBuyers()
            .then(res => setBuyers(res.buyers))
            .catch(err => setError(err instanceof ApiError ? err.message : 'Failed to load buyers'))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="space-y-8 w-full max-w-5xl mx-auto pb-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-0">
                <div className="flex gap-6 md:gap-8">
                    <Link to="/collectors" className="pb-2 text-[18px] md:text-[20px] font-medium text-slate-500 hover:text-slate-700 whitespace-nowrap">
                        Suppliers
                    </Link>
                    <div className="border-b-2 border-slate-900 pb-2">
                        <h1 className="text-[18px] md:text-[20px] font-bold text-slate-900 whitespace-nowrap">Buyers</h1>
                    </div>
                </div>
                <div className="pb-4 w-full sm:w-auto">
                    <button
                        onClick={() => navigate({ to: '/buyers/new' })}
                        className="w-full sm:w-auto bg-[#4285F4] text-white px-5 py-2.5 rounded-lg text-[14px] font-bold shadow-sm hover:bg-[#3367D6] transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add New Buyer
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm border-l-[4px] border-l-[#1E40AF]">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Total Partners</p>
                    <p className="text-[32px] font-bold text-slate-900 leading-none">{buyers.length}</p>
                </div>
            </div>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[640px]">
                        <thead>
                            <tr className="border-b border-slate-100 bg-[#FCFCFD]">
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Buyer</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Phone</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Email</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Added</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-500">Loading buyers...</td>
                                </tr>
                            ) : buyers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-500">
                                        No buyers yet. <Link to="/buyers/new" className="text-brand-blue font-bold hover:underline">Add your first buyer</Link>
                                    </td>
                                </tr>
                            ) : buyers.map(buyer => (
                                <tr key={buyer.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-[14px] text-slate-900">{buyer.name}</td>
                                    <td className="px-6 py-4 text-[13px] text-slate-600">{buyer.phone}</td>
                                    <td className="px-6 py-4 text-[13px] text-slate-600">{buyer.email || '—'}</td>
                                    <td className="px-6 py-4 text-[13px] text-slate-600">{new Date(buyer.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link to="/buyers/$buyerId" params={{ buyerId: buyer.id }} className="inline-flex items-center gap-1 text-brand-blue text-[13px] font-bold hover:underline">
                                            View <ExternalLink className="w-3.5 h-3.5" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex gap-3">
                <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50">
                    <Filter className="w-4 h-4" /> Filters
                </button>
                <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50">
                    <Download className="w-4 h-4" /> Export
                </button>
            </div>
        </div>
    )
}
