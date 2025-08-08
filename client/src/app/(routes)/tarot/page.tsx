'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apiService } from '@/api/apiService';
import type { TarotReading } from '@/api/config';

export default function TarotPage() {
  const [reading, setReading] = useState<TarotReading | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const drawCards = async () => {
    setIsReading(true);
    setError(null);
    setReading(null);
    
    try {
      const response = await apiService.getTarotReading();
      
      if (response.success && response.data) {
        setReading(response.data);
      } else {
        setError(response.error || 'Failed to get tarot reading');
      }
    } catch (err) {
      setError('Failed to get tarot reading');
      console.error('Error getting tarot reading:', err);
    } finally {
      setIsReading(false);
    }
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
            🔮 Daily Tarot Reading
          </h1>
          <p className="text-textSoft text-center mt-4 text-lg">
            Discover what the cards reveal about your path
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {!reading ? (
            <div className="text-center">
              <div className="bg-hover rounded-lg p-8 border border-primary/20 mb-8">
                <div className="text-6xl mb-6">🔮</div>
                <h2 className="text-3xl font-heading font-bold mb-4 text-secondary">
                  Ready for Your Reading?
                </h2>
                <p className="text-textSoft mb-8 text-lg">
                  The tarot cards are ready to reveal insights about your past, present, and future. 
                  Focus on your question and let the universe guide you.
                </p>
                
                {error && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                    <p className="text-red-400">{error}</p>
                  </div>
                )}

                <button
                  onClick={drawCards}
                  disabled={isReading}
                  className="bg-primary hover:bg-primary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isReading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-charcoal mr-2"></div>
                      Shuffling Cards...
                    </span>
                  ) : (
                    '🔮 Draw Three Cards'
                  )}
                </button>
              </div>

              {/* Tarot Tips */}
              <div className="bg-hover rounded-lg p-6 border border-secondary/20">
                <h3 className="text-xl font-heading font-bold mb-4 text-secondary">
                  💡 Tarot Reading Tips
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-textSoft">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Before Reading</h4>
                    <ul className="space-y-1">
                      <li>• Clear your mind and focus</li>
                      <li>• Formulate a specific question</li>
                      <li>• Trust your intuition</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">During Reading</h4>
                    <ul className="space-y-1">
                      <li>• Pay attention to your feelings</li>
                      <li>• Consider both upright and reversed meanings</li>
                      <li>• Look for patterns and connections</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Reading Results */}
              <div className="bg-hover rounded-lg p-8 border border-secondary/20">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🔮</div>
                  <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
                    Your Tarot Reading
                  </h2>
                  <p className="text-textSoft">
                    {reading.message}
                  </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {reading.cards.map((card, index) => (
                    <div key={index} className="bg-charcoal rounded-lg p-6 border border-primary/20 text-center">
                      <div className="text-4xl mb-4 transform transition-transform duration-300 hover:scale-110">
                        {card.isReversed ? '🔄' : card.image}
                      </div>
                      <h3 className="text-xl font-heading font-bold mb-2 text-primary">
                        {card.name}
                        {card.isReversed && <span className="text-red-400 ml-2">(Reversed)</span>}
                      </h3>
                      <p className="text-sm text-textSoft mb-2 font-semibold">
                        {card.position}
                      </p>
                      <div className="text-xs text-textSoft">
                        <p className="mb-2">
                          <span className="font-semibold text-secondary">Meaning:</span><br />
                          {card.isReversed ? card.reversed : card.meaning}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interpretation */}
                {reading.interpretation && (
                  <div className="bg-charcoal rounded-lg p-6 border border-primary/20">
                    <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                      💫 Overall Interpretation
                    </h3>
                    <p className="text-textSoft leading-relaxed">
                      {reading.interpretation}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="text-center space-x-4">
                <button
                  onClick={() => {
                    setReading(null);
                    setError(null);
                  }}
                  className="bg-secondary hover:bg-secondary/80 text-charcoal font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  🔮 New Reading
                </button>
                <Link
                  href="/horoscope"
                  className="bg-primary hover:bg-primary/80 text-charcoal font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Get My Horoscope
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
