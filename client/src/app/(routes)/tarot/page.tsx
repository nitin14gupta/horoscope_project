'use client';

import { useState } from 'react';

const tarotCards = [
  {
    name: "The Fool",
    meaning: "New beginnings, innocence, spontaneity",
    reversed: "Recklessness, risk-taking, naivety",
    image: "🃏"
  },
  {
    name: "The Magician",
    meaning: "Manifestation, resourcefulness, power",
    reversed: "Manipulation, poor planning, untapped talents",
    image: "🔮"
  },
  {
    name: "The High Priestess",
    meaning: "Intuition, sacred knowledge, divine feminine",
    reversed: "Secrets, disconnected from intuition, withdrawal",
    image: "🌙"
  },
  {
    name: "The Empress",
    meaning: "Femininity, beauty, nature, abundance",
    reversed: "Creative block, dependence on others, emptiness",
    image: "👑"
  },
  {
    name: "The Emperor",
    meaning: "Authority, establishment, structure, father figure",
    reversed: "Domination, excessive control, rigidity",
    image: "⚔️"
  },
  {
    name: "The Lovers",
    meaning: "Love, harmony, relationships, choices",
    reversed: "Disharmony, imbalance, misalignment of values",
    image: "💕"
  },
  {
    name: "The Chariot",
    meaning: "Control, willpower, determination, success",
    reversed: "Lack of control and direction, aggression",
    image: "🏛️"
  },
  {
    name: "Strength",
    meaning: "Inner strength, courage, persuasion, influence",
    reversed: "Self doubt, low energy, raw emotion",
    image: "🦁"
  },
  {
    name: "The Hermit",
    meaning: "Soul-searching, introspection, solitude",
    reversed: "Isolation, loneliness, withdrawal",
    image: "🧙"
  },
  {
    name: "Wheel of Fortune",
    meaning: "Good luck, karma, life cycles, destiny",
    reversed: "Bad luck, resistance to change, breaking cycles",
    image: "🎡"
  }
];

export default function TarotPage() {
  const [selectedCards, setSelectedCards] = useState<any[]>([]);
  const [isReading, setIsReading] = useState(false);
  const [readingComplete, setReadingComplete] = useState(false);

  const drawCards = () => {
    setIsReading(true);
    setSelectedCards([]);
    setReadingComplete(false);
    
    // Simulate card drawing
    setTimeout(() => {
      const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
      const drawn = shuffled.slice(0, 3).map(card => ({
        ...card,
        isReversed: Math.random() > 0.5
      }));
      setSelectedCards(drawn);
      setReadingComplete(true);
      setIsReading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-charcoal text-textMain">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 mystical-glow">
            🔮 Daily Tarot Reading
          </h1>
          <p className="text-xl text-textSoft max-w-2xl mx-auto">
            Connect with the mystical energies and discover what the cards reveal about your path today
          </p>
        </div>

        {/* Tarot Reading Section */}
        <div className="max-w-4xl mx-auto">
          {!readingComplete && !isReading && (
            <div className="text-center">
              <div className="bg-hover rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Ready for Your Reading?</h2>
                <p className="text-textSoft mb-6">
                  Take a deep breath, focus on your question, and let the cards guide you.
                </p>
                <button
                  onClick={drawCards}
                  className="bg-primary hover:bg-secondary text-charcoal font-semibold py-3 px-8 rounded-full transition-all duration-300 mystical-glow"
                >
                  🎴 Draw Three Cards
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isReading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎴</div>
              <div className="text-xl mystical-glow">Shuffling the cards...</div>
              <div className="mt-4 text-textSoft">Focus on your question while the cards align</div>
            </div>
          )}

          {/* Reading Results */}
          {readingComplete && selectedCards.length > 0 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold mb-2 mystical-glow">Your Daily Reading</h2>
                <p className="text-textSoft">The cards have spoken. Here&apos;s your guidance for today:</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {selectedCards.map((card, index) => (
                  <div key={index} className="bg-hover rounded-xl p-6 text-center">
                    <div className="text-6xl mb-4 transform transition-transform duration-300 hover:scale-110">
                      {card.image}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{card.name}</h3>
                    <div className={`text-sm mb-2 ${card.isReversed ? 'text-tertiary' : 'text-secondary'}`}>
                      {card.isReversed ? '🔀 Reversed' : '✨ Upright'}
                    </div>
                    <p className="text-textSoft text-sm">
                      {card.isReversed ? card.reversed : card.meaning}
                    </p>
                  </div>
                ))}
              </div>

              {/* Reading Interpretation */}
              <div className="bg-hover rounded-xl p-6 mt-8">
                <h3 className="text-xl font-semibold mb-4 mystical-glow">Today&apos;s Message</h3>
                <div className="space-y-3 text-textSoft">
                  <p>
                    <span className="text-secondary font-semibold">Past Influence:</span> {selectedCards[0]?.name} represents the energy that brought you here.
                  </p>
                  <p>
                    <span className="text-secondary font-semibold">Present Situation:</span> {selectedCards[1]?.name} shows what you're currently experiencing.
                  </p>
                  <p>
                    <span className="text-secondary font-semibold">Future Guidance:</span> {selectedCards[2]?.name} offers insight into your path forward.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center">
                <button
                  onClick={drawCards}
                  className="bg-secondary hover:bg-primary text-charcoal font-semibold py-3 px-8 rounded-full transition-all duration-300"
                >
                  🔮 New Reading
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tarot Tips */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-hover rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 mystical-glow">🔮 Tarot Reading Tips</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-textSoft">
              <div>
                <h4 className="text-secondary font-semibold mb-2">Before Reading</h4>
                <ul className="space-y-1">
                  <li>• Clear your mind and focus on your question</li>
                  <li>• Take deep breaths to center yourself</li>
                  <li>• Trust your intuition when interpreting</li>
                </ul>
              </div>
              <div>
                <h4 className="text-secondary font-semibold mb-2">After Reading</h4>
                <ul className="space-y-1">
                  <li>• Reflect on the messages received</li>
                  <li>• Consider how they apply to your life</li>
                  <li>• Use the guidance for positive action</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
