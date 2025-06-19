'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { flightService } from '@/services/flightService';
import { Flight } from '@/types/flight';
import Checkbox from '@/components/form/input/Checkbox';
import FlightDashboard from '@/components/flight-dashboard/FlightDashboard';
import { formatDuration } from '@/utils/formatDuration';
import NotificationCard from '@/components/notification/NotificationCard';

export default function FlightSearchPage() {
  const [airlineIata, setAirlineIata] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [longHaul, setLongHaul] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState<number | null>();
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSearchLoading(true);
    setDetailsLoading(null);

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
      setSearchLoading(false);
    }
  };

  const viewFlight = (flight: Flight, index: number) => {
    setDetailsLoading(index);
    const flightIata =
      `${flight.airlineIata}${flight.flightNumber}`.toUpperCase();
    const key = `flight_${flightIata}`;
    sessionStorage.setItem(key, JSON.stringify(flight));
    router.push(`/flights/${flightIata}`);
  };

  return (
    <div className="bg-gray-100 p-4 sm:p-6 dark:bg-gray-900">
      <NotificationCard
        message="Please note: Mock data is being used for this demo."
        type="info"
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl dark:text-gray-200">
          Flight Tracker
        </h1>
        <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
          Search for flights by airline code (e.g., AF) and optional flight
          number (e.g., 123)
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex max-w-lg flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Airline Code
            </label>
            <input
              type="text"
              value={airlineIata}
              onChange={e => setAirlineIata(e.target.value.toUpperCase())}
              placeholder="e.g., AA"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-400"
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
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-400"
            />
          </div>
          <div
            className="flex flex-1 cursor-pointer flex-row items-center gap-2"
            onClick={() => setLongHaul(!longHaul)}
          >
            <Checkbox checked={longHaul} onChange={setLongHaul} />
            <span className="text block font-medium text-gray-700 dark:text-gray-300">
              Long haul
            </span>
          </div>
          <div className="flex-1">
            <button
              type="submit"
              disabled={searchLoading || !airlineIata}
              className="my-5 rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700 disabled:bg-gray-400 dark:bg-blue-500 dark:hover:bg-blue-600 dark:disabled:bg-gray-600"
            >
              {searchLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-300">
          {error}
        </div>
      )}

      {flights.length > 0 && <FlightDashboard flights={flights} />}

      {flights.length > 0 ? (
        <div className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                  Callsign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                  Departure Scheduled
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                  Departure Airport
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                  Arrival Airport
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
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
                      onClick={() => viewFlight(flight, index)}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                      aria-label={`View details for flight ${flight.airlineIata}${flight.flightNumber}`}
                    >
                      <div className="flex items-center justify-center w-12 h-5">
                        {detailsLoading === index ? (
                          <span className="w-4 h-4 border-2 border-blue-200 border-t-white rounded-full animate-spin" />
                        ) : (
                          <span className="text-sm">View</span>
                        )}
                      </div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !error &&
        !searchLoading && (
          <div className="text-center text-sm text-gray-600 sm:text-base dark:text-gray-400">
            No flights found. Try searching with an airline code and optional
            flight number.
          </div>
        )
      )}
    </div>
  );
}
