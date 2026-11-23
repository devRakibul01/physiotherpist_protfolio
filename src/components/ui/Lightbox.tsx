import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { ImageData } from './ResponsiveImage'

export type LightboxItem = { image: ImageData; title: string; caption?: string }

type Props = {
  items: LightboxItem[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
  label: string
}

/**
 * Accessible lightbox built on the native <dialog> element:
 * focus trapping, Esc to close, arrow-key and swipe navigation.
 */
export default function Lightbox({ items, index, onClose, onNavigate, label }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const touchX = useRef<number | null>(null)
  const item = items[index]
  const count = items.length
  const go = (d: number) => onNavigate((index + d + count) % count)

  useEffect(() => {
    const dlg = ref.current
    if (!dlg) return
    if (!dlg.open) dlg.showModal()
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prevOverflow
      if (dlg.open) dlg.close()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!item) return null

  return (
    <dialog
      ref={ref}
      className="lightbox m-0 h-[100dvh] w-screen bg-transparent p-0 text-white"
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-4 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(4.5rem,calc(env(safe-area-inset-top)+3.5rem))] sm:px-20"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20"
          aria-label="Close image preview"
          autoFocus
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>

        <figure className="flex max-h-full w-full max-w-5xl flex-col items-center">
          <img
            src={item.image.src}
            srcSet={item.image.srcSet}
            sizes="(min-width: 1024px) 1024px, 100vw"
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            className="max-h-[calc(100dvh-11rem)] w-auto rounded-2xl bg-white object-contain shadow-2xl"
          />
          <figcaption className="mt-4 max-w-2xl text-center" aria-live="polite">
            <p className="text-base font-semibold">{item.title}</p>
            {item.caption && <p className="mt-1 text-sm text-white/75">{item.caption}</p>}
            <p className="mt-1 text-xs text-white/60">
              {index + 1} / {count}
            </p>
          </figcaption>
        </figure>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-[max(0.5rem,env(safe-area-inset-left))] top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/30 ring-1 ring-white/20 transition hover:bg-white/20 sm:h-12 sm:w-12 sm:bg-white/10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-[max(0.5rem,env(safe-area-inset-right))] top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/30 ring-1 ring-white/20 transition hover:bg-white/20 sm:h-12 sm:w-12 sm:bg-white/10"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </dialog>
  )
}
