'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiService } from '@/api/apiService';
import type { Mantra } from '@/api/config';

export default function MantrasPage() {
  const [mantras, setMantras] = useState<Mantra[]>([]);
  const [selectedMantra, setSelectedMantra] = useState<Mantra | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchMantras = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await apiService.getMantras(selectedCategory === 'all' ? undefined : selectedCategory);
        
        if (response.success && response.data) {
          setMantras(response.data);
        } else {
          setError(response.error || 'Failed to fetch mantras');
        }
      } catch (err) {
        setError('Failed to fetch mantras');
        console.error('Error fetching mantras:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMantras();
  }, [selectedCategory]);

  const categories = [
    { value: 'all', label: 'All Mantras', icon: '🕉️' },
    { value: 'planetary', label: 'Planetary', icon: '🪐' },
    { value: 'zodiac', label: 'Zodiac', icon: '♈' },
    { value: 'healing', label: 'Healing', icon: '🌿' },
    { value: 'prosperity', label: 'Prosperity', icon: '💰' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal text-textMain flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textSoft">Loading mantras...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-charcoal text-textMain flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-primary hover:bg-primary/80 text-charcoal font-bold py-2 px-4 rounded-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedCategory === category.value
                      ? 'bg-primary text-charcoal font-semibold'
                      : 'bg-hover text-textSoft hover:text-primary border border-primary/20'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mantras Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {mantras.map((mantra) => (
              <div
                key={mantra.id}
                onClick={() => setSelectedMantra(selectedMantra?.id === mantra.id ? null : mantra)}
                className="bg-hover rounded-lg p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🕉️</div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">
                    {mantra.name}
                  </h3>
                  <span className="bg-secondary/20 text-secondary px-2 py-1 rounded text-sm">
                    {mantra.category}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-secondary mb-1">Sanskrit</h4>
                    <p className="text-textSoft text-sm leading-relaxed">{mantra.sanskrit}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-secondary mb-1">Transliteration</h4>
                    <p className="text-textSoft text-sm">{mantra.transliteration}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-secondary mb-1">Meaning</h4>
                    <p className="text-textSoft text-sm">{mantra.meaning}</p>
                  </div>

                  <div className="flex justify-between text-xs text-textSoft">
                    <span>Best Time: {mantra.bestTime}</span>
                    <span>{mantra.repetitions} times</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed View */}
          {selectedMantra && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-hover rounded-lg p-8 border border-secondary/20">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🕉️</div>
                  <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
                    {selectedMantra.name}
                  </h2>
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                    {selectedMantra.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                      Sanskrit Text
                    </h3>
                    <div className="bg-charcoal rounded-lg p-4 border border-primary/20">
                      <p className="text-lg text-center leading-relaxed">{selectedMantra.sanskrit}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                      Transliteration
                    </h3>
                    <div className="bg-charcoal rounded-lg p-4 border border-primary/20">
                      <p className="text-lg text-center">{selectedMantra.transliteration}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                    Meaning & Benefits
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-secondary mb-2">Meaning</h4>
                      <p className="text-textSoft">{selectedMantra.meaning}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-secondary mb-2">Benefits</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedMantra.benefits.map((benefit, index) => (
                          <li key={index} className="text-textSoft text-sm">{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-charcoal rounded-lg border border-secondary/20">
                    <h4 className="text-lg font-semibold text-secondary mb-2">Best Time</h4>
                    <p className="text-primary">{selectedMantra.bestTime}</p>
                  </div>
                  <div className="text-center p-4 bg-charcoal rounded-lg border border-secondary/20">
                    <h4 className="text-lg font-semibold text-secondary mb-2">Repetitions</h4>
                    <p className="text-primary">{selectedMantra.repetitions} times</p>
                  </div>
                  <div className="text-center p-4 bg-charcoal rounded-lg border border-secondary/20">
                    <h4 className="text-lg font-semibold text-secondary mb-2">Category</h4>
                    <p className="text-primary">{selectedMantra.category}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center mt-12">
            <Link
              href="/horoscope"
              className="bg-primary hover:bg-primary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg inline-block"
            >
              🔭 Get My Horoscope
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
