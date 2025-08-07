'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-charcoal text-textMain">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-mystical-gradient opacity-50"></div>
        <div className="absolute inset-0 bg-purple-glow"></div>
        
        {/* Floating stars */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              ⭐
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 mystical-glow">
            Unlock the Secrets of Your Stars 🌌
          </h1>
          <p className="text-xl md:text-2xl text-textSoft mb-8 leading-relaxed">
            Personalized Horoscope Based on Hindu Calendar & Zodiac Signs
          </p>
          <p className="text-lg text-muted mb-12">
            Get your daily predictions, career insights, love compatibility & more.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/horoscope"
              className="bg-primary hover:bg-primary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
            >
              🔭 Get My Horoscope
            </Link>
            <Link
              href="/learn"
              className="bg-secondary hover:bg-secondary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
            >
              📖 Learn Astrology
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-16 text-secondary">
            What You Get ✨
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🔮',
                title: 'Daily Horoscope',
                description: 'Get personalized daily predictions based on your zodiac sign and birth details.'
              },
              {
                icon: '🧘',
                title: 'Hindu Panchang',
                description: 'Access traditional Hindu calendar with auspicious timings and planetary positions.'
              },
              {
                icon: '❤️',
                title: 'Love Compatibility',
                description: 'Discover your compatibility with partners based on zodiac and birth charts.'
              },
              {
                icon: '📅',
                title: 'Career Forecast',
                description: 'Get insights into your professional life and upcoming opportunities.'
              },
              {
                icon: '🌞',
                title: 'Zodiac Facts',
                description: 'Learn about your zodiac sign characteristics, strengths, and weaknesses.'
              },
              {
                icon: '📜',
                title: 'Vedic Wisdom',
                description: 'Ancient Vedic astrology principles for modern life guidance.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-hover rounded-lg p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-heading font-bold mb-3 text-primary">
                  {feature.title}
                </h3>
                <p className="text-textSoft leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Horoscope Section */}
      <section className="py-20 px-4 bg-hover">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <div className="text-6xl mb-6">🔆</div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-secondary">
              What is Horoscope?
            </h2>
            <p className="text-lg text-textSoft leading-relaxed mb-8">
              Our platform is powered by ancient Vedic astrology principles derived from Hindu Panchang. 
              Based on your date, time, and place of birth, we generate detailed zodiac-based predictions 
              that help you navigate life&apos;s journey with cosmic wisdom.
            </p>
            <p className="text-lg text-textSoft leading-relaxed">
              The stars have guided humanity for millennia. Now, let them guide you through the 
              mystical journey of self-discovery and cosmic alignment.
            </p>
          </div>
        </div>
      </section>

      {/* Connect & Explore Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12 text-secondary">
            Connect & Explore 🧘
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { href: '/horoscope', text: 'Get My Horoscope', icon: '🔭' },
              { href: '/zodiac', text: 'Know My Zodiac', icon: '♈' },
              { href: '/panchang', text: "Today's Panchang", icon: '🗓️' },
              { href: '/matchmaking', text: 'Kundali Match', icon: '💑' },
              { href: '/mantras', text: 'Daily Mantras', icon: '🕉️' },
              { href: '/remedies', text: 'Gemstones & Remedies', icon: '💎' },
              { href: '/learn', text: 'Learn Astrology', icon: '📖' },
              { href: '/about', text: 'About Us', icon: '🕉️' },
              { href: '/tarot', text: 'Tarot Reading', icon: '🎴' },
              { href: '/birth-chart', text: 'Birth Chart', icon: '🌟' },
              { href: '/calendar', text: 'Astrology Calendar', icon: '📅' }
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="bg-primary hover:bg-primary/80 text-charcoal font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center gap-2"
              >
                <span className="text-2xl">{link.icon}</span>
                <span>{link.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-hover border-t border-primary/20">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-heading font-bold mb-4 text-secondary">
            HoroScope 🔮
          </h3>
          <p className="text-textSoft mb-6">
            Your gateway to cosmic wisdom and spiritual guidance
          </p>
          <div className="flex justify-center gap-6 text-textSoft">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
