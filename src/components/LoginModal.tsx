'use client';

import { useState } from 'react';
import Link from 'next/link';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToCadastro: () => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToCadastro }: LoginModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Implementar lógica de login
      console.log('Dados do login:', formData);
      alert('Login realizado com sucesso!');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-70 transition-opacity backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-neutral-800 border border-neutral-700 rounded-2xl shadow-xl shadow-purple-500/20 w-full max-w-md p-8 transform transition-all">
          {/* Botão de fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-100 mb-2">Entrar</h2>
            <p className="text-gray-300">Acesse sua conta Spoton</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 bg-neutral-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.email ? 'border-red-500' : 'border-neutral-700'
                }`}
                placeholder="seu@email.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Senha
              </label>
              <input
                type="password"
                value={formData.senha}
                onChange={(e) => handleInputChange('senha', e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 bg-neutral-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.senha ? 'border-red-500' : 'border-neutral-700'
                }`}
                placeholder="Digite sua senha"
              />
              {errors.senha && <p className="text-red-400 text-sm mt-1">{errors.senha}</p>}
            </div>

            {/* Esqueci a senha */}
            <div className="text-right">
              <a href="#" className="text-purple-400 hover:text-purple-300 text-sm">
                Esqueci minha senha
              </a>
            </div>

            {/* Botão de login */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-200 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
            >
              Entrar
            </button>

            {/* Divisor */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-neutral-800 text-gray-400">ou</span>
              </div>
            </div>

            {/* Botão de login social */}
            <button
              type="button"
              disabled
              className="w-full flex items-center justify-center px-4 py-2 border border-neutral-700 rounded-lg text-gray-500 bg-neutral-900 cursor-not-allowed transition-colors duration-200"
              title="Login com Google temporariamente indisponível"
            >
              <svg className="w-5 h-5 mr-2 opacity-50" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar com Google (em breve)
            </button>

            {/* Link para cadastro */}
            <div className="text-center">
              <p className="text-gray-300">
                Não tem uma conta?{' '}
                <button 
                  type="button"
                  onClick={onSwitchToCadastro}
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Cadastrar
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

