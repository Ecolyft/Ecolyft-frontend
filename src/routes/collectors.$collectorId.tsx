import { createFileRoute } from '@tanstack/react-router'
import { CollectorProfile } from '../features/log/components/CollectorProfile'

export const Route = createFileRoute('/collectors/$collectorId')({
    component: CollectorProfileComponent,
})

function CollectorProfileComponent() {
    return (
        <div className="p-8">
            <CollectorProfile />
        </div>
    )
}
