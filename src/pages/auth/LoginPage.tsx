import { Link } from 'react-router'
import { AuthCard, AuthLayout } from '../../components/auth'
import { LoginForm } from '../../components/forms'

export function LoginPage() {
  return (
    <AuthLayout>
      <AuthCard
        description="Welcome back. Login to continue to your workspace."
        footer={
          <>
            New here?{' '}
            <Link className="font-medium text-cyan-200 hover:text-cyan-100" to="/register">
              Create an account
            </Link>
          </>
        }
        title="Login"
      >
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  )
}
