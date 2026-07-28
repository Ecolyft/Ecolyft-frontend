import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'
import { LogPurchaseSuccess } from '../features/log/components/LogPurchaseSuccess'

type PurchaseSuccessSearch = {
    batchId: string
    batchNumber: string
    amount: string
    collectorName: string
    materialType: string
    weight: string
}

export const Route = createFileRoute('/log-purchase/success')({
    validateSearch: (search: Record<string, unknown>): PurchaseSuccessSearch => ({
        batchId: String(search.batchId || ''),
        batchNumber: String(search.batchNumber || ''),
        amount: String(search.amount || '0'),
        collectorName: String(search.collectorName || 'Supplier'),
        materialType: String(search.materialType || ''),
        weight: String(search.weight || '0'),
    }),
    component: LogPurchaseSuccessPage,
})

function LogPurchaseSuccessPage() {
    return (
        <DashboardLayout>
            <LogPurchaseSuccess />
        </DashboardLayout>
    )
}
