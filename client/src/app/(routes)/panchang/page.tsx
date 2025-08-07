'use client';

import React from 'react';
import Link from 'next/link';

export default function PanchangPage() {
  // Mock data for today's panchang
  const today = new Date();
  const panchangData = {
    date: today.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    tithi: 'Shukla Paksha Dwadashi',
    nakshatra: 'Purva Phalguni',
    yoga: 'Shiva',
    karana: 'Taitila',
    sunrise: '06:15 AM',
    sunset: '06:45 PM',
    auspiciousTimings: [
      { name: 'Brahma Muhurta', time: '04:30 AM - 05:30 AM', description: 'Best time for meditation and spiritual practices' },
      { name: 'Abhijit Muhurta', time: '11:45 AM - 12:30 PM', description: 'Auspicious time for important work and ceremonies' },
      { name: 'Vijaya Muhurta', time: '02:15 PM - 03:00 PM', description: 'Good time for starting new ventures' },
      { name: 'Godhuli Kaal', time: '06:30 PM - 07:00 PM', description: 'Twilight period, good for evening prayers' }
    ],
    inauspiciousTimings: [
      { name: 'Rahu Kaal', time: '10:30 AM - 12:00 PM', description: 'Avoid starting new work during this period' },
      { name: 'Gulika Kaal', time: '03:00 PM - 04:30 PM', description: 'Not suitable for important decisions' }
    ]
  };

  return (
    <div className="min-h-screen bg-charcoal text-textMain">
      {/* Header */}
      <div className="bg-mystical-gradient py-6">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-secondary hover:text-primary transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-center mt-8 mystical-glow">
            🗓️ Today&apos;s Panchang
          </h1>
          <p className="text-textSoft text-center mt-4 text-lg">
            Hindu Calendar & Auspicious Timings
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Date and Basic Info */}
          <div className="bg-hover rounded-lg p-8 border border-primary/20 mb-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📅</div>
              <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
                {panchangData.date}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-textSoft">Tithi:</span>
                  <span className="text-primary font-semibold">{panchangData.tithi}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textSoft">Nakshatra:</span>
                  <span className="text-primary font-semibold">{panchangData.nakshatra}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textSoft">Yoga:</span>
                  <span className="text-primary font-semibold">{panchangData.yoga}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textSoft">Karana:</span>
                  <span className="text-primary font-semibold">{panchangData.karana}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-textSoft">Sunrise:</span>
                  <span className="text-secondary font-semibold">{panchangData.sunrise}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textSoft">Sunset:</span>
                  <span className="text-secondary font-semibold">{panchangData.sunset}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textSoft">Day:</span>
                  <span className="text-secondary font-semibold">{today.toLocaleDateString('en-IN', { weekday: 'long' })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textSoft">Paksha:</span>
                  <span className="text-secondary font-semibold">Shukla Paksha</span>
                </div>
              </div>
            </div>
          </div>

          {/* Auspicious Timings */}
          <div className="bg-hover rounded-lg p-8 border border-secondary/20 mb-8">
            <h3 className="text-2xl font-heading font-bold text-center mb-6 text-secondary">
              ✨ Auspicious Timings (Shubh Muhurat)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {panchangData.auspiciousTimings.map((timing, index) => (
                <div key={index} className="bg-charcoal rounded-lg p-4 border border-secondary/20">
                  <h4 className="text-lg font-heading font-bold text-secondary mb-2">
                    {timing.name}
                  </h4>
                  <p className="text-primary font-semibold mb-2">{timing.time}</p>
                  <p className="text-textSoft text-sm">{timing.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Inauspicious Timings */}
          <div className="bg-hover rounded-lg p-8 border border-tertiary/20 mb-8">
            <h3 className="text-2xl font-heading font-bold text-center mb-6 text-tertiary">
              ⚠️ Inauspicious Timings (Avoid These Periods)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {panchangData.inauspiciousTimings.map((timing, index) => (
                <div key={index} className="bg-charcoal rounded-lg p-4 border border-tertiary/20">
                  <h4 className="text-lg font-heading font-bold text-tertiary mb-2">
                    {timing.name}
                  </h4>
                  <p className="text-tertiary font-semibold mb-2">{timing.time}</p>
                  <p className="text-textSoft text-sm">{timing.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Wisdom */}
          <div className="bg-hover rounded-lg p-8 border border-primary/20">
            <h3 className="text-2xl font-heading font-bold text-center mb-6 text-primary">
              🕉️ Daily Wisdom
            </h3>
            <div className="text-center">
              <p className="text-textSoft text-lg leading-relaxed mb-6">
                &quot;Today is blessed with the energy of {panchangData.nakshatra} nakshatra. 
                This is an excellent time for spiritual practices, meditation, and connecting 
                with your inner self. The {panchangData.yoga} yoga brings positive energy 
                for new beginnings and personal growth.&quot;
              </p>
              <div className="text-4xl mb-4">🕉️</div>
              <p className="text-textSoft">
                May the divine energy guide you through this blessed day.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <Link
              href="/horoscope"
              className="bg-primary hover:bg-primary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg inline-block mr-4"
            >
              🔭 Get My Horoscope
            </Link>
            <Link
              href="/zodiac"
              className="bg-secondary hover:bg-secondary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg inline-block"
            >
              ♈ Know My Zodiac
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
