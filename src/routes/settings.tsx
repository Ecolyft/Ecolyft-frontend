import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'
import { Settings } from '../features/dashboard/components/Settings'

export const Route = createFileRoute('/settings')({
    component: SettingsPage,
})

function SettingsPage() {
    return (
        <DashboardLayout>
            <Settings />
        </DashboardLayout>
    )
}
