import { useEffect, useState } from 'react'
import { site } from '../../data/site'

const KEY = 'analytics-consent'

function loadGA(id: string) {
  if (window.gtag) return
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', id, { anonymize_ip: true })
}

/** Consent-aware Google Analytics 4. Renders nothing unless VITE_GA4_ID is configured. */
export function ConsentBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!site.ga4Id) return
    let stored: string | null = null
    try {
      stored = localStorage.getItem(KEY)
    } catch {
      /* storage unavailable */
    }
    if (stored === 'granted') loadGA(site.ga4Id)
    else if (stored !== 'denied') setShow(true)
  }, [])

  if (!site.ga4Id || !show) return null

  const decide = (v: 'granted' | 'denied') => {
    try {
      localStorage.setItem(KEY, v)
    } catch {
      /* ignore */
    }
    if (v === 'granted') loadGA(site.ga4Id)
    setShow(false)
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-[max(1rem,var(--safe-bottom))]"
    >
      <div className="card mx-auto flex max-w-3xl flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <p className="text-sm text-navy-700">
          This site uses optional analytics cookies to understand visits and improve the experience. No medical information is collected.
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" className="btn-secondary min-h-[44px] px-4 text-sm" onClick={() => decide('denied')}>
            Decline
          </button>
          <button type="button" className="btn-primary min-h-[44px] px-4 text-sm" onClick={() => decide('granted')}>
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
