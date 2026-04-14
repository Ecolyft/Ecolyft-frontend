import React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
import { ArrowLeft, Clock, MapPin, BadgeCheck, AlertCircle, TrendingDown, Package, Share2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const BatchDetail: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <Link to="/batches" className="text-slate-500 flex items-center space-x-2 hover:text-brand-dark transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">All Batches</span>
                </Link>
                <button className="flex items-center space-x-2 text-brand-blue font-bold text-sm">
                    <Share2 className="w-4 h-4" />
                    <span>Export Traceability Report</span>
                </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                        <h1 className="text-3xl font-display font-bold text-brand-dark">#ECO-20260412-001</h1>
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black uppercase">Stored</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Created April 12, 2026 • 10:24 AM</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>Lagos North Facility</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lifecycle Timeline */}
            <div className="space-y-6">
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-100" />

                    <div className="space-y-12">
                        {/* Step 1: Inbound */}
                        <TimelineItem
                            icon={Package}
                            title="Inbound Logged"
                            date="Apr 12, 10:24 AM"
                            status="done"
                        >
                            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Collector</span>
                                    <p className="text-sm font-bold text-brand-dark">Sani Mohammed</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Weight</span>
                                    <p className="text-sm font-bold text-brand-dark">450kg</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Material</span>
                                    <p className="text-sm font-bold text-brand-dark">PET Bottles</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Price Paid</span>
                                    <p className="text-sm font-bold text-brand-dark">₦125,000</p>
                                </div>
                            </div>
                        </TimelineItem>

                        {/* Step 2: Processing */}
                        <TimelineItem
                            icon={TrendingDown}
                            title="Processed (Sorting & Baling)"
                            date="Apr 12, 02:15 PM"
                            status="done"
                        >
                            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
                                <div className="grid grid-cols-3 gap-4 border-b border-slate-100 pb-4">
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">High-Value</span>
                                        <p className="text-sm font-bold text-emerald-600">384kg (85%)</p>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Low-Value</span>
                                        <p className="text-sm font-bold text-amber-600">42kg (9%)</p>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Waste</span>
                                        <p className="text-sm font-bold text-slate-400">24kg (5%)</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 text-xs">
                                    <AlertCircle className="w-3 h-3 text-amber-500" />
                                    <span className="text-slate-500 font-medium italic">Contamination of 1.2% detected (below 5% threshold).</span>
                                </div>
                            </div>
                        </TimelineItem>

                        {/* Step 3: Outbound */}
                        <TimelineItem
                            icon={BadgeCheck}
                            title="Outbound (Ready for Sale)"
                            date="Awaiting Sale"
                            status="pending"
                        >
                            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center space-y-3">
                                <p className="text-sm text-slate-500 font-medium">Batch is processed and stored in Baling Section A.</p>
                                <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold text-brand-blue shadow-sm">
                                    Log Sale for this Batch
                                </button>
                            </div>
                        </TimelineItem>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TimelineItem({ icon: Icon, title, date, status, children }: any) {
    return (
        <div className="relative pl-14">
            <div className={cn(
                "absolute left-2 top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10",
                status === 'done' ? "bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/20" : "bg-white border-slate-200 text-slate-300"
            )}>
                <Icon className="w-4 h-4" />
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className={cn("font-bold text-lg", status === 'done' ? "text-brand-dark" : "text-slate-400")}>{title}</h3>
                    <span className="text-xs font-medium text-slate-400">{date}</span>
                </div>
                {children}
            </div>
        </div>
    )
}
