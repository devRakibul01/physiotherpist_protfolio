import type { CSSProperties, ReactNode } from 'react'
import { isPlaceholder } from '../../data/profile'

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')

/** Renders text; if it's a [placeholder] it gets a subtle dashed underline so it's easy to spot. */
export function T({ children, className }: { children: string; className?: string }) {
  return isPlaceholder(children) ? <span className={cx('ph', className)}>{children}</span> : <span className={className}>{children}</span>
}

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'article'
}) {
  return (
    <Tag className={cx('reveal', className)} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  )
}

type SectionProps = {
  id: string
  children: ReactNode
  tone?: 'white' | 'surface'
  className?: string
}

export function Section({ id, children, tone = 'white', className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cx('section-y relative', tone === 'surface' ? 'bg-surface' : 'bg-white', className)}
    >
      <div className="container-x">{children}</div>
    </section>
  )
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  id: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'center' | 'left'
}) {
  return (
    <Reveal className={cx('mb-12 max-w-2xl md:mb-16', align === 'center' && 'mx-auto text-center')}>
      <p className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-teal-600" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={`${id}-title`} className="mt-4 text-h2 font-bold">
        {title}
      </h2>
      {description && <p className="mt-4 text-lead text-navy-600">{description}</p>}
    </Reveal>
  )
}

/** Small tag for content that still awaits confirmation. */
export function DraftTag({ label = 'To be confirmed' }: { label?: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-dashed border-amber-400/80 bg-amber-50 px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-amber-800">
      {label}
    </span>
  )
}
