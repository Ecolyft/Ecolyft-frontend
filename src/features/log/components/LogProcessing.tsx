import React, { useState } from 'react'
import { ChevronDown, X, Plus } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'



interface OutputLine {
    id: number
    material: string
    weight: string
}

const MATERIALS = ['PET Clear', 'PET Colored', 'HDPE Caps', 'PP', 'Waste']
const BATCHES = ['ECO-20261104-A001', 'ECO-20260115-0042', 'ECO-20260115-0043']

const statCards = [
    { label: "TODAY'S THROUGHPUT", value: '2567 KG', sub: '/ 5000 KG', expected: 'EXPECTED 6 BALES', color: 'bg-green-50/50 border-green-100', valueColor: 'text-emerald-600' },
    { label: 'LAST 7 DAYS', value: '25000 KG', sub: '/ 150000 KG', note: '5% higher to previous week', color: 'bg-amber-50/50 border-amber-100', valueColor: 'text-amber-500' },
    { label: 'TOTAL YIELD', value: '87 %', sub: '75 LOADS', color: 'bg-blue-50/50 border-blue-100', valueColor: 'text-blue-600' },
]

function OutputLines({ lines, setLines }: { lines: OutputLine[], setLines: React.Dispatch<React.SetStateAction<OutputLine[]>> }) {
    const add = () => setLines(prev => [...prev, { id: Date.now(), material: 'PET Clear', weight: '' }])
    const remove = (id: number) => setLines(prev => prev.filter(l => l.id !== id))
    const update = (id: number, field: keyof OutputLine, val: string) =>
        setLines(prev => prev.map(l => l.id === id ? { ...l, [field]: val } : l))

    return (
        <div className="space-y-2">
            {lines.map(line => (
                <div key={line.id} className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <select
                            value={line.material}
                            onChange={e => update(line.id, 'material', e.target.value)}
                            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg appearance-none bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                        >
                            {MATERIALS.map(m => <option key={m}>{m}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                    </div>
                    <input
                        type="text"
                        value={line.weight}
                        onChange={e => update(line.id, 'weight', e.target.value)}
                        placeholder="0 kg"
                        className="w-24 px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                    />
                    <button type="button" onClick={() => remove(line.id)} className="text-slate-400 hover:text-slate-600">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
            <button type="button" onClick={add} className="flex items-center gap-1 text-sm text-brand-blue hover:underline">
                <Plus className="w-3.5 h-3.5" />
                Add another output line
            </button>
        </div>
    )
}

export const LogProcessing: React.FC = () => {
    const navigate = useNavigate()
    const [batch, setBatch] = useState('ECO-20261104-A001')
    const [inputWeight] = useState('450 kg')
    const [washLines, setWashLines] = useState<OutputLine[]>([
        { id: 1, material: 'PET Clear', weight: '280 kg' },
        { id: 2, material: 'PET Colored', weight: '85 kg' },
        { id: 3, material: 'Waste', weight: '5 kg' },
    ])

    const title = 'Log Processing — Sorting & Baling'
    const subtitle = 'Split inbound material into output fractions'

    return (
        <div className="space-y-6 w-full max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 w-full">
                {/* Form */}
                <div className="flex-1 min-w-0">
                    <h1 className="text-3xl font-extrabold text-slate-800 mb-1 font-display tracking-tight">{title}</h1>
                    <p className="text-sm font-semibold text-slate-500 mb-5">{subtitle}</p>

                    <div className="bg-white rounded-[24px] border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
                        {/* Select batch */}
                        <div className="space-y-2">
                            <label htmlFor="batchSelect" className="text-sm font-bold text-slate-700">Select batch</label>
                            <div className="relative">
                                <select
                                    id="batchSelect"
                                    value={batch}
                                    onChange={e => setBatch(e.target.value)}
                                    className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl appearance-none text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                                >
                                    {BATCHES.map(b => <option key={b}>{b}</option>)}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Input weight */}
                        <div className="space-y-2">
                            <label htmlFor="inputWeight" className="text-sm font-bold text-slate-700">Input weight</label>
                            <input
                                type="text"
                                id="inputWeight"
                                defaultValue={inputWeight}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                            />
                        </div>

                        {/* Output fractions / Outcome */}
                        <div className="space-y-4 relative">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                                MATERIAL OUTCOME
                            </label>
                            <OutputLines lines={washLines} setLines={setWashLines} />
                        </div>

                        <button
                            onClick={() => navigate({ to: '/batches' })}
                            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/10 active:scale-[0.99] transition-all"
                        >
                            Record Throughput
                        </button>
                    </div>
                </div>

                {/* Stats sidebar */}
                <div className="w-full lg:w-64 flex-shrink-0 space-y-4">
                    {statCards.map(card => (
                        <div key={card.label} className={`rounded-2xl border p-5 shadow-sm ${card.color}`}>
                            <p className="text-[10px] font-bold text-slate-500 uppercase mb-2 leading-none tracking-wider">{card.label}</p>
                            <p className={`text-2xl font-black ${card.valueColor} leading-none font-display`}>
                                {card.value}
                                {card.sub && !card.expected && <span className="text-sm font-bold text-slate-300 ml-1"> {card.sub}</span>}
                            </p>
                            {card.expected && (
                                <p className="text-[10px] font-bold text-emerald-500 mt-2 uppercase tracking-wide">{card.expected}</p>
                            )}
                            {card.sub && !card.expected && card.label === 'TOTAL YIELD' && (
                                <p className="text-[10px] font-bold text-blue-500 mt-2 uppercase tracking-wide">{card.sub}</p>
                            )}
                            {card.note && <p className="text-[10px] text-amber-600 font-bold mt-2 uppercase tracking-wide">{card.note}</p>}
                        </div>
                    ))}

                    {/* Contamination */}
                    <div className="bg-red-50/50 border border-red-100 rounded-2xl p-5 shadow-sm">
                        <p className="text-[10px] font-bold text-red-800/60 uppercase mb-3 tracking-wider">CONTAMINATION RATED</p>
                        <div className="space-y-1.5">
                            {['rPET 7%', 'HDPE 5%', 'PP 9%', 'METALS 6.3%', 'Waste 19%'].map(l => (
                                <p key={l} className="text-sm font-bold text-red-600">{l}</p>
                            ))}
                        </div>
                    </div>

                    {/* Available to process */}
                    <div className="bg-red-50/50 border border-red-100 rounded-2xl p-5 shadow-sm">
                        <p className="text-[10px] font-bold text-red-800/60 uppercase mb-2 tracking-wider">AVAILABLE TO PROCESS</p>
                        <p className="text-2xl font-black text-red-600 flex items-center leading-none font-display">
                            <span className="text-sm mr-2 opacity-40">📈</span>
                            85,067 KG
                        </p>
                    </div>

                    <div className="flex justify-end pr-1">
                        <button className="text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors">
                            Download Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
