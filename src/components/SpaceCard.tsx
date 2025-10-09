'use client';

import { useState } from 'react';
import { Space } from '@/data/mockData';
import Image from 'next/image';
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

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
    <div className="bg-white rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-300 overflow-hidden group hover:scale-[1.02] hover:-translate-y-1">
      {/* Imagem */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={space.image}
          alt={space.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        
        {/* Botão de favorito */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full hover:bg-white transition-all duration-200 hover:scale-110 hover:rotate-12"
        >
          {isFavorite ? (
            <HeartSolidIcon className="w-4 h-4 text-red-500 animate-pulse" />
          ) : (
            <HeartIcon className="w-4 h-4 text-gray-500 hover:text-red-400 transition-colors duration-200" />
          )}
        </button>

        {/* Tag de preferido */}
        {space.rating >= 4.8 && (
          <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-normal">
            ⭐ Preferido
          </div>
        )}
      </div>

      {/* Conteúdo do card */}
      <div className="p-3">
        {/* Título e localização */}
        <div className="mb-2">
          <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2">{space.title}</h3>
          <p className="text-gray-500 text-xs mt-1">{space.location}</p>
        </div>

        {/* Amenidades */}
        <div className="mb-2">
          <div className="flex flex-wrap gap-1">
            {space.amenities.slice(0, 2).map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-50 text-gray-600 text-xs px-2 py-0.5 rounded-md"
              >
                {amenity}
              </span>
            ))}
            {space.amenities.length > 2 && (
              <span className="text-gray-400 text-xs px-1">
                +{space.amenities.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Preço e avaliação */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="font-medium text-gray-900 text-sm">{formatPrice(space.price, space.pricePer)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <StarIcon className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="font-normal text-gray-700 text-xs">{space.rating}</span>
            <span className="text-gray-400 text-xs">({space.reviews})</span>
          </div>
        </div>

        {/* Botão de reserva */}
        <button className="w-full bg-blue-500 text-white py-2 rounded-md font-normal text-sm hover:bg-blue-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]">
          Reservar
        </button>
      </div>
    </div>
  );
}
