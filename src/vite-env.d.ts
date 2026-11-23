/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_FORM_ENDPOINT?: string
  readonly VITE_GA4_ID?: string
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string
  readonly VITE_BING_SITE_VERIFICATION?: string
}
interface ImportMeta { readonly env: ImportMetaEnv }
interface Window { __hydrated?: boolean; dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
