import React, { useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ShieldCheck } from 'lucide-react'

export const OTPVerification: React.FC = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [timer, setTimer] = useState(30)
    const navigate = useNavigate()

    useEffect(() => {
        if (timer > 0) {
            const t = setTimeout(() => setTimer(timer - 1), 1000)
            return () => clearTimeout(t)
        }
    }, [timer])

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

        // Focus next input
        if (element.nextSibling && element.value !== '') {
            (element.nextSibling as HTMLInputElement).focus()
        }
    }

    const handleVerify = () => {
        // Mock verification
        navigate({ to: '/setup' })
    }

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-brand-blue" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Verify your account</h2>
                <p className="text-sm text-slate-500">
                    We've sent a 6-digit verification code to your email. Please enter it below to continue.
                </p>
            </div>

            <div className="space-y-6">
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
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-blue/20 transition-all"
                >
                    Verify Account
                </button>

                <div className="text-center">
                    <p className="text-sm text-slate-500">
                        Didn't receive the code?{' '}
                        {timer > 0 ? (
                            <span className="text-slate-400 font-medium">Resend in {timer}s</span>
                        ) : (
                            <button 
                                onClick={() => setTimer(30)}
                                className="text-brand-blue font-bold hover:underline"
                            >
                                Resend now
                            </button>
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}
