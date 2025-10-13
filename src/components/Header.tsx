'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LoginModal from './LoginModal';
import CadastroModal from './CadastroModal';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsCadastroModalOpen(false);
    setIsMenuOpen(false);
  };

  const openCadastroModal = () => {
    setIsCadastroModalOpen(true);
    setIsLoginModalOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-neutral-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative h-10 w-auto group-hover:scale-105 transition-all duration-300 ease-out drop-shadow-lg">
                <Image 
                  src="/images/logo-spoton.png" 
                  alt="Spoton Logo" 
                  width={120}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-neutral-800 transition-all duration-200"
                  >
                    <Image
                      src={user?.avatar || '/images/default-avatar.png'}
                      alt={user?.name || 'Usuário'}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                  </button>
                  
                  {/* User Menu Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-neutral-700 hover:text-white transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Meu perfil
                        </Link>
                        <Link
                          href="/reservations"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-neutral-700 hover:text-white transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Minhas reservas
                        </Link>
                        <hr className="my-2 border-neutral-700" />
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-neutral-700 hover:text-white transition-colors duration-200"
                        >
                          Sair
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={openLoginModal}
                    className="text-gray-300 hover:text-white font-normal text-sm transition-all duration-200 hover:scale-105"
                  >
                    Entrar
                  </button>
                  <button
                    onClick={openCadastroModal}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1.5 rounded-lg font-normal text-sm hover:from-purple-400 hover:to-purple-500 transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Cadastrar
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-neutral-800 transition-all duration-200 hover:scale-110 active:scale-95"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-5 w-5 animate-spin" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-neutral-700">
              <div className="px-3 py-3 space-y-2 bg-neutral-900/95 backdrop-blur-sm">
                <button
                  onClick={openLoginModal}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white font-normal text-sm rounded-lg hover:bg-neutral-800 transition-colors duration-200"
                >
                  Entrar
                </button>
                <button
                  onClick={openCadastroModal}
                  className="block w-full px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-normal text-sm text-center hover:from-purple-400 hover:to-purple-500 transition-colors duration-200"
                >
                  Cadastrar
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToCadastro={openCadastroModal}
      />
      <CadastroModal
        isOpen={isCadastroModalOpen}
        onClose={() => setIsCadastroModalOpen(false)}
        onSwitchToLogin={openLoginModal}
      />
    </>
  );
}
