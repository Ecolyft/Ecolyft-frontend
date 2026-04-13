import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'
import { BuyerList } from '../features/log/components/BuyerList'

export const Route = createFileRoute('/buyers')({
    component: BuyersPage,
})

function BuyersPage() {
    return (
        <DashboardLayout>
            <BuyerList />
        </DashboardLayout>
    )
}
