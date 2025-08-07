'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const astrologyTopics = [
  {
    id: 'basics',
    title: 'Astrology Basics',
    icon: '⭐',
    description: 'Fundamental concepts of Vedic astrology',
    content: [
      {
        title: 'What is Vedic Astrology?',
        content: 'Vedic astrology, also known as Jyotish, is an ancient Indian system of astrology that has been practiced for over 5,000 years. It is based on the belief that the positions of celestial bodies at the time of birth influence a person\'s life and destiny.'
      },
      {
        title: 'The 12 Zodiac Signs',
        content: 'The zodiac is divided into 12 signs, each representing different personality traits and characteristics. These signs are based on the position of the sun at the time of birth.'
      },
      {
        title: 'The Four Elements',
        content: 'Each zodiac sign is associated with one of four elements: Fire (Aries, Leo, Sagittarius), Earth (Taurus, Virgo, Capricorn), Air (Gemini, Libra, Aquarius), and Water (Cancer, Scorpio, Pisces).'
      }
    ]
  },
  {
    id: 'planets',
    title: 'Planets & Their Influence',
    icon: '🪐',
    description: 'Understanding planetary energies',
    content: [
      {
        title: 'The Sun (Surya)',
        content: 'The Sun represents the soul, ego, and father. It governs leadership, authority, and vitality. A strong Sun in your chart indicates confidence and leadership qualities.'
      },
      {
        title: 'The Moon (Chandra)',
        content: 'The Moon represents the mind, emotions, and mother. It governs intuition, creativity, and emotional well-being. The Moon\'s position affects your emotional nature.'
      },
      {
        title: 'Mars (Mangal)',
        content: 'Mars represents energy, courage, and action. It governs physical strength, determination, and the ability to overcome obstacles. Mars is the planet of warriors.'
      },
      {
        title: 'Mercury (Budh)',
        content: 'Mercury represents communication, intelligence, and business. It governs speech, writing, and analytical thinking. Mercury is the planet of learning and trade.'
      },
      {
        title: 'Jupiter (Guru)',
        content: 'Jupiter represents wisdom, knowledge, and spirituality. It governs higher learning, philosophy, and religious inclinations. Jupiter is the planet of teachers and gurus.'
      },
      {
        title: 'Venus (Shukra)',
        content: 'Venus represents love, beauty, and relationships. It governs romance, art, luxury, and material pleasures. Venus is the planet of love and harmony.'
      },
      {
        title: 'Saturn (Shani)',
        content: 'Saturn represents discipline, karma, and lessons. It governs hard work, patience, and life lessons. Saturn teaches us through challenges and restrictions.'
      }
    ]
  },
  {
    id: 'houses',
    title: 'The 12 Houses',
    icon: '🏠',
    description: 'Life areas and their significance',
    content: [
      {
        title: '1st House - Self & Personality',
        content: 'Represents your physical appearance, personality, and how you present yourself to the world. It\'s the house of self-identity and first impressions.'
      },
      {
        title: '2nd House - Wealth & Family',
        content: 'Governs wealth, family, speech, and values. It represents your financial status, family background, and what you value in life.'
      },
      {
        title: '3rd House - Communication & Siblings',
        content: 'Represents communication, siblings, short journeys, and courage. It governs your relationship with brothers and sisters.'
      },
      {
        title: '4th House - Home & Mother',
        content: 'Governs home, mother, property, and emotional foundation. It represents your domestic life and relationship with your mother.'
      },
      {
        title: '5th House - Children & Creativity',
        content: 'Represents children, creativity, romance, and intelligence. It governs your creative talents and relationship with children.'
      },
      {
        title: '6th House - Health & Service',
        content: 'Governs health, enemies, service, and daily work. It represents your approach to work and potential health issues.'
      },
      {
        title: '7th House - Partnership & Marriage',
        content: 'Represents marriage, partnerships, and relationships. It governs your spouse and business partnerships.'
      },
      {
        title: '8th House - Transformation & Mysteries',
        content: 'Governs transformation, death, mysteries, and occult knowledge. It represents deep psychological changes and hidden aspects of life.'
      },
      {
        title: '9th House - Spirituality & Higher Learning',
        content: 'Represents spirituality, higher education, and long journeys. It governs your religious beliefs and relationship with gurus.'
      },
      {
        title: '10th House - Career & Public Image',
        content: 'Governs career, profession, and public reputation. It represents your professional life and how you are seen by society.'
      },
      {
        title: '11th House - Friends & Gains',
        content: 'Represents friends, social groups, and income. It governs your social circle and financial gains.'
      },
      {
        title: '12th House - Spirituality & Losses',
        content: 'Governs spirituality, losses, foreign lands, and hidden enemies. It represents your spiritual journey and subconscious mind.'
      }
    ]
  },
  {
    id: 'elements',
    title: 'Elements & Their Qualities',
    icon: '🔥',
    description: 'Understanding the four elements',
    content: [
      {
        title: 'Fire Signs (Aries, Leo, Sagittarius)',
        content: 'Fire signs are passionate, energetic, and enthusiastic. They are natural leaders who inspire others with their warmth and creativity. They need freedom and independence.'
      },
      {
        title: 'Earth Signs (Taurus, Virgo, Capricorn)',
        content: 'Earth signs are practical, reliable, and grounded. They are hardworking and value stability and security. They are excellent at building and maintaining structures.'
      },
      {
        title: 'Air Signs (Gemini, Libra, Aquarius)',
        content: 'Air signs are intellectual, communicative, and social. They are great thinkers and communicators who value mental stimulation and variety.'
      },
      {
        title: 'Water Signs (Cancer, Scorpio, Pisces)',
        content: 'Water signs are emotional, intuitive, and compassionate. They are deeply feeling and have strong psychic abilities. They value emotional connections.'
      }
    ]
  }
];

