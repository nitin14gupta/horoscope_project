'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiService } from '@/api/apiService';
import type { PanchangData } from '@/api/config';

export default function PanchangPage() {
  const [panchangData, setPanchangData] = useState<PanchangData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const fetchPanchang = async (date?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiService.getPanchang(date);
      
      if (response.success && response.data) {
        setPanchangData(response.data);
      } else {
        setError(response.error || 'Failed to fetch panchang data');
      }
    } catch (err) {
      setError('Failed to fetch panchang data');
      console.error('Error fetching panchang data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPanchang();
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    if (date) {
      fetchPanchang(date);
    }
  };

  const handleTodayClick = () => {
    setSelectedDate('');
    fetchPanchang();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal text-textMain flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textSoft">Loading panchang data...</p>
          <p className="text-textSoft text-sm mt-2">🤖 AI is generating authentic Hindu Panchang data</p>
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

  if (!panchangData) {
    return (
      <div className="min-h-screen bg-charcoal text-textMain flex items-center justify-center">
        <div className="text-center">
          <p className="text-textSoft">No panchang data available</p>
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
            🗓️ Today&apos;s Panchang
          </h1>
          <p className="text-textSoft text-center mt-4 text-lg">
            Hindu Calendar & Auspicious Timings
          </p>
          <div className="text-center mt-4">
            <div className="inline-block bg-secondary/20 text-secondary px-4 py-2 rounded-lg text-lg font-semibold">
              📅 {panchangData?.date || getTodayDate()} • {panchangData?.dayName || new Date().toLocaleDateString('en-IN', { weekday: 'long' })}
            </div>
          </div>
          {panchangData?.dataSource && (
            <div className="text-center mt-2">
              <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                📡 {panchangData.dataSource}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Date Picker */}
          <div className="bg-hover rounded-lg p-6 border border-secondary/20 mb-8">
            <h3 className="text-xl font-heading font-bold text-center mb-4 text-secondary">
              📅 Select Date for Panchang
            </h3>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-4">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="px-4 py-2 bg-charcoal border border-primary/30 rounded-lg focus:border-primary focus:outline-none text-textMain"
                  max={getTodayDate()}
                />
                <button
                  onClick={handleTodayClick}
                  className="bg-primary hover:bg-primary/80 text-charcoal font-bold py-2 px-4 rounded-lg transition-all duration-300"
                >
                  Today
                </button>
              </div>
              <p className="text-textSoft text-sm text-center">
                {selectedDate ? `Showing Panchang for ${selectedDate}` : `Showing Today's Panchang (${getTodayDate()})`}
              </p>
            </div>
          </div>

          {/* Date and Basic Info */}
          <div className="bg-hover rounded-lg p-8 border border-primary/20 mb-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📅</div>
              <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
                {panchangData.date}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-textSoft">Tithi:</span>
                  <span className="text-primary font-semibold">{panchangData.tithi}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textSoft">Nakshatra:</span>
                  <span className="text-primary font-semibold">{panchangData.nakshatra}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textSoft">Yoga:</span>
                  <span className="text-primary font-semibold">{panchangData.yoga}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textSoft">Karana:</span>
                  <span className="text-primary font-semibold">{panchangData.karana}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-textSoft">Sunrise:</span>
                  <span className="text-secondary font-semibold">{panchangData.sunrise}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textSoft">Sunset:</span>
                  <span className="text-secondary font-semibold">{panchangData.sunset}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textSoft">Day:</span>
                  <span className="text-secondary font-semibold">
                    {panchangData.dayName || new Date(panchangData.date).toLocaleDateString('en-IN', { weekday: 'long' })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textSoft">Paksha:</span>
                  <span className="text-secondary font-semibold">
                    {panchangData.paksha || (panchangData.tithi.includes('Shukla') ? 'Shukla Paksha' : 'Krishna Paksha')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Auspicious Timings */}
          {panchangData.auspiciousTimings && panchangData.auspiciousTimings.length > 0 && (
            <div className="bg-hover rounded-lg p-8 border border-secondary/20 mb-8">
              <h3 className="text-2xl font-heading font-bold text-center mb-6 text-secondary">
                ✨ Auspicious Timings (Shubh Muhurat)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {panchangData.auspiciousTimings.map((timing, index) => (
                  <div key={index} className="bg-charcoal rounded-lg p-4 border border-secondary/20">
                    <h4 className="text-lg font-heading font-bold text-secondary mb-2">
                      {timing}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inauspicious Timings */}
          {panchangData.inauspiciousTimings && panchangData.inauspiciousTimings.length > 0 && (
            <div className="bg-hover rounded-lg p-8 border border-tertiary/20 mb-8">
              <h3 className="text-2xl font-heading font-bold text-center mb-6 text-tertiary">
                ⚠️ Inauspicious Timings (Avoid These Periods)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {panchangData.inauspiciousTimings.map((timing, index) => (
                  <div key={index} className="bg-charcoal rounded-lg p-4 border border-tertiary/20">
                    <h4 className="text-lg font-heading font-bold text-tertiary mb-2">
                      {timing}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Significance Section */}
          {(panchangData.tithiSignificance || panchangData.nakshatraSignificance) && (
            <div className="bg-hover rounded-lg p-8 border border-primary/20 mb-8">
              <h3 className="text-2xl font-heading font-bold text-center mb-6 text-primary">
                🌟 Today's Significance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {panchangData.tithiSignificance && (
                  <div className="bg-charcoal rounded-lg p-6 border border-primary/20">
                    <h4 className="text-lg font-heading font-bold text-primary mb-3">
                      📅 {panchangData.tithi} Tithi
                    </h4>
                    <p className="text-textSoft leading-relaxed">
                      {panchangData.tithiSignificance}
                    </p>
                  </div>
                )}
                {panchangData.nakshatraSignificance && (
                  <div className="bg-charcoal rounded-lg p-6 border border-secondary/20">
                    <h4 className="text-lg font-heading font-bold text-secondary mb-3">
                      ⭐ {panchangData.nakshatra} Nakshatra
                    </h4>
                    <p className="text-textSoft leading-relaxed">
                      {panchangData.nakshatraSignificance}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Daily Wisdom */}
          {panchangData.dailyWisdom && (
            <div className="bg-hover rounded-lg p-8 border border-primary/20">
              <h3 className="text-2xl font-heading font-bold text-center mb-6 text-primary">
                🕉️ Daily Wisdom
              </h3>
              <div className="text-center">
                <p className="text-textSoft text-lg leading-relaxed mb-6">
                  {panchangData.dailyWisdom}
                </p>
                <div className="text-4xl mb-4">🕉️</div>
                <p className="text-textSoft">
                  May the divine energy guide you through this blessed day.
                </p>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center mt-12">
            <Link
              href="/horoscope"
              className="bg-primary hover:bg-primary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg inline-block mr-4"
            >
              🔭 Get My Horoscope
            </Link>
            <Link
              href="/zodiac"
              className="bg-secondary hover:bg-secondary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg inline-block"
            >
              ♈ Know My Zodiac
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
