import React, { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useNavigate } from '@tanstack/react-router'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

type BusinessType = 'Aggregate' | 'Recycle'

interface Step1Data {
    businessName: string
    rcNumber: string
    location: string
    country: string
    businessType: BusinessType
}

interface Step2Data {
    collectionZone: string
    areaCode: string
    baselinePeriod: string
    confirmMaterial: boolean
    confirmZone: boolean
}

export const CompanySetup: React.FC = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)

    const [step1, setStep1] = useState<Step1Data>({
        businessName: '',
        rcNumber: '',
        location: '',
        country: 'Nigeria',
        businessType: 'Aggregate',
    })
    const [rcError, setRcError] = useState(false)
    const [rcValid, setRcValid] = useState(false)

    const [step2, setStep2] = useState<Step2Data>({
        collectionZone: '',
        areaCode: '',
        baselinePeriod: '',
        confirmMaterial: false,
        confirmZone: false,
    })

    const handleRcChange = (val: string) => {
        setStep1(s => ({ ...s, rcNumber: val }))
        if (val.length === 0) { setRcError(false); setRcValid(false) }
        else if (/^RC-\d{6}$/.test(val) || /^\d{6,7}$/.test(val)) {
            setRcError(false); setRcValid(true)
        } else {
            setRcError(true); setRcValid(false)
        }
    }

    const handleStep1Continue = () => {
        if (!step1.businessName || !step1.rcNumber || rcError) return
        setStep(2)
    }

    const handleStep2Continue = () => setStep(3)

    const handleGoToDashboard = () => navigate({ to: '/dashboard' })

    const displayRc = step1.rcNumber
        ? (/^RC-/.test(step1.rcNumber) ? step1.rcNumber : `RC-${step1.rcNumber}`)
        : ''

    return (
        <div className="flex items-start justify-center min-h-[calc(100vh-64px)] py-12 px-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 w-full max-w-2xl p-10">

                {/* Step 1 */}
                {step === 1 && (
                    <>
                        <h2 className="text-2xl font-bold text-brand-blue mb-1">Tell us about your business</h2>
                        <p className="text-slate-500 text-sm mb-8">We will tailor EcoLyft to how you work</p>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            {/* Business name */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Business name</label>
                                <input
                                    type="text"
                                    value={step1.businessName}
                                    onChange={e => setStep1(s => ({ ...s, businessName: e.target.value }))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                                />
                            </div>

                            {/* RC number */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">RC number</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={step1.rcNumber}
                                        onChange={e => handleRcChange(e.target.value)}
                                        className={cn(
                                            "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all pr-10",
                                            rcError
                                                ? "border-red-400 focus:ring-red-200 focus:border-red-400"
                                                : rcValid
                                                    ? "border-slate-200 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                    : "border-slate-200 focus:ring-brand-blue/20 focus:border-brand-blue"
                                        )}
                                    />
                                    {rcValid && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-brand-blue rounded-full flex items-center justify-center">
                                            <Check className="w-3.5 h-3.5 text-white" />
                                        </div>
                                    )}
                                </div>
                                {rcError && <p className="text-xs text-red-500">Invalid RC number</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            {/* Location */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Location</label>
                                <input
                                    type="text"
                                    value={step1.location}
                                    onChange={e => setStep1(s => ({ ...s, location: e.target.value }))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                                />
                            </div>

                            {/* Country dropdown */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 opacity-0">Country</label>
                                <div className="relative">
                                    <select
                                        value={step1.country}
                                        onChange={e => setStep1(s => ({ ...s, country: e.target.value }))}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all appearance-none bg-white"
                                    >
                                        <option>Nigeria</option>
                                        <option>Ghana</option>
                                        <option>Kenya</option>
                                        <option>South Africa</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Business type */}
                        <div className="mb-8">
                            <label className="text-sm font-medium text-slate-700 block mb-3">What does your business do</label>
                            <div className="flex gap-4">
                                {(['Aggregate', 'Recycle'] as BusinessType[]).map(t => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setStep1(s => ({ ...s, businessType: t }))}
                                        className={cn(
                                            "px-10 py-3 rounded-lg text-sm font-semibold border transition-all",
                                            step1.businessType === t
                                                ? "bg-brand-blue text-white border-brand-blue"
                                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                                        )}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-brand-blue mt-2">
                                Aggregators sort bale &nbsp; Recyclers wash grind pelletize
                            </p>
                        </div>

                        <div className="flex justify-end items-center">
                            <div className="text-right">
                                <button
                                    onClick={handleStep1Continue}
                                    className="bg-brand-blue text-white font-semibold px-10 py-3 rounded-lg hover:bg-brand-blue/90 transition-all disabled:opacity-50"
                                    disabled={!step1.businessName || !step1.rcNumber || rcError}
                                >
                                    Continue
                                </button>
                                <p className="text-xs text-slate-400 mt-1.5">RC number is verified automatically when you continue</p>
                            </div>
                        </div>
                    </>
                )}

                {/* Step 2 */}
                {step === 2 && (
                    <>
                        <h2 className="text-2xl font-bold text-brand-blue mb-1">Build &nbsp;a green credit profile</h2>
                        <p className="text-slate-500 text-sm mb-8">Helps match your materials to green credits</p>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Collection Zone</label>
                                <input
                                    type="text"
                                    value={step2.collectionZone}
                                    onChange={e => setStep2(s => ({ ...s, collectionZone: e.target.value }))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Area Code</label>
                                <input
                                    type="text"
                                    value={step2.areaCode}
                                    onChange={e => setStep2(s => ({ ...s, areaCode: e.target.value }))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="text-sm font-medium text-slate-700 block mb-1">Baseline Period</label>
                            <p className="text-xs text-slate-400 mb-2">When did you start operations</p>
                            <input
                                type="text"
                                placeholder="D/M/YR"
                                value={step2.baselinePeriod}
                                onChange={e => setStep2(s => ({ ...s, baselinePeriod: e.target.value }))}
                                className="w-48 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all italic text-slate-400"
                            />
                        </div>

                        <div className="space-y-3 mb-8">
                            <label
                                className={cn(
                                    "flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all",
                                    step2.confirmMaterial ? "bg-blue-50 border-blue-200" : "bg-blue-50 border-blue-100"
                                )}
                            >
                                <input
                                    type="checkbox"
                                    checked={step2.confirmMaterial}
                                    onChange={e => setStep2(s => ({ ...s, confirmMaterial: e.target.checked }))}
                                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
                                />
                                <span className="text-sm text-slate-700">
                                    I confirm this material was not previously acounted for credits
                                </span>
                            </label>

                            <label
                                className={cn(
                                    "flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all",
                                    step2.confirmZone ? "bg-teal-50 border-teal-200" : "bg-teal-50 border-teal-100"
                                )}
                            >
                                <input
                                    type="checkbox"
                                    checked={step2.confirmZone}
                                    onChange={e => setStep2(s => ({ ...s, confirmZone: e.target.checked }))}
                                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                />
                                <span className="text-sm text-slate-700">
                                    I confirm that my project location is in an approved zone for additionality
                                    (e.g., underserved/underfinanced area)
                                </span>
                            </label>
                        </div>

                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setStep(3)}
                                className="px-8 py-3 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all"
                            >
                                Skip for now
                            </button>
                            <button
                                onClick={handleStep2Continue}
                                className="bg-brand-blue text-white font-semibold px-10 py-3 rounded-lg hover:bg-brand-blue/90 transition-all"
                            >
                                Continue
                            </button>
                        </div>
                    </>
                )}

                {/* Step 3 — You Are All Set */}
                {step === 3 && (
                    <>
                        <h2 className="text-2xl font-bold text-brand-blue mb-1">You Are All Set!</h2>
                        <p className="text-slate-500 text-sm mb-8">
                            Ready to start tracking profit for{' '}
                            <span className="font-bold text-slate-800">{step1.businessName || 'your business'}</span>
                        </p>

                        <table className="w-full mb-8 border border-slate-200 rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Business</th>
                                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Type</th>
                                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">RC Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-slate-200">
                                    <td className="px-4 py-4 text-sm text-slate-800">{step1.businessName}</td>
                                    <td className="px-4 py-4 text-sm text-brand-blue">{step1.businessType}</td>
                                    <td className="px-4 py-4 text-sm text-brand-blue">{displayRc}</td>
                                </tr>
                            </tbody>
                        </table>

                        <button
                            onClick={handleGoToDashboard}
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-lg transition-all"
                        >
                            Go To Dashboard
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
