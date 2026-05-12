import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'
import { LogSale } from '../features/log/components/LogSale'

export const Route = createFileRoute('/log-sale')({
    component: LogSalePage,
})

function LogSalePage() {
    const location = useLocation()
    const isExact = location.pathname === '/log-sale'

    return (
        <DashboardLayout>
            {isExact ? <LogSale /> : <Outlet />}
        </DashboardLayout>
    )
}

