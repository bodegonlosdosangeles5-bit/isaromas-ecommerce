import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200/50 pt-16 pb-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">
          {/* Brand Mejorado */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight mb-2">
              ISAROMAS
            </h2>
            <p className="text-sm text-gray-600 font-light">Esencias que iluminan tu hogar</p>
          </div>

          {/* Tagline Mejorado */}
          <div className="flex items-center gap-2 text-gray-700 font-semibold bg-white px-5 py-3 rounded-full shadow-lg border-2 border-pink-200 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-pink-300">
            <Heart size={18} className="text-pink-500 fill-pink-500 animate-pulse" />
            <span>Artesanal / Hecho a Mano</span>
          </div>

          {/* Contact Mejorado */}
          <div className="text-center md:text-right">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">Contacto</p>
            <a 
                href="https://wa.me/5491125146197" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-lg font-bold text-gray-900 hover:text-pink-500 transition-all duration-300 hover:scale-105"
            >
                <span>+54 9 11 2514-6197</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200/50 pt-8 text-center">
          <p className="text-sm text-gray-500 font-light">
            &copy; {new Date().getFullYear()} ISAROMAS. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
