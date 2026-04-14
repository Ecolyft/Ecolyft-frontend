import React, { useState } from 'react'
import { ChevronRight, Mail, ShieldCheck } from 'lucide-react'

export const ResetPassword: React.FC = () => {
    const [step, setStep] = useState(1)

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-display font-bold text-brand-dark">
                    {step === 1 && "Reset Password"}
                    {step === 2 && "Verify your account"}
                    {step === 3 && "Create New Password"}
                </h2>
                <p className="text-slate-500">
                    {step === 1 && "Enter your email or phone to receive a reset code."}
                    {step === 2 && "We sent a 6-digit code to your email."}
                    {step === 3 && "Set a strong password to protect your account."}
                </p>
            </div>

            {step === 1 && (
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">Email Address or Phone</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="john@example.com"
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2">
                        <span>Send Code</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </form>
            )}

            {step === 2 && (
                <div className="space-y-6 text-center">
                    <div className="flex justify-between max-w-xs mx-auto">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <input key={i} type="text" maxLength={1} className="w-10 h-12 border border-slate-200 rounded-lg text-center text-xl font-bold bg-slate-50 focus:border-brand-blue outline-none" />
                        ))}
                    </div>
                    <button onClick={() => setStep(3)} className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2">
                        <span>Verify</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    <button className="text-sm text-brand-blue font-bold">Resend Code</button>
                </div>
            )}

            {step === 3 && (
                <form className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">Confirm New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all" />
                    </div>
                    <button type="submit" className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2">
                        <span>Reset Password</span>
                        <ShieldCheck className="w-5 h-5" />
                    </button>
                </form>
            )}
        </div>
    )
}
