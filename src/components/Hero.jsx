import React, { useState } from 'react'

const Hero = () => {
  const [formData, setFormData] = useState({
    objetivo: '',
    nome: '',
    telefone: '',
    ciente: false
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica de envio do formulário
    console.log('Formulário enviado:', formData)
    alert('Análise solicitada com sucesso! Entraremos em contato em breve.')
  }

  return (
    <section id="inicio" className="pt-24 pb-16 text-white relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero.webp)' }}
      />
      <div className="absolute inset-0 bg-lex-blue opacity-80" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
            Análise Gratuita do Seu Contrato
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-lex-gold leading-tight">
            Reduza sua dívida veicular com negociação especializada
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Nossa equipe analisa seu contrato e identifica oportunidades de redução de juros e taxas abusivas
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 text-gray-900">
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
                    <span className="text-lg">Quitar meu Veículo com até 80% OFF</span>
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
                    <span className="text-lg">Reduzir o Valor das minhas Parcelas Veiculares em até 50%</span>
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

          <div className="mt-8 text-center">
            <p className="text-yellow-200 font-semibold text-lg">
              ⚠️ ATENÇÃO
            </p>
            <p className="text-white mt-2">
              Não fazemos consórcio, empréstimos, venda de veículos, financiamentos ou outros serviços que não esteja acima!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

