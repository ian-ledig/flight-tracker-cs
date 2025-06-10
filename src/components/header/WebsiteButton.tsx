'use client';

import { LinkSmallIcon } from '@/icons';
import React from 'react';

export default function WebsiteButton() {
  function onClick() {
    window.open('https://ian-ledig.com', '_blank');
  }

  return (
    <div className="relative">
      <button
        className="dropdown-toggle relative flex h-11 w-40 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={onClick}
      >
        <LinkSmallIcon />
        <p className="pl-2">ian-ledig.com</p>
      </button>
    </div>
  );
}
