'use client';

import { useState } from 'react';

const planets = [
  { name: "Sun", symbol: "☀️", element: "Fire", house: "5th", sign: "Leo" },
  { name: "Moon", symbol: "🌙", element: "Water", house: "4th", sign: "Cancer" },
  { name: "Mercury", symbol: "☿", element: "Earth", house: "3rd", sign: "Gemini" },
  { name: "Venus", symbol: "♀", element: "Earth", house: "2nd", sign: "Taurus" },
  { name: "Mars", symbol: "♂", element: "Fire", house: "1st", sign: "Aries" },
  { name: "Jupiter", symbol: "♃", element: "Fire", house: "9th", sign: "Sagittarius" },
  { name: "Saturn", symbol: "♄", element: "Earth", house: "10th", sign: "Capricorn" },
  { name: "Rahu", symbol: "☊", element: "Shadow", house: "8th", sign: "Aquarius" },
  { name: "Ketu", symbol: "☋", element: "Shadow", house: "12th", sign: "Scorpio" }
];

const houses = [
  { number: 1, name: "Ascendant", area: "Self, personality, appearance" },
  { number: 2, name: "Wealth", area: "Finances, family, speech" },
  { number: 3, name: "Siblings", area: "Communication, courage, short journeys" },
  { number: 4, name: "Mother", area: "Home, property, vehicles" },
  { number: 5, name: "Children", area: "Intelligence, creativity, romance" },
  { number: 6, name: "Enemies", area: "Health, service, obstacles" },
  { number: 7, name: "Spouse", area: "Partnership, marriage, business" },
  { number: 8, name: "Longevity", area: "Mystery, research, sudden events" },
  { number: 9, name: "Dharma", area: "Religion, guru, higher learning" },
  { number: 10, name: "Career", area: "Profession, authority, reputation" },
  { number: 11, name: "Income", area: "Gains, friends, elder siblings" },
  { number: 12, name: "Moksha", area: "Expenses, foreign travel, liberation" }
];

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
  const [chartData, setChartData] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateChart = () => {
    setIsCalculating(true);
    
    // Simulate calculation
    setTimeout(() => {
      const mockChart = {
        ascendant: "Libra",
        sunSign: "Aries",
        moonSign: "Cancer",
        planetaryPositions: planets.map(planet => ({
          ...planet,
          degree: Math.floor(Math.random() * 30),
          house: Math.floor(Math.random() * 12) + 1,
          status: Math.random() > 0.5 ? "Strong" : "Weak"
        })),
        housePositions: houses.map(house => ({
          ...house,
          sign: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"][Math.floor(Math.random() * 12)]
        }))
      };
      
      setChartData(mockChart);
      setIsCalculating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-charcoal text-textMain">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 mystical-glow">
            🌟 Birth Chart Calculator
          </h1>
          <p className="text-xl text-textSoft max-w-2xl mx-auto">
            Discover your cosmic blueprint with detailed planetary positions and house analysis
          </p>
        </div>

        {/* Input Form */}
        {!chartData && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-hover rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6 mystical-glow">Enter Your Birth Details</h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-secondary font-semibold mb-2">Full Name</label>
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
                  <label className="block text-secondary font-semibold mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-charcoal border border-primary rounded-lg px-4 py-3 text-textMain focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block text-secondary font-semibold mb-2">Time of Birth</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full bg-charcoal border border-primary rounded-lg px-4 py-3 text-textMain focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block text-secondary font-semibold mb-2">Place of Birth</label>
                  <input
                    type="text"
                    name="place"
                    value={formData.place}
                    onChange={handleInputChange}
                    className="w-full bg-charcoal border border-primary rounded-lg px-4 py-3 text-textMain focus:outline-none focus:border-secondary"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={calculateChart}
                  disabled={isCalculating}
                  className="bg-primary hover:bg-secondary text-charcoal font-semibold py-3 px-8 rounded-full transition-all duration-300 mystical-glow disabled:opacity-50"
                >
                  {isCalculating ? "🔮 Calculating..." : "🌟 Calculate Birth Chart"}
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
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-charcoal rounded-lg p-4">
                  <div className="text-3xl mb-2">♈</div>
                  <div className="text-secondary font-semibold">Ascendant</div>
                  <div className="text-lg">{chartData.ascendant}</div>
                </div>
                <div className="bg-charcoal rounded-lg p-4">
                  <div className="text-3xl mb-2">☀️</div>
                  <div className="text-secondary font-semibold">Sun Sign</div>
                  <div className="text-lg">{chartData.sunSign}</div>
                </div>
                <div className="bg-charcoal rounded-lg p-4">
                  <div className="text-3xl mb-2">🌙</div>
                  <div className="text-secondary font-semibold">Moon Sign</div>
                  <div className="text-lg">{chartData.moonSign}</div>
                </div>
              </div>
            </div>

            {/* Planetary Positions */}
            <div className="bg-hover rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 mystical-glow">Planetary Positions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {chartData.planetaryPositions.map((planet: any, index: number) => (
                  <div key={index} className="bg-charcoal rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{planet.symbol}</span>
                        <span className="font-semibold">{planet.name}</span>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded ${planet.status === 'Strong' ? 'bg-secondary text-charcoal' : 'bg-tertiary text-white'}`}>
                        {planet.status}
                      </span>
                    </div>
                    <div className="text-sm text-textSoft space-y-1">
                      <div>House: {planet.house}</div>
                      <div>Degree: {planet.degree}°</div>
                      <div>Element: {planet.element}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* House Analysis */}
            <div className="bg-hover rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 mystical-glow">House Analysis</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {chartData.housePositions.map((house: any, index: number) => (
                  <div key={index} className="bg-charcoal rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{house.number}. {house.name}</span>
                      <span className="text-secondary">{house.sign}</span>
                    </div>
                    <div className="text-sm text-textSoft">{house.area}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
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
                }}
                className="bg-secondary hover:bg-primary text-charcoal font-semibold py-3 px-8 rounded-full transition-all duration-300"
              >
                🌟 New Chart
              </button>
            </div>
          </div>
        )}

        {/* Birth Chart Tips */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-hover rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 mystical-glow">🌟 Understanding Your Birth Chart</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-textSoft">
              <div>
                <h4 className="text-secondary font-semibold mb-2">Key Components</h4>
                <ul className="space-y-1">
                  <li>• <strong>Ascendant:</strong> Your rising sign and first impression</li>
                  <li>• <strong>Sun Sign:</strong> Your core personality and ego</li>
                  <li>• <strong>Moon Sign:</strong> Your emotional nature and inner self</li>
                  <li>• <strong>Planetary Positions:</strong> How planets influence different areas</li>
                </ul>
              </div>
              <div>
                <h4 className="text-secondary font-semibold mb-2">House Meanings</h4>
                <ul className="space-y-1">
                  <li>• <strong>Houses 1-6:</strong> Personal matters and daily life</li>
                  <li>• <strong>Houses 7-12:</strong> Relationships and spiritual growth</li>
                  <li>• <strong>Strong Planets:</strong> Areas where you excel naturally</li>
                  <li>• <strong>Weak Planets:</strong> Areas requiring more effort</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
