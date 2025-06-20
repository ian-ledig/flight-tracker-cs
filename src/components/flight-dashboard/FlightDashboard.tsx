'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Flight } from '@/types/flight';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface FlightDashboardProps {
  flights: Flight[];
}

const FlightDashboard: React.FC<FlightDashboardProps> = ({ flights }) => {
  const totalFlights = useMemo(() => flights.length, [flights]);

  const statusCounts = useMemo(() => {
    const counts = flights.reduce(
      (acc, flight) => {
        const status = flight.status || 'unknown';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    return counts;
  }, [flights]);

  const durationCounts = useMemo(() => {
    const counts = {
      short: 0,
      medium: 0,
      long: 0,
    };
    flights.forEach(flight => {
      const duration = flight.duration || 0;
      if (duration < 180) counts.short += 1;
      else if (duration <= 360) counts.medium += 1;
      else counts.long += 1;
    });
    return counts;
  }, [flights]);

  const baseChartOptions: ApexOptions = {
    colors: ['#465fff', '#FFCE56', '#FF6384', '#9966FF', '#4BC0C0'],
    chart: {
      fontFamily: 'Outfit, sans-serif',
      type: 'bar',
      height: 150,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '39%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ['transparent'] },
    grid: { yaxis: { lines: { show: true } } },
    fill: { opacity: 1 },
    tooltip: {
      x: { show: false },
      y: { formatter: (val: number) => `${val} flights` },
      theme: 'light',
    },
  };

  const statusChartOptions: ApexOptions = {
    ...baseChartOptions,
    xaxis: {
      categories: Object.keys(statusCounts),
      axisBorder: { show: false },
      axisTicks: { show: false },
      title: {
        text: 'Status',
        style: {
          color: '#1F2937',
          fontSize: '12px',
          fontFamily: 'Outfit, sans-serif',
        },
      },
      labels: {
        style: {
          colors: '#6B7280',
          fontFamily: 'Outfit, sans-serif',
          fontSize: '10px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Flights',
        style: {
          color: '#1F2937',
          fontSize: '12px',
          fontFamily: 'Outfit, sans-serif',
        },
      },
      labels: {
        style: {
          colors: '#6B7280',
          fontFamily: 'Outfit, sans-serif',
          fontSize: '10px',
        },
      },
    },
  };

  const durationChartOptions: ApexOptions = {
    ...baseChartOptions,
    xaxis: {
      categories: ['Short (<3h)', 'Medium (3-6h)', 'Long (>6h)'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      title: {
        text: 'Duration',
        style: {
          color: '#1F2937',
          fontSize: '12px',
          fontFamily: 'Outfit, sans-serif',
        },
      },
      labels: {
        style: {
          colors: '#6B7280',
          fontFamily: 'Outfit, sans-serif',
          fontSize: '10px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Flights',
        style: {
          color: '#1F2937',
          fontSize: '12px',
          fontFamily: 'Outfit, sans-serif',
        },
      },
      labels: {
        style: {
          colors: '#6B7280',
          fontFamily: 'Outfit, sans-serif',
          fontSize: '10px',
        },
      },
    },
  };

  const statusChartSeries = [
    { name: 'Flights', data: Object.values(statusCounts) },
  ];
  const durationChartSeries = [
    {
      name: 'Flights',
      data: [durationCounts.short, durationCounts.medium, durationCounts.long],
    },
  ];

  return (
    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Total Flights */}
      <div className="flex items-center justify-center rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Flights
          </p>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {totalFlights}
          </p>
        </div>
      </div>

      {/* Status Chart */}
      <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
        <h2 className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
          Flight Status
        </h2>
        <div className="w-full">
          <ReactApexChart
            options={statusChartOptions}
            series={statusChartSeries}
            type="bar"
            height={150}
          />
        </div>
      </div>

      {/* Duration Chart */}
      <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
        <h2 className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
          Flight Duration
        </h2>
        <div className="w-full">
          <ReactApexChart
            options={durationChartOptions}
            series={durationChartSeries}
            type="bar"
            height={150}
          />
        </div>
      </div>
    </div>
  );
};

export default FlightDashboard;
