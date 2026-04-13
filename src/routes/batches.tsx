import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/batches')({
    component: BatchesPage,
})

function BatchesPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-display font-bold">Traceable Batches</h1>
                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
                    <p className="text-slate-500 font-medium">Coming soon: Full searchable list of all material batches.</p>
                </div>
            </div>
        </DashboardLayout>
    )
}
