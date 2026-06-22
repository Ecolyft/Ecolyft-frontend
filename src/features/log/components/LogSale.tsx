import React, { useState } from 'react'
import { ChevronDown, X, Plus, MessageSquare, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

interface OutputLine {
    id: number
    batchId: string
    material: string
    weight: string
    unitPrice: string
}

const BATCH_MATERIALS: Record<string, string> = {
    'GreenCycle-075': 'PET Clear',
    'GreenCycle-076': 'HDPE Caps',
    'GreenCycle-077': 'PET Colored',
    'GreenCycle-078': 'PP',
    'GreenCycle-079': 'Waste',
}

const BATCHES = Object.keys(BATCH_MATERIALS)

const statCards = [
    { label: "TODAY'S SALES", value: '₦420,000', sub: '1250 KG', color: 'bg-[#F0FDF4] border-[#DCFCE7]', valueColor: 'text-[#16A34A]' },
    { label: 'LAST 7 DAYS', value: '₦2,850,000', note: '12% higher vs last week', color: 'bg-[#EFF6FF] border-[#DBEAFE]', valueColor: 'text-[#2563EB]' },
    { label: 'TOP BUYER', value: 'PolySmart Ltd', sub: '40% of sales', color: 'bg-[#FFFBEB] border-[#FEF3C7]', valueColor: 'text-[#D97706]' },
]

const MONTHS_LIST = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const FULL_MONTHS_LIST = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

export const LogSale: React.FC = () => {
    const navigate = useNavigate()
    const [company, setCompany] = useState('Lagos Recycling Co.')
    const [lines, setLines] = useState<OutputLine[]>([
        { id: 1, batchId: 'GreenCycle-075', material: 'PET Clear', weight: '5000', unitPrice: '520' },
    ])
    
    // Calendar picker states
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 0, 15)) // 15 Jan 2026
    const [currentMonth, setCurrentMonth] = useState(0) // January
    const [currentYear, setCurrentYear] = useState(2026)
    const [showCalendar, setShowCalendar] = useState(false)

    const addLine = () => {
        setLines(prev => [...prev, { id: Date.now(), batchId: 'GreenCycle-075', material: 'PET Clear', weight: '', unitPrice: '' }])
    }

    const removeLine = (id: number) => {
        if (lines.length > 1) {
            setLines(prev => prev.filter(l => l.id !== id))
        } else {
            // Keep at least one row, but clear it
            setLines([{ id: 1, batchId: 'GreenCycle-075', material: 'PET Clear', weight: '', unitPrice: '' }])
        }
    }

    const updateLine = (id: number, field: keyof OutputLine, value: string) => {
        setLines(prev => prev.map(l => {
            if (l.id === id) {
                const updated = { ...l, [field]: value }
                // If batchId is changed, automatically update material
                if (field === 'batchId') {
                    updated.material = BATCH_MATERIALS[value] || ''
                }
                return updated
            }
            return l
        }))
    }

    // Number parsing and formatting helpers
    const parseNum = (str: string) => {
        const val = parseFloat(str.replace(/[^0-9.]/g, ''))
        return isNaN(val) ? 0 : val
    }

    const formatNumber = (num: number) => {
        if (num === 0) return ''
        return num.toLocaleString('en-US')
    }

    // Calendar helper functions
    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(prev => prev - 1)
        } else {
            setCurrentMonth(prev => prev - 1)
        }
    }

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(prev => prev + 1)
        } else {
            setCurrentMonth(prev => prev + 1)
        }
    }

    const getDaysInMonth = (year: number, month: number) => {
        const date = new Date(year, month, 1)
        const days = []
        while (date.getMonth() === month) {
            days.push(date.getDate())
            date.setDate(date.getDate() + 1)
        }
        return days
    }

    const getFirstDayOfWeek = (year: number, month: number) => {
        return new Date(year, month, 1).getDay()
    }

    const formatDateString = (d: Date) => {
        const day = d.getDate()
        const month = MONTHS_LIST[d.getMonth()]
        const year = d.getFullYear()
        return `${day} ${month} ${year}`
    }

    // Calculations
    const totalWeight = lines.reduce((acc, curr) => acc + parseNum(curr.weight), 0)
    const totalSum = lines.reduce((acc, curr) => {
        const w = parseNum(curr.weight)
        const p = parseNum(curr.unitPrice)
        return acc + (w * p)
    }, 0)
    const vat = totalSum * 0.075

    const title = 'Good Morning Ijeoma'
    const subtitle = 'Log new sales'

    return (
        <div className="w-full space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 w-full">
                {/* Form area */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-800 mb-1 font-display tracking-tight">{title}</h1>
                            <p className="text-sm font-semibold text-slate-500 mt-1">{subtitle}</p>
                        </div>
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
                                {lines.map(line => {
                                    const w = parseNum(line.weight)
                                    const p = parseNum(line.unitPrice)
                                    const lineTotal = w * p

                                    return (
                                        <div key={line.id} className="grid grid-cols-1 md:grid-cols-[1.5fr_1.2fr_1fr_1fr_1.2fr_auto] gap-3 items-center">
                                            {/* Batch ID */}
                                            <div className="relative w-full">
                                                <select
                                                    aria-label="Select Batch"
                                                    value={line.batchId}
                                                    onChange={e => updateLine(line.id, 'batchId', e.target.value)}
                                                    className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl appearance-none text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100/50"
                                                >
                                                    {BATCHES.map(b => <option key={b} value={b}>{b}</option>)}
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                            </div>

                                            {/* Material Type */}
                                            <input
                                                type="text"
                                                aria-label="Material Type"
                                                value={line.material}
                                                readOnly
                                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-semibold text-sm focus:outline-none cursor-not-allowed"
                                            />

                                            {/* Weight */}
                                            <input
                                                type="text"
                                                aria-label="Weight"
                                                value={line.weight}
                                                onChange={e => updateLine(line.id, 'weight', e.target.value)}
                                                placeholder="0"
                                                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                                            />

                                            {/* Unit Price */}
                                            <div className="relative w-full">
                                                <input
                                                    type="text"
                                                    aria-label="Unit Price"
                                                    value={line.unitPrice}
                                                    onChange={e => updateLine(line.id, 'unitPrice', e.target.value)}
                                                    placeholder="0"
                                                    className="w-full pl-4 pr-14 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm pointer-events-none">/ kg</span>
                                            </div>

                                            {/* Line Total Price */}
                                            <input
                                                type="text"
                                                aria-label="Total Price"
                                                value={formatNumber(lineTotal)}
                                                readOnly
                                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-semibold text-sm focus:outline-none cursor-not-allowed"
                                            />

                                            {/* Remove Line */}
                                            <button
                                                type="button"
                                                onClick={() => removeLine(line.id)}
                                                className="text-slate-300 hover:text-slate-500 transition-colors flex-shrink-0 mx-auto"
                                                aria-label="Remove item"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )
                                })}
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

                        {/* Weight sold, Total Sum, VAT */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="weightSold" className="text-[11px] font-extrabold text-slate-500 tracking-wider">TOTAL WEIGHT SOLD (KG)</label>
                                <input
                                    type="text"
                                    id="weightSold"
                                    value={formatNumber(totalWeight)}
                                    readOnly
                                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-semibold text-sm focus:outline-none cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="totalSum" className="text-[11px] font-extrabold text-slate-500 tracking-wider">TOTAL SUM (N)</label>
                                <input
                                    type="text"
                                    id="totalSum"
                                    value={formatNumber(totalSum)}
                                    readOnly
                                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-semibold text-sm focus:outline-none cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="vat" className="text-[11px] font-extrabold text-slate-500 tracking-wider">VAT (N)</label>
                                <input
                                    type="text"
                                    id="vat"
                                    value={formatNumber(vat)}
                                    readOnly
                                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-semibold text-sm focus:outline-none cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <label htmlFor="date" className="text-[11px] font-extrabold text-slate-500 tracking-wider">DATE</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="date"
                                    value={formatDateString(selectedDate)}
                                    readOnly
                                    onClick={() => setShowCalendar(prev => !prev)}
                                    className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue cursor-pointer select-none transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCalendar(prev => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    <Calendar className="w-5 h-5" />
                                </button>

                                {showCalendar && (
                                    <>
                                        <div className="fixed inset-0 z-40 cursor-default" onClick={() => setShowCalendar(false)} />
                                        <div className="absolute top-full mt-2 left-0 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl z-50 w-72 cursor-default select-none animate-in fade-in slide-in-from-top-2 duration-150">
                                            <div className="flex items-center justify-between mb-4">
                                                <button
                                                    type="button"
                                                    onClick={prevMonth}
                                                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                                                >
                                                    <ChevronLeft className="w-4 h-4" />
                                                </button>
                                                <span className="font-bold text-sm text-slate-800">
                                                    {FULL_MONTHS_LIST[currentMonth]} {currentYear}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={nextMonth}
                                                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                                                >
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-7 gap-1 text-center mb-1">
                                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                                    <span key={day} className="text-[11px] font-bold text-slate-400 uppercase">
                                                        {day}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-7 gap-1">
                                                {Array.from({ length: getFirstDayOfWeek(currentYear, currentMonth) }).map((_, i) => (
                                                    <div key={`empty-${i}`} />
                                                ))}
                                                {getDaysInMonth(currentYear, currentMonth).map(day => {
                                                    const isSelected = selectedDate.getDate() === day &&
                                                        selectedDate.getMonth() === currentMonth &&
                                                        selectedDate.getFullYear() === currentYear
                                                    return (
                                                        <button
                                                            key={day}
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedDate(new Date(currentYear, currentMonth, day))
                                                                setShowCalendar(false)
                                                            }}
                                                            className={`
                                                                w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all
                                                                ${isSelected 
                                                                    ? 'bg-[#3B82F6] text-white font-bold shadow-md shadow-blue-500/10' 
                                                                    : 'text-slate-700 hover:bg-slate-50'
                                                                }
                                                            `}
                                                        >
                                                            {day}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </>
                                )}
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
                <div className="w-full lg:w-80 flex-shrink-0 space-y-4">
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
