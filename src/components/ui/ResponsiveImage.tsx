export type ImageData = {
  src: string
  width: number
  height: number
  alt: string
  /** Optional srcset for the fallback <img>, e.g. "photo-480.webp 480w, photo-800.webp 800w" */
  srcSet?: string
  /** Optional modern-format sources, e.g. [{ type: 'image/avif', srcSet: '…' }] */
  sources?: { type: string; srcSet: string }[]
}

type Props = {
  image: ImageData
  sizes?: string
  /** Use for the LCP image (hero): eager + high fetch priority */
  priority?: boolean
  className?: string
  imgClassName?: string
}

export function ResponsiveImage({ image, sizes, priority = false, className, imgClassName }: Props) {
  // React 18 doesn't know `fetchPriority`; pass the lowercase attribute directly.
  const priorityAttr = priority ? ({ fetchpriority: 'high' } as Record<string, string>) : {}
  return (
    <picture className={className}>
      {image.sources?.map((s) => <source key={s.type} type={s.type} srcSet={s.srcSet} sizes={sizes} />)}
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={image.srcSet ? sizes : undefined}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={imgClassName}
        {...priorityAttr}
      />
    </picture>
  )
}
