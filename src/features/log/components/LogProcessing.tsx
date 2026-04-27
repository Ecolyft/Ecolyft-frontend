import React, { useState } from 'react'
import { ChevronDown, X, Plus } from 'lucide-react'



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
        <div className="space-y-6 w-full">

            <div className="flex gap-6 w-full">
                {/* Form */}
                <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">{title}</h1>
                    <p className="text-sm text-slate-500 mb-5">{subtitle}</p>

                    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
                        {/* Select batch */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Select batch</label>
                            <div className="relative">
                                <select
                                    value={batch}
                                    onChange={e => setBatch(e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg appearance-none bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                >
                                    {BATCHES.map(b => <option key={b}>{b}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Input weight */}
                    <div className="space-y-1.5 mt-5">
                        <label className="text-sm font-medium text-slate-700">Input weight</label>
                        <input
                            type="text"
                            defaultValue={inputWeight}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                        />
                    </div>

                    {/* Output fractions / Outcome */}
                    <div className="space-y-2 relative">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                            MATERIAL OUTCOME
                        </label>
                        <OutputLines lines={washLines} setLines={setWashLines} />

                    </div>

                    <button className="w-full bg-brand-blue text-white font-semibold py-3.5 rounded-lg hover:bg-brand-blue/90 transition-all">
                        Record Throughput
                    </button>
                </div>

                {/* Stats sidebar */}
                <div className="w-64 flex-shrink-0 space-y-4">
                    {statCards.map(card => (
                        <div key={card.label} className={`rounded-xl border p-5 ${card.color}`}>
                            <p className="text-[10px] font-bold text-slate-500 uppercase mb-2 leading-none tracking-wider">{card.label}</p>
                            <p className={`text-2xl font-black ${card.valueColor} leading-none`}>
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
                    <div className="bg-red-50/50 border border-red-100 rounded-xl p-5">
                        <p className="text-[10px] font-bold text-red-800/60 uppercase mb-3 tracking-wider">CONTAMINATION RATED</p>
                        <div className="space-y-1.5">
                            {['rPET 7%', 'HDPE 5%', 'PP 9%', 'METALS 6.3%', 'Waste 19%'].map(l => (
                                <p key={l} className="text-sm font-black text-red-600">{l}</p>
                            ))}
                        </div>
                    </div>

                    {/* Available to process */}
                    <div className="bg-red-50/50 border border-red-100 rounded-xl p-5">
                        <p className="text-[10px] font-bold text-red-800/60 uppercase mb-2 tracking-wider">AVAILABLE TO PROCESS</p>
                        <p className="text-2xl font-black text-red-600 flex items-center leading-none">
                            <span className="text-sm mr-2 opacity-40">📈</span>
                            85,067 KG
                        </p>
                    </div>

                    <button className="w-full text-xs font-bold text-slate-400 hover:text-slate-600 text-right pr-2">
                        Download Report
                    </button>
                </div>
            </div>
        </div>
    )
}
