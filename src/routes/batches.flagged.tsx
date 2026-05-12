import { createFileRoute } from '@tanstack/react-router'
import { BatchFlagged } from '../features/batches/components/BatchFlagged'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/batches/flagged')({
    component: BatchFlaggedPage,
})

function BatchFlaggedPage() {
    return (
        <DashboardLayout>
            <BatchFlagged />
        </DashboardLayout>
    )
}
