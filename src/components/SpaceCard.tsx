'use client';

import { useState } from 'react';
import { Space } from '@/data/mockData';
import Image from 'next/image';

interface SpaceCardProps {
  space: Space;
}

export default function SpaceCard({ space }: SpaceCardProps) {
  const [isFavorite, setIsFavorite] = useState(space.isFavorite || false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (price: number, pricePer: string) => {
    return `R$ ${price}/${pricePer}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Imagem */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={space.image}
          alt={space.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Botão de favorito */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-200"
        >
          <svg
            className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Tag de preferido */}
        {space.rating >= 4.8 && (
          <div className="absolute top-3 left-3 bg-gray-800/80 text-white px-2 py-1 rounded-lg text-xs font-medium">
            ⭐ Preferido dos hóspedes
          </div>
        )}
      </div>

      {/* Conteúdo do card */}
      <div className="p-4">
        {/* Título e localização */}
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">{space.title}</h3>
          <p className="text-gray-600 text-sm">{space.location}</p>
        </div>

        {/* Descrição */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{space.description}</p>

        {/* Amenidades */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {space.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
              >
                {amenity}
              </span>
            ))}
            {space.amenities.length > 3 && (
              <span className="text-gray-500 text-xs px-2 py-1">
                +{space.amenities.length - 3} mais
              </span>
            )}
          </div>
        </div>

        {/* Preço e avaliação */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-gray-900 text-lg">{formatPrice(space.price, space.pricePer)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium text-gray-900">{space.rating}</span>
            <span className="text-gray-600 text-sm">({space.reviews})</span>
          </div>
        </div>

        {/* Botão de reserva */}
        <button className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
          Reservar
        </button>
      </div>
    </div>
  );
}
