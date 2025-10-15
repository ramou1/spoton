'use client';

import { useState } from 'react';
import { XMarkIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  spaceTitle: string;
  totalPrice: number;
  plateNumber?: string;
  selectedParkingTime?: '60min' | '120min' | null;
  duration?: number;
}

export default function PaymentModal({
  isOpen,
  onClose,
  spaceTitle,
  totalPrice,
  plateNumber,
  selectedParkingTime,
  duration
}: PaymentModalProps) {
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  // Gerar código PIX mockado
  const pixCode = "00020101021226770014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-4266141740005204000053039865405" + 
    totalPrice.toFixed(2).replace('.', '') + "5802BR5913SPOTON LTDA6009SAO PAULO62070503***6304" + 
    Math.random().toString(36).substring(2, 6).toUpperCase();

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-neutral-700">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-100">{spaceTitle}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-700 rounded-lg transition-colors duration-200"
            >
              <XMarkIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Price */}
          <div className="text-center mb-6">
            <p className="text-gray-400 mb-2">Valor:</p>
            <p className="text-3xl font-bold text-gray-100">{formatPrice(totalPrice)}</p>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <p className="text-gray-300 mb-4 text-center">
              Copie esse código para efetuar a ativação do ticket
            </p>
            
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <span className="bg-purple-500/20 text-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">1</span>
                <span>Acesse seu Internet Banking ou aplicativo de pagamentos.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-purple-500/20 text-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">2</span>
                <span>Escolha pagar via Pix.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-purple-500/20 text-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">3</span>
                <span>Cole o seguinte código:</span>
              </div>
            </div>
          </div>

          {/* PIX Code */}
          <div className="mb-6">
            <div className="bg-neutral-700 rounded-lg p-4 mb-3 border border-neutral-600">
              <p className="text-xs text-gray-300 font-mono break-all">
                {pixCode}
              </p>
            </div>
            
            <button
              onClick={copyToClipboard}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                isCopied 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-400 hover:to-purple-500'
              }`}
            >
              <ClipboardDocumentIcon className="w-5 h-5" />
              {isCopied ? 'CÓDIGO COPIADO!' : 'COPIAR'}
            </button>
          </div>

          {/* Status */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">Identificando pagamento...</p>
          </div>

          {/* Reservation Details */}
          <div className="mt-6 pt-6 border-t border-neutral-700">
            <h3 className="font-medium text-gray-100 mb-3">Detalhes da Reserva</h3>
            <div className="space-y-2 text-sm">
              {plateNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Placa:</span>
                  <span className="text-gray-100 font-medium">{plateNumber}</span>
                </div>
              )}
              {selectedParkingTime && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Tempo:</span>
                  <span className="text-gray-100 font-medium">{selectedParkingTime}</span>
                </div>
              )}
              {duration && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Duração:</span>
                  <span className="text-gray-100 font-medium">{duration} {duration === 1 ? 'hora' : 'horas'}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold">
                <span className="text-gray-100">Total:</span>
                <span className="text-gray-100">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
