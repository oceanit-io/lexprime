import React, { useState, useEffect } from 'react'

const LeadModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    objetivo: '',
    nome: '',
    telefone: '',
    ciente: false
  })

  useEffect(() => {
    // Abre a modal toda vez que a página é carregada
    setIsOpen(true)
  }, [])

  useEffect(() => {
    // Bloqueia o scroll da página quando o modal está aberto
    if (isOpen) {
      // Salva a posição atual do scroll
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Restaura o scroll quando o modal fecha
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    // Cleanup: restaura o scroll quando o componente desmonta
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica de envio do formulário
    console.log('Formulário enviado:', formData)
    alert('Análise solicitada com sucesso! Entraremos em contato em breve.')
    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-75"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-lex-blue rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de fechar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-lex-gold transition z-10"
          aria-label="Fechar"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Conteúdo da modal - duas colunas */}
        <div className="p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Coluna Esquerda - Textos */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                Análise Gratuita do Seu Contrato
              </h2>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-lex-gold leading-tight">
                Reduza sua dívida veicular com negociação especializada
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Nossa equipe analisa seu contrato e identifica oportunidades de redução de juros e taxas abusivas
              </p>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-yellow-200 font-semibold text-lg mb-2">
                  ⚠️ ATENÇÃO
                </p>
                <p className="text-white text-sm md:text-base">
                  Não fazemos consórcio, empréstimos, venda de veículos, financiamentos ou outros serviços que não estejam acima!
                </p>
              </div>
            </div>

            {/* Coluna Direita - Formulário */}
            <div>
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-gray-900">
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold mb-3">
                      1. O QUE VOCÊ PROCURA?
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-lex-blue transition">
                        <input
                          type="radio"
                          name="objetivo"
                          value="quitar"
                          checked={formData.objetivo === 'quitar'}
                          onChange={(e) => setFormData({...formData, objetivo: e.target.value})}
                          className="mr-3 w-5 h-5 text-lex-blue"
                          required
                        />
                        <span className="text-base md:text-lg">Quitar meu Veículo com até 80% OFF</span>
                      </label>
                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-lex-blue transition">
                        <input
                          type="radio"
                          name="objetivo"
                          value="reduzir"
                          checked={formData.objetivo === 'reduzir'}
                          onChange={(e) => setFormData({...formData, objetivo: e.target.value})}
                          className="mr-3 w-5 h-5 text-lex-blue"
                          required
                        />
                        <span className="text-base md:text-lg">Reduzir o Valor das minhas Parcelas Veiculares em até 50%</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold mb-2">
                      2. Qual seu nome?
                    </label>
                    <input
                      type="text"
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-lex-blue focus:outline-none text-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold mb-2">
                      3. Número de Telefone ou Whatsapp com DDD:
                    </label>
                    <input
                      type="tel"
                      value={formData.telefone}
                      onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-lex-blue focus:outline-none text-lg"
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.ciente}
                        onChange={(e) => setFormData({...formData, ciente: e.target.checked})}
                        className="mr-3 w-5 h-5 text-lex-blue"
                        required
                      />
                      <span className="text-base">Está ciente que entraremos em contato neste número?</span>
                    </label>
                    {formData.ciente && (
                      <p className="mt-2 text-sm text-gray-600">Sim, estou ciente e ficarei no aguardo do contato</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-lex-gold text-white py-4 rounded-lg font-bold text-xl hover:bg-lex-gold-light transition transform hover:scale-105 shadow-lg"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadModal

