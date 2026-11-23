import { Activity, ClipboardList, HeartHandshake, Target, TrendingUp } from 'lucide-react'
import { approach } from '../../data/profile'
import { Reveal, Section, SectionHeading } from '../ui/primitives'

const icons = [ClipboardList, Target, Activity, HeartHandshake, TrendingUp]

export function Approach() {
  return (
    <Section id="approach" tone="surface" className="overflow-hidden">
      <SectionHeading
        id="approach"
        eyebrow="Treatment Approach"
        title="A clear path to recovery"
        description="A structured, transparent process so you always know where you are and what comes next."
      />
      <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
        <span
          aria-hidden="true"
          className="absolute left-[10%] right-[10%] top-[2.75rem] hidden h-px bg-gradient-to-r from-teal-200 via-teal-500 to-blue-300 lg:block"
        />
        {approach.map((s, i) => {
          const Icon = icons[i % icons.length]
          return (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 90}
              className="card card-hover relative flex flex-col p-6 text-left lg:items-center lg:bg-transparent lg:p-4 lg:text-center lg:shadow-none lg:ring-0 lg:hover:translate-y-0 lg:hover:shadow-none lg:border-transparent lg:hover:border-transparent"
            >
              <span className="relative grid h-[5.5rem] w-[5.5rem] place-items-center rounded-3xl bg-white shadow-soft ring-1 ring-navy-900/5 max-lg:h-14 max-lg:w-14 max-lg:rounded-2xl max-lg:bg-teal-50 max-lg:shadow-none">
                <Icon className="h-7 w-7 text-teal-600 max-lg:h-6 max-lg:w-6" aria-hidden="true" />
                <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-teal-600 to-brand-blue text-xs font-bold text-white ring-4 ring-surface max-lg:ring-white">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-5 text-h3 font-bold">{s.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-navy-600">{s.description}</p>
            </Reveal>
          )
        })}
      </ol>
    </Section>
  )
}
