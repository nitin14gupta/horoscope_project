'use client';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotFound() {
  return (
    <>
    <Head>   
      <title>JILZO 404 | Page Not Found</title> 
      <meta name="description" content="Oops! You lost the vibe. JILZO 404 page not found. Explore Mumbai's most exciting Gen-Z dating, party, and event platform." />
      <meta name="keywords" content="JILZO app, Jilzo Mumbai dating app, Gen Z dating app India, Flirt‑first dating app ,Mumbai nightlife app, House party app Mumbai, Ticketed party platform India, Secret Crush feature app, Roulette chat dating app, Event booking app India, Dating app with audio intro, Party host dashboard app, Exclusive party invite app India, Mumbai social discovery app, Swipe‑free flirt app India, JILZO 404, page not found jilzo, Mumbai dating app, party app, Gen-Z dating, exclusive events, join now, JILZO waitlist, Mumbai party app, early access, Gen-Z dating, exclusive events, join now" />
      <meta name="author" content="JILZO" />
      <meta name="robots" content="noindex, nofollow" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="yandexbot" content="index, follow" />
      <meta name="sitemap" content="https://jilzo.com/sitemap.xml" />
      <meta name="sitemap" content="https://jilzo.com/sitemap-0.xml" />
      <meta property="og:title" content="JILZO 404 | Page Not Found" />
      <meta property="og:description" content="Oops! You lost the vibe. JILZO 404 page not found. Explore Mumbai's most exciting Gen-Z dating, party, and event platform." />
      <meta property="og:image" content="/logo.png" />
      <meta property="og:url" content="https://jilzo.com/404" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="JILZO 404 | Page Not Found" />
      <meta name="twitter:description" content="Oops! You lost the vibe. JILZO 404 page not found. Explore Mumbai's most exciting Gen-Z dating, party, and event platform." />
      <meta name="twitter:image" content="/logo.png" />
      <link rel="canonical" href="https://jilzo.com/404" />
      <link rel="icon" href="/logo.ico" />
    </Head>
    <AnimatePresence>
      <main
        key="404"
        className="min-h-screen flex flex-col items-center justify-center bg-charcoal relative overflow-hidden px-6 py-24"
      >
        {/* Background noise */}
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.com/noise.svg')] opacity-10 mix-blend-overlay" />

        {/* Blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-1/3 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-blob" />
          <div className="absolute right-1/4 top-1/4 w-80 h-80 bg-tertiary/15 rounded-full blur-3xl animate-blob [animation-delay:4s]" />
        </div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-heading text-primary text-center drop-shadow-neon text-6xl md:text-8xl mb-6"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-secondary text-xl md:text-2xl text-center mb-8"
        >
          Oops! You lost the vibe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex gap-4"
        >
          <Link
            href="/"
            className="rounded-full border-2 border-primary px-6 py-3 text-primary font-semibold hover:bg-primary hover:text-background transition shadow-lg hover:shadow-primary/40"
          >
            Back Home
          </Link>
          <Link
            href="/Waitlist"
            className="rounded-full border-2 border-tertiary px-6 py-3 text-tertiary font-semibold hover:bg-tertiary hover:text-background transition shadow-lg hover:shadow-tertiary/40"
          >
            Join Waitlist
          </Link>
        </motion.div>
      </main>
    </AnimatePresence>
    </>
  );
} 