export default function LearnPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-charcoal text-textMain">
      {/* Header */}
      <div className="bg-mystical-gradient py-6">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-secondary hover:text-primary transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-center mt-8 mystical-glow">
            📖 Learn Astrology
          </h1>
          <p className="text-textSoft text-center mt-4 text-lg">
            Master the ancient wisdom of Vedic astrology
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {astrologyTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                className="bg-hover rounded-lg p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{topic.icon}</div>
                  <h3 className="text-xl font-heading font-bold mb-2 text-primary">
                    {topic.title}
                  </h3>
                  <p className="text-textSoft text-sm">
                    {topic.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Content */}
          {selectedTopic && (
            <div className="bg-hover rounded-lg p-8 border border-secondary/20 mb-8">
              {(() => {
                const topic = astrologyTopics.find(t => t.id === selectedTopic);
                if (!topic) return null;
                
                return (
                  <div>
                    <div className="text-center mb-8">
                      <div className="text-6xl mb-4">{topic.icon}</div>
                      <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
                        {topic.title}
                      </h2>
                      <p className="text-textSoft text-lg">
                        {topic.description}
                      </p>
                    </div>
                    
                    <div className="space-y-8">
                      {topic.content.map((item, index) => (
                        <div key={index} className="bg-charcoal rounded-lg p-6 border border-primary/20">
                          <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                            {item.title}
                          </h3>
                          <p className="text-textSoft leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Quick Tips Section */}
          <div className="bg-hover rounded-lg p-8 border border-primary/20 mb-8">
            <h2 className="text-3xl font-heading font-bold text-center mb-8 text-primary">
              💡 Quick Astrology Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-charcoal rounded-lg p-6 border border-secondary/20">
                <h3 className="text-lg font-heading font-bold mb-3 text-secondary">
                  🌅 Best Time for Activities
                </h3>
                <ul className="text-textSoft space-y-2 text-sm">
                  <li>• Start new ventures during waxing moon</li>
                  <li>• Meditate during Brahma Muhurta (4:30-5:30 AM)</li>
                  <li>• Avoid important decisions during Rahu Kaal</li>
                  <li>• Perform spiritual practices during sunrise</li>
                </ul>
              </div>
              <div className="bg-charcoal rounded-lg p-6 border border-secondary/20">
                <h3 className="text-lg font-heading font-bold mb-3 text-secondary">
                  🎨 Lucky Colors by Element
                </h3>
                <ul className="text-textSoft space-y-2 text-sm">
                  <li>• Fire Signs: Red, Orange, Yellow</li>
                  <li>• Earth Signs: Green, Brown, Black</li>
                  <li>• Air Signs: Blue, White, Gray</li>
                  <li>• Water Signs: Blue, Purple, Silver</li>
                </ul>
              </div>
              <div className="bg-charcoal rounded-lg p-6 border border-secondary/20">
                <h3 className="text-lg font-heading font-bold mb-3 text-secondary">
                  💎 Gemstones for Planets
                </h3>
                <ul className="text-textSoft space-y-2 text-sm">
                  <li>• Sun: Ruby</li>
                  <li>• Moon: Pearl</li>
                  <li>• Mars: Red Coral</li>
                  <li>• Mercury: Emerald</li>
                  <li>• Jupiter: Yellow Sapphire</li>
                  <li>• Venus: Diamond</li>
                  <li>• Saturn: Blue Sapphire</li>
                </ul>
              </div>
              <div className="bg-charcoal rounded-lg p-6 border border-secondary/20">
                <h3 className="text-lg font-heading font-bold mb-3 text-secondary">
                  🕉️ Daily Practices
                </h3>
                <ul className="text-textSoft space-y-2 text-sm">
                  <li>• Chant mantras during sunrise</li>
                  <li>• Wear gemstones on specific fingers</li>
                  <li>• Practice yoga based on your element</li>
                  <li>• Meditate on your ruling planet</li>
                  <li>• Follow lunar calendar for rituals</li>
                </ul>
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
              href="/zodiac"
              className="bg-secondary hover:bg-secondary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg inline-block mr-4"
            >
              ♈ Know My Zodiac
            </Link>
            <Link
              href="/panchang"
              className="bg-primary hover:bg-primary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg inline-block"
            >
              🗓️ Today's Panchang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
