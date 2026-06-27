import React from 'react'
import { CheckCircle2 } from 'lucide-react'

const STARTER_FEATURES = [
    'Material Tracking',
    'Supplier Management',
    'Buyer Management',
    'Basic Traceability',
    'P/L Visibility',
    '1 User',
]

const GROWTH_FEATURES = [
    'Everything In Starter',
    'Supplier & Buyer Intelligence',
    'Full Traceability - DIGITAL PASSPORTS',
    'Material & Revenue Reconciliation',
    'Financing Readiness Report',
    'Up to 5 users',
]

const ENTERPRISE_FEATURES = [
    'Everything in growth',
    'Multi-site operations (+₦35,000/mo per extra facility beyond 2)',
    'Unlimited users',
    'API integrations',
    'White-label reporting for banks and partners',
    'Dedicated Support',
]

export const Pricing: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center py-6">
            {/* Header */}
            <div className="text-center mb-10 max-w-2xl px-4">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight font-display">
                    Control Your Money. Stop Losing It
                </h1>
                <p className="text-lg md:text-xl font-bold mb-2">
                    <span className="text-emerald-500">Start Free For 14-Days.</span>
                    <span className="text-brand-blue"> No Card Required</span>
                </p>
                <p className="text-sm text-slate-500 font-medium">
                    Capture every kilogram. Trace every transaction. Build financing-ready records.
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4 items-stretch">
                {/* Starter */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between min-h-[500px] hover:shadow-md transition-shadow">
                    <div>
                        <h2 className="text-xl font-extrabold text-slate-900 mb-2 font-display">Starter</h2>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-3xl font-black text-slate-800 font-display">₦25,000</span>
                            <span className="text-sm text-slate-400 font-medium">/month</span>
                        </div>
                        <ul className="space-y-4">
                            {STARTER_FEATURES.map(f => (
                                <li key={f} className="flex items-start gap-2.5 text-[13px] font-semibold text-slate-600">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className="w-full py-3.5 bg-slate-200/70 hover:bg-slate-300 text-slate-700 text-xs font-black uppercase tracking-wider rounded-xl transition-all mt-8">
                        Select Starter
                    </button>
                </div>

                {/* Growth - Recommended */}
                <div className="bg-brand-blue border border-brand-blue rounded-2xl shadow-xl flex flex-col justify-between min-h-[500px] relative hover:shadow-2xl transition-all transform hover:-translate-y-1">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-[#005c30] text-white text-[9px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-sm">
                            Recommended
                        </span>
                    </div>
                    <div className="p-8 flex flex-col justify-between flex-1 mt-1">
                        <div>
                            <h2 className="text-xl font-extrabold text-white mb-2 font-display">Growth</h2>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-3xl font-black text-white font-display">₦50,000</span>
                                <span className="text-sm text-blue-100 font-medium">/month</span>
                            </div>
                            <ul className="space-y-4">
                                {GROWTH_FEATURES.map(f => (
                                    <li key={f} className="flex items-start gap-2.5 text-[13px] font-semibold text-white">
                                        <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className="w-full py-3.5 bg-white hover:bg-slate-50 text-brand-blue text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all mt-8 flex items-center justify-center gap-1.5">
                            Activate Growth &rarr;
                        </button>
                    </div>
                </div>

                {/* Enterprise */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between min-h-[500px] hover:shadow-md transition-shadow">
                    <div>
                        <h2 className="text-xl font-extrabold text-slate-900 mb-2 font-display">Enterprise</h2>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-3xl font-black text-slate-800 font-display">₦100,000</span>
                            <span className="text-sm text-slate-400 font-medium">/ month</span>
                        </div>
                        <ul className="space-y-4">
                            {ENTERPRISE_FEATURES.map(f => (
                                <li key={f} className="flex items-start gap-2.5 text-[13px] font-semibold text-slate-600">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <span className="leading-tight">
                                        {f.includes('facility') ? (
                                            <>
                                                Multi-site operations <span className="text-xs text-slate-400 font-medium italic">(+₦35,000/mo per extra facility beyond 2)</span>
                                            </>
                                        ) : (
                                            f
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className="w-full py-3.5 border-2 border-brand-blue hover:bg-blue-50 text-brand-blue text-xs font-black uppercase tracking-wider rounded-xl transition-all mt-8">
                        Talk to Sales
                    </button>
                </div>
            </div>

            {/* Testimonial */}
            <div className="mt-16 text-center max-w-2xl px-4 border-t border-slate-200/60 pt-10">
                <p className="text-sm md:text-base text-slate-500 italic mb-3 font-medium leading-relaxed">
                    "We switched to EcoLyft's Growth plan and increased our profit margin by 25% in just three months."
                </p>
                <p className="text-[10px] md:text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                    — Adeola Okafor, Head of Ops, Recova Nig Ltd
                </p>
            </div>
        </div>
    )
}
