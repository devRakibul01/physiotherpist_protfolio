/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL WEBSITE CONTENT LIVES IN THIS FILE.
 *
 *  Placeholder convention: any text wrapped in [square brackets] is a
 *  placeholder that still needs real, verified information.
 *   • With `site.showPlaceholders = false` (default) placeholders are HIDDEN,
 *     and sections with no real content are removed from the page and menu.
 *     Fill a placeholder with real data and it appears automatically.
 *   • Placeholders are NEVER written into SEO structured data (JSON-LD).
 *
 *  Replace each [placeholder] with confirmed details only.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { ImageData } from '../components/ui/ResponsiveImage'
import { site } from './site'

/* ───────────────────────────── helpers ───────────────────────────── */

export const isPlaceholder = (v?: string | null): boolean => !v || /^\[[\s\S]*\]$/.test(v.trim())
export const isFilled = (v?: string | null): v is string => !isPlaceholder(v)
/** True if the value should be rendered (real data, or placeholders are being previewed). */
export const show = (v?: string | null): v is string => isFilled(v) || (site.showPlaceholders && !!v)

/* ───────────────────────────── identity ───────────────────────────── */

export const person = {
  name: 'Md. Waheduzzaman Maruf',
  givenName: 'Waheduzzaman',
  familyName: 'Maruf',
  initials: 'WM',
  jobTitle: 'Senior Physiotherapist',
  brandLine: 'Physiotherapy & Rehabilitation',
  /** Practising since January 2010 */
  yearsOfExperience: '15+',
  headline: 'Helping You Move Better, Live Better, and Recover Stronger.',
  intro:
    'Dedicated to improving mobility, reducing pain, and enhancing quality of life through personalized physiotherapy and rehabilitation care.',

  /** Generated with `npm run images` from assets-src/md-waheduzzaman-maruf-physiotherapist.png */
  image: {
    src: '/images/md-waheduzzaman-maruf-physiotherapist-800.webp',
    width: 1200,
    height: 1184,
    alt: 'Md. Waheduzzaman Maruf, physiotherapist, at his consultation desk in Dhaka',
    srcSet:
      '/images/md-waheduzzaman-maruf-physiotherapist-480.webp 480w, /images/md-waheduzzaman-maruf-physiotherapist-800.webp 800w, /images/md-waheduzzaman-maruf-physiotherapist-1200.webp 1200w',
    sources: [
      {
        type: 'image/avif',
        srcSet:
          '/images/md-waheduzzaman-maruf-physiotherapist-480.avif 480w, /images/md-waheduzzaman-maruf-physiotherapist-800.avif 800w, /images/md-waheduzzaman-maruf-physiotherapist-1200.avif 1200w',
      },
    ],
  } satisfies ImageData,
}

/* ───────────────────────────── workplace & contact ───────────────────────────── */

export const workplace = {
  name: 'Amira Medical & Health Services Ltd.',
  position: 'Consultant – Physiotherapy',
  department: '[Department of Physiotherapy]',
  address: {
    street: '[Street address]',
    city: 'Dhaka',
    region: '[District / Division]',
    postalCode: '[Postal code]',
    country: 'Bangladesh',
  },
  /** Google Maps share link, e.g. https://maps.app.goo.gl/… */
  mapsUrl: '[Google Maps link]',
  /** Text used for the embedded map once the exact address is confirmed */
  mapQuery: '[Workplace name, full address]',
  hours: '[e.g. Saturday – Thursday, 9:00 AM – 5:00 PM]',
}

export const contact = {
  phone: '+880 1711-390848',
  /** Digits only with country code, e.g. 8801711390848 — add only if this number uses WhatsApp */
  whatsapp: '[8801XXXXXXXXX]',
  email: '[your.email@example.com]',
}

export const social = {
  facebook: 'https://www.facebook.com/waheduzzaman.maruf/',
  linkedin: '[https://www.linkedin.com/in/your-profile]',
  /** Only add if a verified Google Business Profile exists */
  googleBusiness: '[Google Business Profile link — only if verified]',
}

/* ───────────────────────────── hero stats ───────────────────────────── */

export const heroStats = [
  { value: person.yearsOfExperience, label: 'Years of clinical experience' },
  { value: '6', label: 'Healthcare organizations served' },
  { value: '1:1', label: 'Personalised treatment plans' },
]

/* ───────────────────────────── about ───────────────────────────── */

