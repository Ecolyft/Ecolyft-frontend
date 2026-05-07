import React from 'react'
import { Search, Filter, Download, MoreVertical, Users, CheckCircle2, Package, Banknote, ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const tableData = [
    {
        name: 'Sani Mohammed', phone: '+234 802 3456789',
        vol: '12.8t', volChange: '+4.2%', volUp: true,
        yield: '88.4%', yieldColor: 'bg-[#0E8A43]',
        materials: [{ name: 'RPET CLEAR', color: 'bg-[#EBF3FC] text-[#3B82F6]' }, { name: 'HDPE', color: 'bg-[#EDF7ED] text-[#0E8A43]' }],
        waste: '3.2%', wasteColor: 'text-[#d34545]',
        status: 'Active', statusColor: 'bg-[#A8E6B8] text-[#0A5C2F]'
    },
    {
        name: 'Gryn Alliance Global', phone: '+234 806 3456889',
        vol: '9.5t', volChange: '-1.5%', volUp: false,
        yield: '76.2%', yieldColor: 'bg-[#3B82F6]',
        materials: [{ name: 'PP', color: 'bg-[#FFF9E6] text-[#D97706]' }, { name: 'HDPE', color: 'bg-[#EDF7ED] text-[#0E8A43]' }],
        waste: '1.8%', wasteColor: 'text-slate-900',
        status: 'Active', statusColor: 'bg-[#A8E6B8] text-[#0A5C2F]'
    },
    {
        name: 'Chidi Nwosu LTD', phone: '+234 807 3756781',
        vol: '4.2t', volChange: '0.0%', volUp: null,
        yield: '92.0%', yieldColor: 'bg-[#0E8A43]',
        materials: [{ name: 'RPET BLUE', color: 'bg-[#EBF3FC] text-[#3B82F6]' }],
        waste: '0.5%', wasteColor: 'text-slate-900',
        status: 'Inactive', statusColor: 'bg-slate-200 text-slate-600'
    },
    {
        name: 'Islamiah Festac', phone: '+234 803 3458779',
        vol: '15.1t', volChange: '+12.4%', volUp: true,
        yield: '64.5%', yieldColor: 'bg-[#F59E0B]',
        materials: [{ name: 'RPET CLEAR', color: 'bg-[#EBF3FC] text-[#3B82F6]' }, { name: 'PP', color: 'bg-[#FFF9E6] text-[#D97706]' }, { name: 'HDPE', color: 'bg-[#EDF7ED] text-[#0E8A43]' }],
        waste: '12.1%', wasteColor: 'text-[#d34545]',
        status: 'Suspended', statusColor: 'bg-[#FDE8E8] text-[#d34545]'
    }
]

export const CollectorList: React.FC = () => {
    return (
        <div className="space-y-8 w-full max-w-7xl mx-auto pb-12">
            {/* Header & Tabs */}
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
                <div className="pb-4">
                    <Link to="/collectors/new" className="bg-[#4285F4] text-white px-5 py-2.5 rounded-lg text-[14px] font-bold shadow-sm hover:bg-[#3367D6] transition-colors flex items-center gap-2">
                        + Add New Supplier
                    </Link>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#EBF3FC] flex items-center justify-center text-[#3B82F6]">
                            <Users className="w-5 h-5" />
                        </div>
                        <span className="bg-[#0E8A43] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">+4%</span>
                    </div>
                    <p className="text-[32px] font-bold text-slate-900 leading-none mb-1">142</p>
                    <p className="text-[13px] font-medium text-slate-500">Total Suppliers</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-[#EDF7ED] flex items-center justify-center text-[#0E8A43] mb-4">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <p className="text-[32px] font-bold text-slate-900 leading-none mb-1">128</p>
                    <p className="text-[13px] font-medium text-slate-500">Active Partners</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 mb-4">
                        <Package className="w-5 h-5" />
                    </div>
                    <p className="text-[32px] font-bold text-slate-900 leading-none mb-1">2.4k <span className="text-[14px] font-medium text-slate-500">tons</span></p>
                    <p className="text-[13px] font-medium text-slate-500">Inbound Volume (MT)</p>
                </div>

                <div className="bg-[#FAF9F5] rounded-2xl border border-[#FDE68A] p-6 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-[#FDE68A] flex items-center justify-center text-[#D97706] mb-4">
                        <Banknote className="w-5 h-5" />
                    </div>
                    <p className="text-[32px] font-bold text-slate-900 leading-none mb-1">₦1.24 <span className="text-[14px] font-medium text-slate-500">/ kg</span></p>
                    <p className="text-[13px] font-medium text-slate-500">Avg. Sourcing Price</p>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between bg-[#FDFDFD] p-3 rounded-xl border border-slate-100">
                <div className="flex-1 relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Search by name or phone..." className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-lg text-[14px] outline-none focus:ring-1 focus:ring-slate-200" />
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

            {/* Table */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Supplier</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Volume</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Yield</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Material</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Waste</th>
                                <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {tableData.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="font-bold text-[14px] text-slate-900 mb-0.5">{row.name}</div>
                                        <div className="text-[12px] text-slate-500 font-medium">{row.phone}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="font-bold text-[14px] text-slate-900">{row.vol}</div>
                                        <div className="flex items-center gap-0.5 mt-0.5">
                                            {row.volUp === true && <ArrowUpRight className="w-3 h-3 text-[#0E8A43]" />}
                                            {row.volUp === false && <ArrowDownRight className="w-3 h-3 text-[#d34545]" />}
                                            {row.volUp === null && <ArrowRight className="w-3 h-3 text-slate-400" />}
                                            <span className={`text-[11px] font-bold ${row.volUp === true ? 'text-[#0E8A43]' : row.volUp === false ? 'text-[#d34545]' : 'text-slate-400'}`}>
                                                {row.volChange}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="font-medium text-[13px] text-slate-700 mb-2">{row.yield}</div>
                                        <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${row.yieldColor}`} style={{ width: row.yield }} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex gap-1.5 flex-wrap">
                                            {row.materials.map(m => (
                                                <span key={m.name} className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-wider ${m.color}`}>
                                                    {m.name}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`text-[13px] font-medium ${row.wasteColor}`}>{row.waste}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-2.5 py-1 rounded-[4px] text-[12px] font-bold ${row.statusColor}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <Link to="/collectors/$collectorId" params={{ collectorId: String(i + 1) }} className="inline-flex p-1 hover:bg-slate-100 rounded text-slate-400">
                                            <MoreVertical className="w-5 h-5" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                <div className="px-6 py-4 flex items-center justify-between border-t border-slate-50 bg-[#FCFCFD]">
                    <span className="text-[12px] font-medium text-slate-500">Showing 1 to 4 of 24 collectors</span>
                    <div className="flex gap-1">
                        <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 text-[12px]">&lt;</button>
                        <button className="w-7 h-7 flex items-center justify-center rounded bg-[#4285F4] text-white font-bold text-[12px]">1</button>
                        <button className="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-slate-50 font-medium text-[12px]">2</button>
                        <button className="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-slate-50 font-medium text-[12px]">3</button>
                        <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 text-[12px]">&gt;</button>
                    </div>
                </div>
            </div>

            {/* Bottom Summary Cards */}
            <div className="flex flex-col lg:flex-row border border-slate-100 rounded-xl bg-white shadow-sm overflow-hidden">
                <div className="flex-1 p-6 border-l-[4px] border-l-[#4285F4] border-b lg:border-b-0 lg:border-r border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Top Performer</p>
                    <p className="text-[18px] font-bold text-slate-900 mb-1">Chidi Nwosu LTD</p>
                    <p className="text-[13px] font-bold text-[#4285F4]">1,840 Kg Collected</p>
                </div>
                <div className="flex-1 p-6 border-l-[4px] border-l-[#0E8A43] border-b lg:border-b-0 lg:border-r border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Best Quality</p>
                    <p className="text-[18px] font-bold text-slate-900 mb-1">Fatima Yusuf</p>
                    <p className="text-[13px] font-bold text-[#0E8A43]">6% Contamination</p>
                </div>
                <div className="flex-1 p-6 border-l-[4px] border-l-[#D97706] border-b lg:border-b-0 lg:border-r border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Avg. Payout</p>
                    <p className="text-[18px] font-bold text-slate-900 mb-1">₦152.00</p>
                    <p className="text-[13px] font-bold text-[#D97706]">Per Kilogram</p>
                </div>
                <div className="flex-1 p-6 border-l-[4px] border-l-[#d34545]">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Attention</p>
                    <p className="text-[18px] font-bold text-slate-900 mb-1">3 Quality Flags</p>
                    <p className="text-[13px] font-bold text-[#d34545] uppercase tracking-wider">Requires Review</p>
                </div>
            </div>
        </div>
    )
}

