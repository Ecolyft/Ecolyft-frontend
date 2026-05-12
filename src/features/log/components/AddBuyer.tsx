import React from 'react'
import { FileText, Building2, Briefcase, Check, ChevronDown, User } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'

export const AddBuyer: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className="space-y-8 w-full max-w-3xl mx-auto pb-12">
            {/* Top Breadcrumb */}
            <div className="flex items-center gap-2 text-[13px] font-medium mb-6">
                <Link to="/buyers" className="text-slate-400 hover:text-slate-600">Buyers / Partners</Link>
                <span className="text-slate-300">/</span>
                <span className="text-brand-blue">Add New Partner</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-brand-blue to-blue-400 p-6 relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rotate-45 transform origin-top-right"></div>
                    <div className="absolute right-32 -bottom-16 w-32 h-32 bg-white/10 rounded-full"></div>
                    
                    <div className="relative z-10 text-white">
                        <h1 className="text-[20px] font-bold mb-1">Buyer / Partner Profile</h1>
                        <p className="text-[13px] font-medium text-white/80">Company Details & Commercial Terms</p>
                    </div>
                </div>

                <div className="p-8 space-y-10">
                    {/* Company Identity Section */}
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <Building2 className="w-5 h-5 text-brand-blue" />
                            <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-widest">Company Identity</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                                    Company Name <span className="text-[#d34545]">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Poly-Nexus Manufacturing" 
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                                    Contact Person <span className="text-[#d34545]">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Full Name" 
                                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                                    Email Address
                                </label>
                                <input 
                                    type="email" 
                                    placeholder="procurement@company.ng" 
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                                    Phone Number
                                </label>
                                <input 
                                    type="tel" 
                                    placeholder="+234 000 000 0000" 
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Partner Type Section */}
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <Briefcase className="w-5 h-5 text-emerald-600" />
                            <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-widest">Partner Category</h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                { label: 'Fiber Processor', selected: true },
                                { label: 'Bottle Producer', selected: false },
                                { label: 'Export Partner', selected: false },
                                { label: 'FMCG Brand', selected: false },
                                { label: 'Logistics Partner', selected: false },
                            ].map(item => (
                                <div 
                                    key={item.label}
                                    className={cn(
                                        "border rounded-xl p-4 cursor-pointer relative transition-all text-center group",
                                        item.selected 
                                            ? "border-brand-blue bg-blue-50" 
                                            : "border-slate-200 bg-white hover:border-brand-blue hover:bg-blue-50"
                                    )}
                                >
                                    {item.selected && (
                                        <div className="absolute top-2 right-2 w-4 h-4 bg-brand-blue rounded-full flex items-center justify-center">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                    <p className={cn("text-[12px] font-bold", item.selected ? "text-slate-900" : "text-slate-700")}>{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Commercial Terms Section */}
                    <section className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                        <div className="flex items-center gap-2 mb-6">
                            <FileText className="w-5 h-5 text-amber-500" />
                            <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-widest">Commercial Terms</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                                    Payment Terms
                                </label>
                                <div className="relative">
                                    <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue appearance-none cursor-pointer">
                                        <option>Immediate / Upon Delivery</option>
                                        <option>Net 7 Days</option>
                                        <option>Net 15 Days</option>
                                        <option>Net 30 Days</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                                    Price Category
                                </label>
                                <div className="relative">
                                    <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue appearance-none cursor-pointer">
                                        <option>Premium Rate</option>
                                        <option>Standard Rate</option>
                                        <option>Bulk/Volume Discount</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-100 bg-[#FCFCFD] flex justify-center gap-4">
                    <button
                        onClick={() => alert('Saved as draft!')}
                        className="px-8 py-3 bg-white border-2 border-brand-blue text-brand-blue rounded-lg text-[14px] font-bold hover:bg-blue-50 transition-colors"
                    >
                        Save as Draft
                    </button>
                    <button
                        onClick={() => navigate({ to: '/buyers' })}
                        className="px-8 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-lg text-[14px] font-bold transition-colors shadow-sm"
                    >
                        Create Partner Profile
                    </button>
                </div>
            </div>
        </div>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ')
}
