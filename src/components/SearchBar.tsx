'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    // Implementar lógica de busca
    console.log('Buscar:', searchData);
  };

  return (
    <div className="bg-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Localização */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Onde</label>
              <input
                type="text"
                placeholder="Buscar destinos"
                value={searchData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Check-in */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Check-in</label>
              <input
                type="date"
                value={searchData.checkIn}
                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Check-out */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Check-out</label>
              <input
                type="date"
                value={searchData.checkOut}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

          </div>

          {/* Botão de busca */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Buscar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
