import { getPasswordStrength } from '../../utils'

type PasswordStrengthProps = {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  if (!password) return null

  const strength = getPasswordStrength(password)

  return (
    <div className="space-y-2">
      <div className="h-2 rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all ${strength.color}`}
          style={{ width: `${strength.value}%` }}
        />
      </div>
      <p className="text-xs text-slate-300">Password strength: {strength.label}</p>
    </div>
  )
}
