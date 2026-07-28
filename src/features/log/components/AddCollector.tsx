import React, { useState } from 'react'
import { FileText, MapPin, Building2, Package, Check } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { entitiesApi, ApiError } from '../../../lib/api'

export const AddCollector: React.FC = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async () => {
        if (!name || !phone) {
            setError('Name and phone are required.')
            return
        }

        setError('')
        setLoading(true)
        try {
            await entitiesApi.createCollector({ name, phone, location: location || undefined })
            navigate({ to: '/collectors' })
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to create supplier.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8 w-full max-w-3xl mx-auto pb-12">
            <div className="flex items-center gap-2 text-[13px] font-medium mb-6">
                <Link to="/collectors" className="text-slate-400 hover:text-slate-600">Collector</Link>
                <span className="text-slate-300">/</span>
                <span className="text-[#3B82F6]">Add New Collector</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] p-6 relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rotate-45 transform origin-top-right"></div>
                    <div className="absolute right-32 -bottom-16 w-32 h-32 bg-white/10 rounded-full"></div>
                    <div className="relative z-10 text-white">
                        <h1 className="text-[20px] font-bold mb-1">Collector Profile</h1>
                        <p className="text-[13px] font-medium text-white/80">Basic Identity & Financial Details</p>
                    </div>
                </div>

                <div className="p-8 space-y-10">
                    {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
                    )}

                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <FileText className="w-5 h-5 text-[#3B82F6]" />
                            <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-widest">Primary Identity</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                                    Full Name <span className="text-[#d34545]">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="e.g. Jonathan Smith"
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                                    Phone Number <span className="text-[#d34545]">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder="+234 000 000 0000"
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-slate-700 mb-2">
                                Location/Area
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                    placeholder="Search or enter collection zone..."
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <Package className="w-5 h-5 text-[#0E8A43]" />
                            <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-widest">Material Types</h2>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">Material preferences can be configured after onboarding.</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="border-2 border-[#3B82F6] bg-[#F5F9FF] rounded-xl p-4 relative text-center">
                                <div className="absolute top-2 right-2 w-4 h-4 bg-[#3B82F6] rounded-full flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                                <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center text-[#3B82F6] mb-3 shadow-sm">
                                    <Package className="w-5 h-5" />
                                </div>
                                <p className="text-[12px] font-bold text-slate-900">PET Clear</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                        <div className="flex items-center gap-2 mb-6">
                            <Building2 className="w-5 h-5 text-[#F5A623]" />
                            <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-widest">Bank Details</h2>
                        </div>
                        <p className="text-sm text-slate-500">Payout account setup will connect when Anchor.io integration is complete.</p>
                    </section>
                </div>

                <div className="p-6 border-t border-slate-100 bg-[#FCFCFD] flex justify-center gap-4">
                    <Link
                        to="/collectors"
                        className="px-8 py-3 bg-white border-2 border-[#3B82F6] text-[#3B82F6] rounded-lg text-[14px] font-bold hover:bg-[#EBF3FC] transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-8 py-3 bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-60 text-white rounded-lg text-[14px] font-bold transition-colors shadow-sm"
                    >
                        {loading ? 'Saving...' : 'Complete Registration'}
                    </button>
                </div>
            </div>
        </div>
    )
}
