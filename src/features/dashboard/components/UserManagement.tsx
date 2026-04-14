import React from 'react'
import { UserPlus, MoreVertical } from 'lucide-react'

export const UserManagement: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-brand-dark">Team Management</h1>
                    <p className="text-slate-500">Invite staff and manage roles for your facility.</p>
                </div>
                <button className="bg-brand-blue text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-brand-blue/20 flex items-center space-x-2">
                    <UserPlus className="w-4 h-4" />
                    <span>Invite Member</span>
                </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Last Active</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <UserRow name="Amara Okafor" email="amara@ecolyft.com" role="Admin" status="Active" lastActive="2 mins ago" />
                        <UserRow name="John Friday" email="john.f@ecolyft.com" role="Operations" status="Active" lastActive="1 hour ago" />
                        <UserRow name="Seyi Bakare" email="seyi@ecolyft.com" role="Viewer" status="Invited" lastActive="-" />
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function UserRow({ name, email, role, status, lastActive }: any) {
    const roleColors = {
        Admin: 'text-purple-600 bg-purple-50',
        Operations: 'text-brand-blue bg-blue-50',
        Viewer: 'text-slate-600 bg-slate-50',
    }

    return (
        <tr className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                        {name.split(' ').map((n: any) => n[0]).join('')}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-brand-dark">{name}</div>
                        <div className="text-xs text-slate-400">{email}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-black uppercase", roleColors[role as keyof typeof roleColors])}>
                    {role}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <div className={cn("w-1.5 h-1.5 rounded-full", status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300')} />
                    <span className="text-xs font-medium text-slate-600">{status}</span>
                </div>
            </td>
            <td className="px-6 py-4 text-xs text-slate-500 font-medium">{lastActive}</td>
            <td className="px-6 py-4 text-right">
                <button className="p-1 hover:bg-slate-200 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                </button>
            </td>
        </tr>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ')
}
