import { createFileRoute } from '@tanstack/react-router'
import { BatchProcessing } from '../features/batches/components/BatchProcessing'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/batches/processing')({
    component: BatchProcessingPage,
})

function BatchProcessingPage() {
    return (
        <DashboardLayout>
            <BatchProcessing />
        </DashboardLayout>
    )
}
