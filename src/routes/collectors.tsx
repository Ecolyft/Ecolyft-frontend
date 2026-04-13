import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'
import { CollectorList } from '../features/log/components/CollectorList'

export const Route = createFileRoute('/collectors')({
    component: CollectorsPage,
})

function CollectorsPage() {
    return (
        <DashboardLayout>
            <CollectorList />
        </DashboardLayout>
    )
}
