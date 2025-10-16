'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import ReservationModal from '@/components/ReservationModal';
import PaymentModal from '@/components/PaymentModal';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { useToastContext } from '@/contexts/ToastContext';
import { spaces } from '@/data/mockData';
import { 
  HeartIcon, 
  ShareIcon, 
  MapPinIcon, 
  StarIcon,
  ClockIcon,
  UsersIcon,
  ShieldCheckIcon,
  WifiIcon,
  SunIcon,
  ComputerDesktopIcon,
  VideoCameraIcon,
  CakeIcon,
  SpeakerWaveIcon,
  ChartBarIcon,
  PresentationChartLineIcon,
  ShieldCheckIcon as SecurityIcon,
  MapIcon,
  CameraIcon,
  ShoppingBagIcon,
  BuildingOfficeIcon,
  EyeIcon,
  BeakerIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

export default function SpaceDetailPage() {
  const params = useParams();
  const spaceId = params.id as string;
  const { user } = useAuth();
  const { error } = useToastContext();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [duration, setDuration] = useState(1);
  const [selectedParkingTime, setSelectedParkingTime] = useState<'60min' | '120min' | null>(null);
  const [plateNumber, setPlateNumber] = useState('');
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

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
  ];

  const formatPrice = (price: number, pricePer: string) => {
    return `R$ ${price}/${pricePer}`;
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Calcular valor total baseado no tipo de espaço
  const calculateTotalPrice = () => {
    if (space.type === 'estacionamento') {
      if (selectedParkingTime === '60min') return 2.00;
      if (selectedParkingTime === '120min') return 4.00;
      return 0;
    }
    return space.price * duration;
  };

  const totalPrice = calculateTotalPrice();

  // Funções para lidar com os modais
  const handleReserveClick = () => {
    // Para estacionamentos, redirecionar para sistema externo (sem necessidade de login)
    if (space.type === 'estacionamento' && space.externalUrl) {
      window.open(space.externalUrl, '_blank');
      return;
    }

    // Para outros tipos, verificar login
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // Validar campos obrigatórios para outros tipos
    if (duration < 1) {
      error('Duração inválida', 'Por favor, selecione uma duração válida');
      return;
    }

    setShowReservationModal(true);
  };

  // Função para lidar com acesso aos apps (Google Play e App Store)
  const handleAppAccess = (url: string) => {
    window.open(url, '_blank');
  };

  const handleReservationContinue = () => {
    setShowReservationModal(false);
    setShowPaymentModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // Após login bem-sucedido, abrir modal de reserva
    handleReserveClick();
  };

  // Função para mapear amenidades para ícones
  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    
    if (amenityLower.includes('wifi') || amenityLower.includes('internet')) return WifiIcon;
    if (amenityLower.includes('café') || amenityLower.includes('coffee')) return BeakerIcon;
    if (amenityLower.includes('ar condicionado') || amenityLower.includes('climatizado')) return SunIcon;
    if (amenityLower.includes('mesa') || amenityLower.includes('desk')) return ComputerDesktopIcon;
    if (amenityLower.includes('videoconferência') || amenityLower.includes('video')) return VideoCameraIcon;
    if (amenityLower.includes('menu') || amenityLower.includes('degustação')) return CakeIcon;
    if (amenityLower.includes('som') || amenityLower.includes('audio')) return SpeakerWaveIcon;
    if (amenityLower.includes('flip chart') || amenityLower.includes('quadro')) return ChartBarIcon;
    if (amenityLower.includes('projetor') || amenityLower.includes('presentation')) return PresentationChartLineIcon;
    if (amenityLower.includes('segurança') || amenityLower.includes('security')) return SecurityIcon;
    if (amenityLower.includes('câmeras') || amenityLower.includes('camera')) return CameraIcon;
    if (amenityLower.includes('metrô') || amenityLower.includes('metro')) return MapIcon;
    if (amenityLower.includes('shopping') || amenityLower.includes('mall')) return ShoppingBagIcon;
    if (amenityLower.includes('valet') || amenityLower.includes('carro')) return BuildingOfficeIcon;
    if (amenityLower.includes('coberto') || amenityLower.includes('covered')) return BuildingOfficeIcon;
    if (amenityLower.includes('vista') || amenityLower.includes('view')) return EyeIcon;
    if (amenityLower.includes('coffee break') || amenityLower.includes('break')) return BeakerIcon;
    if (amenityLower.includes('lugares') || amenityLower.includes('places')) return UsersIcon;
    if (amenityLower.includes('palco') || amenityLower.includes('stage')) return PresentationChartLineIcon;
    if (amenityLower.includes('backstage')) return ClipboardDocumentListIcon;
    if (amenityLower.includes('cama elástica') || amenityLower.includes('piscina')) return UsersIcon;
    
    return ClockIcon; // Ícone padrão
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      
      {/* Galeria de imagens */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
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
              {space.type === 'estacionamento' && (
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    <strong>ℹ️ Informação:</strong> Este estacionamento utiliza o sistema oficial da prefeitura. 
                    Ao clicar em &quot;Acessar Sistema Municipal&quot;, você será redirecionado para a plataforma oficial da cidade.
                  </p>
                </div>
              )}
            </div>

            {/* Amenidades */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">O que este lugar oferece</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {space.amenities.map((amenity, index) => {
                  const IconComponent = getAmenityIcon(amenity);
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-gray-300">{amenity}</span>
                    </div>
                  );
                })}
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
                        value={plateNumber}
                        onChange={(e) => setPlateNumber(e.target.value)}
                        disabled
                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-gray-400 placeholder-gray-500 cursor-not-allowed opacity-50"
                      />
                      <p className="text-xs text-gray-500 mt-1">Campo será habilitado em breve</p>
                    </div>
                  )}
                  
                  {/* Formulário específico para estacionamento */}
                  {space.type === 'estacionamento' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tempo de permanência
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setSelectedParkingTime('60min')}
                          disabled
                          className="p-3 rounded-lg border bg-neutral-700 border-neutral-600 text-gray-400 cursor-not-allowed opacity-50"
                        >
                          <div className="text-sm font-medium">60min</div>
                          <div className="text-xs opacity-75">R$ 2,00</div>
                        </button>
                        <button
                          onClick={() => setSelectedParkingTime('120min')}
                          disabled
                          className="p-3 rounded-lg border bg-neutral-700 border-neutral-600 text-gray-400 cursor-not-allowed opacity-50"
                        >
                          <div className="text-sm font-medium">120min</div>
                          <div className="text-xs opacity-75">R$ 4,00</div>
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Seleção será habilitada em breve</p>
                    </div>
                  ) : (
                    <>
                      {/* Data e hora de início para outros tipos */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Data e hora de início
                        </label>
                        <input
                          type="datetime-local"
                          className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      
                      {/* Duração para outros tipos */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Duração (horas)
                        </label>
                        <input
                          type="number"
                          placeholder="2"
                          min="1"
                          max="24"
                          value={duration}
                          onChange={(e) => setDuration(Math.min(24, Math.max(1, parseInt(e.target.value) || 1)))}
                          className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <p className="text-xs text-gray-400 mt-1">Máximo 24 horas</p>
                      </div>
                    </>
                  )}
                </div>

                {space.type === 'estacionamento' && space.appStoreUrl ? (
                  <div className="space-y-3 mb-4">
                    <button 
                      onClick={() => handleAppAccess(space.externalUrl!)}
                      className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-purple-400 hover:to-purple-500 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Baixar App (Google Play)
                    </button>
                    <button 
                      onClick={() => handleAppAccess(space.appStoreUrl!)}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-blue-400 hover:to-blue-500 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Baixar App (App Store)
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleReserveClick}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-purple-400 hover:to-purple-500 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mb-4"
                  >
                    {space.type === 'estacionamento' ? 'Acessar Sistema Municipal' : 'Reservar agora'}
                  </button>
                )}

                <p className="text-center text-gray-400 text-sm">
                  {space.type === 'estacionamento' 
                    ? (space.appStoreUrl 
                        ? 'Baixe o aplicativo oficial para acessar o estacionamento'
                        : 'Você será redirecionado para o sistema oficial da cidade'
                      )
                    : 'Você não será cobrado ainda'
                  }
                </p>

                <div className="border-t border-neutral-700 pt-4 mt-4">
                  <div className="space-y-2 text-sm">
                    {space.type === 'estacionamento' ? (
                      <>
                        <div className="flex items-center justify-between opacity-50">
                          <span className="text-gray-500">
                            Tempo de permanência: {selectedParkingTime || 'Selecione'}
                          </span>
                          <span className="text-gray-500">
                            R$ {selectedParkingTime === '60min' ? '2,00' : selectedParkingTime === '120min' ? '4,00' : '0,00'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between font-medium opacity-50">
                          <span className="text-gray-500">Total</span>
                          <span className="text-gray-500">
                            R$ {totalPrice.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">
                            {formatPrice(space.price, 'hora')} × {duration} {duration === 1 ? 'hora' : 'horas'}
                          </span>
                          <span className="text-gray-100">
                            R$ {(space.price * duration).toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between font-medium">
                          <span className="text-gray-300">Total</span>
                          <span className="text-gray-100">
                            R$ {totalPrice.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modais */}
      <ReservationModal
        isOpen={showReservationModal}
        onClose={() => setShowReservationModal(false)}
        onContinue={handleReservationContinue}
        space={space}
        duration={duration}
        selectedParkingTime={selectedParkingTime}
        plateNumber={plateNumber}
        totalPrice={totalPrice}
      />

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        spaceTitle={space.title}
        totalPrice={totalPrice}
        plateNumber={plateNumber}
        selectedParkingTime={selectedParkingTime}
        duration={duration}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
