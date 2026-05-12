import React, { useState } from 'react'
import { AlertCircle, ArrowLeft, MessageSquare, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const BatchFlagged: React.FC = () => {
    const [toast, setToast] = useState('')

    const showToast = (msg: string) => {
        setToast(msg)
        setTimeout(() => setToast(''), 3000)
    }
    return (
        <div className="space-y-6 w-full max-w-5xl mx-auto pb-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/batches" className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-2xl font-bold text-slate-900">Batch ECO-0115-0042</h1>
                            <span className="px-2.5 py-0.5 bg-rose-50 text-rose-600 rounded text-[11px] font-bold border border-rose-100 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                FLAGGED
                            </span>
                        </div>
                        <p className="text-sm text-slate-500 font-medium">Logged on 12 Apr 2026 • Collector: Lagos Green Recyclers</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                        Download Report
                    </button>
                    <button
                        onClick={() => showToast('Audit query raised successfully. Team notified.')}
                        className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold hover:bg-rose-700 transition-colors shadow-sm shadow-rose-200"
                    >
                        Raise Audit Query
                    </button>
                </div>
                {toast && (
                    <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-bottom-4">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        {toast}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Issue Panel */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border-2 border-rose-100 overflow-hidden shadow-sm">
                        <div className="bg-rose-50 p-6 flex items-start gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-rose-100">
                                <ShieldAlert className="w-6 h-6 text-rose-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 mb-1">High Contamination Detected</h2>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Our automated yield calculator detected an 18% variance between raw inbound weight and pre-processing output. This exceeds the 5% tolerance threshold for PET Clear.
                                </p>
                            </div>
                        </div>
                        <div className="p-8 grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-slate-100">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Declared Weight</p>
                                <p className="text-lg font-bold text-slate-900">1,240 kg</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Actual Yield</p>
                                <p className="text-lg font-bold text-slate-900 text-rose-600">1,016 kg</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Loss Variance</p>
                                <p className="text-lg font-bold text-rose-600">18.1%</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Financial Loss</p>
                                <p className="text-lg font-bold text-rose-600">-₦4,200</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-brand-blue" />
                            Activity Log & Discussion
                        </h3>
                        <div className="space-y-6">
                            {[
                                { user: 'System Audit', time: '12 Apr, 10:45 AM', text: 'Batch flagged automatically due to yield variance.', type: 'system' },
                                { user: 'Adam Shona', time: '12 Apr, 11:30 AM', text: 'Please verify the weighing scale calibration for this batch.', type: 'user' },
                            ].map((msg, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                        {msg.user[0]}
                                    </div>
                                    <div className="flex-1 bg-slate-50 rounded-xl p-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[12px] font-bold text-slate-900">{msg.user}</span>
                                            <span className="text-[10px] font-medium text-slate-400">{msg.time}</span>
                                        </div>
                                        <p className="text-sm text-slate-600">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 flex gap-3">
                            <input 
                                type="text" 
                                placeholder="Add a comment or internal note..." 
                                className="flex-1 bg-slate-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-blue/20"
                            />
                            <button className="bg-brand-blue text-white px-6 rounded-lg text-sm font-bold">Post</button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Details */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Batch Metadata</h3>
                        <div className="space-y-4">
                            <MetaItem label="Material" value="PET Clear (Bales)" />
                            <MetaItem label="Unit Price" value="₦280 / kg" />
                            <MetaItem label="Location" value="Lagos Mainland Zone A" />
                            <MetaItem label="Operator" value="Bisi Akande" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Action Required</h3>
                        <div className="space-y-3">
                            <ActionButton label="Approve with Adjusted Weight" onClick={() => showToast('Batch approved with adjusted weight.')} />
                            <ActionButton label="Return to Collector" variant="outline" onClick={() => showToast('Batch returned to collector.')} />
                            <ActionButton label="De-list Collector" variant="danger" onClick={() => showToast('Collector has been de-listed.')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MetaItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
            <span className="text-[12px] font-medium text-slate-400">{label}</span>
            <span className="text-[13px] font-bold text-slate-900">{value}</span>
        </div>
    )
}

function ActionButton({ label, variant = 'primary', onClick }: { label: string; variant?: 'primary' | 'outline' | 'danger'; onClick?: () => void }) {
    const classes = {
        primary: 'bg-brand-blue text-white hover:bg-brand-blue/90',
        outline: 'bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50',
        danger: 'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100'
    }
    return (
        <button onClick={onClick} className={`w-full py-3 rounded-lg text-[13px] font-bold transition-all ${classes[variant]}`}>
            {label}
        </button>
    )
}
