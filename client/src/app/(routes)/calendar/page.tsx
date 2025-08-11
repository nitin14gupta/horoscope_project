'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiService } from '@/api/apiService';
import type { CalendarEvent, WeeklyForecast } from '@/api/config';

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [weeklyForecast, setWeeklyForecast] = useState<WeeklyForecast | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch calendar events
        const eventsResponse = await apiService.getCalendarEvents();
        if (eventsResponse.success && eventsResponse.data) {
          setEvents(eventsResponse.data);
        } else {
          setError(eventsResponse.error || 'Failed to fetch calendar events');
          return; // Don't continue if events fail
        }

        // Fetch weekly forecast
        const forecastResponse = await apiService.getWeeklyForecast();
        if (forecastResponse.success && forecastResponse.data) {
          setWeeklyForecast(forecastResponse.data);
        } else {
          setError(forecastResponse.error || 'Failed to fetch weekly forecast');
        }
      } catch (err) {
        setError('Failed to fetch calendar data');
        console.error('Error fetching calendar data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalendarData();
  }, []);

  const getMonthName = (month: number) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[month];
  };

  const getCurrentZodiacSign = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
    return "Capricorn";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal text-textMain flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textSoft">Loading calendar data...</p>
          <p className="text-textSoft text-sm mt-2">🤖 AI is generating cosmic events and forecasts</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-charcoal text-textMain flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">🔑</div>
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            API Key Required
          </h2>
          <p className="text-red-400 mb-4">{error}</p>
          <div className="bg-hover rounded-lg p-4 mb-4 text-left">
            <p className="text-textSoft text-sm mb-2">To fix this:</p>
            <ol className="text-textSoft text-sm list-decimal list-inside space-y-1">
              <li>Get an OpenAI API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI Platform</a></li>
              <li>Set environment variable: <code className="bg-charcoal px-2 py-1 rounded">OPENAI_API_KEY=your_key_here</code></li>
              <li>Restart the server</li>
            </ol>
          </div>
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
            📅 Astrology Calendar
          </h1>
          <p className="text-textSoft text-center mt-4 text-lg">
            Cosmic events and celestial insights
          </p>
          <div className="text-center mt-2">
            <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
              🤖 AI Generated (GPT-5)
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Current Month Overview */}
          <div className="bg-hover rounded-lg p-8 border border-primary/20 mb-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🌙</div>
              <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
                {getMonthName(new Date().getMonth())} {new Date().getFullYear()}
              </h2>
              <p className="text-textSoft">
                Current Zodiac Sign: <span className="text-primary font-semibold">{getCurrentZodiacSign()}</span>
              </p>
            </div>

            {/* Monthly Events */}
            {events.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-heading font-bold text-center mb-6 text-primary">
                  🌟 This Month&apos;s Events
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <div key={event.id} className="bg-charcoal rounded-lg p-6 border border-secondary/20">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-textSoft">{event.date}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          event.type === 'cosmic' ? 'bg-purple-500/20 text-purple-400' :
                          event.type === 'zodiac' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                      <h4 className="text-lg font-heading font-bold text-primary mb-2">
                        {event.title}
                      </h4>
                      <p className="text-textSoft text-sm mb-3">
                        {event.description}
                      </p>
                      <p className="text-textSoft text-xs">
                        <span className="text-secondary font-semibold">Significance:</span> {event.significance}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Weekly Forecast */}
          {weeklyForecast && (
            <div className="bg-hover rounded-lg p-8 border border-secondary/20 mb-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🔮</div>
                <h3 className="text-2xl font-heading font-bold text-secondary mb-4">
                  Weekly Forecast
                </h3>
                <p className="text-textSoft">
                  {weeklyForecast.weekStart} - {weeklyForecast.weekEnd}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-heading font-bold mb-4 text-primary">
                    Overall Energy
                  </h4>
                  <p className="text-textSoft leading-relaxed">
                    {weeklyForecast.overallEnergy}
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-heading font-bold mb-4 text-primary">
                    Predictions
                  </h4>
                  <ul className="list-disc list-inside space-y-2">
                    {weeklyForecast.predictions.map((prediction, index) => (
                      <li key={index} className="text-textSoft">{prediction}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-charcoal rounded-lg p-4 border border-primary/20">
                  <h5 className="text-lg font-semibold text-secondary mb-2">Lucky Days</h5>
                  <div className="flex flex-wrap gap-2">
                    {weeklyForecast.luckyDays.map((day, index) => (
                      <span key={index} className="bg-primary/20 text-primary px-2 py-1 rounded text-sm">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-charcoal rounded-lg p-4 border border-secondary/20">
                  <h5 className="text-lg font-semibold text-secondary mb-2">Challenging Days</h5>
                  <div className="flex flex-wrap gap-2">
                    {weeklyForecast.challengingDays.map((day, index) => (
                      <span key={index} className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Zodiac Calendar */}
          <div className="bg-hover rounded-lg p-8 border border-primary/20 mb-8">
            <h3 className="text-2xl font-heading font-bold text-center mb-6 text-primary">
              ♈ Zodiac Calendar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { sign: "Capricorn", dates: "Dec 22 - Jan 19", element: "Earth", quality: "Cardinal" },
                { sign: "Aquarius", dates: "Jan 20 - Feb 18", element: "Air", quality: "Fixed" },
                { sign: "Pisces", dates: "Feb 19 - Mar 20", element: "Water", quality: "Mutable" },
                { sign: "Aries", dates: "Mar 21 - Apr 19", element: "Fire", quality: "Cardinal" },
                { sign: "Taurus", dates: "Apr 20 - May 20", element: "Earth", quality: "Fixed" },
                { sign: "Gemini", dates: "May 21 - Jun 20", element: "Air", quality: "Mutable" },
                { sign: "Cancer", dates: "Jun 21 - Jul 22", element: "Water", quality: "Cardinal" },
                { sign: "Leo", dates: "Jul 23 - Aug 22", element: "Fire", quality: "Fixed" },
                { sign: "Virgo", dates: "Aug 23 - Sep 22", element: "Earth", quality: "Mutable" },
                { sign: "Libra", dates: "Sep 23 - Oct 22", element: "Air", quality: "Cardinal" },
                { sign: "Scorpio", dates: "Oct 23 - Nov 21", element: "Water", quality: "Fixed" },
                { sign: "Sagittarius", dates: "Nov 22 - Dec 21", element: "Fire", quality: "Mutable" }
              ].map((zodiac, index) => (
                <div key={index} className="bg-charcoal rounded-lg p-4 border border-secondary/20 text-center">
                  <h4 className="text-lg font-heading font-bold text-primary mb-2">
                    {zodiac.sign}
                  </h4>
                  <p className="text-textSoft text-sm mb-2">{zodiac.dates}</p>
                  <div className="flex justify-center gap-2">
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
                      {zodiac.element}
                    </span>
                    <span className="bg-secondary/20 text-secondary px-2 py-1 rounded text-xs">
                      {zodiac.quality}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Link
              href="/horoscope"
              className="bg-primary hover:bg-primary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg inline-block mr-4"
            >
              🔭 Get My Horoscope
            </Link>
            <Link
              href="/panchang"
              className="bg-secondary hover:bg-secondary/80 text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg inline-block"
            >
              🗓️ Today&apos;s Panchang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
