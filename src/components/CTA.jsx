import React from 'react'

const CTA = () => {
  return (
    <section className="py-20 gradient-lex text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Conteúdo à esquerda */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Não deixe sua dívida crescer ainda mais
              </h2>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                Cada dia que passa, os juros abusivos aumentam sua dívida desnecessariamente. <strong>Não perca mais tempo</strong> pagando valores injustos. Nossa equipe especializada está pronta para analisar seu contrato e negociar uma redução de até 80% na sua dívida. <strong>Dê o primeiro passo hoje</strong> e recupere o controle da sua vida financeira.
              </p>
              <a
                href="#inicio"
                className="inline-block bg-lex-gold text-white px-10 py-5 rounded-lg font-bold text-xl hover:bg-lex-gold-light transition transform hover:scale-105 shadow-2xl"
              >
                Solicite Análise Gratuita
              </a>
            </div>

            {/* Imagem à direita */}
            <div className="flex justify-center md:justify-end">
              <div className="border-4 border-green-800 rounded-2xl p-2">
                <img
                  src="/handshake.jpg"
                  alt="Cliente apertando as mãos de um consultor"
                  className="rounded-xl w-full max-w-md h-auto object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA

