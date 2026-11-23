import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, MessageSquareHeart, Quote, Star } from 'lucide-react'
import { testimonials } from '../../data/profile'
import { Reveal, Section, SectionHeading, cx } from '../ui/primitives'

function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <p className="flex gap-0.5" aria-label={`Rated ${r} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden="true" className={cx('h-4 w-4', i < r ? 'fill-amber-400 text-amber-400' : 'text-navy-900/15')} />
      ))}
    </p>
  )
}

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const touchX = useRef<number | null>(null)
  const count = testimonials.length
  const go = (i: number) => setIndex((i + count) % count)

  return (
    <Section id="testimonials">
      <SectionHeading
        id="testimonials"
        eyebrow="Patient Experiences"
        title="Words from patients"
        description="Genuine feedback, shared with each patient’s permission."
      />

      {count === 0 ? (
        <Reveal className="card mx-auto flex max-w-2xl flex-col items-center p-8 text-center sm:p-12">
          <span className="icon-tile h-14 w-14">
            <MessageSquareHeart className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="mt-5 text-lg font-semibold text-navy-900">Patient stories will be shared here soon.</p>
          <p className="mt-2 max-w-md text-navy-600">
            To respect patient privacy, testimonials are published only with written consent. No reviews or ratings on this site are
            generated or edited.
          </p>
        </Reveal>
      ) : (
        <Reveal>
          <div
            className="relative mx-auto max-w-3xl"
            role="region"
            aria-roledescription="carousel"
            aria-label="Patient testimonials"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return
              const dx = e.changedTouches[0].clientX - touchX.current
              if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1))
              touchX.current = null
            }}
          >
            <div className="overflow-hidden rounded-3xl">
              <ul className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
                {testimonials.map((t, i) => (
                  <li
                    key={i}
                    className="w-full shrink-0 px-1"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${count}`}
                    aria-hidden={i !== index}
                    {...(i !== index ? { inert: '' } : {})}
                  >
                    <figure className="card relative p-7 sm:p-10">
                      <Quote aria-hidden="true" className="absolute right-6 top-6 h-12 w-12 text-teal-600/10" />
                      {typeof t.rating === 'number' && <Stars rating={t.rating} />}
                      <blockquote className="mt-4 text-lg leading-relaxed text-navy-800 sm:text-xl">“{t.review}”</blockquote>
                      <figcaption className="mt-6 flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-teal-600 to-brand-blue text-sm font-bold text-white" aria-hidden="true">
                          {t.name.trim().charAt(0).toUpperCase()}
                        </span>
                        <span>
                          <span className="block font-semibold text-navy-900">{t.name}</span>
                          {t.treatment && <span className="block text-sm text-navy-500">{t.treatment}</span>}
                        </span>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>

            {count > 1 && (
              <div className="mt-6 flex items-center justify-center gap-4">
                <button type="button" onClick={() => go(index - 1)} className="btn-secondary h-12 w-12 min-h-0 p-0" aria-label="Previous testimonial">
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <div className="flex gap-1">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Show testimonial ${i + 1}`}
                      aria-current={i === index ? 'true' : undefined}
                      className="grid h-11 w-6 place-items-center"
                    >
                      <span className={cx('block h-2 rounded-full transition-all', i === index ? 'w-6 bg-teal-600' : 'w-2 bg-navy-900/20')} />
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => go(index + 1)} className="btn-secondary h-12 w-12 min-h-0 p-0" aria-label="Next testimonial">
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </Reveal>
      )}
    </Section>
  )
}
