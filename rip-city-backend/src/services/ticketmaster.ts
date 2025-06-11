export interface EventSearchParams {
  city?: string;
  classificationName?: string;
  minPrice?: string;
  maxPrice?: string;
}

export interface TicketmasterEvent {
  id: string;
  name: string;
  url?: string;
  images?: Array<{ url: string; width: number; height: number }>;
  dates?: {
    start?: {
      localDate?: string;
      localTime?: string;
      dateTime?: string;
    };
  };
  _embedded?: {
    venues?: Array<{
      name: string;
      city?: { name: string };
      state?: { name: string };
    }>;
  };
  priceRanges?: Array<{
    type: string;
    currency: string;
    min: number;
    max: number;
  }>;
}

export class TicketmasterService {
  private apiKey: string;
  private baseUrl = 'https://app.ticketmaster.com/discovery/v2';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getEvents(params: EventSearchParams): Promise<TicketmasterEvent[]> {
    if (this.apiKey === 'demo-key') {
      // Return mock data for demo
      return this.getMockEvents();
    }

    try {
      const searchParams = new URLSearchParams({
        apikey: this.apiKey,
        city: params.city || 'Portland',
        classificationName: params.classificationName || 'Sports',
        sort: 'date,asc',
        size: '50'
      });

      if (params.minPrice) searchParams.append('priceMin', params.minPrice);
      if (params.maxPrice) searchParams.append('priceMax', params.maxPrice);

      const response = await fetch(`${this.baseUrl}/events.json?${searchParams}`);
      const data = await response.json();

      return data._embedded?.events || [];
    } catch (error) {
      console.error('Ticketmaster API error:', error);
      return this.getMockEvents();
    }
  }

  async getTrailBlazersEvents(): Promise<TicketmasterEvent[]> {
    return this.getEvents({
      city: 'Portland',
      classificationName: 'Basketball'
    });
  }

  async getPortlandVenues(): Promise<any[]> {
    if (this.apiKey === 'demo-key') {
      return [
        { id: 'venue1', name: 'Moda Center', city: 'Portland' },
        { id: 'venue2', name: 'Providence Park', city: 'Portland' },
        { id: 'venue3', name: 'Theater of the Clouds', city: 'Portland' }
      ];
    }

    try {
      const response = await fetch(`${this.baseUrl}/venues.json?apikey=${this.apiKey}&city=Portland&size=50`);
      const data = await response.json();
      return data._embedded?.venues || [];
    } catch (error) {
      console.error('Venues API error:', error);
      return [];
    }
  }

  private getMockEvents(): TicketmasterEvent[] {
    return [
      {
        id: 'mock1',
        name: 'Portland Trail Blazers vs Los Angeles Lakers',
        dates: {
          start: {
            localDate: '2025-01-15',
            localTime: '19:30:00'
          }
        },
        _embedded: {
          venues: [{
            name: 'Moda Center',
            city: { name: 'Portland' },
            state: { name: 'Oregon' }
          }]
        },
        priceRanges: [{
          type: 'standard',
          currency: 'USD',
          min: 45,
          max: 250
        }]
      },
      {
        id: 'mock2', 
        name: 'Portland Timbers vs Seattle Sounders',
        dates: {
          start: {
            localDate: '2025-01-20',
            localTime: '14:00:00'
          }
        },
        _embedded: {
          venues: [{
            name: 'Providence Park',
            city: { name: 'Portland' },
            state: { name: 'Oregon' }
          }]
        },
        priceRanges: [{
          type: 'standard',
          currency: 'USD',
          min: 25,
          max: 120
        }]
      }
    ];
  }
}
