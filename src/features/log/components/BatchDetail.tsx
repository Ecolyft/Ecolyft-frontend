import React, { useState } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Clock, MapPin, AlertCircle, TrendingDown, Package, Share2, Download, Scale, CheckCircle2 } from 'lucide-react'
import { Link, useParams } from '@tanstack/react-router'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const SUPPLIER_COLORS: Record<string, string> = {
    EG: 'bg-emerald-500',
    SV: 'bg-blue-400',
    ML: 'bg-amber-500',
    NP: 'bg-teal-500',
}

const INBOUND_BATCHES = [
    { id: 'INB-24-0091', initials: 'EG', supplier: 'EcoGrow Farms Ltd.',       date: 'Apr 10, 2024, 08:30', weight: '1,240.50 kg' },
    { id: 'INB-24-0104', initials: 'SV', supplier: 'SunValley Cooperatives',   date: 'Apr 11, 2024, 11:15', weight: '980.20 kg' },
    { id: 'INB-24-0112', initials: 'ML', supplier: 'Midwest Logistics Partners',date: 'Apr 11, 2024, 15:45', weight: '2,415.00 kg' },
    { id: 'INB-24-0128', initials: 'NP', supplier: 'NaturePack Systems',       date: 'Apr 12, 2024, 09:00', weight: '3,120.45 kg' },
]

