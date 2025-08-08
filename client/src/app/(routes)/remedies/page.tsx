'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiService } from '@/api/apiService';
import type { Remedy } from '@/api/config';

export default function RemediesPage() {
  const [remedies, setRemedies] = useState<Remedy[]>([]);
  const [selectedRemedy, setSelectedRemedy] = useState<Remedy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchRemedies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await apiService.getRemedies(selectedCategory === 'all' ? undefined : selectedCategory);
        
        if (response.success && response.data) {
          setRemedies(response.data);
        } else {
          setError(response.error || 'Failed to fetch remedies');
        }
      } catch (err) {
        setError('Failed to fetch remedies');
        console.error('Error fetching remedies:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRemedies();
  }, [selectedCategory]);

  const categories = [
    { value: 'all', label: 'All Remedies', icon: '🕉️' },
    { value: 'planetary', label: 'Planetary', icon: '🪐' },
    { value: 'zodiac', label: 'Zodiac', icon: '♈' },
    { value: 'general', label: 'General', icon: '🌿' },
    { value: 'gemstones', label: 'Gemstones', icon: '💎' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal text-textMain flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textSoft">Loading remedies...</p>
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
            💎 Gemstones & Remedies
          </h1>
          <p className="text-textSoft text-center mt-4 text-lg">
            Ancient wisdom for modern problems
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

          {/* Remedies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {remedies.map((remedy) => (
              <div
                key={remedy.id}
                onClick={() => setSelectedRemedy(selectedRemedy?.id === remedy.id ? null : remedy)}
                className="bg-hover rounded-lg p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">💎</div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">
                    {remedy.name}
                  </h3>
                  <span className="bg-secondary/20 text-secondary px-2 py-1 rounded text-sm">
                    {remedy.category}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-secondary mb-1">Description</h4>
                    <p className="text-textSoft text-sm">{remedy.description}</p>
                  </div>

                  {remedy.solutions && remedy.solutions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-secondary mb-1">Solutions</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {remedy.solutions.slice(0, 2).map((solution, index) => (
                          <li key={index} className="text-textSoft text-xs">{solution}</li>
                        ))}
                        {remedy.solutions.length > 2 && (
                          <li className="text-textSoft text-xs">+{remedy.solutions.length - 2} more...</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {remedy.gemstones && remedy.gemstones.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-secondary mb-1">Gemstones</h4>
                      <div className="flex flex-wrap gap-1">
                        {remedy.gemstones.slice(0, 2).map((gemstone, index) => (
                          <span key={index} className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
                            {gemstone.name}
                          </span>
                        ))}
                        {remedy.gemstones.length > 2 && (
                          <span className="text-textSoft text-xs">+{remedy.gemstones.length - 2} more...</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Detailed View */}
          {selectedRemedy && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-hover rounded-lg p-8 border border-secondary/20">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">💎</div>
                  <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
                    {selectedRemedy.name}
                  </h2>
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                    {selectedRemedy.category}
                  </span>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                    Description
                  </h3>
                  <p className="text-textSoft leading-relaxed">
                    {selectedRemedy.description}
                  </p>
                </div>

                {selectedRemedy.solutions && selectedRemedy.solutions.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                      Solutions & Remedies
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      {selectedRemedy.solutions.map((solution, index) => (
                        <li key={index} className="text-textSoft">{solution}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedRemedy.gemstones && selectedRemedy.gemstones.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                      Recommended Gemstones
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedRemedy.gemstones.map((gemstone, index) => (
                        <div key={index} className="bg-charcoal rounded-lg p-4 border border-primary/20">
                          <h4 className="text-lg font-semibold text-primary mb-2">{gemstone.name}</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-secondary font-semibold">Planet:</span> {gemstone.planet}
                            </div>
                            <div>
                              <span className="text-secondary font-semibold">Color:</span> {gemstone.color}
                            </div>
                            <div>
                              <span className="text-secondary font-semibold">Finger:</span> {gemstone.finger}
                            </div>
                            <div>
                              <span className="text-secondary font-semibold">Day:</span> {gemstone.day}
                            </div>
                            <div>
                              <span className="text-secondary font-semibold">Benefits:</span> {gemstone.benefits}
                            </div>
                            <div>
                              <span className="text-secondary font-semibold">Price:</span> {gemstone.price}
                            </div>
                            <div>
                              <span className="text-secondary font-semibold">Alternatives:</span> {gemstone.alternatives}
                            </div>
                            <div>
                              <span className="text-secondary font-semibold">Mantra:</span> {gemstone.mantra}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedRemedy.mantras && selectedRemedy.mantras.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                      Associated Mantras
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      {selectedRemedy.mantras.map((mantra, index) => (
                        <li key={index} className="text-textSoft">{mantra}</li>
                      ))}
                    </ul>
                  </div>
                )}
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
