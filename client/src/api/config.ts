// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://horoscope-project.onrender.com',
  ENDPOINTS: {
    HOROSCOPE: '/api/horoscope',
    ZODIAC: '/api/zodiac',
    PANCHANG: '/api/panchang',
    MATCHMAKING: '/api/matchmaking',
    BIRTH_CHART: '/api/birth-chart',
    TAROT: '/api/tarot',
    MANTRA: '/api/mantra',
    REMEDY: '/api/remedy',
    CALENDAR: '/api/calendar',
  },
  TIMEOUT: 10000, // 10 seconds
};

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Horoscope Types
export interface HoroscopeRequest {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth?: string;
  placeOfBirth?: string;
  zodiacSign: string;
  gender?: string;
}

export interface HoroscopeResponse {
  id: string;
  fullName: string;
  zodiacSign: string;
  date: string;
  prediction: string;
  luckyColor: string;
  luckyNumber: number;
  compatibility: string;
  health: string;
  career: string;
  love: string;
  finance: string;
  planetaryInfluence?: string;
  element?: string;
  quality?: string;
  planetaryPositions?: {
    sun: number;
    moon: number;
    mars: number;
  };
  dataSource?: string;
  createdAt: string;
}

// Zodiac Types
export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  element: string;
  rulingPlanet: string;
  dates: string;
  traits: string[];
  description: string;
  luckyColors: string[];
  luckyNumbers: number[];
}

// Panchang Types
export interface PanchangData {
  date: string;
  tithi: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  sunrise: string;
  sunset: string;
  auspiciousTimings: string[];
  inauspiciousTimings: string[];
  dailyWisdom: string;
  paksha?: string;
  dayName?: string;
  tithiSignificance?: string;
  nakshatraSignificance?: string;
  dataSource?: string;
}

// Matchmaking Types
export interface MatchmakingRequest {
  zodiacSign1: string;
  zodiacSign2: string;
}

export interface MatchmakingResponse {
  compatibility: number;
  message: string;
  loveCompatibility: string;
  friendshipCompatibility: string;
  businessCompatibility: string;
  tips: string[];
}

// Birth Chart Types
export interface BirthChartRequest {
  name: string;
  date: string;
  time: string;
  place: string;
  latitude?: string;
  longitude?: string;
}

export interface BirthChartResponse {
  ascendant: string;
  sunSign: string;
  moonSign: string;
  planetaryPositions: PlanetaryPosition[];
  housePositions: HousePosition[];
}

export interface PlanetaryPosition {
  name: string;
  symbol: string;
  element: string;
  degree: number;
  house: number;
  status: 'Strong' | 'Weak';
  sign: string;
}

export interface HousePosition {
  number: number;
  name: string;
  area: string;
  sign: string;
}

// Tarot Types
export interface TarotCard {
  id: string;
  name: string;
  meaning: string;
  reversed: string;
  image: string;
  suit: string;
}

export interface TarotReading {
  cards: DrawnCard[];
  interpretation: string;
  message: string;
}

export interface DrawnCard extends TarotCard {
  isReversed: boolean;
  position: 'Past' | 'Present' | 'Future';
}

// Mantra Types
export interface Mantra {
  id: string;
  name: string;
  sanskrit: string;
  transliteration: string;
  meaning: string;
  benefits: string[];
  bestTime: string;
  repetitions: number;
  category: string;
}

// Remedy Types
export interface Remedy {
  id: string;
  name: string;
  category: string;
  description: string;
  solutions: string[];
  gemstones?: Gemstone[];
  mantras?: string[];
}

export interface Gemstone {
  name: string;
  planet: string;
  color: string;
  finger: string;
  day: string;
  benefits: string;
  price: string;
  alternatives: string;
  mantra: string;
}

// Calendar Types
export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'cosmic' | 'zodiac' | 'planetary';
  significance: string;
}

export interface WeeklyForecast {
  weekStart: string;
  weekEnd: string;
  overallEnergy: string;
  predictions: string[];
  luckyDays: string[];
  challengingDays: string[];
}
