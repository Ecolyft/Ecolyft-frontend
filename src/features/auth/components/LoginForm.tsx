import React from 'react'
import { Link, useNavigate } from '@tanstack/react-router'

export const LoginForm: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-xl font-bold text-slate-800">Welcome back</h2>
                <p className="text-sm text-slate-500">Sign in to your EcoLyft account</p>
            </div>

            <form className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-sm text-slate-700">Email address</label>
                    <input
                        type="email"
                        placeholder="you@company.ng"
                        className="w-full px-4 py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                    />
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                        <label className="text-sm text-slate-700">Password</label>
                        <Link to="/reset-password" className="text-sm text-brand-blue hover:underline">
                            Forgot password
                        </Link>
                    </div>
                    <input
                        type="password"
                        className="w-full px-4 py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                    />
                </div>

                <button
                    type="submit"
                    onClick={e => { e.preventDefault(); navigate({ to: '/dashboard' }) }}
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-3 rounded-lg transition-all mt-2"
                >
                    Sign In
                </button>
            </form>

            <div className="text-center text-sm">
                <Link to="/register" className="text-brand-blue hover:underline">
                    No account yet Create one free
                </Link>
            </div>
        </div>
    )
}
