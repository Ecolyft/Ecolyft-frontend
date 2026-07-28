import React, { useEffect, useState } from 'react'
import { 
    AlertTriangle, 
    Plus, 
    ClipboardList, 
    Zap,
    Clock,
    Tag,
    Recycle,
    CheckCircle2
} from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { analyticsApi, organisationsApi } from '../../../lib/api'
import type { FacilityWallet } from '../../../lib/types'

const plRows = [
    { color: 'bg-[#4285F4]', material: 'PET Clear', cost: '₦450,000', revenue: '₦780,000', profit: '₦330,000', margin: '42.3%', marginClass: 'bg-[#EBF5FF] text-[#4285F4]' },
    { color: 'bg-[#34A853]', material: 'HDPE Caps', cost: '₦210,000', revenue: '₦340,000', profit: '₦130,000', margin: '38.2%', marginClass: 'bg-[#E6F4EA] text-[#34A853]' },
    { color: 'bg-[#FBBC05]', material: 'PP', cost: '₦185,000', revenue: '₦260,000', profit: '₦75,000', margin: '28.8%', marginClass: 'bg-slate-100 text-slate-600' },
    { color: 'bg-[#A142F4]', material: 'LDPE Film', cost: '₦320,000', revenue: '₦410,000', profit: '₦90,000', margin: '22.0%', marginClass: 'bg-slate-100 text-slate-600' },
]

const risks = [
    { 
        icon: AlertTriangle, 
        iconColor: 'text-[#FBBC05]', 
        bgColor: 'bg-[#FFF9E6]',
        title: 'High contamination', 
        sub: 'Batch ECO-0115-0042 • 18% waste', 
        amount: '-₦4,200', 
        status: 'OVERPAID' 
    },
    { 
        icon: Tag, 
        iconColor: 'text-[#FBBC05]', 
        bgColor: 'bg-[#FFF9E6]',
        title: 'Price anomaly', 
        sub: 'Collector: Emeka • PET 22% above avg', 
        amount: '-₦8,100', 
        status: 'AT RISK' 
    },
    { 
        icon: Clock, 
        iconColor: 'text-[#4285F4]', 
        bgColor: 'bg-[#EBF5FF]',
        title: 'Unsold batch', 
        sub: 'Batch ECO-0108-0021 • 7 days idle', 
        amount: '₦12,000', 
        status: 'TIED UP' 
    },
    { 
        icon: Recycle, 
        iconColor: 'text-[#d34545]', 
        bgColor: 'bg-[#FDF2F2]',
        title: 'Re-purpose Materials', 
        sub: 'Caps and Labels • 500kg ready side', 
        amount: '₦108,000', 
        status: 'TIED UP' 
    },
]

const suppliers = [
    { name: 'Lagos Green Recyclers', cat: 'PET Clear & Blue', vol: '3,200kg', rating: '98% Quality Rating', rank: '01' },
    { name: 'Eco-Harvest Hub', cat: 'Mixed Plastics', vol: '2,450kg', rating: '94% Quality Rating', rank: '02' },
    { name: 'Eco-Harvest Hub', cat: 'Mixed Plastics', vol: '2,450kg', rating: '94% Quality Rating', rank: '03' },
]

const buyers = [
    { name: 'Poly-Nexus Manufacturing', cat: 'Fiber Processor', vol: '₦850,000', rating: 'Premium Tier Buyer', rank: '01' },
    { name: 'Sustainable Solutions Inc.', cat: 'Export Partner', vol: '₦540,500', rating: 'Growth Partner', rank: '02' },
    { name: 'Sustainable Solutions Inc.', cat: 'Export Partner', vol: '₦540,500', rating: 'Growth Partner', rank: '03' },
]

