'use client';

import React, { useState } from 'react';
import { ChevronDown, Package, CreditCard, Users, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    id: 'envios',
    question: 'Envíos',
    answer: 'Coordinamos el envío de manera personalizada una vez realizada la compra. Nos adaptamos a tu ubicación y a la opción que te resulte más cómoda.',
    icon: <Package className="w-6 h-6" />,
  },
  {
    id: 'pagos',
    question: 'Medios de Pago',
    answer: 'Por el momento operamos mediante transferencia bancaria y encargos personalizados. Si querés realizar una compra o consulta, podés escribirnos directamente y te asistimos en el proceso.',
    icon: <CreditCard className="w-6 h-6" />,
  },
  {
    id: 'quienes-somos',
    question: '¿Quiénes Somos?',
    answer: 'Somos un emprendimiento familiar dedicado a la creación de velas artesanales, aceites aromáticos, difusores, esencias y más productos pensados para darle vida y armonía a tus espacios.',
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 'por-que-elegirnos',
    question: '¿Por qué elegirnos?',
    answer: 'Ofrecemos calidad, originalidad y fragancias únicas diseñadas para transformar tus ambientes con energía, bienestar y calidez. Cada producto está hecho con dedicación, amor y materiales seleccionados.',
    icon: <Sparkles className="w-6 h-6" />,
  },
];

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12 md:mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-isaromas-pink-light/30 rounded-full mb-4 sm:mb-6">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-isaromas-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-isaromas-text-main mb-3 sm:mb-4 tracking-tight relative inline-block">
              Preguntas Frecuentes
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 sm:w-16 h-1 bg-isaromas-primary/50 rounded-full"></div>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-isaromas-text-secondary font-light mt-4 sm:mt-6 px-4">
              Encontrá respuestas a las consultas más comunes sobre nuestros productos y servicios.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {faqData.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 100}>
              <div
                className={`
                  bg-white border-2 rounded-2xl overflow-hidden transition-all duration-300
                  ${openItem === item.id
                    ? 'border-isaromas-primary shadow-lg shadow-isaromas-pink-light/30'
                    : 'border-isaromas-card-border hover:border-isaromas-primary/50 hover:shadow-md'
                  }
                `}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 text-left focus:outline-none focus:ring-2 focus:ring-isaromas-primary/50 rounded-xl sm:rounded-2xl transition-colors"
                  aria-expanded={openItem === item.id}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div
                      className={`
                        shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300
                        ${openItem === item.id
                          ? 'bg-isaromas-primary text-white'
                          : 'bg-isaromas-pink-light/30 text-isaromas-primary'
                        }
                      `}
                    >
                      {item.icon && React.cloneElement(item.icon, { className: 'w-5 h-5 sm:w-6 sm:h-6' })}
                    </div>
                    <h3
                      className={`
                        text-base sm:text-lg md:text-xl font-bold text-isaromas-text-main tracking-tight
                        ${openItem === item.id ? 'text-isaromas-primary' : ''}
                      `}
                    >
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`
                      flex-shrink-0 w-6 h-6 text-isaromas-text-secondary transition-transform duration-300
                      ${openItem === item.id ? 'transform rotate-180 text-isaromas-primary' : ''}
                    `}
                  />
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  className={`
                    overflow-hidden transition-all duration-300 ease-out
                    ${openItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pl-16 sm:pl-20 md:pl-24">
                    <p className="text-sm sm:text-base md:text-lg text-isaromas-text-secondary font-light leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

