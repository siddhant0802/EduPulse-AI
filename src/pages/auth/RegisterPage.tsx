import { Link } from 'react-router'
import { AuthCard, AuthLayout } from '../../components/auth'
import { RegisterForm } from '../../components/forms'

export function RegisterPage() {
  return (
    <AuthLayout>
      <AuthCard
        description="Create your account and start from a reusable SaaS foundation."
        footer={
          <>
            Already have an account?{' '}
            <Link className="font-medium text-cyan-200 hover:text-cyan-100" to="/login">
              Login
            </Link>
          </>
        }
        title="Create account"
      >
        <RegisterForm />
      </AuthCard>
    </AuthLayout>
  )
}
