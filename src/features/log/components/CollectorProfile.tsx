import React from 'react'
import { MapPin, Package, TrendingUp, Droplets, ArrowRight, Building2, Copy, Leaf, TreePine, Zap } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const historyData = [
    { date: 'Oct 24, 2023', type: 'PET PLASTIC', typeColor: 'bg-[#EBF3FC] text-[#3B82F6]', weight: '420 kg' },
    { date: 'Oct 21, 2023', type: 'ALUMINUM', typeColor: 'bg-slate-100 text-slate-600', weight: '185 kg' },
    { date: 'Oct 18, 2023', type: 'PET PLASTIC', typeColor: 'bg-[#EBF3FC] text-[#3B82F6]', weight: '310 kg' },
    { date: 'Oct 15, 2023', type: 'CARDBOARD', typeColor: 'bg-[#FFF4ED] text-[#EA580C]', weight: '640 kg' },
]

export const CollectorProfile: React.FC = () => {
    return (
        <div className="space-y-8 w-full max-w-7xl mx-auto pb-12">
            {/* Top Breadcrumb & Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-[13px] font-medium mb-4">
                        <Link to="/collectors" className="text-slate-400 hover:text-slate-600">Collector</Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-[#3B82F6]">Collector Profile</span>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-[24px] font-bold text-slate-900">Sani Mohammed</h1>
                        <span className="bg-[#0E8A43] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Active</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="w-4 h-4" />
                        <span className="text-[14px] font-medium">Lagos Central Collection Hub</span>
                    </div>
                </div>
                
                <button className="px-6 py-2.5 bg-white border-2 border-[#3B82F6] text-[#3B82F6] rounded-lg text-[14px] font-bold hover:bg-[#EBF3FC] transition-colors">
                    Edit Profile
                </button>
            </div>

            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-8">
                        <div className="w-10 h-10 rounded-lg bg-[#EBF3FC] flex items-center justify-center text-[#3B82F6]">
                            <Package className="w-5 h-5" />
                        </div>
                        <span className="text-[#0E8A43] text-[12px] font-bold">+12% vs last month</span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Volume<br/>Supplied</p>
                    <p className="text-[36px] font-bold text-slate-900 leading-none">12.8 <span className="text-[16px] text-slate-400 font-medium">t</span></p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-8">
                        <div className="w-10 h-10 rounded-lg bg-[#EDF7ED] flex items-center justify-center text-[#0E8A43]">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <span className="text-[#0E8A43] text-[12px] font-bold">High Yield</span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avg. Yield Rate</p>
                    <p className="text-[36px] font-bold text-slate-900 leading-none mt-4">88.4 <span className="text-[16px] text-slate-400 font-medium">%</span></p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-8">
                        <div className="w-10 h-10 rounded-lg bg-[#FDE8E8] flex items-center justify-center text-[#d34545]">
                            <Droplets className="w-5 h-5" />
                        </div>
                        <span className="text-[#d34545] text-[12px] font-bold">Below Target</span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Contamination Rate</p>
                    <p className="text-[36px] font-bold text-slate-900 leading-none mt-4">3.2 <span className="text-[16px] text-slate-400 font-medium">%</span></p>
                </div>
            </div>

            {/* Bottom 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (Supply History & Map) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Supply History */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 flex items-center justify-between border-b border-slate-50">
                            <h2 className="text-[18px] font-bold text-slate-900">Supply History</h2>
                            <button className="text-[13px] font-bold text-[#3B82F6] hover:text-[#2563EB] flex items-center gap-1">
                                View Full Report <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-50">
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Material Type</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Weight</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {historyData.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-5 text-[14px] font-medium text-slate-600">{row.date}</td>
                                        <td className="px-6 py-5">
                                            <span className={`px-2.5 py-1 rounded-[4px] text-[11px] font-bold uppercase tracking-wider ${row.typeColor}`}>
                                                {row.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-[14px] font-bold text-slate-900 text-right">{row.weight}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Map Area */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="h-64 bg-[#BEE5D3] w-full relative overflow-hidden flex items-center justify-center">
                            {/* Abstract Map Graphic (Placeholder) */}
                            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cartographer.png")' }}></div>
                            
                            {/* Blinking Map Marker */}
                            <div className="relative z-10 flex items-center justify-center">
                                <div className="absolute w-12 h-12 bg-[#3B82F6] rounded-full opacity-20 animate-ping"></div>
                                <div className="absolute w-8 h-8 bg-[#3B82F6] rounded-full opacity-40 animate-pulse"></div>
                                <div className="w-4 h-4 bg-[#3B82F6] rounded-full border-2 border-white shadow-lg z-20"></div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-50">
                            <h3 className="text-[15px] font-bold text-slate-900 mb-1">Primary Collection Point</h3>
                            <p className="text-[13px] font-medium text-slate-500">Hub Sector 4, Mainland Lagos Zone B</p>
                        </div>
                    </div>
                </div>

                {/* Right Column (Bank Details & Sustainability) */}
                <div className="space-y-6">
                    {/* Bank Details */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Building2 className="w-5 h-5 text-[#3B82F6]" />
                            <h2 className="text-[16px] font-bold text-slate-900">Bank Details</h2>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Account Holder</p>
                                <p className="text-[15px] font-bold text-slate-900">Sani Mohammed Enterprises</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bank Name</p>
                                    <p className="text-[14px] font-bold text-slate-900">Ecobank Nigeria</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Currency</p>
                                    <p className="text-[14px] font-bold text-slate-900">NGN (₦)</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Account Number</p>
                                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <p className="text-[16px] font-mono font-bold tracking-wider text-slate-900">**** **** 5621</p>
                                    <button className="text-slate-400 hover:text-slate-600">
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <button className="w-full py-3 bg-[#F5A623] hover:bg-[#E09612] text-white rounded-lg text-[14px] font-bold transition-colors mt-2">
                                Verify Payouts
                            </button>
                        </div>
                    </div>

                    {/* Sustainability Impact */}
                    <div className="rounded-2xl p-6 shadow-sm bg-gradient-to-br from-[#2D8C59] to-[#1F6E43] text-white relative overflow-hidden">
                        {/* Decorative leaf bg */}
                        <Leaf className="absolute -right-8 -bottom-8 w-48 h-48 text-white opacity-10" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6">
                                <Leaf className="w-5 h-5 text-[#A8E6B8]" />
                                <h2 className="text-[16px] font-bold text-white">Sustainability Impact</h2>
                            </div>

                            <p className="text-[13px] font-medium text-[#A8E6B8] mb-1">Estimated Carbon Savings</p>
                            <p className="text-[40px] font-bold leading-none mb-8">4.2 <span className="text-[16px] font-bold uppercase tracking-widest">Tons CO2</span></p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <TreePine className="w-4 h-4 text-[#A8E6B8]" />
                                    </div>
                                    <p className="text-[13px] font-medium">Equivalent to 192 mature trees planted</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <Zap className="w-4 h-4 text-[#FDE68A]" />
                                    </div>
                                    <p className="text-[13px] font-medium">Saved 28.4 MWh of production energy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
