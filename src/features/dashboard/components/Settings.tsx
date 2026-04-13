import React from 'react'
import { Settings as SettingsIcon, Package, Weight, Building2, Target, Plus, ChevronRight } from 'lucide-react'

export const Settings: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="space-y-2">
                <h1 className="text-2xl font-display font-bold text-brand-dark">Settings</h1>
                <p className="text-slate-500">Configure your facility, materials, and production goals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar Nav */}
                <div className="space-y-2">
                    <SettingsNavItem icon={Building2} label="Company Profile" active />
                    <SettingsNavItem icon={Package} label="Materials Config" />
                    <SettingsNavItem icon={Weight} label="Equipment Registry" />
                    <SettingsNavItem icon={Target} label="Production Targets" />
                </div>

                {/* Content Area */}
                <div className="md:col-span-2 space-y-8">
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
                        <h3 className="font-bold text-brand-dark">Company Profile</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase">Business Name</label>
                                <input type="text" defaultValue="EcoRecycle Ltd" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase">Business Type</label>
                                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                                    <option>Aggregator</option>
                                    <option>Recycler</option>
                                    <option>Both</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">Facility Location</label>
                            <input type="text" defaultValue="Ikeja, Lagos" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-brand-dark">Weighing Scales</h3>
                            <button className="text-brand-blue text-xs font-bold flex items-center space-x-1">
                                <Plus className="w-3 h-3" />
                                <span>Add Scale</span>
                            </button>
                        </div>
                        <div className="divide-y divide-slate-100">
                            <div className="py-4 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-brand-dark">Scale #002 (Inbound)</p>
                                    <p className="text-xs text-slate-500">Last calibrated: May 2025</p>
                                </div>
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded">Calibrated</span>
                            </div>
                            <div className="py-4 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-brand-dark">Scale #003 (Output)</p>
                                    <p className="text-xs text-slate-500">Last calibrated: Jan 2025</p>
                                </div>
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-black uppercase rounded">Calibration Near</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SettingsNavItem({ icon: Icon, label, active }: any) {
    return (
        <button className={cn(
            "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all",
            active ? "bg-brand-navy text-white shadow-lg shadow-brand-navy/10" : "bg-white text-slate-600 border border-slate-100 hover:bg-slate-50"
        )}>
            <div className="flex items-center space-x-3">
                <Icon className={cn("w-4 h-4", active ? "text-blue-300" : "text-slate-400")} />
                <span className="text-sm font-bold">{label}</span>
            </div>
            <ChevronRight className={cn("w-4 h-4 opacity-50", active ? "block" : "hidden")} />
        </button>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ')
}
