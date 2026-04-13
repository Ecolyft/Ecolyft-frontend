import { createFileRoute } from '@tanstack/react-router'
import { MoneyScreen } from '../../features/dashboard/components/MoneyScreen'

export const Route = createFileRoute('/dashboard/')({
    component: MoneyScreen,
})
