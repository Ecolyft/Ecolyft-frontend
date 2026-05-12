import { createFileRoute } from '@tanstack/react-router'
import { BuyerProfile } from '../features/log/components/BuyerProfile'

export const Route = createFileRoute('/buyers/$buyerId')({
    component: BuyerProfileComponent,
})

function BuyerProfileComponent() {
    return <BuyerProfile />
}

