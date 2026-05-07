import { createFileRoute } from '@tanstack/react-router'
import { AddCollector } from '../features/log/components/AddCollector'

export const Route = createFileRoute('/collectors/new')({
    component: AddCollectorComponent,
})

function AddCollectorComponent() {
    return (
        <div className="p-8">
            <AddCollector />
        </div>
    )
}
