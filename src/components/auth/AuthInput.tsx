import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id ?? props.name

    return (
      <label className="block" htmlFor={inputId}>
        <span className="mb-2 block text-sm font-medium text-slate-100">{label}</span>
        <input
          id={inputId}
          ref={ref}
          className={`min-h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-200 focus:ring-2 focus:ring-cyan-200/30 ${className}`}
          {...props}
        />
        {error ? <span className="mt-2 block text-sm text-rose-200">{error}</span> : null}
      </label>
    )
  },
)

AuthInput.displayName = 'AuthInput'
