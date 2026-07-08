export const getPasswordStrength = (password: string) => {
  let score = 0

  if (password.length >= 8) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1

  if (score <= 1) return { label: 'Weak', value: 25, color: 'bg-rose-400' }
  if (score === 2) return { label: 'Fair', value: 50, color: 'bg-amber-400' }
  if (score === 3) return { label: 'Good', value: 75, color: 'bg-sky-400' }

  return { label: 'Strong', value: 100, color: 'bg-emerald-400' }
}
