import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'
import { LogPurchase } from '../features/log/components/LogPurchase'

export const Route = createFileRoute('/log-purchase')({
    component: LogPurchasePage,
})

function LogPurchasePage() {
    return (
        <DashboardLayout>
            <LogPurchase />
        </DashboardLayout>
    )
}
