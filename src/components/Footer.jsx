import React from 'react'

const Footer = () => {
  return (
    <footer id="contato" className="bg-lex-blue-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white rounded-lg p-2 shadow-lg">
                <img 
                  src="/lex-logo-2.png" 
                  alt="LEX PRIME Logo" 
                  className="h-20 w-auto"
                />
              </div>
              
            </div>
            <p className="text-gray-300">
              Especialistas em reduzir dívidas veiculares e eliminar juros abusivos. Mais de 12 anos de experiência ajudando milhares de brasileiros.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-lex-gold">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-gray-300 hover:text-lex-gold transition">Início</a>
              </li>
              <li>
                <a href="#como-funciona" className="text-gray-300 hover:text-lex-gold transition">Como Funciona</a>
              </li>
              <li>
                <a href="#depoimentos" className="text-gray-300 hover:text-lex-gold transition">Depoimentos</a>
              </li>
              <li>
                <a href="#contato" className="text-gray-300 hover:text-lex-gold transition">Contato</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-lex-gold">Contato</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-lex-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0800 000 0000
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-lex-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contato@lexprime.com.br
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 LEX PRIME Soluções Financeiras. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-lex-gold transition">Política de Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-lex-gold transition">Termos de Uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

