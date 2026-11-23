# Md. Waheduzzaman Maruf — Physiotherapist Portfolio

React + TypeScript + Tailwind CSS, prerendered to static HTML for SEO and speed.

## Commands
| Command | What it does |
|---|---|
| `npm run dev` | Local development at http://localhost:5173 |
| `npm run build` | Production build into `dist/` (prerendered HTML, robots.txt, sitemap.xml, 404.html) |
| `npm run preview` | Preview the production build |
| `npm run images` | Optimise photos from `assets-src/` into responsive AVIF/WebP + regenerate OG image & icons |

## Updating content
**All content is in [`src/data/profile.ts`](src/data/profile.ts).**
Anything in `[square brackets]` is a placeholder: it shows on the page with a dashed underline and is
automatically excluded from SEO structured data. Replace placeholders with verified information only.

- **Specializations:** set `confirmed: true` for each confirmed item. Before launch, set
  `showUnconfirmedContent: false` in [`src/data/site.ts`](src/data/site.ts) to hide the rest.
- **Testimonials:** add only real reviews shared with patient permission. Add `rating` only if genuinely given.
- **Photos:** put originals in `assets-src/` with descriptive names, run `npm run images`, and paste the
  printed snippet into the relevant `image` field (profile photo, certificates, gallery).

## Before deployment
1. Copy `.env.example` to `.env` and set `VITE_SITE_URL` (used for canonical URL, Open Graph, sitemap).
2. Optional: `VITE_FORM_ENDPOINT` (e.g. Formspree) for the appointment form. Without it the form falls
   back to WhatsApp, then email, once those contacts are filled in.
3. Optional: `VITE_GA4_ID` (loaded only after the visitor consents), and Search Console / Bing tokens.
4. `npm run build` and deploy the `dist/` folder over HTTPS (Netlify, Vercel, Cloudflare Pages…).
5. Submit `https://your-domain/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
