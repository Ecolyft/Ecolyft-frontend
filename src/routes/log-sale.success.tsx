import { createFileRoute } from '@tanstack/react-router'
import { LogSalesSuccess } from '../features/log/components/LogSalesSuccess'

type SaleSuccessSearch = {
    batchId: string
    batchNumber: string
    buyerName: string
    totalAmount: string
    totalWeight: string
    lineCount: string
}

export const Route = createFileRoute('/log-sale/success')({
    validateSearch: (search: Record<string, unknown>): SaleSuccessSearch => ({
        batchId: String(search.batchId || ''),
        batchNumber: String(search.batchNumber || ''),
        buyerName: String(search.buyerName || 'Buyer'),
        totalAmount: String(search.totalAmount || '0'),
        totalWeight: String(search.totalWeight || '0'),
        lineCount: String(search.lineCount || '1'),
    }),
    component: LogSalesSuccessPage,
})

function LogSalesSuccessPage() {
    return <LogSalesSuccess />
}
