import React from 'react'
import { FaClipboardCheck, FaBullhorn, FaBriefcase, FaCheckCircle } from 'react-icons/fa'

const HowItWorks = () => {
  const steps = [
    {
      number: "1º",
      title: "Análise",
      description: "Após o cadastro, um de nossos especialistas entrará em contato para analisar o contrato e identificar os valores de juros abusivos e as taxas irregulares.",
      icon: FaClipboardCheck
    },
    {
      number: "2º",
      title: "Notificação",
      description: "Em seguida, vamos notificar a instituição financeira a respeito das cobranças de juros abusivos e taxas irregulares. Caso você tenha parcelas atrasadas, também iremos renegociá-las.",
      icon: FaBullhorn
    },
    {
      number: "3º",
      title: "Proposta",
      description: "O banco fará uma nova proposta, sem os juros abusivos e em novas condições de parcelamento. A partir de então, vamos encontrar a condição que seja mais favorável a você.",
      icon: FaBriefcase
    },
    {
      number: "4º",
      title: "Regularizado!",
      description: "Assim que encontrarmos o melhor acordo possível em termos e condições de pagamento, você poderá até quitar o financiamento ou pagar as parcelas reduzidas, livre de cobranças abusivas.",
      icon: FaCheckCircle
    }
  ]

  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 data-aos="fade-up" className="text-4xl md:text-5xl font-bold text-lex-blue mb-4">
            Como Funciona
          </h2>
          <p data-aos="fade-up" data-aos-delay="200" className="text-xl text-gray-700 max-w-3xl mx-auto">
            Um processo simples e transparente para reduzir sua dívida e proteger seu veículo
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div
                  key={index}
                  data-aos="flip-left"
                  data-aos-delay={index * 150}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-lex-blue to-lex-blue-dark text-white p-8 rounded-xl shadow-lg h-full">
                    <div className="mb-4">
                      <IconComponent className="text-5xl text-lex-gold" />
                    </div>
                    <div className="text-lex-gold font-bold text-2xl mb-2">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      {step.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <svg className="w-8 h-8 text-lex-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div data-aos="zoom-in" data-aos-delay="600" className="text-center mt-16">
          <a
            href="#inicio"
            className="inline-block bg-lex-gold text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-lex-gold-light transition transform hover:scale-105 shadow-lg"
          >
            Começar Agora
          </a>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

