import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import NotFound from './pages/NotFound'

export { buildHead, buildRobots, buildSitemap, seo } from './lib/seo'

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

export function render404() {
  return renderToString(<NotFound />)
}
