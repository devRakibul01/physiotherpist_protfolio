import { Briefcase, Calendar, CircleCheck, MapPin, Trophy } from 'lucide-react'
import { experience, show } from '../../data/profile'
import { Reveal, Section, SectionHeading, T, cx } from '../ui/primitives'

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        id="experience"
        eyebrow="Professional Experience"
        title="15+ years of clinical practice"
        description="My professional journey in physiotherapy and rehabilitation — most recent role first."
      />

      <ol className="relative mx-auto max-w-3xl">
        {/* Timeline rail */}
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-[1.3125rem] top-4 w-px bg-gradient-to-b from-teal-600 via-teal-300 to-transparent"
        />
        {experience.map((job, i) => {
          return (
            <Reveal as="li" key={i} delay={i * 60} className="relative pb-5 pl-14 last:pb-0 sm:pb-6 sm:pl-16">
              {/* Node */}
              <span
                aria-hidden="true"
                className={cx(
                  'absolute left-0 top-5 grid h-11 w-11 place-items-center rounded-full border-4 border-white shadow-soft',
                  job.current ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-700 ring-1 ring-teal-600/20',
                )}
              >
                <Briefcase className="h-4 w-4" />
              </span>

              <article className="card card-hover p-6 sm:p-7">
                {(show(job.start) || job.current) && (
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    {show(job.start) && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-navy-700 ring-1 ring-navy-900/5">
                        <Calendar className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" />
                        <T>{job.start}</T>
                        {show(job.end) && (
                          <>
                            {' – '}
                            <T>{job.end}</T>
                          </>
                        )}
                      </span>
                    )}
                    {job.current && (
                      <span className="rounded-full bg-teal-600 px-2.5 py-1 text-xs font-semibold text-white">Current</span>
                    )}
                  </div>
                )}
                <h3 className="text-h3 font-bold">
                  <T>{job.designation}</T>
                </h3>
                <p className="mt-1 font-semibold text-teal-700">
                  <T>{job.organization}</T>
                </p>
                {(show(job.department) || show(job.location)) && (
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-navy-500">
                    {show(job.department) && <T>{job.department}</T>}
                    {show(job.location) && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        <T>{job.location}</T>
                      </span>
                    )}
                  </p>
                )}

                {job.responsibilities.filter(show).length > 0 && (
                  <>
                    <h4 className="mt-5 text-sm font-semibold uppercase tracking-wider text-navy-500">Responsibilities</h4>
                    <ul className="mt-2.5 space-y-2">
                      {job.responsibilities.filter(show).map((r, k) => (
                        <li key={k} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-navy-700">
                          <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                          <T>{r}</T>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {job.achievements.filter(show).length > 0 && (
                  <>
                    <h4 className="mt-5 text-sm font-semibold uppercase tracking-wider text-navy-500">Key achievements</h4>
                    <ul className="mt-2.5 space-y-2">
                      {job.achievements.filter(show).map((a, k) => (
                        <li key={k} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-navy-700">
                          <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                          <T>{a}</T>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </article>
            </Reveal>
          )
        })}
      </ol>
    </Section>
  )
}
