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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Flight Search</h1>
        <p className="text-gray-600">
          Search for flights by airline code (e.g., AF) and optional flight
          number (e.g., 123)
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex max-w-lg gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Airline Code
            </label>
            <input
              type="text"
              value={airlineIata}
              onChange={e => setAirlineIata(e.target.value.toUpperCase())}
              placeholder="e.g., AA"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Flight Number
            </label>
            <input
              type="text"
              value={flightNumber}
              onChange={e => setFlightNumber(e.target.value)}
              placeholder="e.g., 123 (optional)"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div
            className="flex flex-1 cursor-pointer flex-row items-center gap-2"
            onClick={() => setLongHaul(!longHaul)}
          >
            <Checkbox checked={longHaul} onChange={setLongHaul} />
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Long haul
            </span>
          </div>
          <div className="flex-1">
            <button
              type="submit"
              disabled={loading || !airlineIata}
              className="my-5 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {flights.length > 0 ? (
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Callsign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Departure Scheduled
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Departure Airport
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Arrival Airport
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {flights.map((flight, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                    {flight.airlineIata}
                    {flight.flightNumber}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                    {flight.depScheduled || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                    {formatDuration(flight.duration)}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                    {flight.depIata || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                    {flight.arrIata || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                    <button
                      onClick={() => viewFlight(flight)}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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
          <div className="text-center text-gray-600">
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