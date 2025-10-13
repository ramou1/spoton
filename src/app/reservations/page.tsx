'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { userReservations } from '@/data/userData';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';

export default function ReservationsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-100 mb-4">
              Acesso negado
            </h1>
            <p className="text-gray-400 mb-6">
              Você precisa estar logado para acessar esta página.
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

  const filteredReservations = userReservations.filter(reservation => {
    if (filter === 'all') return true;
    return reservation.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'upcoming':
        return 'Próxima';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-100 mb-2">Minhas reservas</h1>
          <p className="text-gray-400">Gerencie suas reservas e visualize o histórico</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-neutral-800 rounded-lg p-2 mb-8">
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'Todas' },
              { key: 'upcoming', label: 'Próximas' },
              { key: 'completed', label: 'Concluídas' },
              { key: 'cancelled', label: 'Canceladas' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  filter === tab.key
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-300 hover:bg-neutral-700 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reservations List */}
        <div className="space-y-4">
          {filteredReservations.length > 0 ? (
            filteredReservations.map((reservation) => (
              <div key={reservation.id} className="bg-neutral-800 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  {/* Space Image */}
                  <div className="flex-shrink-0">
                    <Image
                      src={reservation.space.image}
                      alt={reservation.space.title}
                      width={120}
                      height={120}
                      className="rounded-lg object-cover"
                    />
                  </div>

                  {/* Reservation Details */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-semibold text-gray-100 mb-2">
                          {reservation.space.title}
                        </h3>
                        <p className="text-gray-400 mb-2">{reservation.space.location}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                          <div>
                            <span className="text-gray-400">Data: </span>
                            {new Date(reservation.startDate).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })}
                          </div>
                          <div>
                            <span className="text-gray-400">Hora: </span>
                            {new Date(reservation.startDate).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                          <div>
                            <span className="text-gray-400">Duração: </span>
                            {reservation.duration}h
                          </div>
                          <div>
                            <span className="text-gray-400">Total: </span>
                            <span className="font-semibold text-gray-100">R$ {reservation.totalPrice}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status and Actions */}
                      <div className="flex flex-col items-end space-y-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                          {getStatusText(reservation.status)}
                        </span>
                        
                        {reservation.status === 'upcoming' && (
                          <div className="flex space-x-2">
                            <Link
                              href={`/spaces/${reservation.spaceId}`}
                              className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-500/30 transition-colors duration-200"
                            >
                              Ver detalhes
                            </Link>
                            <button className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors duration-200">
                              Cancelar
                            </button>
                          </div>
                        )}
                        
                        {reservation.status === 'completed' && (
                          <div className="flex space-x-2">
                            <Link
                              href={`/spaces/${reservation.spaceId}`}
                              className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-500/30 transition-colors duration-200"
                            >
                              Ver espaço
                            </Link>
                            <button className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors duration-200">
                              Avaliar
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                Nenhuma reserva encontrada
              </h3>
              <p className="text-gray-400 mb-6">
                {filter === 'all' 
                  ? 'Você ainda não fez nenhuma reserva'
                  : `Nenhuma reserva ${filter === 'upcoming' ? 'próxima' : filter === 'completed' ? 'concluída' : 'cancelada'}`
                }
              </p>
              <Link
                href="/"
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all duration-200"
              >
                Explorar espaços
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
