import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { FloatingContact } from './components/layout/FloatingContact'
import { ConsentBanner } from './components/layout/ConsentBanner'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Experience } from './components/sections/Experience'
import { Education } from './components/sections/Education'
import { Expertise } from './components/sections/Expertise'
import { Certifications } from './components/sections/Certifications'
import { Gallery } from './components/sections/Gallery'
import { Approach } from './components/sections/Approach'
import { Testimonials } from './components/sections/Testimonials'
import { Contact } from './components/sections/Contact'
import { useRevealOnScroll } from './hooks/useSiteEffects'

export default function App() {
  useRevealOnScroll()
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-xl bg-navy-900 px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Expertise />
        <Approach />
        <Certifications />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
      <ConsentBanner />
    </>
  )
}
