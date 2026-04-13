import { createFileRoute } from '@tanstack/react-router'
import { CompanySetup } from '../features/auth/components/CompanySetup'

export const Route = createFileRoute('/setup')({
    component: SetupPage,
})

function SetupPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white border-b border-slate-200 px-6 py-4">
                <img src="/logo/image 1.png" alt="EcoLyft Logo" className="h-8" />
            </nav>
            <CompanySetup />
        </div>
    )
}
