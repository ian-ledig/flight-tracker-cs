'use client';

import { LinkSmallIcon } from '@/icons';
import React from 'react';

type WebsiteButtonProps = {
  href: string;
};

export default function WebsiteButton({ href }: WebsiteButtonProps) {
  function onClick() {
    window.open(href, '_blank');
  }

  return (
    <div className="relative">
      <button
        className="dropdown-toggle relative flex h-11 w-40 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={onClick}
      >
        <LinkSmallIcon />
        <p className="pl-2">{href.replace(/^https?:\/\//, '')}</p>
      </button>
    </div>
  );
}
