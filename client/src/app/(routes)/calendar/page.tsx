'use client';

import React from 'react';

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const monthlyEvents = [
  {
    date: "1-5",
    event: "New Moon in Capricorn",
    description: "Perfect time for setting career goals and building foundations",
    type: "moon"
  },
  {
    date: "8-12",
    event: "Mercury enters Aquarius",
    description: "Communication becomes more innovative and forward-thinking",
    type: "planet"
  },
  {
    date: "15-20",
    event: "Full Moon in Leo",
    description: "Embrace creativity and self-expression. Time for dramatic revelations",
    type: "moon"
  },
  {
    date: "22-26",
    event: "Venus enters Pisces",
    description: "Love becomes more spiritual and compassionate",
    type: "planet"
  },
  {
    date: "28-31",
    event: "Mars Retrograde begins",
    description: "Energy may feel blocked. Focus on internal work",
    type: "retrograde"
  }
];

const weeklyForecast = [
  {
    week: "Week 1",
    theme: "New Beginnings",
    focus: "Career and ambition",
    luckyColor: "Purple",
    luckyNumber: "7"
  },
  {
    week: "Week 2",
    theme: "Communication",
    focus: "Learning and sharing ideas",
    luckyColor: "Blue",
    luckyNumber: "3"
  },
  {
    week: "Week 3",
    theme: "Creativity",
    focus: "Self-expression and passion",
    luckyColor: "Orange",
    luckyNumber: "9"
  },
  {
    week: "Week 4",
    theme: "Spirituality",
    focus: "Inner growth and healing",
    luckyColor: "White",
    luckyNumber: "1"
  }
];

const zodiacMonths = [
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
];

export default function CalendarPage() {
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
    
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
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
    return "Sagittarius";
  };

  return (
    <div className="min-h-screen bg-charcoal text-textMain">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 mystical-glow">
            📅 Astrology Calendar
          </h1>
          <p className="text-xl text-textSoft max-w-2xl mx-auto">
            Track cosmic events, planetary movements, and discover your daily celestial guidance
          </p>
        </div>

        {/* Current Date Info */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-hover rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">🌟</div>
            <h2 className="text-2xl font-semibold mb-2 mystical-glow">
              Today&apos;s Cosmic Energy
            </h2>
            <p className="text-textSoft mb-4">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <div className="bg-charcoal rounded-lg p-4 inline-block">
              <div className="text-secondary font-semibold">Current Zodiac Sign</div>
              <div className="text-xl">{getCurrentZodiacSign()}</div>
            </div>
          </div>
        </div>

        {/* Monthly Events */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-hover rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-6 mystical-glow">
              🌙 {getMonthName(currentMonth)} {currentYear} Cosmic Events
            </h2>
            <div className="space-y-4">
              {monthlyEvents.map((event, index) => (
                <div key={index} className="bg-charcoal rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">
                        {event.type === 'moon' ? '🌙' : event.type === 'planet' ? '⭐' : '🔄'}
                      </span>
                      <div>
                        <div className="font-semibold">{event.event}</div>
                        <div className="text-sm text-textSoft">{event.description}</div>
                      </div>
                    </div>
                    <div className="text-secondary text-sm font-semibold">
                      {event.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Forecast */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-hover rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-6 mystical-glow">
              🔮 Weekly Forecast
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {weeklyForecast.map((week, index) => (
                <div key={index} className="bg-charcoal rounded-lg p-4">
                  <div className="text-secondary font-semibold mb-2">{week.week}</div>
                  <div className="text-lg font-semibold mb-2">{week.theme}</div>
                  <div className="text-sm text-textSoft mb-3">{week.focus}</div>
                  <div className="flex justify-between text-sm">
                    <span>Lucky Color: <span className="text-secondary">{week.luckyColor}</span></span>
                    <span>Lucky Number: <span className="text-secondary">{week.luckyNumber}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Zodiac Calendar */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-hover rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-6 mystical-glow">
              ♈ Zodiac Calendar
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {zodiacMonths.map((zodiac, index) => (
                <div key={index} className="bg-charcoal rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-lg font-semibold">{zodiac.sign}</div>
                    <div className="text-sm text-secondary">{zodiac.element}</div>
                  </div>
                  <div className="text-sm text-textSoft mb-2">{zodiac.dates}</div>
                  <div className="text-xs text-textSoft">Quality: {zodiac.quality}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cosmic Tips */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-hover rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 mystical-glow">🌟 Calendar Reading Tips</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-textSoft">
              <div>
                <h4 className="text-secondary font-semibold mb-2">Moon Phases</h4>
                <ul className="space-y-1">
                  <li>• <strong>New Moon:</strong> Set intentions and start new projects</li>
                  <li>• <strong>Waxing Moon:</strong> Build momentum and grow</li>
                  <li>• <strong>Full Moon:</strong> Release and celebrate achievements</li>
                  <li>• <strong>Waning Moon:</strong> Reflect and let go</li>
                </ul>
              </div>
              <div>
                <h4 className="text-secondary font-semibold mb-2">Planetary Transits</h4>
                <ul className="space-y-1">
                  <li>• <strong>Mercury:</strong> Communication and learning</li>
                  <li>• <strong>Venus:</strong> Love, beauty, and relationships</li>
                  <li>• <strong>Mars:</strong> Energy, action, and courage</li>
                  <li>• <strong>Retrogrades:</strong> Review and reassess</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-12">
          <div className="bg-hover rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 mystical-glow">Explore More</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/horoscope" className="bg-primary hover:bg-secondary text-charcoal font-semibold py-3 px-6 rounded-full transition-all duration-300">
                🔭 Daily Horoscope
              </a>
              <a href="/birth-chart" className="bg-secondary hover:bg-primary text-charcoal font-semibold py-3 px-6 rounded-full transition-all duration-300">
                🌟 Birth Chart
              </a>
              <a href="/tarot" className="bg-primary hover:bg-secondary text-charcoal font-semibold py-3 px-6 rounded-full transition-all duration-300">
                🎴 Tarot Reading
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
