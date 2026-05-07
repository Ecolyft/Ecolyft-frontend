import React from 'react'
import { FileText, MapPin, Building2, Package, Check, ChevronDown } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const AddCollector: React.FC = () => {
    return (
        <div className="space-y-8 w-full max-w-3xl mx-auto pb-12">
            {/* Top Breadcrumb */}
            <div className="flex items-center gap-2 text-[13px] font-medium mb-6">
                <Link to="/collectors" className="text-slate-400 hover:text-slate-600">Collector</Link>
                <span className="text-slate-300">/</span>
                <span className="text-[#3B82F6]">Add New Collector</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] p-6 relative overflow-hidden">
                    {/* Abstract shapes for banner */}
                    <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rotate-45 transform origin-top-right"></div>
                    <div className="absolute right-32 -bottom-16 w-32 h-32 bg-white/10 rounded-full"></div>
                    
                    <div className="relative z-10 text-white">
                        <h1 className="text-[20px] font-bold mb-1">Collector Profile</h1>
                        <p className="text-[13px] font-medium text-white/80">Basic Identity & Financial Details</p>
                    </div>
                </div>

                <div className="p-8 space-y-10">
                    {/* Primary Identity Section */}
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
                                    placeholder="Search or enter collection zone..." 
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Material Types Section */}
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <Package className="w-5 h-5 text-[#0E8A43]" />
                            <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-widest">Material Types</h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {/* Material Card - Selected */}
                            <div className="border-2 border-[#3B82F6] bg-[#F5F9FF] rounded-xl p-4 cursor-pointer relative transition-all text-center">
                                <div className="absolute top-2 right-2 w-4 h-4 bg-[#3B82F6] rounded-full flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                                <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center text-[#3B82F6] mb-3 shadow-sm">
                                    <Package className="w-5 h-5" />
                                </div>
                                <p className="text-[12px] font-bold text-slate-900">PET Clear</p>
                            </div>

                            {/* Material Card - Unselected */}
                            <div className="border border-slate-200 bg-white hover:border-[#3B82F6] hover:bg-[#F5F9FF] rounded-xl p-4 cursor-pointer transition-all text-center group">
                                <div className="w-10 h-10 mx-auto bg-slate-50 group-hover:bg-white rounded-full flex items-center justify-center text-[#0E8A43] mb-3 transition-colors">
                                    <Package className="w-5 h-5" />
                                </div>
                                <p className="text-[12px] font-bold text-slate-700">PET Mixed</p>
                            </div>

                            <div className="border border-slate-200 bg-white hover:border-[#3B82F6] hover:bg-[#F5F9FF] rounded-xl p-4 cursor-pointer transition-all text-center group">
                                <div className="w-10 h-10 mx-auto bg-slate-50 group-hover:bg-white rounded-full flex items-center justify-center text-[#F59E0B] mb-3 transition-colors">
                                    <Package className="w-5 h-5" />
                                </div>
                                <p className="text-[12px] font-bold text-slate-700">HDPE</p>
                            </div>

                            <div className="border border-slate-200 bg-white hover:border-[#3B82F6] hover:bg-[#F5F9FF] rounded-xl p-4 cursor-pointer transition-all text-center group">
                                <div className="w-10 h-10 mx-auto bg-slate-50 group-hover:bg-white rounded-full flex items-center justify-center text-[#8B5CF6] mb-3 transition-colors">
                                    <Package className="w-5 h-5" />
                                </div>
                                <p className="text-[12px] font-bold text-slate-700">PP</p>
                            </div>
                        </div>
                    </section>

                    {/* Bank Details Section */}
                    <section className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                        <div className="flex items-center gap-2 mb-6">
                            <Building2 className="w-5 h-5 text-[#F5A623]" />
                            <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-widest">Bank Details</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                                    Bank Name
                                </label>
                                <div className="relative">
                                    <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] appearance-none cursor-pointer">
                                        <option value="" disabled selected>Select Bank</option>
                                        <option value="ecobank">Ecobank Nigeria</option>
                                        <option value="gtb">GTBank</option>
                                        <option value="access">Access Bank</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                                    Account Number
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="0000000000" 
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-900 outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all font-mono"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-100 bg-[#FCFCFD] flex justify-center gap-4">
                    <button className="px-8 py-3 bg-white border-2 border-[#3B82F6] text-[#3B82F6] rounded-lg text-[14px] font-bold hover:bg-[#EBF3FC] transition-colors">
                        Save as Draft
                    </button>
                    <button className="px-8 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg text-[14px] font-bold transition-colors shadow-sm">
                        Complete Registration
                    </button>
                </div>
            </div>
        </div>
    )
}
