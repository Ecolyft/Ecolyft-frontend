import React, { useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { CheckCircle2, FileText, Handshake, Leaf, QrCode, Download, ShieldCheck, Check, Lock, HelpCircle } from 'lucide-react'
import { operationsApi, ApiError } from '../../../lib/api'

export const CheckoutPortal: React.FC = () => {
    const navigate = useNavigate()
    const search = useSearch({ from: '/checkout' })
    const [isSettled, setIsSettled] = useState(false)
    const [showPinModal, setShowPinModal] = useState(false)
    const [pin, setPin] = useState('')
    const [pinError, setPinError] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [checkoutError, setCheckoutError] = useState('')

    const transactionId = search.batchId ? `BATCH-${search.batchId.slice(0, 8).toUpperCase()}` : 'GREENCYCLE-20250415-001'
    const settlementAmount = search.amount > 0 ? search.amount : 5739000
    const [blockchainHash, setBlockchainHash] = useState('Pending settlement')
    const co2Saved = '4.8'

    const formatHash = (hash: string) => {
        if (hash.length <= 20) return hash
        return `${hash.slice(0, 11)}...${hash.slice(-8)}`
    }

    const handleConfirmSettlement = async () => {
        if (!/^\d{3}$/.test(pin)) {
            setPinError('Security Alert: Requires a 3-digit verification code token entry.')
            return
        }

        if (!search.batchId || settlementAmount <= 0) {
            setPinError('Missing batch or settlement amount. Open checkout from a sale record.')
            return
        }

        setIsProcessing(true)
        setPinError('')
        setCheckoutError('')

        try {
            const result = await operationsApi.checkout({
                batchId: search.batchId,
                amount: settlementAmount,
                pin,
            })

            setBlockchainHash(result.batch.immutableSettlementHash || result.batch.digitalPassportId || 'SETTLED')
            setIsSettled(true)
            setShowPinModal(false)
        } catch (err) {
            setPinError(err instanceof ApiError ? err.message : 'Checkout failed.')
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Top Header Bar (Encrypted Checkout) */}
            <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    {/* Brand Logo & Name */}
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-[#0256B2] rounded-lg flex items-center justify-center text-white font-black text-sm tracking-tighter">
                            EL
                        </div>
                        <span className="font-black text-lg text-slate-800 tracking-tight">ECO<span className="text-[#0256B2]">LYFT</span></span>
                    </div>

                    <div className="h-4 w-px bg-slate-200 mx-1" />

                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                        CHECKOUT PORTAL
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    {/* Synced Status */}
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200/60 rounded-full text-xs font-semibold text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Synced
                    </div>

                    {/* Secure Padlock */}
                    <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-extrabold px-2.5 py-1 rounded-md">
                        <Lock className="w-3.5 h-3.5 text-emerald-600" />
                        Secure Connection
                    </div>

                    <button className="text-slate-400 hover:text-slate-600 transition-colors" aria-label="Help">
                        <HelpCircle className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Scrollable Content View */}
            <main className="flex-1 w-full max-w-5xl mx-auto p-6 md:p-8 space-y-6">
                {checkoutError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{checkoutError}</div>
                )}
                
                {/* Top Green Processed Banner */}
                <div className="flex items-center gap-3 bg-[#E8F5E9] border border-emerald-100 rounded-xl p-4 shadow-sm">
                    <div className="bg-emerald-500 text-white rounded-full p-1 flex-shrink-0">
                        <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span className="text-sm font-extrabold text-emerald-800 tracking-wider">
                        SALES SUCCESSFULLY PROCESSED
                    </span>
                </div>

                {/* Action Links Row */}
                <div className="flex justify-end items-center gap-6 text-sm font-bold text-[#0256B2]">
                    <button
                        onClick={() => navigate({ to: '/log-sale' })}
                        className="hover:underline transition-all cursor-pointer"
                    >
                        Log New Sales
                    </button>
                    <button
                        className="flex items-center gap-1.5 hover:underline transition-all cursor-pointer"
                    >
                        <FileText className="w-4 h-4" />
                        Download PDF
                    </button>
                </div>

                {/* Main 2-Column Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left Column */}
                    <div className="col-span-1 lg:col-span-2 space-y-6">
                        
                        {/* Vendor Details Card */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm border-l-4 border-l-[#0256B2] relative">
                            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">
                                Vendor Details
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <h2 className="text-base font-extrabold text-slate-800">GREENCLCYCLE NG LTD</h2>
                                    <p className="text-xs text-slate-500 font-semibold">12 Business District, Lagos, Nigeria</p>
                                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                                        08076543412 | EMAILSUPPORT@GREENCYCLENG.COM
                                    </p>
                                </div>
                                <div className="md:text-right space-y-1">
                                    <h3 className="text-base font-extrabold text-slate-800">Adam Shona</h3>
                                    <p className="text-xs text-slate-500 font-semibold">Procurement Lead</p>
                                </div>
                            </div>
                            <div className="border-t border-slate-100 mt-5 pt-3">
                                <p className="text-[10px] font-extrabold text-slate-500 tracking-wider">
                                    GENERATED DATE: April 11, 2024 • 14:30 GMT
                                </p>
                            </div>
                        </div>

                        <p className="text-xs font-bold text-slate-500 leading-relaxed px-1">
                            Review the batch details and secure your payment to Global Polymers Ltd.
                        </p>

                        {/* Batch & Buyer Details Card */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6">
                            
                            {/* Header Row */}
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">BATCH ID</span>
                                    <h2 className="text-base font-black text-[#0256B2] font-display">{transactionId}</h2>
                                </div>
                                <div className="bg-slate-50 p-2 rounded-xl text-slate-400 border border-slate-100">
                                    <Handshake className="w-6 h-6 stroke-[1.5]" />
                                </div>
                            </div>

                            {/* Buyer Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
                                <div className="space-y-1.5">
                                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">BUYER ENTITY</span>
                                    <h3 className="text-sm font-extrabold text-slate-800">Global Polymers Ltd.</h3>
                                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                                        Plot 12, Industrial Way, Ikeja, Lagos
                                    </p>
                                </div>
                                <div className="space-y-1.5">
                                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">DESIGNATED CONTACT</span>
                                    <h3 className="text-sm font-extrabold text-slate-800">Adam Shona</h3>
                                    <p className="text-xs text-slate-500 font-semibold">
                                        a.shona@globalpolymers.com
                                    </p>
                                </div>
                            </div>

                            {/* Material Lines Table */}
                            <div className="space-y-6">
                                
                                {/* Row 1 (R-PET) */}
                                <div className="grid grid-cols-3 gap-4 text-left">
                                    <div className="space-y-1">
                                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">MARKET PRICE</span>
                                        <p className="text-sm font-extrabold text-slate-700">N320 <span className="text-xs font-semibold text-slate-400">/kg</span></p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">WEIGHT (KG)</span>
                                        <p className="text-sm font-black text-[#0256B2] font-display">10,000</p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">R-PET</span>
                                        <p className="text-sm font-extrabold text-slate-800">
                                            5,200,000 <span className="text-xs text-slate-400 font-normal">: 00</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Row 2 (PP) */}
                                <div className="grid grid-cols-3 gap-4 text-left">
                                    <div className="space-y-1">
                                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">MARKET PRICE</span>
                                        <p className="text-sm font-extrabold text-slate-700">N220 <span className="text-xs font-semibold text-slate-400">/kg</span></p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">WEIGHT (KG)</span>
                                        <p className="text-sm font-black text-[#0256B2] font-display">2,450</p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">PP</span>
                                        <p className="text-sm font-extrabold text-slate-800">
                                            539,000 <span className="text-xs text-slate-400 font-normal">: 00</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Total Row */}
                                <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-4 items-center">
                                    <div>
                                        <p className="text-sm font-black text-slate-800">TOTAL</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-[#0256B2] font-display">12,450</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-slate-800">
                                            5,739,000 <span className="text-xs text-slate-400 font-normal">: 00</span>
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* Environmental Impact Card */}
                        <div className="bg-[#0256B2] text-white rounded-2xl p-6 shadow-md flex items-center justify-between gap-6">
                            <div className="space-y-2">
                                <span className="text-[10px] font-extrabold text-blue-200 uppercase tracking-widest">
                                    ENVIRONMENTAL IMPACT
                                </span>
                                <h2 className="text-2xl font-black leading-none font-display">
                                    {co2Saved} METRIC TONS CO2 SAVED
                                </h2>
                                <p className="text-xs text-blue-100/90 font-medium leading-relaxed max-w-xl">
                                    This settlement contributes to carbon offset goals for Global Polymers Ltd. and verifies 100% circular plastic recovery.
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white flex-shrink-0">
                                <Leaf className="w-6 h-6 stroke-[1.5]" />
                            </div>
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="col-span-1 space-y-6">
                        
                        {/* Scan to verify materials Card */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
                            <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-6 w-full flex items-center justify-center text-slate-700">
                                <QrCode className="w-20 h-20 stroke-[1]" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-extrabold text-slate-800">Scan to verify materials</h3>
                                <p className="text-xs text-slate-500 font-semibold leading-relaxed max-w-xs">
                                    Verify material batches via mobile scanner for instant settlement.
                                </p>
                            </div>
                        </div>

                        {/* Verified Chain of Custody Card */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0256B2] flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-extrabold text-slate-800">Verified Chain of Custody</h3>
                                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">
                                        Immutable Blockchain Passport
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[#F8FAFC] border border-slate-150 rounded-xl p-3">
                                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                                    TX_HASH
                                </p>
                                <p className="text-xs font-mono text-slate-600 font-semibold break-all leading-normal select-all">
                                    {formatHash(blockchainHash)}
                                </p>
                            </div>

                            <button className="w-full flex items-center justify-center gap-2 border-2 border-[#0256B2] text-[#0256B2] hover:bg-blue-50/50 rounded-xl py-3 text-sm font-bold transition-all cursor-pointer">
                                <Download className="w-4 h-4" />
                                Download Digital Passport
                            </button>
                        </div>

                        {/* Settlement Detail & Action */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm py-1 px-1">
                                <span className="font-bold text-slate-400">Settlement Amount:</span>
                                <span className="text-base font-black text-slate-800 font-display">NGN {settlementAmount.toLocaleString()}.00</span>
                            </div>

                            <button
                                onClick={() => {
                                    if (!isSettled) {
                                        setShowPinModal(true)
                                    }
                                }}
                                disabled={isSettled}
                                className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                    isSettled 
                                    ? 'bg-emerald-500 text-white shadow-emerald-500/10' 
                                    : 'bg-[#0256B2] hover:bg-[#014188] text-white shadow-blue-500/10 hover:scale-[1.01] active:scale-[0.99]'
                                }`}
                            >
                                {isSettled ? (
                                    <>
                                        <CheckCircle2 className="w-5 h-5" />
                                        Settlement Completed
                                    </>
                                ) : (
                                    'Complete Settlement'
                                )}
                            </button>
                        </div>

                        {/* Scan To Pay Card (Bottom) */}
                        <div className="bg-[#EFF6FF] border border-blue-100 rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-3">
                            <div className="text-[#0256B2]">
                                <QrCode className="w-12 h-12 stroke-[1.2]" />
                            </div>
                            <span className="text-xs font-extrabold text-[#0256B2] uppercase tracking-wider">
                                Scan To Pay
                            </span>
                        </div>

                    </div>

                </div>

            </main>

            {/* PIN Verification Modal */}
            {showPinModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 bg-blue-50 text-[#0256B2] rounded-full flex items-center justify-center mx-auto mb-2">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-extrabold text-slate-800">PIN Cross-Check Shield</h3>
                            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                                Enter your 3-digit verification code token to authorize the <strong>NGN {settlementAmount.toLocaleString()}.00</strong> settlement.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1.5 text-center">
                                <input
                                    type="password"
                                    maxLength={3}
                                    placeholder="•••"
                                    value={pin}
                                    onChange={e => {
                                        setPin(e.target.value.replace(/\D/g, ''));
                                        setPinError('');
                                    }}
                                    className="w-24 text-center px-4 py-3 bg-[#F8FAFC] border-2 border-slate-200 rounded-xl text-lg font-bold font-display tracking-widest focus:outline-none focus:border-[#0256B2] transition-colors"
                                />
                                {pinError && (
                                    <p className="text-[11px] text-red-500 font-bold mt-1">
                                        {pinError}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPinModal(false);
                                        setPin('');
                                        setPinError('');
                                    }}
                                    className="flex-1 border-2 border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-3 rounded-xl text-xs transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleConfirmSettlement}
                                    disabled={isProcessing}
                                    className="flex-1 bg-[#0256B2] hover:bg-[#014188] text-white font-bold py-3 rounded-xl text-xs shadow-md shadow-blue-500/10 transition-all flex items-center justify-center"
                                >
                                    {isProcessing ? 'Verifying...' : 'Verify & Authorize'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
