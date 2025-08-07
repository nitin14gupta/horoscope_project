'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const remedies = [
  {
    category: 'Planetary Gemstones',
    icon: '💎',
    items: [
      {
        name: 'Ruby (Manik)',
        planet: 'Sun',
        color: 'Red',
        finger: 'Ring finger',
        day: 'Sunday',
        benefits: 'Leadership, authority, father, government, success',
        price: 'High',
        alternatives: 'Red coral, garnet',
        mantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः'
      },
      {
        name: 'Pearl (Moti)',
        planet: 'Moon',
        color: 'White',
        finger: 'Little finger',
        day: 'Monday',
        benefits: 'Mind, emotions, mother, peace, intuition',
        price: 'High',
        alternatives: 'White coral, moonstone',
        mantra: 'ॐ श्रां श्रीं श्रौं सः चन्द्राय नमः'
      },
      {
        name: 'Red Coral (Moonga)',
        planet: 'Mars',
        color: 'Red',
        finger: 'Ring finger',
        day: 'Tuesday',
        benefits: 'Courage, energy, brother, property, strength',
        price: 'Medium',
        alternatives: 'Ruby, garnet',
        mantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः'
      },
      {
        name: 'Emerald (Panna)',
        planet: 'Mercury',
        color: 'Green',
        finger: 'Little finger',
        day: 'Wednesday',
        benefits: 'Communication, business, intelligence, speech',
        price: 'High',
        alternatives: 'Green jade, peridot',
        mantra: 'ॐ बुं बुधाय नमः'
      },
      {
        name: 'Yellow Sapphire (Pukhraj)',
        planet: 'Jupiter',
        color: 'Yellow',
        finger: 'Index finger',
        day: 'Thursday',
        benefits: 'Wisdom, children, guru, spirituality, wealth',
        price: 'Very High',
        alternatives: 'Yellow topaz, citrine',
        mantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः'
      },
      {
        name: 'Diamond (Heera)',
        planet: 'Venus',
        color: 'White/Colorless',
        finger: 'Middle finger',
        day: 'Friday',
        benefits: 'Love, beauty, luxury, wife, arts',
        price: 'Very High',
        alternatives: 'White sapphire, zircon',
        mantra: 'ॐ श्रीं शुक्राय नमः'
      },
      {
        name: 'Blue Sapphire (Neelam)',
        planet: 'Saturn',
        color: 'Blue',
        finger: 'Middle finger',
        day: 'Saturday',
        benefits: 'Discipline, karma, lessons, patience',
        price: 'Very High',
        alternatives: 'Blue topaz, amethyst',
        mantra: 'ॐ श्रां श्रीं श्रौं सः शनैश्चराय नमः'
      }
    ]
  },
  {
    category: 'Zodiac Remedies',
    icon: '♈',
    items: [
      {
        name: 'Aries Remedies',
        planet: 'Mars',
        gemstone: 'Red Coral',
        color: 'Red',
        deity: 'Lord Hanuman',
        day: 'Tuesday',
        remedies: [
          'Chant Hanuman Chalisa daily',
          'Donate red items on Tuesday',
          'Fast on Tuesday',
          'Visit Hanuman temple',
          'Wear red clothes on Tuesday'
        ]
      },
      {
        name: 'Taurus Remedies',
        planet: 'Venus',
        gemstone: 'Diamond',
        color: 'White',
        deity: 'Goddess Lakshmi',
        day: 'Friday',
        remedies: [
          'Chant Lakshmi mantras',
          'Donate white items on Friday',
          'Fast on Friday',
          'Visit Lakshmi temple',
          'Wear white clothes on Friday'
        ]
      },
      {
        name: 'Gemini Remedies',
        planet: 'Mercury',
        gemstone: 'Emerald',
        color: 'Green',
        deity: 'Lord Ganesha',
        day: 'Wednesday',
        remedies: [
          'Chant Ganesh mantras',
          'Donate green items on Wednesday',
          'Fast on Wednesday',
          'Visit Ganesh temple',
          'Wear green clothes on Wednesday'
        ]
      }
    ]
  },
  {
    category: 'General Remedies',
    icon: '🕉️',
    items: [
      {
        name: 'Career Problems',
        solutions: [
          'Chant Gayatri Mantra 108 times daily',
          'Donate books to students',
          'Fast on Thursday',
          'Visit Saraswati temple',
          'Wear yellow clothes on Thursday'
        ]
      },
      {
        name: 'Health Issues',
        solutions: [
          'Chant Mahamrityunjaya Mantra',
          'Donate medicines to poor',
          'Fast on Monday',
          'Visit Shiva temple',
          'Wear white clothes on Monday'
        ]
      },
      {
        name: 'Financial Problems',
        solutions: [
          'Chant Lakshmi mantras',
          'Donate food to poor',
          'Fast on Friday',
          'Visit Lakshmi temple',
          'Wear yellow clothes on Friday'
        ]
      },
      {
        name: 'Relationship Issues',
        solutions: [
          'Chant Venus mantras',
          'Donate sweets to couples',
          'Fast on Friday',
          'Visit Venus temple',
          'Wear pink clothes on Friday'
        ]
      }
    ]
  }
];

