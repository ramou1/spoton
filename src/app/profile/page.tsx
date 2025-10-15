'use client';

import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { userReservations } from '@/data/userData';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { useSearchParams } from 'next/navigation';
import { 
  ShieldCheckIcon,
  CalendarIcon,
  ArrowRightOnRectangleIcon,
  CameraIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

function ProfileContent() {
  const { user, logout } = useAuth();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('about');
  const [currentAvatar, setCurrentAvatar] = useState(user?.avatar || '');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  // Lista de avatares mockados para escolha
  const mockAvatars = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face'
  ];

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'trips') {
      setActiveTab('trips');
    }
  }, [searchParams]);

  useEffect(() => {
    if (user?.avatar) {
      setCurrentAvatar(user.avatar);
    }
  }, [user?.avatar]);

  const handleAvatarChange = (newAvatar: string) => {
    setCurrentAvatar(newAvatar);
    setIsEditingAvatar(false);
    // Aqui você salvaria no backend
    console.log('Avatar alterado para:', newAvatar);
  };

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

  const completedReservations = userReservations.filter(r => r.status === 'completed');

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-neutral-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-100 mb-6">Perfil</h2>
              
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('about')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === 'about'
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'text-gray-300 hover:bg-neutral-700 hover:text-white'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-600 flex items-center justify-center">
                    <Image
                      src={currentAvatar}
                      alt={user.name}
                      width={20}
                      height={20}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">Sobre mim</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('trips')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === 'trips'
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'text-gray-300 hover:bg-neutral-700 hover:text-white'
                  }`}
                >
                  <CalendarIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Reservas anteriores</span>
                </button>
                
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'about' && (
              <div className="bg-neutral-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-semibold text-gray-100">Sobre mim</h1>
                  <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                    Editar
                  </button>
                </div>

                {/* User Summary Card */}
                <div className="bg-neutral-700 rounded-lg p-6 mb-8">
                  {/* Avatar Section */}
                  <div className="flex flex-col md:flex-row md:items-start md:space-x-4 mb-6">
                    <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
                      <div className="relative group">
                        <Image
                          src={currentAvatar}
                          alt={user.name}
                          width={80}
                          height={80}
                          className="rounded-full object-cover"
                        />
                        {user.verified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <ShieldCheckIcon className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <button
                          onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                          className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <CameraIcon className="w-6 h-6 text-white" />
                        </button>
                      </div>
                      <button
                        onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                        className="mt-2 text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1"
                      >
                        <PhotoIcon className="w-4 h-4" />
                        Trocar foto
                      </button>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 text-sm md:ml-4">
                      <div>
                        <span className="text-gray-400">{user.stats.trips} reservas</span>
                      </div>
                      <div>
                        <span className="text-gray-400">{user.stats.reviews} avaliação</span>
                      </div>
                      <div>
                        <span className="text-gray-400">{user.stats.yearsOnPlatform} anos no Spoton</span>
                      </div>
                    </div>
                  </div>

                  {/* Avatar Selection Modal */}
                  {isEditingAvatar && (
                    <div className="mb-6 p-4 bg-neutral-600 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-100 mb-3">Escolha uma nova foto de perfil</h3>
                      <div className="grid grid-cols-4 gap-3">
                        {mockAvatars.map((avatar, index) => (
                          <button
                            key={index}
                            onClick={() => handleAvatarChange(avatar)}
                            className={`relative rounded-full overflow-hidden transition-all duration-200 ${
                              currentAvatar === avatar 
                                ? 'ring-2 ring-purple-500 scale-110' 
                                : 'hover:scale-105'
                            }`}
                          >
                            <Image
                              src={avatar}
                              alt={`Avatar ${index + 1}`}
                              width={60}
                              height={60}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Nome completo</label>
                        <input
                          type="text"
                          value={user.name}
                          className="w-full px-3 py-2 bg-neutral-600 border border-neutral-500 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                          type="email"
                          value={user.email}
                          className="w-full px-3 py-2 bg-neutral-600 border border-neutral-500 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Localização</label>
                        <input
                          type="text"
                          value={user.location}
                          className="w-full px-3 py-2 bg-neutral-600 border border-neutral-500 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Nova senha</label>
                        <input
                          type="password"
                          placeholder="Digite sua nova senha"
                          className="w-full px-3 py-2 bg-neutral-600 border border-neutral-500 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="mb-8">
                  <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-400 hover:to-purple-500 transition-all duration-200 hover:scale-105 active:scale-95">
                    Salvar alterações
                  </button>
                </div>

                {/* Verification Status */}
                <div className="mb-8">
                  <div className="flex items-center space-x-3">
                    <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-gray-300">Identidade verificada</p>
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <div className="pt-6 border-t border-neutral-700">
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span>Sair da conta</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'trips' && (
              <div className="bg-neutral-800 rounded-xl p-6">
                <h1 className="text-2xl font-semibold text-gray-100 mb-6">Reservas anteriores</h1>
                
                <div className="space-y-4">
                  {completedReservations.map((reservation) => (
                    <div key={reservation.id} className="bg-neutral-700 rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={reservation.space.image}
                          alt={reservation.space.title}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-100">{reservation.space.title}</h3>
                          <p className="text-gray-400 text-sm">{reservation.space.location}</p>
                          <p className="text-gray-300 text-sm mt-1">
                            {new Date(reservation.startDate).toLocaleDateString('pt-BR')} • {reservation.duration}h • R$ {reservation.totalPrice}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                            Concluída
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {completedReservations.length === 0 && (
                    <div className="text-center py-12">
                      <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-300 mb-2">
                        Nenhuma reserva anterior
                      </h3>
                      <p className="text-gray-400 mb-6">
                        Suas reservas concluídas aparecerão aqui
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
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-950">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando perfil...</p>
          </div>
        </div>
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}
