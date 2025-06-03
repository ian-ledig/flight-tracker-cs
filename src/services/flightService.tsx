import { Flight } from '@/types/flight';

export const flightService = {
  async getFlights(airlineIata: string, flightNumber?: string, notDeparted?: boolean): Promise<Flight[]> {
    try {
      const url = new URL(`http://localhost:8080/api/flights/${airlineIata}`);
      if (flightNumber) {
        url.searchParams.append('flightNumber', flightNumber);
      }
      if(notDeparted){
        url.searchParams.append('notDeparted', 'true');
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Flight ${airlineIata}${flightNumber} not found`);
        }
        throw new Error('An error occurred while fetching flight data');
      }
      return await response.json();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
