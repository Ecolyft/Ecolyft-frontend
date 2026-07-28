import React, { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ShieldCheck } from 'lucide-react'
import { authApi, ApiError } from '../../../lib/api'
import { authSession } from '../../../lib/authSession'

export const OTPVerification: React.FC = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [timer, setTimer] = useState(30)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [resending, setResending] = useState(false)
    const [email, setEmail] = useState('')
    const [demoOtp, setDemoOtp] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const pendingEmail = authSession.getPendingEmail()
        if (!pendingEmail) {
            navigate({ to: '/register' })
            return
        }
        setEmail(pendingEmail)
        setDemoOtp(authSession.getPendingDemoOtp() || '')
    }, [navigate])

    useEffect(() => {
        if (timer > 0) {
            const t = setTimeout(() => setTimer(timer - 1), 1000)
            return () => clearTimeout(t)
        }
    }, [timer])

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

        if (element.nextSibling && element.value !== '') {
            (element.nextSibling as HTMLInputElement).focus()
        }
    }

    const handleVerify = async () => {
        const otpCode = otp.join('')
        if (otpCode.length !== 6) {
            setError('Please enter the full 6-digit code.')
            return
        }

        setError('')
        setLoading(true)
        try {
            const result = await authApi.verifyOtp({ email, otpCode })
            authSession.setToken(result.token)
            authSession.setUser(result.user)
            authSession.clearPendingEmail()
            navigate({ to: '/setup' })
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Verification failed.')
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        setError('')
        setResending(true)
        try {
            const result = await authApi.resendOtp({ email })
            setTimer(30)
            setOtp(['', '', '', '', '', ''])
            if (result.demoOtp) {
                setDemoOtp(result.demoOtp)
                authSession.setPendingDemoOtp(result.demoOtp)
            }
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Could not resend code.')
        } finally {
            setResending(false)
        }
    }

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-brand-blue" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Verify your account</h2>
                <p className="text-sm text-slate-500">
                    We've sent a 6-digit verification code to <strong>{email}</strong>. Please enter it below to continue.
                </p>
            </div>

            {demoOtp && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    <p className="font-semibold mb-1">Demo mode — email delivery unavailable</p>
                    <p>Your verification code is: <span className="font-mono font-bold tracking-widest">{demoOtp}</span></p>
                </div>
            )}

            <div className="space-y-6">
                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="flex gap-3 justify-between">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={data}
                            onChange={e => handleChange(e.target, index)}
                            onFocus={e => e.target.select()}
                            className="w-12 h-14 border-2 border-slate-200 rounded-xl text-center text-xl font-bold focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all outline-none"
                        />
                    ))}
                </div>

                <button
                    onClick={handleVerify}
                    disabled={loading}
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-60 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-blue/20 transition-all"
                >
                    {loading ? 'Verifying...' : 'Verify Account'}
                </button>

                <div className="text-center">
                    <p className="text-sm text-slate-500">
                        Didn't receive the code?{' '}
                        {timer > 0 ? (
                            <span className="text-slate-400 font-medium">Resend in {timer}s</span>
                        ) : (
                            <button
                                onClick={handleResend}
                                disabled={resending}
                                className="text-brand-blue font-bold hover:underline disabled:opacity-60"
                            >
                                {resending ? 'Sending...' : 'Resend now'}
                            </button>
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}
