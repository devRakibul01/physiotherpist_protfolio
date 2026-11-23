import { Briefcase, Building2, Clock, HeartHandshake, MapPin, Quote } from 'lucide-react'
import { about, experience, person, show, visible, workplace } from '../../data/profile'
import { Reveal, Section, SectionHeading, T } from '../ui/primitives'

export function About() {
  const facts = [
    { Icon: Clock, label: 'Experience', value: `${person.yearsOfExperience} Years` },
    { Icon: Briefcase, label: 'Current position', value: workplace.position },
    { Icon: Building2, label: 'Workplace', value: workplace.name },
    { Icon: MapPin, label: 'Location', value: [workplace.address.city, workplace.address.country].filter(show).join(', ') },
  ].filter((f) => show(f.value))

  // Show professional interests once added; until then, list the organizations served.
  const chips = visible.interests.length
    ? { title: 'Professional interests', items: visible.interests }
    : { title: 'Organizations served', items: experience.map((e) => e.organization).filter(show) }

  return (
    <Section id="about" tone="surface">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading
            id="about"
            align="left"
            eyebrow="About Me"
            title={
              <>
                Care that puts <span className="text-gradient">people first</span>
              </>
            }
          />
          <Reveal>
            <p className="-mt-6 text-lead font-medium text-navy-800 md:-mt-10">{about.lead}</p>
            <div className="mt-6 space-y-5 text-[1.0625rem] leading-relaxed text-navy-600">
              {about.paragraphs.filter(show).map((p, i) => (
                <p key={i}>
                  <T>{p}</T>
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <figure className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-teal-800 p-7 text-white shadow-glow sm:p-9">
              <Quote aria-hidden="true" className="absolute -right-2 -top-2 h-28 w-28 text-white/10" />
              <figcaption className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-teal-100">
                <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                Clinical philosophy
              </figcaption>
              <blockquote className="relative mt-4 text-[1.0625rem] leading-relaxed text-white/95 sm:text-lg">
                {about.philosophy}
              </blockquote>
            </figure>
          </Reveal>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-5 lg:pt-6">
          {facts.map(({ Icon, label, value }, i) => (
            <Reveal key={label} delay={i * 80} className="card card-hover flex items-center gap-5 p-5 sm:p-6">
              <span className="icon-tile">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-navy-500">{label}</span>
                <span className="mt-0.5 block text-lg font-bold text-navy-900">
                  <T>{value}</T>
                </span>
              </span>
            </Reveal>
          ))}

          <Reveal delay={260} className="card p-6">
            <h3 className="text-h3 font-bold">{chips.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {chips.items.map((x, i) => (
                <li key={i} className="rounded-full border border-teal-600/15 bg-teal-50 px-3.5 py-1.5 text-sm font-medium text-teal-800">
                  <T>{x}</T>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