export const about = {
  lead: 'Physiotherapy is about more than treating pain — it is about helping people regain confidence in their bodies and return to the lives they want to live.',
  paragraphs: [
    'I am a physiotherapist based in Dhaka with more than fifteen years of professional experience in physiotherapy, rehabilitation and patient care. My work focuses on helping patients recover movement, manage pain and rebuild strength in a safe, structured and supportive way.',
    'I began my career in 2010 as a Clinical Physiotherapist at Rushmono Specialized Hospital, and have since worked with healthcare providers including AALOK Health Care Ltd., National Healthcare Network (BIRDEM) and Bela Rehabilitation Hospital. Since 2018 I have served as Consultant – Physiotherapy at Amira Medical & Health Services Ltd.',
  ],
  philosophy:
    'Every recovery is different. I believe effective physiotherapy begins with listening carefully, assessing thoroughly and explaining clearly — then building a plan around each person’s goals, lifestyle and pace, so patients understand their treatment and take an active part in it.',
  interests: ['[Professional interest]', '[Professional interest]', '[Professional interest]'],
}

/* ───────────────────────────── experience (latest first) ───────────────────────────── */

export type Experience = {
  organization: string
  designation: string
  department?: string
  location?: string
  start?: string
  end?: string
  current?: boolean
  responsibilities: string[]
  achievements: string[]
}

export const experience: Experience[] = [
  {
    organization: 'Amira Medical & Health Services Ltd.',
    designation: 'Consultant – Physiotherapy',
    start: '2018',
    end: 'Present',
    current: true,
    responsibilities: [],
    achievements: [],
  },
  {
    organization: 'Bela Rehabilitation Hospital',
    designation: 'Consultant in Physiotherapy',
    start: 'Jan 2016',
    end: 'Dec 2023',
    responsibilities: [],
    achievements: [],
  },
  {
    organization: 'National Healthcare Network, BIRDEM',
    designation: 'Physiotherapist',
    start: 'Jul 2015',
    end: 'Jan 2016',
    responsibilities: [],
    achievements: [],
  },
  {
    organization: 'AALOK Health Care Ltd.',
    designation: 'Consultant of Physiotherapy',
    location: 'Dhaka',
    start: 'Jun 2012',
    end: 'Feb 2018',
    responsibilities: [],
    achievements: [],
  },
  {
    organization: 'Rushmono Specialized Hospital',
    designation: 'Clinical Physiotherapist',
    start: 'Jan 2010',
    end: '2012',
    responsibilities: [],
    achievements: [],
  },
  {
    organization: 'Priyanka Group',
    designation: 'Physiotherapist',
    start: '[Year]',
    end: '[Year]',
    responsibilities: [],
    achievements: [],
  },
]

/* ───────────────────────────── education ───────────────────────────── */

export type Education = {
  degree: string
  institution: string
  subject: string
  year: string
  achievements: string[]
}

export const education: Education[] = [
  {
    degree: '[Postgraduate degree — if applicable]',
    institution: '[Institution name]',
    subject: '[Subject / Department]',
    year: '[Year]',
    achievements: [],
  },
  {
    degree: '[Bachelor’s degree in Physiotherapy]',
    institution: '[Institution name]',
    subject: '[Subject / Department]',
    year: '[Year]',
    achievements: [],
  },
]

/* ───────────────────────────── expertise ───────────────────────────── */

export type ExpertiseKey =
  | 'orthopedic' | 'sports' | 'neuro' | 'stroke' | 'spine' | 'postSurgical' | 'pediatric' | 'geriatric'

export type Expertise = {
  key: ExpertiseKey
  title: string
  description: string
  /** Set to true only once confirmed by Md. Waheduzzaman Maruf */
  confirmed: boolean
}

export const expertise: Expertise[] = [
  { key: 'orthopedic', confirmed: false, title: 'Orthopedic Physiotherapy', description: 'Assessment and treatment of joint, muscle and bone conditions to relieve pain and restore function.' },
  { key: 'sports', confirmed: false, title: 'Sports Injury Rehabilitation', description: 'Structured, progressive rehab to help active people recover safely and return to sport.' },
  { key: 'neuro', confirmed: false, title: 'Neurological Rehabilitation', description: 'Therapy to improve movement, balance and independence for people with neurological conditions.' },
  { key: 'stroke', confirmed: false, title: 'Stroke Rehabilitation', description: 'Goal-focused care to rebuild strength, coordination and confidence in daily activities after stroke.' },
  { key: 'spine', confirmed: false, title: 'Back & Neck Pain Management', description: 'Evidence-informed treatment and exercise to ease spinal pain and prevent recurrence.' },
  { key: 'postSurgical', confirmed: false, title: 'Post-Surgical Rehabilitation', description: 'Guided recovery after surgery to regain mobility, strength and function step by step.' },
  { key: 'pediatric', confirmed: false, title: 'Pediatric Physiotherapy', description: 'Gentle, playful therapy supporting children’s movement, development and participation.' },
  { key: 'geriatric', confirmed: false, title: 'Geriatric Rehabilitation', description: 'Care for older adults focused on mobility, balance, fall prevention and independence.' },
]

