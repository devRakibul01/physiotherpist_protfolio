import { BookOpen, GraduationCap, Medal } from 'lucide-react'
import { visible } from '../../data/profile'
import { Reveal, Section, SectionHeading, T } from '../ui/primitives'

export function Education() {
  if (!visible.education.length) return null
  return (
    <Section id="education" tone="surface">
      <SectionHeading
        id="education"
        eyebrow="Education"
        title="Academic qualifications"
        description="The formal training that underpins my clinical practice."
      />
      <ul className="grid gap-6 md:grid-cols-2">
        {visible.education.map((e, i) => (
          <Reveal as="li" key={i} delay={i * 80} className="card card-hover group relative overflow-hidden p-6 sm:p-8">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-600 to-brand-blue" />
            <div className="flex items-start justify-between gap-4">
              <span className="icon-tile h-14 w-14">
                <GraduationCap className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="rounded-full bg-navy-900 px-3 py-1 text-sm font-semibold text-white">
                <T className="!text-white">{e.year}</T>
              </span>
            </div>
            <h3 className="mt-6 text-h3 font-bold">
              <T>{e.degree}</T>
            </h3>
            <p className="mt-2 font-semibold text-teal-700">
              <T>{e.institution}</T>
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-navy-500">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <T>{e.subject}</T>
            </p>
            {e.achievements.length > 0 && (
              <ul className="mt-5 space-y-2 border-t border-navy-900/[0.06] pt-5">
                {e.achievements.map((a, k) => (
                  <li key={k} className="flex gap-2.5 text-[0.9375rem] text-navy-700">
                    <Medal className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                    <T>{a}</T>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
