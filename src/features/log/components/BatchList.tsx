import React, { useState } from 'react'
import { Search, ChevronDown, Plus, ChevronLeft, ChevronRight, Filter, Users, Clock, TrendingUp, TrendingDown, Download, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'

type TabType = 'Inbound' | 'Processing' | 'Outbound' | 'Flagged'
type ViewState = 'list' | 'inbound_success' | 'outbound_success'

const INBOUND_DATA = [
    { id: 'INB-99195', supplier: 'BioFeed Collective', date: 'Oct 23, 2023', material: 'rPET Clear-Blue', weight: '2,100.25', price: '850.00', status: 'Available' },
    { id: 'INB-99188', supplier: 'Roots & Shoots Inc.', date: 'Oct 23, 2023', material: 'PP', weight: '540.00', price: '880.00', status: 'Available' },
    { id: 'INB-99210', supplier: 'Green Horizons Ltd.', date: 'Oct 24, 2023', material: 'HDPE', weight: '1,240.00', price: '845.00', status: 'Available' },
    { id: 'INB-99211', supplier: 'WeCyclers Ltd.', date: 'Oct 24, 2023', material: 'rPET Coloured', weight: '1,240.00', price: '845.00', status: 'Available' },
    { id: 'INB-99212', supplier: 'Green Recycle Ltd.', date: 'Oct 24, 2023', material: 'rPET Clear-Blue', weight: '1,240.00', price: '845.00', status: 'Available' },
    { id: 'INB-99213', supplier: 'Recycle Garb Ltd.', date: 'Oct 24, 2023', material: 'rPET Clear-Blue', weight: '1,240.00', price: '845.00', status: 'Available' },
    { id: 'INB-99214', supplier: 'Rekova Ltd.', date: 'Oct 24, 2023', material: 'rPET Clear-Blue', weight: '1,240.00', price: '845.00', status: 'Available' },
    { id: 'INB-99215', supplier: 'Chanjii Datti Ltd.', date: 'Oct 24, 2023', material: 'HDPE Clear', weight: '1,240.00', price: '845.00', status: 'Available' },
    { id: 'INB-99216', supplier: 'AgroCore Systems', date: 'Oct 24, 2023', material: 'PP', weight: '850.50', price: '860.00', status: 'Consumed' },
]

const PROCESSING_DATA = [
    { id: 'PRO-4921-X', source: '12', date: 'Oct 18, 2023', material: 'rPET CB', input: '4,500.00', output: '4,212.00', yield: '93.6%', status: 'Ready' },
    { id: 'PRO-4920-Y', source: '8', date: 'Oct 17, 2023', material: 'rPET Brown', input: '2,100.00', output: '2,080.00', yield: '99.0%', status: 'FLAGGED' },
    { id: 'PRO-4899-A', source: '15', date: 'Oct 17, 2023', material: 'rPET Green', input: '10,240.50', output: '9,870.00', yield: '96.4%', status: 'Ready' },
    { id: 'PRO-4856-M', source: '4', date: 'Oct 16, 2023', material: 'PP', input: '1,200.00', output: '1,195.00', yield: '99.5%', status: 'Processing' },
    { id: 'PRO-4857-M', source: '4', date: 'Oct 16, 2023', material: 'HDPE', input: '1,200.00', output: '1,195.00', yield: '99.5%', status: 'Processing' },
]

const OUTBOUND_DATA = [
    { id: 'GreenCycle-88219', date: 'Oct 09, 2023', material: 'rPET Clear-Blue', loads: '5', weight: '5000kg', price: '600.00', buyer: 'Coca-Cola CCHB', status: 'PAID' },
    { id: 'GreenCycle-88220', date: 'Oct 15, 2023', material: 'rPET Clear-Blue', loads: '5', weight: '5000kg', price: '500.00', buyer: 'WeCyclers', status: 'FLAGGED' },
    { id: 'GreenCycle-88221', date: 'Oct 14, 2023', material: 'rPET Clear-Blue', loads: '5', weight: '5000kg', price: '350.00', buyer: 'Chanjii Datti', status: 'PENDING' },
    { id: 'GreenCycle-88222', date: 'Oct 14, 2023', material: 'rPET Clear-Blue', loads: '5', weight: '5000kg', price: '490.00', buyer: 'PolySmart', status: 'APPROVED' },
    { id: 'GreenCycle-88223', date: 'Oct 09, 2023', material: 'rPET Clear-Blue', loads: '5', weight: '5000kg', price: '600.00', buyer: 'Coca-Cola CCHB', status: 'PAID' },
]

const FLAGGED_DATA = [
    { id: 'INB-90421', type: 'Inbound', reason: 'Weight loss >5%', icon: 'scale', date: 'Oct 24, 09:42 AM' },
    { id: 'PRO-90418', type: 'Processing', reason: 'Purity deviation', icon: 'beaker', date: 'Oct 24, 08:15 AM' },
    { id: 'GreenCycle-90399', type: 'Outbound', reason: 'Contamination risk', icon: 'ban', date: 'Oct 23, 04:50 PM' },
]

export const BatchList: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('Inbound')
    const [searchQuery, setSearchQuery] = useState('')
    
    const [viewState, setViewState] = useState<ViewState>('list')
    const [selectedInboundIds, setSelectedInboundIds] = useState<string[]>([])
    const [selectedProcessingIds, setSelectedProcessingIds] = useState<string[]>([])

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab)
        setViewState('list')
    }

    const toggleInboundSelection = (id: string) => {
        setSelectedInboundIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    const toggleAllInbound = () => {
        if (selectedInboundIds.length === INBOUND_DATA.length) {
            setSelectedInboundIds([])
        } else {
            setSelectedInboundIds(INBOUND_DATA.map(d => d.id))
        }
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">TOTAL INBOUND</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-slate-800">14,280</span>
                                <span className="text-green-500 text-xs font-bold flex items-center">
                                    <TrendingUp className="w-3 h-3 mr-0.5" /> ~12%
                                </span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold mt-1">KG</p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">UNPROCESSED</p>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-slate-800">2,405</span>
                                <div className="bg-amber-50 p-1.5 rounded-lg text-amber-500">
                                    <Clock className="w-4 h-4" />
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase italic">awaiting supervisor sign-off</p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">AVG PRICE</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-slate-800">₦850</span>
                                <span className="text-red-500 text-xs font-bold flex items-center">
                                    <TrendingDown className="w-3 h-3 mr-0.5" /> ~3%
                                </span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold mt-1">per kg across all suppliers</p>
                        </div>
                        <div className="bg-emerald-50/50 p-5 rounded-2xl border-2 border-emerald-100 shadow-sm">
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-2">UNIQUE SUPPLIERS</p>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-emerald-700">48</span>
                                <div className="bg-emerald-100 p-1.5 rounded-lg text-emerald-600">
                                    <Users className="w-4 h-4" />
                                </div>
                            </div>
                            <p className="text-[10px] text-emerald-600/70 font-semibold mt-1">active in the current cycle</p>
                        </div>
                    </div>
                )
            case 'Processing':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">TOTAL PROCESSED</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-slate-800">1,284</span>
                                <span className="text-slate-400 text-xs font-bold ml-1">Units</span>
                            </div>
                        </div>
                        <div className="bg-emerald-50/30 p-5 rounded-2xl border border-emerald-100 shadow-sm">
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-2">AVERAGE YIELD</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-emerald-700">94.2%</span>
                                <span className="text-green-500 text-xs font-bold flex items-center">
                                    +1.2% vs LW
                                </span>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">PENDING OUTBOUND</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-slate-800">42</span>
                                <span className="text-slate-400 text-xs font-bold ml-1">Batches</span>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">UNIQUE BATCHES</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-slate-800">156</span>
                                <span className="text-slate-400 text-xs font-bold ml-1">This month</span>
                            </div>
                        </div>
                    </div>
                )
            case 'Outbound':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">TOTAL KG SOLD</p>
                            <span className="text-2xl font-bold text-slate-800">12,840</span>
                        </div>
                        <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 shadow-sm">
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-2">AVAILABLE KG</p>
                            <span className="text-2xl font-bold text-emerald-700">8,450</span>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">PENDING PAYMENTS</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-slate-800">42</span>
                                <span className="text-slate-400 text-xs font-bold ml-1">Batches</span>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">SALES PRICE NGN</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-slate-800">700/kg</span>
                                <span className="text-slate-400 text-[10px] font-bold ml-1 uppercase">This month</span>
                            </div>
                        </div>
                    </div>
                )
            case 'Flagged':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-2xl border-l-[6px] border-l-red-500 border border-slate-200 shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">TOTAL FLAGGED</p>
                            <div className="flex items-center gap-4">
                                <span className="text-5xl font-bold text-slate-800 leading-none tracking-tight font-display">24</span>
                                <div className="space-y-1">
                                    <p className="text-slate-500 text-xs font-medium">Critical attention required</p>
                                    <p className="text-red-500 text-xs font-bold flex items-center">
                                        <AlertTriangle className="w-3.5 h-3.5 mr-1" /> +12% from last shift
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">By type breakdown</p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase">WEIGHT MISMATCH</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-bold text-slate-800">09</span>
                                        <div className="h-1.5 w-12 bg-slate-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-500 w-[40%] rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase">CONTAMINATION</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-bold text-slate-800">07</span>
                                        <div className="h-1.5 w-12 bg-slate-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-red-500 w-[30%] rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase">YIELD VARIANCE</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-bold text-slate-800">08</span>
                                        <div className="h-1.5 w-12 bg-slate-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 w-[35%] rounded-full"></div>
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
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 w-12"><input type="checkbox" className="rounded text-brand-blue" checked={selectedInboundIds.length > 0 && selectedInboundIds.length === INBOUND_DATA.length} onChange={toggleAllInbound} /></th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">BATCH ID</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">SUPPLIER</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">DATE</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">MATERIAL</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">WEIGHT (KG)</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">PRICE (N/KG)</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {INBOUND_DATA.map((row) => (
                                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4"><input type="checkbox" className="rounded text-brand-blue" checked={selectedInboundIds.includes(row.id)} onChange={() => toggleInboundSelection(row.id)} /></td>
                                    <td className="p-4 font-bold text-brand-blue cursor-pointer">{row.id}</td>
                                    <td className="p-4 font-medium text-slate-600">{row.supplier}</td>
                                    <td className="p-4 text-slate-500">{row.date}</td>
                                    <td className="p-4 text-slate-500">{row.material}</td>
                                    <td className="p-4 font-bold text-slate-700">{row.weight}</td>
                                    <td className="p-4 text-slate-600 text-center">{row.price}</td>
                                    <td className="p-4 text-right">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${row.status === 'Consumed' ? 'bg-slate-100 text-slate-500' : 'bg-emerald-100 text-emerald-600'}`}>{row.status}</span>
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
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 w-12"><input type="checkbox" className="rounded text-brand-blue" checked={selectedProcessingIds.length > 0 && selectedProcessingIds.length === PROCESSING_DATA.length} onChange={toggleAllProcessing} /></th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">BATCH ID</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">SOURCE</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">DATE</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">MATERIAL</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">INPUT (KG)</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">OUTPUT (KG)</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">YIELD %</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {PROCESSING_DATA.map((row) => (
                                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4"><input type="checkbox" className="rounded text-brand-blue" checked={selectedProcessingIds.includes(row.id)} onChange={() => toggleProcessingSelection(row.id)} /></td>
                                    <td className="p-4 font-bold text-brand-blue cursor-pointer">{row.id}</td>
                                    <td className="p-4"><span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600">{row.source}</span></td>
                                    <td className="p-4 text-slate-500">{row.date}</td>
                                    <td className="p-4 text-slate-500">{row.material}</td>
                                    <td className="p-4 font-medium text-slate-600">{row.input}</td>
                                    <td className="p-4 font-medium text-slate-600">{row.output}</td>
                                    <td className="p-4 font-bold text-emerald-600">{row.yield}</td>
                                    <td className="p-4 text-right">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${row.status === 'Consumed' ? 'bg-slate-100 text-slate-500' :
                                                row.status === 'FLAGGED' ? 'bg-red-100 text-red-500' :
                                                row.status === 'Processing' ? 'bg-slate-100 text-slate-500' : 'bg-emerald-100 text-emerald-600'
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
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">BATCH ID</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">DATE</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">MATERIAL</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">LOADS</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">WEIGHT</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">PRICE (N/KG)</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">BUYER</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {OUTBOUND_DATA.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 font-bold text-brand-blue">{row.id}</td>
                                    <td className="p-4 text-slate-500 text-xs">{row.date}</td>
                                    <td className="p-4 text-slate-500 text-xs">{row.material}</td>
                                    <td className="p-4"><span className="bg-slate-100 px-2.5 py-1 rounded text-xs font-bold text-slate-400">{row.loads}</span></td>
                                    <td className="p-4 text-slate-600 font-medium text-xs font-bold">{row.weight}</td>
                                    <td className="p-4 text-slate-500 text-xs text-center">{row.price}</td>
                                    <td className="p-4 font-bold text-slate-800 text-xs">{row.buyer}</td>
                                    <td className="p-4 text-right">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${row.status === 'APPROVED' || row.status === 'PAID' ? 'bg-emerald-100 text-emerald-600' :
                                                row.status === 'FLAGGED' ? 'bg-red-100 text-red-500' : 'bg-amber-100 text-amber-600'
                                            }`}>
                                            • {row.status}
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
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">BATCH ID</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">TYPE</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">FLAG REASON</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">DATE FLAGGED</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {FLAGGED_DATA.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 font-bold text-brand-blue">{row.id}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.type === 'Inbound' ? 'bg-blue-50 text-blue-600' :
                                                row.type === 'Processing' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                            }`}>
                                            {row.type}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-red-600 font-bold">
                                            {row.icon === 'scale' && <Clock className="w-4 h-4" />}
                                            {row.reason}
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-500 font-medium">{row.date}</td>
                                    <td className="p-4 text-right">
                                        <Link to="/batches/$batchId" params={{ batchId: row.id }} className="text-brand-blue font-bold text-xs hover:underline">View batch</Link>
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
        const selectedData = PROCESSING_DATA.filter(d => selectedProcessingIds.includes(d.id))
        const totalWeight = selectedData.reduce((acc, curr) => acc + parseFloat(curr.output.replace(/,/g, '')), 0)

        return (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-emerald-700">GREENCYCLE-20250415-001 Outbound Created</h2>
                </div>
                <p className="text-slate-600 mb-8 ml-14">Outbound batch <span className="font-bold text-brand-blue">Greencycle-20250415-001</span> created from {selectedData.length} production batches.</p>

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
                        <p className="text-xl font-bold text-brand-blue">GREENCYCLE-20250415-001</p>
                    </div>
                </div>

                <div className="border border-slate-100 rounded-xl overflow-hidden mb-8">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white border-b border-slate-100">
                                <th className="p-4 text-[10px] font-bold text-slate-800 uppercase tracking-wider">BATCH ID</th>
                                <th className="p-4 text-[10px] font-bold text-slate-800 uppercase tracking-wider">MATERIAL</th>
                                <th className="p-4 text-[10px] font-bold text-slate-800 uppercase tracking-wider">DATE</th>
                                <th className="p-4 text-[10px] font-bold text-slate-800 uppercase tracking-wider">OUTPUT WEIGHT</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                            {selectedData.map(row => (
                                <tr key={row.id}>
                                    <td className="p-4 font-bold text-brand-blue text-xs">{row.id}</td>
                                    <td className="p-4 text-slate-600 font-medium text-xs">{row.material}</td>
                                    <td className="p-4 text-slate-500 text-xs">{row.date}</td>
                                    <td className="p-4 font-bold text-slate-800 text-xs">{row.output} kg</td>
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
                            setSelectedProcessingIds([])
                        }}
                        className="px-6 py-2.5 rounded-lg bg-brand-blue text-white font-bold text-sm hover:bg-brand-blue/90"
                    >
                        Create New Batch
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Batches</h1>
                    <p className="text-sm text-slate-500">342 active units across cycle</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-slate-100">
                {(['Inbound', 'Processing', 'Outbound', 'Flagged'] as TabType[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`pb-4 px-1 text-sm font-semibold transition-all relative ${activeTab === tab ? (tab === 'Flagged' ? 'text-red-500 border-b-2 border-red-500' : 'text-brand-blue border-b-2 border-brand-blue') : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            {tab}
                            {(tab === 'Inbound' || tab === 'Processing' || tab === 'Outbound' || tab === 'Flagged') && (
                                <span className={`text-white text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab ? (tab === 'Flagged' ? 'bg-red-500' : 'bg-brand-blue') : 'bg-slate-300'
                                    }`}>
                                    {tab === 'Inbound' ? '12' : tab === 'Processing' ? '12' : tab === 'Outbound' ? '5' : '5'}
                                </span>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {viewState === 'inbound_success' && renderInboundSuccess()}
            {viewState === 'outbound_success' && renderOutboundSuccess()}

            {viewState === 'list' && (
                <>
                    {/* Render Stats */}
                    {renderStats()}

                    {/* Action Bar */}
                    <div className="bg-white p-4 rounded-xl border border-slate-100 flex flex-wrap gap-4 items-center">
                        <div className="relative flex-1 min-w-[240px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search batch ID or source.."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-100 rounded-lg bg-slate-50/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/10"
                            />
                        </div>

                        {activeTab !== 'Flagged' && (
                            <div className="relative min-w-[140px]">
                                <select className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-lg bg-white text-sm appearance-none font-medium text-slate-600 focus:outline-none">
                                    <option>Status</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        )}

                        {activeTab === 'Flagged' && (
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-2.5 rounded-lg border border-slate-100">
                                    <Filter className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm font-bold text-slate-600">Status</span>
                                    <select className="bg-transparent text-sm font-bold text-slate-800 outline-none appearance-none pr-4 relative">
                                        <option>All Outbound</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                        )}

                        {activeTab === 'Outbound' && (
                            <div className="flex items-center gap-2 flex-1 justify-end">
                                <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-slate-200">
                                    <Clock className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm font-bold text-slate-700">Oct 1 - Oct 14, 2023</span>
                                </div>
                                <button className="flex items-center gap-2 text-brand-blue font-bold text-sm px-4">
                                    <Download className="w-4 h-4" /> Export CSV
                                </button>
                            </div>
                        )}

                        {activeTab === 'Processing' && (
                            <button 
                                disabled={selectedProcessingIds.length === 0}
                                onClick={() => setViewState('outbound_success')}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors ${
                                    selectedProcessingIds.length > 0 ? 'bg-brand-blue text-white hover:bg-brand-blue/90' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                }`}
                            >
                                <Plus className="w-4 h-4" /> Create Out-Bound Batch
                            </button>
                        )}
                        {activeTab === 'Inbound' && (
                            <button 
                                disabled={selectedInboundIds.length === 0}
                                onClick={() => setViewState('inbound_success')}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors ${
                                    selectedInboundIds.length > 0 ? 'bg-brand-blue text-white hover:bg-brand-blue/90' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                }`}
                            >
                                <Plus className="w-4 h-4" /> Create Production Batch
                            </button>
                        )}
                        {activeTab === 'Flagged' && (
                            <button className="bg-brand-blue text-white flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm">
                                <Plus className="w-4 h-4" /> Advanced Filters
                            </button>
                        )}
                    </div>

                    {/* Table Area */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        {renderTable()}

                        {/* Pagination */}
                        <div className="p-4 bg-white border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-bold">
                            <p>Showing {activeTab === 'Outbound' ? OUTBOUND_DATA.length : activeTab === 'Processing' ? PROCESSING_DATA.length : activeTab === 'Inbound' ? INBOUND_DATA.length : FLAGGED_DATA.length} of 24 batches</p>
                            <div className="flex gap-2">
                                <button className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50 transition-all bg-slate-50/50">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50 transition-all bg-slate-50/50">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
