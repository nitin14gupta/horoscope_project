'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const mantras = [
  {
    category: 'Planetary Mantras',
    icon: '🪐',
    mantras: [
      {
        name: 'Gayatri Mantra',
        sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
        transliteration: 'Om Bhur Bhuvaḥ Svaḥ Tat Savitur Vareṇyaṃ Bhargo Devasya Dhīmahi Dhiyo Yo Naḥ Pracodayāt',
        meaning: 'Universal prayer for enlightenment and wisdom',
        benefits: 'Removes obstacles, brings success, enhances intelligence',
        bestTime: 'Sunrise',
        repetitions: '108 times'
      },
      {
        name: 'Mahamrityunjaya Mantra',
        sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्',
        transliteration: 'Om Tryambakaṃ Yajāmahe Sugandhiṃ Puṣṭi-vardhanam Urvārukam Iva Bandhanān Mṛtyor Mukṣīya Māmṛtāt',
        meaning: 'Prayer to Lord Shiva for liberation from death',
        benefits: 'Health, longevity, protection from accidents',
        bestTime: 'Early morning or evening',
        repetitions: '108 times'
      },
      {
        name: 'Ganesh Mantra',
        sanskrit: 'ॐ गं गणपतये नमः',
        transliteration: 'Om Gaṃ Gaṇapataye Namaḥ',
        meaning: 'Salutations to Lord Ganesha',
        benefits: 'Removes obstacles, brings success in new ventures',
        bestTime: 'Morning',
        repetitions: '108 times'
      }
    ]
  },
  {
    category: 'Zodiac Specific Mantras',
    icon: '♈',
    mantras: [
      {
        name: 'Aries - Mars Mantra',
        sanskrit: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः',
        transliteration: 'Om Krāṃ Krīṃ Krauṃ Saḥ Bhaumāya Namaḥ',
        meaning: 'Prayer to Mars for courage and energy',
        benefits: 'Increases courage, physical strength, leadership',
        bestTime: 'Tuesday morning',
        repetitions: '108 times'
      },
      {
        name: 'Taurus - Venus Mantra',
        sanskrit: 'ॐ श्रीं शुक्राय नमः',
        transliteration: 'Om Śrīṃ Śukrāya Namaḥ',
        meaning: 'Prayer to Venus for love and beauty',
        benefits: 'Enhances love life, artistic talents, material comforts',
        bestTime: 'Friday morning',
        repetitions: '108 times'
      },
      {
        name: 'Gemini - Mercury Mantra',
        sanskrit: 'ॐ बुं बुधाय नमः',
        transliteration: 'Om Buṃ Budhāya Namaḥ',
        meaning: 'Prayer to Mercury for intelligence',
        benefits: 'Improves communication, business success, learning',
        bestTime: 'Wednesday morning',
        repetitions: '108 times'
      }
    ]
  },
  {
    category: 'Healing Mantras',
    icon: '🕉️',
    mantras: [
      {
        name: 'Healing Mantra',
        sanskrit: 'ॐ नमः शिवाय',
        transliteration: 'Om Namaḥ Śivāya',
        meaning: 'Salutations to Lord Shiva',
        benefits: 'Physical and mental healing, peace of mind',
        bestTime: 'Any time',
        repetitions: '108 times'
      },
      {
        name: 'Peace Mantra',
        sanskrit: 'ॐ शान्तिः शान्तिः शान्तिः',
        transliteration: 'Om Śāntiḥ Śāntiḥ Śāntiḥ',
        meaning: 'Peace, peace, peace',
        benefits: 'Inner peace, stress relief, harmony',
        bestTime: 'Evening',
        repetitions: '21 times'
      },
      {
        name: 'Prosperity Mantra',
        sanskrit: 'ॐ श्री महालक्ष्म्यै नमः',
        transliteration: 'Om Śrī Mahālakṣmyai Namaḥ',
        meaning: 'Salutations to Goddess Lakshmi',
        benefits: 'Wealth, prosperity, abundance',
        bestTime: 'Friday morning',
        repetitions: '108 times'
      }
    ]
  }
];

