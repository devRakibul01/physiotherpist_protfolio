import { Baby, Bandage, Bone, Brain, Dumbbell, HandHeart, HeartPulse, PersonStanding, type LucideIcon } from 'lucide-react'
import { visible, type ExpertiseKey } from '../../data/profile'
import { DraftTag, Reveal, Section, SectionHeading } from '../ui/primitives'

const icons: Record<ExpertiseKey, LucideIcon> = {
  orthopedic: Bone,
  sports: Dumbbell,
  neuro: Brain,
  stroke: HeartPulse,
  spine: PersonStanding,
  postSurgical: Bandage,
  pediatric: Baby,
  geriatric: HandHeart,
}

export function Expertise() {
  const items = visible.expertise
  if (!items.length) return null

  return (
    <Section id="expertise">
      <SectionHeading
        id="expertise"
        eyebrow="Areas of Expertise"
        title={
          <>
            Specialised care for <span className="text-gradient">every stage</span> of recovery
          </>
        }
        description="Focused physiotherapy and rehabilitation services, tailored to each patient’s condition and goals."
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((e, i) => {
          const Icon = icons[e.key]
          return (
            <Reveal as="li" key={e.key} delay={(i % 4) * 70} className="card card-hover group relative flex flex-col p-6 sm:p-7">
              <span className="icon-tile transition-colors duration-300 group-hover:from-teal-600 group-hover:to-teal-700 group-hover:text-white">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-h3 font-bold">{e.title}</h3>
              <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-navy-600">{e.description}</p>
              {!e.confirmed && (
                <div className="mt-4">
                  <DraftTag />
                </div>
              )}
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
