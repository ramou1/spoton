'use client';

import { useState } from 'react';
import { spaceTypes } from '@/data/mockData';

interface SpaceTypeNavigationProps {
  onTypeSelect: (type: string) => void;
  selectedType: string;
}

export default function SpaceTypeNavigation({ onTypeSelect, selectedType }: SpaceTypeNavigationProps) {
  return (
    <div className="bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {spaceTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onTypeSelect(type.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                selectedType === type.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{type.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{type.name}</h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
