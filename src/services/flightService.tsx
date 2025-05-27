import { Flight } from '@/types/flight';

export const flightService = {
  async getFlightByCallsign(callsign: string): Promise<Flight> {
    try {
      const response = await fetch(
        `http://localhost:8080/api/flights/${callsign}`
      );
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Flight with callsign ${callsign} not found`);
        }
        throw new Error('An error occurred while fetching flight data');
      }
      return await response.json();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
