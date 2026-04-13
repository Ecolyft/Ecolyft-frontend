import React from 'react'
import { Link, useRouterState } from '@tanstack/react-router'

interface AuthLayoutProps {
    children: React.ReactNode
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const { location } = useRouterState()
    const isRegister = location.pathname === '/register'

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white">
            {/* Left Pane */}
            <div className="hidden md:flex md:w-2/5 bg-brand-navy p-12 flex-col justify-between text-white">
                <div>
                    <img src="/logo/image 1.png" alt="EcoLyft Logo" className="h-10 mb-16" />
                    {isRegister ? (
                        <>
                            <h1 className="text-4xl font-display font-bold leading-tight mb-2">Track</h1>
                            <h2 className="text-4xl font-display font-bold leading-tight mb-4">Inbound Throughput Outbound</h2>
                            <p className="text-blue-200 text-sm mb-12">All In One Place Get started In Minutes</p>
                            <ul className="space-y-4">
                                <li className="text-sm font-medium text-white">Know your margin on every batch</li>
                                <li className="text-sm font-medium text-white">Manage supplier pickup to buyer delivery</li>
                                <li className="text-sm font-medium text-white">Get compliance reports in one click</li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl font-display font-bold leading-tight mb-3">Turn every kilogram into profit data</h1>
                            <p className="text-blue-200 text-sm mb-12">Nigeria's leading platform for plastic waste aggregators and recyclers</p>
                            <ul className="space-y-4">
                                <li className="text-sm font-medium text-white">Real time profit intelligence</li>
                                <li className="text-sm font-medium text-white">Full batch traceability</li>
                                <li className="text-sm font-medium text-white">EPR carbon credit ready</li>
                            </ul>
                        </>
                    )}
                </div>
                <div className="text-xs text-blue-300">
                    2026 EcoLyft Cycler Technologies Limited
                </div>
            </div>

            {/* Right Pane */}
            <div className="flex-1 flex flex-col">
                {/* Tab switcher */}
                <div className="flex justify-end gap-8 px-12 pt-8 pb-4 border-b border-slate-100">
                    <Link
                        to="/login"
                        className={`text-sm font-medium pb-1 ${!isRegister ? 'border-b-2 border-slate-800 text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/register"
                        className={`text-sm font-medium pb-1 ${isRegister ? 'border-b-2 border-slate-800 text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Create Account
                    </Link>
                </div>

                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        <div className="md:hidden flex justify-center mb-8">
                            <img src="/logo/image 1.png" alt="EcoLyft Logo" className="h-8" />
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