export const MoneyScreen: React.FC = () => {
    const navigate = useNavigate()
    const [stockOnHand, setStockOnHand] = useState<number | null>(null)
    const [todaysMargin, setTodaysMargin] = useState<number | null>(null)
    const [wallet, setWallet] = useState<FacilityWallet | null>(null)

    useEffect(() => {
        analyticsApi.getDashboard()
            .then(res => {
                setStockOnHand(res.dashboard.stockOnHand)
                setTodaysMargin(res.dashboard.todaysMargin)
            })
            .catch(() => {
                // Keep rich dashboard mock sections when analytics is empty or unavailable
            })

        organisationsApi.getCurrent()
            .then(res => setWallet(res.wallet))
            .catch(() => {})
    }, [])

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6 pb-12">
            {/* Header Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 mb-2">
                <button
                    onClick={() => navigate({ to: '/log-purchase' })}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                >
                    <Plus className="w-4 h-4 text-brand-blue" />
                    Log Purchase
                </button>
                <button
                    onClick={() => navigate({ to: '/log-processing' })}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                >
                    <ClipboardList className="w-4 h-4 text-brand-blue" />
                    Log Processing
                </button>
                <button
                    onClick={() => navigate({ to: '/log-sale' })}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-lg text-[13px] font-bold hover:bg-brand-blue/90 transition-all shadow-sm shadow-brand-blue/20"
                >
                    <Zap className="w-4 h-4" />
                    Log Sale
                </button>
            </div>

            {wallet && (
                <div className="rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-50 to-white p-5 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-teal-700 mb-1">
                            Facility wallet {wallet.provisioningStatus === 'MOCK' ? '(demo)' : ''}
                        </p>
                        <p className="text-sm text-slate-600">
                            {wallet.accountName || 'EcoLyft facility account'}
                            {wallet.accountNumber ? ` • ${wallet.accountNumber}` : ''}
                            {wallet.bankName ? ` • ${wallet.bankName}` : ''}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Balance</p>
                        <p className="text-2xl font-black text-brand-blue">₦{Math.round(wallet.balance).toLocaleString()}</p>
                    </div>
                </div>
            )}

            {/* KPI row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard
                    label="STOCK ON HAND"
                    value={stockOnHand !== null ? `${stockOnHand.toLocaleString()} kg` : '—'}
                    sub="Live from operations ledger"
                    subColor="text-emerald-500"
                />
                <KpiCard label="AVERAGE YIELD" value="87.3%" sub="+2.1% increase" subColor="text-emerald-500" />
                <KpiCard label="OUTBOUND (30D)" value="6,450 kg" sub="-18% vs last month" subColor="text-rose-500" />
                <KpiCard
                    label="TODAY'S MARGIN"
                    value={todaysMargin !== null ? `₦${Math.round(todaysMargin).toLocaleString()}` : '—'}
                    sub="Live from operations ledger"
                    subColor={todaysMargin !== null && todaysMargin >= 0 ? 'text-emerald-500' : 'text-rose-500'}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Money Leaks & Risks */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[16px] font-bold text-slate-900">Money Leaks & Risks</h2>
                        <button className="text-[11px] font-bold text-brand-blue hover:underline">View All Risks</button>
                    </div>
                    <div className="space-y-3">
                        {risks.map((r, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:border-slate-100 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-lg ${r.bgColor} flex items-center justify-center flex-shrink-0`}>
                                        <r.icon className={`w-5 h-5 ${r.iconColor}`} />
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-bold text-slate-900">{r.title}</p>
                                        <p className="text-[11px] font-medium text-slate-400">{r.sub}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-[14px] font-bold ${r.amount.startsWith('-') ? 'text-[#d34545]' : 'text-brand-blue'}`}>{r.amount}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{r.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Targets */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-8">
                    <TargetItem label="Procurement Target" value="7000" total="1000000" unit="kg" />
                    <TargetItem label="Production Target" value="7980" total="1000000" unit="kg" />
                    <TargetItem label="Sales Target" value="73540" total="1000000" unit="kg" />
                </div>
            </div>

            {/* Profit Trend Chart */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-[18px] font-bold text-slate-900">Profit Trend</h2>
                        <p className="text-[11px] font-medium text-slate-400">Average for range (last 180 days)</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-brand-blue" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">VOLUME (KG)</span>
                    </div>
                </div>
                <div className="flex items-end justify-between h-64 px-2 md:px-4">
                    {[
                        { h: '35%', type: 'prev' },
                        { h: '45%', type: 'prev' },
                        { h: '55%', type: 'prev' },
                        { h: '65%', type: 'prev' },
                        { h: '40%', type: 'prev' },
                        { h: '85%', type: 'curr' },
                        { h: '55%', type: 'prev' },
                        { h: '50%', type: 'prev' },
                        { h: '70%', type: 'prev' },
                        { h: '45%', type: 'prev' },
                        { h: '75%', type: 'prev' },
                        { h: '60%', type: 'prev' },
                        { h: '90%', type: 'curr' },
                    ].map((b, i) => (
                        <div key={i} className="flex flex-col items-center w-8 md:w-12 h-full justify-end">
                            <div 
                                className={`w-full rounded-sm transition-all duration-500 ${b.type === 'curr' ? 'bg-brand-blue' : 'bg-slate-100'}`}
                                style={{ height: b.h }}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-4 px-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Day 1</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Day 8</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Day 15</span>
                </div>
            </div>

            {/* P&L Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 flex items-center justify-between border-b border-slate-50">
                    <h2 className="text-[18px] font-bold text-slate-900">Profit & Loss by Material</h2>
                    <div className="flex gap-3">
                        <button className="text-[11px] font-bold px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">Export CSV</button>
                        <Link to="/reports" className="text-[11px] font-bold px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors block text-center shadow-sm shadow-brand-blue/10">Detailed Report</Link>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead>
                            <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                <th className="px-8 py-4">Material</th>
                                <th className="px-8 py-4">Cost</th>
                                <th className="px-8 py-4">Revenue</th>
                                <th className="px-8 py-4">Profit</th>
                                <th className="px-8 py-4">Margin</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {plRows.map(row => (
                                <tr key={row.material} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${row.color}`} />
                                            <span className="text-[14px] font-bold text-slate-900">{row.material}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-[13px] font-medium text-slate-500">{row.cost}</td>
                                    <td className="px-8 py-4 text-[13px] font-medium text-slate-500">{row.revenue}</td>
                                    <td className="px-8 py-4 text-[14px] font-bold text-slate-900">{row.profit}</td>
                                    <td className="px-8 py-4">
                                        <span className={`px-2.5 py-1 rounded-[4px] text-[11px] font-bold ${row.marginClass}`}>
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
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[16px] font-bold text-slate-900">Top Suppliers (30D)</h3>
                        <button className="text-[11px] font-bold text-brand-blue hover:underline">Full Leaderboard</button>
                    </div>
                    <div className="space-y-6">
                        {suppliers.map(s => (
                            <div key={s.rank} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-[16px] font-bold text-slate-300 italic">{s.rank}</span>
                                    <div>
                                        <p className="text-[13px] font-bold text-slate-900">{s.name}</p>
                                        <p className="text-[11px] font-medium text-slate-400">{s.cat}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[13px] font-bold text-slate-900">{s.vol}</p>
                                    <p className="text-[10px] font-bold text-emerald-500">{s.rating}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[16px] font-bold text-slate-900">Major Buyers (30D)</h3>
                        <button className="text-[11px] font-bold text-brand-blue hover:underline">Full Sales Report</button>
                    </div>
                    <div className="space-y-6">
                        {buyers.map(b => (
                            <div key={b.rank} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-[16px] font-bold text-slate-300 italic">{b.rank}</span>
                                    <div>
                                        <p className="text-[13px] font-bold text-slate-900">{b.name}</p>
                                        <p className="text-[11px] font-medium text-slate-400">{b.cat}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[13px] font-bold text-slate-900">{b.vol}</p>
                                    <p className="text-[10px] font-bold text-brand-blue">{b.rating}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sustainable Impact */}
            <div className="bg-[#f8fafc] rounded-2xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 mt-6">
                <div>
                    <h2 className="text-[28px] font-bold text-[#0E8A43] mb-1 flex items-center gap-3">
                        <CheckCircle2 className="w-8 h-8" />
                        Verified Sustainable Impact
                    </h2>
                    <p className="text-[14px] font-bold text-slate-500">January 2026 - April 2026</p>
                </div>
                <div className="flex flex-wrap gap-8 lg:gap-16">
                    <div className="text-center">
                        <p className="text-[36px] leading-none font-bold text-[#0E8A43] mb-2 tracking-tight">8,720kg</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Plastic Diverted</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[36px] leading-none font-bold text-brand-blue mb-2 tracking-tight">8.7t</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Plastic Credit</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[36px] leading-none font-bold text-brand-blue mb-2 tracking-tight">12.4t</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">CO2 Offset</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function KpiCard({ label, value, sub, subColor }: { label: string; value: string; sub: string; subColor: string }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{label}</p>
            <p className="text-[28px] leading-none font-bold text-slate-900 mb-2">{value}</p>
            <p className={`text-[11px] font-bold ${subColor}`}>{sub}</p>
        </div>
    )
}

function TargetItem({ label, value, total, unit }: { label: string; value: string; total: string; unit: string }) {
    const percentage = (parseInt(value) / parseInt(total)) * 100
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-[13px] font-bold text-slate-900">{label}</h3>
                <span className="text-[9px] font-bold text-slate-400 uppercase">DAILY</span>
            </div>
            <div className="relative">
                <p className="text-[18px] font-bold text-brand-blue mb-1">
                    {value} <span className="text-slate-300 font-medium">/{total}{unit}</span>
                </p>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-brand-blue rounded-full transition-all duration-1000" 
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        </div>
    )
}
