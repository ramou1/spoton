'use client';

import { useState } from 'react';
import Link from 'next/link';
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
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Spoton</span>
            </Link>


            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={openLoginModal}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Entrar
              </button>
              <button
                onClick={openCadastroModal}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Cadastrar
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <div className="border-t pt-2 mt-2">
                  <button
                    onClick={openLoginModal}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    Entrar
                  </button>
                  <button
                    onClick={openCadastroModal}
                    className="block px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium mx-3 text-center w-[calc(100%-1.5rem)]"
                  >
                    Cadastrar
                  </button>
                </div>
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
