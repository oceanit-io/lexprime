import React, { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lex-logo.jpg" 
              alt="LEX PRIME Logo" 
              className="h-12 w-auto"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-lex-blue">LEX PRIME</h1>
              <p className="text-xs text-lex-gold">Soluções Financeiras</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#inicio" className="text-gray-700 hover:text-lex-blue font-medium transition">Início</a>
            <a href="#como-funciona" className="text-gray-700 hover:text-lex-blue font-medium transition">Como Funciona</a>
            <a href="#depoimentos" className="text-gray-700 hover:text-lex-blue font-medium transition">Depoimentos</a>
            <a href="#contato" className="bg-lex-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-lex-blue-dark transition">
              Solicitar Análise
            </a>
          </nav>

          <button 
            className="md:hidden text-lex-blue"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <a href="#inicio" className="text-gray-700 hover:text-lex-blue font-medium">Início</a>
              <a href="#como-funciona" className="text-gray-700 hover:text-lex-blue font-medium">Como Funciona</a>
              <a href="#depoimentos" className="text-gray-700 hover:text-lex-blue font-medium">Depoimentos</a>
              <a href="#contato" className="bg-lex-blue text-white px-6 py-2 rounded-lg font-semibold text-center">
                Solicitar Análise
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

