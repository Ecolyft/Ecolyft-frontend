import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { KeyRound, Eye, EyeOff, CheckCircle2 } from 'lucide-react'

export const CreateNewPasswordForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                    <KeyRound className="w-6 h-6 text-brand-blue" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Create new password</h2>
                <p className="text-sm text-slate-500">
                    Your new password must be different from previous passwords.
                </p>
            </div>

            <form className="space-y-6" onSubmit={e => { e.preventDefault(); navigate({ to: '/login' }) }}>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">New Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••••••"
                            className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue transition-all pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(p => !p)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                    <div className="relative">
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="••••••••••••"
                            className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue transition-all pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(p => !p)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <div className="space-y-2 py-2">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs text-slate-700">At least 8 characters</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs text-slate-700">At least one number</span>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-blue/20 transition-all"
                >
                    Reset Password
                </button>
            </form>
        </div>
    )
}
