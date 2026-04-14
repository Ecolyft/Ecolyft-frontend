import { createFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '../features/auth/components/AuthLayout'
import { ResetPassword } from '../features/auth/components/ResetPassword'

export const Route = createFileRoute('/reset-password')({
    component: ResetPasswordPage,
})

function ResetPasswordPage() {
    return (
        <AuthLayout>
            <ResetPassword />
        </AuthLayout>
    )
}
