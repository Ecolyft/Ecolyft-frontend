import React, { useState } from 'react'
import { Camera, ChevronDown, Plus, AlertTriangle, Calendar } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

export const LogPurchase: React.FC = () => {
    const navigate = useNavigate()
    const [supplier, setSupplier] = useState('Chidi Nwosu')
    const [materialType, setMaterialType] = useState('PET Clear Bottles')
    const [grossWeight, setGrossWeight] = useState('450')
    const [unitPrice, setUnitPrice] = useState('300')
    const [netWeight, setNetWeight] = useState('375')
    const [sumPrice, setSumPrice] = useState('112,500')
    const [date, setDate] = useState('15 Jan 2026')

    const handleNetWeightChange = (val: string) => {
        setNetWeight(val)
        const nw = parseFloat(val.replace(/,/g, '')) || 0
        const up = parseFloat(unitPrice.replace(/,/g, '')) || 0
        const sum = nw * up
        setSumPrice(sum ? sum.toLocaleString('en-US') : '0')
    }

    const handleUnitPriceChange = (val: string) => {
        setUnitPrice(val)
        const nw = parseFloat(netWeight.replace(/,/g, '')) || 0
        const up = parseFloat(val.replace(/,/g, '')) || 0
        const sum = nw * up
        setSumPrice(sum ? sum.toLocaleString('en-US') : '0')
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto">
            {/* Main Form (Left) */}
            <div className="flex-1 min-w-0">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 font-display tracking-tight">Hello, Arinola</h1>
                        <p className="text-base font-semibold text-slate-500 mt-1">Record incoming material from a supplier</p>
                    </div>
                    <span className="text-sm font-semibold text-slate-400 self-start md:self-auto">Draft auto-saved</span>
                </div>

                {/* Form Card Container */}
                <div className="bg-white rounded-[24px] border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
                    {/* Supplier */}
                    <div className="space-y-2">
                        <label htmlFor="supplier" className="text-sm font-bold text-slate-700">Supplier</label>
                        <div className="relative">
                            <select
                                id="supplier"
                                value={supplier}
                                onChange={e => setSupplier(e.target.value)}
                                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl appearance-none text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                            >
                                <option>Chidi Nwosu</option>
                                <option>Sani Mohammed</option>
                                <option>Bello Garba</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Material Type */}
                    <div className="space-y-2">
                        <label htmlFor="materialType" className="text-sm font-bold text-slate-700">Material type</label>
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <select
                                    id="materialType"
                                    value={materialType}
                                    onChange={e => setMaterialType(e.target.value)}
                                    className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl appearance-none text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                                >
                                    <option>PET Clear Bottles</option>
                                    <option>HDPE Caps</option>
                                    <option>PP</option>
                                    <option>LDPE Film</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            </div>
                            <button
                                type="button"
                                className="w-12 h-12 border border-[#3B82F6] rounded-xl flex items-center justify-center text-[#3B82F6] hover:bg-blue-50/50 active:scale-95 transition-all flex-shrink-0"
                                aria-label="Add new material type"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Gross weight + Unit Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="grossWeight" className="text-sm font-bold text-slate-700">Gross weight (kg)</label>
                            <input
                                type="text"
                                id="grossWeight"
                                value={grossWeight}
                                onChange={e => setGrossWeight(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="unitPrice" className="text-sm font-bold text-slate-700">Unit Price (₦/Kg)</label>
                            <input
                                type="text"
                                id="unitPrice"
                                value={unitPrice}
                                onChange={e => handleUnitPriceChange(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                            />
                        </div>
                    </div>

                    {/* Net weight + Sum Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="netWeight" className="text-sm font-bold text-slate-700">Net weight (kg)</label>
                            <input
                                type="text"
                                id="netWeight"
                                value={netWeight}
                                onChange={e => handleNetWeightChange(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="sumPrice" className="text-sm font-bold text-slate-700">Sum Price (₦/Kg)</label>
                            <input
                                type="text"
                                id="sumPrice"
                                value={sumPrice}
                                readOnly
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-sm focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                        <label htmlFor="date" className="text-sm font-bold text-slate-700">Date</label>
                        <div className="relative">
                            <input
                                type="text"
                                id="date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                            />
                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3B82F6] pointer-events-none" />
                        </div>
                    </div>

                    {/* Photo */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Photo</label>
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl py-8 cursor-pointer bg-[#F8FAFC]/50 hover:bg-slate-50 hover:border-slate-300 transition-all">
                            <Camera className="w-6 h-6 text-slate-400 mb-2" />
                            <span className="text-sm font-bold text-slate-400">Tap to upload photo</span>
                            <input type="file" className="hidden" />
                        </label>
                    </div>

                    {/* Warning Alert */}
                    <div className="flex items-start gap-4 bg-[#FFFBEB] border border-[#FEF3C7] rounded-2xl p-4">
                        <AlertTriangle className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-[#D97706]">Price is 28% above average</p>
                            <p className="text-xs font-semibold text-[#D97706]/80 leading-relaxed">
                                Avg for PET Clear from this collector: ₦120/kg. You're paying ₦150/kg.
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={() => navigate({ to: '/batches' })}
                        className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/10 active:scale-[0.99] transition-all"
                    >
                        Generate Invoice
                    </button>
                </div>
            </div>

            {/* Stats Sidebar (Right) */}
            <div className="w-full lg:w-[320px] flex-shrink-0 space-y-4">
                {/* Today's Inbound */}
                <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl p-5 shadow-sm">
                    <p className="text-[#16A34A] text-xs font-bold uppercase tracking-wider">Today's In-Bound</p>
                    <p className="text-[#16A34A] text-3xl font-extrabold mt-1.5 font-display">62.2 KG</p>
                    <div className="mt-1">
                        <p className="text-[#16A34A]/90 text-[13px] font-bold">NGN 150,000</p>
                        <p className="text-[#16A34A]/80 text-xs font-semibold">250/ kg</p>
                    </div>
                </div>

                {/* Last 7 Days */}
                <div className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-2xl p-5 shadow-sm">
                    <p className="text-[#D97706] text-xs font-bold uppercase tracking-wider">Last 7 Days</p>
                    <p className="text-[#D97706] text-3xl font-extrabold mt-1.5 font-display">2759 KG</p>
                    <p className="text-[#D97706]/80 text-[13px] font-semibold mt-1">5% higher to previous week</p>
                </div>

                {/* Total Inbound */}
                <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-2xl p-5 shadow-sm">
                    <p className="text-[#2563EB] text-xs font-bold uppercase tracking-wider">Total Inbound</p>
                    <p className="text-[#2563EB] text-3xl font-extrabold mt-1.5 font-display">12,759 KG</p>
                    <p className="text-[#2563EB]/80 text-[13px] font-bold mt-1">NGN 3,676,809.06</p>
                </div>

                {/* Unit Price per KG */}
                <div className="bg-[#FFF5F5] border border-[#FEE2E2] rounded-2xl p-5 shadow-sm">
                    <p className="text-[#DC2626] text-xs font-bold uppercase tracking-wider mb-2">Unit Price Per KG</p>
                    <div className="space-y-1.5">
                        <p className="text-sm font-bold text-[#DC2626]">rPET 200/KG</p>
                        <p className="text-sm font-bold text-[#DC2626]">HDPE 250/KG</p>
                        <p className="text-sm font-bold text-[#DC2626]">PP 180/KG</p>
                        <p className="text-sm font-bold text-[#DC2626]">METALS 300/KG</p>
                    </div>
                    <div className="flex items-center gap-1.5 mt-4 text-[#DC2626]/80 text-xs font-bold">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>10% drop in rPET</span>
                    </div>
                </div>

                {/* Pending Payments */}
                <div className="bg-[#FFF5F5] border border-[#FEE2E2] rounded-2xl p-5 shadow-sm">
                    <p className="text-[#DC2626] text-xs font-bold uppercase tracking-wider">Pending Payments</p>
                    <div className="flex items-end justify-between mt-2">
                        <span className="text-[#DC2626] text-5xl font-extrabold font-display leading-none">5</span>
                        <svg className="w-8 h-8 text-[#DC2626] stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                </div>

                {/* Download Report Link */}
                <div className="flex justify-end pr-1">
                    <button className="text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors">
                        Download Report
                    </button>
                </div>
            </div>
        </div>
    )
}
