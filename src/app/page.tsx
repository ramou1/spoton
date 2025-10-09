'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import SpaceTypeNavigation from '@/components/SpaceTypeNavigation';
import SearchBar from '@/components/SearchBar';
import SpaceCard from '@/components/SpaceCard';
import { spaces } from '@/data/mockData';

export default function Home() {
  const [selectedType, setSelectedType] = useState('all');

  const filteredSpaces = useMemo(() => {
    if (selectedType === 'all') {
      return spaces;
    }
    return spaces.filter(space => space.type === selectedType);
  }, [selectedType]);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">
            Reserve espaços únicos
          </h1>
          <p className="text-base md:text-lg mb-4 opacity-90 font-normal">
            De coworkings a restaurantes, encontre o espaço perfeito para suas necessidades
          </p>
        </div>
      </div>

      {/* Navegação de tipos */}
      <SpaceTypeNavigation 
        onTypeSelect={handleTypeSelect}
        selectedType={selectedType}
      />

      {/* Barra de busca */}
      <SearchBar />

      {/* Seções de espaços */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Espaços em destaque */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedType === 'all' 
                  ? 'Espaços em destaque' 
                  : `${filteredSpaces.length} espaços disponíveis`
                }
              </h2>
              {selectedType !== 'all' && (
                <button
                  onClick={() => setSelectedType('all')}
                  className="text-blue-500 hover:text-blue-600 font-normal text-sm"
                >
                  Ver todos
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredSpaces.map((space, index) => (
                <div 
                  key={space.id} 
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <SpaceCard space={space} />
                </div>
              ))}
            </div>
          </div>

          {/* Espaços populares por categoria */}
          {selectedType === 'all' && (
            <>
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Coworkings populares
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {spaces
                    .filter(space => space.type === 'coworking')
                    .slice(0, 4)
                    .map((space) => (
                      <SpaceCard key={space.id} space={space} />
                    ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Estacionamentos em alta
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {spaces
                    .filter(space => space.type === 'estacionamento')
                    .slice(0, 4)
                    .map((space) => (
                      <SpaceCard key={space.id} space={space} />
                    ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Restaurantes exclusivos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {spaces
                    .filter(space => space.type === 'restaurante')
                    .slice(0, 4)
                    .map((space) => (
                      <SpaceCard key={space.id} space={space} />
                    ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Serviços profissionais
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {spaces
                    .filter(space => space.type === 'servico')
                    .slice(0, 4)
                    .map((space) => (
                      <SpaceCard key={space.id} space={space} />
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">S</span>
                </div>
                <span className="text-lg font-semibold">Spoton</span>
              </div>
              <p className="text-gray-400 text-sm">
                Conectando pessoas a espaços únicos em todo o Brasil.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 text-sm">Produtos</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Coworkings</a></li>
                <li><a href="#" className="hover:text-white">Estacionamento</a></li>
                <li><a href="#" className="hover:text-white">Restaurantes</a></li>
                <li><a href="#" className="hover:text-white">Serviços</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 text-sm">Suporte</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
                <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 text-sm">Conta</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Entrar</a></li>
                <li><a href="#" className="hover:text-white">Cadastrar</a></li>
                <li><a href="#" className="hover:text-white">Minhas Reservas</a></li>
                <li><a href="#" className="hover:text-white">Seja um Anfitrião</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Spoton. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}