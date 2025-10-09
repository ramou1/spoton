import { 
  BuildingOfficeIcon, 
  TruckIcon, 
  CakeIcon, 
  WrenchScrewdriverIcon 
} from '@heroicons/react/24/outline';

export interface Space {
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
  isFavorite?: boolean;
}

export const spaces: Space[] = [
  {
    id: '1',
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
  {
    id: '2',
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
  {
    id: '3',
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
  {
    id: '4',
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
  {
    id: '5',
    title: 'Coworking com Vista Mar',
    type: 'coworking',
    location: 'Santos, SP',
    price: 55,
    pricePer: 'hora',
    rating: 4.6,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop',
    description: 'Trabalhe com vista para o mar em ambiente inspirador e tranquilo.',
    amenities: ['Vista mar', 'WiFi', 'Café premium', 'Terraço'],
    isFavorite: false
  },
  {
    id: '6',
    title: 'Estacionamento Shopping',
    type: 'estacionamento',
    location: 'São Paulo, SP',
    price: 8,
    pricePer: 'hora',
    rating: 4.5,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop',
    description: 'Vaga no shopping center com acesso direto ao mall.',
    amenities: ['No shopping', 'Coberto', 'Segurança', 'Valet'],
    isFavorite: false
  },
  {
    id: '7',
    title: 'Quiosque Restaurante Rooftop',
    type: 'restaurante',
    location: 'São Paulo, SP',
    price: 50,
    pricePer: 'hora',
    rating: 4.8,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop',
    description: 'Reserve nosso quiosque exclusivo no rooftop com vista panorâmica da cidade.',
    amenities: ['Vista panorâmica', 'Som ambiente', 'Menu exclusivo', 'Sommelier'],
    isFavorite: true
  },
  {
    id: '8',
    title: 'Auditório para Eventos',
    type: 'servico',
    location: 'São Paulo, SP',
    price: 200,
    pricePer: 'hora',
    rating: 4.9,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop',
    description: 'Auditório completo para palestras, apresentações e eventos corporativos.',
    amenities: ['200 lugares', 'Som profissional', 'Palco', 'Backstage'],
    isFavorite: false
  }
];

export const spaceTypes = [
  {
    id: 'coworking',
    name: 'Coworkings',
    icon: BuildingOfficeIcon,
    description: 'Espaços de trabalho compartilhado'
  },
  {
    id: 'estacionamento',
    name: 'Estacionamento',
    icon: TruckIcon,
    description: 'Vagas de estacionamento'
  },
  {
    id: 'restaurante',
    name: 'Restaurantes',
    icon: CakeIcon,
    description: 'Mesas em restaurantes'
  },
  {
    id: 'servico',
    name: 'Serviços',
    icon: WrenchScrewdriverIcon,
    description: 'Espaços para eventos e reuniões'
  }
];
