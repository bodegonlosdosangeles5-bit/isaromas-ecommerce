import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-isaromas-card-border pt-16 pb-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">
          {/* Brand Mejorado */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-isaromas-text-main tracking-tight mb-2">
              ISAROMAS
            </h2>
            <p className="text-sm text-isaromas-text-secondary font-light tracking-wide">Esencias que iluminan tu hogar</p>
          </div>

          {/* Tagline Mejorado */}
          <div className="flex items-center gap-3 text-isaromas-text-main font-medium bg-isaromas-cream px-6 py-3 rounded-full shadow-sm border border-isaromas-card-border hover:shadow-md transition-all duration-300 hover:border-isaromas-primary/50">
            <Heart size={20} className="text-isaromas-primary fill-isaromas-primary/20" strokeWidth={2} />
            <span className="tracking-wide text-sm">Artesanal / Hecho a Mano</span>
          </div>
        </div>

        <div className="border-t border-isaromas-card-border pt-8 text-center">
          <p className="text-sm text-isaromas-text-secondary font-light">
            &copy; {new Date().getFullYear()} ISAROMAS. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
