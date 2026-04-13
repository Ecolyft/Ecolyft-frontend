import React, { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import {
    LayoutDashboard,
    ArrowDownToLine,
    RefreshCw,
    ArrowUpFromLine,
    Users,
    Layers,
    BarChart2,
    Settings,
    Bell,
    Menu,
    X,
} from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
    { icon: ArrowDownToLine, label: 'Inbound', to: '/log-purchase' },
    { icon: RefreshCw, label: 'Throughput', to: '/log-processing' },
    { icon: ArrowUpFromLine, label: 'Outbound', to: '/log-sale' },
    { icon: Users, label: 'Collectors', to: '/collectors' },
    { icon: Layers, label: 'Batches', to: '/batches' },
    { icon: BarChart2, label: 'Reports', to: '/reports' },
    { icon: Settings, label: 'Settings', to: '/settings' },
]

interface DashboardLayoutProps {
    children?: React.ReactNode
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { location } = useRouterState()
    const currentPath = location.pathname

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">
            {/* Top Nav */}
            <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center gap-3">
                    <button
                        className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="w-5 h-5 text-slate-600" />
                    </button>
                    <img src="/logo/image 1.png" alt="EcoLyft" className="h-8" />
                </div>
                <div className="flex items-center gap-4 md:gap-5">
                    <div className="hidden sm:flex items-center gap-1.5 text-sm text-slate-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                        Synced
                    </div>
                    <Link to="/alerts" className="relative text-slate-500 hover:text-slate-700 p-1">
                        <Bell className="w-5 h-5" />
                    </Link>
                    <div className="text-right">
                        <p className="text-sm font-semibold text-slate-800 leading-tight">Adam Shona</p>
                        <p className="text-xs text-brand-blue leading-tight">GreenCycle Limited</p>
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
                    "lg:static lg:translate-x-0 lg:z-auto",
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
                                    <item.icon className={cn("w-4 h-4 flex-shrink-0", active ? "text-brand-blue" : "text-slate-400")} />
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
