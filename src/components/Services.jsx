import React from "react";
import {
  FaCar,
  FaHandHoldingUsd,
  FaCreditCard,
  FaBuilding,
  FaFileContract,
  FaGavel,
  FaShieldAlt,
} from "react-icons/fa";

const Services = () => {
  const services = [
    {
      title: "Redução de Financiamentos de Veículos",
      description:
        "Negocie diretamente com bancos e financeiras para reduzir o valor do seu financiamento veicular. Eliminamos cláusulas abusivas e reduzimos sua dívida em até 80%.",
      icon: FaCar,
    },
    {
      title: "Redução de Empréstimos Pessoais",
      description:
        "Analisamos seu contrato de empréstimo pessoal e identificamos oportunidades de redução através de negociação especializada com instituições financeiras.",
      icon: FaHandHoldingUsd,
    },
    {
      title: "Redução de Dívidas com Cartão de Crédito",
      description:
        "Negocie suas dívidas de cartão de crédito com condições mais favoráveis. Reduzimos juros e taxas abusivas através de análise contratual especializada.",
      icon: FaCreditCard,
    },
    {
      title: "Redução de Dívidas Empresariais",
      description:
        "Especialistas em renegociação de dívidas empresariais. Analisamos contratos corporativos e negociamos condições mais favoráveis para sua empresa.",
      icon: FaBuilding,
    },
    {
      title: "Análise e Revisão Contratual de Dívidas Bancárias",
      description:
        "Análise completa e detalhada do seu contrato bancário. Identificamos cláusulas abusivas, taxas irregulares e oportunidades de revisão contratual.",
      icon: FaFileContract,
    },
    {
      title: "Revisão de Juros Abusivos",
      description:
        "Especialistas em identificar e contestar juros abusivos em contratos financeiros. Comparação com taxas de referência do Banco Central (BACEN).",
      icon: FaGavel,
    },
    {
      title: "Evitar a Busca e Apreensão de Veículos",
      description:
        "Ação preventiva para evitar a busca e apreensão do seu veículo. Negociamos acordos e condições que protegem seu patrimônio antes que a situação se agrave.",
      icon: FaShieldAlt,
    },
  ];

  return (
    <section id="servicos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div
            data-aos="zoom-in"
            className="inline-block bg-lex-blue/10 px-4 py-2 rounded-full mb-4"
          >
            <span className="text-lex-blue font-semibold text-sm md:text-base">
              Nossos Serviços
            </span>
          </div>
          <h2
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-bold text-lex-blue mb-4"
          >
            Soluções Completas para Suas Dívidas
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-xl text-gray-700 max-w-3xl mx-auto"
          >
            Oferecemos serviços especializados em renegociação e revisão de
            contratos bancários para reduzir suas dívidas e proteger seu
            patrimônio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden group"
              >
                <div className="bg-lex-blue p-6 flex items-center justify-center">
                  <IconComponent className="text-5xl text-lex-gold" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-lex-blue mb-3 group-hover:text-lex-gold transition">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div
          data-aos="zoom-in"
          data-aos-delay="800"
          className="text-center mt-12"
        >
          <a
            href="#inicio"
            className="inline-block bg-lex-blue text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-lex-blue-dark transition transform hover:scale-105 shadow-lg"
          >
            Solicite uma Análise Gratuita
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;

