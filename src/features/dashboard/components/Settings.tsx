import React, { useState } from 'react'
import { Recycle, Landmark, CreditCard, X, Plus, Wrench, AlertTriangle, CheckCircle2, MoreVertical, Pencil, CloudUpload, Scale, TrendingUp, Truck, BarChart2, PiggyBank, Users, Shield, UserPlus, ChevronDown, Zap, LayoutGrid, List, ChevronLeft, ChevronRight, Eye } from 'lucide-react'

// ── Modals ──────────────────────────────────────────────────────────────────

interface EquipmentForm { name: string; serial: string; location: string; status: 'Active' | 'Maintenance' }
interface ScaleForm { id: string; type: 'Inbound' | 'Outbound'; lastCal: string; nextCal: string }

const MODAL_OVERLAY = 'fixed inset-0 bg-black/40 flex items-center justify-center z-50'
const MODAL_BOX = 'bg-white rounded-2xl shadow-2xl w-full max-w-md p-6'

function EquipmentModal({ title, initial, onClose, onSave }: {
    title: string
    initial?: Partial<EquipmentForm>
    onClose: () => void
    onSave: (f: EquipmentForm) => void
}) {
    const [form, setForm] = useState<EquipmentForm>({
        name: initial?.name ?? '',
        serial: initial?.serial ?? '',
        location: initial?.location ?? 'Warehouse A-1',
        status: initial?.status ?? 'Active',
    })
    const set = (k: keyof EquipmentForm, v: string) => setForm(p => ({ ...p, [k]: v }))

    return (
        <div className={MODAL_OVERLAY} onClick={onClose}>
            <div className={MODAL_BOX} onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-bold text-slate-900">{title}</h2>
                    <button onClick={onClose}><X className="w-5 h-5 text-slate-400 hover:text-slate-600" /></button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-slate-600 mb-1 block">Equipment Name</label>
                        <input value={form.name} onChange={e => set('name', e.target.value)}
                            placeholder="e.g. Electric Pallet Jack"
                            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3B82F6]" />
                    </div>
                    <div>
                        <label className="text-xs text-slate-600 mb-1 block">Serial Number</label>
                        <input value={form.serial} onChange={e => set('serial', e.target.value)}
                            placeholder="SN-XXXX-XXXX"
                            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3B82F6]" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-slate-600 mb-1 block">Location</label>
                            <select value={form.location} onChange={e => set('location', e.target.value)}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100">
                                {['Warehouse A-1','Warehouse A-4','Processing Hall A','Sorting Area','Main Intake'].map(l => <option key={l}>{l}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-slate-600 mb-1 block">Initial Status</label>
                            <div className="flex border border-slate-200 rounded-lg overflow-hidden text-sm font-semibold">
                                {(['Active','Maintenance'] as const).map(s => (
                                    <button key={s} onClick={() => set('status', s)}
                                        className={`flex-1 py-2.5 transition-colors ${form.status === s ? 'bg-[#3B82F6] text-white' : 'text-slate-400 hover:bg-slate-50'}`}>
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="border border-dashed border-slate-200 rounded-lg py-6 flex flex-col items-center gap-2 text-slate-400 cursor-pointer hover:border-[#3B82F6] transition-colors">
                        <CloudUpload className="w-6 h-6" />
                        <span className="text-[11px] font-bold uppercase tracking-widest">Upload Reference Photo</span>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-3 mt-6">
                    <button onClick={onClose} className="text-sm font-semibold text-slate-500 hover:text-slate-700">Cancel</button>
                    <button onClick={() => onSave(form)}
                        className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors">
                        {initial?.name ? 'Update Equipment' : 'Save Equipment'}
                    </button>
                </div>
            </div>
        </div>
    )
}

function ScaleModal({ title, initial, onClose, onSave }: {
    title: string
    initial?: Partial<ScaleForm>
    onClose: () => void
    onSave: (f: ScaleForm) => void
}) {
    const [form, setForm] = useState<ScaleForm>({
        id: initial?.id ?? '',
        type: initial?.type ?? 'Inbound',
        lastCal: initial?.lastCal ?? '',
        nextCal: initial?.nextCal ?? '',
    })
    const set = (k: keyof ScaleForm, v: string) => setForm(p => ({ ...p, [k]: v }))

    return (
        <div className={MODAL_OVERLAY} onClick={onClose}>
            <div className={MODAL_BOX} onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-bold text-slate-900">{title}</h2>
                    <button onClick={onClose}><X className="w-5 h-5 text-slate-400 hover:text-slate-600" /></button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-slate-600 mb-1 block">Scale ID/Name</label>
                        <input value={form.id} onChange={e => set('id', e.target.value)}
                            placeholder="e.g. SC-BERLIN-04"
                            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3B82F6]" />
                    </div>
                    <div>
                        <label className="text-xs text-slate-600 mb-1 block">Type</label>
                        <div className="flex border border-slate-200 rounded-lg overflow-hidden text-sm font-semibold">
                            {(['Inbound','Outbound'] as const).map(t => (
                                <button key={t} onClick={() => set('type', t)}
                                    className={`flex-1 py-2.5 transition-colors ${form.type === t ? 'bg-[#3B82F6] text-white' : 'text-slate-400 hover:bg-slate-50'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-slate-600 mb-1 block">Last Calibration</label>
                            <input value={form.lastCal} onChange={e => set('lastCal', e.target.value)}
                                placeholder="mm/dd/yyyy"
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                        </div>
                        <div>
                            <label className="text-xs text-slate-600 mb-1 block">Next Calibration</label>
                            <input value={form.nextCal} onChange={e => set('nextCal', e.target.value)}
                                placeholder="mm/dd/yyyy"
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-6">
                    <button onClick={() => onSave(form)}
                        className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-bold py-3 rounded-lg transition-colors">
                        {initial?.id ? 'Update Scale' : 'Save Scale'}
                    </button>
                    <button onClick={onClose} className="text-sm font-semibold text-slate-500 hover:text-slate-700 py-1">Cancel</button>
                </div>
            </div>
        </div>
    )
}

// ── Equipment Registry Tab ───────────────────────────────────────────────────

type Equipment = { name: string; serial: string; location: string; status: 'Active' | 'Maintenance' }
type Scale = { id: string; label: string; type: 'Inbound' | 'Outbound'; lastCal: string; calibStatus: 'Calibrated' | 'Calibration Near' }

const INIT_EQUIPMENT: Equipment[] = [
    { name: 'Industrial Baler X100', serial: 'BLR-982341', location: 'Processing Hall A', status: 'Active' },
    { name: 'PET Shredder S2',       serial: 'SHR-004219', location: 'Sorting Area',      status: 'Maintenance' },
    { name: 'Conveyor Belt System',  serial: 'CNV-771203', location: 'Main Intake',        status: 'Active' },
]

const INIT_SCALES: Scale[] = [
    { id: 'scale-1', label: 'Scale #002 (Inbound)',  type: 'Inbound',  lastCal: '2 days ago',   calibStatus: 'Calibrated' },
    { id: 'scale-2', label: 'Scale #003 (Output)',   type: 'Outbound', lastCal: '14 weeks ago', calibStatus: 'Calibration Near' },
]

function EquipmentRegistry() {
    const [equipment, setEquipment] = useState<Equipment[]>(INIT_EQUIPMENT)
    const [scales, setScales] = useState<Scale[]>(INIT_SCALES)
    const [modal, setModal] = useState<
        | { type: 'add-eq' }
        | { type: 'edit-eq'; item: Equipment }
        | { type: 'add-scale' }
        | { type: 'edit-scale'; item: Scale }
        | null
    >(null)

    const calibOverdue = equipment.filter(e => e.status === 'Maintenance').length

    return (
        <div className="space-y-5">
            {/* KPI row */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <Wrench className="w-5 h-5 text-[#3B82F6]" />
                        <span className="text-xs font-bold text-emerald-600">+2 New</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-1">Total Scales</p>
                    <p className="text-2xl font-bold text-slate-900">{scales.length}</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        <span className="text-xs font-bold text-red-500">Action Req.</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-1">Calibration Overdue</p>
                    <p className="text-2xl font-bold text-slate-900">{calibOverdue + 14}</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-600">98% Uptime</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-1">Active Hardware</p>
                    <p className="text-2xl font-bold text-slate-900">{equipment.filter(e => e.status === 'Active').length}</p>
                </div>
            </div>

            {/* Equipment table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-[#3B82F6]" />
                        <h2 className="text-sm font-bold text-slate-900">Equipment Registry</h2>
                    </div>
                    <button onClick={() => setModal({ type: 'add-eq' })}
                        className="text-xs font-bold text-[#3B82F6] hover:underline">+ ADD EQUIPMENT</button>
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50">
                            {['Device Name','Serial No.','Location','Status','Action'].map(h => (
                                <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {equipment.map((eq, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                                <td className="px-5 py-4 font-medium text-slate-800">{eq.name}</td>
                                <td className="px-5 py-4 text-slate-500">{eq.serial}</td>
                                <td className="px-5 py-4 text-slate-500">{eq.location}</td>
                                <td className="px-5 py-4">
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wide ${
                                        eq.status === 'Active'
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'bg-amber-100 text-amber-600'
                                    }`}>{eq.status}</span>
                                </td>
                                <td className="px-5 py-4">
                                    <button onClick={() => setModal({ type: 'edit-eq', item: eq })}
                                        className="text-[#3B82F6] hover:text-[#2563EB]">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Weighing Scales */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-[#3B82F6]" />
                        <h2 className="text-sm font-bold text-slate-900">Weighing Scales</h2>
                    </div>
                    <button onClick={() => setModal({ type: 'add-scale' })}
                        className="text-xs font-bold text-[#3B82F6] hover:underline">+ ADD SCALE</button>
                </div>
                <div className="divide-y divide-slate-100">
                    {scales.map(sc => (
                        <div key={sc.id} className="flex items-center justify-between px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                    <Scale className="w-5 h-5 text-[#3B82F6]" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{sc.label}</p>
                                    <p className="text-xs text-slate-400">Last calibrated: {sc.lastCal}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wide ${
                                    sc.calibStatus === 'Calibrated'
                                        ? 'bg-emerald-100 text-emerald-700'
                                        : 'bg-amber-100 text-amber-600'
                                }`}>{sc.calibStatus}</span>
                                <button onClick={() => setModal({ type: 'edit-scale', item: sc })}
                                    className="text-slate-400 hover:text-slate-600">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals */}
            {modal?.type === 'add-eq' && (
                <EquipmentModal title="Add New Equipment" onClose={() => setModal(null)}
                    onSave={f => { setEquipment(p => [...p, f]); setModal(null) }} />
            )}
            {modal?.type === 'edit-eq' && (
                <EquipmentModal title="Edit Equipment" initial={modal.item} onClose={() => setModal(null)}
                    onSave={f => { setEquipment(p => p.map(e => e.serial === modal.item.serial ? f : e)); setModal(null) }} />
            )}
            {modal?.type === 'add-scale' && (
                <ScaleModal title="Add Weighing Scale" onClose={() => setModal(null)}
                    onSave={f => { setScales(p => [...p, { id: f.id, label: f.id, type: f.type, lastCal: f.lastCal, calibStatus: 'Calibrated' }]); setModal(null) }} />
            )}
            {modal?.type === 'edit-scale' && (
                <ScaleModal title="Edit Weighing Scale" initial={modal.item} onClose={() => setModal(null)}
                    onSave={f => { setScales(p => p.map(s => s.id === modal.item.id ? { ...s, label: f.id, type: f.type, lastCal: f.lastCal } : s)); setModal(null) }} />
            )}
        </div>
    )
}

// ── Materials Config & Targets Tab ──────────────────────────────────────────

type Material = { name: string; buying: number; selling: number; status: 'Stable' | 'Attention' }

const INIT_MATERIALS: Material[] = [
    { name: 'rPET Clear',   buying: 350, selling: 600, status: 'Stable' },
    { name: 'rPET Colored', buying: 250, selling: 450, status: 'Attention' },
    { name: 'Cardboard',    buying: 180, selling: 250, status: 'Attention' },
]

function calcMargin(buying: number, selling: number) {
    if (!selling) return 0
    return Math.round(((selling - buying) / selling) * 1000) / 10
}

function AddMaterialModal({ onClose, onSave }: { onClose: () => void; onSave: (m: Material) => void }) {
    const [form, setForm] = useState<Material>({ name: '', buying: 0, selling: 0, status: 'Stable' })
    const set = (k: keyof Material, v: string | number) => setForm(p => ({ ...p, [k]: v }))
    return (
        <div className={MODAL_OVERLAY} onClick={onClose}>
            <div className={MODAL_BOX} onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-bold text-slate-900">Add Material</h2>
                    <button onClick={onClose}><X className="w-5 h-5 text-slate-400 hover:text-slate-600" /></button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-slate-600 mb-1 block">Material Type</label>
                        <input value={form.name} onChange={e => set('name', e.target.value)}
                            placeholder="e.g. HDPE Blue"
                            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3B82F6]" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-slate-600 mb-1 block">Buying Price (₦/KG)</label>
                            <input type="number" value={form.buying || ''} onChange={e => set('buying', Number(e.target.value))}
                                placeholder="0"
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3B82F6]" />
                        </div>
                        <div>
                            <label className="text-xs text-slate-600 mb-1 block">Selling Price (₦/KG)</label>
                            <input type="number" value={form.selling || ''} onChange={e => set('selling', Number(e.target.value))}
                                placeholder="0"
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3B82F6]" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-slate-600 mb-1 block">Status</label>
                        <div className="flex border border-slate-200 rounded-lg overflow-hidden text-sm font-semibold">
                            {(['Stable', 'Attention'] as const).map(s => (
                                <button key={s} onClick={() => set('status', s)}
                                    className={`flex-1 py-2.5 transition-colors ${form.status === s ? 'bg-[#3B82F6] text-white' : 'text-slate-400 hover:bg-slate-50'}`}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-3 mt-6">
                    <button onClick={onClose} className="text-sm font-semibold text-slate-500 hover:text-slate-700">Cancel</button>
                    <button onClick={() => { if (form.name) { onSave(form); onClose() } }}
                        className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors">
                        Save Material
                    </button>
                </div>
            </div>
        </div>
    )
}

function MaterialsConfigTargets() {
    const [materials, setMaterials] = useState<Material[]>(INIT_MATERIALS)
    const [showAddModal, setShowAddModal] = useState(false)
    const [editIdx, setEditIdx] = useState<number | null>(null)

    const [inboundDaily, setInboundDaily] = useState('12,500')
    const [inboundWeekly, setInboundWeekly] = useState('85,000')
    const [processingDaily, setProcessingDaily] = useState('10,200')
    const [processingWeekly, setProcessingWeekly] = useState('72,000')

    return (
        <div className="space-y-5">
            {/* Material Configuration */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <div>
                        <h2 className="text-base font-bold text-slate-900">Material Configuration</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Manage unit prices and profit margins across global recycling categories.</p>
                    </div>
                    <button onClick={() => setShowAddModal(true)}
                        className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5">
                        <Plus className="w-3.5 h-3.5" /> Add Material
                    </button>
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50">
                            {['Material Type', 'Buying Price (₦/KG)', 'Selling Price (₦/KG)', 'Margin(%)', 'Status', 'Actions'].map(h => (
                                <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {materials.map((m, i) => {
                            const margin = calcMargin(m.buying, m.selling)
                            const isEdit = editIdx === i
                            return (
                                <tr key={i} className="hover:bg-slate-50/50">
                                    <td className="px-5 py-4 font-medium text-slate-800">{m.name}</td>
                                    <td className="px-5 py-4">
                                        {isEdit
                                            ? <input type="number" value={m.buying}
                                                onChange={e => setMaterials(p => p.map((x, j) => j === i ? { ...x, buying: Number(e.target.value) } : x))}
                                                className="w-20 px-2 py-1 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                                            : <span className="px-2 py-1 border border-slate-200 rounded text-slate-600 text-sm">{m.buying}</span>
                                        }
                                    </td>
                                    <td className="px-5 py-4">
                                        {isEdit
                                            ? <input type="number" value={m.selling}
                                                onChange={e => setMaterials(p => p.map((x, j) => j === i ? { ...x, selling: Number(e.target.value) } : x))}
                                                className="w-20 px-2 py-1 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                                            : <span className="px-2 py-1 border border-slate-200 rounded text-slate-600 text-sm">{m.selling}</span>
                                        }
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`font-bold text-sm ${margin >= 40 ? 'text-emerald-600' : 'text-amber-500'}`}>{margin}%</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide flex items-center gap-1 w-fit ${
                                            m.status === 'Stable' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-600'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${m.status === 'Stable' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                            {m.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <button onClick={() => setEditIdx(isEdit ? null : i)}
                                            className="text-[#3B82F6] hover:text-[#2563EB]">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Production Targets */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-base font-bold text-slate-900 mb-1">Production Targets</h2>
                <p className="text-xs text-slate-400 mb-5">Set operational goals for logistics and processing facilities.</p>
                <div className="grid grid-cols-2 gap-4">
                    {/* Inbound */}
                    <div className="border border-slate-200 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Truck className="w-5 h-5 text-[#3B82F6]" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">Inbound Targets</p>
                                <p className="text-xs text-slate-400">Collection Network Goals</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Daily (KG)</label>
                                <input value={inboundDaily} onChange={e => setInboundDaily(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Weekly (KG)</label>
                                <input value={inboundWeekly} onChange={e => setInboundWeekly(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs text-slate-500">Current Performance</span>
                            <span className="text-xs font-bold text-[#3B82F6]">78%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-[#3B82F6] h-2 rounded-full" style={{ width: '78%' }} />
                        </div>
                    </div>

                    {/* Processing */}
                    <div className="border border-slate-200 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <BarChart2 className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">Processing Targets</p>
                                <p className="text-xs text-slate-400">Efficiency & Recovery Goals</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Daily (KG)</label>
                                <input value={processingDaily} onChange={e => setProcessingDaily(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Weekly (KG)</label>
                                <input value={processingWeekly} onChange={e => setProcessingWeekly(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs text-slate-500">Efficiency Rating</span>
                            <span className="text-xs font-bold text-emerald-600">92%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Market Trends */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex">
                    <div className="flex-1 p-6 flex items-start gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800 mb-1">Market Trends</p>
                            <p className="text-xs text-slate-500">PET prices increased by 4% across regional recycling hubs this week.</p>
                        </div>
                    </div>
                    <div className="w-56 bg-slate-50 border-l border-slate-100 flex flex-col items-center justify-center gap-3 p-6">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                            <PiggyBank className="w-6 h-6 text-amber-500" />
                        </div>
                        <button className="w-full bg-amber-400 hover:bg-amber-500 text-white text-sm font-bold py-2.5 rounded-lg transition-colors">
                            Analyze Revenue
                        </button>
                    </div>
                </div>
            </div>

            {showAddModal && (
                <AddMaterialModal onClose={() => setShowAddModal(false)}
                    onSave={m => setMaterials(p => [...p, m])} />
            )}
        </div>
    )
}

// ── Team Management Tab ──────────────────────────────────────────────────────

type TeamRole = 'Owner' | 'Operator' | 'Viewer'
type MemberStatus = 'Active' | 'Invited'

interface TeamMember {
    id: string
    name: string
    email: string
    role: TeamRole
    status: MemberStatus
    lastActive: string
    avatar?: string
    initials?: string
    avatarColor?: string
}

const INIT_MEMBERS: TeamMember[] = [
    { id: '1', name: 'Alex Rivers',    email: 'alex.rivers@ecosystems.ltd',   role: 'Owner',    status: 'Active',  lastActive: '2 mins ago',        avatar: undefined, initials: 'AR', avatarColor: 'bg-slate-700' },
    { id: '2', name: 'Elena Martinez', email: 'e.martinez@ecosystems.ltd',    role: 'Operator', status: 'Active',  lastActive: '1 hour ago',        avatar: undefined, initials: 'EM', avatarColor: 'bg-purple-500' },
    { id: '3', name: 'Sarah Chen',     email: 'sarah.c@ecosystems.ltd',       role: 'Viewer',   status: 'Invited', lastActive: 'Never',             avatar: undefined, initials: 'SC', avatarColor: 'bg-slate-400' },
    { id: '4', name: 'Jordan Smyth',   email: 'j.smyth@ecosystems.ltd',       role: 'Operator', status: 'Active',  lastActive: 'Yesterday, 4:30 PM', avatar: undefined, initials: 'JS', avatarColor: 'bg-slate-600' },
]

const ROLE_ICON: Record<string, React.ReactNode> = {
    Owner:    <Shield className="w-3 h-3" />,
    Operator: <Zap className="w-3 h-3" />,
    Viewer:   <Eye className="w-3 h-3" />,
}

const ROLE_STYLE: Record<string, string> = {
    Owner:    'bg-blue-50 text-blue-600 border border-blue-200',
    Operator: 'bg-slate-100 text-slate-600 border border-slate-200',
    Viewer:   'bg-slate-100 text-slate-500 border border-slate-200',
}

function InviteMemberModal({ onClose, onSave }: { onClose: () => void; onSave: (m: TeamMember) => void }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState<TeamRole | ''>('')
    const [roleOpen, setRoleOpen] = useState(false)

    const handleSave = () => {
        if (!name || !email || !role) return
        onSave({
            id: Date.now().toString(),
            name, email,
            role: role as TeamRole,
            status: 'Invited',
            lastActive: 'Never',
            initials: name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
            avatarColor: 'bg-blue-400',
        })
        onClose()
    }

    return (
        <div className={MODAL_OVERLAY} onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden" onClick={e => e.stopPropagation()}>
                {/* Icon + title */}
                <div className="flex flex-col items-center pt-8 pb-5 px-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                        <UserPlus className="w-7 h-7 text-[#3B82F6]" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Add New Team Member</h2>
                </div>
                <div className="px-6 pb-4 space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Full Name</label>
                        <input value={name} onChange={e => setName(e.target.value)}
                            placeholder="e.g. Alex Henderson"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3B82F6]" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Business Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)}
                            placeholder="alex@ecosystems.ltd"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3B82F6]" />
                    </div>
                    <div className="relative">
                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Assign Role</label>
                        <button onClick={() => setRoleOpen(o => !o)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-100">
                            <span className={role ? 'text-slate-800' : 'text-slate-400'}>{role || 'Select a role'}</span>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </button>
                        {roleOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-10 overflow-hidden">
                                {/* Owner highlighted */}
                                <button onClick={() => { setRole('Owner'); setRoleOpen(false) }}
                                    className="w-full px-4 py-3 text-left text-sm font-bold text-[#3B82F6] bg-blue-50 flex items-center justify-between hover:bg-blue-100 transition-colors">
                                    Owner
                                    {role === 'Owner' && <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />}
                                </button>
                                {(['Operator', 'Viewer'] as TeamRole[]).map(r => (
                                    <button key={r} onClick={() => { setRole(r); setRoleOpen(false) }}
                                        className="w-full px-4 py-3 text-left text-sm text-slate-600 hover:bg-slate-50 transition-colors border-t border-slate-100">
                                        {r}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="px-6 pb-4">
                    <button onClick={handleSave}
                        className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                        Send Invitation <span className="text-base">▷</span>
                    </button>
                </div>
                <div className="bg-slate-50 border-t border-slate-100 px-6 py-3 flex items-center gap-2">
                    <span className="text-slate-400 text-xs">ⓘ</span>
                    <p className="text-xs text-slate-400">Invitees will receive an email to set up their password.</p>
                </div>
                <button onClick={onClose}
                    className="w-full py-3 text-sm text-slate-500 font-medium flex items-center justify-center gap-1.5 hover:text-slate-700 transition-colors border-t border-slate-100">
                    <ChevronLeft className="w-4 h-4" /> Back to Team Dashboard
                </button>
            </div>
        </div>
    )
}

function TeamManagement() {
    const [members, setMembers] = useState<TeamMember[]>(INIT_MEMBERS)
    const [showInvite, setShowInvite] = useState(false)
    const [roleFilter, setRoleFilter] = useState('All Roles')
    const [statusFilter, setStatusFilter] = useState('All')
    const [page, setPage] = useState(1)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
    const [roleDropOpen, setRoleDropOpen] = useState(false)
    const [statusDropOpen, setStatusDropOpen] = useState(false)

    const totalMembers = 124
    const activeSeats = 118
    const pendingInvites = 6

    const filtered = members.filter(m => {
        const roleMatch = roleFilter === 'All Roles' || m.role === roleFilter
        const statusMatch = statusFilter === 'All' || m.status === statusFilter
        return roleMatch && statusMatch
    })

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Team Profiles</h2>
                    <p className="text-sm text-slate-400 mt-0.5">Manage internal staff, permissions, and operational access across the EcoLyft ecosystem.</p>
                </div>
                <button onClick={() => setShowInvite(true)}
                    className="bg-amber-400 hover:bg-amber-500 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 flex-shrink-0">
                    <UserPlus className="w-4 h-4" /> Invite New Member
                </button>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Team Members</p>
                        <p className="text-3xl font-bold text-slate-900">{totalMembers}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-[#3B82F6]" />
                    </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Seats</p>
                        <p className="text-3xl font-bold text-emerald-600">{activeSeats}</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pending Invites</p>
                        <p className="text-3xl font-bold text-amber-500">{pendingInvites}</p>
                    </div>
                    <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-amber-400" />
                    </div>
                </div>
            </div>

            {/* Table card */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                {/* Filters bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        {/* Role filter */}
                        <div className="relative">
                            <button onClick={() => { setRoleDropOpen(o => !o); setStatusDropOpen(false) }}
                                className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                                <List className="w-3.5 h-3.5" /> {roleFilter} <ChevronDown className="w-3 h-3" />
                            </button>
                            {roleDropOpen && (
                                <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-10 w-40 overflow-hidden">
                                    {['All Roles', 'Owner', 'Operator', 'Viewer'].map(r => (
                                        <button key={r} onClick={() => { setRoleFilter(r); setRoleDropOpen(false) }}
                                            className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${roleFilter === r ? 'text-[#3B82F6] font-bold bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}>
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* Status filter */}
                        <div className="relative">
                            <button onClick={() => { setStatusDropOpen(o => !o); setRoleDropOpen(false) }}
                                className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                                <Zap className="w-3.5 h-3.5" /> Status: {statusFilter} <ChevronDown className="w-3 h-3" />
                            </button>
                            {statusDropOpen && (
                                <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-10 w-36 overflow-hidden">
                                    {['All', 'Active', 'Invited'].map(s => (
                                        <button key={s} onClick={() => { setStatusFilter(s); setStatusDropOpen(false) }}
                                            className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${statusFilter === s ? 'text-[#3B82F6] font-bold bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}>
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400">Displaying {filtered.length} of {totalMembers} members</span>
                        <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                            <button onClick={() => setViewMode('grid')}
                                className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-slate-100 text-slate-700' : 'text-slate-400 hover:bg-slate-50'}`}>
                                <LayoutGrid className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => setViewMode('list')}
                                className={`p-1.5 transition-colors ${viewMode === 'list' ? 'bg-slate-100 text-slate-700' : 'text-slate-400 hover:bg-slate-50'}`}>
                                <List className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50">
                            {['Member Name', 'Role', 'Status', 'Last Active', 'Actions'].map(h => (
                                <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filtered.map(m => (
                            <tr key={m.id} className="hover:bg-slate-50/50">
                                <td className="px-5 py-3.5">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-full ${m.avatarColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                                            {m.initials}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-800 text-sm">{m.name}</p>
                                            <p className="text-xs text-slate-400">{m.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-3.5">
                                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${ROLE_STYLE[m.role]}`}>
                                        {ROLE_ICON[m.role]} {m.role}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5">
                                    <span className={`flex items-center gap-1.5 text-xs font-semibold ${m.status === 'Active' ? 'text-emerald-600' : 'text-amber-500'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${m.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                                        {m.status}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5 text-sm text-slate-500">{m.lastActive}</td>
                                <td className="px-5 py-3.5">
                                    <button className="text-slate-400 hover:text-slate-600">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))}
                        className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700 disabled:opacity-40"
                        disabled={page === 1}>
                        <ChevronLeft className="w-3.5 h-3.5" /> Previous
                    </button>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3].map(n => (
                            <button key={n} onClick={() => setPage(n)}
                                className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${page === n ? 'bg-[#3B82F6] text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
                                {n}
                            </button>
                        ))}
                        <span className="text-slate-400 text-xs px-1">...</span>
                        <button onClick={() => setPage(12)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${page === 12 ? 'bg-[#3B82F6] text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
                            12
                        </button>
                    </div>
                    <button onClick={() => setPage(p => Math.min(12, p + 1))}
                        className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700 disabled:opacity-40"
                        disabled={page === 12}>
                        Next <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {showInvite && (
                <InviteMemberModal
                    onClose={() => setShowInvite(false)}
                    onSave={m => setMembers(p => [...p, m])}
                />
            )}
        </div>
    )
}

// ── FAQ & Customer Support Tab ───────────────────────────────────────────────

const FAQ_DATA = [
    {
        section: 'Profit & Performance',
        items: [
            { q: 'How does EcoLyft show where I\'m losing money?', a: 'EcoLyft tracks each transaction from start to finish. "What you bought, what you sold, and what you earned" so gaps become visible.' },
            { q: 'Will EcoLyft calculate my profit automatically?', a: 'EcoLyft gives you structured transaction data so you can clearly see your margins and performance.' },
            { q: 'How quickly will I start seeing value?', a: 'Most users start spotting gaps after a few transactions.' },
        ],
    },
    {
        section: 'Payments & Transactions',
        items: [
            { q: 'How do payments work?', a: 'When you log a sale, your buyer receives a payment link.' },
            { q: 'What if my buyer delays payment?', a: 'You can resend the payment link and track the status so nothing is missed.' },
            { q: 'What happens if there is a dispute?', a: 'All transaction details are recorded, giving you a clear reference to review and resolve issues.' },
            { q: 'How do I connect my Paystack account?', a: 'Go to Settings → Payments and follow the steps to link your Paystack account.' },
        ],
    },
    {
        section: 'Security & Verification',
        items: [
            { q: 'Is RC (CAC) verification required?', a: 'Yes. This ensures your transactions are tied to a verified business, improving trust and record credibility.' },
            { q: 'How is my data secured?', a: 'Your data is securely stored and only accessible to you and your authorized team.' },
            { q: 'How do I manage team access?', a: 'You can add or manage team members from the Team section in Settings.' },
        ],
    },
    {
        section: 'Plans & Billing',
        items: [
            { q: 'How long is the free trial?', a: '14 days. No automatic charges.' },
            { q: 'Can I change my plan?', a: 'Yes. You can upgrade anytime.' },
        ],
    },
]

function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
    const [open, setOpen] = useState<number | null>(null)
    return (
        <div className="divide-y divide-slate-100">
            {items.map((item, i) => (
                <div key={i}>
                    <button
                        onClick={() => setOpen(open === i ? null : i)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                    >
                        <span className="text-sm text-slate-700 font-medium">{item.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 ml-4 transition-transform ${open === i ? 'rotate-180' : ''}`} />
                    </button>
                    {open === i && (
                        <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed">{item.a}</div>
                    )}
                </div>
            ))}
        </div>
    )
}

function FaqSupport() {
    return (
        <div className="space-y-5">
            <div>
                <h2 className="text-xl font-bold text-slate-900">How can we help you today?</h2>
                <p className="text-sm text-slate-400 mt-0.5">Everything you need to run and track your transactions on EcoLyft.</p>
            </div>

            {FAQ_DATA.map(group => (
                <div key={group.section} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-100">
                        <h3 className="text-sm font-bold text-slate-900">{group.section}</h3>
                    </div>
                    <FaqAccordion items={group.items} />
                </div>
            ))}

            {/* Still need help */}
            <div className="bg-[#2D6FD4] rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <p className="text-white font-bold text-base mb-1">Still need help?</p>
                    <p className="text-blue-200 text-sm">Chat with us for quick help setting up or completing your first transactions.</p>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                    <a href="https://wa.me/" target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 bg-white text-slate-800 text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                        <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        WhatsApp Support
                    </a>
                    <a href="mailto:support@ecolyft.com"
                        className="flex items-center gap-2 bg-white text-slate-800 text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                        <svg className="w-4 h-4 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        support@ecolyft.com
                    </a>
                </div>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-slate-400 pb-4">© 2025 EcoLyft. All rights reserved.</p>
        </div>
    )
}

const NAV_ITEMS = [
    'Company Profile',
    'Equipment Registry',
    'Materials Config & Targets',
    'Team Management',
    'FAQ & Customer Support',
]

const MATERIAL_ICONS: Record<string, { bg: string; color: string; symbol: string }> = {
    'PET Clear':  { bg: 'bg-green-100',  color: 'text-green-600',  symbol: '◎' },
    'HDPE':       { bg: 'bg-blue-100',   color: 'text-blue-500',   symbol: '◉' },
    'Cardboard':  { bg: 'bg-orange-100', color: 'text-orange-500', symbol: '▣' },
    'Aluminum':   { bg: 'bg-slate-100',  color: 'text-slate-500',  symbol: '⚙' },
}

const MATERIAL_SUBTITLES: Record<string, string> = {
    'PET Clear': 'Plastic Bottles',
    'HDPE': 'Opaque Plastics',
    'Cardboard': 'Mixed Paper',
    'Aluminum': 'Beverage Cans',
}

export const Settings: React.FC = () => {
    const [activeNav, setActiveNav] = useState('Company Profile')
    const [subLocations, setSubLocations] = useState(['Ikeja', 'Lekki'])
    const [newLocation, setNewLocation] = useState('')

    const removeLocation = (loc: string) =>
        setSubLocations(prev => prev.filter(l => l !== loc))

    const addLocation = () => {
        const trimmed = newLocation.trim()
        if (trimmed && !subLocations.includes(trimmed)) {
            setSubLocations(prev => [...prev, trimmed])
        }
        setNewLocation('')
    }

    return (
        <div className="w-full pb-24">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Settings</h1>
            <p className="text-sm text-slate-500 mb-8">Configure your facility, materials, and production goals.</p>

            <div className="flex gap-8 items-start">
                {/* Sidebar */}
                <div className="w-44 flex-shrink-0 space-y-1">
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item}
                            onClick={() => setActiveNav(item)}
                            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                activeNav === item
                                    ? 'bg-white border border-slate-200 text-[#3B82F6] font-bold shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-5">
                    {activeNav === 'Equipment Registry' && <EquipmentRegistry />}
                    {activeNav === 'Materials Config & Targets' && <MaterialsConfigTargets />}
                    {activeNav === 'Team Management' && <TeamManagement />}
                    {activeNav === 'FAQ & Customer Support' && <FaqSupport />}
                    {activeNav === 'Company Profile' && (<>
                    {/* Company Profile Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <h2 className="text-base font-bold text-slate-900 mb-5">Company Profile</h2>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-xs text-slate-600 mb-1.5 block">Business Name</label>
                                <input
                                    type="text"
                                    defaultValue="EcoRecycle Solutions Ltd"
                                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3B82F6]"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-600 mb-1.5 block">RC Number</label>
                                <input
                                    type="text"
                                    defaultValue="RC-9834571"
                                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3B82F6]"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-600 mb-1.5 block">Head Location</label>
                                <input
                                    type="text"
                                    defaultValue="Lagos, Nigeria"
                                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3B82F6]"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-600 mb-1.5 block">Business Type</label>
                                <input
                                    type="text"
                                    defaultValue="Aggregator"
                                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3B82F6]"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-slate-600 mb-1.5 block">Sub Locations</label>
                            <div className="flex flex-wrap items-center gap-2 px-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 min-h-[42px]">
                                {subLocations.map(loc => (
                                    <span
                                        key={loc}
                                        className="inline-flex items-center gap-1 text-xs font-medium text-[#3B82F6] bg-white border border-slate-200 px-2.5 py-1 rounded"
                                    >
                                        {loc}
                                        <button onClick={() => removeLocation(loc)} className="hover:text-red-400 transition-colors">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    value={newLocation}
                                    onChange={e => setNewLocation(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && addLocation()}
                                    placeholder="+ Add Location"
                                    className="text-xs text-[#3B82F6] bg-transparent outline-none placeholder:text-[#3B82F6] w-24"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Material Types Card */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                <Recycle className="w-4 h-4 text-[#3B82F6]" />
                                <h2 className="text-base font-bold text-slate-900">Material Types</h2>
                            </div>
                            <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                                Manage Materials
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {Object.entries(MATERIAL_ICONS).map(([name, style]) => (
                                <div key={name} className="flex items-center gap-3 border border-slate-200 rounded-lg p-3">
                                    <div className={`w-8 h-8 rounded-lg ${style.bg} ${style.color} flex items-center justify-center text-base flex-shrink-0`}>
                                        {style.symbol}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">{name}</p>
                                        <p className="text-xs text-slate-400">{MATERIAL_SUBTITLES[name]}</p>
                                    </div>
                                </div>
                            ))}
                            {/* Add Material tile */}
                            <button className="flex items-center justify-center gap-2 border border-dashed border-slate-300 rounded-lg p-3 text-sm font-medium text-slate-400 hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors">
                                <Plus className="w-4 h-4" />
                                Add Material
                            </button>
                        </div>
                    </div>

                    {/* Bank + Payment Plan row */}
                    <div className="grid grid-cols-2 gap-5">
                        {/* NUBAN Bank Details */}
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-5">
                                <Landmark className="w-4 h-4 text-[#3B82F6]" />
                                <h2 className="text-base font-bold text-slate-900">NUBAN (Bank Details)</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-slate-600 mb-1.5 block">Bank Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Zenith Bank PLC"
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3B82F6]"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-600 mb-1.5 block">Account Number</label>
                                    <input
                                        type="text"
                                        defaultValue="1012345678"
                                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3B82F6]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Plan */}
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-5">
                                <CreditCard className="w-4 h-4 text-[#3B82F6]" />
                                <h2 className="text-base font-bold text-slate-900">Payment Plan</h2>
                            </div>
                            <div className="border border-slate-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm font-bold text-[#3B82F6]">Pro Enterprise</p>
                                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wide">Active</span>
                                </div>
                                <p className="text-xs text-slate-500 mb-4">Unlimited scale connections &amp; advanced metrics</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-bold text-slate-900">₦45,000 / month</p>
                                    <button className="text-xs font-bold text-[#3B82F6] hover:underline">Change Plan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>)}
                </div>
                </div>

            {/* Sticky footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-8 py-4 flex justify-end gap-3 z-10">
                <button className="px-6 py-2.5 border border-slate-300 rounded-lg text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors">
                    Discard Changes
                </button>
                <button className="px-6 py-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg text-sm font-bold transition-colors shadow-sm">
                    Save Profile
                </button>
            </div>
        </div>
    )
}
