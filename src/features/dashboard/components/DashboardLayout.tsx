import React, { useState } from 'react'
import {
    Bell,
    Menu,
    X,
    ChevronLeft,
} from 'lucide-react'
import { Link, useRouterState, useNavigate } from '@tanstack/react-router'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const navItems = [
    { icon: '/Group 46.png', label: 'Dashboard', to: '/dashboard' },
    { icon: '/Group 47.png', label: 'Inbound', to: '/log-purchase' },
    { icon: '/Group 49.png', label: 'Throughput', to: '/log-processing' },
    { icon: '/Group 48.png', label: 'Outbound', to: '/log-sale' },
    { icon: '/Group 42.png', label: 'Collectors', to: '/collectors' },
    { icon: '/Group 50.png', label: 'Batches', to: '/batches' },
    { icon: '/Group 45.png', label: 'Reports', to: '/reports' },
    { icon: '/Group 43.png', label: 'Settings', to: '/settings' },
]

interface DashboardLayoutProps {
    children?: React.ReactNode
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { location } = useRouterState()
    const navigate = useNavigate()
    const currentPath = location.pathname

    // Define root paths where the back button should NOT show
    const isRootPath = navItems.some(item => item.to === currentPath) || currentPath === '/'

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">
            {/* Top Nav */}
            <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center gap-2 md:gap-3">
                    {!isRootPath ? (
                        <button
                            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center text-slate-600"
                            onClick={() => navigate({ to: '..' })}
                            aria-label="Go back"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            <span className="hidden sm:inline text-sm font-medium ml-0.5">Back</span>
                        </button>
                    ) : (
                        <button
                            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu className="w-5 h-5 text-slate-600" />
                        </button>
                    )}
                    <Link to="/dashboard" className="flex items-center">
                        <img src="/logo/image 1.png" alt="EcoLyft" className="h-6 md:h-8 object-contain" />
                    </Link>
                </div>
                <div className="flex items-center gap-3 md:gap-5">
                    <div className="hidden lg:flex items-center gap-1.5 text-xs md:text-sm text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                        Synced
                    </div>
                    <Link to="/alerts" className="relative text-slate-500 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-50 transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                    </Link>
                    <div className="flex items-center gap-3 pl-2 border-l border-slate-100">
                        <div className="text-right hidden xs:block">
                            <p className="text-sm font-bold text-slate-800 leading-tight">Adam Shona</p>
                            <p className="text-[10px] md:text-xs text-brand-blue font-medium leading-tight">GreenCycle Limited</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue font-bold text-xs border border-blue-200">
                            AS
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 min-h-0">
                {/* Mobile overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside className={cn(
                    "fixed top-16 left-0 bottom-0 z-50 w-48 bg-white border-r border-slate-200 flex flex-col py-4 transition-transform duration-200",
                    "lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] lg:translate-x-0 lg:z-auto",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}>
                    <button
                        className="lg:hidden absolute top-3 right-3 p-1 rounded hover:bg-slate-100"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-4 h-4 text-slate-500" />
                    </button>
                    <nav className="flex flex-col gap-0.5 px-2">
                        {navItems.map(item => {
                            const active = currentPath === item.to
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setSidebarOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                        active
                                            ? "bg-blue-50 text-brand-blue border-l-2 border-brand-blue pl-[10px]"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                                    )}
                                >
                                    <img
                                        src={item.icon}
                                        alt={item.label}
                                        className={cn("w-5 h-5 flex-shrink-0 object-contain", active ? "brightness-110 contrast-110 scale-110" : "opacity-100")}
                                    />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 min-w-0 w-full p-4 md:p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
