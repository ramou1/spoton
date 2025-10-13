'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import SpaceCard from '@/components/SpaceCard';
import { spaces } from '@/data/mockData';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);

  // Atualizar query quando mudar na URL
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  // Filtrar espaços baseado na busca
  const filteredSpaces = useMemo(() => {
    if (!searchQuery.trim()) {
      return spaces;
    }

    const queryLower = searchQuery.toLowerCase().trim();
    
    return spaces.filter(space => 
      space.title.toLowerCase().includes(queryLower) ||
      space.location.toLowerCase().includes(queryLower) ||
      space.description.toLowerCase().includes(queryLower) ||
      space.type.toLowerCase().includes(queryLower) ||
      space.amenities.some(amenity => 
        amenity.toLowerCase().includes(queryLower)
      )
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      
      {/* Seção de busca */}
      <div className="bg-neutral-800/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-100">
              {searchQuery ? `Resultados para "${searchQuery}"` : 'Buscar espaços'}
            </h1>
            {searchQuery && (
              <p className="text-sm text-gray-400 mb-6">
                {filteredSpaces.length} {filteredSpaces.length === 1 ? 'espaço encontrado' : 'espaços encontrados'}
              </p>
            )}
          </div>
          
          {/* Barra de busca */}
          <SearchBar />
        </div>
      </div>

      {/* Resultados */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredSpaces.length > 0 ? (
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
          ) : (
            <div className="text-center py-12">
              <MagnifyingGlassIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                Nenhum espaço encontrado
              </h3>
              <p className="text-gray-400 mb-6">
                Tente usar termos diferentes ou explore todas as categorias
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {spaces.slice(0, 8).map((space) => (
                  <SpaceCard key={space.id} space={space} />
                ))}
              </div>
            </div>
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
