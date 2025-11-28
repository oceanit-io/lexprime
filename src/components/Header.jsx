import React, { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault()
    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      const headerOffset = 80
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lex-logo-2.png" 
              alt="LEX PRIME Logo" 
              className="h-20 w-auto"
            />
            
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#inicio" onClick={(e) => handleSmoothScroll(e, '#inicio')} className="text-gray-700 hover:text-lex-blue font-medium transition">Início</a>
            <a href="#calculadora" onClick={(e) => handleSmoothScroll(e, '#calculadora')} className="text-gray-700 hover:text-lex-blue font-medium transition">Calculadora</a>
            <a href="#servicos" onClick={(e) => handleSmoothScroll(e, '#servicos')} className="text-gray-700 hover:text-lex-blue font-medium transition">Serviços</a>
            <a href="#como-funciona" onClick={(e) => handleSmoothScroll(e, '#como-funciona')} className="text-gray-700 hover:text-lex-blue font-medium transition">Como Funciona</a>
            <a href="#depoimentos" onClick={(e) => handleSmoothScroll(e, '#depoimentos')} className="text-gray-700 hover:text-lex-blue font-medium transition">Depoimentos</a>
            <a href="#contato" onClick={(e) => handleSmoothScroll(e, '#contato')} className="bg-lex-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-lex-blue-dark transition">
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
              <a href="#inicio" onClick={(e) => handleSmoothScroll(e, '#inicio')} className="text-gray-700 hover:text-lex-blue font-medium">Início</a>
              <a href="#calculadora" onClick={(e) => handleSmoothScroll(e, '#calculadora')} className="text-gray-700 hover:text-lex-blue font-medium">Calculadora</a>
              <a href="#servicos" onClick={(e) => handleSmoothScroll(e, '#servicos')} className="text-gray-700 hover:text-lex-blue font-medium">Serviços</a>
              <a href="#como-funciona" onClick={(e) => handleSmoothScroll(e, '#como-funciona')} className="text-gray-700 hover:text-lex-blue font-medium">Como Funciona</a>
              <a href="#depoimentos" onClick={(e) => handleSmoothScroll(e, '#depoimentos')} className="text-gray-700 hover:text-lex-blue font-medium">Depoimentos</a>
              <a href="#contato" onClick={(e) => handleSmoothScroll(e, '#contato')} className="bg-lex-blue text-white px-6 py-2 rounded-lg font-semibold text-center">
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

