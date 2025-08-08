'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiService } from '@/api/apiService';
import type { ZodiacSign } from '@/api/config';

export default function ZodiacPage() {
  const [zodiacSigns, setZodiacSigns] = useState<ZodiacSign[]>([]);
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchZodiacSigns = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await apiService.getZodiacSigns();
        
        if (response.success && response.data) {
          setZodiacSigns(response.data);
        } else {
          setError(response.error || 'Failed to fetch zodiac signs');
        }
      } catch (err) {
        setError('Failed to fetch zodiac signs');
        console.error('Error fetching zodiac signs:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchZodiacSigns();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal text-textMain flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textSoft">Loading zodiac signs...</p>
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
              key={sign.id}
              onClick={() => setSelectedSign(selectedSign === sign.id ? null : sign.id)}
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
                    {sign.rulingPlanet}
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
                const sign = zodiacSigns.find(s => s.id === selectedSign);
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
                              {sign.rulingPlanet}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {sign.luckyColors && sign.luckyColors.length > 0 && (
                      <div className="text-left mb-6">
                        <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                          Lucky Colors
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {sign.luckyColors.map((color, index) => (
                            <span
                              key={index}
                              className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm"
                            >
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {sign.luckyNumbers && sign.luckyNumbers.length > 0 && (
                      <div className="text-left mb-6">
                        <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                          Lucky Numbers
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {sign.luckyNumbers.map((number, index) => (
                            <span
                              key={index}
                              className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm"
                            >
                              {number}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
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
