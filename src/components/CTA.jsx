import React from "react";

const CTA = () => {
  return (
    <section className="py-20 text-white relative overflow-hidden">
      {/* Imagem de fundo com efeito parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/handshake.jpg)',
          backgroundPosition: 'right center',
          backgroundAttachment: 'fixed'
        }}
      />
      {/* Filtro azul por cima */}
      <div className="absolute inset-0 bg-lex-blue opacity-90" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Conteúdo centralizado */}
          <div data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Não deixe sua dívida crescer ainda mais
            </h2>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Cada dia que passa, os juros abusivos aumentam sua dívida
              desnecessariamente. <strong>Não perca mais tempo</strong>{" "}
              pagando valores injustos. Nossa equipe especializada está pronta
              para analisar seu contrato e negociar uma redução de até 80% na
              sua dívida. <strong>Dê o primeiro passo hoje</strong> e recupere
              o controle da sua vida financeira.
            </p>
            <a
              href="#inicio"
              className="inline-block bg-lex-gold text-white px-10 py-5 rounded-lg font-bold text-xl hover:bg-lex-gold-light transition transform hover:scale-105 shadow-2xl"
            >
              Solicite Análise Gratuita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
