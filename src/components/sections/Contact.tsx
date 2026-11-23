import { useEffect, useRef, useState, type FormEvent } from 'react'
import { CircleAlert, CircleCheck, Clock, ExternalLink, LoaderCircle, Mail, MapPin, Phone, Send, ShieldCheck } from 'lucide-react'
import { contact, isFilled, person, show, workplace } from '../../data/profile'
import { site } from '../../data/site'
import { formatAddress, links } from '../../lib/links'
import { FacebookIcon, LinkedinIcon, WhatsappIcon } from '../ui/BrandIcons'
import { Reveal, Section, SectionHeading, T, cx } from '../ui/primitives'

type Fields = { name: string; phone: string; email: string; date: string; message: string; company: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status = { type: 'idle' | 'sending' | 'success' | 'error' | 'info'; message?: string }

const empty: Fields = { name: '', phone: '', email: '', date: '', message: '', company: '' }
const MAX_MSG = 500

function todayISO() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your full name.'
  else if (f.name.trim().length > 80) e.name = 'Name is too long.'
  const digits = f.phone.replace(/\D/g, '')
  if (!f.phone.trim()) e.phone = 'Please enter a phone number so we can confirm your appointment.'
  else if (!/^\+?[\d\s()-]+$/.test(f.phone.trim()) || digits.length < 8 || digits.length > 15) e.phone = 'Please enter a valid phone number.'
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.'
  if (f.date && f.date < todayISO()) e.date = 'Please choose today or a future date.'
  if (f.message.length > MAX_MSG) e.message = `Please keep your message under ${MAX_MSG} characters.`
  return e
}

function ContactRow({ Icon, label, value, href, external }: { Icon: typeof Phone; label: string; value: string; href?: string | null; external?: boolean }) {
  if (!show(value)) return null
  const inner = (
    <>
      <span className="icon-tile">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-navy-500">{label}</span>
        <span className="mt-0.5 block font-semibold text-navy-900 [overflow-wrap:anywhere]">
          <T>{value}</T>
        </span>
      </span>
    </>
  )
  const cls = 'flex items-center gap-4 rounded-2xl p-3 -m-3 transition-colors'
  return href ? (
    <a href={href} className={cx(cls, 'hover:bg-teal-50')} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  )
}

