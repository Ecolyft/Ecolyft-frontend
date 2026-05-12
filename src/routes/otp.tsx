import { createFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '../features/auth/components/AuthLayout'
import { OTPVerification } from '../features/auth/components/OTPVerification'

export const Route = createFileRoute('/otp')({
    component: OTPPage,
})

function OTPPage() {
    return (
        <AuthLayout>
            <OTPVerification />
        </AuthLayout>
    )
}
