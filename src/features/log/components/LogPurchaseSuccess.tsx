import React from 'react'
import { Check, Printer, FileText, Lock, ShieldCheck, Image, Camera } from 'lucide-react'
import { useSearch } from '@tanstack/react-router'

export const LogPurchaseSuccess: React.FC = () => {
    const search = useSearch({ from: '/log-purchase/success' })

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 font-sans">
            <div className="flex items-center gap-3 bg-[#E8F5E9] border border-emerald-100 rounded-xl p-4 shadow-sm">
                <div className="bg-emerald-500 text-white rounded-full p-1 flex-shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-extrabold text-emerald-800 tracking-wider">
                        Purchase Recorded Successfully
                    </span>
                    <span className="text-xs text-emerald-600 font-semibold">
                        Batch {search.batchNumber} has been created and linked to this purchase.
                    </span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black text-slate-800 font-display">Inbound Invoice</h1>
                    <p className="text-xs font-bold text-slate-400">{search.batchNumber}</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer">
                        <Printer className="w-4 h-4" />
                        Print Invoice
                    </button>
                    <button className="flex items-center gap-2 bg-[#0256B2] hover:bg-[#014188] text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md shadow-blue-500/10 transition-all cursor-pointer">
                        <FileText className="w-4 h-4" />
                        Download PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-1 lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
                            <div className="space-y-1.5">
                                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">BATCH</span>
                                <h2 className="text-base font-extrabold text-slate-800">{search.batchNumber}</h2>
                                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                                    Batch ID: {search.batchId}
                                </p>
                            </div>

                            <div className="space-y-1.5">
                                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">SUPPLIER DETAILS</span>
                                <h2 className="text-base font-extrabold text-[#0256B2]">{search.collectorName}</h2>
                                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                                    Material: {search.materialType}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-4">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Weight</p>
                                <p className="text-lg font-black text-slate-800">{search.weight} kg</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Material</p>
                                <p className="text-lg font-black text-slate-800">{search.materialType}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total</p>
                                <p className="text-lg font-black text-[#0256B2]">₦{Number(search.amount).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0256B2] flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-sm font-extrabold text-slate-800">Batch Created</h3>
                                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">
                                    Traceability Active
                                </p>
                            </div>
                        </div>
                        <div className="bg-[#F8FAFC] border border-slate-150 rounded-xl p-3">
                            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">STATUS</p>
                            <p className="text-xs font-semibold text-emerald-600">INBOUND</p>
                        </div>
                    </div>

                    <div className="bg-[#EFF6FF] border border-blue-100 rounded-2xl p-5 text-center space-y-3">
                        <Lock className="w-8 h-8 text-[#0256B2] mx-auto" />
                        <p className="text-xs font-bold text-[#0256B2]">Purchase saved to your EcoLyft ledger</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                            <Image className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-700">Photo attachment</p>
                            <p className="text-xs text-slate-400 flex items-center gap-1"><Camera className="w-3 h-3" /> Coming soon</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
