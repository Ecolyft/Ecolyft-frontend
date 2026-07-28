import React, { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { authApi, ApiError } from '../../../lib/api'
import { authSession } from '../../../lib/authSession'

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const result = await authApi.login({ email, password })
            authSession.setToken(result.token)
            authSession.setUser(result.user)
            navigate({ to: '/dashboard' })
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Sign in failed.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-xl font-bold text-slate-800">Welcome back</h2>
                <p className="text-sm text-slate-500">Sign in to your EcoLyft account</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="space-y-1.5">
                    <label className="text-sm text-slate-700">Email address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-all mt-2"
                >
                    {loading ? 'Signing in...' : 'Sign In'}
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
