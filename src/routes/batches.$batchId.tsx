import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'
import { BatchDetail } from '../features/log/components/BatchDetail'

export const Route = createFileRoute('/batches/$batchId')({
    component: BatchDetailPage,
})

function BatchDetailPage() {
    return (
        <DashboardLayout>
            <BatchDetail />
        </DashboardLayout>
    )
}
