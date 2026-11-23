/**
 * Post-build step: renders the React app to static HTML (SEO-friendly, fast first paint),
 * injects meta tags + JSON-LD, and generates robots.txt, sitemap.xml and 404.html.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')
const mod = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')

// Preload the Latin Inter font (used above the fold) to avoid late text swaps
const assets = await fs.readdir(path.join(dist, 'assets'))
const latinFont = assets.find((f) => /^inter-latin-wght-normal-.*\.woff2$/.test(f))
const fontPreload = latinFont
  ? `<link rel="preload" href="/assets/${latinFont}" as="font" type="font/woff2" crossorigin />\n    `
  : String()

// Home page
const html = template.replace('<!--app-head-->', fontPreload + mod.buildHead()).replace('<!--app-html-->', mod.render())
await fs.writeFile(path.join(dist, 'index.html'), html)

// 404 page: same styles, no app JS, not indexable
const EMPTY = String()
const notFound = template
  .replace(/<title>[\s\S]*?<\/title>/, '<title>Page not found | Md. Waheduzzaman Maruf</title>')
  .replace(/<meta name="description"[^>]*>/, '<meta name="description" content="The requested page could not be found." />')
  .replace('<!--app-head-->', '<meta name="robots" content="noindex, follow" />')
  .replace(/<script type="module"[^>]*><\/script>/g, EMPTY)
  .replace(/<link rel="modulepreload"[^>]*>/g, EMPTY)
  .replace(/<script>\s*document\.documentElement\.classList[\s\S]*?<\/script>/, EMPTY)
  .replace('<!--app-html-->', mod.render404())
await fs.writeFile(path.join(dist, '404.html'), notFound)

await fs.writeFile(path.join(dist, 'robots.txt'), mod.buildRobots())
await fs.writeFile(path.join(dist, 'sitemap.xml'), mod.buildSitemap())

await fs.rm(ssrDir, { recursive: true, force: true })
console.log('✓ Prerendered index.html, 404.html, robots.txt, sitemap.xml')
