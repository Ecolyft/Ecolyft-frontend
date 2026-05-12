import { createFileRoute } from '@tanstack/react-router'
import { AcceptInvite } from '../features/auth/components/AcceptInvite'

export const Route = createFileRoute('/accept-invite')({
    component: AcceptInvite,
})
