import { useEffect, useState } from 'react'
import { CalendarCheck, Menu, X } from 'lucide-react'
import { navLinks, person } from '../../data/profile'
import { useActiveSection, useScrolled } from '../../hooks/useSiteEffects'
import { cx } from '../ui/primitives'

const ids = navLinks.map((l) => l.id)

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal-600 to-brand-blue text-sm font-bold tracking-tight text-white shadow-glow"
      >
        {person.initials}
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className={cx('truncate text-[0.9375rem] font-bold tracking-tight', light ? 'text-white' : 'text-navy-900')}>
          {person.name}
        </span>
        <span className={cx('truncate text-xs font-medium', light ? 'text-teal-200' : 'text-teal-700')}>{person.jobTitle}</span>
      </span>
    </span>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled()
  const active = useActiveSection(ids)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1280 && setOpen(false)
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 pt-[var(--safe-top)] transition-[background-color,box-shadow,border-color] duration-300',
        scrolled || open
          ? 'border-b border-navy-900/[0.06] bg-white/85 shadow-[0_8px_30px_-18px_rgba(23,37,84,.25)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav aria-label="Primary" className="container-x flex h-[var(--header-h)] items-center justify-between gap-4">
        <a href="#home" className="min-w-0 rounded-xl" onClick={() => setOpen(false)} aria-label={`${person.name} — back to top`}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={cx(
                  'relative rounded-lg px-3 py-2 text-[0.875rem] font-medium transition-colors 2xl:px-3.5',
                  active === l.id ? 'text-teal-700' : 'text-navy-700 hover:text-teal-700',
                )}
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className={cx(
                    'absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-teal-600 transition-transform duration-300',
                    active === l.id ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn-primary hidden min-h-[44px] px-5 text-sm sm:inline-flex">
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Book Appointment
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-navy-900/10 bg-white text-navy-900 shadow-soft xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100dvh-var(--header-h)-var(--safe-top))] overflow-y-auto border-t border-navy-900/[0.06] bg-white xl:hidden"
      >
        <div className="container-x pb-[max(1.5rem,var(--safe-bottom))] pt-3">
          <ul className="grid gap-1 sm:grid-cols-2">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={cx(
                    'flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium transition-colors',
                    active === l.id ? 'bg-teal-50 text-teal-700' : 'text-navy-800 hover:bg-surface',
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full">
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Book Appointment
          </a>
        </div>
      </div>
    </header>
  )
}
