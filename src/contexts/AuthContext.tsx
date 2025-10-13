'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  verified: boolean;
  joinedDate: string;
  stats: {
    trips: number;
    reviews: number;
    yearsOnPlatform: number;
  };
  personalInfo: {
    education?: string;
    work?: string;
    birthDecade?: string;
    hobby?: string;
  };
  visitedPlaces: Array<{
    id: string;
    name: string;
    type: 'city' | 'neighborhood' | 'country';
    icon: string;
  }>;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dados mockados do usuário
const mockUser: User = {
  id: 'user_123',
  name: 'Ramon',
  email: 'ramon@email.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  location: 'São José dos Campos, Brasil',
  verified: true,
  joinedDate: '2022-01-15',
  stats: {
    trips: 5,
    reviews: 1,
    yearsOnPlatform: 2
  },
  personalInfo: {
    education: 'FATEC',
    work: 'Programador FrontEnd',
    birthDecade: 'Nasci na década de 90',
    hobby: 'Vendo podcasts sobre ciência'
  },
  visitedPlaces: [
    { id: '1', name: 'São Paulo', type: 'city', icon: 'globe' },
    { id: '2', name: 'Penha', type: 'neighborhood', icon: 'house' },
    { id: '3', name: 'Buenos Aires', type: 'country', icon: 'building' }
  ]
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('spoton_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular delay de login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validação mockada - aceita qualquer email/senha não vazios
    if (email.trim() && password.trim()) {
      setUser(mockUser);
      localStorage.setItem('spoton_user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('spoton_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
