import React from 'react';

export default function FlightSearchInfoPage() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
      {/* TailAdmin Card Component */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Welcome to Flight Tracker</h1>
        
        {/* TailAdmin Section Divider */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>
        
        {/* Introduction Section */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3">About Flight Tracker</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
            Flight Tracker is a modern web application designed to help you quickly and easily find upcoming flights. 
            Whether you're a frequent traveler, an airline professional, or simply planning your next trip, 
            Flight Tracker provides a streamlined interface to search for flights using an airline code, 
            optional flight number, and an optional long-haul filter.
          </p>
        </section>

        {/* Features Section */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3">How It Works</h2>
          <div className="space-y-4">
            {/* Feature 1: Airline Code */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200">Airline Code (Required)</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  Enter the two-letter IATA airline code (e.g., AF for Air France, BA for British Airways) 
                  to retrieve a list of upcoming flights operated by that airline.
                </p>
              </div>
            </div>

            {/* Feature 2: Flight Number */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200">Flight Number (Optional)</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  Narrow down your search by entering a specific flight number (e.g., AF1234). 
                  This is optional and can be used to find details about a particular flight.
                </p>
              </div>
            </div>

            {/* Feature 3: Long-Haul Filter */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18m-9-9v18"></path>
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200">Long-Haul Filter (Optional)</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  Use the long-haul filter to display only flights that are considered long-haul 
                  (typically flights longer than 6 hours or covering significant distances).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3">Get Started</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
            Ready to explore upcoming flights? Head over to the search page to start using Flight Tracker!
          </p>
          <a
            href="/flights"
            className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300"
          >
            Start Searching
          </a>
        </section>
      </div>
    </div>
  );
}