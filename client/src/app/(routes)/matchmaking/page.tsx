'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const zodiacSigns = [
  { value: 'aries', label: '♈ Aries', element: 'Fire' },
  { value: 'taurus', label: '♉ Taurus', element: 'Earth' },
  { value: 'gemini', label: '♊ Gemini', element: 'Air' },
  { value: 'cancer', label: '♋ Cancer', element: 'Water' },
  { value: 'leo', label: '♌ Leo', element: 'Fire' },
  { value: 'virgo', label: '♍ Virgo', element: 'Earth' },
  { value: 'libra', label: '♎ Libra', element: 'Air' },
  { value: 'scorpio', label: '♏ Scorpio', element: 'Water' },
  { value: 'sagittarius', label: '♐ Sagittarius', element: 'Fire' },
  { value: 'capricorn', label: '♑ Capricorn', element: 'Earth' },
  { value: 'aquarius', label: '♒ Aquarius', element: 'Air' },
  { value: 'pisces', label: '♓ Pisces', element: 'Water' }
];

const compatibilityMatrix = {
  aries: { fire: 90, earth: 60, air: 80, water: 40 },
  taurus: { fire: 60, earth: 90, air: 40, water: 80 },
  gemini: { fire: 80, earth: 40, air: 90, water: 60 },
  cancer: { fire: 40, earth: 80, water: 90, air: 60 },
  leo: { fire: 90, earth: 60, air: 80, water: 40 },
  virgo: { fire: 60, earth: 90, air: 40, water: 80 },
  libra: { fire: 80, earth: 40, air: 90, water: 60 },
  scorpio: { fire: 40, earth: 80, water: 90, air: 60 },
  sagittarius: { fire: 90, earth: 60, air: 80, water: 40 },
  capricorn: { fire: 60, earth: 90, air: 40, water: 80 },
  aquarius: { fire: 80, earth: 40, air: 90, water: 60 },
  pisces: { fire: 40, earth: 80, water: 90, air: 60 }
};

const getCompatibilityScore = (sign1: string, sign2: string) => {
  const element1 = zodiacSigns.find(s => s.value === sign1)?.element;
  const element2 = zodiacSigns.find(s => s.value === sign2)?.element;
  
  if (!element1 || !element2) return 0;
  
  const score = compatibilityMatrix[sign1 as keyof typeof compatibilityMatrix]?.[element2 as keyof typeof compatibilityMatrix.aries] || 0;
  return score;
};

const getCompatibilityMessage = (score: number) => {
  if (score >= 85) return { message: "Perfect Match! 💕", color: "text-green-400" };
  if (score >= 70) return { message: "Great Compatibility! ✨", color: "text-blue-400" };
  if (score >= 50) return { message: "Good Compatibility! 👍", color: "text-yellow-400" };
  return { message: "Challenging Match ⚠️", color: "text-red-400" };
};

export default function MatchmakingPage() {
  const [sign1, setSign1] = useState('');
  const [sign2, setSign2] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleCheckCompatibility = () => {
    if (sign1 && sign2) {
      setShowResult(true);
    }
  };

  const score = getCompatibilityScore(sign1, sign2);
  const compatibility = getCompatibilityMessage(score);

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
                      <option key={sign.value} value={sign.value}>
                        {sign.label} ({sign.element})
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
                      <option key={sign.value} value={sign.value}>
                        {sign.label} ({sign.element})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleCheckCompatibility}
                  disabled={!sign1 || !sign2}
                  className="bg-primary hover:bg-primary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🔮 Check Compatibility
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-hover rounded-lg p-8 border border-secondary/20">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">💕</div>
                <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
                  Compatibility Result
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl mb-2">
                    {zodiacSigns.find(s => s.value === sign1)?.label}
                  </div>
                  <p className="text-textSoft">
                    {zodiacSigns.find(s => s.value === sign1)?.element} Element
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-4xl mb-2">
                    {zodiacSigns.find(s => s.value === sign2)?.label}
                  </div>
                  <p className="text-textSoft">
                    {zodiacSigns.find(s => s.value === sign2)?.element} Element
                  </p>
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="text-6xl mb-4">❤️</div>
                <h3 className={`text-2xl font-heading font-bold mb-4 ${compatibility.color}`}>
                  {compatibility.message}
                </h3>
                <div className="text-4xl font-bold text-primary mb-4">
                  {score}%
                </div>
                <div className="w-full bg-charcoal rounded-full h-4 mb-4">
                  <div 
                    className="bg-primary h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-primary/20 mb-8">
                <h4 className="text-xl font-heading font-bold mb-4 text-primary">
                  💫 Compatibility Analysis
                </h4>
                <p className="text-textSoft leading-relaxed">
                  {score >= 85 && "This is a perfect match! Your elements complement each other beautifully, creating a harmonious and passionate relationship. You'll find deep understanding and mutual growth in this partnership."}
                  {score >= 70 && score < 85 && "Great compatibility! You have strong potential for a loving and supportive relationship. Your differences will help you grow together while your similarities create a strong foundation."}
                  {score >= 50 && score < 70 && "Good compatibility with room for growth. You'll need to work on communication and understanding, but with effort, this relationship can flourish and bring out the best in both partners."}
                  {score < 50 && "This match presents some challenges, but every relationship can work with love, patience, and understanding. Focus on open communication and respect for each other's differences."}
                </p>
              </div>

              <div className="text-center space-x-4">
                <button
                  onClick={() => setShowResult(false)}
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
