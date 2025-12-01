import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

const WhatsAppButton = () => {
  const phoneNumber = '5583999283091';
  const message = 'Olá! Gostaria de solicitar uma análise gratuita.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group animate-float"
      aria-label="Fale conosco no WhatsApp"
      style={{ animation: 'float 3s ease-in-out infinite' }}
    >
      {/* Badge de notificação */}
      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg z-10">
        <span className="relative flex items-center justify-center">
          <span className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></span>
          <span className="relative z-10">1</span>
        </span>
      </div>

      {/* Botão principal */}
      <div className="relative">
        {/* Efeito de pulso ao redor */}
        <div 
          className="absolute inset-0 bg-green-500 rounded-full opacity-20"
          style={{ 
            animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        ></div>
        <div 
          className="absolute inset-0 bg-green-500 rounded-full opacity-30"
          style={{ 
            animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.5s'
          }}
        ></div>
        
        {/* Botão */}
        <div className="relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 transform group-hover:scale-110">
          <FaWhatsapp className="text-3xl" />
        </div>
      </div>
    </a>
  )
}

export default WhatsAppButton

