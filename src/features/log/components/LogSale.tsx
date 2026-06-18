import React, { useState } from 'react'
import { ChevronDown, X, Plus, MessageSquare, Calendar } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

interface OutputLine {
    id: number
    material: string
    batchId: string
    weight: string
}

const BATCHES = ['ECO-20261104-A001', 'ECO-20260115-0042', 'ECO-20260115-0043']

const statCards = [
    { label: "TODAY'S SALES", value: '₦420,000', sub: '1250 KG', color: 'bg-[#F0FDF4] border-[#DCFCE7]', valueColor: 'text-[#16A34A]' },
    { label: 'LAST 7 DAYS', value: '₦2,850,000', note: '12% higher vs last week', color: 'bg-[#EFF6FF] border-[#DBEAFE]', valueColor: 'text-[#2563EB]' },
    { label: 'TOP BUYER', value: 'PolySmart Ltd', sub: '40% of sales', color: 'bg-[#FFFBEB] border-[#FEF3C7]', valueColor: 'text-[#D97706]' },
]

export const LogSale: React.FC = () => {
    const navigate = useNavigate()
    const [company, setCompany] = useState('Lagos Recycling Co.')
    const [lines, setLines] = useState<OutputLine[]>([
        { id: 1, material: 'PET Clear', batchId: 'Batch ID', weight: '280 kg' },
    ])
    const [weightSold, setWeightSold] = useState('280')
    const [price, setPrice] = useState('84,000')
    const [date] = useState('15 Jan 2026')

    const addLine = () => setLines(prev => [...prev, { id: Date.now(), material: 'PET Clear', batchId: '', weight: '' }])
    const removeLine = (id: number) => setLines(prev => prev.filter(l => l.id !== id))
    const updateLine = (id: number, field: keyof OutputLine, value: string) =>
        setLines(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l))

    return (
        <div className="w-full space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 w-full">
                {/* Form area */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-800 mb-1 font-display tracking-tight">Log Sale</h1>
                            <p className="text-sm font-semibold text-slate-500 mt-1">Record outgoing material sold to a buyer</p>
                        </div>
                        <span className="text-sm font-semibold text-slate-400 self-start md:self-auto">Draft auto-saved</span>
                    </div>

                    <div className="bg-white rounded-[24px] border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
                        {/* Company */}
                        <div className="space-y-2">
                            <label htmlFor="companySelect" className="text-sm font-bold text-slate-700">Company</label>
                            <div className="relative">
                                <select
                                    id="companySelect"
                                    value={company}
                                    onChange={e => setCompany(e.target.value)}
                                    className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl appearance-none text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                                >
                                    <option>Lagos Recycling Co.</option>
                                    <option>PolySmart Ltd</option>
                                    <option>RecyclePoints</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Material Type lines */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-700">Material Type</label>
                            <div className="space-y-3">
                                {lines.map(line => (
                                    <div key={line.id} className="flex flex-col sm:flex-row items-center gap-3">
                                        <div className="relative w-full sm:flex-[1.5]">
                                            <select
                                                aria-label="Select Batch"
                                                value={line.batchId}
                                                onChange={e => updateLine(line.id, 'batchId', e.target.value)}
                                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl appearance-none text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100/50"
                                            >
                                                <option value="">Batch ID</option>
                                                {BATCHES.map(b => <option key={b}>{b}</option>)}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                        </div>
                                        <div className="w-full sm:flex-1 bg-slate-50 border border-slate-100 px-4 py-3.5 rounded-xl text-sm text-slate-600 font-semibold">
                                            {line.material || 'PET Clear'}
                                        </div>
                                        <div className="w-full sm:flex-1 flex items-center gap-2">
                                            <input
                                                type="text"
                                                aria-label="Weight"
                                                value={line.weight}
                                                onChange={e => updateLine(line.id, 'weight', e.target.value)}
                                                placeholder="0 kg"
                                                className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeLine(line.id)}
                                                className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
                                                aria-label="Remove item"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={addLine}
                                className="flex items-center gap-1.5 text-sm font-bold text-[#3B82F6] hover:underline mt-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add another output line
                            </button>
                        </div>

                        {/* Weight sold + Price */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="weightSold" className="text-sm font-bold text-slate-700">Weight Sold (KG)</label>
                                <input
                                    type="text"
                                    id="weightSold"
                                    value={weightSold}
                                    onChange={e => setWeightSold(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="price" className="text-sm font-bold text-slate-700">Price (₦)</label>
                                <input
                                    type="text"
                                    id="price"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
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
                                    readOnly
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none cursor-default"
                                />
                                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Invoice notice */}
                        <div className="flex items-center gap-3 bg-emerald-50/50 border-l-4 border-emerald-500 rounded-r-xl p-4">
                            <div className="bg-emerald-100 p-1.5 rounded-lg">
                                <MessageSquare className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                            </div>
                            <p className="text-[13px] font-semibold text-emerald-800/80 leading-relaxed">
                                An email invoice link will be sent to the buyer after recording.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate({ to: '/log-sale/success' })}
                            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/10 active:scale-[0.99] transition-all"
                        >
                            Create Sale
                        </button>
                    </div>
                </div>

                {/* Sidebar area */}
                <div className="w-full lg:w-64 flex-shrink-0 space-y-4">
                    {statCards.map(card => (
                        <div key={card.label} className={`rounded-2xl border p-5 shadow-sm ${card.color}`}>
                            <p className="text-[10px] font-bold text-slate-500 uppercase mb-2 leading-none tracking-wider">{card.label}</p>
                            <p className={`text-2xl font-black ${card.valueColor} leading-none font-display`}>
                                {card.value}
                            </p>
                            {card.sub && <p className="text-xs font-semibold text-slate-500 mt-2">{card.sub}</p>}
                            {card.note && <p className="text-xs font-semibold text-slate-600 mt-2">{card.note}</p>}
                        </div>
                    ))}

                    {/* Sales Target */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-wider">MONTHLY TARGET</p>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-700">72% Reached</span>
                            <span className="text-[10px] font-semibold text-slate-400">₦5.0M Goal</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-[#10B981] h-2 rounded-full" style={{ width: '72%' }} />
                        </div>
                    </div>

                    <div className="flex justify-end pr-1">
                        <button className="text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors">
                            View Detailed Reports
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
