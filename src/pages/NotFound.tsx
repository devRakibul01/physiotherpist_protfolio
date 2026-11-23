import { ArrowLeft, ChevronRight, Home } from 'lucide-react'
import { person } from '../data/profile'

/** Static 404 page (prerendered to /404.html, no JavaScript required). */
export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-[100svh] flex-col bg-gradient-to-b from-teal-50/70 to-white">
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <header className="container-x flex h-[var(--header-h)] items-center pt-[var(--safe-top)]">
        <a href="/" className="flex items-center gap-3 rounded-xl">
          <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-teal-600 to-brand-blue text-sm font-bold text-white">
            {person.initials}
          </span>
          <span className="text-[0.9375rem] font-bold text-navy-900">{person.name}</span>
        </a>
      </header>
      <main className="container-x flex flex-1 flex-col items-center justify-center py-16 text-center">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-1.5 text-sm text-navy-500">
            <li>
              <a href="/" className="inline-flex items-center gap-1 hover:text-teal-700">
                <Home className="h-4 w-4" aria-hidden="true" /> Home
              </a>
            </li>
            <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
            <li aria-current="page" className="font-medium text-navy-900">Page not found</li>
          </ol>
        </nav>
        <p className="text-gradient text-[clamp(5rem,4rem+8vw,9rem)] font-extrabold leading-none tracking-tighter">404</p>
        <h1 className="mt-4 text-h2 font-bold">This page couldn’t be found</h1>
        <p className="mt-4 max-w-md text-lead text-navy-600">
          The page you’re looking for may have moved or no longer exists. Let’s get you back on track.
        </p>
        <div className="mt-8 flex flex-col gap-3 xs:flex-row">
          <a href="/" className="btn-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to homepage
          </a>
          <a href="/#contact" className="btn-secondary">Book an appointment</a>
        </div>
      </main>
    </div>
  )
}
