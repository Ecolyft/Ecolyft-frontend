import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'
import { Reports } from '../features/dashboard/components/Reports'

export const Route = createFileRoute('/reports')({
    component: ReportsPage,
})

function ReportsPage() {
    return (
        <DashboardLayout>
            <Reports />
        </DashboardLayout>
    )
}
