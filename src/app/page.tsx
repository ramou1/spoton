'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import SpaceTypeNavigation from '@/components/SpaceTypeNavigation';
import SearchBar from '@/components/SearchBar';
import SpaceCard from '@/components/SpaceCard';
import { spaces } from '@/data/mockData';

export default function Home() {
  const [selectedType, setSelectedType] = useState('all');

  const filteredSpaces = useMemo(() => {
    if (selectedType === 'all') {
      return spaces.slice(0, 8); // Limitar a 8 espaços em destaque
    }
    return spaces.filter(space => space.type === selectedType);
  }, [selectedType]);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      
      {/* Seção de busca e filtros */}
      <div className="bg-neutral-800/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Título e descrição */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-100">
              Reserve espaços únicos
            </h1>
            <p className="text-xs md:text-sm text-gray-400 font-light">
              De coworkings a restaurantes, encontre o espaço perfeito para suas necessidades
            </p>
          </div>

          {/* Barra de busca */}
          <SearchBar />

          {/* Navegação de tipos */}
          <div className="mt-8">
            <SpaceTypeNavigation 
              onTypeSelect={handleTypeSelect}
              selectedType={selectedType}
            />
          </div>
        </div>
      </div>

      {/* Seções de espaços */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Espaços em destaque */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-100">
                {selectedType === 'all' 
                  ? 'Espaços em destaque' 
                  : `${filteredSpaces.length} espaços disponíveis`
                }
              </h2>
              {selectedType !== 'all' && (
                <button
                  onClick={() => setSelectedType('all')}
                  className="bg-neutral-700 hover:bg-neutral-600 text-gray-200 hover:text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 active:scale-95 border border-neutral-600 hover:border-purple-400/50"
                >
                  ✕ Limpar filtro
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
                <h2 className="text-lg font-semibold text-gray-100 mb-4">
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
                <h2 className="text-lg font-semibold text-gray-100 mb-4">
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
                <h2 className="text-lg font-semibold text-gray-100 mb-4">
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
                <h2 className="text-lg font-semibold text-gray-100 mb-4">
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
      <footer className="bg-neutral-950 border-t border-neutral-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="mb-3">
                <Image 
                  src="/images/logo-spoton.png" 
                  alt="Spoton Logo" 
                  width={120}
                  height={40}
                  className="object-contain"
                />
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
          
          <div className="border-t border-slate-800 mt-6 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Spoton. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}