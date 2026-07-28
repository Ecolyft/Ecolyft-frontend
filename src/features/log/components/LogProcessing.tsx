import React, { useEffect, useMemo, useState } from 'react'
import { ChevronDown, X, Plus, Scale } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { entitiesApi, operationsApi, ApiError } from '../../../lib/api'
import { authSession } from '../../../lib/authSession'
import type { Batch, MaterialType } from '../../../lib/types'

interface BatchLine {
    id: number
    batchId: string
    weight: string
}

interface OutputLine {
    id: number
    material: string
    weight: string
}

const MACHINES = ['EVN 800KG BALING MACHINE', 'EVN 500KG BALING MACHINE', 'EVN 1000KG BALING MACHINE']

const parseNumber = (value: string) => {
    const parsed = parseFloat(value.replace(/,/g, ''))
    return Number.isFinite(parsed) ? parsed : 0
}

function OutputLines({
    lines,
    setLines,
    materials,
}: {
    lines: OutputLine[]
    setLines: React.Dispatch<React.SetStateAction<OutputLine[]>>
    materials: MaterialType[]
}) {
    const add = () =>
        setLines(prev => [
            ...prev,
            { id: Date.now(), material: materials[0]?.name || 'PET Clear', weight: '' },
        ])
    const remove = (id: number) => setLines(prev => prev.filter(l => l.id !== id))
    const update = (id: number, field: keyof OutputLine, val: string) =>
        setLines(prev => prev.map(l => (l.id === id ? { ...l, [field]: val } : l)))

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
                            {materials.map(m => (
                                <option key={m.id} value={m.name}>
                                    {m.name}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    <div className="relative w-32">
                        <input
                            type="text"
                            value={line.weight}
                            onChange={e => update(line.id, 'weight', e.target.value)}
                            placeholder="0"
                            className="w-full pl-4 pr-10 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm pointer-events-none">
                            kg
                        </span>
                    </div>
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
    const user = authSession.getUser()

    const [inboundBatches, setInboundBatches] = useState<Batch[]>([])
    const [materials, setMaterials] = useState<MaterialType[]>([])
    const [batchLines, setBatchLines] = useState<BatchLine[]>([])
    const [washLines, setWashLines] = useState<OutputLine[]>([
        { id: 1, material: 'PET Clear', weight: '' },
    ])
    const [startTime, setStartTime] = useState('09:00')
    const [endTime, setEndTime] = useState('17:00')
    const [machine, setMachine] = useState(MACHINES[0])
    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        Promise.all([operationsApi.getBatches(), entitiesApi.getMaterials()])
            .then(([batchRes, materialRes]) => {
                const inbound = batchRes.batches.filter(batch => batch.status === 'INBOUND')
                setInboundBatches(inbound)
                setMaterials(materialRes.materials)

                if (inbound[0]) {
                    setBatchLines([
                        {
                            id: 1,
                            batchId: inbound[0].id,
                            weight: String(inbound[0].inboundEvent?.weight || ''),
                        },
                    ])
                }

                if (materialRes.materials[0]) {
                    setWashLines([
                        { id: 1, material: materialRes.materials[0].name, weight: '' },
                    ])
                }
            })
            .catch(err => setError(err instanceof ApiError ? err.message : 'Failed to load processing data'))
            .finally(() => setLoadingData(false))
    }, [])

    const availableToProcess = useMemo(
        () =>
            inboundBatches.reduce(
                (sum, batch) => sum + (batch.inboundEvent?.weight || 0),
                0
            ),
        [inboundBatches]
    )

    const addBatchLine = () => {
        const nextBatch = inboundBatches.find(
            batch => !batchLines.some(line => line.batchId === batch.id)
        )
        if (!nextBatch) return

        setBatchLines(prev => [
            ...prev,
            {
                id: Date.now(),
                batchId: nextBatch.id,
                weight: String(nextBatch.inboundEvent?.weight || ''),
            },
        ])
    }

    const removeBatchLine = (id: number) => {
        if (batchLines.length > 1) {
            setBatchLines(prev => prev.filter(b => b.id !== id))
        } else {
            setBatchLines(prev =>
                prev.map(b => (b.id === id ? { ...b, weight: '' } : b))
            )
        }
    }

    const updateBatchLine = (id: number, field: keyof BatchLine, val: string) => {
        setBatchLines(prev =>
            prev.map(b => {
                if (b.id !== id) return b
                if (field === 'batchId') {
                    const selected = inboundBatches.find(batch => batch.id === val)
                    return {
                        ...b,
                        batchId: val,
                        weight: String(selected?.inboundEvent?.weight || b.weight),
                    }
                }
                return { ...b, [field]: val }
            })
        )
    }

    const totalWeight = batchLines.reduce((acc, curr) => acc + parseNumber(curr.weight), 0)

    const handleSubmit = async () => {
        if (batchLines.length === 0 || !batchLines[0]?.batchId) {
            setError('Add an inbound batch before recording throughput.')
            return
        }

        const batches = batchLines
            .map(line => ({
                batchId: line.batchId,
                weight: parseNumber(line.weight),
            }))
            .filter(line => line.weight > 0)

        const outputs = washLines
            .map(line => ({
                materialType: line.material,
                weight: parseNumber(line.weight),
            }))
            .filter(line => line.weight > 0)

        if (batches.length === 0) {
            setError('Enter a valid weight for at least one batch.')
            return
        }

        if (outputs.length === 0) {
            setError('Add at least one material outcome line.')
            return
        }

        setError('')
        setLoading(true)

        try {
            await operationsApi.logProcessing({
                batches,
                outputs,
                machine,
                startTime,
                endTime,
            })
            navigate({ to: '/batches' })
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to record processing.')
        } finally {
            setLoading(false)
        }
    }

    const greeting = (() => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good Morning'
        if (hour < 17) return 'Good Afternoon'
        return 'Good Evening'
    })()

    const title = `${greeting} ${user?.fullName?.split(' ')[0] || 'there'}`
    const subtitle = 'Record processed material into output fractions'

    return (
        <div className="space-y-6 w-full max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 w-full">
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-800 mb-1 font-display tracking-tight">
                                {title}
                            </h1>
                            <p className="text-base font-semibold text-slate-500 mt-1">{subtitle}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[24px] border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
                        {error && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        {loadingData ? (
                            <p className="text-sm font-semibold text-slate-500">Loading inbound batches...</p>
                        ) : inboundBatches.length === 0 ? (
                            <p className="text-sm font-semibold text-slate-500">
                                No inbound batches available. Log a purchase first.
                            </p>
                        ) : (
                            <>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700">Batch</label>
                                    <div className="space-y-3">
                                        {batchLines.map((line, idx) => (
                                            <div key={line.id} className="flex items-center gap-3">
                                                <div className="relative flex-1">
                                                    <select
                                                        value={line.batchId}
                                                        onChange={e =>
                                                            updateBatchLine(line.id, 'batchId', e.target.value)
                                                        }
                                                        className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl appearance-none text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                                                    >
                                                        {inboundBatches.map(batch => (
                                                            <option key={batch.id} value={batch.id}>
                                                                {batch.batchNumber}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                                </div>
                                                <div className="relative w-32">
                                                    <input
                                                        type="text"
                                                        value={line.weight}
                                                        onChange={e =>
                                                            updateBatchLine(line.id, 'weight', e.target.value)
                                                        }
                                                        placeholder="0"
                                                        className="w-full pl-4 pr-10 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                                                    />
                                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm pointer-events-none">
                                                        kg
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeBatchLine(line.id)}
                                                    className="text-slate-300 hover:text-slate-500 transition-colors flex-shrink-0"
                                                    aria-label="Remove batch"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                                {idx === 0 ? (
                                                    <button
                                                        type="button"
                                                        onClick={addBatchLine}
                                                        className="w-[46px] h-[46px] flex items-center justify-center border border-blue-500 rounded-xl text-blue-500 hover:bg-blue-50 transition-colors flex-shrink-0"
                                                        aria-label="Add batch"
                                                    >
                                                        <Plus className="w-5 h-5" />
                                                    </button>
                                                ) : (
                                                    <div className="w-[46px] flex-shrink-0" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="totalWeight" className="text-sm font-bold text-slate-700">
                                        Total Weight
                                    </label>
                                    <input
                                        type="text"
                                        id="totalWeight"
                                        value={totalWeight || ''}
                                        readOnly
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-semibold text-sm focus:outline-none cursor-not-allowed"
                                    />
                                </div>

                                <div className="space-y-4 relative">
                                    <label className="text-sm font-bold text-slate-700">Material Outcome</label>
                                    <OutputLines
                                        lines={washLines}
                                        setLines={setWashLines}
                                        materials={materials}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="startTime" className="text-[11px] font-extrabold text-slate-500 tracking-wider">
                                            START TIME
                                        </label>
                                        <input
                                            type="text"
                                            id="startTime"
                                            value={startTime}
                                            onChange={e => setStartTime(e.target.value)}
                                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="endTime" className="text-[11px] font-extrabold text-slate-500 tracking-wider">
                                            END TIME
                                        </label>
                                        <input
                                            type="text"
                                            id="endTime"
                                            value={endTime}
                                            onChange={e => setEndTime(e.target.value)}
                                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <select
                                        value={machine}
                                        onChange={e => setMachine(e.target.value)}
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl appearance-none text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                                    >
                                        {MACHINES.map(m => (
                                            <option key={m}>{m}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-60 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/10 active:scale-[0.99] transition-all"
                                >
                                    {loading ? 'Recording throughput...' : 'Record Throughput'}
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="w-full lg:w-80 flex-shrink-0 space-y-4">
                    <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl p-5 shadow-sm">
                        <p className="text-[#16A34A] text-xs font-bold uppercase tracking-wider">Inbound Batches</p>
                        <p className="text-[#16A34A] text-2xl font-extrabold mt-1.5 font-display">
                            {inboundBatches.length}
                        </p>
                        <p className="text-[#16A34A] text-xs font-bold mt-2 uppercase tracking-wide">
                            Ready for processing
                        </p>
                    </div>

                    <div className="bg-[#FFF5F5] border border-[#FEE2E2] rounded-2xl p-5 shadow-sm">
                        <p className="text-[#DC2626] text-xs font-bold uppercase tracking-wider">
                            Available to Process
                        </p>
                        <div className="flex items-center mt-2 text-[#DC2626]">
                            <Scale className="w-5 h-5 mr-1.5 flex-shrink-0 opacity-80" />
                            <span className="text-2xl font-extrabold font-display leading-none">
                                {availableToProcess.toLocaleString()} KG
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