export default function RemediesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-charcoal text-textMain">
      {/* Header */}
      <div className="bg-mystical-gradient py-6">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-secondary hover:text-primary transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-center mt-8 mystical-glow">
            💎 Gemstones & Remedies
          </h1>
          <p className="text-textSoft text-center mt-4 text-lg">
            Astrological solutions for life's challenges
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {remedies.map((category) => (
              <div
                key={category.category}
                onClick={() => setSelectedCategory(selectedCategory === category.category ? null : category.category)}
                className="bg-hover rounded-lg p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-heading font-bold mb-2 text-primary">
                    {category.category}
                  </h3>
                  <p className="text-textSoft text-sm">
                    {category.items.length} items available
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Content */}
          {selectedCategory && (
            <div className="bg-hover rounded-lg p-8 border border-secondary/20 mb-8">
              {(() => {
                const category = remedies.find(c => c.category === selectedCategory);
                if (!category) return null;
                
                return (
                  <div>
                    <div className="text-center mb-8">
                      <div className="text-6xl mb-4">{category.icon}</div>
                      <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
                        {category.category}
                      </h2>
                    </div>
                    
                    <div className="space-y-8">
                      {category.items.map((item, index) => (
                        <div key={index} className="bg-charcoal rounded-lg p-6 border border-primary/20">
                          <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                            {item.name}
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {item.planet && (
                              <div>
                                <h4 className="text-lg font-heading font-bold mb-2 text-secondary">
                                  Planetary Details
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <p><span className="text-primary">Planet:</span> {item.planet}</p>
                                  <p><span className="text-primary">Color:</span> {item.color}</p>
                                  <p><span className="text-primary">Finger:</span> {item.finger}</p>
                                  <p><span className="text-primary">Day:</span> {item.day}</p>
                                  <p><span className="text-primary">Price:</span> {item.price}</p>
                                  <p><span className="text-primary">Alternatives:</span> {item.alternatives}</p>
                                </div>
                              </div>
                            )}
                            
                            {item.benefits && (
                              <div>
                                <h4 className="text-lg font-heading font-bold mb-2 text-secondary">
                                  Benefits
                                </h4>
                                <p className="text-textSoft text-sm">
                                  {item.benefits}
                                </p>
                              </div>
                            )}
                            
                            {item.mantra && (
                              <div>
                                <h4 className="text-lg font-heading font-bold mb-2 text-secondary">
                                  Mantra
                                </h4>
                                <p className="text-textMain font-sans">
                                  {item.mantra}
                                </p>
                              </div>
                            )}
                            
                            {item.deity && (
                              <div>
                                <h4 className="text-lg font-heading font-bold mb-2 text-secondary">
                                  Deity
                                </h4>
                                <p className="text-textSoft text-sm">
                                  {item.deity}
                                </p>
                              </div>
                            )}
                          </div>
                          
                          {(item.remedies || item.solutions) && (
                            <div className="mt-6">
                              <h4 className="text-lg font-heading font-bold mb-3 text-secondary">
                                Remedies
                              </h4>
                              <ul className="text-textSoft space-y-2 text-sm">
                                {(item.remedies || item.solutions).map((remedy, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    {remedy}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Gemstone Guidelines */}
          <div className="bg-hover rounded-lg p-8 border border-primary/20 mb-8">
            <h2 className="text-3xl font-heading font-bold text-center mb-8 text-primary">
              📖 Gemstone Guidelines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-charcoal rounded-lg p-6 border border-secondary/20">
                <h3 className="text-lg font-heading font-bold mb-3 text-secondary">
                  💎 How to Wear Gemstones
                </h3>
                <ul className="text-textSoft space-y-2 text-sm">
                  <li>• Consult an astrologer first</li>
                  <li>• Wear on the correct finger</li>
                  <li>• Set in gold or silver ring</li>
                  <li>• Wear on the correct day</li>
                  <li>• Cleanse before wearing</li>
                </ul>
              </div>
              <div className="bg-charcoal rounded-lg p-6 border border-secondary/20">
                <h3 className="text-lg font-heading font-bold mb-3 text-secondary">
                  ⚠️ Precautions
                </h3>
                <ul className="text-textSoft space-y-2 text-sm">
                  <li>• Never wear without consultation</li>
                  <li>• Avoid wearing multiple stones</li>
                  <li>• Remove during sleep</li>
                  <li>• Clean regularly</li>
                  <li>• Store properly when not wearing</li>
                </ul>
              </div>
              <div className="bg-charcoal rounded-lg p-6 border border-secondary/20">
                <h3 className="text-lg font-heading font-bold mb-3 text-secondary">
                  🕉️ Alternative Remedies
                </h3>
                <ul className="text-textSoft space-y-2 text-sm">
                  <li>• Chanting mantras daily</li>
                  <li>• Fasting on specific days</li>
                  <li>• Visiting temples regularly</li>
                  <li>• Donating to charity</li>
                  <li>• Practicing meditation</li>
                </ul>
              </div>
              <div className="bg-charcoal rounded-lg p-6 border border-secondary/20">
                <h3 className="text-lg font-heading font-bold mb-3 text-secondary">
                  🌟 Best Practices
                </h3>
                <ul className="text-textSoft space-y-2 text-sm">
                  <li>• Start with simple remedies</li>
                  <li>• Be consistent with practice</li>
                  <li>• Have faith in the process</li>
                  <li>• Combine with good deeds</li>
                  <li>• Maintain positive attitude</li>
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
              href="/mantras"
              className="bg-secondary hover:bg-secondary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg inline-block mr-4"
            >
              🕉️ Daily Mantras
            </Link>
            <Link
              href="/learn"
              className="bg-primary hover:bg-primary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg inline-block"
            >
              📖 Learn Astrology
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
