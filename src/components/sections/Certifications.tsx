import { Suspense, lazy, useState } from 'react'
import { Award, Building, Calendar, ZoomIn } from 'lucide-react'
import { visible } from '../../data/profile'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { Reveal, Section, SectionHeading, T } from '../ui/primitives'

const Lightbox = lazy(() => import('../ui/Lightbox'))

export function Certifications() {
  const [open, setOpen] = useState<number | null>(null)
  const certificates = visible.certificates
  const items = certificates.map((c) => ({
    image: c.image,
    title: c.name,
    caption: `${c.course} · ${c.issuer} · ${c.year}`,
  }))

  if (!certificates.length) return null
  return (
    <Section id="certifications" tone="surface">
      <SectionHeading
        id="certifications"
        eyebrow="Certifications & Training"
        title="Continuous professional development"
        description="Certificates and specialised training courses. Select any certificate to view it in full."
      />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c, i) => (
          <Reveal as="li" key={i} delay={(i % 3) * 70} className="card card-hover group overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="relative block w-full overflow-hidden rounded-t-3xl bg-white p-3 focus-visible:outline-offset-[-3px]"
              aria-label={`View certificate: ${c.name.replace(/[[\]]/g, '')}`}
            >
              <ResponsiveImage
                image={c.image}
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
                imgClassName="aspect-[4/3] h-auto w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-3 grid place-items-center rounded-2xl bg-navy-900/0 transition-colors duration-300 group-hover:bg-navy-900/35">
                <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy-900 opacity-0 shadow-lift transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <ZoomIn className="h-4 w-4" aria-hidden="true" />
                  View certificate
                </span>
              </span>
            </button>
            <div className="p-6 pt-3">
              <h3 className="flex gap-2.5 text-h3 font-bold">
                <Award className="mt-1 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
                <T>{c.name}</T>
              </h3>
              <p className="mt-2 text-[0.9375rem] text-navy-700">
                <T>{c.course}</T>
              </p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-navy-500">
                <span className="inline-flex items-center gap-1.5">
                  <Building className="h-4 w-4" aria-hidden="true" />
                  <T>{c.issuer}</T>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <T>{c.year}</T>
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>

      {open !== null && (
        <Suspense fallback={null}>
          <Lightbox items={items} index={open} onNavigate={setOpen} onClose={() => setOpen(null)} label="Certificate preview" />
        </Suspense>
      )}
    </Section>
  )
}
