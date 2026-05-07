import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const plRows = [
    { color: 'bg-[#4285F4]', material: 'PET Clear', cost: '₦450,000', revenue: '₦780,000', profit: '₦330,000', margin: '42.3%', marginClass: 'bg-[#A8E6B8] text-[#0A5C2F]' },
    { color: 'bg-[#34A853]', material: 'HDPE Caps', cost: '₦210,000', revenue: '₦340,000', profit: '₦130,000', margin: '38.2%', marginClass: 'bg-[#0E8A43] text-white' },
    { color: 'bg-[#FBBC05]', material: 'PP', cost: '₦185,000', revenue: '₦260,000', profit: '₦75,000', margin: '28.8%', marginClass: 'bg-slate-100 text-slate-600' },
    { color: 'bg-[#A142F4]', material: 'LDPE Film', cost: '₦320,000', revenue: '₦410,000', profit: '₦90,000', margin: '22.0%', marginClass: 'bg-slate-100 text-slate-600' },
]

const suppliers = [
    { name: 'Uche Kenechukwu', sub: '1,240 kg collected', rank: '#1' },
    { name: 'Green Globe Alliance', sub: '1,105 kg collected', rank: '#2' },
    { name: 'Benson Oghenegare', sub: '980 kg collected', rank: '#3' },
]

export const MoneyScreen: React.FC = () => {
    return (
        <div className="w-full max-w-6xl mx-auto space-y-6">
            {/* KPI row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard label="INBOUND (30D)" value="8,720 kg" sub="+18% vs last month" />
                <KpiCard label="REVENUE" value="₦1,921,475" sub="+23% vs last month" />
                <KpiCard label="AVERAGE YIELD" value="87.3%" sub="+2.1% increase" />
                <KpiCard label="PENDING BATCHES" value="4" sub="Awaiting outbound" />
            </div>

            {/* Alert Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#FDFDFD] border-l-[6px] border-l-[#d34545] border-y border-r border-slate-100 rounded-r-xl shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#f8e5e5] flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-[#d34545]" />
                    </div>
                    <div>
                        <p className="text-[17px] font-bold text-slate-900">High contamination</p>
                        <p className="text-[13px] font-medium text-[#8a94a6]">Batch ECO-0115-0042 • 18% waste</p>
                    </div>
                </div>
                <div className="text-right mt-2 sm:mt-0">
                    <p className="text-[17px] font-bold text-[#d34545]">-₦4,200</p>
                    <p className="text-[10px] font-bold text-[#8a94a6] uppercase tracking-wider">OVERPAID</p>
                </div>
            </div>

            {/* Inbound Volume Chart */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-[22px] font-bold text-slate-900">Inbound Volume</h2>
                    <span className="text-[22px] font-bold text-[#0E8A43]">15D</span>
                </div>
                <div className="flex items-end justify-between h-48 px-2 md:px-8">
                    {[
                        { day: 'MON', h: '35%', type: 'light' },
                        { day: 'TUE', h: '35%', type: 'light' },
                        { day: 'WED', h: '60%', type: 'light' },
                        { day: 'THU', h: '90%', type: 'dark' },
                        { day: 'FRI', h: '90%', type: 'dark' },
                        { day: 'SAT', h: '55%', type: 'light' },
                        { day: 'SUN', h: '25%', type: 'light' },
                    ].map((b, i) => (
                        <div key={i} className="flex flex-col items-center w-12 md:w-16 h-full justify-end">
                            <div 
                                className={`w-full rounded-t-sm transition-all duration-500 ${b.type === 'dark' ? 'bg-[#A3C7B2]' : 'bg-[#E2EEE6]'}`}
                                style={{ height: b.h }}
                            />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-4">{b.day}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* P&L Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 flex items-center justify-between border-b border-slate-50">
                    <h2 className="text-[20px] font-bold text-slate-900">Profit & Loss by Material</h2>
                    <div className="flex gap-3">
                        <button className="text-[13px] font-bold px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">Export CSV</button>
                        <Link to="/reports" className="text-[13px] font-bold px-4 py-2 bg-[#1264a3] text-white rounded-lg hover:bg-[#0e5185] transition-colors block text-center">Detailed Report</Link>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead>
                            <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                <th className="px-8 py-4">Material</th>
                                <th className="px-8 py-4">Cost</th>
                                <th className="px-8 py-4">Revenue</th>
                                <th className="px-8 py-4">Profit</th>
                                <th className="px-8 py-4">Margin</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {plRows.map(row => (
                                <tr key={row.material}>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${row.color}`} />
                                            <span className="text-[15px] font-bold text-slate-900">{row.material}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-[14px] font-medium text-slate-500">{row.cost}</td>
                                    <td className="px-8 py-5 text-[14px] font-medium text-slate-500">{row.revenue}</td>
                                    <td className="px-8 py-5 text-[15px] font-bold text-slate-900">{row.profit}</td>
                                    <td className="px-8 py-5">
                                        <span className={`px-2.5 py-1 rounded-[4px] text-[12px] font-bold ${row.marginClass}`}>
                                            {row.margin}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Top Suppliers & Major Buyers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-[18px] font-bold text-slate-900 mb-6">Top Suppliers</h3>
                    <div className="space-y-6">
                        {suppliers.map(s => (
                            <div key={s.name} className="flex items-center justify-between">
                                <div>
                                    <p className="text-[14px] font-bold text-slate-900">{s.name}</p>
                                    <p className="text-[12px] font-medium text-[#3B82F6]">{s.sub}</p>
                                </div>
                                <span className="text-[14px] font-bold text-[#0E8A43]">{s.rank}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-[18px] font-bold text-slate-900 mb-6">Major Buyers</h3>
                    <div className="space-y-6">
                        {suppliers.map(s => (
                            <div key={s.name} className="flex items-center justify-between">
                                <div>
                                    <p className="text-[14px] font-bold text-slate-900">{s.name}</p>
                                    <p className="text-[12px] font-medium text-[#3B82F6]">{s.sub}</p>
                                </div>
                                <span className="text-[14px] font-bold text-[#0E8A43]">{s.rank}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sustainable Impact */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mt-12 mb-8 px-4">
                <div>
                    <h2 className="text-[32px] font-bold text-[#0E8A43] mb-1">Verified Sustainable Impact</h2>
                    <p className="text-[15px] font-bold text-slate-600">January 2026 - April 2026</p>
                </div>
                <div className="flex flex-wrap gap-12">
                    <div className="flex flex-col items-center">
                        <p className="text-[44px] leading-none font-bold text-[#0E8A43] tracking-tight mb-2">8,720kg</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Plastic Diverted</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-[44px] leading-none font-bold text-[#1264a3] tracking-tight mb-2">8.7t</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Plastic Credit</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-[44px] leading-none font-bold text-[#1264a3] tracking-tight mb-2">12.4t</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">CO2 Offset</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function KpiCard({ label, value, sub }: { label: string; value: string; sub: string }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <p className="text-[11px] font-bold text-[#8a94a6] uppercase tracking-widest mb-3">{label}</p>
            <p className="text-[32px] leading-none font-bold text-slate-900 mb-2">{value}</p>
            <p className="text-[11px] font-medium text-[#8a94a6]">{sub}</p>
        </div>
    )
}
