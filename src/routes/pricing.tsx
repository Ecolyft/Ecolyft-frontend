import { createFileRoute } from '@tanstack/react-router'
import { Pricing } from '../features/dashboard/components/Pricing'

export const Route = createFileRoute('/pricing')({
    component: Pricing,
})
