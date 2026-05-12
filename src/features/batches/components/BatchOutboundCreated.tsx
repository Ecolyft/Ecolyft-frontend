import React from 'react'
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, FileText, ExternalLink } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const BatchOutboundCreated: React.FC = () => {
    return (
        <div className="space-y-6 w-full max-w-5xl mx-auto pb-12">
            {/* Success Header */}
            <div className="bg-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg shadow-emerald-200">
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rotate-45 transform origin-top-right"></div>
                <div className="relative z-10 flex items-center justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-black tracking-tight">Outbound Batch Created</h1>
                        </div>
                        <p className="text-emerald-100 font-medium">Batch GREENCYCLE-20260411-B07 is now ready for sale.</p>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">Status</p>
                        <p className="text-xl font-bold">READY FOR DISPATCH</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Traceability & Compliance */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                        <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            Compliance & Traceability
                        </h2>

                        <div className="space-y-6">
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Blockchain Verification Hash</p>
                                <div className="flex items-center justify-between gap-4">
                                    <code className="text-xs text-slate-600 font-mono break-all leading-relaxed">
                                        0x72a9c1482e3f5b9d2e1c48e29a1c48e29a1c48e29a1c48e29a1c48e2
                                    </code>
                                    <button className="p-2 text-brand-blue hover:bg-blue-50 rounded-lg transition-colors">
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <ComplianceCard label="Carbon Credits" value="4.8 MT" status="verified" />
                                <ComplianceCard label="Yield Certificate" value="Issued" status="verified" />
                            </div>
                        </div>
                    </div>

                    {/* Logistics Prep */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                        <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                            <Truck className="w-4 h-4 text-brand-blue" />
                            Logistics Preparation
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <LogisticsItem label="Packaging" value="1.2m x 1.2m Bales" />
                                <LogisticsItem label="Storage Loc." value="Section B-04 (Loading Bay)" />
                                <LogisticsItem label="Total Units" value="25 Bales" />
                            </div>
                            <div className="bg-blue-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3">
                                <FileText className="w-8 h-8 text-brand-blue" />
                                <p className="text-sm font-bold text-slate-900">Waybill Ready</p>
                                <button className="text-xs font-bold text-brand-blue hover:underline">Download Documentation</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Summary Sidebar */}
                    <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
                        <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6">Inventory Summary</h3>
                        <div className="space-y-4">
                            <SummaryItem label="Net Weight" value="12,450 kg" />
                            <SummaryItem label="Material" value="PET Flakes (Clear)" />
                            <SummaryItem label="Est. Market Value" value="₦2.4M" />
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <Link 
                                to="/log-sale"
                                className="w-full bg-white text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 transition-all"
                            >
                                Log Sale Now
                                <ArrowLeft className="w-4 h-4 rotate-180" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ComplianceCard({ label, value }: any) {
    return (
        <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-center justify-between">
            <div>
                <p className="text-[10px] font-bold text-emerald-700/60 uppercase mb-0.5">{label}</p>
                <p className="text-sm font-bold text-emerald-800">{value}</p>
            </div>
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                <ShieldCheck className="w-3.5 h-3.5" />
            </div>
        </div>
    )
}

function LogisticsItem({ label, value }: any) {
    return (
        <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-sm font-bold text-slate-900">{value}</p>
        </div>
    )
}

function SummaryItem({ label, value }: any) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-white/50">{label}</span>
            <span className="text-sm font-bold">{value}</span>
        </div>
    )
}
