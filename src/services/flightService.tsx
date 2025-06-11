import { Flight } from '@/types/flight';

export const flightService = {
  async getFlights(
    airlineIata: string,
    flightNumber?: string,
    longHaul?: boolean
  ): Promise<Flight[]> {
    try {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/flights/${airlineIata}`
      );
      if (flightNumber) {
        url.searchParams.append('flightNumber', flightNumber);
      }
      if (longHaul) {
        url.searchParams.append('longHaul', 'true');
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
