import type { ReactNode } from 'react'

type AuthCardProps = {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <section className="w-full max-w-md rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl sm:p-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200/30 bg-cyan-200/15 text-lg font-bold text-cyan-100">
          S
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
      </div>

      {children}

      {footer ? <div className="mt-6 text-center text-sm text-slate-300">{footer}</div> : null}
    </section>
  )
}
