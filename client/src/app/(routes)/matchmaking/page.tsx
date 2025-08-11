'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiService } from '@/api/apiService';
import type { ZodiacSign, MatchmakingRequest, MatchmakingResponse } from '@/api/config';

export default function MatchmakingPage() {
  const [zodiacSigns, setZodiacSigns] = useState<ZodiacSign[]>([]);
  const [sign1, setSign1] = useState('');
  const [sign2, setSign2] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [compatibilityResult, setCompatibilityResult] = useState<MatchmakingResponse | null>(null);

  useEffect(() => {
    const fetchZodiacSigns = async () => {
      try {
        const response = await apiService.getZodiacSigns();
        if (response.success && response.data) {
          setZodiacSigns(response.data);
        } else {
          setError(response.error || 'Failed to fetch zodiac signs');
        }
      } catch (err) {
        setError('Failed to fetch zodiac signs');
        console.error('Error fetching zodiac signs:', err);
      }
    };

    fetchZodiacSigns();
  }, []);

  const handleCheckCompatibility = async () => {
    if (!sign1 || !sign2) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const request: MatchmakingRequest = {
        zodiacSign1: sign1,
        zodiacSign2: sign2
      };

      const response = await apiService.getCompatibility(request);
      
      if (response.success && response.data) {
        setCompatibilityResult(response.data);
        setShowResult(true);
      } else {
        setError(response.error || 'Failed to check compatibility');
      }
    } catch (err) {
      setError('Failed to check compatibility');
      console.error('Error checking compatibility:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 85) return "text-green-400";
    if (score >= 70) return "text-blue-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const getCompatibilityMessage = (score: number) => {
    if (score >= 85) return "Perfect Match! 💕";
    if (score >= 70) return "Great Compatibility! ✨";
    if (score >= 50) return "Good Compatibility! 👍";
    return "Challenging Match ⚠️";
  };

  if (error && !zodiacSigns.length) {
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
            💑 Kundali Match
          </h1>
          <p className="text-textSoft text-center mt-4 text-lg">
            Check compatibility between zodiac signs
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {!showResult ? (
            <div className="bg-hover rounded-lg p-8 border border-primary/20">
              <h2 className="text-3xl font-heading font-bold text-center mb-8 text-secondary">
                🔮 Check Love Compatibility
              </h2>
               
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-textSoft mb-4 text-lg font-semibold">
                    First Person&apos;s Zodiac Sign
                  </label>
                  <select
                    value={sign1}
                    onChange={(e) => setSign1(e.target.value)}
                    className="w-full px-4 py-3 bg-charcoal border border-primary/30 rounded-lg focus:border-primary focus:outline-none text-textMain"
                  >
                    <option value="">Select zodiac sign</option>
                    {zodiacSigns.map((sign) => (
                      <option key={sign.id} value={sign.name.toLowerCase()}>
                        {sign.symbol} {sign.name} ({sign.element})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-textSoft mb-4 text-lg font-semibold">
                    Second Person&apos;s Zodiac Sign
                  </label>
                  <select
                    value={sign2}
                    onChange={(e) => setSign2(e.target.value)}
                    className="w-full px-4 py-3 bg-charcoal border border-primary/30 rounded-lg focus:border-primary focus:outline-none text-textMain"
                  >
                    <option value="">Select zodiac sign</option>
                    {zodiacSigns.map((sign) => (
                      <option key={sign.id} value={sign.name.toLowerCase()}>
                        {sign.symbol} {sign.name} ({sign.element})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleCheckCompatibility}
                  disabled={!sign1 || !sign2 || isLoading}
                  className="bg-primary hover:bg-primary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-charcoal mr-2"></div>
                      Checking...
                    </span>
                  ) : (
                    '🔮 Check Compatibility'
                  )}
                </button>
              </div>

              {error && (
                <div className="mt-4 text-center">
                  <p className="text-red-400">{error}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-hover rounded-lg p-8 border border-secondary/20">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">💕</div>
                <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
                  Compatibility Result
                </h2>
              </div>

              {compatibilityResult && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {zodiacSigns.find(s => s.name.toLowerCase() === sign1)?.symbol} {zodiacSigns.find(s => s.name.toLowerCase() === sign1)?.name}
                      </div>
                      <p className="text-textSoft">
                        {zodiacSigns.find(s => s.name.toLowerCase() === sign1)?.element} Element
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {zodiacSigns.find(s => s.name.toLowerCase() === sign2)?.symbol} {zodiacSigns.find(s => s.name.toLowerCase() === sign2)?.name}
                      </div>
                      <p className="text-textSoft">
                        {zodiacSigns.find(s => s.name.toLowerCase() === sign2)?.element} Element
                      </p>
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">❤️</div>
                    <h3 className={`text-2xl font-heading font-bold mb-4 ${getCompatibilityColor(compatibilityResult.compatibility)}`}>
                      {getCompatibilityMessage(compatibilityResult.compatibility)}
                    </h3>
                    <div className="text-4xl font-bold text-primary mb-4">
                      {compatibilityResult.compatibility}%
                    </div>
                    <div className="w-full bg-charcoal rounded-full h-4 mb-4">
                      <div 
                        className="bg-primary h-4 rounded-full transition-all duration-1000"
                        style={{ width: `${compatibilityResult.compatibility}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-charcoal rounded-lg p-6 border border-primary/20 mb-8">
                    <h4 className="text-xl font-heading font-bold mb-4 text-primary">
                      💫 Compatibility Analysis
                    </h4>
                    <p className="text-textSoft leading-relaxed mb-4">
                      {compatibilityResult.message}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="text-center">
                        <h5 className="text-lg font-semibold text-secondary mb-2">Love</h5>
                        <p className="text-textSoft text-sm">{compatibilityResult.loveCompatibility}</p>
                      </div>
                      <div className="text-center">
                        <h5 className="text-lg font-semibold text-secondary mb-2">Friendship</h5>
                        <p className="text-textSoft text-sm">{compatibilityResult.friendshipCompatibility}</p>
                      </div>
                      <div className="text-center">
                        <h5 className="text-lg font-semibold text-secondary mb-2">Business</h5>
                        <p className="text-textSoft text-sm">{compatibilityResult.businessCompatibility}</p>
                      </div>
                    </div>

                    {compatibilityResult.tips && compatibilityResult.tips.length > 0 && (
                      <div className="mt-6">
                        <h5 className="text-lg font-semibold text-primary mb-3">💡 Tips for Success</h5>
                        <ul className="list-disc list-inside space-y-1">
                          {compatibilityResult.tips.map((tip, index) => (
                            <li key={index} className="text-textSoft text-sm">{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="text-center space-x-4">
                <button
                  onClick={() => {
                    setShowResult(false);
                    setCompatibilityResult(null);
                    setError(null);
                  }}
                  className="bg-secondary hover:bg-secondary/80 text-charcoal font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Check Another Match
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

          {/* Compatibility Tips */}
          <div className="mt-12 bg-hover rounded-lg p-8 border border-primary/20">
            <h3 className="text-2xl font-heading font-bold text-center mb-6 text-primary">
              💡 Love & Compatibility Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-heading font-bold mb-3 text-secondary">
                  Fire Signs (Aries, Leo, Sagittarius)
                </h4>
                <p className="text-textSoft text-sm">
                  Passionate and energetic. Best with other fire signs or air signs. Need space and independence.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-heading font-bold mb-3 text-secondary">
                  Earth Signs (Taurus, Virgo, Capricorn)
                </h4>
                <p className="text-textSoft text-sm">
                  Practical and stable. Compatible with water signs and other earth signs. Value security and loyalty.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-heading font-bold mb-3 text-secondary">
                  Air Signs (Gemini, Libra, Aquarius)
                </h4>
                <p className="text-textSoft text-sm">
                  Intellectual and communicative. Great with fire signs and other air signs. Need mental stimulation.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-heading font-bold mb-3 text-secondary">
                  Water Signs (Cancer, Scorpio, Pisces)
                </h4>
                <p className="text-textSoft text-sm">
                  Emotional and intuitive. Compatible with earth signs and other water signs. Deep emotional connections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
