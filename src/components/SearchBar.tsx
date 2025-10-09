'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function SearchBar() {
  const [searchData, setSearchData] = useState({
    query: ''
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]">
          <div className="flex items-center gap-3">
            {/* Campo de busca */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                <input
                  type="text"
                  placeholder="Buscar espaços, locais ou serviços..."
                  value={searchData.query}
                  onChange={(e) => handleInputChange('query', e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200 hover:border-gray-300"
                />
              </div>
            </div>

            {/* Botão de localização */}
            <button className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-105">
              <MapPinIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Localização</span>
            </button>

            {/* Botão de busca */}
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2.5 rounded-lg hover:bg-blue-600 transition-all duration-200 flex items-center gap-2 text-sm font-normal hover:scale-105 hover:shadow-md active:scale-95"
              title="Buscar"
            >
              <MagnifyingGlassIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Buscar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
