import { Suspense, lazy, useMemo, useState } from 'react'
import { Expand } from 'lucide-react'
import { visible } from '../../data/profile'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { Section, SectionHeading, cx } from '../ui/primitives'

const Lightbox = lazy(() => import('../ui/Lightbox'))

const gallery = visible.gallery

export function Gallery() {
  const categories = useMemo(() => ['All', ...Array.from(new Set(gallery.map((g) => g.category)))], [])
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState<number | null>(null)
  const items = gallery.filter((g) => filter === 'All' || g.category === filter)
  const lbItems = items.map((g) => ({ image: g.image, title: g.title.replace(/[[\]]/g, ''), caption: g.category }))

  if (!gallery.length) return null
  return (
    <Section id="gallery">
      <SectionHeading
        id="gallery"
        eyebrow="Professional Activities"
        title="Moments from practice"
        description="Clinical work, training sessions, workshops and conferences. Patient photographs are shared only with consent."
      />

      <div role="group" aria-label="Filter gallery by category" className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={cx(
              'min-h-[44px] shrink-0 rounded-full px-5 text-sm font-semibold transition-colors',
              filter === c ? 'bg-teal-600 text-white shadow-glow' : 'bg-surface text-navy-700 ring-1 ring-navy-900/[0.06] hover:bg-teal-50 hover:text-teal-700',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {items.map((g, i) => (
          <li key={`${filter}-${i}`}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block h-full w-full overflow-hidden rounded-3xl bg-teal-50 shadow-soft"
              aria-label={`Open image: ${g.title.replace(/[[\]]/g, '')}`}
            >
              <ResponsiveImage
                image={g.image}
                sizes="(min-width: 1024px) 400px, (min-width: 400px) 48vw, 92vw"
                className="block h-full"
                imgClassName={cx(
                  'h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105',
                  'aspect-[4/3]',
                )}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/10 to-transparent" aria-hidden="true" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-left sm:p-5">
                <span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-200">{g.category}</span>
                  <span className="mt-1 block text-[0.9375rem] font-semibold leading-snug text-white">{g.title}</span>
                </span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur transition group-hover:bg-white group-hover:text-navy-900">
                  <Expand className="h-4 w-4" aria-hidden="true" />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <Suspense fallback={null}>
          <Lightbox items={lbItems} index={open} onNavigate={setOpen} onClose={() => setOpen(null)} label="Gallery image preview" />
        </Suspense>
      )}
    </Section>
  )
}
