import React, { useState } from 'react'
import { User, Phone, MapPin, Lock, RefreshCw } from 'lucide-react'

const LOCATIONS = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Ikeja', 'Lekki']

export const AcceptInvite: React.FC = () => {
    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [locOpen, setLocOpen] = useState(false)

    // In a real app these would come from the invite token in the URL
    const inviteeName = 'Obi'
    const fullName = 'Emeka Obi'

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // handle invite acceptance
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Logo placeholder */}
                <div className="flex justify-center pt-8 pb-2">
                    <div className="w-16 h-16 border-2 border-slate-200 rounded-2xl" />
                </div>

                {/* Greeting */}
                <div className="text-center px-6 pb-6">
                    <h1 className="text-2xl font-bold text-slate-900 mt-3">Hello {inviteeName},</h1>
                    <p className="text-sm text-slate-500 mt-1">Welcome to Ecolyft.<br />Kindly complete your profile</p>
                </div>

                <form onSubmit={handleSubmit} className="px-6 space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="flex items-center gap-1.5 text-sm text-slate-600 mb-1.5">
                            <User className="w-3.5 h-3.5" /> Full Name
                        </label>
                        <input
                            type="text"
                            defaultValue={fullName}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3B82F6]"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="flex items-center gap-1.5 text-sm text-slate-600 mb-1.5">
                            <Phone className="w-3.5 h-3.5" /> Phone Number
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder="+254..."
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3B82F6]"
                        />
                    </div>

                    {/* Office Location */}
                    <div className="relative">
                        <label className="flex items-center gap-1.5 text-sm text-slate-600 mb-1.5">
                            <MapPin className="w-3.5 h-3.5" /> Office Location
                        </label>
                        <button type="button" onClick={() => setLocOpen(o => !o)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-100">
                            <span className={location ? 'text-slate-800' : 'text-slate-400'}>{location || 'Select a location'}</span>
                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 15l-7 7-7-7" />
                            </svg>
                        </button>
                        {locOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-10 overflow-hidden">
                                {LOCATIONS.map(l => (
                                    <button key={l} type="button"
                                        onClick={() => { setLocation(l); setLocOpen(false) }}
                                        className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                                        {l}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Passwords */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="flex items-center gap-1.5 text-sm text-slate-600 mb-1.5">
                                <Lock className="w-3.5 h-3.5" /> Create Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3B82F6]"
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-1.5 text-sm text-slate-600 mb-1.5">
                                <RefreshCw className="w-3.5 h-3.5" /> Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirm}
                                onChange={e => setConfirm(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#3B82F6]"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button type="submit"
                        className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 mt-2">
                        Accept Invite &amp; Join Team
                        <span className="text-lg">→</span>
                    </button>
                </form>

                {/* Footer */}
                <div className="px-6 py-5 mt-4 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-500">
                        By joining, you agree to Ecosystems Ltd's{' '}
                        <a href="#" className="text-[#3B82F6] hover:underline">Terms of use</a>
                        {' '}and{' '}
                        <a href="#" className="text-[#3B82F6] hover:underline">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    )
}
