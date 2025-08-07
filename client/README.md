# JILZO – Flirt-First Social Dating & Party App

<p align="center">
  <img src="https://srrnysejsxrxlxhukzmv.supabase.co/storage/v1/object/sign/jilzo/jilzologo.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMzM3YmY1ZS0wZDQxLTRhOGUtYjc0OS1jMzdmN2QxNjY2YjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJqaWx6by9qaWx6b2xvZ28uanBlZyIsImlhdCI6MTc1MjY3NzcwMSwiZXhwIjoxODQ3Mjg1NzAxfQ.gbf5bREv5gKXQ3R2ns0ucF1QY7ZX3thnCbRUoycnse4" width="160" alt="JILZO Logo" />
</p>

> **JILZO** turns swipes into unforgettable nights – connecting Gen-Z singles with the best house-parties & club events in Mumbai.

[![Live Site](https://img.shields.io/badge/Visit-Live%20Site-ff5fa2?style=for-the-badge&logo=vercel&logoColor=white)](https://jilzo.com) 
[![Licence](https://img.shields.io/github/license/your-org/your-repo?style=for-the-badge)](LICENSE)

---

## ✨ Features

- **Vibrant Hero Animations** – GSAP + Framer Motion powered micro-interactions
- **3D Background Waves** – Vanta.js for immersive, GPU-accelerated visuals
- **Waitlist On-Ramp** – Capture early adopters with a frictionless sign-up form
- **Manifesto & Testimonials** – Horizontal scroll manifesto section & social proof bar
- **Responsive & Accessible** – Tailwind CSS + semantic markup = mobile-first, a11y-friendly
- **SEO-Ready** – Open Graph cards, Twitter cards, dynamic `sitemap.xml` & `robots.txt`
- **Blazing Fast** – Code-splitting via Next.js App Router + dynamic imports
- **PWA Manifest** – Installable on Android/iOS with custom icon & splash-screen

## 🚀 Demo

Feel the vibe → **https://jilzo.com**

![JILZO Screenshot](public/image.png)

## 🏗️ Tech Stack

| Front-End | Animation | 3D / Visuals | Styling | Tooling |
|-----------|-----------|--------------|---------|---------|
| Next.js 15 (App Router) | Framer Motion, GSAP | Three.js, Vanta.js | Tailwind CSS, Tailwind-Merge | TypeScript, ESLint, Lucide React |

## 📂 Folder Structure (partial)

```bash
src/
├─ app/          # App Router routes (`/`, `/Waitlist`, etc.)
│  ├─ sitemap.xml/route.ts  # Dynamic sitemap
│  ├─ robots.txt/route.ts   # Robots policy
│  └─ layout.tsx            # Global metadata & providers
├─ components/   # Re-usable UI pieces (Navbar, Footer, FAQ…)
├─ public/       # Static assets (logo, images, icons)
└─ tailwind.config.ts
```

## 🔍 SEO Checklist

- ✅ Unique meta `title` & `description` per page
- ✅ Canonical URL & `robots` rules
- ✅ Open Graph & Twitter summary-large-image cards
- ✅ Dynamic `sitemap.xml` served at `/sitemap.xml`
- ✅ Image alts & structured-data (`ld+json`)

> After **each deploy**, submit the homepage URL in Google Search Console → "Request Indexing" to speed up discovery.

## 🧑‍💻 Getting Started

```bash
# 1. Clone & install
pnpm i # or npm install / yarn install

# 2. Development server on http://localhost:3000
pnpm dev

# 3. Build for production & preview
pnpm build && pnpm start
```

Environment variables (if any) go in `.env` – none are required for the public marketing site.

## 🏗️ Deployment

The site is continuously deployed on **Vercel**.

1. Push to `main` → Vercel builds & invalidates cache.
2. Preview deployments available via PRs.
3. Custom domain? Add it in the Vercel dashboard & update `layout.tsx` metadata URLs.

## 🗺️ Roadmap

- [ ] Auth 0 integration for in-app login
- [ ] Headless CMS for blog posts & nightlife guides
- [ ] Dark mode toggle
- [ ] Real-time event analytics dashboard

## 🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss major changes.

```bash
# Lint & type-check before committing
pnpm lint
```

## 📜 License

Distributed under the MIT license. See `LICENSE` for more information.