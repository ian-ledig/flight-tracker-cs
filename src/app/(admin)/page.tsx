import Link from 'next/link';
import React from 'react';

export default function FlightSearchInfoPage() {
  return (
    <div className="bg-gray-100 p-4 sm:p-6 dark:bg-gray-900">
      {/* TailAdmin Card Component */}
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-4 shadow-md sm:p-6 dark:bg-gray-800">
        <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl dark:text-gray-200">
          Welcome to Flight Tracker
        </h1>

        {/* TailAdmin Section Divider */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700"></div>

        {/* Introduction Section */}
        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-gray-700 sm:text-2xl dark:text-gray-300">
            About Flight Tracker
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-400">
            Flight Tracker is a modern web application designed to help you
            quickly and easily find upcoming flights. Whether you&apos;re a
            frequent traveler, an airline professional, or simply planning your
            next trip, Flight Tracker provides a streamlined interface to search
            for flights using an airline code, optional flight number, and an
            optional long-haul filter.
          </p>
        </section>

        {/* Features Section */}
        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-gray-700 sm:text-2xl dark:text-gray-300">
            How It Works
          </h2>
          <div className="space-y-4">
            {/* Feature 1: Airline Code */}
            <div className="flex items-start">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:h-12 sm:w-12 dark:bg-blue-900">
                <svg
                  className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-base font-medium text-gray-800 sm:text-lg dark:text-gray-200">
                  Airline Code (Required)
                </h3>
                <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                  Enter the two-letter IATA airline code (e.g., AF for Air
                  France, BA for British Airways) to retrieve a list of upcoming
                  flights operated by that airline.
                </p>
              </div>
            </div>

            {/* Feature 2: Flight Number */}
            <div className="flex items-start">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:h-12 sm:w-12 dark:bg-blue-900">
                <svg
                  className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-base font-medium text-gray-800 sm:text-lg dark:text-gray-200">
                  Flight Number (Optional)
                </h3>
                <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                  Narrow down your search by entering a specific flight number
                  (e.g., AF1234). This is optional and can be used to find
                  details about a particular flight.
                </p>
              </div>
            </div>

            {/* Feature 3: Long-Haul Filter */}
            <div className="flex items-start">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:h-12 sm:w-12 dark:bg-blue-900">
                <svg
                  className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12h18m-9-9v18"
                  ></path>
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-base font-medium text-gray-800 sm:text-lg dark:text-gray-200">
                  Long-Haul Filter (Optional)
                </h3>
                <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                  Use the long-haul filter to display only flights that are
                  considered long-haul (typically flights longer than 6 hours or
                  covering significant distances).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="mb-3 text-xl font-semibold text-gray-700 sm:text-2xl dark:text-gray-300">
            Get Started
          </h2>
          <p className="mb-4 text-sm text-gray-600 sm:text-base dark:text-gray-400">
            Ready to explore upcoming flights? Head over to the search page to
            start using Flight Tracker!
          </p>
          <Link
            href="/flights"
            className="inline-block rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition duration-300 hover:bg-blue-700 sm:px-6 sm:py-3 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Start Searching
          </Link>
        </section>
      </div>
    </div>
  );
}
