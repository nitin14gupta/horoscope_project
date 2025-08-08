'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apiService } from '@/api/apiService';
import type { BirthChartRequest, BirthChartResponse } from '@/api/config';

export default function BirthChartPage() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    place: '',
    latitude: '',
    longitude: ''
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [chartData, setChartData] = useState<BirthChartResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateChart = async () => {
    if (!formData.name || !formData.date || !formData.time || !formData.place) {
      setError('Please fill in all required fields');
      return;
    }

    setIsCalculating(true);
    setError(null);
    
    try {
      const request: BirthChartRequest = {
        name: formData.name,
        date: formData.date,
        time: formData.time,
        place: formData.place,
        latitude: formData.latitude || undefined,
        longitude: formData.longitude || undefined
      };

      const response = await apiService.getBirthChart(request);
      
      if (response.success && response.data) {
        setChartData(response.data);
      } else {
        setError(response.error || 'Failed to calculate birth chart');
      }
    } catch (err) {
      setError('Failed to calculate birth chart');
      console.error('Error calculating birth chart:', err);
    } finally {
      setIsCalculating(false);
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
            🌟 Birth Chart Calculator
          </h1>
          <p className="text-textSoft text-center mt-4 text-lg">
            Discover your cosmic blueprint with detailed planetary positions and house analysis
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Input Form */}
        {!chartData && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-hover rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6 mystical-glow">Enter Your Birth Details</h2>
               
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-secondary font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-charcoal border border-primary rounded-lg px-4 py-3 text-textMain focus:outline-none focus:border-secondary"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-secondary font-semibold mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-charcoal border border-primary rounded-lg px-4 py-3 text-textMain focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block text-secondary font-semibold mb-2">Time of Birth *</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full bg-charcoal border border-primary rounded-lg px-4 py-3 text-textMain focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block text-secondary font-semibold mb-2">Place of Birth *</label>
                  <input
                    type="text"
                    name="place"
                    value={formData.place}
                    onChange={handleInputChange}
                    className="w-full bg-charcoal border border-primary rounded-lg px-4 py-3 text-textMain focus:outline-none focus:border-secondary"
                    placeholder="City, Country"
                  />
                </div>
                <div>
                  <label className="block text-secondary font-semibold mb-2">Latitude (Optional)</label>
                  <input
                    type="text"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    className="w-full bg-charcoal border border-primary rounded-lg px-4 py-3 text-textMain focus:outline-none focus:border-secondary"
                    placeholder="e.g., 28.6139"
                  />
                </div>
                <div>
                  <label className="block text-secondary font-semibold mb-2">Longitude (Optional)</label>
                  <input
                    type="text"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    className="w-full bg-charcoal border border-primary rounded-lg px-4 py-3 text-textMain focus:outline-none focus:border-secondary"
                    placeholder="e.g., 77.2090"
                  />
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="text-center">
                <button
                  onClick={calculateChart}
                  disabled={isCalculating || !formData.name || !formData.date || !formData.time || !formData.place}
                  className="bg-primary hover:bg-secondary text-charcoal font-semibold py-3 px-8 rounded-full transition-all duration-300 mystical-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCalculating ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-charcoal mr-2"></div>
                      Calculating...
                    </span>
                  ) : (
                    "🌟 Calculate Birth Chart"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isCalculating && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌟</div>
            <div className="text-xl mystical-glow">Calculating your cosmic blueprint...</div>
            <div className="mt-4 text-textSoft">Analyzing planetary positions and house placements</div>
          </div>
        )}

        {/* Chart Results */}
        {chartData && (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Basic Info */}
            <div className="bg-hover rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4 mystical-glow">Your Cosmic Blueprint</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-charcoal rounded-lg">
                  <div className="text-2xl mb-2">🌅</div>
                  <div className="text-secondary font-semibold">Ascendant</div>
                  <div className="text-primary">{chartData.ascendant}</div>
                </div>
                <div className="text-center p-4 bg-charcoal rounded-lg">
                  <div className="text-2xl mb-2">☀️</div>
                  <div className="text-secondary font-semibold">Sun Sign</div>
                  <div className="text-primary">{chartData.sunSign}</div>
                </div>
                <div className="text-center p-4 bg-charcoal rounded-lg">
                  <div className="text-2xl mb-2">🌙</div>
                  <div className="text-secondary font-semibold">Moon Sign</div>
                  <div className="text-primary">{chartData.moonSign}</div>
                </div>
              </div>
            </div>

            {/* Planetary Positions */}
            <div className="bg-hover rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 mystical-glow">Planetary Positions</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {chartData.planetaryPositions.map((planet, index) => (
                  <div key={index} className="bg-charcoal rounded-lg p-4 border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{planet.symbol}</span>
                        <span className="font-semibold text-primary">{planet.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        planet.status === 'Strong' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {planet.status}
                      </span>
                    </div>
                    <div className="text-sm text-textSoft space-y-1">
                      <div>Sign: <span className="text-secondary">{planet.sign}</span></div>
                      <div>House: <span className="text-secondary">{planet.house}</span></div>
                      <div>Degree: <span className="text-secondary">{planet.degree}°</span></div>
                      <div>Element: <span className="text-secondary">{planet.element}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* House Positions */}
            <div className="bg-hover rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 mystical-glow">House Analysis</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {chartData.housePositions.map((house, index) => (
                  <div key={index} className="bg-charcoal rounded-lg p-4 border border-secondary/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-secondary">House {house.number}</span>
                      <span className="text-primary">{house.sign}</span>
                    </div>
                    <div className="text-sm text-textSoft">
                      <div className="font-semibold mb-1">{house.name}</div>
                      <div>{house.area}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                onClick={() => {
                  setChartData(null);
                  setFormData({
                    name: '',
                    date: '',
                    time: '',
                    place: '',
                    latitude: '',
                    longitude: ''
                  });
                  setError(null);
                }}
                className="bg-secondary hover:bg-secondary/80 text-charcoal font-semibold py-3 px-8 rounded-full transition-all duration-300 mr-4"
              >
                Calculate Another Chart
              </button>
              <Link
                href="/horoscope"
                className="bg-primary hover:bg-primary/80 text-charcoal font-semibold py-3 px-8 rounded-full transition-all duration-300"
              >
                Get My Horoscope
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
