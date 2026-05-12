import { createFileRoute } from '@tanstack/react-router'
import { BatchOutboundCreated } from '../features/batches/components/BatchOutboundCreated'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'

export const Route = createFileRoute('/batches/outbound-created')({
    component: BatchOutboundCreatedPage,
})

function BatchOutboundCreatedPage() {
    return (
        <DashboardLayout>
            <BatchOutboundCreated />
        </DashboardLayout>
    )
}
