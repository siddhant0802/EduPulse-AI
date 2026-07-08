import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthInput } from '../../auth'
import { LoadingButton } from '../../ui'

type ForgotPasswordFormValues = {
  email: string
}

export function ForgotPasswordForm() {
  const [message, setMessage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async () => {
    setMessage('Password reset can be connected when this project needs it.')
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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

      {message ? <p className="text-sm text-cyan-100">{message}</p> : null}

      <LoadingButton isLoading={isSubmitting} type="submit">
        Continue
      </LoadingButton>
    </form>
  )
}
