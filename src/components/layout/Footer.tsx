import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import { contact, navLinks, person, show, workplace } from '../../data/profile'
import { site } from '../../data/site'
import { links } from '../../lib/links'
import { FacebookIcon, LinkedinIcon, WhatsappIcon } from '../ui/BrandIcons'
import { Logo } from './Navbar'

export function Footer() {
  const socials = [
    { href: links.facebook, label: 'Facebook', Icon: FacebookIcon },
    { href: links.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
    { href: links.whatsapp, label: 'WhatsApp', Icon: WhatsappIcon },
  ].filter((s) => s.href || site.showPlaceholders)

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] max-w-[200%] -translate-x-1/2 rounded-full bg-teal-600/25 blur-3xl"
      />
      <div className="container-x relative pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo light />
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-white/70">
              {person.jobTitle} with {person.yearsOfExperience} years of experience helping people move better, manage pain and
              recover with confidence through personalised physiotherapy and rehabilitation.
            </p>
            <ul className="mt-6 flex gap-3" aria-label="Social media">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (opens in a new tab)`}
                      className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.08] text-white/85 ring-1 ring-white/10 transition hover:bg-teal-600 hover:text-white"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ) : (
                    <span
                      title={`${label} link not added yet`}
                      className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.04] text-white/35 ring-1 ring-white/10"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{label} (not yet available)</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-300">Quick links</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1 lg:grid-cols-1">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="inline-flex min-h-[40px] items-center text-[0.9375rem] text-white/70 transition hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2 lg:col-span-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-300">Contact</h2>
            <address className="mt-5 space-y-4 not-italic text-[0.9375rem] text-white/70">
              {show(contact.phone) && (
                <p className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" aria-hidden="true" />
                  {links.tel ? <a className="hover:text-white" href={links.tel}>{contact.phone}</a> : <span>{contact.phone}</span>}
                </p>
              )}
              {show(contact.email) && (
                <p className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" aria-hidden="true" />
                  {links.mail ? <a className="break-all hover:text-white" href={links.mail}>{contact.email}</a> : <span className="break-all">{contact.email}</span>}
                </p>
              )}
              <p className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" aria-hidden="true" />
                <span>
                  {workplace.name}
                  <br />
                  {workplace.address.city}, {workplace.address.country}
                </span>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 py-6 pb-[max(1.5rem,var(--safe-bottom))] text-sm text-white/55 sm:flex-row">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {person.name}. All Rights Reserved.
          </p>
          <a href="#home" className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-2 transition hover:text-white">
            Back to top
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
