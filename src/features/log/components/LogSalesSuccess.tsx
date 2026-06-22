import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { CheckCircle2, Share2 } from 'lucide-react'

export const LogSalesSuccess: React.FC = () => {
    const navigate = useNavigate()

    // Static data matching Figma — replace with real data from route state/store as needed
    const transactionId = 'GREENCYCLE-20250415-001'
    const blockchainHash = '0x72a9c1482e3f5b9d2e1c48e29a1c48e29a1c48e29a1c48e29a1c48e2'
    const co2Saved = '4.8'
    const yearlyGoalPct = 82

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                OUTBOUND &rsaquo; ARCHIVE
            </p>

            {/* Heading row */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-bold text-teal-700">{transactionId}</h1>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate({ to: '/dashboard' })}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={() => navigate({ to: '/log-sale' })}
                        className="bg-[#4A90E2] hover:bg-[#3a7fd2] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                    >
                        LOG NEW SALE
                    </button>
                </div>
            </div>

            {/* Top stat cards & Layout Grid */}
            {/* 3-column grid layout for the whole page. Left 2 cols for transaction and buttons, Right 1 col for custody and impact */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left 2 columns */}
                <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
                    {/* Top stat cards inside left section */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Green Weight card */}
                        <div className="col-span-1 bg-[#d1fae5] rounded-xl p-6">
                            <p className="text-4xl font-black text-emerald-800">
                                12,450<span className="text-xl font-bold ml-1">kg</span>
                            </p>
                            <p className="text-[11px] font-bold text-emerald-700 mt-2 uppercase tracking-widest">Total Combined Weight</p>
                        </div>

                        {/* Blue Value card */}
                        <div className="col-span-1 bg-[#0284c7] rounded-xl p-6">
                            <p className="text-4xl font-black text-white">
                                NGN 5,739,000<span className="text-xl font-bold text-sky-200 ml-1">:00</span>
                            </p>
                            <p className="text-[11px] font-bold text-sky-200 mt-2 uppercase tracking-widest">Total Sum To Be Paid</p>
                        </div>
                    </div>

                    {/* Transaction details */}
                    <div className="bg-white rounded-xl border border-slate-200 p-8 relative overflow-hidden flex-1">
                        {/* Handshake Watermark */}
                        <div className="absolute top-4 right-4 opacity-[0.03] pointer-events-none w-48 h-48">
                            <svg width="100%" height="100%" viewBox="0 0 56 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.2125 45C27.3792 45 27.5458 44.9583 27.7125 44.875C27.8792 44.7917 28.0042 44.7083 28.0875 44.625L48.5875 24.125C49.0875 23.625 49.4521 23.0625 49.6813 22.4375C49.9104 21.8125 50.025 21.1875 50.025 20.5625C50.025 19.8958 49.9104 19.2604 49.6813 18.6562C49.4521 18.0521 49.0875 17.5208 48.5875 17.0625L37.9625 6.4375C37.5042 5.9375 36.9729 5.57292 36.3688 5.34375C35.7646 5.11458 35.1292 5 34.4625 5C33.8375 5 33.2125 5.11458 32.5875 5.34375C31.9625 5.57292 31.4 5.9375 30.9 6.4375L30.2125 7.125L34.8375 11.8125C35.4625 12.3958 35.9208 13.0625 36.2125 13.8125C36.5042 14.5625 36.65 15.3542 36.65 16.1875C36.65 17.9375 36.0563 19.4062 34.8688 20.5938C33.6813 21.7812 32.2125 22.375 30.4625 22.375C29.6292 22.375 28.8271 22.2292 28.0562 21.9375C27.2854 21.6458 26.6083 21.2083 26.025 20.625L21.3375 16L10.4 26.9375C10.275 27.0625 10.1812 27.1979 10.1187 27.3438C10.0562 27.4896 10.025 27.6458 10.025 27.8125C10.025 28.1458 10.15 28.4271 10.4 28.6562L21.3375 39.625L17.7125 43.25L5.775 31.3125C4.81667 30.3542 4.09792 29.2396 3.61875 27.9688C3.13958 26.6979 2.9 25.4062 2.9 24.0938C2.9 22.7812 3.13958 21.4896 3.61875 20.2188C4.09792 18.9479 4.81667 17.8438 5.775 16.9062L16.3375 6.34375C16.8375 5.84375 17.4104 5.46875 18.0563 5.21875C18.7021 4.96875 19.3333 4.84375 19.95 4.84375C20.5667 4.84375 21.1875 4.96875 21.8125 5.21875C22.4375 5.46875 23 5.84375 23.4625 6.34375L24.15 7.03125L23.4625 7.71875C22.4625 8.67708 21.7333 9.78125 21.275 11.0312C20.8167 12.2812 20.5875 13.5417 20.5875 14.8125C20.5875 16.1042 20.8167 17.375 21.275 18.625C21.7333 19.875 22.4625 20.9792 23.4625 21.9375L28.15 26.625L32.8375 21.9375C33.4208 21.3542 34.0875 20.8854 34.8375 20.5312C35.5875 20.1771 36.3792 20 37.2125 20C38.0458 20 38.8375 20.1458 39.5875 20.4375C40.3375 20.7292 41.0042 21.1667 41.5875 21.75L43.525 23.6875L25.4 41.8125L22.65 39.0625L19.025 42.6875L23.5875 47.25C24.0875 47.75 24.6604 48.125 25.3063 48.375C25.9521 48.625 26.5875 48.75 27.2125 48.75V45ZM27.15 50C26.15 50 25.1708 49.8125 24.2125 49.4375C23.2542 49.0625 22.3958 48.5312 21.6375 47.8438L16.275 42.4812L20.65 38.1062L22.65 40.1062L41.3375 21.4188C40.6708 20.7521 39.9208 20.2458 39.0875 19.9C38.2542 19.5542 37.4 19.3812 36.525 19.3812C35.65 19.3812 34.8062 19.5542 33.9938 19.9C33.1813 20.2458 32.4208 20.7521 31.7125 21.4188L26.7125 26.4188L21.7125 21.4188C20.6292 20.3354 19.7854 19.0938 19.1812 17.6938C18.5771 16.2938 18.275 14.8438 18.275 13.3438C18.275 11.8438 18.5771 10.3938 19.1812 8.99375C19.7854 7.59375 20.6292 6.35417 21.7125 5.275L22.4 4.5875C21.7333 3.92083 20.9729 3.40417 20.1187 3.0375C19.2646 2.67083 18.375 2.4875 17.45 2.4875C16.525 2.4875 15.6354 2.67083 14.7812 3.0375C13.9271 3.40417 13.1667 3.92083 12.5 4.5875L2.4375 14.65C1.6875 15.4 1.125 16.2396 0.75 17.1688C0.375 18.0979 0.1875 19.0833 0.1875 20.125C0.1875 21.1667 0.375 22.1521 0.75 23.0812C1.125 24.0104 1.6875 24.85 2.4375 25.6L12.9375 36.1C13.4375 36.6 14.0417 36.9646 14.75 37.1937C15.4583 37.4229 16.1979 37.5375 16.9688 37.5375C17.7396 37.5375 18.4792 37.4229 19.1875 37.1937C19.8958 36.9646 20.5 36.6 21 36.1L30.9375 26.1625C31.6042 25.4958 32.3542 24.9896 33.1875 24.6438C34.0208 24.2979 34.875 24.125 35.75 24.125C36.625 24.125 37.4792 24.2979 38.3125 24.6438C39.1458 24.9896 39.8958 25.4958 40.5625 26.1625L50.5 36.1C51.25 36.85 51.8125 37.6938 52.1875 38.6313C52.5625 39.5688 52.75 40.5625 52.75 41.6125C52.75 42.6625 52.5625 43.6562 52.1875 44.5938C51.8125 45.5312 51.25 46.375 50.5 47.125L47.375 50.25L43.875 46.75L45.4375 45.1875C45.9375 44.6875 46.2979 44.1354 46.5187 43.5312C46.7396 42.9271 46.85 42.2917 46.85 41.625C46.85 40.9583 46.7396 40.3229 46.5187 39.7188C46.2979 39.1146 45.9375 38.5625 45.4375 38.0625L35.4375 28.0625C34.7708 27.3958 34.0208 26.8896 33.1875 26.5438C32.3542 26.1979 31.5 26.025 30.625 26.025C29.75 26.025 28.9062 26.1979 28.0938 26.5438C27.2812 26.8896 26.5208 27.3958 25.8125 28.0625L15.875 38C15.5417 38.3333 15.1562 38.5833 14.7188 38.75C14.2812 38.9167 13.8229 39 13.3438 39C12.8646 39 12.4062 38.9167 11.9688 38.75C11.5312 38.5833 11.1458 38.3333 10.8125 38L2.0625 29.25C1.72917 28.9167 1.47917 28.5312 1.3125 28.0938C1.14583 27.6562 1.0625 27.1979 1.0625 26.7188C1.0625 26.2396 1.14583 25.7812 1.3125 25.3438C1.47917 24.9062 1.72917 24.5208 2.0625 24.1875L12.0625 14.1875C12.7292 13.5208 13.4792 13.0146 14.3125 12.6688C15.1458 12.3229 16 12.15 16.875 12.15C17.75 12.15 18.5938 12.3229 19.4062 12.6688C20.2188 13.0146 20.9792 13.5208 21.6875 14.1875L26.6875 19.1875L31.6875 14.1875C32.7708 13.1042 33.6146 11.8646 34.2188 10.4688C34.8229 9.07292 35.125 7.625 35.125 6.125C35.125 4.625 34.8229 3.17708 34.2188 1.78125C33.6146 0.385417 32.7708 -0.854167 31.6875 -1.9375L31 -2.625L32.1875 -3.8125C33.2708 -4.89583 34.5208 -5.73958 35.9375 -6.34375C37.3542 -6.94792 38.8333 -7.25 40.375 -7.25C41.9167 -7.25 43.3958 -6.94792 44.8125 -6.34375C46.2292 -5.73958 47.4792 -4.89583 48.5625 -3.8125L59.1875 6.8125C60.2708 7.89583 61.1042 9.14583 61.6875 10.5625C62.2708 11.9792 62.5625 13.4583 62.5625 15C62.5625 16.5417 62.2708 18.0208 61.6875 19.4375C61.1042 20.8542 60.2708 22.1042 59.1875 23.1875L38.6875 43.6875C37.3542 45.0208 35.8542 46.0625 34.1875 46.8125C32.5208 47.5625 30.7417 47.9375 28.85 47.9375C28.5167 47.9375 28.2 47.9167 27.9 47.875C27.6 47.8333 27.35 47.7917 27.15 47.75V50Z" fill="currentColor"/>
                            </svg>
                        </div>
                        
                        <div className="flex items-start justify-between mb-8">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Transaction Details</p>
                        </div>

                        <div className="mb-10">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Buyer Entity</p>
                            <p className="text-lg font-bold text-[#1a3a5c]">Global Polymers Ltd.</p>
                        </div>

                        {/* Data Table */}
                        <div className="w-full mb-10">
                            <div className="grid grid-cols-12 gap-4 pb-3 border-b border-slate-100 mb-4">
                                <div className="col-span-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Market Price</div>
                                <div className="col-span-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weight / KG</div>
                                <div className="col-span-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">R-PET</div>
                            </div>
                            
                            {/* Row 1 */}
                            <div className="grid grid-cols-12 gap-4 mb-4 items-center">
                                <div className="col-span-4 text-base font-bold text-slate-700">N520 / kg</div>
                                <div className="col-span-4 text-base font-semibold text-slate-500">10,000</div>
                                <div className="col-span-4 text-base font-bold text-slate-800">5,200,000<span className="text-sm font-semibold text-slate-400 ml-1">: 00</span></div>
                            </div>
                            
                            {/* Row 2 */}
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-4 text-base font-bold text-slate-700">N220 / kg</div>
                                <div className="col-span-4 text-base font-semibold text-slate-500">2,450</div>
                                <div className="col-span-4 text-base font-bold text-slate-800">539,000<span className="text-sm font-semibold text-slate-400 ml-1">: 00</span></div>
                            </div>
                        </div>

                        <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Generated</p>
                            <p className="text-base font-bold text-slate-700">April 11, 2024 • 14:30 GMT</p>
                        </div>
                    </div>

                    {/* Bottom Action Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Green confirm button */}
                        <button className="col-span-1 bg-[#d1fae5] hover:bg-[#a7f3d0] rounded-xl p-5 text-center transition-colors">
                            <p className="text-sm font-black text-emerald-800 uppercase tracking-widest">TAP TO CONFIRM WEIGHT</p>
                        </button>

                        {/* Blue payment button */}
                        <button className="col-span-1 bg-[#0284c7] hover:bg-[#0369a1] rounded-xl p-5 text-center transition-colors">
                            <p className="text-sm font-black text-white uppercase tracking-widest">CLICK TO MAKE PAYMENT</p>
                        </button>
                    </div>
                </div>

                {/* Right 1 column */}
                <div className="col-span-1 flex flex-col gap-6">
                    {/* Chain of Custody */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                            </div>
                            <p className="text-lg font-bold text-[#1a3a5c]">Verified Chain of Custody</p>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Blockchain Traceability Hash</p>
                            <p className="text-xs font-mono text-slate-600 break-all leading-relaxed">{blockchainHash}</p>
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                            <Share2 className="w-4 h-4" />
                            Share Traceability
                        </button>
                    </div>

                    {/* Environmental Impact */}
                    <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2942] rounded-xl p-8 text-white shadow-lg">
                        <p className="text-[11px] font-bold text-teal-300 uppercase tracking-widest mb-4">Environmental Impact</p>
                        <p className="text-5xl font-black mb-2 text-white">
                            {co2Saved}
                        </p>
                        <p className="text-xs font-bold text-teal-200 uppercase tracking-widest mb-6">Metric Tons CO2 Saved</p>
                        
                        <p className="text-sm text-slate-300 mb-8 leading-relaxed font-medium">
                            This sale contributes significantly to carbon offset goals for Global Polymers Ltd.
                        </p>

                        {/* Progress bar */}
                        <div className="space-y-3">
                            <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-teal-400 h-3 rounded-full"
                                    style={{ width: `${yearlyGoalPct}%` }}
                                />
                            </div>
                            <p className="text-xs font-bold text-teal-200 text-right">{yearlyGoalPct}% Yearly Goal</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
