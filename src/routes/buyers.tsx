import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'
import { BuyerList } from '../features/log/components/BuyerList'

export const Route = createFileRoute('/buyers')({
    component: BuyersPage,
})

function BuyersPage() {
    const location = useLocation()
    const isExact = location.pathname === '/buyers'

    return (
        <DashboardLayout>
            {isExact ? <BuyerList /> : <Outlet />}
        </DashboardLayout>
    )
}

