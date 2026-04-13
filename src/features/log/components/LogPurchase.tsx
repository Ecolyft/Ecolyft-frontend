import React, { useState } from 'react'
import { Camera, ChevronDown, Plus, AlertTriangle } from 'lucide-react'

export const LogPurchase: React.FC = () => {
    const [supplier, setSupplier] = useState('Chidi Nwosu')
    const [materialType, setMaterialType] = useState('PET Clear Bottles')
    const [weight, setWeight] = useState('450')
    const [price, setPrice] = useState('67,500')
    const [date, setDate] = useState('15 Jan 2026')

    return (
        <div className="flex flex-col xl:flex-row gap-6 w-full">
            {/* Form */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Log Purchase</h1>
                        <p className="text-sm text-slate-500">Record incoming material from a collector</p>
                    </div>
                    <span className="text-xs text-slate-400 mt-1">Draft auto-saved</span>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6 space-y-5">
                    {/* Supplier */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">Supplier</label>
                        <div className="relative">
                            <select
                                value={supplier}
                                onChange={e => setSupplier(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg appearance-none bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            >
                                <option>Chidi Nwosu</option>
                                <option>Sani Mohammed</option>
                                <option>Bello Garba</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Material type */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">Material type</label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <select
                                    value={materialType}
                                    onChange={e => setMaterialType(e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg appearance-none bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                >
                                    <option>PET Clear Bottles</option>
                                    <option>HDPE Caps</option>
                                    <option>PP</option>
                                    <option>LDPE Film</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                            <button
                                type="button"
                                className="w-11 h-11 border border-brand-blue rounded-lg flex items-center justify-center text-brand-blue hover:bg-blue-50 flex-shrink-0"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Weight + Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700">Gross weight (kg)</label>
                            <input
                                type="text"
                                value={weight}
                                onChange={e => setWeight(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700">Price (N)</label>
                            <input
                                type="text"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            />
                        </div>
                    </div>

                    {/* Date */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">Date</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-blue pointer-events-none">
                                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                    <path d="M16 2v4M8 2v4M3 10h18" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    {/* Photo */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">Photo (optional)</label>
                        <label className="flex items-center justify-center border border-dashed border-slate-300 rounded-lg py-6 cursor-pointer hover:bg-slate-50 transition-colors">
                            <Camera className="w-5 h-5 text-slate-400 mr-2" />
                            <span className="text-sm text-slate-400">Tap to upload photo</span>
                            <input type="file" className="hidden" />
                        </label>
                    </div>

                    {/* Price warning */}
                    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-amber-700">Price is 28% above average</p>
                            <p className="text-xs text-amber-600">
                                Avg for PET Clear from this collector: N120/kg. You're paying N150/kg.
                            </p>
                        </div>
                    </div>

                    <button className="w-full bg-brand-blue text-white font-semibold py-3.5 rounded-lg hover:bg-brand-blue/90 transition-all">
                        Generate Invoice
                    </button>
                </div>
            </div>

            {/* Stats sidebar — stacks below on mobile, side on xl */}
            <div className="xl:w-52 flex-shrink-0 grid grid-cols-2 xl:grid-cols-1 gap-3">
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                    <p className="text-xs font-bold text-green-700 uppercase mb-1">Today's In-Bound</p>
                    <p className="text-xl font-bold text-slate-800">62.2 KG</p>
                    <p className="text-xs text-slate-500">NGN 150,000</p>
                    <p className="text-xs text-slate-500">250/ kg</p>
                </div>
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                    <p className="text-xs font-bold text-orange-600 uppercase mb-1">Last 7 Days</p>
                    <p className="text-xl font-bold text-orange-500">2759 KG</p>
                    <p className="text-xs text-slate-500">5% higher to previous week</p>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <p className="text-xs font-bold text-blue-600 uppercase mb-1">Total Inbound</p>
                    <p className="text-xl font-bold text-blue-600">12,759 KG</p>
                    <p className="text-xs text-slate-500">NON 3,676,809.06</p>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                    <p className="text-xs font-bold text-red-600 uppercase mb-2">Unit Price Per KG</p>
                    <div className="space-y-0.5">
                        {['rPET 200/KG', 'HDPE 250/KG', 'PP 180/KG', 'METALS 300/KG'].map(l => (
                            <p key={l} className="text-xs font-semibold text-red-600">{l}</p>
                        ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
                        <span>🔥</span> 10% drop in rPET
                    </p>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                    <p className="text-xs font-bold text-red-600 uppercase mb-1">Pending Payments</p>
                    <p className="text-4xl font-bold text-red-500">5</p>
                </div>
                <button className="text-xs text-slate-500 hover:text-slate-700 text-right xl:col-span-1 col-span-2">
                    Download Report
                </button>
            </div>
        </div>
    )
}
