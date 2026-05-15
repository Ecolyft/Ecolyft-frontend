import React from 'react'
import { Filter, Download, ArrowUpRight, TrendingUp, Map, Lightbulb, ExternalLink, Plus } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'

const tableData = [
    { company: 'GreenPack Manufacturing', material: 'rPET Flakes', volume: '45,200', price: '840.00', ltv: '37,968,000', status: 'ACTIVE', statusColor: 'bg-[#EDF7ED] text-[#0E8A43]' },
    { company: 'EcoBrick Solutions', material: 'HDPE Pellets', volume: '12,500', price: '620.00', ltv: '7,750,000', status: 'ACTIVE', statusColor: 'bg-[#EDF7ED] text-[#0E8A43]' },
    { company: 'Lagos Polymer Ltd', material: 'Mixed Plastics', volume: '8,400', price: '450.00', ltv: '3,780,000', status: 'INACTIVE', statusColor: 'bg-slate-200 text-slate-500' },
    { company: 'West African Textile Co.', material: 'Polyester Fibers', volume: '104,000', price: '910.00', ltv: '94,640,000', status: 'ACTIVE', statusColor: 'bg-[#EDF7ED] text-[#0E8A43]' },
]

export const BuyerList: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className="space-y-8 w-full max-w-5xl mx-auto pb-12">
            {/* Header & Tabs */}
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

            {/* Demand Alert */}
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] border-l-[4px] border-l-[#22C55E] p-4 rounded-r-lg flex justify-between items-start shadow-sm">
                <div>
                    <h3 className="text-[14px] font-bold text-slate-900 mb-1">West African Textile Co.</h3>
                    <p className="text-[13px] font-medium text-[#16A34A]">Demand for Polyester Fibers is outstripping current allocations by 15.4%. Recommend increasing logistics priority.</p>
                </div>
                <TrendingUp className="w-5 h-5 text-[#22C55E]" />
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm border-l-[4px] border-l-[#1E40AF]">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Total Partners</p>
                    <div className="flex items-end gap-2">
                        <p className="text-[32px] font-bold text-slate-900 leading-none">142</p>
                        <div className="flex items-center text-[#16A34A] mb-1">
                            <ArrowUpRight className="w-3 h-3" />
                            <span className="text-[12px] font-bold">+4</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm border-l-[4px] border-l-[#0E8A43]">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Active Contracts</p>
                    <div className="flex items-end gap-3">
                        <p className="text-[32px] font-bold text-slate-900 leading-none">89</p>
                        <span className="text-[12px] font-bold text-[#3B82F6] mb-1">Live Now</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm border-l-[4px] border-l-[#D97706]">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Sold Volume (MT)</p>
                    <div className="flex items-end gap-2">
                        <p className="text-[32px] font-bold text-slate-900 leading-none">12.8k</p>
                        <span className="text-[12px] font-medium text-slate-500 mb-1">Fiscal YTD</span>
                    </div>
                </div>

                <div className="bg-[#3B82F6] rounded-xl p-6 shadow-sm text-white relative overflow-hidden">
                    <p className="text-[11px] font-bold text-blue-100 uppercase tracking-widest mb-3 relative z-10">Avg. Price / Unit</p>
                    <div className="relative z-10 flex justify-between items-end">
                        <p className="text-[32px] font-bold leading-none">N342.50</p>
                    </div>
                    {/* Decorative abstract banknote icon */}
                    <div className="absolute right-4 bottom-4 opacity-20">
                        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="38" height="22" rx="3" stroke="white" strokeWidth="2"/>
                            <circle cx="20" cy="12" r="5" stroke="white" strokeWidth="2"/>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Buyer Directory Table */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 flex items-center justify-between border-b border-slate-50">
                    <h2 className="text-[16px] font-bold text-slate-900">Buyer Directory</h2>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50">
                            <Download className="w-4 h-4" /> Export CSV
                        </button>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-[13px]">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-6 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest">Company Name</th>
                                <th className="px-6 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest">Primary Material</th>
                                <th className="px-6 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest text-right">Volume (kg)</th>
                                <th className="px-6 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest text-right">Avg Price (N/kg)</th>
                                <th className="px-6 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest text-right">LTV (N)</th>
                                <th className="px-6 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {tableData.map((row, i) => (
                                <tr
                                    key={i}
                                    onClick={() => navigate({ to: '/buyers/$buyerId', params: { buyerId: String(i + 1) } })}
                                    className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                                >
                                    <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">{row.company}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-[4px] text-[11px] font-medium">
                                            {row.material}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700 text-right whitespace-nowrap">{row.volume}</td>
                                    <td className="px-6 py-4 text-slate-700 text-right whitespace-nowrap">{row.price}</td>
                                    <td className="px-6 py-4 font-bold text-[#3B82F6] text-right whitespace-nowrap">{row.ltv}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold tracking-wider uppercase ${row.statusColor}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 flex items-center justify-between border-t border-slate-50 bg-[#FCFCFD]">
                    <span className="text-[12px] font-medium text-slate-500">Showing 1-4 of 28 buyers</span>
                    <div className="flex gap-1">
                        <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 text-[12px]">&lt;</button>
                        <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 text-[12px]">&gt;</button>
                    </div>
                </div>
            </div>

            {/* Market Coverage Section */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-[18px] font-bold text-slate-900 mb-1">Market Coverage</h2>
                        <p className="text-[13px] font-medium text-slate-500">Regional distribution of active partners</p>
                    </div>
                    <Map className="w-5 h-5 text-[#3B82F6]" />
                </div>

                <div className="bg-[#F0F7FF] border border-[#BFDBFE] p-4 rounded-lg flex gap-3 items-start mb-8">
                    <Lightbulb className="w-4 h-4 text-[#3B82F6] mt-0.5 shrink-0" />
                    <p className="text-[13px] font-medium text-[#1E40AF]">
                        <span className="font-bold">Insight:</span> Lagos Central volume has grown by 14% this month, primarily driven by rPET Clear demand.
                    </p>
                </div>

                <div className="border border-slate-100 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-[14px] font-bold text-slate-900">Regional Market Share</h3>
                        <button className="text-[13px] font-bold text-[#3B82F6] flex items-center gap-1 hover:text-[#2563EB]">
                            View Report <ExternalLink className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-12">
                        {/* Ring Chart & Legend */}
                        <div className="flex items-center gap-8">
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                {/* SVG Ring Chart */}
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    {/* Grey ring (20%) */}
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E2E8F0" strokeWidth="12" />
                                    {/* Green ring (25%) */}
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0E8A43" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * 0.8} />
                                    {/* Blue ring (55%) */}
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3B82F6" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * 0.45} />
                                </svg>
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-[24px] font-bold text-slate-900 leading-none">12</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-8">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#3B82F6]"></div>
                                        <span className="text-[13px] font-medium text-slate-700 w-12">Lagos</span>
                                    </div>
                                    <span className="text-[14px] font-bold text-slate-900">55%</span>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#0E8A43]"></div>
                                        <span className="text-[13px] font-medium text-slate-700 w-12">Abuja</span>
                                    </div>
                                    <span className="text-[14px] font-bold text-slate-900">25%</span>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                                        <span className="text-[13px] font-medium text-slate-700 w-12">Others</span>
                                    </div>
                                    <span className="text-[14px] font-bold text-slate-900">20%</span>
                                </div>
                            </div>
                        </div>

                        {/* Additional Stats */}
                        <div className="flex-1 flex justify-around md:border-l border-slate-100 pl-6 w-full">
                            <div className="text-center">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">South West</p>
                                <p className="text-[28px] font-bold text-[#3B82F6]">64%</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">North Central</p>
                                <p className="text-[28px] font-bold text-[#3B82F6]">22%</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">South East</p>
                                <p className="text-[28px] font-bold text-[#3B82F6]">14%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
