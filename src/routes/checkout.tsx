import { createFileRoute } from '@tanstack/react-router'
import { CheckoutPortal } from '../features/log/components/CheckoutPortal'

type CheckoutSearch = {
    batchId: string
    amount: number
}

export const Route = createFileRoute('/checkout')({
    validateSearch: (search: Record<string, unknown>): CheckoutSearch => ({
        batchId: String(search.batchId || ''),
        amount: Number(search.amount || 0),
    }),
    component: CheckoutPage,
})

function CheckoutPage() {
    return <CheckoutPortal />
}
