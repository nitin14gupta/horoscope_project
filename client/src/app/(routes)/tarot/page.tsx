'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '@/api/apiService';
import type { TarotReading } from '@/api/config';

export default function TarotPage() {
  const [reading, setReading] = useState<TarotReading | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [canFlip, setCanFlip] = useState(true);

  const drawCards = async () => {
    setIsReading(true);
    setError(null);
    setReading(null);
    setFlippedCards([]);
    setCanFlip(true);
    
    try {
      const response = await apiService.getTarotReading();
      
      if (response.success && response.data) {
        setReading(response.data);
      } else {
        setError(response.error || 'Failed to get tarot reading');
      }
    } catch (err) {
      setError('Failed to get tarot reading');
      console.error('Error getting tarot reading:', err);
    } finally {
      setIsReading(false);
    }
  };

  const flipCard = (index: number) => {
    if (!canFlip || flippedCards.includes(index)) return;
    
    setFlippedCards(prev => [...prev, index]);
    
    // If this is the last card, disable flipping
    if (flippedCards.length === 2) {
      setCanFlip(false);
    }
  };

  const resetReading = () => {
    setReading(null);
    setError(null);
    setFlippedCards([]);
    setCanFlip(true);
  };

  return (
    <div className="min-h-screen bg-charcoal text-textMain">
      {/* Header */}
      <motion.div 
        className="bg-mystical-gradient py-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <Link href="/" className="text-secondary hover:text-primary transition-colors">
            ← Back to Home
          </Link>
          <motion.h1 
            className="text-4xl md:text-6xl font-heading font-bold text-center mt-8 mystical-glow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            🔮 Daily Tarot Reading
          </motion.h1>
          <motion.p 
            className="text-textSoft text-center mt-4 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover what the cards reveal about your path
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {!reading ? (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="bg-hover rounded-2xl p-8 border border-primary/20 mb-8 backdrop-blur-sm"
                whileHover={{ scale: 1.02, rotateY: 2 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <motion.div 
                  className="text-8xl mb-6"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  🔮
                </motion.div>
                <motion.h2 
                  className="text-3xl font-heading font-bold mb-4 text-secondary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Ready for Your Reading?
                </motion.h2>
                <motion.p 
                  className="text-textSoft mb-8 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  The tarot cards are ready to reveal insights about your past, present, and future. 
                  Focus on your question and let the universe guide you.
                </motion.p>
                
                {error && (
                  <motion.div 
                    className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-red-400">{error}</p>
                  </motion.div>
                )}

                <motion.button
                  onClick={drawCards}
                  disabled={isReading}
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-charcoal font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {isReading ? (
                    <span className="flex items-center justify-center">
                      <motion.div 
                        className="animate-spin rounded-full h-5 w-5 border-b-2 border-charcoal mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Shuffling Cards...
                    </span>
                  ) : (
                    '🔮 Draw Three Cards'
                  )}
                </motion.button>
              </motion.div>

              {/* Tarot Tips */}
              <motion.div 
                className="bg-hover rounded-2xl p-6 border border-secondary/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.02, rotateY: -2 }}
              >
                <h3 className="text-xl font-heading font-bold mb-4 text-secondary">
                  💡 Tarot Reading Tips
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-textSoft">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Before Reading</h4>
                    <ul className="space-y-1">
                      <li>• Clear your mind and focus</li>
                      <li>• Formulate a specific question</li>
                      <li>• Trust your intuition</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">During Reading</h4>
                    <ul className="space-y-1">
                      <li>• Pay attention to your feelings</li>
                      <li>• Consider both upright and reversed meanings</li>
                      <li>• Look for patterns and connections</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Reading Results */}
              <motion.div 
                className="bg-hover rounded-2xl p-8 border border-secondary/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-center mb-8">
                  <motion.div 
                    className="text-8xl mb-4"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    🔮
                  </motion.div>
                  <motion.h2 
                    className="text-3xl font-heading font-bold text-secondary mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Your Tarot Reading
                  </motion.h2>
                  <motion.p 
                    className="text-textSoft"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {reading.message}
                  </motion.p>
                </div>

                {/* Interactive Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {reading.cards.map((card, index) => (
                    <motion.div
                      key={index}
                      className="relative h-96 perspective-1000"
                      initial={{ opacity: 0, y: 50, rotateY: 180 }}
                      animate={{ opacity: 1, y: 0, rotateY: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                      <motion.div
                        className={`w-full h-full cursor-pointer transform-style-preserve-3d transition-all duration-500 ${
                          flippedCards.includes(index) ? 'rotate-y-180' : ''
                        } ${!canFlip && !flippedCards.includes(index) ? 'opacity-50 pointer-events-none' : ''}`}
                        onClick={() => flipCard(index)}
                        whileHover={canFlip && !flippedCards.includes(index) ? { scale: 1.05, rotateY: 5 } : {}}
                        animate={flippedCards.includes(index) ? { rotateY: 180 } : { rotateY: 0 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                      >
                        {/* Card Back (Blurred) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl border-2 border-primary/30 shadow-2xl flex items-center justify-center">
                          <div className="text-6xl mb-4">🃏</div>
                          <div className="text-center">
                            <p className="text-white font-bold text-lg mb-2">Tarot Card</p>
                            <p className="text-white/80 text-sm">{card.position}</p>
                          </div>
                        </div>

                        {/* Card Front (Revealed) */}
                        <div className="absolute inset-0 bg-charcoal rounded-2xl border-2 border-primary/30 shadow-2xl p-6 text-center transform rotate-y-180 backface-hidden">
                          <motion.div 
                            className="text-6xl mb-4"
                            animate={flippedCards.includes(index) ? { 
                              rotate: [0, 10, -10, 0],
                              scale: [1, 1.2, 1]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            {card.isReversed ? '🔄' : card.image}
                          </motion.div>
                          <h3 className="text-xl font-heading font-bold mb-2 text-primary">
                            {card.name}
                            {card.isReversed && (
                              <motion.span 
                                className="text-red-400 ml-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                              >
                                (Reversed)
                              </motion.span>
                            )}
                          </h3>
                          <p className="text-sm text-textSoft mb-2 font-semibold">
                            {card.position}
                          </p>
                          <div className="text-xs text-textSoft">
                            <p className="mb-2">
                              <span className="font-semibold text-secondary">Meaning:</span><br />
                              {card.isReversed ? card.reversed : card.meaning}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Interpretation - Only show when all cards are flipped */}
                <AnimatePresence>
                  {flippedCards.length === 3 && reading.interpretation && (
                    <motion.div 
                      className="bg-charcoal rounded-2xl p-6 border border-primary/20"
                      initial={{ opacity: 0, y: 50, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -50, scale: 0.8 }}
                      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                    >
                      <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                        💫 Overall Interpretation
                      </h3>
                      <p className="text-textSoft leading-relaxed">
                        {reading.interpretation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="text-center space-x-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.button
                  onClick={resetReading}
                  className="bg-gradient-to-r from-secondary to-yellow-500 hover:from-yellow-500 hover:to-secondary text-charcoal font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  whileHover={{ scale: 1.05, rotateY: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  🔮 New Reading
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href="/horoscope"
                    className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-charcoal font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Get My Horoscope
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
