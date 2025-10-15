'use client';

import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Space {
  id: string;
  title: string;
  type: 'coworking' | 'estacionamento' | 'restaurante' | 'servico';
  location: string;
  price: number;
  pricePer: 'hora' | 'dia' | 'semana' | 'mes';
  rating: number;
  reviews: number;
  image: string;
  description: string;
  amenities: string[];
}

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  space: Space;
  duration: number;
  selectedParkingTime: '60min' | '120min' | null;
  plateNumber: string;
  totalPrice: number;
}

export default function ReservationModal({
  isOpen,
  onClose,
  onContinue,
  space,
  duration,
  selectedParkingTime,
  plateNumber,
  totalPrice
}: ReservationModalProps) {
  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-100">Resumo da Reserva</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-700 rounded-lg transition-colors duration-200"
            >
              <XMarkIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Space Info */}
          <div className="flex gap-4 mb-6">
            <div className="flex-shrink-0">
              <Image
                src={space.image}
                alt={space.title}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-100 mb-1">{space.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{space.location}</p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-sm text-gray-300">{space.rating}</span>
                <span className="text-xs text-gray-400">({space.reviews} avaliações)</span>
              </div>
            </div>
          </div>

          {/* Reservation Details */}
          <div className="space-y-4 mb-6">
            <div className="bg-neutral-700 rounded-lg p-4">
              <h4 className="font-medium text-gray-100 mb-3">Detalhes da Reserva</h4>
              
              {space.type === 'estacionamento' ? (
                <>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Placa:</span>
                    <span className="text-gray-100">{plateNumber || 'Não informada'}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Tempo:</span>
                    <span className="text-gray-100">{selectedParkingTime || 'Não selecionado'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Valor do ticket:</span>
                    <span className="text-gray-100">{formatPrice(totalPrice)}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Duração:</span>
                    <span className="text-gray-100">{duration} {duration === 1 ? 'hora' : 'horas'}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Preço por hora:</span>
                    <span className="text-gray-100">{formatPrice(space.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-gray-100 font-semibold">{formatPrice(totalPrice)}</span>
                  </div>
                </>
              )}
            </div>

            <div className="bg-neutral-700 rounded-lg p-4">
              <h4 className="font-medium text-gray-100 mb-3">Informações Importantes</h4>
              <p className="text-sm text-gray-400 mb-2">
                A exatidão das informações é de inteira responsabilidade do cliente.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Cancelamento gratuito até 24h antes</li>
                <li>• Pagamento seguro via PIX</li>
                <li>• Confirmação por email</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-neutral-700 text-gray-300 rounded-lg hover:bg-neutral-600 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={onContinue}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all duration-200"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
