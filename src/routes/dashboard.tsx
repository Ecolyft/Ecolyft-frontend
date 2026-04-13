import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'
import { MoneyScreen } from '../features/dashboard/components/MoneyScreen'

export const Route = createFileRoute('/dashboard')({
    component: DashboardPage,
})

function DashboardPage() {
    return (
        <DashboardLayout>
            <MoneyScreen />
        </DashboardLayout>
    )
}
