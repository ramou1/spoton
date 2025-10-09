'use client';

import { useState } from 'react';

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
    <div className="bg-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 relative">
          <div className="flex items-center gap-4">
            {/* Campo de busca */}
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                O que você está procurando?
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Digite o local, tipo de espaço ou serviço..."
                  value={searchData.query}
                  onChange={(e) => handleInputChange('query', e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Ex: "Coworking em São Paulo", "Estacionamento próximo ao centro", "Restaurante italiano"
              </p>
            </div>

            {/* Botão de busca */}
            <div className="flex-shrink-0">
              <button
                onClick={handleSearch}
                className="bg-gray-900 text-white p-3 rounded-xl hover:bg-gray-800 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                title="Buscar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
