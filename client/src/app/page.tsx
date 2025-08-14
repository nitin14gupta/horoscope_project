'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  // Floating stars animation
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 3
  }));

  // Features data
  const features = [
    {
      icon: '🔮',
      title: 'Daily Horoscope',
      description: 'Get personalized daily predictions based on your zodiac sign and birth details.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '📅',
      title: 'Astrological Calendar',
      description: 'Access cosmic events, planetary movements, and auspicious timings.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '❤️',
      title: 'Love Compatibility',
      description: 'Discover your compatibility with partners based on zodiac and birth charts.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: '💼',
      title: 'Career Forecast',
      description: 'Get insights into your professional life and upcoming opportunities.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '♈',
      title: 'Zodiac Insights',
      description: 'Learn about your zodiac sign characteristics, strengths, and traits.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: '🌟',
      title: 'Birth Chart Analysis',
      description: 'Deep dive into your astrological blueprint and planetary positions.',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  // Navigation links
  const navLinks = [
    { href: '/horoscope', text: 'Get My Horoscope', icon: '🔭', delay: 0.1 },
    { href: '/zodiac', text: 'Know My Zodiac', icon: '♈', delay: 0.2 },
    { href: '/matchmaking', text: 'Love Compatibility', icon: '💑', delay: 0.3 },
    { href: '/learn', text: 'Learn Astrology', icon: '📖', delay: 0.4 },
    { href: '/about', text: 'About Us', icon: 'ℹ️', delay: 0.5 },
    { href: '/tarot', text: 'Tarot Reading', icon: '🎴', delay: 0.6 },
    { href: '/birth-chart', text: 'Birth Chart', icon: '🌟', delay: 0.7 },
    { href: '/mantras', text: 'Daily Mantras', icon: '🧘', delay: 0.8 },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-charcoal text-textMain overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background with parallax */}
        <motion.div 
          className="absolute inset-0 bg-mystical-gradient opacity-50"
          style={{ y }}
        />
        <motion.div 
          className="absolute inset-0 bg-purple-glow"
          style={{ opacity }}
        />
        
        {/* Floating stars with 3D effect */}
        <div className="absolute inset-0 perspective-1000">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute text-2xl animate-pulse"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
              }}
              animate={{
                rotateY: [0, 360],
                rotateX: [0, 180],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ⭐
            </motion.div>
          ))}
        </div>

        {/* Main content with stagger animation */}
        <motion.div 
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-heading font-bold mb-6 mystical-glow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            Unlock the Secrets of Your Stars 🌌
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-textSoft mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Personalized Horoscope Based on Zodiac Signs & Astrology
          </motion.p>
          
          <motion.p 
            className="text-lg text-muted mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Get your daily predictions, career insights, love compatibility & more.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="/horoscope"
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🔭 Get My Horoscope
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, rotateY: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="/learn"
                className="bg-gradient-to-r from-secondary to-yellow-500 hover:from-yellow-500 hover:to-secondary text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                📖 Learn Astrology
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-primary rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section with Horizontal Scroll */}
      <section className="py-20 px-4">
        <motion.div 
          className="container mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-heading font-bold text-center mb-16 text-secondary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            What You Get ✨
          </motion.h2>
          
          {/* Horizontal scrolling features */}
          <div className="overflow-x-auto pb-8">
            <div className="flex gap-8 min-w-max px-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-hover rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 min-w-[350px] backdrop-blur-sm"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    boxShadow: "0 20px 40px rgba(187, 134, 252, 0.3)"
                  }}
                >
                  <motion.div 
                    className="text-6xl mb-6"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-heading font-bold mb-4 text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-textSoft leading-relaxed text-lg">
                    {feature.description}
                  </p>
                  <motion.div 
                    className={`w-full h-1 mt-6 rounded-full bg-gradient-to-r ${feature.color}`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* What is Horoscope Section with 3D Card */}
      <section className="py-20 px-4 bg-hover">
        <motion.div 
          className="container mx-auto max-w-4xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center bg-charcoal rounded-3xl p-12 border border-primary/20 shadow-2xl"
            whileHover={{ rotateY: 2, rotateX: 2 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.div 
              className="text-8xl mb-8"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              🔆
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-5xl font-heading font-bold mb-8 text-secondary"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              What is Horoscope?
            </motion.h2>
            <motion.p 
              className="text-lg text-textSoft leading-relaxed mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Our platform is powered by ancient astrological principles and modern AI technology. 
              Based on your date, time, and place of birth, we generate detailed zodiac-based predictions 
              that help you navigate life&apos;s journey with cosmic wisdom and guidance.
            </motion.p>
            <motion.p 
              className="text-lg text-textSoft leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              The stars have guided humanity for millennia. Now, let them guide you through the 
              mystical journey of self-discovery and cosmic alignment.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Connect & Explore Section with Stagger Animation */}
      <section className="py-20 px-4">
        <motion.div 
          className="container mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-heading font-bold mb-12 text-secondary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Connect & Explore 🌟
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: link.delay,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 10,
                  boxShadow: "0 20px 40px rgba(187, 134, 252, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className="bg-gradient-to-br from-primary/20 to-purple-600/20 hover:from-primary/30 hover:to-purple-600/30 text-charcoal font-bold py-6 px-6 rounded-2xl transition-all duration-300 flex flex-col items-center gap-3 border border-primary/30 hover:border-primary/50 backdrop-blur-sm"
                >
                  <motion.span 
                    className="text-3xl"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  >
                    {link.icon}
                  </motion.span>
                  <span className="text-lg">{link.text}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer with Parallax */}
      <motion.footer 
        className="py-12 px-4 bg-hover border-t border-primary/20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Animated background elements */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
            backgroundSize: ["100% 100%", "200% 200%"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: "radial-gradient(circle, #BB86FC 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }}
        />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.h3 
            className="text-3xl font-heading font-bold mb-4 text-secondary"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            AstroScope 🔮
          </motion.h3>
          <motion.p 
            className="text-textSoft mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Your gateway to cosmic wisdom and astrological guidance
          </motion.p>
          <motion.div 
            className="flex justify-center gap-6 text-textSoft"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((link, index) => (
              <motion.div
                key={link}
                whileHover={{ scale: 1.1, color: "#BB86FC" }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={`/${link.toLowerCase().replace(' ', '-')}`} className="hover:text-primary transition-colors">
                  {link}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
