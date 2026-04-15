# Fermionisme

Personal portal — where small things shape something greater.

## Tech Stack

- **React 18** + **Vite 6**
- **Cloudflare Pages** deployment
- Dark / Light mode (persisted in `localStorage`, respects `prefers-color-scheme`)
- Fonts: **Bebas Neue** (headings) · **Montserrat** (body)

## Project Structure

```
fermionisme/
├── public/
│   └── img/
│       ├── logo-dark.png    ← logo for dark mode
│       ├── logo-light.png   ← logo for light mode
│       └── og-cover.jpg     ← Open Graph cover image
├── src/
│   ├── main.jsx             ← React entry point
│   └── Fermionisme.jsx      ← Main page component
├── index.html               ← HTML shell (favicon + OG meta)
├── vite.config.js
└── package.json
```

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
# Output: dist/
```

## Deploy to Cloudflare Pages

### Via Git (recommended)

1. Push this repository to GitHub.
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/) → **Create a project** → **Connect to Git**.
3. Select your repository.
4. Set the following build settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**.

### Via Wrangler CLI

```bash
npm run build
npx wrangler pages deploy dist --project-name fermionisme
```

## OG Image

Update the canonical URL in `index.html` once your domain is live:

```html
<meta property="og:url" content="https://YOUR_DOMAIN/" />
<meta property="og:image" content="https://YOUR_DOMAIN/img/og-cover.jpg" />
<meta name="twitter:url"  content="https://YOUR_DOMAIN/" />
<meta name="twitter:image" content="https://YOUR_DOMAIN/img/og-cover.jpg" />
```
