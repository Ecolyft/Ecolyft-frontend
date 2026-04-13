import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../features/dashboard/components/DashboardLayout'
import { LogProcessing } from '../features/log/components/LogProcessing'

export const Route = createFileRoute('/log-processing')({
    component: LogProcessingPage,
})

function LogProcessingPage() {
    return (
        <DashboardLayout>
            <LogProcessing />
        </DashboardLayout>
    )
}
