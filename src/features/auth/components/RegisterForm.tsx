import React, { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'

export const RegisterForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-xl font-bold text-slate-800">Get started</h2>
                <p className="text-sm text-slate-500">Create your EcoLyft account</p>
            </div>

            <form className="space-y-4" onSubmit={e => { e.preventDefault(); navigate({ to: '/setup' }) }}>
                <div className="space-y-1.5">
                    <label className="text-sm text-slate-700">Full name</label>
                    <input
                        type="text"
                        placeholder="Anita Chow Ebele"
                        className="w-full px-4 py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm text-slate-700">Email</label>
                    <input
                        type="email"
                        placeholder="you@company.ng"
                        className="w-full px-4 py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm text-slate-700">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••••••"
                            className="w-full px-4 py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all pr-12"
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
                    <label className="text-sm text-slate-700">Confirm password</label>
                    <div className="relative">
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="••••••••••••••••"
                            className="w-full px-4 py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all pr-12"
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

                <div className="flex items-center gap-3 pt-1">
                    <input
                        id="terms"
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
                    />
                    <label htmlFor="terms" className="text-sm text-slate-500">
                        By signing up you agree to our{' '}
                        <a href="#" className="text-brand-blue hover:underline">Terms Privacy Policy</a>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-3 rounded-lg transition-all mt-2"
                >
                    Create Account
                </button>
            </form>

            <div className="text-center text-sm text-slate-500">
                Already have an account?{' '}
                <Link to="/login" className="text-brand-blue hover:underline">Sign In</Link>
            </div>
        </div>
    )
}
