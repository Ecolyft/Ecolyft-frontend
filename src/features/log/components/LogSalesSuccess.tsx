import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { CheckCircle2, Share2 } from 'lucide-react'

export const LogSalesSuccess: React.FC = () => {
    const navigate = useNavigate()

    // Static data matching Figma — replace with real data from route state/store as needed
    const transactionId = 'GREENCYCLE-20250415-001'
    const totalWeight = '12,450'
    const materialType = 'Premium Recycled PET'
    const materialVariant = 'Clear-Blue'
    const buyer = 'Global Polymers Ltd.'
    const marketPrice = '₦18.40'
    const totalSale = '₦229,080'
    const confirmationDate = 'April 11, 2024 • 14:30 GMT'
    const blockchainHash = '0x72a9c1482e3f5b9d2e1c48e29a1c48e29a1c48e29a1c48e29a1c48e2'
    const co2Saved = '4.8'
    const yearlyGoalPct = 82

    return (
        <div className="w-full max-w-5xl">
            {/* Breadcrumb */}
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Outbound &rsaquo; Archive
            </p>

            {/* Heading row */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold text-[#1a3a5c]">{transactionId}</h1>
                <button
                    onClick={() => navigate({ to: '/log-sale' })}
                    className="bg-[#4A90E2] hover:bg-[#3a7fd2] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                >
                    Log New Sale
                </button>
            </div>

            {/* Approved badge */}
            <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approved
                </span>
            </div>

            {/* Top stat cards */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                {/* Weight card */}
                <div className="col-span-1 bg-emerald-100 rounded-xl p-5">
                    <p className="text-3xl font-black text-emerald-700">
                        {totalWeight} <span className="text-lg font-bold">kg</span>
                    </p>
                    <p className="text-sm font-medium text-emerald-600 mt-1 italic">Total Combined Weight</p>
                </div>

                {/* Material card */}
                <div className="col-span-1 bg-[#4A90E2] rounded-xl p-5">
                    <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1">Material Type</p>
                    <p className="text-xl font-bold text-white">{materialType}</p>
                    <p className="text-sm font-medium text-blue-100">{materialVariant}</p>
                </div>

                {/* Empty col to match 3-col layout with right sidebar */}
                <div className="col-span-1" />
            </div>

            {/* Main content + sidebar */}
            <div className="grid grid-cols-3 gap-4">
                {/* Transaction details */}
                <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-start justify-between mb-6">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Transaction Details</p>
                        {/* Handshake icon */}
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-slate-300">
                            <path d="M4 20l4-4 4 4 8-8 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <div className="mb-5">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Buyer Entity</p>
                        <p className="text-base font-semibold text-slate-800">{buyer}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-5">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Market Price</p>
                            <p className="text-base font-bold text-[#4A90E2]">
                                {marketPrice}<span className="text-xs font-semibold text-slate-400">/kg</span>
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Sale</p>
                            <p className="text-base font-semibold text-slate-800">{totalSale}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Confirmation Date</p>
                        <p className="text-sm font-medium text-slate-700">{confirmationDate}</p>
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="col-span-1 flex flex-col gap-4">
                    {/* Chain of Custody */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <p className="text-sm font-bold text-slate-800">Verified Chain of Custody</p>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-3 mb-4">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Blockchain Traceability Hash</p>
                            <p className="text-[11px] font-mono text-slate-600 break-all leading-relaxed">{blockchainHash}</p>
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 border border-slate-200 rounded-lg py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                            <Share2 className="w-3.5 h-3.5" />
                            Share Traceability
                        </button>
                    </div>

                    {/* Environmental Impact */}
                    <div className="bg-[#1a3a5c] rounded-xl p-5 text-white">
                        <p className="text-[9px] font-bold text-blue-300 uppercase tracking-widest mb-3">Environmental Impact</p>
                        <p className="text-3xl font-black mb-0.5">
                            {co2Saved} <span className="text-xs font-bold text-blue-200 uppercase tracking-wide">Metric Tons CO2 Saved</span>
                        </p>
                        <p className="text-xs text-blue-200 mt-3 mb-4 leading-relaxed">
                            This sale contributes significantly to carbon offset goals for {buyer}
                        </p>

                        {/* Progress bar */}
                        <div className="space-y-1">
                            <div className="w-full bg-blue-900/50 rounded-full h-2">
                                <div
                                    className="bg-emerald-400 h-2 rounded-full"
                                    style={{ width: `${yearlyGoalPct}%` }}
                                />
                            </div>
                            <p className="text-[10px] text-blue-300 text-right">{yearlyGoalPct}% Yearly Goal</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
