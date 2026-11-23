import { ArrowRight, Award, CalendarCheck, ShieldCheck, Sparkles } from 'lucide-react'
import { heroStats, person } from '../../data/profile'
import { ResponsiveImage } from '../ui/ResponsiveImage'

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-white pt-[calc(var(--header-h)+var(--safe-top))]"
    >
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div className="absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-teal-200/40 blur-3xl" />
        <div className="absolute -left-40 top-1/3 h-[26rem] w-[26rem] rounded-full bg-blue-200/30 blur-3xl" />
      </div>

      <div className="container-x grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:min-h-[min(54rem,calc(100svh-var(--header-h)))] lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-24 xl:gap-16">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <p className="eyebrow">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {person.yearsOfExperience} Years of Professional Experience
          </p>

          <h1 id="home-title" className="mt-6 text-display font-extrabold">
            <span className="block">{person.name}</span>
            <span className="text-gradient mt-2 block text-[0.52em] font-bold leading-tight tracking-[-0.02em]">
              {person.jobTitle} &amp; Rehabilitation Specialist
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] font-semibold leading-snug text-navy-800 lg:mx-0">
            {person.headline}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-lead text-navy-600 lg:mx-0">{person.intro}</p>

          <div className="mt-8 flex flex-col justify-center gap-3 xs:flex-row lg:justify-start">
            <a href="#contact" className="btn-primary">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Book an Appointment
            </a>
            <a href="#about" className="btn-secondary group">
              Explore My Profile
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>

          <dl className="mx-auto mt-12 grid max-w-xl grid-cols-3 gap-2 rounded-3xl border border-navy-900/[0.06] bg-white/70 p-2 shadow-soft backdrop-blur sm:gap-3 lg:mx-0">
            {heroStats.map((s) => (
              <div key={s.label} className="rounded-2xl px-2 py-4 text-center sm:px-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-[clamp(1.375rem,1.1rem+1.2vw,2rem)] font-extrabold tracking-tight text-teal-700">{s.value}</dd>
                <dd className="mt-1 text-[0.75rem] font-medium leading-snug text-navy-600 sm:text-[0.8125rem]" aria-hidden="true">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Portrait */}
        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-[30rem] lg:justify-self-end">
          <div aria-hidden="true" className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-teal-600/20 via-transparent to-brand-blue/20 blur-2xl" />
          <div aria-hidden="true" className="absolute -right-3 -top-3 h-full w-full rounded-[2rem] border-2 border-teal-600/15 sm:-right-5 sm:-top-5" />
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-teal-100 to-teal-50 shadow-lift ring-1 ring-navy-900/5">
            <ResponsiveImage
              image={person.image}
              priority
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 416px, 352px"
              imgClassName="aspect-[4/5] h-auto w-full object-cover object-[62%_30%]"
            />
          </div>

          {/* Floating badges */}
          <div className="absolute -left-3 bottom-8 flex items-center gap-3 rounded-2xl border border-navy-900/5 bg-white/95 p-3 pr-4 shadow-lift backdrop-blur sm:-left-10">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-600 text-white">
              <Award className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-left leading-tight">
              <span className="block text-lg font-extrabold text-navy-900">{person.yearsOfExperience} Years</span>
              <span className="block text-xs font-medium text-navy-600">Clinical experience</span>
            </span>
          </div>
          <div className="absolute -right-2 top-8 hidden items-center gap-2 rounded-2xl border border-navy-900/5 bg-white/95 px-3.5 py-2.5 shadow-lift backdrop-blur xs:flex sm:-right-8">
            <ShieldCheck className="h-5 w-5 text-brand-blue" aria-hidden="true" />
            <span className="text-sm font-semibold text-navy-900">Patient-centred care</span>
          </div>
        </div>
      </div>
    </section>
  )
}
