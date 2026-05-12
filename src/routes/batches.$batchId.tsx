import { createFileRoute } from '@tanstack/react-router'
import { BatchDetail } from '../features/log/components/BatchDetail'

export const Route = createFileRoute('/batches/$batchId')({
    component: BatchDetailPage,
})

function BatchDetailPage() {
    return <BatchDetail />
}

