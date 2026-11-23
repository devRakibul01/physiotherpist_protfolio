/**
 * SEO helpers used at build time (prerender) to generate head tags,
 * JSON-LD structured data, robots.txt and sitemap.xml from the content data.
 * Placeholder values are automatically excluded.
 */
import { site } from '../data/site'
import { contact, isFilled, person, social, workplace } from '../data/profile'

export const seo = {
  title: 'Md. Waheduzzaman Maruf | Senior Physiotherapist in Dhaka, Bangladesh',
  description:
    'Explore the professional portfolio of Md. Waheduzzaman Maruf, a Dhaka-based physiotherapist with 15+ years of experience in physiotherapy, rehabilitation, and patient care.',
  ogImage: '/og-image.jpg',
  ogImageAlt: 'Md. Waheduzzaman Maruf — Senior Physiotherapist & Rehabilitation Specialist',
}

const abs = (path: string) => (path.startsWith('http') ? path : `${site.url}${path}`)
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function compact<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === '') continue
    if (Array.isArray(v) && v.length === 0) continue
    if (typeof v === 'object' && !Array.isArray(v) && Object.keys(v as object).length === 0) continue
    out[k] = v
  }
  return out as Partial<T>
}

export function buildJsonLd() {
  const url = `${site.url}/`
  const sameAs = [social.facebook, social.linkedin, social.googleBusiness].filter(isFilled)

  const a = workplace.address
  const address = compact({
    '@type': 'PostalAddress',
    streetAddress: isFilled(a.street) ? a.street : undefined,
    addressLocality: isFilled(a.city) ? a.city : undefined,
    addressRegion: isFilled(a.region) ? a.region : undefined,
    postalCode: isFilled(a.postalCode) ? a.postalCode : undefined,
    addressCountry: isFilled(a.country) ? a.country : undefined,
  })

  const worksFor = isFilled(workplace.name)
    ? compact({ '@type': 'Organization', name: workplace.name, address: Object.keys(address).length > 2 ? address : undefined })
    : undefined

  const personNode = compact({
    '@type': 'Person',
    '@id': `${url}#person`,
    name: person.name,
    jobTitle: person.jobTitle,
    description: seo.description,
    url,
    image: abs(person.image.src),
    telephone: isFilled(contact.phone) ? contact.phone : undefined,
    email: isFilled(contact.email) ? `mailto:${contact.email}` : undefined,
    address: Object.keys(address).length > 1 ? address : undefined,
    worksFor,
    knowsAbout: ['Physiotherapy', 'Rehabilitation', 'Patient care'],
    sameAs,
  })

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        url,
        name: `${person.name} — ${person.jobTitle}`,
        inLanguage: site.lang,
        publisher: { '@id': `${url}#person` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${url}#profilepage`,
        url,
        name: seo.title,
        description: seo.description,
        inLanguage: site.lang,
        isPartOf: { '@id': `${url}#website` },
        mainEntity: { '@id': `${url}#person` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        dateModified: site.lastModified,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: url }],
      },
      personNode,
    ],
  }
}

/** Head tags injected into index.html at build time. */
export function buildHead(): string {
  const url = `${site.url}/`
  const img = abs(seo.ogImage)
  const tags = [
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta name="author" content="${esc(person.name)}" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:site_name" content="${esc(person.name)}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(seo.ogImageAlt)}" />`,
    `<meta property="profile:first_name" content="${esc(person.givenName)}" />`,
    `<meta property="profile:last_name" content="${esc(person.familyName)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    `<meta name="twitter:image:alt" content="${esc(seo.ogImageAlt)}" />`,
  ]
  if (site.verification.google) tags.push(`<meta name="google-site-verification" content="${esc(site.verification.google)}" />`)
  if (site.verification.bing) tags.push(`<meta name="msvalidate.01" content="${esc(site.verification.bing)}" />`)
  tags.push(`<script type="application/ld+json">${JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c')}</script>`)
  return tags.join('\n    ')
}

export function buildRobots(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`
}

export function buildSitemap(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${site.url}/</loc>
    <lastmod>${site.lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${abs(person.image.src)}</image:loc>
    </image:image>
  </url>
</urlset>
`
}
