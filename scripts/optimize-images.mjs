/**
 * Image pipeline (run with `npm run images`):
 *
 *  1. Put original photos (JPG/PNG/WebP) in /assets-src, named descriptively, e.g.
 *       assets-src/md-maruf-hossain-senior-physiotherapist.jpg
 *       assets-src/certificate-manual-therapy-2019.jpg
 *  2. Run `npm run images`.
 *  3. Responsive AVIF + WebP files are written to /public/images and a ready-to-paste
 *     `ImageData` snippet is printed for each image — paste it into src/data/profile.ts.
 *
 * Also (re)generates the social share image (public/og-image.jpg) and app icons.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const srcDir = path.join(root, 'assets-src')
const outDir = path.join(root, 'public', 'images')
const WIDTHS = [480, 800, 1200, 1600]

await fs.mkdir(outDir, { recursive: true })

/* ── Responsive photos ── */
const files = (await fs.readdir(srcDir).catch(() => [])).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
for (const file of files) {
  const name = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const input = sharp(path.join(srcDir, file)).rotate()
  const meta = await input.metadata()
  const widths = WIDTHS.filter((w) => w <= (meta.width ?? 0))
  if (!widths.length) widths.push(meta.width ?? 800)
  const avif = []
  const webp = []
  for (const w of widths) {
    const base = `${name}-${w}`
    await input.clone().resize({ width: w }).avif({ quality: 55 }).toFile(path.join(outDir, `${base}.avif`))
    await input.clone().resize({ width: w }).webp({ quality: 78 }).toFile(path.join(outDir, `${base}.webp`))
    avif.push(`/images/${base}.avif ${w}w`)
    webp.push(`/images/${base}.webp ${w}w`)
  }
  const largest = widths[widths.length - 1]
  const h = Math.round(((meta.height ?? 1) / (meta.width ?? 1)) * largest)
  console.log(`\n${file} →`)
  console.log(
    JSON.stringify(
      {
        src: `/images/${name}-${widths[Math.min(1, widths.length - 1)]}.webp`,
        width: largest,
        height: h,
        alt: 'DESCRIBE THE IMAGE HERE',
        srcSet: webp.join(', '),
        sources: [{ type: 'image/avif', srcSet: avif.join(', ') }],
      },
      null,
      2,
    ),
  )
}
if (!files.length) console.log('No photos found in /assets-src — skipping photo optimisation.')

/* ── Social share image (1200×630) ── */
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#087E83"/><stop offset="1" stop-color="#172554"/></linearGradient>
    <pattern id="d" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.6" fill="#fff" opacity=".10"/></pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/><rect width="1200" height="630" fill="url(#d)"/>
  <circle cx="1060" cy="90" r="280" fill="#2563EB" opacity=".25"/>
  <rect x="80" y="96" width="88" height="88" rx="22" fill="#fff" opacity=".14"/>
  <text x="124" y="153" font-family="Segoe UI,Arial,sans-serif" font-size="34" font-weight="700" fill="#fff" text-anchor="middle">WM</text>
  <text x="80" y="300" font-family="Segoe UI,Arial,sans-serif" font-size="64" font-weight="800" fill="#fff" letter-spacing="-2">Md. Waheduzzaman Maruf</text>
  <text x="80" y="366" font-family="Segoe UI,Arial,sans-serif" font-size="36" font-weight="600" fill="#A7E4E5">Senior Physiotherapist &amp; Rehabilitation Specialist</text>
  <text x="80" y="470" font-family="Segoe UI,Arial,sans-serif" font-size="28" fill="#fff" opacity=".85">Helping you move better, live better, and recover stronger.</text>
  <rect x="80" y="520" width="300" height="52" rx="26" fill="#fff" opacity=".14"/>
  <text x="230" y="554" font-family="Segoe UI,Arial,sans-serif" font-size="22" font-weight="600" fill="#fff" text-anchor="middle">15+ Years Experience</text>
</svg>`
await sharp(Buffer.from(og)).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(root, 'public', 'og-image.jpg'))

/* ── App icons ── */
const favicon = await fs.readFile(path.join(root, 'public', 'favicon.svg'))
await sharp(favicon, { density: 600 }).resize(180, 180).png().toFile(path.join(root, 'public', 'apple-touch-icon.png'))
await sharp(favicon, { density: 600 }).resize(512, 512).png().toFile(path.join(root, 'public', 'icon-512.png'))

console.log('\n✓ Generated og-image.jpg, apple-touch-icon.png, icon-512.png')
