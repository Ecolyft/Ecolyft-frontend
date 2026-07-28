import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { UserPlus, MapPin, Recycle, Layers, Droplet, Leaf } from 'lucide-react'
import { entitiesApi, ApiError } from '../../../lib/api'

export const AddBuyer: React.FC = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async () => {
        if (!name || !phone) {
            setError('Business name and phone are required.')
            return
        }

        setError('')
        setLoading(true)
        try {
            await entitiesApi.createBuyer({
                name,
                phone,
                email: email || undefined,
            })
            navigate({ to: '/buyers' })
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to create buyer.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8 w-full max-w-4xl mx-auto pb-12">
            <div className="flex items-center gap-2 text-[13px] font-medium mb-6">
                <span className="text-slate-400">Settings</span>
                <span className="text-slate-300">&gt;</span>
                <span className="text-slate-400">Partners</span>
                <span className="text-slate-300">&gt;</span>
                <span className="text-brand-blue font-bold">Add New Buyer</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-8">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-50 rounded-xl text-brand-blue">
                            <UserPlus className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800 font-display">Buyer Onboarding</h1>
                    </div>
                    <hr className="border-slate-100" />
                </div>

                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-6">{error}</div>
                )}

                <div className="space-y-8">
                    <section>
                        <div className="flex items-center gap-2 mb-6 border-l-[3.5px] border-l-brand-blue pl-2.5">
                            <h2 className="text-[15px] font-bold text-slate-800 uppercase tracking-wider">Primary Identity</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-[13px] font-bold text-slate-600 mb-2">Business Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Green Globe Trotters Limited"
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-slate-600 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder="+234 000 000 0000"
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-[13px] font-bold text-slate-600 mb-2">Location/Area</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={e => setLocation(e.target.value)}
                                        placeholder="Lagos Mainland"
                                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-slate-600 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="buyer@company.ng"
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all"
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-6 border-l-[3.5px] border-l-brand-blue pl-2.5">
                            <h2 className="text-[15px] font-bold text-slate-800 uppercase tracking-wider">Material Interest</h2>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">Material preferences can be configured after onboarding.</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: 'PET Clear', icon: Recycle },
                                { label: 'PET Mixed', icon: Layers },
                                { label: 'HDPE', icon: Droplet },
                                { label: 'PP', icon: Leaf },
                            ].map(item => (
                                <div key={item.label} className="border border-slate-200 bg-white rounded-xl p-4 text-center">
                                    <div className="w-10 h-10 mx-auto bg-slate-50 rounded-full flex items-center justify-center text-brand-blue mb-3">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <p className="text-[12px] font-bold text-slate-700">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="mt-12 pt-6 border-t border-slate-100 flex justify-end gap-4">
                    <button
                        onClick={() => navigate({ to: '/buyers' })}
                        className="px-6 py-2.5 bg-white border border-brand-blue text-brand-blue rounded-lg text-[13px] font-bold hover:bg-blue-50/50 transition-colors shadow-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-2.5 bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-60 text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm"
                    >
                        {loading ? 'Saving...' : 'Complete Registration'}
                    </button>
                </div>
            </div>
        </div>
    )
}
