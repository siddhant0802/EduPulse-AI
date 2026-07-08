import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthInput, PasswordInput, PasswordStrength } from '../../auth'
import { LoadingButton } from '../../ui'
import { authService } from '../../../services'
import type { RegisterPayload } from '../../../types/auth'

type RegisterFormValues = RegisterPayload & {
  confirmPassword: string
}

export function RegisterForm() {
  const [formError, setFormError] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const password = watch('password')

  const onSubmit = async ({ name, email, password: submittedPassword }: RegisterFormValues) => {
    setFormError('')
    await authService.register({ name, email, password: submittedPassword }).catch(() => {
      setFormError('Unable to create an account with those details.')
    })
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <AuthInput
        autoComplete="name"
        error={errors.name?.message}
        label="Name"
        placeholder="Your name"
        {...register('name', {
          required: 'Name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters',
          },
        })}
      />

      <AuthInput
        autoComplete="email"
        error={errors.email?.message}
        label="Email"
        placeholder="you@example.com"
        type="email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Enter a valid email address',
          },
        })}
      />

      <PasswordInput
        autoComplete="new-password"
        error={errors.password?.message}
        label="Password"
        placeholder="Create a password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        })}
      />

      <PasswordStrength password={password} />

      <PasswordInput
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        label="Confirm password"
        placeholder="Repeat your password"
        {...register('confirmPassword', {
          required: 'Confirm your password',
          validate: (value) => value === password || 'Passwords do not match',
        })}
      />

      {formError ? <p className="text-sm text-rose-200">{formError}</p> : null}

      <LoadingButton isLoading={isSubmitting} type="submit">
        Create account
      </LoadingButton>
    </form>
  )
}
