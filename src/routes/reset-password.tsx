import { createFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '../features/auth/components/AuthLayout'
import { ResetPassword } from '../features/auth/components/ResetPassword'

export const Route = createFileRoute('/reset-password')({
    component: ResetPasswordPage,
})

function ResetPasswordPage() {
    return (
        <AuthLayout
            title="Secure your account"
            subtitle="Follow the steps to reset your password and regain access."
        >
            <ResetPassword />
        </AuthLayout>
    )
}
