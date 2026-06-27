import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { UserPlus, MapPin, Recycle, Layers, Droplet, Leaf } from 'lucide-react'

export const AddBuyer: React.FC = () => {
    const navigate = useNavigate()
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>(['PET Clear'])

    const toggleMaterial = (material: string) => {
        if (selectedMaterials.includes(material)) {
            setSelectedMaterials(selectedMaterials.filter(m => m !== material))
        } else {
            setSelectedMaterials([...selectedMaterials, material])
        }
    }

    const materialOptions = [
        { id: 'PET Clear', label: 'PET Clear', icon: Recycle },
        { id: 'PET Mixed', label: 'PET Mixed', icon: Layers },
        { id: 'HDPE', label: 'HDPE', icon: Droplet },
        { id: 'PP', label: 'PP', icon: Leaf },
    ]

    return (
        <div className="space-y-8 w-full max-w-4xl mx-auto pb-12">
            {/* Top Breadcrumb */}
            <div className="flex items-center gap-2 text-[13px] font-medium mb-6">
                <span className="text-slate-400 hover:underline cursor-pointer">Settings</span>
                <span className="text-slate-300">&gt;</span>
                <span className="text-slate-400 hover:underline cursor-pointer">Partners</span>
                <span className="text-slate-300">&gt;</span>
                <span className="text-brand-blue font-bold">Add New Buyer</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-8">
                {/* Header Section */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-50 rounded-xl text-brand-blue">
                            <UserPlus className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800 font-display">Buyer Onboarding</h1>
                    </div>
                    <hr className="border-slate-100" />
                </div>

                <div className="space-y-8">
                    {/* Primary Identity Section */}
                    <section>
                        <div className="flex items-center gap-2 mb-6 border-l-[3.5px] border-l-brand-blue pl-2.5">
                            <h2 className="text-[15px] font-bold text-slate-800 uppercase tracking-wider">Primary Identity</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-[13px] font-bold text-slate-600 mb-2">
                                    Business Name
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Green Globe Trotters Limited" 
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all placeholder-slate-400"
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-slate-600 mb-2">
                                    Contact Person
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="John Doe" 
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all placeholder-slate-400"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-[13px] font-bold text-slate-600 mb-2">
                                    Location/Area
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Industrial Zone A, Lagos" 
                                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all placeholder-slate-400"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-slate-600 mb-2">
                                    Email Address
                                </label>
                                <input 
                                    type="email" 
                                    placeholder="contact@ecosystems.ltd" 
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all placeholder-slate-400"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[13px] font-bold text-slate-600 mb-2">
                                    Direct Office Line
                                </label>
                                <input 
                                    type="tel" 
                                    placeholder="+1 (555) 000-0000" 
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all placeholder-slate-400"
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-slate-600 mb-2">
                                    Company Support Line
                                </label>
                                <input 
                                    type="tel" 
                                    placeholder="+1 (555) 000-0000" 
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all placeholder-slate-400"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Material Interest Section */}
                    <section>
                        <div className="flex items-center gap-2 mb-6 border-l-[3.5px] border-l-brand-blue pl-2.5">
                            <h2 className="text-[15px] font-bold text-slate-800 uppercase tracking-wider">Material Interest</h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {materialOptions.map(item => {
                                const Icon = item.icon
                                const isSelected = selectedMaterials.includes(item.id)
                                return (
                                    <div 
                                        key={item.id}
                                        onClick={() => toggleMaterial(item.id)}
                                        className={`border rounded-xl p-6 cursor-pointer flex flex-col items-center justify-center text-center shadow-sm transition-all group ${
                                            isSelected 
                                                ? "border-brand-blue bg-blue-50/10" 
                                                : "border-slate-200 bg-white hover:border-brand-blue/50 hover:bg-slate-50/50"
                                        }`}
                                    >
                                        <div className={`w-10 h-10 rounded-lg border flex items-center justify-center mb-3 transition-colors ${
                                            isSelected
                                                ? "bg-blue-50 border-brand-blue/20 text-brand-blue"
                                                : "bg-slate-50 border-slate-100 text-slate-500 group-hover:text-slate-700"
                                        }`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <p className={`text-[12px] font-bold transition-colors ${
                                            isSelected ? "text-slate-800" : "text-slate-600"
                                        }`}>{item.label}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </div>

                {/* Footer Actions */}
                <div className="mt-12 pt-6 border-t border-slate-100 flex justify-end gap-4">
                    <button
                        onClick={() => alert('Saved as draft!')}
                        className="px-6 py-2.5 bg-white border border-brand-blue text-brand-blue rounded-lg text-[13px] font-bold hover:bg-blue-50/50 transition-colors shadow-sm"
                    >
                        Save as Draft
                    </button>
                    <button
                        onClick={() => navigate({ to: '/buyers' })}
                        className="px-6 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm"
                    >
                        Complete Registration
                    </button>
                </div>
            </div>
        </div>
    )
}
