import React, { useEffect, useState } from 'react'
import { Search, ChevronDown, ChevronLeft, ChevronRight, Filter, Clock, Hourglass, GitBranch, Calendar, TrendingUp, TrendingDown, Download, FileText, AlertTriangle, CheckCircle2, Beaker, Ban } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { operationsApi } from '../../../lib/api'
import type { Batch } from '../../../lib/types'

type TabType = 'Inbound' | 'Processing' | 'Outbound' | 'Flagged'
type ViewState = 'list' | 'inbound_success' | 'outbound_success'

const INBOUND_DATA = [
    { id: 'INB-99195', supplier: 'BioFeed Collective', date: 'Oct 23, 2023', material: 'rPET Clear-Blue', weight: '2,100.25', price: '850.00', status: 'Available' },
    { id: 'INB-99188', supplier: 'Roots & Shoots Inc.', date: 'Oct 23, 2023', material: 'PP', weight: '540.00', price: '880.00', status: 'Available' },
    { id: 'INB-99210', supplier: 'Chinomso Ekene', date: 'Oct 24, 2023', material: 'HDPE', weight: '1,240.00', price: '845.00', status: 'Available' },
    { id: 'INB-99210', supplier: 'Alhaji Dunkaru Bello', date: 'Oct 24, 2023', material: 'rPET Coloured', weight: '1,240.00', price: '845.00', status: 'Available' },
    { id: 'INB-99210', supplier: 'Shuaib Adeyeye', date: 'Oct 24, 2023', material: 'rPET Clear-Blue', weight: '1,240.00', price: '845.00', status: 'Available' },
    { id: 'INB-99210', supplier: 'Recycle Garb Ltd.', date: 'Oct 24, 2023', material: 'rPET Clear-Blue', weight: '1,240.00', price: '845.00', status: 'Available' },
    { id: 'INB-99210', supplier: 'Rekova Ltd.', date: 'Oct 24, 2023', material: 'rPET Clear-Blue', weight: '1,240.00', price: '845.00', status: 'Available' },
    { id: 'INB-99210', supplier: 'Aderonke Olabanku', date: 'Oct 24, 2023', material: 'HDPE Clear', weight: '1,240.00', price: '845.00', status: 'Available' },
    { id: 'INB-99210', supplier: 'Green Horizons Ltd.', date: 'Oct 24, 2023', material: 'Films & Nylons', weight: '1,240.00', price: '845.00', status: 'Available' },
    { id: 'INB-99208', supplier: 'AgroCore Systems', date: 'Oct 24, 2023', material: 'PP', weight: '850.50', price: '860.00', status: 'Consumed' },
]

const PROCESSING_DATA = [
    { id: 'PRO-4921-X', source: '12', date: 'Oct 18, 2023', material: 'rPET CB', input: '4,500.00', output: '4,212.00', yield: '93.6%', status: 'Ready' },
    { id: 'PRO-4920-Y', source: '8', date: 'Oct 17, 2023', material: 'rPET Brown', input: '2,100.00', output: '2,080.00', yield: '99.0%', status: 'FLAGGED' },
    { id: 'PRO-4899-A', source: '15', date: 'Oct 17, 2023', material: 'rPET Green', input: '10,240.50', output: '9,870.00', yield: '96.4%', status: 'Ready' },
    { id: 'PRO-4856-M', source: '4', date: 'Oct 16, 2023', material: 'PP', input: '1,200.00', output: '1,195.00', yield: '99.5%', status: 'Processing' },
    { id: 'PRO-4856-M', source: '4', date: 'Oct 16, 2023', material: 'HDPE', input: '1,200.00', output: '1,195.00', yield: '99.5%', status: 'Processing' },
]

