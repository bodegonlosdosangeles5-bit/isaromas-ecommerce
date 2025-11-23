import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-isaromas-gray/50 border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">ISAROMAS</h2>
            <p className="text-sm text-gray-500 mt-1">Esencias que iluminan tu hogar</p>
          </div>

          {/* Tagline */}
          <div className="flex items-center gap-2 text-gray-600 font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <Heart size={16} className="text-isaromas-pink fill-isaromas-pink" />
            <span>Artesanal / Hecho a Mano</span>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-500 mb-1">Contacto</p>
            <a 
                href="https://wa.me/541125782862" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg font-semibold text-gray-800 hover:text-isaromas-pink transition-colors"
            >
                +54 11 2578-2862
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ISAROMAS. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
