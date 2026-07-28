import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { authSession } from '../lib/authSession'

const PUBLIC_PATHS = new Set([
    '/',
    '/login',
    '/register',
    '/otp',
    '/reset-password',
    '/create-new-password',
    '/accept-invite',
    '/pricing',
])

export const Route = createRootRoute({
    beforeLoad: ({ location }) => {
        const path = location.pathname
        if (PUBLIC_PATHS.has(path)) return
        if (!authSession.isAuthenticated()) {
            throw redirect({ to: '/login' })
        }
    },
    component: () => (
        <>
            <Outlet />
            {import.meta.env.DEV && <TanStackRouterDevtools />}
        </>
    ),
})
