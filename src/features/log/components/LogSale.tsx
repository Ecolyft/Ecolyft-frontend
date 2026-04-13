import React, { useState } from 'react'
import { ChevronDown, X, Plus, MessageSquare } from 'lucide-react'

interface OutputLine {
    id: number
    material: string
    batchId: string
    weight: string
}

const MATERIALS = ['PET Clear', 'PET Colored', 'HDPE Caps', 'PP', 'LDPE Film']
const BATCHES = ['ECO-20261104-A001', 'ECO-20260115-0042', 'ECO-20260115-0043']

export const LogSale: React.FC = () => {
    const [company, setCompany] = useState('Lagos Recycling Co.')
    const [lines, setLines] = useState<OutputLine[]>([
        { id: 1, material: 'PET Clear', batchId: '', weight: '280 kg' },
        { id: 2, material: 'PET Clear', batchId: '', weight: '280 kg' },
        { id: 3, material: 'PET Clear', batchId: '', weight: '280 kg' },
    ])
    const [weightSold, setWeightSold] = useState('280')
    const [price, setPrice] = useState('84,000')
    const [date, setDate] = useState('15 Jan 2026')

    const addLine = () => setLines(prev => [...prev, { id: Date.now(), material: 'PET Clear', batchId: '', weight: '' }])
    const removeLine = (id: number) => setLines(prev => prev.filter(l => l.id !== id))
    const updateLine = (id: number, field: keyof OutputLine, value: string) =>
        setLines(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l))

    return (
        <div className="max-w-3xl w-full">
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Log Sale</h1>
            <p className="text-sm text-slate-500 mb-5">Record outgoing material sold to a buyer</p>

            <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6 space-y-5">
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
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Material Type</label>
                    {lines.map(line => (
                        <div key={line.id} className="flex items-center gap-2">
                            <div className="relative w-28 sm:w-32 flex-shrink-0">
                                <select
                                    value={line.material}
                                    onChange={e => updateLine(line.id, 'material', e.target.value)}
                                    className="w-full px-2 sm:px-3 py-2.5 border border-slate-200 rounded-lg appearance-none bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                                >
                                    {MATERIALS.map(m => <option key={m}>{m}</option>)}
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                            </div>
                            <div className="relative flex-1">
                                <select
                                    value={line.batchId}
                                    onChange={e => updateLine(line.id, 'batchId', e.target.value)}
                                    className="w-full px-2 sm:px-3 py-2.5 border border-slate-200 rounded-lg appearance-none bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                                >
                                    <option value="">Batch ID</option>
                                    {BATCHES.map(b => <option key={b}>{b}</option>)}
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                            </div>
                            <input
                                type="text"
                                value={line.weight}
                                onChange={e => updateLine(line.id, 'weight', e.target.value)}
                                className="w-20 sm:w-24 px-2 sm:px-3 py-2.5 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                            />
                            <button
                                type="button"
                                onClick={() => removeLine(line.id)}
                                className="text-slate-400 hover:text-slate-600 flex-shrink-0"
                            >
                                <X className="w-4 h-4" />
                            </button>
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
                <div className="grid grid-cols-2 gap-4">
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
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <path d="M16 2v4M8 2v4M3 10h18" />
                            </svg>
                        </span>
                    </div>
                </div>

                {/* Invoice notice */}
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-3">
                    <MessageSquare className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <p className="text-sm text-green-700">An email invoice link will be sent to the buyer after recording.</p>
                </div>

                <button className="w-full bg-brand-blue text-white font-semibold py-3.5 rounded-lg hover:bg-brand-blue/90 transition-all">
                    Record Throughput
                </button>
            </div>
        </div>
    )
}
