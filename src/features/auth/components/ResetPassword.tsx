import React, { useState } from 'react'
import { ChevronRight, Mail, ShieldCheck } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { authApi, ApiError } from '../../../lib/api'

export const ResetPassword: React.FC = () => {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await authApi.forgotPassword({ email })
            setStep(2)
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Could not send reset code.')
        } finally {
            setLoading(false)
        }
    }

    const handleOtpChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])
        if (element.nextSibling && element.value !== '') {
            (element.nextSibling as HTMLInputElement).focus()
        }
    }

    const handleResendCode = async () => {
        setError('')
        setLoading(true)
        try {
            await authApi.forgotPassword({ email })
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Could not resend reset code.')
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyCode = () => {
        const otpCode = otp.join('')
        if (otpCode.length !== 6) {
            setError('Please enter the full 6-digit code.')
            return
        }
        setError('')
        setStep(3)
    }

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        setLoading(true)
        try {
            await authApi.resetPassword({
                email,
                otpCode: otp.join(''),
                newPassword,
            })
            navigate({ to: '/login' })
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Password reset failed.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-display font-bold text-brand-dark">
                    {step === 1 && 'Reset Password'}
                    {step === 2 && 'Verify your account'}
                    {step === 3 && 'Create New Password'}
                </h2>
                <p className="text-slate-500">
                    {step === 1 && 'Enter your email to receive a reset code.'}
                    {step === 2 && `We sent a 6-digit code to ${email}.`}
                    {step === 3 && 'Set a strong password to protect your account.'}
                </p>
            </div>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {step === 1 && (
                <form className="space-y-4" onSubmit={handleSendCode}>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 disabled:opacity-60"
                    >
                        <span>{loading ? 'Sending...' : 'Send Code'}</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </form>
            )}

            {step === 2 && (
                <div className="space-y-6 text-center">
                    <div className="flex justify-between max-w-xs mx-auto">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={e => handleOtpChange(e.target, index)}
                                className="w-10 h-12 border border-slate-200 rounded-lg text-center text-xl font-bold bg-slate-50 focus:border-brand-blue outline-none"
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleVerifyCode}
                        className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2"
                    >
                        <span>Verify</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={loading}
                        className="text-sm text-brand-blue font-bold disabled:opacity-60"
                    >
                        Resend Code
                    </button>
                </div>
            )}

            {step === 3 && (
                <form className="space-y-4" onSubmit={handleResetPassword}>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 disabled:opacity-60"
                    >
                        <span>{loading ? 'Resetting...' : 'Reset Password'}</span>
                        <ShieldCheck className="w-5 h-5" />
                    </button>
                </form>
            )}
        </div>
    )
}
