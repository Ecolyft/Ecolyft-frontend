import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'

import { BatchList } from '../features/log/components/BatchList'

export const Route = createFileRoute('/batches')({
    component: BatchesPage,
})

function BatchesPage() {
    const location = useLocation()
    const isExact = location.pathname === '/batches'

    return (
        <DashboardLayout>
            {isExact ? <BatchList /> : <Outlet />}
        </DashboardLayout>
    )
}
