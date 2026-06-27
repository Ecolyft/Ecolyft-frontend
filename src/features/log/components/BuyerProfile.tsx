import React from 'react'
import { MapPin, Calendar, Tag, FileText, AlertCircle, Building2, Download, ChevronRight, SquarePen, CreditCard, ShoppingBag } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const transactionData = [
    { date: '3 oct 24, 2023', batchId: '#Bxe-9021', type: 'PET Flakes', typeColor: 'bg-[#3B82F6]', weight: '1,240', price: '₦150', total: '₦186,000' },
    { date: '3 oct 20, 2023', batchId: '#Bxe-8954', type: 'HDPE Regrind', typeColor: 'bg-[#0E8A43]', weight: '850', price: '₦180', total: '₦153,000' },
    { date: '3 oct 18, 2023', batchId: '#Bxe-8842', type: 'PET Flakes', typeColor: 'bg-[#3B82F6]', weight: '2,100', price: '₦145', total: '₦304,500' },
    { date: '3 oct 12, 2023', batchId: '#Bxe-8722', type: 'Cardboard', typeColor: 'bg-slate-800', weight: '5,400', price: '₦45', total: '₦243,000' },
]

export const BuyerProfile: React.FC = () => {
    return (
        <div className="space-y-8 w-full max-w-6xl mx-auto pb-12">
            {/* Top Breadcrumb & Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-[13px] font-medium mb-4">
                        <span className="text-slate-400 hover:underline cursor-pointer">Settings</span>
                        <span className="text-slate-300">&gt;</span>
                        <span className="text-slate-400 hover:underline cursor-pointer">Partners</span>
                        <span className="text-slate-300">&gt;</span>
                        <span className="text-brand-blue font-bold">Partner Profile</span>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-[28px] font-bold text-slate-900 font-display">EcoCycle Ltd</h1>
                        <span className="bg-emerald-100 text-emerald-600 text-[11px] font-bold px-3 py-1 rounded-[4px] uppercase tracking-widest">Active</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-slate-500">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span className="text-[13px] font-semibold text-slate-500">Lagos, Nigeria</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-[13px] font-semibold text-slate-500">Joined 3 oct 2022</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-3">
                    <button
                        className="px-5 py-2.5 bg-white border border-slate-300 text-brand-blue rounded-lg text-[13px] font-bold hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
                    >
                        <SquarePen className="w-4 h-4 text-brand-blue" /> Edit Profile
                    </button>
                    <Link
                        to="/log-sale"
                        className="px-5 py-2.5 bg-brand-blue text-white rounded-lg text-[13px] font-bold hover:bg-[#2563EB] transition-colors shadow-sm flex items-center gap-2"
                    >
                        <ShoppingBag className="w-4 h-4 text-white" /> Log New Sale
                    </Link>
                </div>
            </div>

            {/* KPI Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between min-h-[140px]">
                    <div className="w-8 h-8 rounded bg-[#EBF3FC] flex items-center justify-center text-brand-blue mb-6">
                        <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Total Volume</p>
                        <p className="text-[24px] font-bold text-slate-800 leading-none font-display">18.4 <span className="text-[14px] text-slate-400 font-medium">t</span></p>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between min-h-[140px]">
                    <div className="w-8 h-8 rounded bg-[#EBF3FC] flex items-center justify-center text-brand-blue mb-6">
                        <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Total Revenue</p>
                        <p className="text-[24px] font-bold text-slate-800 leading-none font-display">₦2.7M</p>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between min-h-[140px]">
                    <div className="w-8 h-8 rounded bg-[#EBF3FC] flex items-center justify-center text-brand-blue mb-6">
                        <Tag className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Avg. Price</p>
                        <p className="text-[24px] font-bold text-slate-800 leading-none font-display">₦148</p>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between min-h-[140px]">
                    <div className="w-8 h-8 rounded bg-[#EBF3FC] flex items-center justify-center text-brand-blue mb-6">
                        <FileText className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Transactions</p>
                        <p className="text-[24px] font-bold text-slate-800 leading-none font-display">142</p>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between min-h-[140px]">
                    <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center text-red-500 mb-6">
                        <AlertCircle className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Outstanding Balance</p>
                        <p className="text-[24px] font-bold text-red-500 leading-none font-display">₦420,000</p>
                    </div>
                </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <div className="flex items-center gap-2 mb-8 border-b border-slate-100 pb-4">
                    <Building2 className="w-5 h-5 text-brand-blue" />
                    <h2 className="text-lg font-bold text-slate-800 font-display">Contact Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 max-w-4xl">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Business Name</p>
                        <p className="text-[14px] font-bold text-slate-800">EcoCycle Ltd</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Contact Person</p>
                        <p className="text-[14px] font-bold text-slate-800">Tunde Adewale</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Business Address</p>
                        <p className="text-[14px] font-bold text-slate-800 max-w-md">Warehouse 14, Industrial Estate, Apapa, Lagos, Nigeria</p>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email Address</p>
                            <p className="text-[14px] font-bold text-slate-800">t.adewale@ecocycle.com</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Phone Number</p>
                            <p className="text-[14px] font-bold text-slate-800">+234 802 123 4567</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 flex items-center justify-between border-b border-slate-100 bg-white">
                    <h2 className="text-[16px] font-bold text-slate-800 font-display">Transaction History</h2>
                    <div className="flex items-center gap-6">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all bg-white shadow-sm">
                            <Download className="w-3.5 h-3.5" /> Export CSV
                        </button>
                        <button className="text-[12px] font-bold text-brand-blue flex items-center gap-1 hover:text-[#2563EB]">
                            View All <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-[13px]">
                        <thead>
                            <tr className="bg-slate-50/70 border-b border-slate-200">
                                <th className="px-6 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest">Sale Date</th>
                                <th className="px-6 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest">Batch ID</th>
                                <th className="px-6 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest">Material Type</th>
                                <th className="px-6 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest">Weight (kg)</th>
                                <th className="px-6 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest">Price (N/kg)</th>
                                <th className="px-6 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-widest text-right pr-6">Total (N)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {transactionData.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-5 font-semibold text-slate-500 text-xs">{row.date}</td>
                                    <td className="px-6 py-5 font-bold text-brand-blue cursor-pointer hover:underline">
                                        <Link to="/batches/$batchId" params={{ batchId: row.batchId }}>{row.batchId}</Link>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${row.typeColor}`}></div>
                                            <span className="font-bold text-slate-700 text-xs">{row.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 font-bold text-slate-700 text-xs">{row.weight}</td>
                                    <td className="px-6 py-5 font-semibold text-slate-500 text-xs">{row.price}</td>
                                    <td className="px-6 py-5 font-bold text-slate-800 text-xs text-right pr-6">{row.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100 bg-[#FCFCFD]">
                    <span className="text-[12px] font-medium text-slate-500 font-bold">Showing 1 to 10 of 142 transactions</span>
                    <div className="flex gap-1">
                        <button className="px-3 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 text-[12px] font-medium">&lt; Previous</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded bg-brand-blue text-white font-bold text-[12px]">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded text-slate-600 hover:bg-slate-50 font-medium text-[12px]">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded text-slate-600 hover:bg-slate-50 font-medium text-[12px]">3</button>
                        <span className="w-8 h-8 flex items-center justify-center text-slate-400">...</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded text-slate-600 hover:bg-slate-50 font-medium text-[12px]">10</button>
                        <button className="px-3 h-8 flex items-center justify-center rounded border border-slate-200 text-brand-blue hover:bg-slate-50 text-[12px] font-medium">Next &gt;</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
