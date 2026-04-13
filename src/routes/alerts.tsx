import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'
import { AlertsFeed } from '../features/dashboard/components/AlertsFeed'

export const Route = createFileRoute('/alerts')({
    component: AlertsPage,
})

function AlertsPage() {
    return (
        <DashboardLayout>
            <AlertsFeed />
        </DashboardLayout>
    )
}
