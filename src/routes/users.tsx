import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'
import { UserManagement } from '../features/dashboard/components/UserManagement'

export const Route = createFileRoute('/users')({
    component: UsersPage,
})

function UsersPage() {
    return (
        <DashboardLayout>
            <UserManagement />
        </DashboardLayout>
    )
}
