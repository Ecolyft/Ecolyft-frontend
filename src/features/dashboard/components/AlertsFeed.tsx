import React from 'react'
import { AlertCircle, TrendingDown, Clock, UserMinus, ShieldAlert, ChevronRight } from 'lucide-react'

export const AlertsFeed: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-brand-dark">Operational Alerts</h1>
                    <p className="text-slate-500">Real-time alerts with estimated financial impact.</p>
                </div>
                <button className="text-sm font-bold text-brand-blue hover:underline">Mark all as read</button>
            </div>

            <div className="space-y-4">
                <AlertCard
                    icon={ShieldAlert}
                    iconColor="text-red-600 bg-red-50"
                    title="High Contamination Detected"
                    impact="₦14,200 estimated loss"
                    desc="Batch #ECO-20260412-001 from Sani Mohammed has 12.4% contamination. This exceeds your 10% threshold."
                    action="Review Batch"
                    batchId="ECO-20260412-001"
                    time="2 hours ago"
                />
                <AlertCard
                    icon={TrendingDown}
                    iconColor="text-amber-600 bg-amber-50"
                    title="Low Pellet Yield"
                    impact="₦42,000 potential monthly loss"
                    desc="Pelletizing yield for today is 78%, which is below the target 85%. Check wash water loss or filtration waste."
                    action="Check Workflow"
                    time="4 hours ago"
                />
                <AlertCard
                    icon={UserMinus}
                    iconColor="text-blue-600 bg-blue-50"
                    title="Collector Inactive"
                    impact="Supply risk"
                    desc="Bello Garba hasn't logged a purchase for 16 days. Previous average was 3 logs per week."
                    action="Contact Collector"
                    time="Yesterday"
                />
                <AlertCard
                    icon={Clock}
                    iconColor="text-slate-600 bg-slate-50"
                    title="Equipment Calibration Due"
                    impact="Data accuracy risk"
                    desc="Weighing Scale #002 (North Facility) was last calibrated 11 months ago. 1 month until due date."
                    action="Manage Equipment"
                    time="2 days ago"
                />
            </div>
        </div>
    )
}

function AlertCard({ icon: Icon, iconColor, title, impact, desc, action, batchId, time }: any) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-start gap-6 hover:shadow-md transition-shadow">
            <div className={cn("p-4 rounded-2xl", iconColor)}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-brand-dark">{title}</h3>
                        {batchId && <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">#{batchId}</span>}
                    </div>
                    <span className="text-sm font-bold text-slate-800">{impact}</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                <div className="flex items-center justify-between pt-2">
                    <button className="text-brand-blue text-sm font-bold flex items-center space-x-1 hover:underline">
                        <span>{action}</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-slate-400">{time}</span>
                </div>
            </div>
        </div>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ')
}
