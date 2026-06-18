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

function OutputLines({ lines, setLines }: { lines: OutputLine[], setLines: React.Dispatch<React.SetStateAction<OutputLine[]>> }) {
    const add = () => setLines(prev => [...prev, { id: Date.now(), material: 'PET Clear', weight: '' }])
    const remove = (id: number) => setLines(prev => prev.filter(l => l.id !== id))
    const update = (id: number, field: keyof OutputLine, val: string) =>
        setLines(prev => prev.map(l => l.id === id ? { ...l, [field]: val } : l))

    return (
        <div className="space-y-3">
            {lines.map(line => (
                <div key={line.id} className="flex items-center gap-3">
                    <div className="relative flex-1">
                        <select
                            value={line.material}
                            onChange={e => update(line.id, 'material', e.target.value)}
                            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl appearance-none text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                        >
                            {MATERIALS.map(m => <option key={m}>{m}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    </div>
                    <input
                        type="text"
                        value={line.weight}
                        onChange={e => update(line.id, 'weight', e.target.value)}
                        placeholder="0 kg"
                        className="w-32 px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                    />
                    <button
                        type="button"
                        onClick={() => remove(line.id)}
                        className="text-slate-300 hover:text-slate-500 transition-colors flex-shrink-0"
                        aria-label="Remove item"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={add}
                className="flex items-center gap-1.5 text-sm font-bold text-[#3B82F6] hover:underline mt-2"
            >
                <Plus className="w-4 h-4" />
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

    const title = 'Good Afternoon Bello'
    const subtitle = 'Record processed material into output fractions'

    return (
        <div className="space-y-6 w-full max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 w-full">
                {/* Form */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-800 mb-1 font-display tracking-tight">{title}</h1>
                            <p className="text-base font-semibold text-slate-500 mt-1">{subtitle}</p>
                        </div>
                        <span className="text-sm font-semibold text-slate-400 self-start md:self-auto">Draft auto-saved</span>
                    </div>

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
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-semibold text-sm focus:outline-none cursor-default"
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
                    {/* Today's Throughput */}
                    <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl p-5 shadow-sm">
                        <p className="text-[#16A34A] text-xs font-bold uppercase tracking-wider">Today's Throughput</p>
                        <p className="text-[#16A34A] text-2xl font-extrabold mt-1.5 font-display">
                            2567 KG <span className="text-sm font-semibold text-[#16A34A]/80">/ 5000 KG</span>
                        </p>
                        <p className="text-[#16A34A] text-xs font-bold mt-2 uppercase tracking-wide">Expected 6 Bales</p>
                    </div>

                    {/* Last 7 Days */}
                    <div className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-2xl p-5 shadow-sm">
                        <p className="text-[#D97706] text-xs font-bold uppercase tracking-wider">Last 7 Days</p>
                        <p className="text-[#D97706] text-2xl font-extrabold mt-1.5 font-display">
                            25000 KG <span className="text-sm font-semibold text-[#D97706]/80">/ 150000 KG</span>
                        </p>
                        <p className="text-[#D97706]/80 text-[11px] font-semibold mt-2 uppercase tracking-wide">5% higher to previous week</p>
                    </div>

                    {/* Total Yield */}
                    <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-2xl p-5 shadow-sm">
                        <p className="text-[#2563EB] text-xs font-bold uppercase tracking-wider">Total Yield</p>
                        <p className="text-[#2563EB] text-3xl font-extrabold mt-1.5 font-display">87 %</p>
                        <p className="text-[#2563EB]/80 text-xs font-bold mt-2 uppercase tracking-wide">75 Loads</p>
                    </div>

                    {/* Contamination Rated */}
                    <div className="bg-[#FFF5F5] border border-[#FEE2E2] rounded-2xl p-5 shadow-sm">
                        <p className="text-[#DC2626] text-xs font-bold uppercase tracking-wider mb-2">Contamination Rated</p>
                        <div className="space-y-1.5">
                            <p className="text-sm font-bold text-[#DC2626]">rPET 7%</p>
                            <p className="text-sm font-bold text-[#DC2626]">HDPE 5%</p>
                            <p className="text-sm font-bold text-[#DC2626]">PP 9%</p>
                            <p className="text-sm font-bold text-[#DC2626]">METALS 6.3%</p>
                            <p className="text-sm font-bold text-[#DC2626]">Waste 19%</p>
                        </div>
                    </div>

                    {/* Available to Process */}
                    <div className="bg-[#FFF5F5] border border-[#FEE2E2] rounded-2xl p-5 shadow-sm">
                        <p className="text-[#DC2626] text-xs font-bold uppercase tracking-wider">Available to Process</p>
                        <div className="flex items-end justify-between mt-2">
                            <span className="text-[#DC2626] text-2xl font-extrabold font-display leading-none">85,067 KG</span>
                            <svg className="w-6 h-6 text-[#DC2626]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
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
