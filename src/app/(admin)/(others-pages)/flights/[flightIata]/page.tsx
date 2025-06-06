'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { flightService } from '@/services/flightService';
import { Flight } from '@/types/flight';
import { format, parseISO, differenceInMilliseconds } from 'date-fns';
import airports from '@/data/airports.json';
import 'leaflet/dist/leaflet.css';
import { Airports } from '@/types/airport';
import { useMap } from 'react-leaflet';
import { formatDuration } from '@/utils/FormatDuration';

const typedAirports = airports as Airports;

const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);
const Polyline = dynamic(
  () => import('react-leaflet').then(mod => mod.Polyline),
  { ssr: false }
);
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), {
  ssr: false,
});

const FlightMap = ({
  flight,
  airplanePosition,
  getCoordinates,
  flightPath,
}: {
  flight: Flight;
  airplanePosition: [number, number] | null;
  getCoordinates: {
    depLat: number | null;
    depLng: number | null;
    arrLat: number | null;
    arrLng: number | null;
  };
  flightPath: [number, number][];
}) => {
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    import('leaflet').then(module => {
      setL(module.default);
    });
  }, []);

  const MapCenter = () => {
    const map = useMap();
    const { depLat, depLng, arrLat, arrLng } = getCoordinates;
    useEffect(() => {
      if (
        depLat !== null &&
        depLng !== null &&
        arrLat !== null &&
        arrLng !== null &&
        L
      ) {
        const bounds = L.latLngBounds([depLat, depLng], [arrLat, arrLng]);
        map.fitBounds(bounds, { padding: [50, 50] });
        map.invalidateSize();
      }
    }, [map, depLat, depLng, arrLat, arrLng]);
    return null;
  };

  if (!L) return null;

  const airportIcon = new L.Icon({
    iconUrl: '/images/icons/airport.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    className: 'leaflet-custom-icon',
  });

  const airplaneIcon = new L.Icon({
    iconUrl: '/images/icons/aircraft.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    className: 'leaflet-custom-icon',
  });

  const depAirportName = typedAirports[flight.depIata]?.name || flight.depIata;
  const arrAirportName = typedAirports[flight.arrIata]?.name || flight.arrIata;

  return (
    <MapContainer
      style={{ height: '100%', width: '100%' }}
      zoom={5}
      className="rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapCenter />
      {flightPath.length > 0 && (
        <Polyline 
          positions={flightPath} 
          pathOptions={{
            color: '#465fff',
            weight: 3,
            opacity: 1,
          }} 
        />
      )}
      <Marker
        position={[getCoordinates.depLat!, getCoordinates.depLng!]}
        icon={airportIcon}
      >
        <Popup>
          {depAirportName} ({flight.depIata})
        </Popup>
      </Marker>
      <Marker
        position={[getCoordinates.arrLat!, getCoordinates.arrLng!]}
        icon={airportIcon}
      >
        <Popup>
          {arrAirportName} ({flight.arrIata})
        </Popup>
      </Marker>
      {flight.status === 'en route' && airplanePosition && (
        <Marker position={airplanePosition} icon={airplaneIcon}>
          <Popup>
            Flight {flight.airlineIata}
            {flight.flightNumber}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

const FlightDetailsPage = ({
  params: paramsPromise,
}: {
  params: Promise<{ flightIata: string }>;
}) => {
  const params = React.use(paramsPromise);
  const [flight, setFlight] = useState<Flight | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [airplanePosition, setAirplanePosition] = useState<
    [number, number] | null
  >(null);
  const router = useRouter();

  useEffect(() => {
    const flightIata = params.flightIata.toUpperCase();
    const flightData = sessionStorage.getItem(`flight_${flightIata}`);
    if (flightData) {
      const parsedFlight = JSON.parse(flightData);
      setFlight(parsedFlight);
      setLoading(false);
    } else {
      flightService
        .getFlights(flightIata.substring(0, 2), flightIata.substring(2))
        .then(data => {
          const flightData = Array.isArray(data) ? data[0] : data;
          setFlight(flightData);
          setLoading(false);
        })
        .catch((err: any) => {
          setError('Flight data not found. Please return to the search page.');
          setLoading(false);
        });
    }
    return () => {
      sessionStorage.removeItem(`flight_${flightIata}`);
    };
  }, [params.flightIata]);

  const getCoordinates = useMemo(() => {
    if (!flight)
      return { depLat: null, depLng: null, arrLat: null, arrLng: null };

    const depAirport = typedAirports[flight.depIata];
    const arrAirport = typedAirports[flight.arrIata];

    return {
      depLat: flight.depLat ?? depAirport?.lat ?? null,
      depLng: flight.depLng ?? depAirport?.lng ?? null,
      arrLat: flight.arrLat ?? arrAirport?.lat ?? null,
      arrLng: flight.arrLng ?? arrAirport?.lng ?? null,
    };
  }, [flight]);

  useEffect(() => {
    const { depLat, depLng, arrLat, arrLng } = getCoordinates;
    if (
      !flight ||
      flight.status !== 'en route' ||
      depLat === null ||
      depLng === null ||
      arrLat === null ||
      arrLng === null
    ) {
      return;
    }

    const depTime = parseISO(flight.depScheduled);
    const arrTime = parseISO(flight.arrScheduled);
    const totalDuration = differenceInMilliseconds(arrTime, depTime);
    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = differenceInMilliseconds(now, depTime);
      const progress = Math.min(elapsed / totalDuration, 1);

      if (progress >= 1) {
        clearInterval(interval);
        setAirplanePosition([arrLat, arrLng]);
        return;
      }

      const lat = depLat + (arrLat - depLat) * progress;
      const lng = depLng + (arrLng - depLng) * progress;
      setAirplanePosition([lat, lng]);
    }, 1000);

    return () => clearInterval(interval);
  }, [flight, getCoordinates]);

  const flightPath: [number, number][] = useMemo(() => {
    const { depLat, depLng, arrLat, arrLng } = getCoordinates;
    if (
      typeof depLat === 'number' &&
      typeof depLng === 'number' &&
      typeof arrLat === 'number' &&
      typeof arrLng === 'number'
    ) {
      return [
        [depLat, depLng],
        [arrLat, arrLng],
      ];
    }
    return [];
  }, [getCoordinates]);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base">
        Loading flight details...
      </div>
    );
  }

  if (error || !flight) {
    return (
      <div className="p-4 sm:p-6">
        <div className="mb-6 rounded-lg bg-red-100 dark:bg-red-900 p-4 text-red-700 dark:text-red-300">
          {error || 'Flight not found'}
        </div>
        <button
          onClick={() => router.push('/flights')}
          className="rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300"
        >
          Back to Search
        </button>
      </div>
    );
  }

  const depAirportName = typedAirports[flight.depIata]?.name || flight.depIata;
  const arrAirportName = typedAirports[flight.arrIata]?.name || flight.arrIata;
  const hasCoordinates =
    getCoordinates.depLat !== null &&
    getCoordinates.depLng !== null &&
    getCoordinates.arrLat !== null &&
    getCoordinates.arrLng !== null;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">
          Flight {flight.airlineIata}
          {flight.flightNumber} Details
        </h1>
        <button
          onClick={() => router.push('/flights')}
          className="mt-2 rounded-lg bg-gray-600 dark:bg-gray-500 px-4 py-2 text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition duration-300"
          aria-label="Back to flight search"
        >
          Back to Search
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Flight Info */}
        <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md">
          <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Flight Information
          </h2>
          <div className="space-y-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            <p>
              <strong>Flight Number:</strong> {flight.airlineIata}
              {flight.flightNumber}
            </p>
            <p>
              <strong>Status:</strong> {flight.status || 'N/A'}
            </p>
            <p>
              <strong>Departure Airport:</strong> {depAirportName}
            </p>
            <p>
              <strong>Arrival Airport:</strong> {arrAirportName}
            </p>
            <p>
              <strong>Scheduled Departure:</strong>{' '}
              {flight.depScheduled
                ? format(parseISO(flight.depScheduled), 'PPp')
                : 'N/A'}
            </p>
            <p>
              <strong>Estimated Departure:</strong>{' '}
              {flight.depEstimated
                ? format(parseISO(flight.depEstimated), 'PPp')
                : 'N/A'}
            </p>
            <p>
              <strong>Scheduled Arrival:</strong>{' '}
              {flight.arrScheduled
                ? format(parseISO(flight.arrScheduled), 'PPp')
                : 'N/A'}
            </p>
            <p>
              <strong>Estimated Arrival:</strong>{' '}
              {flight.arrEstimated
                ? format(parseISO(flight.arrEstimated), 'PPp')
                : 'N/A'}
            </p>
            <p>
              <strong>Aircraft:</strong> {flight.aircraftIata || 'N/A'}
            </p>
            <p>
              <strong>Duration:</strong> {formatDuration(flight.duration) || 'N/A'}
            </p>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md">
          <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Flight Path
          </h2>
          {hasCoordinates ? (
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
              <FlightMap
                flight={flight}
                airplanePosition={airplanePosition}
                getCoordinates={getCoordinates}
                flightPath={flightPath}
              />
            </div>
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Coordinates not available for this flight.
            </div>
          )}
          {flight.status !== 'en route' && (
            <div className="mt-4 text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              {flight.status === 'scheduled'
                ? 'Flight has not yet departed.'
                : 'Flight has landed.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsPage;