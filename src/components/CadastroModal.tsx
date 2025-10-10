'use client';

import { useState } from 'react';

interface CadastroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function CadastroModal({ isOpen, onClose, onSwitchToLogin }: CadastroModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    cpf: '',
    isEstrangeiro: false,
    passaporte: '',
    pais: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | boolean) => {
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

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Senhas não coincidem';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }

    if (!formData.isEstrangeiro) {
      if (!formData.cpf.trim()) {
        newErrors.cpf = 'CPF é obrigatório';
      } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
        newErrors.cpf = 'CPF deve estar no formato 000.000.000-00';
      }
    } else {
      if (!formData.passaporte.trim()) {
        newErrors.passaporte = 'Número do passaporte é obrigatório';
      }
      if (!formData.pais.trim()) {
        newErrors.pais = 'País é obrigatório';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Dados do cadastro:', formData);
      alert('Cadastro realizado com sucesso!');
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
        <div className="relative bg-neutral-800 border border-neutral-700 rounded-2xl shadow-xl w-full max-w-2xl p-8 transform transition-all max-h-[90vh] overflow-y-auto">
          {/* Botão de fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-100 mb-2">Criar Conta</h2>
            <p className="text-gray-300">Junte-se ao Spoton e encontre espaços únicos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Nome completo *
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 bg-neutral-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.nome ? 'border-red-500' : 'border-neutral-700'
                }`}
                placeholder="Digite seu nome completo"
              />
              {errors.nome && <p className="text-red-400 text-sm mt-1">{errors.nome}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Email *
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

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Telefone *
              </label>
              <input
                type="tel"
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 bg-neutral-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.telefone ? 'border-red-500' : 'border-neutral-700'
                }`}
                placeholder="(11) 99999-9999"
              />
              {errors.telefone && <p className="text-red-400 text-sm mt-1">{errors.telefone}</p>}
            </div>

            {/* Checkbox para estrangeiro */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isEstrangeiro"
                checked={formData.isEstrangeiro}
                onChange={(e) => handleInputChange('isEstrangeiro', e.target.checked)}
                className="rounded border-neutral-700 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="isEstrangeiro" className="text-sm font-medium text-gray-200">
                Sou estrangeiro
              </label>
            </div>

            {/* CPF ou Passaporte */}
            {!formData.isEstrangeiro ? (
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  CPF *
                </label>
                <input
                  type="text"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 bg-neutral-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.cpf ? 'border-red-500' : 'border-neutral-700'
                  }`}
                  placeholder="000.000.000-00"
                  maxLength={14}
                />
                {errors.cpf && <p className="text-red-400 text-sm mt-1">{errors.cpf}</p>}
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Número do Passaporte *
                  </label>
                  <input
                    type="text"
                    value={formData.passaporte}
                    onChange={(e) => handleInputChange('passaporte', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 bg-neutral-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.passaporte ? 'border-red-500' : 'border-neutral-700'
                    }`}
                    placeholder="Digite o número do seu passaporte"
                  />
                  {errors.passaporte && <p className="text-red-400 text-sm mt-1">{errors.passaporte}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    País *
                  </label>
                  <select
                    value={formData.pais}
                    onChange={(e) => handleInputChange('pais', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 bg-neutral-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.pais ? 'border-red-500' : 'border-neutral-700'
                    }`}
                  >
                    <option value="">Selecione seu país</option>
                    <option value="US">Estados Unidos</option>
                    <option value="AR">Argentina</option>
                    <option value="FR">França</option>
                    <option value="DE">Alemanha</option>
                    <option value="IT">Itália</option>
                    <option value="ES">Espanha</option>
                    <option value="GB">Reino Unido</option>
                    <option value="CA">Canadá</option>
                    <option value="AU">Austrália</option>
                    <option value="JP">Japão</option>
                    <option value="other">Outro</option>
                  </select>
                  {errors.pais && <p className="text-red-400 text-sm mt-1">{errors.pais}</p>}
                </div>
              </>
            )}

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Senha *
              </label>
              <input
                type="password"
                value={formData.senha}
                onChange={(e) => handleInputChange('senha', e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 bg-neutral-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.senha ? 'border-red-500' : 'border-neutral-700'
                }`}
                placeholder="Mínimo 6 caracteres"
              />
              {errors.senha && <p className="text-red-400 text-sm mt-1">{errors.senha}</p>}
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Confirmar Senha *
              </label>
              <input
                type="password"
                value={formData.confirmarSenha}
                onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 bg-neutral-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.confirmarSenha ? 'border-red-500' : 'border-neutral-700'
                }`}
                placeholder="Digite a senha novamente"
              />
              {errors.confirmarSenha && <p className="text-red-400 text-sm mt-1">{errors.confirmarSenha}</p>}
            </div>

            {/* Botão de cadastro */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-purple-400 hover:to-purple-500 transition-all duration-200"
            >
              Criar Conta
            </button>

            {/* Link para login */}
            <div className="text-center">
              <p className="text-gray-300">
                Já tem uma conta?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Entrar
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