export default function MantrasPage() {
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
            🕉️ Daily Mantras
          </h1>
          <p className="text-textSoft text-center mt-4 text-lg">
            Sacred chants for spiritual growth and well-being
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {mantras.map((category) => (
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
                    {category.mantras.length} mantras available
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Mantras */}
          {selectedCategory && (
            <div className="bg-hover rounded-lg p-8 border border-secondary/20 mb-8">
              {(() => {
                const category = mantras.find(c => c.category === selectedCategory);
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
                      {category.mantras.map((mantra, index) => (
                        <div key={index} className="bg-charcoal rounded-lg p-6 border border-primary/20">
                          <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                            {mantra.name}
                          </h3>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-lg font-heading font-bold mb-2 text-secondary">
                                Sanskrit Text
                              </h4>
                              <p className="text-textMain text-lg leading-relaxed font-sans">
                                {mantra.sanskrit}
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-heading font-bold mb-2 text-secondary">
                                Transliteration
                              </h4>
                              <p className="text-textSoft text-lg leading-relaxed">
                                {mantra.transliteration}
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-heading font-bold mb-2 text-secondary">
                                Meaning
                              </h4>
                              <p className="text-textSoft">
                                {mantra.meaning}
                              </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <h4 className="text-lg font-heading font-bold mb-2 text-secondary">
                                  Benefits
                                </h4>
                                <p className="text-textSoft text-sm">
                                  {mantra.benefits}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-lg font-heading font-bold mb-2 text-secondary">
                                  Best Time
                                </h4>
                                <p className="text-textSoft text-sm">
                                  {mantra.bestTime}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-lg font-heading font-bold mb-2 text-secondary">
                                  Repetitions
                                </h4>
                                <p className="text-textSoft text-sm">
                                  {mantra.repetitions}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Mantra Guidelines */}
          <div className="bg-hover rounded-lg p-8 border border-primary/20 mb-8">
            <h2 className="text-3xl font-heading font-bold text-center mb-8 text-primary">
              📖 Mantra Guidelines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-charcoal rounded-lg p-6 border border-secondary/20">
                <h3 className="text-lg font-heading font-bold mb-3 text-secondary">
                  🕉️ How to Chant
                </h3>
                <ul className="text-textSoft space-y-2 text-sm">
                  <li>• Sit in a comfortable position</li>
                  <li>• Close your eyes and focus</li>
                  <li>• Use a mala (rosary) for counting</li>
                  <li>• Chant with devotion and faith</li>
                  <li>• Maintain consistent timing</li>
                </ul>
              </div>
              <div className="bg-charcoal rounded-lg p-6 border border-secondary/20">
                <h3 className="text-lg font-heading font-bold mb-3 text-secondary">
                  🌅 Best Practices
                </h3>
                <ul className="text-textSoft space-y-2 text-sm">
                  <li>• Chant during Brahma Muhurta (4:30-5:30 AM)</li>
                  <li>• Face east while chanting</li>
                  <li>• Use pure water for purification</li>
                  <li>• Maintain celibacy for better results</li>
                  <li>• Follow a vegetarian diet</li>
                </ul>
              </div>
              <div className="bg-charcoal rounded-lg p-6 border border-secondary/20">
                <h3 className="text-lg font-heading font-bold mb-3 text-secondary">
                  🎯 Benefits of Mantra Chanting
                </h3>
                <ul className="text-textSoft space-y-2 text-sm">
                  <li>• Reduces stress and anxiety</li>
                  <li>• Improves concentration</li>
                  <li>• Enhances spiritual growth</li>
                  <li>• Brings peace of mind</li>
                  <li>• Removes negative energies</li>
                </ul>
              </div>
              <div className="bg-charcoal rounded-lg p-6 border border-secondary/20">
                <h3 className="text-lg font-heading font-bold mb-3 text-secondary">
                  ⚠️ Important Notes
                </h3>
                <ul className="text-textSoft space-y-2 text-sm">
                  <li>• Start with simple mantras</li>
                  <li>• Be patient with results</li>
                  <li>• Maintain regular practice</li>
                  <li>• Respect the sacred nature</li>
                  <li>• Seek guidance if needed</li>
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
              href="/learn"
              className="bg-secondary hover:bg-secondary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg inline-block mr-4"
            >
              📖 Learn Astrology
            </Link>
            <Link
              href="/panchang"
              className="bg-primary hover:bg-primary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg inline-block"
            >
              🗓️ Today&apos;s Panchang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
