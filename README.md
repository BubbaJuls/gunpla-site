

# Gunpla Hobby PH — Road to 50

**A project of Juls Vincent Andrada** for **Sir Mark Anthony Gipit** in the subject **WEB SYSTEMS AND TECHNOLOGIES**.

A static demo e-commerce site for Bandai Gunpla kits, themed around the countdown to the Mobile Suit Gundam **50th anniversary in 2029**. Built with plain HTML, CSS, and vanilla JavaScript — no framework and **no build step**.

Prices are in Philippine pesos (₱). Cart, checkout, auth, and orders run entirely in the browser for demonstration purposes.

## Features

- **Road to 50 landing** (`index.html`) — hero video prologue and flash-sale intro
- **Shop** — neon carousel, featured kits, link back to the anniversary page
- **Catalog** — filter by grade, pagination (12 kits per page via `?page=N`)
- **Product pages** — model and box imagery, reviews, add to cart
- **Cart & checkout** — client-side cart with order receipt on a separate confirmation page
- **Search autocomplete** — kit name, grade, and price hints in the header and catalog
- **Demo auth** — register, sign in, and sign out (session in `sessionStorage`, users in `localStorage`)
- **Chatbot** — simple kit lookup helper

## Tech stack

| Layer | Choice |
|-------|--------|
| Markup | HTML pages at repo root |
| Styles | `css/style.css` |
| Logic | Vanilla JS (`js/core/`, `js/pages/`) |
| Data | In-memory catalog in `js/core/data.js` (35 kits: RG 1–10, HG 11–20, MG 21–30, PG 31–35) |
| Local server | [`serve`](https://github.com/vercel/serve) via `npx` |
| Deploy | [Vercel](https://vercel.com) static hosting (`vercel.json`) |

## Project structure

```
gunpla-site/
├── index.html              # Road to 50 landing
├── shop.html               # Shop home
├── catalog.html
├── product.html
├── cart.html
├── checkout.html
├── order-confirmation.html
├── login.html, register.html
├── about.html, contact.html
├── css/style.css
├── js/
│   ├── main.js
│   ├── core/               # data, cart, auth, ui, reviews, carousel, …
│   └── pages/              # per-page bootstrapping
├── resources/
│   ├── brand/              # logo
│   ├── site/               # backgrounds
│   ├── products/           # kit photos
│   ├── carousel/           # neon hero slides
│   └── videos/             # landing hero MP4 (local dev only; gitignored)
├── serve.json              # clean URLs for local `serve`
├── vercel.json             # static deploy + production rewrites
└── package.json
```

## Getting started

**Requirements:** [Node.js](https://nodejs.org/) (for `npx serve` only — nothing is compiled).

```bash
git clone https://github.com/BubbaJuls/gunpla-site.git
cd gunpla-site
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects `/` to `index.html` and supports extensionless paths such as `/shop` and `/catalog` (see `serve.json`).

Alternative:

```bash
npx serve . -l 3000
```

## Demo accounts

Auth is **client-side only** and not suitable for production. Use these accounts to sign in:

| Email | Password |
|-------|----------|
| `demo@gunplahobby.ph` | `demo123` |
| `student@example.com` | `build2029` |

You can also register new accounts; they are stored in `localStorage` on that browser.

## Deploying to Vercel

This repo is configured as a **static site**:

- `vercel.json` sets empty `installCommand` and `buildCommand` and serves files from the repo root.
- Clean URL rewrites match `serve.json`.

If a deploy still runs `vite build`, open the Vercel project settings and set **Framework Preset** to **Other**, with **Build Command** left empty, then redeploy.

### Hero video (local vs Vercel)

The Road to 50 landing video is chosen automatically in `js/core/hero-video.js`:

| Environment | Source |
|-------------|--------|
| **Local** (`localhost`, `127.0.0.1`) | MP4 at `resources/videos/a-boy-with-gundam.mp4` |
| **Deployed** (Vercel, etc.) | YouTube embed — [A boy with GUNDAM](https://www.youtube.com/watch?v=Zt62nsFLqA0) (GUNDAM CHANNEL INTL) |

The MP4 is listed in `.gitignore` so it is not pushed to GitHub/Vercel (~70MB). Keep a copy on your machine for local dev.

Override for testing: `?hero=local` or `?hero=youtube` on any host.

YouTube ID and local path are set in `js/core/data.js` (`VIDEO_HERO_YOUTUBE_ID`, `VIDEO_HERO_LOCAL`).

If the MP4 was already committed, remove it from git tracking (file stays on disk):

```bash
git rm --cached resources/videos/a-boy-with-gundam.mp4
```

## Development notes

- **Catalog data** — edit `PRODUCTS`, `HERO_SLIDES`, and related constants in `js/core/data.js`.
- **Script load order** — most pages load `data.js` → `cart.js` → `auth.js` → (optional review seeds) → `search-autocomplete.js` → `ui.js` → page script → `animations.js` → `chatbot.js` → `main.js`. Checkout and order confirmation also load `order-receipt.js`.
- **Product URLs** — use `product.html#id=<id>` (e.g. `product.html#id=5`).
- **Asset download scripts** — optional PowerShell helpers may live in a separate `gunpla-site-scripts` folder outside this repo.

## License

Demo / school project. Gundam and Gunpla are trademarks of their respective owners; this site is not affiliated with Bandai or Sunrise.
