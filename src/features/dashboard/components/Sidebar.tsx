import React from 'react'
import { X } from 'lucide-react'
import { Link, useRouterState } from '@tanstack/react-router'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const navItems = [
    { icon: '/Group 46.png', label: 'Dashboard', to: '/dashboard' },
    { icon: '/Group 47.png', label: 'Inbound', to: '/log-purchase' },
    { icon: '/Group 49.png', label: 'Throughput', to: '/log-processing' },
    { icon: '/Group 48.png', label: 'Outbound', to: '/log-sale' },
    { icon: '/Group 50.png', label: 'Batches', to: '/batches' },
    { icon: '/Group 42.png', label: 'Collectors', to: '/collectors' },
    { icon: '/Group 45.png', label: 'Reports', to: '/reports' },
    { icon: '/Group 43.png', label: 'Settings', to: '/settings' },
]

interface SidebarProps {
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const { location } = useRouterState()
    const currentPath = location.pathname

    return (
        <aside className={cn(
            "fixed top-16 left-0 bottom-0 z-50 w-48 bg-white border-r border-slate-200 flex flex-col py-4 transition-transform duration-200 overflow-y-auto",
            "lg:relative lg:top-0 lg:h-full lg:translate-x-0 lg:z-auto",
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
    )
}