export function Contact() {
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [status, setStatus] = useState<Status>({ type: 'idle' })
  const [minDate, setMinDate] = useState<string | undefined>(undefined)
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMinDate(todayISO()), [])

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    const next = { ...fields, [k]: e.target.value }
    setFields(next)
    if (touched[k]) setErrors(validate(next))
  }
  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors(validate(fields))
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (fields.company) return // honeypot: silently ignore bots
    const errs = validate(fields)
    setErrors(errs)
    setTouched({ name: true, phone: true, email: true, date: true, message: true })
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0]
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      setStatus({ type: 'error', message: 'Please correct the highlighted fields and try again.' })
      return
    }

    const summary = [
      `Appointment request for ${person.name}`,
      `Name: ${fields.name.trim()}`,
      `Phone: ${fields.phone.trim()}`,
      fields.email.trim() && `Email: ${fields.email.trim()}`,
      fields.date && `Preferred date: ${fields.date}`,
      fields.message.trim() && `Message: ${fields.message.trim()}`,
    ]
      .filter(Boolean)
      .join('\n')

    if (site.formEndpoint) {
      setStatus({ type: 'sending' })
      try {
        const res = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name: fields.name, phone: fields.phone, email: fields.email, preferredDate: fields.date, message: fields.message, _subject: 'New appointment request' }),
        })
        if (!res.ok) throw new Error(String(res.status))
        setFields(empty)
        setTouched({})
        setStatus({ type: 'success', message: 'Thank you! Your appointment request has been sent. You will be contacted soon to confirm a time.' })
      } catch {
        setStatus({ type: 'error', message: 'Sorry, your request could not be sent right now. Please try again or call directly.' })
      }
    } else if (links.whatsapp) {
      window.open(`${links.whatsapp}?text=${encodeURIComponent(summary)}`, '_blank', 'noopener')
      setStatus({ type: 'info', message: 'WhatsApp has opened with your request. Please press send in WhatsApp to complete it.' })
    } else if (links.mail) {
      window.location.href = `${links.mail}?subject=${encodeURIComponent('Appointment request')}&body=${encodeURIComponent(summary)}`
      setStatus({ type: 'info', message: 'Your email app has opened with your request. Please press send to complete it.' })
    } else if (links.tel) {
      setStatus({ type: 'info', message: `Online requests are not active yet. Please call ${contact.phone} to book your appointment.` })
    } else {
      setStatus({ type: 'error', message: 'Online booking is not available yet. Please contact by phone for now.' })
    }
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  const err = (k: keyof Fields) => (touched[k] ? errors[k] : undefined)
  const fieldProps = (k: keyof Fields) => ({
    id: `f-${k}`,
    name: k,
    value: fields[k],
    onChange: set(k),
    onBlur: blur(k),
    'aria-invalid': err(k) ? true : undefined,
    'aria-describedby': err(k) ? `f-${k}-error` : k === 'message' ? 'f-message-hint' : undefined,
    className: 'field',
  })
  const ErrorText = ({ k }: { k: keyof Fields }) =>
    err(k) ? (
      <p id={`f-${k}-error`} className="field-error">
        <CircleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
        {err(k)}
      </p>
    ) : null

  const socials = [
    { href: links.facebook, label: 'Facebook', Icon: FacebookIcon },
    { href: links.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  ].filter((s) => s.href || site.showPlaceholders)

  return (
    <Section id="contact" tone="surface">
      <SectionHeading
        id="contact"
        eyebrow="Contact & Appointment"
        title={
          <>
            Let’s start your <span className="text-gradient">recovery</span>
          </>
        }
        description="Request an appointment or get in touch. You’ll receive a call or message to confirm a suitable time."
      />

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Contact details */}
        <Reveal className="flex min-w-0 flex-col gap-6 lg:col-span-5">
          <div className="card space-y-6 p-6 sm:p-8">
            <ContactRow Icon={Phone} label="Phone" value={contact.phone} href={links.tel} />
            <ContactRow Icon={WhatsappIcon as unknown as typeof Phone} label="WhatsApp" value={isFilled(contact.whatsapp) ? 'Chat on WhatsApp' : contact.whatsapp} href={links.whatsapp} external />
            <ContactRow Icon={Mail} label="Email" value={contact.email} href={links.mail} />
            <ContactRow Icon={MapPin} label={isFilled(workplace.name) ? workplace.name : 'Workplace'} value={formatAddress()} href={links.maps} external />
            <ContactRow Icon={Clock} label="Consultation hours" value={workplace.hours} />

            <div className="flex flex-wrap items-center gap-3 border-t border-navy-900/[0.06] pt-6">
              <span className="text-sm font-medium text-navy-500">Connect:</span>
              {socials.map(({ href, label, Icon }) =>
                href ? (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} className="grid h-11 w-11 place-items-center rounded-xl bg-surface text-navy-700 ring-1 ring-navy-900/[0.06] transition hover:bg-teal-600 hover:text-white">
                    <Icon className="h-5 w-5" />
                  </a>
                ) : (
                  <span key={label} title={`${label} link not added yet`} className="grid h-11 w-11 place-items-center rounded-xl bg-surface text-navy-900/30 ring-1 ring-navy-900/[0.06]">
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label} (not yet available)</span>
                  </span>
                ),
              )}
              {links.googleBusiness && (
                <a href={links.googleBusiness} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-teal-700 hover:underline">
                  Google Business Profile <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {links.mapEmbed ? (
            <div className="card relative min-h-[16rem] flex-1 overflow-hidden">
              <iframe
                title={`Map showing the location of ${workplace.name}`}
                src={links.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          ) : links.tel ? (
            <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-teal-800 p-7 text-white shadow-glow sm:p-8">
              <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-40 [filter:invert(1)]" />
              <p className="relative text-sm font-semibold uppercase tracking-wider text-teal-100">Prefer to talk?</p>
              <p className="relative mt-2 text-xl font-bold sm:text-2xl">Call directly to book your visit</p>
              <a
                href={links.tel}
                className="relative mt-5 inline-flex min-h-[48px] w-fit items-center gap-2.5 rounded-xl bg-white px-5 font-semibold text-teal-800 shadow-lift transition hover:-translate-y-0.5"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                {contact.phone}
              </a>
            </div>
          ) : null}
        </Reveal>

        {/* Appointment form */}
        <Reveal delay={100} className="min-w-0 lg:col-span-7">
          <form ref={formRef} onSubmit={onSubmit} noValidate className="card p-6 sm:p-8 lg:p-10" aria-labelledby="form-title">
            <h3 id="form-title" className="text-h3 font-bold">
              Request an appointment
            </h3>
            <p className="mt-1.5 text-[0.9375rem] text-navy-600">
              Fields marked <span aria-hidden="true" className="text-red-600">*</span>
              <span className="sr-only">with an asterisk</span> are required.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="f-name" className="field-label">
                  Full name <span aria-hidden="true" className="text-red-600">*</span>
                </label>
                <input {...fieldProps('name')} type="text" autoComplete="name" required placeholder="Your full name" />
                <ErrorText k="name" />
              </div>
              <div>
                <label htmlFor="f-phone" className="field-label">
                  Phone number <span aria-hidden="true" className="text-red-600">*</span>
                </label>
                <input {...fieldProps('phone')} type="tel" inputMode="tel" autoComplete="tel" required placeholder="+880 1XXX-XXXXXX" />
                <ErrorText k="phone" />
              </div>
              <div>
                <label htmlFor="f-email" className="field-label">
                  Email <span className="font-normal text-navy-500">(optional)</span>
                </label>
                <input {...fieldProps('email')} type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" />
                <ErrorText k="email" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="f-date" className="field-label">
                  Preferred appointment date <span className="font-normal text-navy-500">(optional)</span>
                </label>
                <input {...fieldProps('date')} type="date" min={minDate} />
                <ErrorText k="date" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="f-message" className="field-label">
                  Message <span className="font-normal text-navy-500">(optional)</span>
                </label>
                <textarea {...fieldProps('message')} rows={4} maxLength={MAX_MSG + 50} placeholder="Briefly tell us how we can help and your preferred time of day." className="field resize-y" />
                <p id="f-message-hint" className="mt-1.5 flex justify-between gap-4 text-xs text-navy-500">
                  <span>Please don’t include detailed medical history — it will be discussed privately at your appointment.</span>
                  <span className={cx('shrink-0 tabular-nums', fields.message.length > MAX_MSG && 'font-semibold text-red-700')}>
                    {fields.message.length}/{MAX_MSG}
                  </span>
                </p>
                <ErrorText k="message" />
              </div>

              {/* Honeypot (hidden from people & assistive tech) */}
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="f-company">Company</label>
                <input id="f-company" name="company" tabIndex={-1} autoComplete="off" value={fields.company} onChange={set('company')} />
              </div>
            </div>

            <div
              ref={statusRef}
              tabIndex={-1}
              role={status.type === 'error' ? 'alert' : 'status'}
              aria-live="polite"
              className="outline-none"
            >
              {status.message && status.type !== 'sending' && (
                <p
                  className={cx(
                    'mt-6 flex gap-3 rounded-2xl p-4 text-[0.9375rem] font-medium',
                    status.type === 'success' && 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/20',
                    status.type === 'info' && 'bg-blue-50 text-blue-800 ring-1 ring-blue-600/20',
                    status.type === 'error' && 'bg-red-50 text-red-800 ring-1 ring-red-600/20',
                  )}
                >
                  {status.type === 'error' ? <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" /> : <CircleCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />}
                  {status.message}
                </p>
              )}
            </div>

            <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-sm text-navy-500">
                <ShieldCheck className="h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                Your details are used only to arrange your appointment.
              </p>
              <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status.type === 'sending'}>
                {status.type === 'sending' ? (
                  <>
                    <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" /> Send Request
                  </>
                )}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
