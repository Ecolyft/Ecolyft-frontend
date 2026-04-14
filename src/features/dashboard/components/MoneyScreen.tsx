import React from 'react'
import { AlertTriangle, DollarSign, Clock, Recycle, ArrowDownToLine, ArrowUpFromLine, RefreshCw } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const riskItems = [
    {
        icon: AlertTriangle,
        iconBg: 'bg-red-100',
        iconColor: 'text-red-500',
        borderColor: 'border-l-red-500',
        title: 'High contamination',
        desc: 'Batch ECO-8115-0842 • 18% waste',
        amount: '-₦4,200',
        amountLabel: 'OVERPAID',
        amountColor: 'text-red-500',
    },
    {
        icon: DollarSign,
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600',
        borderColor: 'border-l-yellow-500',
        title: 'Price anomaly',
        desc: 'Collector Emeka • PET 32% above avg',
        amount: '-₦8,100',
        amountLabel: 'AT RISK',
        amountColor: 'text-yellow-600',
    },
    {
        icon: Clock,
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-500',
        borderColor: 'border-l-orange-400',
        title: 'Unsold batch',
        desc: 'Batch ECO-8198-0831 • 7 days idle',
        amount: '₦12,000',
        amountLabel: 'TIED UP',
        amountColor: 'text-orange-500',
    },
    {
        icon: Recycle,
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-500',
        borderColor: 'border-l-orange-400',
        title: 'Re-purpose Materials',
        desc: 'Caps and Labels • 300kg 180 days idle',
        amount: '₦108,000',
        amountLabel: 'TIED UP',
        amountColor: 'text-orange-500',
    },
]

const plRows = [
    { color: 'bg-blue-500', material: 'PET Clear', cost: '₦450,000', revenue: '₦780,000', profit: '₦330,000', margin: '42.3%', marginGood: true },
    { color: 'bg-emerald-500', material: 'HDPE Caps', cost: '₦210,000', revenue: '₦340,000', profit: '₦130,000', margin: '38.2%', marginGood: true },
    { color: 'bg-yellow-400', material: 'PP', cost: '₦185,000', revenue: '₦260,000', profit: '₦75,000', margin: '28.8%', marginGood: false },
    { color: 'bg-purple-400', material: 'LDPE Film', cost: '₦320,000', revenue: '₦410,000', profit: '₦90,000', margin: '22.0%', marginGood: false },
]

export const MoneyScreen: React.FC = () => {
    return (
        <div className="space-y-5 w-full">
            {/* Quick actions */}
            <div className="flex flex-wrap gap-2 justify-end">
                <Link
                    to="/log-purchase"
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                    <ArrowDownToLine className="w-4 h-4 text-brand-blue" />
                    Log Purchase
                </Link>
                <Link
                    to="/log-processing"
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                    <RefreshCw className="w-4 h-4 text-brand-blue" />
                    Log Processing
                </Link>
                <Link
                    to="/log-sale"
                    className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-lg text-sm font-medium hover:bg-brand-blue/90 transition-colors"
                >
                    <ArrowUpFromLine className="w-4 h-4" />
                    Log Sale
                </Link>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <KpiCard label="TODAY'S MARGIN" value="₦124,500" sub="vs yesterday" />
                <KpiCard label="STOCK ON HAND" value="2,340 kg" sub="Across 14 batches" />
                <KpiCard label="INBOUND (30D)" value="8,720 kg" sub="₦1.2M spent" />
                <KpiCard label="OUTBOUND (30D)" value="6,450 kg" sub="₦1.6M revenue" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Money Leaks */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-slate-800">Money Leaks & Risks</h2>
                        <Link to="/alerts" className="text-sm text-brand-blue hover:underline">View All Risks</Link>
                    </div>
                    <div className="space-y-3">
                        {riskItems.map((item, i) => (
                            <div key={i} className={`flex items-center gap-3 p-3 bg-slate-50 rounded-lg border-l-4 ${item.borderColor}`}>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.iconBg}`}>
                                    <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                                    <p className="text-xs text-slate-500 truncate">{item.desc}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className={`text-sm font-bold ${item.amountColor}`}>{item.amount}</p>
                                    <p className="text-[10px] text-slate-400 font-semibold">{item.amountLabel}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right column */}
                <div className="space-y-4">
                    {/* Production Target */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-slate-800 text-sm">Production Target</h3>
                            <span className="text-xs text-slate-500">Daily</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-1">Daily Bales</p>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-brand-blue">7/10</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-brand-blue rounded-full" style={{ width: '70%' }} />
                        </div>
                        <p className="text-xs text-slate-500">3 more bales to reach daily target</p>
                    </div>

                    {/* Top Suppliers */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-slate-800 text-sm">Top Suppliers (30d)</h3>
                            <Link to="/collectors" className="text-xs text-brand-blue hover:underline">View all</Link>
                        </div>
                        <div className="space-y-3">
                            {[
                                { name: 'Uche Kenechukwu', sub: '1,240 kg collected', rank: '#1' },
                                { name: 'Green Globe Alliance', sub: '1,105 kg collected', rank: '#2' },
                                { name: 'Benson Oghenegare', sub: '980 kg collected', rank: '#3' },
                            ].map(s => (
                                <div key={s.name} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">{s.name}</p>
                                        <p className="text-xs text-slate-500">{s.sub}</p>
                                    </div>
                                    <span className="text-xs font-bold text-brand-blue">{s.rank}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* P&L Table */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 overflow-x-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-slate-800">Profit & Loss by Material</h2>
                    <div className="flex gap-2">
                        <button className="text-sm px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">Export CSV</button>
                        <Link to="/reports" className="text-sm px-3 py-1.5 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90">Detailed Report</Link>
                    </div>
                </div>
                <table className="w-full text-sm min-w-[480px]">
                    <thead>
                        <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-100">
                            <th className="text-left pb-2">Material</th>
                            <th className="text-left pb-2">Cost</th>
                            <th className="text-left pb-2">Revenue</th>
                            <th className="text-left pb-2">Profit</th>
                            <th className="text-left pb-2">Margin</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {plRows.map(row => (
                            <tr key={row.material}>
                                <td className="py-3">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${row.color}`} />
                                        {row.material}
                                    </div>
                                </td>
                                <td className="py-3 text-slate-600">{row.cost}</td>
                                <td className="py-3 text-slate-600">{row.revenue}</td>
                                <td className="py-3 font-semibold text-slate-800">{row.profit}</td>
                                <td className="py-3">
                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${row.marginGood ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600'}`}>
                                        {row.margin}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Sustainable Impact */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-5">
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-emerald-600 mb-1">Sustainable Impact</h2>
                    <p className="text-sm text-slate-500">Your collection operations this month have prevented significant plastic waste from reaching landfills.</p>
                </div>
                <div className="flex gap-6 md:gap-8 flex-wrap">
                    <div className="text-center">
                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Plastic Diverted</p>
                        <p className="text-2xl font-bold text-slate-800">8,720kg</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Plastic Credit</p>
                        <p className="text-2xl font-bold text-slate-800">8.7t</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">CO2 Offset</p>
                        <p className="text-2xl font-bold text-slate-800">12.4t</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function KpiCard({ label, value, sub }: { label: string; value: string; sub: string }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</p>
            <p className="text-lg md:text-xl font-bold text-slate-800">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
        </div>
    )
}
