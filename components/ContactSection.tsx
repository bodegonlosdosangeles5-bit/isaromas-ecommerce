import { Instagram, Mail } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function ContactSection() {
  return (
    <section id="contacto" className="py-16 sm:py-20 bg-gradient-to-b from-white to-isaroma-cream">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-isaroma-text-main mb-4 tracking-tight">
              ¿Tenés dudas o querés un pedido especial?
            </h2>
            <p className="text-lg text-isaroma-text-secondary font-light mb-10">
              Escribinos, nos encanta asesorarte y ayudarte a encontrar tu aroma ideal.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <a 
                href="https://www.instagram.com/isaroma5/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white border border-isaroma-card-border text-isaroma-text-main font-bold rounded-xl shadow-sm hover:shadow-md hover:border-isaroma-primary hover:text-isaroma-primary transition-all duration-300 group"
              >
                <Instagram size={24} className="group-hover:scale-110 transition-transform duration-300" />
                Instagram
              </a>
              
              <a 
                href="mailto:isaroma.ventas@gmail.com?subject=Consulta%20desde%20la%20web%20ISAROMA&body=Hola%20ISAROMA,%20quería%20hacer%20una%20consulta%20sobre..."
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-isaroma-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-isaroma-primary-hover transition-all duration-300 hover:-translate-y-1"
              >
                <Mail size={24} />
                Envíanos un Mail
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
