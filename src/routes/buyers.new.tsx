import { createFileRoute } from '@tanstack/react-router'
import { AddBuyer } from '../features/log/components/AddBuyer'

export const Route = createFileRoute('/buyers/new')({
    component: AddBuyerComponent,
})

function AddBuyerComponent() {
    return <AddBuyer />
}

