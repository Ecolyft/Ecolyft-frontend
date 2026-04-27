import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'

import { BatchList } from '../features/log/components/BatchList'

export const Route = createFileRoute('/batches')({
    component: BatchesPage,
})

function BatchesPage() {
    return (
        <DashboardLayout>
            <BatchList />
        </DashboardLayout>
    )
}
