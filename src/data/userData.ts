import { Space } from './mockData';

export interface UserReservation {
  id: string;
  spaceId: string;
  space: Space;
  startDate: string;
  duration: number; // em horas
  totalPrice: number;
  status: 'completed' | 'upcoming' | 'cancelled';
  createdAt: string;
}

export const userReservations: UserReservation[] = [
  {
    id: 'res_001',
    spaceId: '932193921',
    space: {
      id: '932193921',
      title: 'Escritório Coworking Moderno',
      type: 'coworking',
      location: 'São Paulo, SP',
      price: 45,
      pricePer: 'hora',
      rating: 4.9,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      description: 'Espaço de trabalho compartilhado com internet de alta velocidade, café e ambiente silencioso.',
      amenities: ['WiFi', 'Café', 'Ar condicionado', 'Mesa privada'],
      isFavorite: false
    },
    startDate: '2024-01-15T09:00:00',
    duration: 4,
    totalPrice: 180,
    status: 'completed',
    createdAt: '2024-01-10T14:30:00'
  },
  {
    id: 'res_002',
    spaceId: '847562391',
    space: {
      id: '847562391',
      title: 'Vaga de Estacionamento Centro',
      type: 'estacionamento',
      location: 'Rio de Janeiro, RJ',
      price: 12,
      pricePer: 'hora',
      rating: 4.7,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      description: 'Vaga coberta e segura no centro da cidade, próximo ao metrô.',
      amenities: ['Coberto', 'Segurança 24h', 'Próximo ao metrô', 'Câmeras'],
      isFavorite: true
    },
    startDate: '2024-01-20T10:00:00',
    duration: 6,
    totalPrice: 72,
    status: 'completed',
    createdAt: '2024-01-18T16:45:00'
  },
  {
    id: 'res_003',
    spaceId: '156783492',
    space: {
      id: '156783492',
      title: 'Mesa no Restaurante Gourmet',
      type: 'restaurante',
      location: 'Belo Horizonte, MG',
      price: 35,
      pricePer: 'hora',
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
      description: 'Reserve uma mesa em nosso restaurante exclusivo para encontros de negócios.',
      amenities: ['WiFi', 'Menu degustação', 'Som ambiente', 'Garçom dedicado'],
      isFavorite: false
    },
    startDate: '2024-02-05T19:00:00',
    duration: 2,
    totalPrice: 70,
    status: 'upcoming',
    createdAt: '2024-01-25T11:20:00'
  },
  {
    id: 'res_004',
    spaceId: '984215673',
    space: {
      id: '984215673',
      title: 'Sala de Reuniões Executiva',
      type: 'servico',
      location: 'São Paulo, SP',
      price: 80,
      pricePer: 'hora',
      rating: 4.9,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      description: 'Sala de reuniões equipada com videoconferência e coffee break incluso.',
      amenities: ['Videoconferência', 'Coffee break', 'Flip chart', 'Projetor'],
      isFavorite: true
    },
    startDate: '2024-01-08T14:00:00',
    duration: 3,
    totalPrice: 240,
    status: 'completed',
    createdAt: '2024-01-05T09:15:00'
  }
];
