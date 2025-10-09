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
        <div className="flex items-center justify-center py-4">
          <div className="bg-gray-50 rounded-full p-2 flex items-center space-x-2 overflow-x-auto">
            {spaceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => onTypeSelect(type.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 whitespace-nowrap hover:scale-105 active:scale-95 ${
                  selectedType === type.id
                    ? 'bg-blue-500 text-white shadow-md hover:shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <type.icon className={`w-5 h-5 ${
                  selectedType === type.id ? 'text-white' : 'text-gray-600'
                }`} />
                <span className="font-medium text-sm">{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
