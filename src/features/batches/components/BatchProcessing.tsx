import React from 'react'
import { ArrowLeft, Settings, Package, TrendingUp } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const BatchProcessing: React.FC = () => {
    return (
        <div className="space-y-6 w-full max-w-5xl mx-auto pb-12">
            <div className="flex items-center gap-4">
                <Link to="/batches" className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Processing: Batch ECO-0115-0042</h1>
                    <p className="text-sm text-slate-500 font-medium">Started on 12 Apr 2026 • 02:15 PM</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Live Progress Card */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <Settings className="w-4 h-4 text-brand-blue animate-spin-slow" />
                                Live Processing Status
                            </h2>
                            <span className="px-3 py-1 bg-blue-50 text-brand-blue rounded-full text-[11px] font-bold">IN PROGRESS</span>
                        </div>

                        <div className="space-y-10">
                            <Step 
                                title="Sorting & Cleaning" 
                                status="completed" 
                                description="Removing labels, caps, and non-PET materials." 
                            />
                            <Step 
                                title="Shredding" 
                                status="current" 
                                description="Processing bales into 12mm flakes." 
                                progress={65} 
                            />
                            <Step 
                                title="Hot Washing" 
                                status="pending" 
                                description="Deep cleaning flakes to remove adhesives." 
                            />
                        </div>
                    </div>

                    {/* Yield Analytics */}
                    <div className="bg-[#1e293b] rounded-2xl p-8 text-white shadow-lg">
                        <h3 className="text-[11px] font-bold text-white/50 uppercase tracking-widest mb-6">Real-time Yield Analytics</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                            <div>
                                <p className="text-[10px] font-bold text-white/40 uppercase mb-1">Expected Output</p>
                                <p className="text-2xl font-bold">1,180 kg</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-white/40 uppercase mb-1">Current Yield</p>
                                <p className="text-2xl font-bold text-emerald-400">85.4%</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-white/40 uppercase mb-1">Est. Completion</p>
                                <p className="text-2xl font-bold">45 mins</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            Efficiency Metrics
                        </h3>
                        <div className="space-y-6">
                            <Metric label="Energy Usage" value="1.2 kWh/kg" trend="optimal" />
                            <Metric label="Water Recycle" value="92%" trend="optimal" />
                            <Metric label="Throughput" value="450kg/hr" trend="warning" />
                        </div>
                    </div>

                    <button className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/90 transition-all">
                        Complete Processing
                    </button>
                </div>
            </div>
        </div>
    )
}

function Step({ title, status, description, progress }: any) {
    return (
        <div className="relative pl-10">
            <div className={`absolute left-0 top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                status === 'completed' ? 'bg-emerald-500 border-emerald-500 text-white' :
                status === 'current' ? 'border-brand-blue' : 'border-slate-200'
            }`}>
                {status === 'completed' && <Package className="w-3 h-3" />}
                {status === 'current' && <div className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />}
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-bold ${status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{title}</h4>
                    {progress && <span className="text-[11px] font-bold text-brand-blue">{progress}%</span>}
                </div>
                <p className="text-xs text-slate-500 font-medium">{description}</p>
                {progress && (
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-brand-blue rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                )}
            </div>
        </div>
    )
}

function Metric({ label, value, trend }: any) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-slate-500">{label}</span>
            <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{value}</p>
                <p className={`text-[10px] font-bold uppercase ${trend === 'optimal' ? 'text-emerald-500' : 'text-amber-500'}`}>{trend}</p>
            </div>
        </div>
    )
}