const OUTBOUND_DATA = [
    { id: 'GreenCycle-88219', date: 'Oct 09 2023', material: 'rPET Clear-Blue', loads: '300', weight: '75,000', price: '600.00', buyer: 'Coca-Cola CCHB', status: 'PAID' },
    { id: 'GreenCycle-88219', date: 'Oct 15, 2023', material: 'rPET Clear-Blue', loads: '60', weight: '5000', price: '500.00', buyer: 'WeCyclers', status: 'FLAGGED' },
    { id: 'GreenCycle-88219', date: 'Oct 14, 2023', material: 'rPET Clear-Blue', loads: '380', weight: '80,000', price: '350.00', buyer: 'Chanjii Datti', status: 'PENDING' },
    { id: 'GreenCycle-88219', date: 'Oct 14, 2023', material: 'rPET Clear-Blue', loads: '221', weight: '67,000', price: '490.00', buyer: 'PolySmart', status: 'APPROVED' },
    { id: 'GreenCycle-88219', date: 'Oct 09 2023', material: 'rPET Clear-Blue', loads: '85', weight: '15000', price: '600.00', buyer: 'Create Sales', status: 'AVAILABLE' },
]

const FLAGGED_DATA = [
    { id: 'INB-90421', type: 'Inbound', reason: 'Weight loss >5%', icon: 'clock', date: 'Oct 24, 09:42 AM' },
    { id: 'PRO-90418', type: 'Processing', reason: 'Purity deviation', icon: 'beaker', date: 'Oct 24, 08:15 AM' },
    { id: 'GreenCycle-90399', type: 'Outbound', reason: 'Contamination risk', icon: 'ban', date: 'Oct 23, 04:50 PM' },
    { id: 'INB-90382', type: 'Inbound', reason: 'Sensor malfunction', icon: 'alert', date: 'Oct 23, 11:20 AM' },
]

