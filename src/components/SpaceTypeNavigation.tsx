'use client';

import { useState } from 'react';
import { spaceTypes } from '@/data/mockData';

interface SpaceTypeNavigationProps {
  onTypeSelect: (type: string) => void;
  selectedType: string;
}

export default function SpaceTypeNavigation({ onTypeSelect, selectedType }: SpaceTypeNavigationProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-neutral-800 rounded-full p-2 flex items-center space-x-2 overflow-x-auto">
        {spaceTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeSelect(type.id)}
            className={`flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 whitespace-nowrap hover:scale-105 active:scale-95 ${
              selectedType === type.id
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                : 'text-gray-300 hover:bg-neutral-700 hover:text-white'
            }`}
          >
            <type.icon className={`w-5 h-5 ${
              selectedType === type.id ? 'text-white' : 'text-gray-400'
            }`} />
            <span className="font-medium text-sm">{type.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