function SourceInboundBatches() {
    const [expanded, setExpanded] = useState(false)
    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-slate-100">
                <h3 className="text-sm md:text-base font-bold text-slate-900">Source Inbound Batches</h3>
                <button className="text-slate-400 hover:text-slate-600">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[600px] md:min-w-0">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50">
                            {['Batch ID', 'Supplier', 'Inbound Date', 'Gross Weight'].map(h => (
                                <th key={h} className="px-6 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {INBOUND_BATCHES.map(b => (
                            <tr key={b.id} className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-[#3574c4] font-semibold text-sm">{b.id}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-7 h-7 rounded-full ${SUPPLIER_COLORS[b.initials] ?? 'bg-slate-400'} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                                            {b.initials}
                                        </div>
                                        <span className="text-slate-700 font-medium">{b.supplier}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{b.date}</td>
                                <td className="px-6 py-4 font-bold text-slate-800 whitespace-nowrap">{b.weight}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-4 text-center border-t border-slate-50">
                <button onClick={() => setExpanded((e: boolean) => !e)}
                    className="text-sm font-semibold text-[#3574c4] hover:underline">
                    {expanded ? 'Show less ∧' : 'View all 14 inbound batches ∨'}
                </button>
            </div>
        </div>
    )
}

export const BatchDetail: React.FC = () => {
    // Attempt to get the batchId from params
    const { batchId } = useParams({ from: '/batches/$batchId' })

    const upperId = batchId.toUpperCase()
    const isProductionLayout = upperId.startsWith('PROD-') || upperId.startsWith('PRO-')
    const isOutboundLayout = upperId.startsWith('GREENCYCLE-')

    if (isProductionLayout) {
        return (
            <div className="max-w-5xl mx-auto pb-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 mt-2 px-4 md:px-0">
                    <div>
                        <h1 className="text-[12px] md:text-[15px] font-bold text-[#3574c4]">Batch ID</h1>
                        <h2 className="text-xl md:text-[28px] leading-tight font-bold text-[#3574c4]">{batchId}</h2>
                    </div>
                    <button className="p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                    </button>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* Blue Card */}
                    <div className="bg-[#2D7BC8] text-white p-5 md:p-6 rounded-[10px] flex flex-col justify-between shadow-sm h-[140px] md:h-[150px]">
                        <div className="flex justify-between items-start">
                            <p className="text-[10px] md:text-[11px] font-bold text-white/80 uppercase tracking-widest mt-0.5">TOTAL INPUT WEIGHT</p>
                            <Scale className="w-6 h-6 md:w-8 md:h-8 text-white/40" strokeWidth={1.5} />
                        </div>
                        <div className="flex items-baseline gap-1.5 mt-auto">
                            <span className="text-3xl md:text-[44px] leading-none font-bold tracking-tight">12,450.80</span>
                            <span className="text-sm md:text-base font-medium text-white/80 mb-1">kg</span>
                        </div>
                    </div>

                    {/* Grey Card */}
                    <div className="bg-[#F8F7F4] border border-[#f0f0f0] p-5 md:p-6 rounded-[10px] shadow-sm flex flex-col justify-between h-[140px] md:h-[150px]">
                        <div className="flex flex-col h-full">
                            <p className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">INBOUND SOURCES</p>
                            <p className="text-3xl md:text-[38px] leading-none font-bold text-slate-800">14</p>
                            <div className="mt-auto border-t border-slate-200/80 pt-3">
                                <div className="flex justify-between text-[9px] md:text-[10px] font-bold text-slate-500 mb-1.5">
                                    <span>Capacity Utilization</span>
                                    <span>82%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-200/70 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#047857] w-[82%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Source Inbound Batches */}
                <SourceInboundBatches />
            </div>
        )
    }

    if (isOutboundLayout) {
        return (
            <div className="max-w-5xl mx-auto space-y-8 pb-12">
                {/* Breadcrumb */}
                <div className="flex items-center text-[10px] font-bold text-slate-400 tracking-widest uppercase space-x-2">
                    <Link to="/batches" className="hover:text-slate-600 transition-colors">OUTBOUND</Link>
                    <span>›</span>
                    <span>ARCHIVE</span>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold text-emerald-700">{batchId}</h1>
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approved</span>
                        </span>
                    </div>
                    <button className="bg-brand-blue text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-brand-blue/90 transition-colors">
                        Log New Sale
                    </button>
                </div>

                {/* Top Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Light Green Card */}
                    <div className="bg-[#a5f3bc] p-6 rounded-xl flex flex-col justify-center">
                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-3xl font-bold text-emerald-900">12,450</span>
                            <span className="text-emerald-800 font-medium">kg</span>
                        </div>
                        <p className="text-sm text-emerald-900/80 font-medium italic">Total Combined Weight</p>
                    </div>

                    {/* Blue Card */}
                    <div className="bg-brand-blue p-6 rounded-xl flex flex-col justify-center">
                        <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-2">MATERIAL TYPE</p>
                        <p className="text-lg font-bold text-white leading-tight mb-1">Premium Recycled PET</p>
                        <p className="text-white/80 font-medium">Clear-Blue</p>
                    </div>

                    {/* Chain of Custody */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 lg:row-span-2">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="w-6 h-6 rounded-full bg-emerald-700 flex items-center justify-center text-white">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm">Verified Chain of Custody</h3>
                        </div>

                        <div className="bg-white border border-slate-100 p-4 rounded-lg shadow-sm mb-6">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">BLOCKCHAIN TRACEABILITY HASH</p>
                            <p className="text-xs text-slate-600 font-mono break-all leading-relaxed">
                                0x72a9c1482e3f5b9d2e1c48e29a1<br/>c48e29a1c48e29a1c48e29a1c48e2<br/>9a1c48e2
                            </p>
                        </div>

                        <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-lg text-xs flex items-center justify-center space-x-2 transition-colors border border-slate-200">
                            <Share2 className="w-3.5 h-3.5" />
                            <span>SHARE TRACEABILITY</span>
                        </button>
                    </div>

                    {/* Transaction Details */}
                    <div className="bg-white border border-slate-100 rounded-xl p-6 lg:col-span-2 shadow-sm">
                        <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-4">
                            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">TRANSACTION DETAILS</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 md:gap-y-8">
                            <div>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">BUYER ENTITY</p>
                                <p className="text-sm font-medium text-slate-800">Global Polymers Ltd.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">MARKET PRICE</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-base md:text-lg font-bold text-brand-blue">₦18.40</span>
                                        <span className="text-[10px] text-slate-500">/kg</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">TOTAL SALE</p>
                                    <p className="text-base md:text-lg font-medium text-slate-800">₦229,080</p>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">CONFIRMATION DATE</p>
                                <p className="text-sm font-medium text-slate-800">April 11, 2024 • 14:30 GMT</p>
                            </div>
                        </div>
                    </div>

                    {/* Environmental Impact */}
                    <div className="bg-[#1f6b9e] text-white rounded-xl p-6 lg:col-span-2 shadow-sm">
                        <p className="text-[9px] font-bold text-white/70 uppercase tracking-wider mb-4">ENVIRONMENTAL IMPACT</p>
                        
                        <div className="flex flex-wrap items-baseline gap-2 mb-6">
                            <span className="text-3xl md:text-4xl font-bold">4.8</span>
                            <span className="text-[10px] md:text-xs font-bold text-white/90 uppercase tracking-wider">METRIC TONS CO2 SAVED</span>
                        </div>

                        <p className="text-xs text-white/80 leading-relaxed mb-8 max-w-sm">
                            This sale contributes significantly to carbon offset goals for Global Polymers Ltd.
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-400 w-[82%] rounded-full"></div>
                            </div>
                            <span className="text-[10px] font-bold text-white/90">82% Yearly Goal</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Legacy timeline view for other IDs
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12 px-2">
            <div className="flex items-center justify-end">
                <button className="flex items-center space-x-2 text-brand-blue font-bold text-sm hover:underline">
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Export Traceability Report</span>
                    <span className="sm:hidden">Export</span>
                </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
                <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2 md:gap-4">
                        <h1 className="text-2xl md:text-[40px] leading-none font-bold text-slate-900 tracking-tight">{batchId}</h1>
                        <span className="px-2.5 py-0.5 md:px-3.5 md:py-1 rounded-full bg-[#E5F5EC] text-[#037847] text-[9px] md:text-[10px] font-bold uppercase tracking-wider">Stored</span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-slate-500 font-medium">
                        <div className="flex items-center space-x-1.5">
                            <Clock className="w-4 h-4" />
                            <span>Created April 12, 2026 • 10:24 AM</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>Lagos North Facility</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lifecycle Timeline */}
            <div className="mt-12">
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-slate-100" />

                    <div className="space-y-12">
                        {/* Step 1: Inbound */}
                        <TimelineItem
                            icon={Package}
                            title="Inbound Logged"
                            date="Apr 12, 10:24 AM"
                            status="done"
                        >
                            <div className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Collector</span>
                                    <p className="text-sm md:text-[15px] font-bold text-slate-900">Sani Mohammed</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Weight</span>
                                    <p className="text-sm md:text-[15px] font-bold text-slate-900">450kg</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Material</span>
                                    <p className="text-sm md:text-[15px] font-bold text-slate-900">PET Bottles</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Price Paid</span>
                                    <p className="text-sm md:text-[15px] font-bold text-slate-900">₦125,000</p>
                                </div>
                            </div>
                        </TimelineItem>

                        {/* Step 2: Processing */}
                        <TimelineItem
                            icon={TrendingDown}
                            title="Processed (Sorting & Baling)"
                            date="Apr 12, 02:15 PM"
                            status="done"
                        >
                            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-5">
                                <div className="grid grid-cols-3 gap-6 border-b border-slate-100 pb-5">
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">High-Value</span>
                                        <p className="text-[15px] font-bold text-emerald-600">384kg (85%)</p>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Low-Value</span>
                                        <p className="text-[15px] font-bold text-amber-600">42kg (9%)</p>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Waste</span>
                                        <p className="text-[15px] font-bold text-slate-400">24kg (5%)</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 text-xs text-amber-600">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    <span className="font-medium italic">Contamination of 1.2% detected (below 5% threshold).</span>
                                </div>
                            </div>
                        </TimelineItem>

                        {/* Step 3: Outbound */}
                        <TimelineItem
                            icon={CheckCircle2}
                            title="Outbound (Ready for Sale)"
                            date="Awaiting Sale"
                            status="pending"
                        >
                            <div className="bg-[#f8fafc] border border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center space-y-4">
                                <p className="text-sm text-slate-500 font-medium">Batch is processed and stored in Baling Section A.</p>
                                <button className="bg-white border border-slate-200 px-6 py-2.5 rounded-lg text-sm font-bold text-brand-blue shadow-sm hover:bg-slate-50 transition-colors">
                                    Log Sale for this Batch
                                </button>
                            </div>
                        </TimelineItem>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TimelineItem({ icon: Icon, title, date, status, children }: any) {
    return (
        <div className="relative pl-16">
            <div className={cn(
                "absolute left-1 top-0 w-10 h-10 rounded-full flex items-center justify-center z-10",
                status === 'done' ? "bg-brand-blue text-white" : "bg-white border-2 border-slate-200 text-slate-300"
            )}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="space-y-4 pt-1">
                <div className="flex items-center justify-between min-h-[32px]">
                    <h3 className={cn("font-bold text-[19px]", status === 'done' ? "text-slate-900" : "text-slate-400")}>{title}</h3>
                    <span className="text-xs font-bold text-slate-400">{date}</span>
                </div>
                {children}
            </div>
        </div>
    )
}
