'use client';

import React from 'react';
import {
  GithubIcon
} from '../../icons/index';

export default function SourceButton() {
  const handleClick = () => {
    window.open("https://github.com/ian-ledig/flight-tracker-cs", "_blank");
  };
  return (
    <div className="relative">
      <button
        className="dropdown-toggle relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={handleClick}
      >
        <span
          className={`absolute top-0.5 right-0 z-10 h-2 w-2 rounded-full bg-orange-400`}
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
        </span>
        <GithubIcon />
      </button>
    </div>
  );
}
