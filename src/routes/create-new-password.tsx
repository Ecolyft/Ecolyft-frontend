import { createFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '../features/auth/components/AuthLayout'
import { CreateNewPasswordForm } from '../features/auth/components/CreateNewPasswordForm'

export const Route = createFileRoute('/create-new-password')({
    component: CreateNewPasswordPage,
})

function CreateNewPasswordPage() {
    return (
        <AuthLayout>
            <CreateNewPasswordForm />
        </AuthLayout>
    )
}
