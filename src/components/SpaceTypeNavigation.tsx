'use client';

import { useState } from 'react';
import { spaceTypes } from '@/data/mockData';

interface SpaceTypeNavigationProps {
  onTypeSelect: (type: string) => void;
  selectedType: string;
}

export default function SpaceTypeNavigation({ onTypeSelect, selectedType }: SpaceTypeNavigationProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-8 overflow-x-auto py-4">
          {spaceTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onTypeSelect(type.id)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-full transition-all duration-200 whitespace-nowrap ${
                selectedType === type.id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className={`text-2xl ${
                selectedType === type.id ? 'text-white' : 'text-gray-600'
              }`}>
                {type.icon}
              </div>
              <span className="font-medium">{type.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
