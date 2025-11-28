import React from "react";
import {
  FaDollarSign,
  FaChartLine,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      title: "Não pague mais juros abusivos",
      description:
        "Pare de pagar um valor absurdo pelo seu veículo, você arca com altos valores indevidamente! Recorra agora e identifique se está sofrendo com os Juros Abusivos!",
      icon: FaDollarSign,
    },
    {
      title: "Redução de até 80%",
      description:
        "Eliminamos as cláusulas abusivas do seu contrato e reduzimos sua dívida em até 80% através de negociação direta com bancos e financeiras.",
      icon: FaChartLine,
    },

    {
      title: "Análise gratuita",
      description:
        "Faça uma análise completa do seu contrato. Identificamos juros abusivos e taxas irregulares gratuitamente.",
      icon: FaCheckCircle,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-bold text-lex-blue mb-4"
          >
            Não pague mais juros abusivos
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-xl text-gray-700 max-w-3xl mx-auto"
          >
            Pare de pagar um valor absurdo pelo seu veículo, você arca com altos
            valores indevidamente! Recorra agora e identifique se está sofrendo
            com os Juros Abusivos!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <div className="text-lex-blue mb-4">
                  <IconComponent className="text-5xl" />
                </div>
                <h3 className="text-xl font-bold text-lex-blue mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div
          data-aos="zoom-in"
          data-aos-delay="400"
          className="text-center mt-12"
        >
          <a
            href="#inicio"
            className="inline-block bg-lex-blue text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-lex-blue-dark transition transform hover:scale-105 shadow-lg"
          >
            Solicite Análise Gratuita
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
