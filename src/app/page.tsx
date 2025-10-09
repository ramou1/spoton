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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Reserve espaços únicos
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
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
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Espaços em destaque */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedType === 'all' 
                  ? 'Espaços em destaque' 
                  : `${filteredSpaces.length} espaços disponíveis`
                }
              </h2>
              {selectedType !== 'all' && (
                <button
                  onClick={() => setSelectedType('all')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Ver todos
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSpaces.map((space) => (
                <SpaceCard key={space.id} space={space} />
              ))}
            </div>
          </div>

          {/* Espaços populares por categoria */}
          {selectedType === 'all' && (
            <>
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Coworkings populares
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {spaces
                    .filter(space => space.type === 'coworking')
                    .slice(0, 4)
                    .map((space) => (
                      <SpaceCard key={space.id} space={space} />
                    ))}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Estacionamentos em alta
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {spaces
                    .filter(space => space.type === 'estacionamento')
                    .slice(0, 4)
                    .map((space) => (
                      <SpaceCard key={space.id} space={space} />
                    ))}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Restaurantes exclusivos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {spaces
                    .filter(space => space.type === 'restaurante')
                    .slice(0, 4)
                    .map((space) => (
                      <SpaceCard key={space.id} space={space} />
                    ))}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Serviços profissionais
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold">Spoton</span>
              </div>
              <p className="text-gray-400">
                Conectando pessoas a espaços únicos em todo o Brasil.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produtos</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Coworkings</a></li>
                <li><a href="#" className="hover:text-white">Estacionamento</a></li>
                <li><a href="#" className="hover:text-white">Restaurantes</a></li>
                <li><a href="#" className="hover:text-white">Serviços</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
                <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Conta</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Entrar</a></li>
                <li><a href="#" className="hover:text-white">Cadastrar</a></li>
                <li><a href="#" className="hover:text-white">Minhas Reservas</a></li>
                <li><a href="#" className="hover:text-white">Seja um Anfitrião</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Spoton. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}