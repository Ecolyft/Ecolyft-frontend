import React, { useEffect, useState } from 'react'
import { TrendingDown, Clock, ShieldAlert, ChevronRight } from 'lucide-react'
import { analyticsApi, ApiError } from '../../../lib/api'
import type { AlertRecord } from '../../../lib/types'

const severityStyles: Record<AlertRecord['severity'], { icon: typeof ShieldAlert; iconColor: string; title: string }> = {
    CRITICAL: { icon: ShieldAlert, iconColor: 'text-red-600 bg-red-50', title: 'Critical Alert' },
    WARNING: { icon: TrendingDown, iconColor: 'text-amber-600 bg-amber-50', title: 'Warning' },
    INFO: { icon: Clock, iconColor: 'text-blue-600 bg-blue-50', title: 'Information' },
}

export const AlertsFeed: React.FC = () => {
    const [alerts, setAlerts] = useState<AlertRecord[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        analyticsApi.getAlerts()
            .then(res => setAlerts(res.alerts))
            .catch(err => setError(err instanceof ApiError ? err.message : 'Failed to load alerts'))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-display font-bold text-brand-dark">Operational Alerts</h1>
                    <p className="text-xs md:text-sm text-slate-500">Real-time alerts with estimated financial impact.</p>
                </div>
            </div>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            {loading ? (
                <p className="text-sm text-slate-500">Loading alerts...</p>
            ) : alerts.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
                    <p className="text-sm text-slate-500">No active alerts right now. Alerts will appear here as operations data builds up.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {alerts.map(alert => {
                        const style = severityStyles[alert.severity] || severityStyles.INFO
                        const Icon = style.icon
                        return (
                            <AlertCard
                                key={alert.id}
                                icon={Icon}
                                iconColor={style.iconColor}
                                title={alert.type || style.title}
                                impact={alert.impactNaira ? `₦${alert.impactNaira.toLocaleString()} impact` : 'Operational impact'}
                                desc={alert.message}
                                action="Review"
                                batchId={alert.batchId || undefined}
                                time={new Date(alert.createdAt).toLocaleString()}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}

function AlertCard({ icon: Icon, iconColor, title, impact, desc, action, batchId, time }: {
    icon: React.ComponentType<{ className?: string }>
    iconColor: string
    title: string
    impact: string
    desc: string
    action: string
    batchId?: string
    time: string
}) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-6 flex gap-4 md:gap-6 hover:shadow-md transition-shadow">
            <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl h-fit ${iconColor}`}>
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex-1 space-y-2 md:space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm md:text-base font-bold text-brand-dark leading-tight">{title}</h3>
                        {batchId && <span className="text-[9px] md:text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">#{batchId}</span>}
                    </div>
                    <span className="text-xs md:text-sm font-bold text-slate-800">{impact}</span>
                </div>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{desc}</p>
                <div className="flex items-center justify-between pt-1 md:pt-2">
                    <button className="text-brand-blue text-xs md:text-sm font-bold flex items-center space-x-1 hover:underline">
                        <span>{action}</span>
                        <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                    <span className="text-[10px] md:text-xs text-slate-400">{time}</span>
                </div>
            </div>
        </div>
    )
}
