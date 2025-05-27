'use client';

import React, { useState } from 'react';
import { flightService } from '@/services/flightService';
import { Flight } from '@/types/flight';

export default function FlightSearchPage() {
  const [callsign, setCallsign] = useState('');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await flightService.getFlightByCallsign(callsign);
      setFlights([data]);
    } catch (err: any) {
      setError(err.message);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Flight Search</h1>
        <p className="text-gray-600">
          Search for flights by callsign (e.g., WZZ5323)
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex max-w-md gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={callsign}
              onChange={e => setCallsign(e.target.value.toUpperCase())}
              placeholder="Enter callsign (e.g., WZZ5323)"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !callsign}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Results Table */}
      {flights.length > 0 && (
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Callsign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Origin Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Origin Airport
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Destination Airport
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {flights.map((flight, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                    {flight.callsign}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                    {flight.originCountry}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                    {flight.originAirport}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                    {flight.destinationAirport}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
