import React from 'react'
import { FileText, Download, Share2, TrendingUp, Users, ShieldCheck, Landmark } from 'lucide-react'

export const Reports: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="space-y-2">
                <h1 className="text-2xl font-display font-bold text-brand-dark">Reports & Analytics</h1>
                <p className="text-slate-500">Generate auditable reports for internal review or bank applications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ReportCard
                    title="Business Health"
                    desc="Full P&L, stock movements, and yield trends for the selected period."
                    icon={TrendingUp}
                    color="text-brand-blue bg-brand-blue/5"
                />
                <ReportCard
                    title="Bank-Ready Financials"
                    desc="One-page executive summary with verified tonnage and data integrity logs."
                    icon={Landmark}
                    color="text-emerald-600 bg-emerald-50"
                />
                <ReportCard
                    title="Collector Performance"
                    desc="Ranked list of collectors by profit, volume, and material quality."
                    icon={Users}
                    color="text-purple-600 bg-purple-50"
                />
                <ReportCard
                    title="EPR Compliance Pack"
                    desc="Aggregated tonnage reports for Extended Producer Responsibility reporting."
                    icon={ShieldCheck}
                    color="text-slate-700 bg-slate-100"
                />
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
                <h3 className="font-bold text-brand-dark">Generate Custom Report</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Report Type</label>
                        <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                            <option>Business Health</option>
                            <option>Bank-Ready Financials</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Start Date</label>
                        <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">End Date</label>
                        <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                    </div>
                </div>
                <button className="w-full bg-brand-navy text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-brand-navy/10">
                    <FileText className="w-5 h-5" />
                    <span>Generate PDF Report</span>
                </button>
            </div>
        </div>
    )
}

function ReportCard({ title, desc, icon: Icon, color }: any) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all group flex flex-col justify-between">
            <div className="space-y-4">
                <div className={cn("p-4 w-fit rounded-2xl transition-colors", color)}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                    <h3 className="font-bold text-brand-dark group-hover:text-brand-blue transition-colors">{title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4 pt-6 mt-4 border-t border-slate-50">
                <button className="text-xs font-bold text-slate-500 flex items-center space-x-1 hover:text-brand-blue">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                </button>
                <button className="text-xs font-bold text-slate-500 flex items-center space-x-1 hover:text-brand-blue">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                </button>
            </div>
        </div>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ')
}
