import React, { useEffect, useState } from 'react'
import { Camera, ChevronDown, Plus, AlertTriangle, Calendar } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { entitiesApi, operationsApi, ApiError } from '../../../lib/api'
import { authSession } from '../../../lib/authSession'
import type { Collector, MaterialType } from '../../../lib/types'

const parseNumber = (value: string) => {
  const parsed = parseFloat(value.replace(/,/g, ''))
  return Number.isFinite(parsed) ? parsed : 0
}

export const LogPurchase: React.FC = () => {
    const navigate = useNavigate()
    const user = authSession.getUser()

    const [collectors, setCollectors] = useState<Collector[]>([])
    const [materials, setMaterials] = useState<MaterialType[]>([])
    const [collectorId, setCollectorId] = useState('')
    const [materialType, setMaterialType] = useState('')
    const [grossWeight, setGrossWeight] = useState('')
    const [unitPrice, setUnitPrice] = useState('')
    const [netWeight, setNetWeight] = useState('')
    const [sumPrice, setSumPrice] = useState('0')
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        Promise.all([entitiesApi.getCollectors(), entitiesApi.getMaterials()])
            .then(([collectorRes, materialRes]) => {
                setCollectors(collectorRes.collectors)
                setMaterials(materialRes.materials)
                if (collectorRes.collectors[0]) {
                    setCollectorId(collectorRes.collectors[0].id)
                }
                if (materialRes.materials[0]) {
                    setMaterialType(materialRes.materials[0].name)
                }
            })
            .catch(err => setError(err instanceof ApiError ? err.message : 'Failed to load form data'))
            .finally(() => setLoadingData(false))
    }, [])

    const recalculateTotal = (nextNetWeight: string, nextUnitPrice: string) => {
        const total = parseNumber(nextNetWeight) * parseNumber(nextUnitPrice)
        setSumPrice(total ? total.toLocaleString('en-US') : '0')
    }

    const handleNetWeightChange = (val: string) => {
        setNetWeight(val)
        recalculateTotal(val, unitPrice)
    }

    const handleUnitPriceChange = (val: string) => {
        setUnitPrice(val)
        recalculateTotal(netWeight, val)
    }

    const handleSubmit = async () => {
        if (!collectorId) {
            setError('Please add a supplier before logging a purchase.')
            return
        }
        if (!materialType) {
            setError('Material type is required.')
            return
        }

        const weight = parseNumber(netWeight)
        const price = parseNumber(sumPrice)
        const gross = parseNumber(grossWeight)

        if (weight <= 0) {
            setError('Net weight must be greater than zero.')
            return
        }

        setError('')
        setLoading(true)

        try {
            const result = await operationsApi.logPurchase({
                collectorId,
                materialType,
                weight,
                price,
                grossWeight: gross > 0 ? gross : undefined,
                costPerKg: parseNumber(unitPrice) || undefined,
                date,
            })

            const supplier = collectors.find(c => c.id === collectorId)

            navigate({
                to: '/log-purchase/success',
                search: {
                    batchId: result.batch.id,
                    batchNumber: result.batch.batchNumber,
                    amount: String(result.transaction.price || price),
                    collectorName: supplier?.name || 'Supplier',
                    materialType,
                    weight: String(result.transaction.weight),
                },
            })
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to record purchase.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto">
            <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 font-display tracking-tight">
                            Hello, {user?.fullName?.split(' ')[0] || 'there'}
                        </h1>
                        <p className="text-base font-semibold text-slate-500 mt-1">Record incoming material from a supplier</p>
                    </div>
                    <span className="text-sm font-semibold text-slate-400 self-start md:self-auto">Connected to EcoLyft ledger</span>
                </div>

                <div className="bg-white rounded-[24px] border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
                    {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
                    )}

                    {loadingData ? (
                        <p className="text-sm text-slate-500">Loading suppliers and materials...</p>
                    ) : (
                        <>
                            <div className="space-y-2">
                                <label htmlFor="supplier" className="text-sm font-bold text-slate-700">Supplier</label>
                                <div className="relative">
                                    <select
                                        id="supplier"
                                        value={collectorId}
                                        onChange={e => setCollectorId(e.target.value)}
                                        className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl appearance-none text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                                    >
                                        {collectors.length === 0 ? (
                                            <option value="">No suppliers yet</option>
                                        ) : (
                                            collectors.map(collector => (
                                                <option key={collector.id} value={collector.id}>{collector.name}</option>
                                            ))
                                        )}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                </div>
                                {collectors.length === 0 && (
                                    <p className="text-xs text-slate-500">
                                        <Link to="/collectors/new" className="text-brand-blue font-bold hover:underline">Add a supplier</Link> first.
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="materialType" className="text-sm font-bold text-slate-700">Material type</label>
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <select
                                            id="materialType"
                                            value={materialType}
                                            onChange={e => setMaterialType(e.target.value)}
                                            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl appearance-none text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                                        >
                                            {materials.length === 0 ? (
                                                <>
                                                    <option value="PET Clear Bottles">PET Clear Bottles</option>
                                                    <option value="HDPE Caps">HDPE Caps</option>
                                                    <option value="PP">PP</option>
                                                </>
                                            ) : (
                                                materials.map(material => (
                                                    <option key={material.id} value={material.name}>{material.name}</option>
                                                ))
                                            )}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                    </div>
                                    <button
                                        type="button"
                                        className="w-12 h-12 border border-[#3B82F6] rounded-xl flex items-center justify-center text-[#3B82F6] hover:bg-blue-50/50 active:scale-95 transition-all flex-shrink-0"
                                        aria-label="Add new material type"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="grossWeight" className="text-sm font-bold text-slate-700">Gross weight (kg)</label>
                                    <input
                                        type="text"
                                        id="grossWeight"
                                        value={grossWeight}
                                        onChange={e => setGrossWeight(e.target.value)}
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="unitPrice" className="text-sm font-bold text-slate-700">Unit Price (₦/Kg)</label>
                                    <input
                                        type="text"
                                        id="unitPrice"
                                        value={unitPrice}
                                        onChange={e => handleUnitPriceChange(e.target.value)}
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="netWeight" className="text-sm font-bold text-slate-700">Net weight (kg)</label>
                                    <input
                                        type="text"
                                        id="netWeight"
                                        value={netWeight}
                                        onChange={e => handleNetWeightChange(e.target.value)}
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="sumPrice" className="text-sm font-bold text-slate-700">Sum Price (₦)</label>
                                    <input
                                        type="text"
                                        id="sumPrice"
                                        value={sumPrice}
                                        readOnly
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-sm focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="date" className="text-sm font-bold text-slate-700">Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        id="date"
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-brand-blue transition-all"
                                    />
                                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3B82F6] pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Photo</label>
                                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl py-8 cursor-pointer bg-[#F8FAFC]/50 hover:bg-slate-50 hover:border-slate-300 transition-all">
                                    <Camera className="w-6 h-6 text-slate-400 mb-2" />
                                    <span className="text-sm font-bold text-slate-400">Photo upload coming soon</span>
                                    <input type="file" className="hidden" disabled />
                                </label>
                            </div>

                            <div className="flex items-start gap-4 bg-[#FFFBEB] border border-[#FEF3C7] rounded-2xl p-4">
                                <AlertTriangle className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-[#D97706]">Review pricing before saving</p>
                                    <p className="text-xs font-semibold text-[#D97706]/80 leading-relaxed">
                                        This purchase will create a new inbound batch and link it to your supplier record.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading || loadingData}
                                className="w-full bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-60 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/10 active:scale-[0.99] transition-all"
                            >
                                {loading ? 'Saving purchase...' : 'Generate Invoice'}
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="w-full lg:w-[320px] flex-shrink-0 space-y-4">
                <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl p-5 shadow-sm">
                    <p className="text-[#16A34A] text-xs font-bold uppercase tracking-wider">Today's In-Bound</p>
                    <p className="text-[#16A34A] text-3xl font-extrabold mt-1.5 font-display">{netWeight || '0'} KG</p>
                    <div className="mt-1">
                        <p className="text-[#16A34A]/90 text-[13px] font-bold">NGN {sumPrice}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
