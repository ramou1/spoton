'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { spaces } from '@/data/mockData';
import { 
  HeartIcon, 
  ShareIcon, 
  MapPinIcon, 
  StarIcon,
  ClockIcon,
  UsersIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

export default function SpaceDetailPage() {
  const params = useParams();
  const spaceId = params.id as string;
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Encontrar o espaço pelo ID
  const space = spaces.find(s => s.id === spaceId);

  // Se espaço não encontrado
  if (!space) {
    return (
      <div className="min-h-screen bg-neutral-950">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-100 mb-4">
              Espaço não encontrado
            </h1>
            <p className="text-gray-400 mb-6">
              O espaço que você está procurando não existe ou foi removido.
            </p>
            <Link 
              href="/"
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all duration-200"
            >
              Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Simular múltiplas imagens
  const images = [
    space.image,
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop'
  ];

  const formatPrice = (price: number, pricePer: string) => {
    return `R$ ${price}/${pricePer}`;
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      
      {/* Galeria de imagens */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl">
            <Image
              src={images[selectedImageIndex]}
              alt={space.title}
              fill
              className="object-cover rounded-xl"
              priority
            />
          </div>
        
        {/* Botões de navegação da galeria */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={toggleFavorite}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200"
          >
            {isFavorite ? (
              <HeartSolidIcon className="w-6 h-6 text-red-500" />
            ) : (
              <HeartIcon className="w-6 h-6 text-white" />
            )}
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200">
            <ShareIcon className="w-6 h-6 text-white" />
          </button>
        </div>

          {/* Miniaturas das imagens */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === index 
                      ? 'border-white' 
                      : 'border-white/50 hover:border-white/80'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Imagem ${index + 1}`}
                    width={64}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações principais */}
          <div className="lg:col-span-2">
            {/* Título e localização */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-100 mb-2">
                {space.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPinIcon className="w-4 h-4" />
                <span>{space.location}</span>
              </div>
            </div>

            {/* Avaliação e Categoria */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-medium text-gray-100">{space.rating}</span>
                <span className="text-gray-400">({space.reviews} avaliações)</span>
              </div>
              <div className="text-gray-400">•</div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                space.type === 'coworking' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                space.type === 'estacionamento' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                space.type === 'restaurante' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                'bg-purple-500/20 text-purple-400 border border-purple-500/30'
              }`}>
                {space.type === 'coworking' ? 'Coworking' :
                 space.type === 'estacionamento' ? 'Estacionamento' :
                 space.type === 'restaurante' ? 'Restaurante' :
                 'Serviços'}
              </div>
            </div>

            {/* Descrição */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Sobre este espaço</h2>
              <p className="text-gray-300 leading-relaxed">{space.description}</p>
            </div>

            {/* Amenidades */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">O que este lugar oferece</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {space.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-300">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Informações adicionais */}
            <div className="border-t border-neutral-700 pt-8">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Informações importantes</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <ClockIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-100 font-medium">Horários flexíveis</p>
                    <p className="text-gray-400 text-sm">Reserve pelo tempo que precisar</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheckIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-100 font-medium">Reserva segura</p>
                    <p className="text-gray-400 text-sm">Pagamento protegido e cancelamento flexível</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UsersIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-100 font-medium">Suporte 24/7</p>
                    <p className="text-gray-400 text-sm">Nossa equipe está sempre disponível para ajudar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card de reserva */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-100">
                      {formatPrice(space.price, space.pricePer)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-300 text-sm">{space.rating}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Campo específico para estacionamento */}
                  {space.type === 'estacionamento' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Placa do veículo
                      </label>
                      <input
                        type="text"
                        placeholder="ABC-1234"
                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  )}
                  
                  {/* Data e hora de início */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {space.type === 'estacionamento' ? 'Data e hora de entrada' : 'Data e hora de início'}
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  {/* Duração */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Duração (horas)
                    </label>
                    <input
                      type="number"
                      placeholder="2"
                      min="1"
                      className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-purple-400 hover:to-purple-500 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mb-4">
                  Reservar agora
                </button>

                <p className="text-center text-gray-400 text-sm">
                  Você não será cobrado ainda
                </p>

                <div className="border-t border-neutral-700 pt-4 mt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">
                        {formatPrice(space.price, 'hora')} × 1 hora
                      </span>
                      <span className="text-gray-100">
                        R$ {space.price}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-medium">
                      <span className="text-gray-300">Total</span>
                      <span className="text-gray-100">
                        R$ {space.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
