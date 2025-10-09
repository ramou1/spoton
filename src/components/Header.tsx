'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LoginModal from './LoginModal';
import CadastroModal from './CadastroModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);

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
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-7 h-7 bg-blue-500 rounded-md flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-out">
                <span className="text-white font-semibold text-sm group-hover:scale-110 transition-transform duration-300">S</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Spoton</span>
            </Link>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={openLoginModal}
                className="text-gray-600 hover:text-gray-900 font-normal text-sm transition-all duration-200 hover:scale-105"
              >
                Entrar
              </button>
              <button
                onClick={openCadastroModal}
                className="bg-blue-500 text-white px-4 py-1.5 rounded-lg font-normal text-sm hover:bg-blue-600 transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
              >
                Cadastrar
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:scale-110 active:scale-95"
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
            <div className="md:hidden border-t border-gray-100">
              <div className="px-3 py-3 space-y-2 bg-white/95 backdrop-blur-sm">
                <button
                  onClick={openLoginModal}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 font-normal text-sm rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Entrar
                </button>
                <button
                  onClick={openCadastroModal}
                  className="block w-full px-3 py-2 bg-blue-500 text-white rounded-lg font-normal text-sm text-center hover:bg-blue-600 transition-colors duration-200"
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