export const BatchList: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('Inbound')
    const [searchQuery, setSearchQuery] = useState('')
    const [apiBatches, setApiBatches] = useState<Batch[]>([])
    
    const [viewState, setViewState] = useState<ViewState>('list')
    const [selectedInboundIds, setSelectedInboundIds] = useState<string[]>([])
    const [selectedProcessingIds, setSelectedProcessingIds] = useState<string[]>([])

    useEffect(() => {
        operationsApi.getBatches()
            .then(res => setApiBatches(res.batches))
            .catch(() => {})
    }, [])

    const inboundRows = apiBatches
        .filter(batch => batch.status === 'INBOUND')
        .map(batch => ({
            id: batch.id,
            label: batch.batchNumber,
            supplier: 'Pending linkage',
            date: new Date(batch.createdAt).toLocaleDateString(),
            material: '—',
            weight: '—',
            price: '—',
            status: 'Available',
        }))

    const inboundData = inboundRows.length > 0
        ? inboundRows
        : INBOUND_DATA.map(row => ({
            id: row.id,
            label: row.id,
            supplier: row.supplier,
            date: row.date,
            material: row.material,
            weight: row.weight,
            price: row.price,
            status: row.status,
        }))

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab)
        setViewState('list')
    }



    const toggleProcessingSelection = (id: string) => {
        setSelectedProcessingIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    const toggleAllProcessing = () => {
        if (selectedProcessingIds.length === PROCESSING_DATA.length) {
            setSelectedProcessingIds([])
        } else {
            setSelectedProcessingIds(PROCESSING_DATA.map(d => d.id))
        }
    }

    const renderStats = () => {
        if (viewState !== 'list') return null

        switch (activeTab) {
            case 'Inbound':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">TOTAL INBOUND</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-slate-800 font-display">14,280</span>
                                    <span className="text-emerald-500 text-xs font-bold flex items-center gap-0.5">
                                        <TrendingUp className="w-3.5 h-3.5" /> ~12%
                                    </span>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold mt-3">KG</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">AVERAGE YIELD</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-slate-800 font-display">85%</span>
                                    <span className="text-red-500 text-xs font-bold flex items-center gap-0.5">
                                        <TrendingDown className="w-3.5 h-3.5" /> ~3%
                                    </span>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium mt-3">below 90% target</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">UNPROCESSED</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl font-bold text-slate-800 font-display">2,405</span>
                                    <Hourglass className="w-5 h-5 text-amber-500" />
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium mt-3">awaiting supervisor sign-off</p>
                        </div>
                    </div>
                )
            case 'Processing':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">TOTAL INBOUND</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-slate-800 font-display">14,280</span>
                                    <span className="text-emerald-500 text-xs font-bold flex items-center gap-0.5">
                                        <TrendingUp className="w-3.5 h-3.5" /> ~12%
                                    </span>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold mt-3">KG</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">AVERAGE YIELD</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-slate-800 font-display">85%</span>
                                    <span className="text-red-500 text-xs font-bold flex items-center gap-0.5">
                                        <TrendingDown className="w-3.5 h-3.5" /> ~3%
                                    </span>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium mt-3">below 90% target</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">UNPROCESSED</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl font-bold text-slate-800 font-display">2,405</span>
                                    <Hourglass className="w-5 h-5 text-amber-500" />
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium mt-3">awaiting supervisor sign-off</p>
                        </div>
                    </div>
                )
            case 'Outbound':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">TOTAL INBOUND</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-slate-800 font-display">14,280</span>
                                    <span className="text-emerald-500 text-xs font-bold flex items-center gap-0.5">
                                        <TrendingUp className="w-3.5 h-3.5" /> ~12%
                                    </span>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold mt-3">KG</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">AVERAGE YIELD</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-slate-800 font-display">85%</span>
                                    <span className="text-red-500 text-xs font-bold flex items-center gap-0.5">
                                        <TrendingDown className="w-3.5 h-3.5" /> ~3%
                                    </span>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium mt-3">below 90% target</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">UNPROCESSED</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl font-bold text-slate-800 font-display">2,405</span>
                                    <Hourglass className="w-5 h-5 text-amber-500" />
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium mt-3">awaiting supervisor sign-off</p>
                        </div>
                    </div>
                )
            case 'Flagged':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-rose-50/15 p-6 rounded-2xl border-l-[6px] border-l-red-500 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
                            <div>
                                <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-2">TOTAL FLAGGED</p>
                                <span className="text-4xl font-bold text-slate-800 font-display">24</span>
                            </div>
                            <div className="space-y-3 mt-3">
                                <p className="text-slate-400 text-[10px] font-medium">Critical attention required</p>
                                <p className="text-red-500 text-xs font-bold flex items-center gap-1">
                                    <AlertTriangle className="w-3.5 h-3.5" /> +12% from last shift
                                </p>
                            </div>
                        </div>
                        <div className="md:col-span-2 bg-slate-50 border border-slate-100 p-6 rounded-2xl flex flex-col justify-between">
                            <p className="text-sm font-semibold text-slate-700 mb-4">By type breakdown</p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
                                    <p className="text-[9px] font-bold text-amber-600 mb-2 uppercase tracking-wide">WEIGHT MISMATCH</p>
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold text-slate-800 font-display">09</span>
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-3">
                                            <div className="h-full bg-amber-500 w-[50%] rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
                                    <p className="text-[9px] font-bold text-red-500 mb-2 uppercase tracking-wide">CONTAMINATION</p>
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold text-slate-800 font-display">07</span>
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-3">
                                            <div className="h-full bg-red-500 w-[35%] rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
                                    <p className="text-[9px] font-bold text-emerald-600 mb-2 uppercase tracking-wide">YIELD VARIANCE</p>
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold text-slate-800 font-display">08</span>
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-3">
                                            <div className="h-full bg-emerald-500 w-[45%] rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
        }
    }

    const renderTable = () => {
        switch (activeTab) {
            case 'Inbound':
                return (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/70 border-b border-slate-200">
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-6">BATCH ID</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">SUPPLIER</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">DATE</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">MATERIAL</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">WEIGHT (KG)</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">PRICE (N/KG)</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right pr-6">STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {inboundData.map((row, idx) => (
                                <tr key={`${row.id}-${idx}`} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 font-bold text-brand-blue cursor-pointer pl-6">
                                        <Link to="/batches/$batchId" params={{ batchId: row.id }} className="hover:underline">{row.label}</Link>
                                    </td>
                                    <td className="p-4 font-medium text-slate-600">{row.supplier}</td>
                                    <td className="p-4 text-slate-500">{row.date}</td>
                                    <td className="p-4 text-slate-500">{row.material}</td>
                                    <td className="p-4 font-bold text-slate-700">{row.weight}</td>
                                    <td className="p-4 text-slate-500">{row.price}</td>
                                    <td className="p-4 text-right pr-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                                            row.status === 'Consumed' 
                                                ? 'bg-slate-100 text-slate-500' 
                                                : 'bg-emerald-100 text-emerald-600'
                                        }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            case 'Processing':
                return (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/70 border-b border-slate-200">
                                <th className="p-4 w-12 pl-6">
                                    <input 
                                        type="checkbox" 
                                        className="rounded text-brand-blue border-slate-300 focus:ring-brand-blue/20" 
                                        checked={selectedProcessingIds.length > 0 && selectedProcessingIds.length === PROCESSING_DATA.length} 
                                        onChange={toggleAllProcessing} 
                                    />
                                </th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">BATCH ID</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">SOURCE</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">DATE</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">MATERIAL</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">INPUT (KG)</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">OUTPUT (KG)</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">YIELD %</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right pr-6">STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {PROCESSING_DATA.map((row, idx) => (
                                <tr key={`${row.id}-${idx}`} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 pl-6">
                                        <input 
                                            type="checkbox" 
                                            className="rounded text-brand-blue border-slate-300 focus:ring-brand-blue/20" 
                                            checked={selectedProcessingIds.includes(row.id)} 
                                            onChange={() => toggleProcessingSelection(row.id)} 
                                        />
                                    </td>
                                    <td className="p-4 font-bold text-brand-blue cursor-pointer">
                                        <Link to="/batches/$batchId" params={{ batchId: row.id }} className="hover:underline">{row.id}</Link>
                                    </td>
                                    <td className="p-4">
                                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600">
                                            {row.source}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-500">{row.date}</td>
                                    <td className="p-4 text-slate-500">{row.material}</td>
                                    <td className="p-4 font-medium text-slate-600">{row.input}</td>
                                    <td className="p-4 font-medium text-slate-600">{row.output}</td>
                                    <td className="p-4 font-bold text-emerald-600">{row.yield}</td>
                                    <td className="p-4 text-right pr-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                                            row.status === 'Ready' 
                                                ? 'bg-emerald-100 text-emerald-600' 
                                                : row.status === 'FLAGGED'
                                                    ? 'bg-red-100 text-red-500 uppercase'
                                                    : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            case 'Outbound':
                return (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/70 border-b border-slate-200">
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-6">BATCH ID</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">DATE</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">MATERIAL</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">LOADS</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">WEIGHT (KG)</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">PRICE (N/KG)</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">BUYER</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right pr-6">STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {OUTBOUND_DATA.map((row, idx) => (
                                <tr key={`${row.id}-${idx}`} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 font-bold text-brand-blue cursor-pointer pl-6 hover:underline">
                                        <Link to="/batches/$batchId" params={{ batchId: row.id }}>{row.id}</Link>
                                    </td>
                                    <td className="p-4 text-slate-500 text-xs">{row.date}</td>
                                    <td className="p-4 text-slate-500 text-xs">{row.material}</td>
                                    <td className="p-4">
                                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600">
                                            {row.loads}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-700 font-bold text-xs">{row.weight}</td>
                                    <td className="p-4 text-slate-500 text-xs">{row.price}</td>
                                    <td className={`p-4 text-xs ${row.buyer === 'Create Sales' ? 'italic text-slate-400 font-medium' : 'font-bold text-slate-800'}`}>
                                        {row.buyer}
                                    </td>
                                    <td className="p-4 text-right pr-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                            row.status === 'PAID'
                                                ? 'bg-emerald-100 text-emerald-600'
                                                : row.status === 'FLAGGED'
                                                    ? 'bg-red-100 text-red-500'
                                                    : row.status === 'PENDING'
                                                        ? 'bg-amber-100 text-amber-600'
                                                        : row.status === 'APPROVED'
                                                            ? 'bg-blue-100 text-blue-600'
                                                            : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            case 'Flagged':
                return (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/70 border-b border-slate-200">
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-6">BATCH ID</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">TYPE</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">FLAG REASON</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">DATE FLAGGED</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right pr-6">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {FLAGGED_DATA.map((row, idx) => (
                                <tr key={`${row.id}-${idx}`} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 font-bold text-brand-blue cursor-pointer pl-6 hover:underline">
                                        <Link to="/batches/$batchId" params={{ batchId: row.id }}>{row.id}</Link>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                                            row.type === 'Inbound' 
                                                ? 'bg-blue-100 text-blue-600' 
                                                : row.type === 'Processing' 
                                                    ? 'bg-emerald-100 text-emerald-600' 
                                                    : 'bg-amber-100 text-amber-600'
                                        }`}>
                                            {row.type}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className={`flex items-center gap-2 font-bold text-xs ${
                                            row.icon === 'beaker' ? 'text-amber-650' : 'text-red-500'
                                        }`}>
                                            {row.icon === 'clock' && <Clock className="w-4 h-4 text-red-500" />}
                                            {row.icon === 'beaker' && <Beaker className="w-4 h-4 text-amber-500" />}
                                            {row.icon === 'ban' && <Ban className="w-4 h-4 text-red-500" />}
                                            {row.icon === 'alert' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                                            {row.reason}
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-500 text-xs">{row.date}</td>
                                    <td className="p-4 text-right pr-6">
                                        <Link to="/batches/$batchId" params={{ batchId: row.id }} className="text-brand-blue font-bold text-xs hover:underline cursor-pointer">
                                            Resolve
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
        }
    }

    const renderInboundSuccess = () => {
        const selectedData = INBOUND_DATA.filter(d => selectedInboundIds.includes(d.id))
        const totalWeight = selectedData.reduce((acc, curr) => acc + parseFloat(curr.weight.replace(/,/g, '')), 0)

        return (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-emerald-700">PROD-20250415-001 Created</h2>
                </div>
                <p className="text-slate-600 mb-8 ml-14">Processing batch <span className="font-bold text-brand-blue">PROC-20250415-001</span> created from {selectedData.length} inbound batches.</p>

                <div className="bg-brand-blue/5 rounded-xl border border-brand-blue/10 p-6 flex items-center justify-between mb-8">
                    <div>
                        <p className="text-[10px] font-bold text-brand-blue uppercase tracking-wider mb-1">MATERIAL</p>
                        <p className="text-xl font-medium text-slate-800">rPET Clear-Blue</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-brand-blue uppercase tracking-wider mb-1">TOTAL WEIGHT</p>
                        <p className="text-xl font-medium text-slate-800">{totalWeight.toLocaleString()} kg</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-brand-blue uppercase tracking-wider mb-1">SOURCE</p>
                        <p className="text-xl font-medium text-slate-800">{selectedData.length} batches</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-brand-blue uppercase tracking-wider mb-1">SYSTEM ID</p>
                        <p className="text-xl font-bold text-brand-blue">PROC-20250415-001</p>
                    </div>
                </div>

                <div className="border border-slate-100 rounded-xl overflow-hidden mb-8">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white border-b border-slate-100">
                                <th className="p-4 text-[10px] font-bold text-slate-800 uppercase tracking-wider">BATCH ID</th>
                                <th className="p-4 text-[10px] font-bold text-slate-800 uppercase tracking-wider">SUPPLIER</th>
                                <th className="p-4 text-[10px] font-bold text-slate-800 uppercase tracking-wider">DATE</th>
                                <th className="p-4 text-[10px] font-bold text-slate-800 uppercase tracking-wider">WEIGHT</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                            {selectedData.map(row => (
                                <tr key={row.id}>
                                    <td className="p-4 font-bold text-brand-blue text-xs">{row.id.replace('INB', 'B')}</td>
                                    <td className="p-4 text-slate-600 font-medium text-xs">{row.supplier}</td>
                                    <td className="p-4 text-slate-500 text-xs">{row.date}</td>
                                    <td className="p-4 font-bold text-slate-800 text-xs">{row.weight} kg</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end gap-4">
                    <button className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-bold text-sm flex items-center gap-2 hover:bg-slate-50">
                        <Download className="w-4 h-4" /> Export PDF
                    </button>
                    <button 
                        onClick={() => {
                            setViewState('list')
                            setSelectedInboundIds([])
                        }}
                        className="px-6 py-2.5 rounded-lg bg-brand-blue text-white font-bold text-sm hover:bg-brand-blue/90"
                    >
                        Create New Batch
                    </button>
                </div>
            </div>
        )
    }

    const renderOutboundSuccess = () => {
        const successRows = [
            { id: 'PRO-4921-X', material: 'rPET CB', date: 'Apr 14, 2025', weight: '5000' },
            { id: 'PRO-4921-X', material: 'rPET CB', date: 'Apr 15, 2025', weight: '5000' },
            { id: 'PRO-4921-X', material: 'rPET CB', date: 'Apr 15, 2025', weight: '5000' },
            { id: 'PRO-4921-X', material: 'HDPE', date: 'Apr 15, 2025', weight: '1500' },
            { id: 'PRO-4921-X', material: 'HDPE', date: 'Apr 15, 2025', weight: '1500' },
        ]

        return (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-emerald-700 font-display">GREENCYCLE-20250415-001 Outbound Created</h2>
                </div>
                <p className="text-slate-650 mb-8 ml-14 font-medium">
                    Outbound batch <span className="font-bold text-brand-blue">Greencycle-20250415-001</span> created from 10 production batches.
                </p>

                <div className="bg-[#EFF6FF]/60 border-l-[6px] border-l-brand-blue rounded-xl border border-blue-100 p-6 flex items-center justify-between mb-8">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">MATERIAL</p>
                        <p className="text-xl font-bold text-slate-800 font-display">rPET Clear-Blue</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">TOTAL WEIGHT</p>
                        <p className="text-xl font-bold text-slate-800 font-display">12,240 kg</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">SOURCE</p>
                        <p className="text-xl font-bold text-slate-800 font-display">10 batches</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">SYSTEM ID</p>
                        <p className="text-xl font-bold text-brand-blue font-display">GREENCYCLE-20250415-001</p>
                    </div>
                </div>

                <div className="mb-8">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">BATCH ID</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">MATERIAL</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">DATE</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">WEIGHT (KG)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                            {successRows.map((row, idx) => (
                                <tr key={`${row.id}-${idx}`}>
                                    <td className="p-4 font-bold text-brand-blue text-xs cursor-pointer hover:underline">
                                        <Link to="/batches/$batchId" params={{ batchId: row.id }}>{row.id}</Link>
                                    </td>
                                    <td className="p-4 text-slate-500 text-xs">{row.material}</td>
                                    <td className="p-4 text-slate-500 text-xs">{row.date}</td>
                                    <td className="p-4 font-bold text-slate-800 text-xs">{row.weight}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end gap-4">
                    <button className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-bold text-sm flex items-center gap-2 hover:bg-slate-50 bg-white shadow-sm transition-colors">
                        <FileText className="w-4 h-4 text-slate-500" /> Export PDF
                    </button>
                    <button 
                        onClick={() => {
                            setViewState('list')
                            setSelectedProcessingIds([])
                        }}
                        className="px-6 py-2.5 rounded-lg bg-brand-blue text-white font-bold text-sm hover:bg-brand-blue/90 shadow-sm transition-colors"
                    >
                        Create New Batch
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-slate-100">
                {(['Inbound', 'Processing', 'Outbound', 'Flagged'] as TabType[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`pb-4 px-1 text-sm font-semibold transition-all relative ${
                            activeTab === tab 
                                ? (tab === 'Flagged' ? 'text-red-500 border-b-2 border-red-500' : 'text-brand-blue border-b-2 border-brand-blue') 
                                : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {viewState === 'inbound_success' && renderInboundSuccess()}
            {viewState === 'outbound_success' && renderOutboundSuccess()}

            {viewState === 'list' && (
                <>
                    {/* Alert Banner */}
                    {activeTab === 'Processing' && (
                        <div className="bg-red-50/70 border border-red-100 border-l-[6px] border-l-red-500 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-100 rounded-xl text-red-600">
                                    <AlertTriangle className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">High contamination - Blocked from outbound</p>
                                    <p className="text-xs text-slate-500 font-medium">Batch ECO-0115-0042 • 18% waste</p>
                                </div>
                            </div>
                            <button className="text-sm font-bold text-red-650 hover:text-red-700 transition-colors px-4 py-2 hover:bg-red-50 rounded-lg">
                                Resolve Now
                            </button>
                        </div>
                    )}

                    {/* Render Stats */}
                    {renderStats()}

                    {/* Action Bar */}
                    {activeTab === 'Inbound' ? (
                        <div className="flex gap-4 items-center w-full">
                            <div className="relative flex-1 max-w-lg">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search batch ID or supplier..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/10"
                                />
                            </div>

                            <div className="relative min-w-[160px]">
                                <select className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl bg-white text-sm appearance-none font-medium text-slate-600 focus:outline-none cursor-pointer">
                                    <option>Status</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>

                            <div className="relative min-w-[160px]">
                                <select className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl bg-white text-sm appearance-none font-medium text-slate-600 focus:outline-none cursor-pointer">
                                    <option>Filter By</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    ) : activeTab === 'Processing' ? (
                        <div className="flex gap-4 items-center w-full justify-between">
                            <div className="flex gap-4 items-center flex-1 max-w-2xl">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search batch ID or source.."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/10"
                                    />
                                </div>

                                <div className="relative min-w-[160px]">
                                    <select className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl bg-white text-sm appearance-none font-medium text-slate-600 focus:outline-none cursor-pointer">
                                        <option>FILTER BY</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            <button 
                                disabled={selectedProcessingIds.length === 0}
                                onClick={() => setViewState('outbound_success')}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors ${
                                    selectedProcessingIds.length > 0 
                                        ? 'bg-brand-blue text-white hover:bg-brand-blue/90 cursor-pointer' 
                                        : 'bg-brand-blue text-white opacity-85 cursor-not-allowed'
                                }`}
                            >
                                <GitBranch className="w-4 h-4 text-white" /> Create Out-Bound Batch
                            </button>
                        </div>
                    ) : activeTab === 'Outbound' ? (
                        <div className="flex gap-4 items-center w-full justify-between">
                            <div className="flex gap-4 items-center flex-1 max-w-2xl">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search batch ID"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/10"
                                    />
                                </div>

                                <div className="relative min-w-[160px]">
                                    <select className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl bg-white text-sm appearance-none font-medium text-slate-600 focus:outline-none cursor-pointer">
                                        <option>Status</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 cursor-pointer shadow-sm hover:bg-slate-50/50 transition-colors">
                                <Calendar className="w-4 h-4 text-slate-500" />
                                <span>Oct 1 - Oct 14, 2023</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-4 items-center w-full justify-between">
                            <div className="flex gap-4 items-center flex-1 max-w-2xl">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search batch ID or reason..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/10"
                                    />
                                </div>

                                <div className="relative min-w-[140px]">
                                    <select className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl bg-white text-sm appearance-none font-medium text-slate-600 focus:outline-none cursor-pointer">
                                        <option>Status</option>
                                    </select>
                                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            <button className="bg-brand-blue hover:bg-brand-blue/90 text-white flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors">
                                <Filter className="w-4 h-4 text-white" /> Advanced Filters
                            </button>
                        </div>
                    )}

                    {/* Table Area */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        {renderTable()}

                        {/* Pagination */}
                        <div className="p-4 bg-white border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-bold px-6">
                            <p>Showing {activeTab === 'Inbound' ? '5' : activeTab === 'Outbound' ? '4' : (activeTab === 'Processing' ? PROCESSING_DATA.length : FLAGGED_DATA.length)} of 24 batches</p>
                            <div className="flex gap-2">
                                <button className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50 transition-all bg-slate-50/50">
                                    <ChevronLeft className="w-4 h-4 text-slate-600" />
                                </button>
                                <button className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50 transition-all bg-slate-50/50">
                                    <ChevronRight className="w-4 h-4 text-slate-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
