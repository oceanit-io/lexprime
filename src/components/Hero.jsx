import React from 'react'
import { FaShieldAlt, FaHandshake, FaChartLine, FaCheckCircle } from 'react-icons/fa'

const Hero = () => {
  const stats = [
    { number: '80%', label: 'Redução na dívida' },
    { number: '10k+', label: 'Clientes atendidos' },
    { number: 'R$ 500M+', label: 'Economizados' },
    { number: '98%', label: 'Taxa de sucesso' },
  ]

  const benefits = [
    {
      icon: FaShieldAlt,
      text: 'Proteção jurídica completa'
    },
    {
      icon: FaHandshake,
      text: 'Negociação direta com bancos'
    },
    {
      icon: FaChartLine,
      text: 'Análise gratuita do contrato'
    },
    {
      icon: FaCheckCircle,
      text: 'Sem custos iniciais'
    },
  ]

  return (
    <section id="inicio" className="pt-32 md:pt-40 pb-20 text-white relative overflow-hidden min-h-screen flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero.webp)' }}
      />
      <div className="absolute inset-0 bg-lex-blue opacity-85" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Conteúdo Principal */}
          <div className="text-center mb-16">
            <div 
              data-aos="fade-down"
              className="inline-block bg-lex-gold/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-lex-gold/30"
            >
              <span className="text-lex-gold font-semibold text-sm md:text-base">
                Especialistas em Revisão de Contratos e Juros Abusivos
              </span>
            </div>
            
            <h1 
              data-aos="fade-up"
              data-aos-duration="800"
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-white">Pare de pagar</span>{' '}
              <span className="text-lex-gold">juros abusivos</span>
              <br />
              <span className="text-white">nas suas dívidas</span>
            </h1>
            
            <p 
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Nossa equipe especializada identifica e elimina 
              cláusulas abusivas dos seus contratos bancários, reduzindo suas dívidas em até 80% através 
              de negociação direta com bancos e financeiras.
            </p>

            <div 
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="600"
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <a
                href="#calculadora"
                className="bg-lex-gold text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-lex-gold-light transition transform hover:scale-105 shadow-lg"
              >
                Calcule sua Economia
              </a>
              <a
                href="#como-funciona"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition transform hover:scale-105"
              >
                Como Funciona
              </a>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={600 + (index * 100)}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center hover:bg-white/15 transition transform hover:scale-105"
              >
                <div className="text-3xl md:text-4xl font-bold text-lex-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-white/90 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Benefícios */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div
                  key={index}
                  data-aos="zoom-in"
                  data-aos-delay={1000 + (index * 100)}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center hover:bg-white/15 transition transform hover:-translate-y-1"
                >
                  <IconComponent className="text-3xl text-lex-gold mx-auto mb-2" />
                  <p className="text-white text-sm md:text-base">
                    {benefit.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  )
}

export default Hero

