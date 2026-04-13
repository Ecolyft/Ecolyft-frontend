import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'
import { LogSale } from '../features/log/components/LogSale'

export const Route = createFileRoute('/log-sale')({
    component: LogSalePage,
})

function LogSalePage() {
    return (
        <DashboardLayout>
            <LogSale />
        </DashboardLayout>
    )
}
