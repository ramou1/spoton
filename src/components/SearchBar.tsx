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
    <div className="max-w-4xl mx-auto">
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4 shadow-lg transition-all duration-300">
        <div className="flex items-center gap-3">
            {/* Campo de busca */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors duration-200" />
                <input
                  type="text"
                  placeholder="Buscar espaços, locais ou serviços..."
                  value={searchData.query}
                  onChange={(e) => handleInputChange('query', e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full border border-neutral-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-neutral-900 focus:bg-neutral-900/90 transition-all duration-200 hover:border-neutral-600"
                />
              </div>
            </div>

            {/* Botão de localização */}
            <button className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-neutral-700 rounded-lg transition-all duration-200 hover:scale-105">
              <MapPinIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Localização</span>
            </button>

            {/* Botão de busca */}
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2.5 rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all duration-200 flex items-center gap-2 text-sm font-normal hover:scale-105 active:scale-95"
              title="Buscar"
            >
              <MagnifyingGlassIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Buscar</span>
            </button>
          </div>
        </div>
      </div>
  );
}
