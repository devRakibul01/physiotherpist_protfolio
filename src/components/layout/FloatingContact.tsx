import { CalendarCheck } from 'lucide-react'
import { links } from '../../lib/links'
import { useScrolled } from '../../hooks/useSiteEffects'
import { WhatsappIcon } from '../ui/BrandIcons'
import { cx } from '../ui/primitives'

/** Floating quick-contact: WhatsApp when available, otherwise a booking shortcut (mobile only). */
export function FloatingContact() {
  const visible = useScrolled(500)
  const base =
    'fixed z-40 grid h-14 w-14 place-items-center rounded-full text-white shadow-lift transition-all duration-300 bottom-[max(1.25rem,calc(var(--safe-bottom)+0.75rem))] right-[max(1.25rem,calc(var(--safe-right)+0.75rem))]'
  const shown = visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'

  if (links.whatsapp) {
    return (
      <a
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp (opens in a new tab)"
        tabIndex={visible ? 0 : -1}
        className={cx(base, shown, 'bg-[#1FAF54] hover:scale-105')}
      >
        <WhatsappIcon className="h-7 w-7" />
      </a>
    )
  }
  return (
    <a
      href="#contact"
      aria-label="Book an appointment"
      tabIndex={visible ? 0 : -1}
      className={cx(base, shown, 'bg-teal-600 hover:scale-105 sm:hidden')}
    >
      <CalendarCheck className="h-6 w-6" aria-hidden="true" />
    </a>
  )
}
