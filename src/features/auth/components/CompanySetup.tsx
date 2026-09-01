import React, { useState } from 'react'
import { Check, ChevronDown, Loader2 } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useNavigate } from '@tanstack/react-router'
import { entitiesApi, organisationsApi, ApiError } from '../../../lib/api'
import type { FacilityWallet } from '../../../lib/types'

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

const formatNaira = (amount: number) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount)

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
    const [rcVerifying, setRcVerifying] = useState(false)
    const [rcDemoMode, setRcDemoMode] = useState(false)
    const [verifiedCompanyName, setVerifiedCompanyName] = useState('')

    const [step2, setStep2] = useState<Step2Data>({
        collectionZone: '',
        areaCode: '',
        baselinePeriod: '',
        confirmMaterial: false,
        confirmZone: false,
    })
    const [saving, setSaving] = useState(false)
    const [setupComplete, setSetupComplete] = useState(false)
    const [error, setError] = useState('')
    const [wallet, setWallet] = useState<FacilityWallet | null>(null)

    const handleRcChange = (val: string) => {
        setStep1(s => ({ ...s, rcNumber: val }))
        setVerifiedCompanyName('')
        setRcDemoMode(false)
        if (val.length === 0) { setRcError(false); setRcValid(false) }
        else if (/^RC-\d{6}$/.test(val) || /^\d{6,7}$/.test(val)) {
            setRcError(false); setRcValid(true)
        } else {
            setRcError(true); setRcValid(false)
        }
    }

    const verifyRcNumber = async () => {
        if (!step1.rcNumber || rcError) return false

        setRcVerifying(true)
        setError('')
        try {
            const result = await entitiesApi.verifyBusiness(step1.rcNumber)
            if (!result.success) {
                setRcError(true)
                setRcValid(false)
                setError(result.message || 'RC verification failed.')
                return false
            }

            setRcValid(true)
            setRcError(false)
            setRcDemoMode(Boolean(result.demo))
            if (result.companyName) {
                setVerifiedCompanyName(result.companyName)
                if (!step1.businessName.trim()) {
                    setStep1(s => ({ ...s, businessName: result.companyName! }))
                }
            }
            if (result.address && !step1.location.trim()) {
                setStep1(s => ({ ...s, location: result.address! }))
            }
            return true
        } catch (err) {
            setRcError(true)
            setRcValid(false)
            setError(err instanceof ApiError ? err.message : 'RC verification failed.')
            return false
        } finally {
            setRcVerifying(false)
        }
    }

    const handleStep1Continue = async () => {
        if (!step1.businessName || !step1.rcNumber || rcError) return
        const verified = await verifyRcNumber()
        if (verified) setStep(2)
    }

    const handleStep2Continue = () => setStep(3)

    const handleGoToDashboard = async () => {
        if (setupComplete) {
            navigate({ to: '/dashboard' })
            return
        }

        setError('')
        setSaving(true)
        try {
            const result = await organisationsApi.setupCompany({
                name: step1.businessName,
                rcNumber: displayRc || step1.rcNumber,
                location: step1.location,
                businessType: step1.businessType,
                creditProgrammeData: {
                    collectionZone: step2.collectionZone,
                    areaCode: step2.areaCode,
                    baselinePeriod: step2.baselinePeriod,
                    confirmMaterial: step2.confirmMaterial,
                    confirmZone: step2.confirmZone,
                    country: step1.country,
                },
            })
            setWallet(result.wallet)
            setSetupComplete(true)
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed to save company setup.')
        } finally {
            setSaving(false)
        }
    }

    const displayRc = step1.rcNumber
        ? (/^RC-/.test(step1.rcNumber) ? step1.rcNumber : `RC-${step1.rcNumber}`)
        : ''

    const walletStatusLabel = (status?: string) => {
        switch (status) {
            case 'ACTIVE': return 'Live account'
            case 'MOCK': return 'Demo account'
            case 'PENDING': return 'Provisioning'
            case 'FAILED': return 'Failed'
            default: return 'Unknown'
        }
    }

    return (
        <div className="flex items-start justify-center min-h-[calc(100vh-64px)] py-12 px-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 w-full max-w-2xl p-10">
                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-6">{error}</div>
                )}

                {/* Step 1 */}
                {step === 1 && (
                    <>
                        <h2 className="text-2xl font-bold text-brand-blue mb-1">Tell us about your business</h2>
                        <p className="text-slate-500 text-sm mb-8">We will tailor EcoLyft to how you work</p>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Business name</label>
                                <input
                                    type="text"
                                    value={step1.businessName}
                                    onChange={e => setStep1(s => ({ ...s, businessName: e.target.value }))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                                />
                            </div>

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
                                    {rcVerifying && (
                                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-blue animate-spin" />
                                    )}
                                    {rcValid && !rcVerifying && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-brand-blue rounded-full flex items-center justify-center">
                                            <Check className="w-3.5 h-3.5 text-white" />
                                        </div>
                                    )}
                                </div>
                                {rcError && <p className="text-xs text-red-500">Invalid RC number</p>}
                                {verifiedCompanyName && (
                                    <p className="text-xs text-teal-600">
                                        Verified: {verifiedCompanyName}
                                        {rcDemoMode && ' (demo)'}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Location</label>
                                <input
                                    type="text"
                                    value={step1.location}
                                    onChange={e => setStep1(s => ({ ...s, location: e.target.value }))}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                                />
                            </div>

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
                                    disabled={!step1.businessName || !step1.rcNumber || rcError || rcVerifying}
                                    className="bg-brand-blue text-white font-semibold px-10 py-3 rounded-lg hover:bg-brand-blue/90 transition-all disabled:opacity-50"
                                >
                                    {rcVerifying ? 'Verifying RC...' : 'Continue'}
                                </button>
                                <p className="text-xs text-slate-400 mt-1.5">
                                    RC number is verified via official CAC VAS registry (demo mode if API key is not set)
                                </p>
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

                        <table className="w-full mb-6 border border-slate-200 rounded-lg overflow-hidden">
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

                        <div className="rounded-xl border border-teal-100 bg-teal-50/60 p-5 mb-8">
                            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700 mb-2">
                                Facility wallet (demo until Anchor access is approved)
                            </p>
                            <p className="text-sm text-slate-600 mb-3">
                                A virtual collection account is created when you finish setup. Buyers pay into this account; EcoLyft credits your wallet after settlement.
                            </p>
                            {wallet ? (
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <p className="text-slate-500 text-xs">Account name</p>
                                        <p className="font-medium text-slate-800">{wallet.accountName || '—'}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-xs">Status</p>
                                        <p className="font-medium text-slate-800">{walletStatusLabel(wallet.provisioningStatus)}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-xs">Account number</p>
                                        <p className="font-medium text-slate-800">{wallet.accountNumber || 'Pending'}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-xs">Bank</p>
                                        <p className="font-medium text-slate-800">{wallet.bankName || '—'}</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500">Wallet will be provisioned when you save.</p>
                            )}
                            {wallet && (
                                <p className="text-xs text-slate-500 mt-3">
                                    Balance: {formatNaira(wallet.balance)}
                                </p>
                            )}
                        </div>

                        <button
                            onClick={handleGoToDashboard}
                            disabled={saving}
                            className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-60 text-white font-bold py-4 rounded-lg transition-all"
                        >
                            {saving
                                ? 'Saving & provisioning wallet...'
                                : setupComplete
                                    ? 'Continue To Dashboard'
                                    : 'Provision Wallet & Finish'}
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