/* ───────────────────────────── certifications ───────────────────────────── */

export type Certificate = {
  name: string
  course: string
  issuer: string
  year: string
  image: ImageData
}

const certPlaceholder = (n: number): Certificate => ({
  name: '[Certificate name]',
  course: '[Training / Course name]',
  issuer: '[Issuing institution]',
  year: '[Year]',
  image: {
    src: '/images/certificate-placeholder.svg',
    width: 1200,
    height: 850,
    alt: `Placeholder for certificate ${n} — replace with the actual certificate image`,
  },
})

export const certificates: Certificate[] = [1, 2, 3].map(certPlaceholder)

/* ───────────────────────────── gallery ───────────────────────────── */

export type GalleryItem = {
  title: string
  category: 'Clinical Work' | 'Rehabilitation' | 'Training' | 'Workshop' | 'Conference' | 'Achievement'
  image: ImageData
}

const galleryPlaceholder = (title: string, category: GalleryItem['category'], variant: 1 | 2 | 3): GalleryItem => ({
  title,
  category,
  image: {
    src: `/images/gallery-placeholder-${variant}.svg`,
    width: 1200,
    height: 900,
    alt: `Placeholder — ${title.replace(/[[\]]/g, '')}`,
  },
})

/** Patient photos must only be published with the patient's written consent. */
export const gallery: GalleryItem[] = [
  galleryPlaceholder('[Professional working photograph]', 'Clinical Work', 1),
  galleryPlaceholder('[Patient rehabilitation session — with consent]', 'Rehabilitation', 2),
  galleryPlaceholder('[Training session]', 'Training', 3),
  galleryPlaceholder('[Medical workshop]', 'Workshop', 2),
  galleryPlaceholder('[Seminar or conference]', 'Conference', 1),
  galleryPlaceholder('[Professional achievement]', 'Achievement', 3),
]

/* ───────────────────────────── treatment approach ───────────────────────────── */

export const approach = [
  { title: 'Initial Patient Assessment', description: 'A detailed conversation and physical assessment to understand your condition, history, lifestyle and goals.' },
  { title: 'Personalized Treatment Planning', description: 'A clear plan built around your needs — explained in plain language, with realistic milestones.' },
  { title: 'Therapeutic Exercise', description: 'Targeted exercises to restore strength, flexibility and control, with guidance you can follow at home.' },
  { title: 'Rehabilitation Sessions', description: 'Hands-on therapy and supervised sessions that progress safely as your body responds.' },
  { title: 'Progress Evaluation', description: 'Regular reviews to measure improvement, adjust the plan and prepare you for lasting independence.' },
]

/* ───────────────────────────── testimonials ───────────────────────────── */

export type Testimonial = {
  /** Use the patient's name only with their permission; otherwise use initials or "Patient". */
  name: string
  review: string
  treatment?: string
  /** Include only if the patient genuinely provided a rating (1–5). */
  rating?: number
}

/**
 * Add only real testimonials, shared with the patient's permission.
 * While this list is empty the section shows a respectful notice instead.
 */
export const testimonials: Testimonial[] = []

/* ───────────────────────────── visible content ───────────────────────────── */

export const visible = {
  education: education.filter((e) => show(e.degree)),
  certificates: certificates.filter((c) => show(c.name)),
  gallery: gallery.filter((g) => show(g.title)),
  expertise: expertise.filter((e) => e.confirmed || site.showUnconfirmedContent),
  interests: about.interests.filter(show),
}

/* ───────────────────────────── navigation ───────────────────────────── */

const allNavLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

const sectionHasContent: Record<string, boolean> = {
  education: visible.education.length > 0,
  expertise: visible.expertise.length > 0,
  certifications: visible.certificates.length > 0,
  gallery: visible.gallery.length > 0,
}

/** Menu links for sections that actually have content. */
export const navLinks = allNavLinks.filter((l) => sectionHasContent[l.id] ?? true)
