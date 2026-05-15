import React, { useState } from 'react'
import { ChevronDown, X, Plus, MessageSquare } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

interface OutputLine {
    id: number
    material: string
    batchId: string
    weight: string
}

const BATCHES = ['ECO-20261104-A001', 'ECO-20260115-0042', 'ECO-20260115-0043']

const statCards = [
    { label: "TODAY'S SALES", value: '₦420,000', sub: '1250 KG', color: 'bg-green-50 border-green-100', valueColor: 'text-emerald-600' },
    { label: 'LAST 7 DAYS', value: '₦2,850,000', note: '12% higher vs last week', color: 'bg-blue-50 border-blue-100', valueColor: 'text-brand-blue' },
    { label: 'TOP BUYER', value: 'PolySmart Ltd', sub: '40% of sales', color: 'bg-amber-50 border-amber-100', valueColor: 'text-amber-600' },
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
        <div className="w-full space-y-6">
            <div className="flex flex-col xl:flex-row gap-6">
                {/* Form area */}
                <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">Log Sale</h1>
                    <p className="text-sm text-slate-500 mb-5">Record outgoing material sold to a buyer</p>

                    <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6 space-y-5 shadow-sm">
                        {/* Company */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700">Company</label>
                            <div className="relative">
                                <select
                                    value={company}
                                    onChange={e => setCompany(e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg appearance-none bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                >
                                    <option>Lagos Recycling Co.</option>
                                    <option>PolySmart Ltd</option>
                                    <option>RecyclePoints</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Material Type lines */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-slate-700">Material Type</label>
                            {lines.map(line => (
                                <div key={line.id} className="flex flex-col sm:flex-row items-center gap-3">
                                    <div className="relative w-full sm:flex-[1.5]">
                                        <select
                                            value={line.batchId}
                                            onChange={e => updateLine(line.id, 'batchId', e.target.value)}
                                            className="w-full px-4 py-3 border border-slate-100 rounded-lg appearance-none bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/10"
                                        >
                                            <option value="">Batch ID</option>
                                            {BATCHES.map(b => <option key={b}>{b}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                    <div className="w-full sm:flex-1 bg-slate-50 border border-slate-100 px-4 py-3 rounded-lg text-sm text-slate-600">
                                        {line.material || 'PET Clear'}
                                    </div>
                                    <div className="w-full sm:flex-1 flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={line.weight}
                                            onChange={e => updateLine(line.id, 'weight', e.target.value)}
                                            placeholder="0 kg"
                                            className="flex-1 px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeLine(line.id)}
                                            className="text-slate-300 hover:text-slate-500 transition-colors flex-shrink-0"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addLine}
                                className="flex items-center gap-1 text-sm text-brand-blue hover:underline mt-1"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                Add another output line
                            </button>
                        </div>

                        {/* Weight sold + Price */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Weight Sold (KG)</label>
                                <input
                                    type="text"
                                    value={weightSold}
                                    onChange={e => setWeightSold(e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Price (N)</label>
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
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={date}
                                    readOnly
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-600 focus:outline-none cursor-default"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" />
                                        <path d="M16 2v4M8 2v4M3 10h18" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Invoice notice */}
                        <div className="flex items-center gap-3 bg-emerald-50/50 border-l-4 border-emerald-500 rounded-r-lg p-4">
                            <div className="bg-emerald-100 p-1 rounded">
                                <MessageSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            </div>
                            <p className="text-[13px] font-medium text-emerald-800/80">An email invoice link will be sent to the buyer after recording.</p>
                        </div>

                        <button
                            onClick={() => navigate({ to: '/log-sale/success' })}
                            className="w-full bg-[#4A90E2] text-white font-bold py-4 rounded-lg hover:shadow-lg active:scale-[0.98] transition-all shadow-md"
                        >
                            Create Sale
                        </button>
                    </div>
                </div>

                {/* Sidebar area */}
                <div className="w-full xl:w-64 flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                    {statCards.map(card => (
                        <div key={card.label} className={`rounded-xl border p-5 shadow-sm ${card.color}`}>
                            <p className="text-[10px] font-bold text-slate-500 uppercase mb-2 leading-none tracking-widest">{card.label}</p>
                            <p className={`text-2xl font-black ${card.valueColor} leading-none`}>
                                {card.value}
                            </p>
                            {card.sub && <p className="text-xs font-bold text-slate-500 mt-2">{card.sub}</p>}
                            {card.note && <p className="text-xs font-bold text-slate-600 mt-2">{card.note}</p>}
                        </div>
                    ))}

                    {/* Sales Target */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest">MONTHLY TARGET</p>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-700">72% Reached</span>
                            <span className="text-[10px] text-slate-400">₦5.0M Goal</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '72%' }} />
                        </div>
                    </div>

                    <button className="text-xs font-bold text-slate-400 hover:text-slate-600 text-right pr-2">
                        View Detailed Reports
                    </button>
                </div>
            </div>
        </div>
    )
}
