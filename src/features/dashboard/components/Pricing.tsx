import React from 'react'
import { CheckCircle2 } from 'lucide-react'

const STARTER_FEATURES = [
    'Log and manage up to 50 transactions/month',
    'Buyer payment links',
    'Batch tracking (inbound to outbound)',
    'Basis traceability records',
    '1 User seat',
    'Email Support',
]

const GROWTH_FEATURES = [
    'Unlimited transactions',
    'Full batch consolidation and tracking',
    'Buyer payment link + weight confirmation',
    'Verifiable traceability reports (MRV-ready)',
    'Up to 5 users',
    'Priority support',
]

const ENTERPRISE_FEATURES = [
    'Everything in growth',
    'Multi-site operations',
    'Unlimited users',
    'API integrations',
    'White-label reporting for banks and partners',
    'Dedicated account manager',
    'SLA-backed support',
]

export const Pricing: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#EEF2F7] flex flex-col items-center px-6 py-16">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-3">Control Your Money. Stop Loosing It</h1>
                <p className="text-lg font-bold mb-1">
                    <span className="text-emerald-500">Start Free For 14-Days.</span>
                    <span className="text-[#3B82F6]"> No Card Required</span>
                </p>
                <p className="text-sm text-slate-500">Every batch you sell gets paid, verified, and recorded as bankable data.</p>
            </div>

            {/* Cards */}
            <div className="flex items-start gap-5 w-full max-w-4xl">
                {/* Starter */}
                <div className="flex-1 bg-white rounded-2xl p-7 shadow-sm flex flex-col">
                    <h2 className="text-lg font-bold text-slate-900 mb-1">Starter</h2>
                    <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-2xl font-bold text-slate-800">₦25,000</span>
                        <span className="text-sm text-slate-400">/month</span>
                    </div>
                    <ul className="space-y-2.5 flex-1 mb-8">
                        {STARTER_FEATURES.map(f => (
                            <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                {f}
                            </li>
                        ))}
                    </ul>
                    <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest rounded-xl transition-colors">
                        Select Starter
                    </button>
                </div>

                {/* Growth — recommended */}
                <div className="flex-1 bg-[#3B82F6] rounded-2xl shadow-xl flex flex-col relative" style={{ marginTop: '-12px' }}>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Recommended</span>
                    </div>
                    <div className="p-7 flex flex-col flex-1">
                        <h2 className="text-lg font-bold text-white mb-1">Growth</h2>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-3xl font-bold text-white">₦65,000</span>
                            <span className="text-sm text-blue-200">/month</span>
                        </div>
                        <ul className="space-y-2.5 flex-1 mb-8">
                            {GROWTH_FEATURES.map(f => (
                                <li key={f} className="flex items-start gap-2 text-sm text-white">
                                    <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-3 bg-white hover:bg-blue-50 text-[#3B82F6] text-xs font-bold uppercase tracking-widest rounded-xl transition-colors">
                            Activate Growth →
                        </button>
                    </div>
                </div>

                {/* Enterprise */}
                <div className="flex-1 bg-white rounded-2xl p-7 shadow-sm flex flex-col">
                    <h2 className="text-lg font-bold text-slate-900 mb-1">Enterprise</h2>
                    <p className="text-2xl font-bold text-slate-800 mb-6">Custom Pricing</p>
                    <ul className="space-y-2.5 flex-1 mb-8">
                        {ENTERPRISE_FEATURES.map(f => (
                            <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                {f}
                            </li>
                        ))}
                    </ul>
                    <button className="w-full py-3 border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-blue-50 text-xs font-bold uppercase tracking-widest rounded-xl transition-colors">
                        Talk to Sales
                    </button>
                </div>
            </div>

            {/* Testimonial */}
            <div className="mt-16 text-center max-w-md">
                <p className="text-sm text-slate-500 italic mb-2">
                    "We switched to EcoLyft's Growth plan and increased our profit margin by 25% in just three months."
                </p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">— Adeola Okafor, Head of Ops, GreenBatch</p>
            </div>
        </div>
    )
}
