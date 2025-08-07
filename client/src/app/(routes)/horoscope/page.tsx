'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface HoroscopeForm {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  zodiacSign: string;
  gender: string;
}

const zodiacSigns = [
  { value: 'aries', label: '♈ Aries (March 21 - April 19)' },
  { value: 'taurus', label: '♉ Taurus (April 20 - May 20)' },
  { value: 'gemini', label: '♊ Gemini (May 21 - June 20)' },
  { value: 'cancer', label: '♋ Cancer (June 21 - July 22)' },
  { value: 'leo', label: '♌ Leo (July 23 - August 22)' },
  { value: 'virgo', label: '♍ Virgo (August 23 - September 22)' },
  { value: 'libra', label: '♎ Libra (September 23 - October 22)' },
  { value: 'scorpio', label: '♏ Scorpio (October 23 - November 21)' },
  { value: 'sagittarius', label: '♐ Sagittarius (November 22 - December 21)' },
  { value: 'capricorn', label: '♑ Capricorn (December 22 - January 19)' },
  { value: 'aquarius', label: '♒ Aquarius (January 20 - February 18)' },
  { value: 'pisces', label: '♓ Pisces (February 19 - March 20)' },
];

export default function HoroscopePage() {
  const [formData, setFormData] = useState<HoroscopeForm>({
    fullName: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    zodiacSign: '',
    gender: '',
  });

  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
    }, 2000);
  };

  const generateHoroscope = () => {
    const predictions = [
      "Today brings positive energy. You might encounter an opportunity at work. Avoid conflicts with loved ones. Lucky color: Yellow. Lucky number: 4.",
      "The stars align in your favor today. A long-awaited wish may come true. Focus on your health and well-being. Lucky color: Blue. Lucky number: 7.",
      "Mercury's influence brings clarity to your thoughts. Communication will be key today. Trust your intuition. Lucky color: Green. Lucky number: 3.",
      "Venus blesses you with harmony in relationships. Express your feelings openly. Financial gains are possible. Lucky color: Pink. Lucky number: 9.",
      "Mars energy empowers you to take action. Be bold in your decisions. Physical activity will bring good results. Lucky color: Red. Lucky number: 1."
    ];
    
    return predictions[Math.floor(Math.random() * predictions.length)];
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
            🔮 Your Destiny Awaits
          </h1>
          <p className="text-textSoft text-center mt-4 text-lg">
            Discover what the stars have in store for you today
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {!showResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-hover rounded-lg p-8 border border-primary/20">
              <h2 className="text-2xl font-heading font-bold text-center mb-8 text-secondary">
                📋 Enter Your Birth Details
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-textSoft mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-charcoal border border-primary/30 rounded-lg focus:border-primary focus:outline-none text-textMain"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-textSoft mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-charcoal border border-primary/30 rounded-lg focus:border-primary focus:outline-none text-textMain"
                    />
                  </div>

                  <div>
                    <label className="block text-textSoft mb-2">Time of Birth</label>
                    <input
                      type="time"
                      name="timeOfBirth"
                      value={formData.timeOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-charcoal border border-primary/30 rounded-lg focus:border-primary focus:outline-none text-textMain"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-textSoft mb-2">Place of Birth</label>
                  <input
                    type="text"
                    name="placeOfBirth"
                    value={formData.placeOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-charcoal border border-primary/30 rounded-lg focus:border-primary focus:outline-none text-textMain"
                    placeholder="City, Country"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-textSoft mb-2">Zodiac Sign *</label>
                    <select
                      name="zodiacSign"
                      value={formData.zodiacSign}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-charcoal border border-primary/30 rounded-lg focus:border-primary focus:outline-none text-textMain"
                    >
                      <option value="">Select your zodiac sign</option>
                      {zodiacSigns.map((sign) => (
                        <option key={sign.value} value={sign.value}>
                          {sign.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-textSoft mb-2">Gender (Optional)</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-charcoal border border-primary/30 rounded-lg focus:border-primary focus:outline-none text-textMain"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/80 text-charcoal font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-charcoal mr-2"></div>
                      Reading the stars...
                    </span>
                  ) : (
                    '🔭 Get My Horoscope'
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-hover rounded-lg p-8 border border-secondary/20">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">✨</div>
                <h2 className="text-2xl font-heading font-bold text-secondary mb-2">
                  Your Daily Horoscope
                </h2>
                <p className="text-textSoft">
                  {formData.fullName} • {formData.zodiacSign.charAt(0).toUpperCase() + formData.zodiacSign.slice(1)}
                </p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-primary/20">
                <p className="text-textMain text-lg leading-relaxed">
                  {generateHoroscope()}
                </p>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowResult(false)}
                  className="bg-secondary hover:bg-secondary/80 text-charcoal font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 mr-4"
                >
                  Get Another Reading
                </button>
                <Link
                  href="/"
                  className="bg-primary hover:bg-primary/80 text-charcoal font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
