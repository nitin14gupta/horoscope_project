import { API_CONFIG, type ApiResponse } from './config';
import type {
  HoroscopeRequest,
  HoroscopeResponse,
  ZodiacSign,
  PanchangData,
  MatchmakingRequest,
  MatchmakingResponse,
  BirthChartRequest,
  BirthChartResponse,
  TarotReading,
  Mantra,
  Remedy,
  CalendarEvent,
  WeeklyForecast
} from './config';

class ApiService {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...defaultOptions,
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Horoscope API
  async getHoroscope(request: HoroscopeRequest): Promise<ApiResponse<HoroscopeResponse>> {
    return this.makeRequest<HoroscopeResponse>(API_CONFIG.ENDPOINTS.HOROSCOPE, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  // Zodiac API
  async getZodiacSigns(): Promise<ApiResponse<ZodiacSign[]>> {
    return this.makeRequest<ZodiacSign[]>(API_CONFIG.ENDPOINTS.ZODIAC);
  }

  async getZodiacSign(signId: string): Promise<ApiResponse<ZodiacSign>> {
    return this.makeRequest<ZodiacSign>(`${API_CONFIG.ENDPOINTS.ZODIAC}/${signId}`);
  }

  // Panchang API
  async getPanchang(date?: string): Promise<ApiResponse<PanchangData>> {
    const endpoint = date 
      ? `${API_CONFIG.ENDPOINTS.PANCHANG}?date=${date}`
      : API_CONFIG.ENDPOINTS.PANCHANG;
    return this.makeRequest<PanchangData>(endpoint);
  }

  // Matchmaking API
  async getCompatibility(request: MatchmakingRequest): Promise<ApiResponse<MatchmakingResponse>> {
    return this.makeRequest<MatchmakingResponse>(API_CONFIG.ENDPOINTS.MATCHMAKING, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  // Birth Chart API
  async getBirthChart(request: BirthChartRequest): Promise<ApiResponse<BirthChartResponse>> {
    return this.makeRequest<BirthChartResponse>(API_CONFIG.ENDPOINTS.BIRTH_CHART, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  // Tarot API
  async getTarotReading(): Promise<ApiResponse<TarotReading>> {
    return this.makeRequest<TarotReading>(API_CONFIG.ENDPOINTS.TAROT);
  }

  // Mantra API
  async getMantras(category?: string): Promise<ApiResponse<Mantra[]>> {
    const endpoint = category 
      ? `${API_CONFIG.ENDPOINTS.MANTRA}?category=${category}`
      : API_CONFIG.ENDPOINTS.MANTRA;
    return this.makeRequest<Mantra[]>(endpoint);
  }

  async getMantra(mantraId: string): Promise<ApiResponse<Mantra>> {
    return this.makeRequest<Mantra>(`${API_CONFIG.ENDPOINTS.MANTRA}/${mantraId}`);
  }

  // Remedy API
  async getRemedies(category?: string): Promise<ApiResponse<Remedy[]>> {
    const endpoint = category 
      ? `${API_CONFIG.ENDPOINTS.REMEDY}?category=${category}`
      : API_CONFIG.ENDPOINTS.REMEDY;
    return this.makeRequest<Remedy[]>(endpoint);
  }

  async getRemedy(remedyId: string): Promise<ApiResponse<Remedy>> {
    return this.makeRequest<Remedy>(`${API_CONFIG.ENDPOINTS.REMEDY}/${remedyId}`);
  }

  // Calendar API
  async getCalendarEvents(month?: number, year?: number): Promise<ApiResponse<CalendarEvent[]>> {
    const params = new URLSearchParams();
    if (month !== undefined) params.append('month', month.toString());
    if (year !== undefined) params.append('year', year.toString());
    
    const endpoint = params.toString() 
      ? `${API_CONFIG.ENDPOINTS.CALENDAR}?${params.toString()}`
      : API_CONFIG.ENDPOINTS.CALENDAR;
    return this.makeRequest<CalendarEvent[]>(endpoint);
  }

  async getWeeklyForecast(weekStart?: string): Promise<ApiResponse<WeeklyForecast>> {
    const endpoint = weekStart 
      ? `${API_CONFIG.ENDPOINTS.CALENDAR}/weekly?weekStart=${weekStart}`
      : `${API_CONFIG.ENDPOINTS.CALENDAR}/weekly`;
    return this.makeRequest<WeeklyForecast>(endpoint);
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.makeRequest<{ status: string; timestamp: string }>('/api/health');
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();
export default apiService;
