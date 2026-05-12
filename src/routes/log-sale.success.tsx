import { createFileRoute } from '@tanstack/react-router'
import { LogSalesSuccess } from '../features/log/components/LogSalesSuccess'

export const Route = createFileRoute('/log-sale/success')({
    component: LogSalesSuccessPage,
})

function LogSalesSuccessPage() {
    return <LogSalesSuccess />
}

