import React from 'react'
import { MapPin, Calendar, Package, Banknote, Tag, FileText, AlertCircle, Building2, Download, ChevronRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const transactionData = [
    { date: 'Oct 24, 2023', batchId: '#Bxe9021', type: 'PET Flakes', typeColor: 'bg-[#3B82F6]', weight: '1,240', price: '₦150', total: '₦186,000' },
    { date: 'Oct 20, 2023', batchId: '#Bxe8954', type: 'HDPE Regrind', typeColor: 'bg-[#0E8A43]', weight: '850', price: '₦180', total: '₦153,000' },
    { date: 'Oct 18, 2023', batchId: '#Bxe8842', type: 'PET Flakes', typeColor: 'bg-[#3B82F6]', weight: '2,100', price: '₦145', total: '₦304,500' },
    { date: 'Oct 12, 2023', batchId: '#Bxe8722', type: 'Cardboard', typeColor: 'bg-slate-800', weight: '5,400', price: '₦45', total: '₦243,000' },
]

export const BuyerProfile: React.FC = () => {
    return (
        <div className="space-y-8 w-full max-w-6xl mx-auto pb-12">
            {/* Top Breadcrumb & Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-[13px] font-medium mb-4">
                        <Link to="/settings" className="text-slate-400 hover:text-slate-600">Settings</Link>
                        <span className="text-slate-300">/</span>
                        <Link to="/buyers" className="text-slate-400 hover:text-slate-600">Partners</Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-[#3B82F6]">Partner Profile</span>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-[28px] font-bold text-slate-900">GreenCycle Ltd</h1>
                        <span className="bg-[#A8E6B8] text-[#0A5C2F] text-[11px] font-bold px-3 py-1 rounded-[4px] uppercase tracking-widest">Active</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-slate-500">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span className="text-[13px] font-medium">Lagos, Nigeria</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span className="text-[13px] font-medium">Joined Oct 2022</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-white border border-[#3B82F6] text-[#3B82F6] rounded-lg text-[13px] font-bold hover:bg-[#EBF3FC] transition-colors flex items-center gap-2">
                        Edit Profile
                    </button>
                    <button className="px-5 py-2.5 bg-[#3B82F6] text-white rounded-lg text-[13px] font-bold hover:bg-[#2563EB] transition-colors shadow-sm flex items-center gap-2">
                        <Package className="w-4 h-4" /> Log New Sale
                    </button>
                </div>
            </div>

            {/* KPI Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
                    <div className="w-8 h-8 rounded bg-[#EBF3FC] flex items-center justify-center text-[#3B82F6] mb-6">
                        <Package className="w-4 h-4" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Volume</p>
                    <p className="text-[24px] font-bold text-slate-900 leading-none">18.4 <span className="text-[14px] text-slate-400 font-medium">t</span></p>
                </div>
                
                <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
                    <div className="w-8 h-8 rounded bg-[#EBF3FC] flex items-center justify-center text-[#3B82F6] mb-6">
                        <Banknote className="w-4 h-4" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Revenue</p>
                    <p className="text-[24px] font-bold text-slate-900 leading-none">₦2.7M</p>
                </div>
                
                <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
                    <div className="w-8 h-8 rounded bg-[#EBF3FC] flex items-center justify-center text-[#3B82F6] mb-6">
                        <Tag className="w-4 h-4" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avg. Price</p>
                    <p className="text-[24px] font-bold text-slate-900 leading-none">₦148</p>
                </div>
                
                <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
                    <div className="w-8 h-8 rounded bg-[#EBF3FC] flex items-center justify-center text-[#3B82F6] mb-6">
                        <FileText className="w-4 h-4" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Transactions</p>
                    <p className="text-[24px] font-bold text-slate-900 leading-none">142</p>
                </div>
                
                <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#FDE8E8] rounded-bl-full -z-10"></div>
                    <div className="w-8 h-8 rounded bg-[#FDE8E8] flex items-center justify-center text-[#d34545] mb-6">
                        <AlertCircle className="w-4 h-4" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Outstanding Balance</p>
                    <p className="text-[24px] font-bold text-[#d34545] leading-none">₦420,000</p>
                </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-8">
                    <Building2 className="w-5 h-5 text-[#3B82F6]" />
                    <h2 className="text-[16px] font-bold text-slate-900">Contact Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 max-w-4xl">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Business Name</p>
                        <p className="text-[14px] font-bold text-slate-900">GreenCycle Ltd</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Contact Person</p>
                        <p className="text-[14px] font-bold text-slate-900">Tunde Adewale</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Business Address</p>
                        <p className="text-[14px] font-bold text-slate-900 max-w-xs">Warehouse 14, Industrial Estate, Apapa, Lagos, Nigeria</p>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email Address</p>
                            <p className="text-[14px] font-bold text-slate-900">t.adewale@greencycle.ltd</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Phone Number</p>
                            <p className="text-[14px] font-bold text-slate-900">+234 802 123 4567</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 flex items-center justify-between border-b border-slate-50">
                    <h2 className="text-[16px] font-bold text-slate-900">Transaction History</h2>
                    <div className="flex items-center gap-6">
                        <button className="text-[12px] font-bold text-slate-600 flex items-center gap-1.5 hover:text-slate-900">
                            <Download className="w-4 h-4" /> Export CSV
                        </button>
                        <button className="text-[12px] font-bold text-[#3B82F6] flex items-center gap-1 hover:text-[#2563EB]">
                            View All <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-[13px]">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-6 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest">Sale Date</th>
                                <th className="px-6 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest">Batch ID</th>
                                <th className="px-6 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest">Material Type</th>
                                <th className="px-6 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest">Weight (kg)</th>
                                <th className="px-6 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest">Price (N/kg)</th>
                                <th className="px-6 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest">Total (N)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {transactionData.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-5 font-medium text-slate-500">{row.date}</td>
                                    <td className="px-6 py-5 font-bold text-[#3B82F6]">{row.batchId}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${row.typeColor}`}></div>
                                            <span className="font-bold text-slate-900">{row.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 font-medium text-slate-700">{row.weight}</td>
                                    <td className="px-6 py-5 font-medium text-slate-700">{row.price}</td>
                                    <td className="px-6 py-5 font-bold text-slate-900">{row.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 flex items-center justify-between border-t border-slate-50 bg-[#FCFCFD]">
                    <span className="text-[12px] font-medium text-slate-500">Showing 1 to 10 of 142 transactions</span>
                    <div className="flex gap-1">
                        <button className="px-3 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 text-[12px] font-medium">&lt; Previous</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded bg-[#4285F4] text-white font-bold text-[12px]">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded text-slate-600 hover:bg-slate-50 font-medium text-[12px]">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded text-slate-600 hover:bg-slate-50 font-medium text-[12px]">3</button>
                        <span className="w-8 h-8 flex items-center justify-center text-slate-400">...</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded text-slate-600 hover:bg-slate-50 font-medium text-[12px]">10</button>
                        <button className="px-3 h-8 flex items-center justify-center rounded border border-slate-200 text-[#3B82F6] hover:bg-slate-50 text-[12px] font-medium">Next &gt;</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
