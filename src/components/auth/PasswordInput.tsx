import type { InputHTMLAttributes } from 'react'
import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const inputId = id ?? props.name

    return (
      <label className="block" htmlFor={inputId}>
        <span className="mb-2 block text-sm font-medium text-slate-100">{label}</span>
        <span className="relative block">
          <input
            id={inputId}
            ref={ref}
            type={isVisible ? 'text' : 'password'}
            className={`min-h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-200 focus:ring-2 focus:ring-cyan-200/30 ${className}`}
            {...props}
          />
          <button
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 rounded-lg p-1 text-slate-300 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200/40"
            onClick={() => setIsVisible((value) => !value)}
            type="button"
          >
            {isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </span>
        {error ? <span className="mt-2 block text-sm text-rose-200">{error}</span> : null}
      </label>
    )
  },
)

PasswordInput.displayName = 'PasswordInput'
