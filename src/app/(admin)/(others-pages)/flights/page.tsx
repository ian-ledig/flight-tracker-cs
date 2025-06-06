'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { flightService } from '@/services/flightService';
import { Flight } from '@/types/flight';
import Checkbox from '@/components/form/input/Checkbox';

export default function FlightSearchPage() {
  const [airlineIata, setAirlineIata] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [longHaul, setLongHaul] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await flightService.getFlights(
        airlineIata,
        flightNumber,
        longHaul
      );
      setFlights(data);
    } catch (err: any) {
      setError(err.message);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  const viewFlight = (flight: Flight) => {
    const flightIata =
      `${flight.airlineIata}${flight.flightNumber}`.toUpperCase();
    const key = `flight_${flightIata}`;
    sessionStorage.setItem(key, JSON.stringify(flight));
    router.push(`/flights/${flightIata}`);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">Flight Tracker</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Search for flights by airline code (e.g., AF) and optional flight
          number (e.g., 123)
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex max-w-lg flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Airline Code
            </label>
            <input
              type="text"
              value={airlineIata}
              onChange={e => setAirlineIata(e.target.value.toUpperCase())}
              placeholder="e.g., AA"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Flight Number
            </label>
            <input
              type="text"
              value={flightNumber}
              onChange={e => setFlightNumber(e.target.value)}
              placeholder="e.g., 123"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div
            className="flex flex-1 cursor-pointer flex-row items-center gap-2"
            onClick={() => setLongHaul(!longHaul)}
          >
            <Checkbox checked={longHaul} onChange={setLongHaul} />
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Long haul
            </span>
          </div>
          <div className="flex-1">
            <button
              type="submit"
              disabled={loading || !airlineIata}
              className="my-5 rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition duration-300"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="mb-6 rounded-lg bg-red-100 dark:bg-red-900 p-4 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {flights.length > 0 ? (
        <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 dark:text-gray-300 uppercase">
                  Callsign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 dark:text-gray-300 uppercase">
                  Departure Scheduled
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 dark:text-gray-300 uppercase">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 dark:text-gray-300 uppercase">
                  Departure Airport
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 dark:text-gray-300 uppercase">
                  Arrival Airport
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 dark:text-gray-300 uppercase">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
              {flights.map((flight, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-200">
                    {flight.airlineIata}
                    {flight.flightNumber}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-200">
                    {flight.depScheduled || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-200">
                    {formatDuration(flight.duration)}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-200">
                    {flight.depIata || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-200">
                    {flight.arrIata || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <button
                      onClick={() => viewFlight(flight)}
                      className="rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300"
                      aria-label={`View details for flight ${flight.airlineIata}${flight.flightNumber}`}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !error &&
        !loading && (
          <div className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            No flights found. Try searching with an airline code and optional
            flight number.
          </div>
        )
      )}
    </div>
  );
}

function formatDuration(minutes?: number): string {
  if (minutes == null || isNaN(minutes)) return 'N/A';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0 && mins > 0) return `${hours}h ${mins}min`;
  if (hours > 0) return `${hours}h`;
  return `${mins}min`;
}