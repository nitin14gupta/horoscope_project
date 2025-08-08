'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { apiService } from '@/api/apiService';
import type { HoroscopeRequest, HoroscopeResponse } from '@/api/config';

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
  const [error, setError] = useState<string | null>(null);
  const [horoscopeData, setHoroscopeData] = useState<HoroscopeResponse | null>(null);

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
    setError(null);
    setShowResult(false);
    
    try {
      const request: HoroscopeRequest = {
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        timeOfBirth: formData.timeOfBirth || undefined,
        placeOfBirth: formData.placeOfBirth || undefined,
        zodiacSign: formData.zodiacSign,
        gender: formData.gender || undefined,
      };

      const response = await apiService.getHoroscope(request);
      
      if (response.success && response.data) {
        setHoroscopeData(response.data);
        setShowResult(true);
      } else {
        setError(response.error || 'Failed to get horoscope. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Horoscope error:', err);
    } finally {
      setIsLoading(false);
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
              
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
                  <p className="text-red-400">{error}</p>
                </div>
              )}
              
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
                  {horoscopeData?.fullName} • {horoscopeData?.zodiacSign ? horoscopeData.zodiacSign.charAt(0).toUpperCase() + horoscopeData.zodiacSign.slice(1) : ''}
                </p>
              </div>

              {horoscopeData && (
                <div className="space-y-6">
                  {/* Main Prediction */}
                  <div className="bg-charcoal rounded-lg p-6 border border-primary/20">
                    <h3 className="text-lg font-semibold text-primary mb-3">🌟 Today&apos;s Prediction</h3>
                    <p className="text-textMain text-lg leading-relaxed">
                      {horoscopeData.prediction}
                    </p>
                  </div>

                  {/* Lucky Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-charcoal rounded-lg p-4 border border-secondary/20">
                      <h4 className="text-secondary font-semibold mb-2">🍀 Lucky Color</h4>
                      <p className="text-textMain">{horoscopeData.luckyColor}</p>
                    </div>
                    <div className="bg-charcoal rounded-lg p-4 border border-secondary/20">
                      <h4 className="text-secondary font-semibold mb-2">🔢 Lucky Number</h4>
                      <p className="text-textMain">{horoscopeData.luckyNumber}</p>
                    </div>
                  </div>

                  {/* Detailed Predictions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-charcoal rounded-lg p-4 border border-primary/20">
                      <h4 className="text-primary font-semibold mb-2">❤️ Love</h4>
                      <p className="text-textSoft text-sm">{horoscopeData.love}</p>
                    </div>
                    <div className="bg-charcoal rounded-lg p-4 border border-primary/20">
                      <h4 className="text-primary font-semibold mb-2">💼 Career</h4>
                      <p className="text-textSoft text-sm">{horoscopeData.career}</p>
                    </div>
                    <div className="bg-charcoal rounded-lg p-4 border border-primary/20">
                      <h4 className="text-primary font-semibold mb-2">💰 Finance</h4>
                      <p className="text-textSoft text-sm">{horoscopeData.finance}</p>
                    </div>
                    <div className="bg-charcoal rounded-lg p-4 border border-primary/20">
                      <h4 className="text-primary font-semibold mb-2">🏥 Health</h4>
                      <p className="text-textSoft text-sm">{horoscopeData.health}</p>
                    </div>
                  </div>

                  {/* Compatibility */}
                  <div className="bg-charcoal rounded-lg p-4 border border-secondary/20">
                    <h4 className="text-secondary font-semibold mb-2">💫 Compatibility</h4>
                    <p className="text-textSoft text-sm">{horoscopeData.compatibility}</p>
                  </div>
                </div>
              )}

              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setShowResult(false);
                    setHoroscopeData(null);
                    setError(null);
                  }}
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
