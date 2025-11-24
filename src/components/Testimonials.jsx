import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      name: "Cosmo Inácio",
      text: "Há 1 ano atrás procurei a LEX PRIME. Devido à pandemia, estava com dificuldade para pagar as parcelas. Consegui um desconto de 40% na hora do total da minha dívida. Hoje estou com meu veículo quitado graças à LEX PRIME!",
      savings: "40% de desconto"
    },
    {
      name: "Luciene Silva",
      text: "Meu carro teve uma economia de R$9.000,00 no meu financiamento, atualmente já foi vendido. E, por isso, indico a LEX PRIME Soluções Financeiras",
      savings: "R$ 9.000,00 economizados"
    },
    {
      name: "Matheus Oliveira",
      text: "Já estou com o gravame baixado e estou muito feliz! Empresa responsável, sincera e, é isso aí!",
      savings: "Gravame baixado"
    }
  ]

  return (
    <section id="depoimentos" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-lex-blue mb-4">
            Histórias de Sucesso
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Mais de 50 mil veículos quitados com redução de até 80% na dívida
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="mb-4 flex-grow">
                <div className="flex items-center space-x-1 text-lex-gold mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>
              <div className="border-t pt-4 mt-auto">
                <p className="font-bold text-lex-blue">{testimonial.name}</p>
                <p className="text-sm text-lex-gold font-semibold">{testimonial.savings}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
          <div>
            <div className="text-4xl font-bold text-lex-gold mb-2">+50 mil</div>
            <div className="text-gray-700 font-semibold">Veículos Quitados</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-lex-gold mb-2">+12 anos</div>
            <div className="text-gray-700 font-semibold">de Experiência</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-lex-gold mb-2">Até 80%</div>
            <div className="text-gray-700 font-semibold">de Economia</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-lex-gold mb-2">100%</div>
            <div className="text-gray-700 font-semibold">Seguro</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

