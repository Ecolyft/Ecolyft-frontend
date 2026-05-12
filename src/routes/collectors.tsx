import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'
import { CollectorList } from '../features/log/components/CollectorList'

export const Route = createFileRoute('/collectors')({
    component: CollectorsPage,
})

function CollectorsPage() {
    const location = useLocation()
    const isExact = location.pathname === '/collectors'

    return (
        <DashboardLayout>
            {isExact ? <CollectorList /> : <Outlet />}
        </DashboardLayout>
    )
}

