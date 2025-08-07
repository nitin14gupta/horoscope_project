'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-charcoal text-textMain">
      {/* Header */}
      <div className="bg-mystical-gradient py-6">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-secondary hover:text-primary transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-center mt-8 mystical-glow">
            🕉️ About HoroScope
          </h1>
          <p className="text-textSoft text-center mt-4 text-lg">
            Your gateway to cosmic wisdom and spiritual guidance
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Mission Section */}
          <div className="bg-hover rounded-lg p-8 border border-primary/20 mb-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🌟</div>
              <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
                Our Mission
              </h2>
            </div>
            <p className="text-textSoft text-lg leading-relaxed mb-6">
              At HoroScope, we believe that the ancient wisdom of Vedic astrology holds the key to 
              understanding our life's journey. Our mission is to make this profound knowledge 
              accessible to everyone, helping you navigate life's challenges and opportunities with 
              cosmic guidance.
            </p>
            <p className="text-textSoft text-lg leading-relaxed">
              We combine traditional Vedic principles with modern technology to provide accurate, 
              personalized horoscope readings that help you make informed decisions and live a more 
              harmonious life.
            </p>
          </div>

          {/* What We Offer */}
          <div className="bg-hover rounded-lg p-8 border border-secondary/20 mb-8">
            <h2 className="text-3xl font-heading font-bold text-center mb-8 text-secondary">
              ✨ What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-charcoal rounded-lg p-6 border border-primary/20">
                <div className="text-3xl mb-4">🔮</div>
                <h3 className="text-xl font-heading font-bold mb-3 text-primary">
                  Daily Horoscopes
                </h3>
                <p className="text-textSoft">
                  Personalized daily predictions based on your zodiac sign and birth details, 
                  helping you understand what the stars have in store for you.
                </p>
              </div>
              <div className="bg-charcoal rounded-lg p-6 border border-secondary/20">
                <div className="text-3xl mb-4">🗓️</div>
                <h3 className="text-xl font-heading font-bold mb-3 text-secondary">
                  Hindu Panchang
                </h3>
                <p className="text-textSoft">
                  Traditional Hindu calendar with auspicious timings, helping you choose the 
                  best moments for important activities.
                </p>
              </div>
              <div className="bg-charcoal rounded-lg p-6 border border-primary/20">
                <div className="text-3xl mb-4">💑</div>
                <h3 className="text-xl font-heading font-bold mb-3 text-primary">
                  Love Compatibility
                </h3>
                <p className="text-textSoft">
                  Check compatibility between zodiac signs to understand relationship dynamics 
                  and potential for harmony.
                </p>
              </div>
              <div className="bg-charcoal rounded-lg p-6 border border-secondary/20">
                <div className="text-3xl mb-4">📚</div>
                <h3 className="text-xl font-heading font-bold mb-3 text-secondary">
                  Astrology Education
                </h3>
                <p className="text-textSoft">
                  Learn about zodiac signs, elements, planets, and Vedic astrology principles 
                  to deepen your understanding.
                </p>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="bg-hover rounded-lg p-8 border border-primary/20 mb-8">
            <h2 className="text-3xl font-heading font-bold text-center mb-8 text-primary">
              🎯 Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🕉️</div>
                <h3 className="text-lg font-heading font-bold mb-2 text-secondary">
                  Authenticity
                </h3>
                <p className="text-textSoft text-sm">
                  We follow traditional Vedic astrology principles with utmost respect for 
                  ancient wisdom and cultural heritage.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-lg font-heading font-bold mb-2 text-secondary">
                  Accessibility
                </h3>
                <p className="text-textSoft text-sm">
                  Making complex astrological concepts easy to understand and accessible 
                  to everyone, regardless of background.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💫</div>
                <h3 className="text-lg font-heading font-bold mb-2 text-secondary">
                  Empowerment
                </h3>
                <p className="text-textSoft text-sm">
                  Providing guidance that empowers you to make informed decisions and 
                  take control of your destiny.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-hover rounded-lg p-8 border border-secondary/20 mb-8">
            <h2 className="text-3xl font-heading font-bold text-center mb-8 text-secondary">
              👥 Our Team
            </h2>
            <div className="text-center">
              <div className="bg-charcoal rounded-lg p-6 border border-primary/20 max-w-2xl mx-auto">
                <div className="text-6xl mb-4">🧘‍♂️</div>
                <h3 className="text-2xl font-heading font-bold mb-2 text-primary">
                  Nitin Gupta
                </h3>
                <p className="text-secondary mb-4">Founder & Lead Astrologer</p>
                <p className="text-textSoft leading-relaxed">
                  With over 15 years of experience in Vedic astrology, Nitin has dedicated his life 
                  to studying ancient texts and helping people understand their cosmic journey. 
                  His deep knowledge of Hindu Panchang and traditional practices forms the foundation 
                  of our platform.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-hover rounded-lg p-8 border border-primary/20 mb-8">
            <h2 className="text-3xl font-heading font-bold text-center mb-8 text-primary">
              📞 Contact Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="text-secondary font-semibold">Email</p>
                    <p className="text-textSoft">contact@horoscope.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="text-secondary font-semibold">Phone</p>
                    <p className="text-textSoft">+91-7977876609</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-secondary font-semibold">Address</p>
                    <p className="text-textSoft">Andheri East, Mumbai, Maharashtra, India</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌐</span>
                  <div>
                    <p className="text-secondary font-semibold">Website</p>
                    <p className="text-textSoft">www.horoscope.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Link
              href="/horoscope"
              className="bg-primary hover:bg-primary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg inline-block mr-4"
            >
              🔭 Get My Horoscope
            </Link>
            <Link
              href="/learn"
              className="bg-secondary hover:bg-secondary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg inline-block"
            >
              📖 Learn Astrology
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
