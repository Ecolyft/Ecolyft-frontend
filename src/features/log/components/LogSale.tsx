import React, { useEffect, useMemo, useState } from 'react'
import { ChevronDown, X, Plus, MessageSquare, Calendar, ChevronLeft, ChevronRight, ShieldCheck, Send } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { entitiesApi, operationsApi, ApiError } from '../../../lib/api'
import { authSession } from '../../../lib/authSession'
import type { Batch, Buyer } from '../../../lib/types'

interface OutputLine {
    id: number
    batchId: string
    material: string
    weight: string
    unitPrice: string
}

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
    const user = authSession.getUser()

    const [buyers, setBuyers] = useState<Buyer[]>([])
    const [sellableBatches, setSellableBatches] = useState<Batch[]>([])
    const [buyerId, setBuyerId] = useState('')
    const [lines, setLines] = useState<OutputLine[]>([])
    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(true)
    const [error, setError] = useState('')
    
    // Digital Passport states
    const [processingCost, setProcessingCost] = useState('0.00')
    const [isPassportApproved, setIsPassportApproved] = useState(false)
    const [securityHash, setSecurityHash] = useState('a89f...3e21')

    // Calendar picker states
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 0, 15)) // 15 Jan 2026
    const [currentMonth, setCurrentMonth] = useState(0) // January
    const [currentYear, setCurrentYear] = useState(2026)
    const [showCalendar, setShowCalendar] = useState(false)

    const batchMaterialMap = useMemo(() => {
        const map: Record<string, string> = {}
        sellableBatches.forEach(batch => {
            map[batch.id] =
                batch.processingEvent?.materialType ||
                batch.inboundEvent?.materialType ||
                'PET Clear'
        })
        return map
    }, [sellableBatches])

    const batchMaterialFromBatch = (batch: Batch) =>
        batch.processingEvent?.materialType || batch.inboundEvent?.materialType || 'PET Clear'

    useEffect(() => {
        Promise.all([entitiesApi.getBuyers(), operationsApi.getBatches()])
            .then(([buyerRes, batchRes]) => {
                const eligible = batchRes.batches.filter(batch =>
                    ['PROCESSED', 'VERIFIED'].includes(batch.status)
                )
                setBuyers(buyerRes.buyers)
                setSellableBatches(eligible)

                if (buyerRes.buyers[0]) {
                    setBuyerId(buyerRes.buyers[0].id)
                }

                if (eligible[0]) {
                    setLines([
                        {
                            id: 1,
                            batchId: eligible[0].id,
                            material: batchMaterialFromBatch(eligible[0]),
                            weight: String(eligible[0].processingEvent?.weight || eligible[0].inboundEvent?.weight || ''),
                            unitPrice: '',
                        },
                    ])
                }
            })
            .catch(err => setError(err instanceof ApiError ? err.message : 'Failed to load sale data'))
            .finally(() => setLoadingData(false))
    }, [])

    const addLine = () => {
        const nextBatch = sellableBatches.find(
            batch => !lines.some(line => line.batchId === batch.id)
        )
        if (!nextBatch) return

        setLines(prev => [
            ...prev,
            {
                id: Date.now(),
                batchId: nextBatch.id,
                material: batchMaterialFromBatch(nextBatch),
                weight: String(nextBatch.processingEvent?.weight || nextBatch.inboundEvent?.weight || ''),
                unitPrice: '',
            },
        ])
    }

    const removeLine = (id: number) => {
        if (lines.length > 1) {
            setLines(prev => prev.filter(l => l.id !== id))
        } else {
            setLines([{
                id: 1,
                batchId: sellableBatches[0]?.id || '',
                material: sellableBatches[0] ? batchMaterialFromBatch(sellableBatches[0]) : '',
                weight: '',
                unitPrice: '',
            }])
        }
    }

    const updateLine = (id: number, field: keyof OutputLine, value: string) => {
        setLines(prev => prev.map(l => {
            if (l.id === id) {
                const updated = { ...l, [field]: value }
                if (field === 'batchId') {
                    updated.material = batchMaterialMap[value] || updated.material
                    const selected = sellableBatches.find(batch => batch.id === value)
                    if (selected) {
                        updated.weight = String(
                            selected.processingEvent?.weight || selected.inboundEvent?.weight || updated.weight
                        )
                    }
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
        if (num === 0) return '0'
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

    const handleApprovePassport = () => {
        if (!isPassportApproved) {
            setIsPassportApproved(true)
            setProcessingCost('5,000.00')
            setSecurityHash('pending approval on submit')
        } else {
            setIsPassportApproved(false)
            setProcessingCost('0.00')
            setSecurityHash('a89f...3e21')
        }
    }

    const handleSubmit = async () => {
        if (!buyerId) {
            setError('Please add a buyer before logging a sale.')
            return
        }

        const saleLines = lines
            .map(line => ({
                batchId: line.batchId,
                materialType: line.material,
                weight: parseNum(line.weight),
                unitPrice: parseNum(line.unitPrice),
            }))
            .filter(line => line.batchId && line.weight > 0 && line.unitPrice > 0)

        if (saleLines.length === 0) {
            setError('Enter valid weight and unit price for at least one line.')
            return
        }

        setError('')
        setLoading(true)

        try {
            const result = await operationsApi.logSale({
                buyerId,
                lines: saleLines,
                date: selectedDate.toISOString(),
                approvePassport: isPassportApproved,
            })

            if (isPassportApproved && result.batches[0]?.digitalPassportId) {
                setSecurityHash(result.batches[0].digitalPassportId)
            }

            navigate({
                to: '/log-sale/success',
                search: {
                    batchId: result.batches[0]?.id || '',
                    batchNumber: result.batches[0]?.batchNumber || '',
                    buyerName: result.buyer.name,
                    totalAmount: String(result.totalAmount),
                    totalWeight: String(result.totalWeight),
                    lineCount: String(result.transactions.length),
                },
            })
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to record sale.')
        } finally {
            setLoading(false)
        }
    }

    // Calculations
    const totalWeight = lines.reduce((acc, curr) => acc + parseNum(curr.weight), 0)
    const totalSum = lines.reduce((acc, curr) => {
        const w = parseNum(curr.weight)
        const p = parseNum(curr.unitPrice)
        return acc + (w * p)
    }, 0)
    const vat = totalSum * 0.075

    const title = `Good Morning ${user?.fullName?.split(' ')[0] || 'there'}`
    const subtitle = 'Log new sales'

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-800 mb-1 font-display tracking-tight">{title}</h1>
                <p className="text-sm font-semibold text-slate-500 mt-1">{subtitle}</p>
            </div>

            <div className="bg-white rounded-[24px] border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
                )}

                {loadingData ? (
                    <p className="text-sm font-semibold text-slate-500">Loading buyers and batches...</p>
                ) : sellableBatches.length === 0 ? (
                    <p className="text-sm font-semibold text-slate-500">
                        No processed batches available. Record processing before logging a sale.
                    </p>
                ) : (
                    <>
                {/* Company Select */}
                <div className="space-y-2">
                    <label htmlFor="companySelect" className="text-sm font-bold text-slate-700">Buyer</label>
                    <div className="relative">
                        <select
                            id="companySelect"
                            value={buyerId}
                            onChange={e => setBuyerId(e.target.value)}
                            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl appearance-none text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                        >
                            {buyers.map(buyer => (
                                <option key={buyer.id} value={buyer.id}>{buyer.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    </div>
                </div>

                {/* Material Type Lines */}
                <div className="space-y-4">
                    <div className="space-y-4">
                        {lines.map((line, index) => {
                            const w = parseNum(line.weight)
                            const p = parseNum(line.unitPrice)
                            const lineTotal = w * p

                            return (
                                <div key={line.id} className="relative bg-[#F8FAFC] border border-slate-200/60 rounded-2xl p-5 pt-7 space-y-4">
                                    {/* Line Item Header / Verified Badge */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-extrabold text-blue-500 uppercase tracking-wider">
                                            MATERIAL LINE ITEM{lines.length > 1 ? ` ${index + 1}` : ''})
                                        </span>
                                        
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center gap-1.5 bg-[#EFF6FF] text-[#0256B2] text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-blue-100 select-none">
                                                <ShieldCheck className="w-3.5 h-3.5" />
                                                VERIFIED VIA PASSPORT
                                            </span>
                                            
                                            {lines.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeLine(line.id)}
                                                    className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                                    aria-label="Remove item"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Line Inputs Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.5fr_1.2fr_1fr_1fr_1.2fr] gap-4">
                                        {/* Material ID */}
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-extrabold text-slate-400 tracking-wider">MATERIAL ID</label>
                                            <div className="relative">
                                                <select
                                                    aria-label="Select Material ID"
                                                    value={line.batchId}
                                                    onChange={e => updateLine(line.id, 'batchId', e.target.value)}
                                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl appearance-none text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                                                >
                                                    {sellableBatches.map(batch => (
                                                        <option key={batch.id} value={batch.id}>
                                                            {batch.batchNumber}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Material Type */}
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-extrabold text-slate-400 tracking-wider">MATERIAL TYPE</label>
                                            <input
                                                type="text"
                                                aria-label="Material Type"
                                                value={line.material}
                                                readOnly
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-semibold text-sm focus:outline-none cursor-not-allowed"
                                            />
                                        </div>

                                        {/* Weight (QTY) */}
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-extrabold text-slate-400 tracking-wider">QTY (KG)</label>
                                            <input
                                                type="text"
                                                aria-label="Quantity"
                                                value={line.weight}
                                                onChange={e => updateLine(line.id, 'weight', e.target.value)}
                                                placeholder="0"
                                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue"
                                            />
                                        </div>

                                        {/* Unit Price */}
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-extrabold text-slate-400 tracking-wider">UNIT PRICE (₦)</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    aria-label="Unit Price"
                                                    value={line.unitPrice}
                                                    onChange={e => updateLine(line.id, 'unitPrice', e.target.value)}
                                                    placeholder="0"
                                                    className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-xs pointer-events-none">/ kg</span>
                                            </div>
                                        </div>

                                        {/* Sub-Total */}
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-extrabold text-slate-400 tracking-wider">SUB-TOTAL (₦)</label>
                                            <input
                                                type="text"
                                                aria-label="Sub-Total"
                                                value={formatNumber(lineTotal)}
                                                readOnly
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-bold text-sm focus:outline-none cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <button
                        type="button"
                        onClick={addLine}
                        className="flex items-center gap-1.5 text-xs font-bold text-[#3B82F6] hover:underline uppercase tracking-wider mt-2 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        + Add another output line
                    </button>
                </div>

                {/* Summary Totals: Weight sold, Total Sum, VAT */}
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

                {/* Digital Passport Card */}
                <div className="bg-[#EFF6FF] border-l-4 border-[#0256B2] rounded-r-2xl p-5 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0256B2] flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-blue-500/10">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-sm md:text-base leading-none">Digital Passport</h3>
                            <p className="text-xs text-slate-500 font-semibold mt-1">Add processing costs</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="processingCost" className="text-[10px] font-extrabold text-slate-500 tracking-wider">PROCESSING COST (N)</label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                id="processingCost"
                                value={processingCost}
                                readOnly
                                onClick={handleApprovePassport}
                                placeholder="0.00"
                                className="flex-1 px-4 py-3 bg-white hover:bg-slate-50/50 border border-slate-200 rounded-xl text-slate-700 font-bold text-sm focus:outline-none cursor-pointer transition-all"
                            />
                            <button
                                type="button"
                                onClick={handleApprovePassport}
                                className={`px-5 py-3 font-bold text-sm rounded-xl transition-all ${
                                    isPassportApproved 
                                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/10' 
                                    : 'bg-[#0256B2] hover:bg-[#014188] text-white shadow-md shadow-blue-500/10'
                                }`}
                            >
                                {isPassportApproved ? 'Approved' : 'Approve Digital Passport'}
                            </button>
                        </div>
                    </div>

                    {/* Hash generation note */}
                    <div className="flex items-center gap-2 bg-blue-50/50 border border-blue-100 rounded-xl p-3 text-xs text-blue-800/80 font-semibold">
                        <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>
                            {isPassportApproved 
                                ? `Security Hash: 0x${securityHash} generated successfully.`
                                : `Security Hash: ${securityHash} will be generated upon approval.`}
                        </span>
                    </div>
                </div>

                {/* Date Selection */}
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

                {/* Payment Method Banner */}
                <div className="flex items-center gap-3 bg-[#E8F5E9]/60 border border-emerald-100/50 rounded-2xl p-4">
                    <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600 flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">PAYMENT METHOD</p>
                        <p className="text-sm font-bold text-emerald-800">Settlement via Bank Transfer</p>
                    </div>
                </div>

                {/* Email Notification Banner */}
                <div className="flex items-center gap-3 bg-[#E8F5E9]/60 border-l-4 border-emerald-500 rounded-r-2xl p-4">
                    <MessageSquare className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <p className="text-xs md:text-[13px] font-bold text-emerald-800/90 leading-relaxed">
                        An email invoice link will be sent to the buyer after recording.
                    </p>
                </div>

                {/* Submission Actions */}
                <div className="space-y-4 pt-4">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-[#0256B2] hover:bg-[#014188] disabled:opacity-60 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                    >
                        <Send className="w-4 h-4" />
                        {loading ? 'Recording sale...' : 'Confirm Outbound & Send Email'}
                    </button>
                    
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={() => navigate({ to: '/dashboard' })}
                            className="text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors uppercase tracking-wider cursor-pointer"
                        >
                            Cancel & Return to Draft
                        </button>
                    </div>
                </div>
                    </>
                )}
            </div>
        </div>
    )
}

