'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const zodiacSigns = [
  {
    sign: 'aries',
    symbol: '♈',
    name: 'Aries',
    dates: 'March 21 - April 19',
    element: 'Fire',
    planet: 'Mars',
    traits: ['Courageous', 'Energetic', 'Willful', 'Pioneering', 'Independent'],
    description: 'Aries are natural leaders, full of energy and enthusiasm. They are courageous and determined, always ready for action and new challenges.'
  },
  {
    sign: 'taurus',
    symbol: '♉',
    name: 'Taurus',
    dates: 'April 20 - May 20',
    element: 'Earth',
    planet: 'Venus',
    traits: ['Patient', 'Reliable', 'Devoted', 'Persistent', 'Practical'],
    description: 'Taurus is known for being reliable, practical, ambitious and sensual. They have an eye for beauty and love to be surrounded by love and material pleasures.'
  },
  {
    sign: 'gemini',
    symbol: '♊',
    name: 'Gemini',
    dates: 'May 21 - June 20',
    element: 'Air',
    planet: 'Mercury',
    traits: ['Adaptable', 'Versatile', 'Communicative', 'Witty', 'Intellectual'],
    description: 'Gemini is versatile, expressive, and quick-witted. They are excellent communicators and can adapt to any situation with ease.'
  },
  {
    sign: 'cancer',
    symbol: '♋',
    name: 'Cancer',
    dates: 'June 21 - July 22',
    element: 'Water',
    planet: 'Moon',
    traits: ['Nurturing', 'Protective', 'Sympathetic', 'Moody', 'Intuitive'],
    description: 'Cancer is deeply intuitive and sentimental. They are very emotional and sensitive, and care deeply about matters of the family and their home.'
  },
  {
    sign: 'leo',
    symbol: '♌',
    name: 'Leo',
    dates: 'July 23 - August 22',
    element: 'Fire',
    planet: 'Sun',
    traits: ['Creative', 'Passionate', 'Generous', 'Warm-hearted', 'Cheerful'],
    description: 'Leo is dramatic, creative, self-confident, born to lead and born to love. They are extremely loyal and make great friends.'
  },
  {
    sign: 'virgo',
    symbol: '♍',
    name: 'Virgo',
    dates: 'August 23 - September 22',
    element: 'Earth',
    planet: 'Mercury',
    traits: ['Analytical', 'Kind', 'Hardworking', 'Practical', 'Modest'],
    description: 'Virgo is analytical, kind, hardworking and practical. They have a great sense of humor and are excellent problem solvers.'
  },
  {
    sign: 'libra',
    symbol: '♎',
    name: 'Libra',
    dates: 'September 23 - October 22',
    element: 'Air',
    planet: 'Venus',
    traits: ['Diplomatic', 'Gracious', 'Fair-minded', 'Social', 'Peaceful'],
    description: 'Libra is peaceful, fair, and they hate being alone. Partnership is very important for them, as their mirror and someone to encourage them.'
  },
  {
    sign: 'scorpio',
    symbol: '♏',
    name: 'Scorpio',
    dates: 'October 23 - November 21',
    element: 'Water',
    planet: 'Pluto',
    traits: ['Passionate', 'Stubborn', 'Resourceful', 'Brave', 'True'],
    description: 'Scorpio is passionate and assertive. They are determined and decisive, and will research until they find out the truth.'
  },
  {
    sign: 'sagittarius',
    symbol: '♐',
    name: 'Sagittarius',
    dates: 'November 22 - December 21',
    element: 'Fire',
    planet: 'Jupiter',
    traits: ['Optimistic', 'Adventurous', 'Independent', 'Honest', 'Philosophical'],
    description: 'Sagittarius is optimistic, loves freedom, and exploration. They are enthusiastic, extroverted, and always ready for an adventure.'
  },
  {
    sign: 'capricorn',
    symbol: '♑',
    name: 'Capricorn',
    dates: 'December 22 - January 19',
    element: 'Earth',
    planet: 'Saturn',
    traits: ['Responsible', 'Disciplined', 'Self-controlled', 'Ambitious', 'Patient'],
    description: 'Capricorn is responsible and disciplined, masters of self-control. They have the ability to lead, great organizational skills, and are very reliable.'
  },
  {
    sign: 'aquarius',
    symbol: '♒',
    name: 'Aquarius',
    dates: 'January 20 - February 18',
    element: 'Air',
    planet: 'Uranus',
    traits: ['Progressive', 'Original', 'Independent', 'Humanitarian', 'Intellectual'],
    description: 'Aquarius is deep, imaginative, and uncompromising in their dedication to making the world a better place.'
  },
  {
    sign: 'pisces',
    symbol: '♓',
    name: 'Pisces',
    dates: 'February 19 - March 20',
    element: 'Water',
    planet: 'Neptune',
    traits: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Musical'],
    description: 'Pisces is intuitive, artistic, and deeply feeling. They are the most spiritual of all signs, with a deep connection to the universe.'
  }
];

export default function ZodiacPage() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-charcoal text-textMain">
      {/* Header */}
      <div className="bg-mystical-gradient py-6">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-secondary hover:text-primary transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-center mt-8 mystical-glow">
            ♈ Know Your Zodiac
          </h1>
          <p className="text-textSoft text-center mt-4 text-lg">
            Discover the characteristics and traits of your zodiac sign
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Zodiac Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {zodiacSigns.map((sign) => (
            <div
              key={sign.sign}
              onClick={() => setSelectedSign(selectedSign === sign.sign ? null : sign.sign)}
              className="bg-hover rounded-lg p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">{sign.symbol}</div>
                <h3 className="text-xl font-heading font-bold mb-2 text-primary">
                  {sign.name}
                </h3>
                <p className="text-textSoft text-sm mb-3">{sign.dates}</p>
                <div className="flex justify-center gap-2 text-xs">
                  <span className="bg-primary/20 text-primary px-2 py-1 rounded">
                    {sign.element}
                  </span>
                  <span className="bg-secondary/20 text-secondary px-2 py-1 rounded">
                    {sign.planet}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed View */}
        {selectedSign && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-hover rounded-lg p-8 border border-secondary/20">
              {(() => {
                const sign = zodiacSigns.find(s => s.sign === selectedSign);
                if (!sign) return null;
                
                return (
                  <div className="text-center">
                    <div className="text-8xl mb-6">{sign.symbol}</div>
                    <h2 className="text-4xl font-heading font-bold mb-4 text-secondary">
                      {sign.name}
                    </h2>
                    <p className="text-textSoft mb-6">{sign.dates}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div className="text-left">
                        <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                          Key Traits
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {sign.traits.map((trait, index) => (
                            <span
                              key={index}
                              className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-left">
                        <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                          Element & Ruling Planet
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-secondary">Element:</span>
                            <span className="bg-primary/20 text-primary px-3 py-1 rounded">
                              {sign.element}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-secondary">Planet:</span>
                            <span className="bg-secondary/20 text-secondary px-3 py-1 rounded">
                              {sign.planet}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-left">
                      <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                        Description
                      </h3>
                      <p className="text-textSoft leading-relaxed text-lg">
                        {sign.description}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Link
            href="/horoscope"
            className="bg-primary hover:bg-primary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg inline-block"
          >
            🔭 Get My Personalized Horoscope
          </Link>
        </div>
      </div>
    </div>
  );
}
