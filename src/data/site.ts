/**
 * Site-wide technical configuration.
 * Values come from environment variables (see .env.example) so nothing
 * sensitive or deployment-specific is hard-coded.
 */
const env = import.meta.env

export const site = {
  /** Public URL of the deployed site, without trailing slash. Set VITE_SITE_URL before building. */
  url: (env.VITE_SITE_URL || 'https://www.example.com').replace(/\/+$/, ''),
  lang: 'en',
  locale: 'en_BD',
  themeColor: '#087E83',

  /**
   * While content is still being collected, unconfirmed items (e.g. specializations)
   * are shown with a "To be confirmed" tag. Set to false before going live so only
   * confirmed items appear.
   */
  showUnconfirmedContent: true,

  /**
   * false (production): [placeholder] text is hidden and empty sections are removed.
   * true: placeholders are shown (with a dashed underline) to preview the full layout.
   */
  showPlaceholders: false,

  /** JSON POST endpoint for the appointment form (Formspree, Web3Forms, own API…). */
  formEndpoint: env.VITE_FORM_ENDPOINT || '',

  /** Google Analytics 4 ID. Loaded only after the visitor accepts the consent banner. */
  ga4Id: env.VITE_GA4_ID || '',

  verification: {
    google: env.VITE_GOOGLE_SITE_VERIFICATION || '',
    bing: env.VITE_BING_SITE_VERIFICATION || '',
  },

  lastModified: '2026-11-22',
} as const
