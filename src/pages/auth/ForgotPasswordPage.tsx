import { Link } from 'react-router'
import { AuthCard, AuthLayout } from '../../components/auth'
import { ForgotPasswordForm } from '../../components/forms'

export function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AuthCard
        description="Enter your email to continue. Connect reset delivery when the product needs it."
        footer={
          <Link className="font-medium text-cyan-200 hover:text-cyan-100" to="/login">
            Back to login
          </Link>
        }
        title="Forgot password"
      >
        <ForgotPasswordForm />
      </AuthCard>
    </AuthLayout>
  )
}
