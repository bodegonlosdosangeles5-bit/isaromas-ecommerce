// Next.js
import Link from 'next/link';
import { Metadata } from 'next';

// Iconos
import { Sparkles, Palette, Clock, Heart, ArrowRight } from 'lucide-react';

// Componentes
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

// Datos
import productsData from '@/data/products.json';

export const metadata: Metadata = {
  title: 'ISAROMAS | Esencias que iluminan',
  description: 'Velas de soja, difusores y esencias artesanales personalizadas.',
};

export default function Home() {
  // Obtener los productos más vendidos (primeros 3)
  const bestSellers = productsData.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-rose-50/30 to-pink-50/20">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50/50 via-pink-50/30 to-white">
          {/* Abstract Background Shapes */}
          <div className="absolute top-[-15%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-tr from-rose-300/30 to-pink-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-300/15 to-rose-300/15 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto animate-fade-in">
            <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/90 backdrop-blur-sm border-2 border-pink-300 text-pink-600 text-xs md:text-sm font-bold mb-8 tracking-wider uppercase shadow-lg">
              <Heart size={14} className="fill-pink-500" />
              Artesanal & Hecho a Mano
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-[1.1]">
              Iluminá tus momentos con{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 animate-gradient">
                esencias únicas
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Creamos velas de soja y aromas personalizados que transforman tu hogar en un refugio de paz y armonía.
            </p>
            <Link 
              href="/catalogo" 
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 md:px-10 md:py-5 rounded-full text-base md:text-lg font-bold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl hover:shadow-pink-500/40"
            >
              <span>Comprar Ahora</span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* Sección Más Vendidos */}
        <section className="py-24 md:py-32 px-4 container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Más Vendidos
            </h2>
            <p className="text-lg text-gray-600 font-light">Los favoritos de nuestra comunidad</p>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link 
              href="/catalogo" 
              className="group inline-flex items-center gap-2 text-pink-600 font-bold hover:text-rose-600 transition-all duration-300 text-lg border-b-2 border-transparent hover:border-pink-500 pb-1"
            >
              <span>Ver todos los productos</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* Sección Personalización */}
        <section className="py-24 md:py-32 bg-gradient-to-b from-white via-rose-50/20 to-pink-50/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Personalizá tu Pedido
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                Cada producto es creado especialmente para vos. Elegí el aroma, el color y el envase que más te guste.
                Debido a nuestro proceso artesanal, los pedidos tienen una demora de producción de{' '}
                <span className="font-bold text-gray-900 bg-pink-100 px-2 py-1 rounded">1 a 5 días hábiles</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { icon: Sparkles, title: "Calidad Premium", desc: "Cera de soja 100% natural y esencias puras.", color: "from-amber-400 to-orange-400" },
                { icon: Palette, title: "Personalizado", desc: "Elegí tus colores y aromas favoritos.", color: "from-pink-500 to-rose-500" },
                { icon: Clock, title: "Tiempo de Dedicación", desc: "Producción artesanal en 1-5 días.", color: "from-pink-400 to-rose-400" },
                { icon: Heart, title: "Hecho con Amor", desc: "Cada pieza es única y hecha a mano.", color: "from-rose-500 to-pink-500" },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border-2 border-gray-100 hover:-translate-y-2 hover:border-pink-300"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${item.color} text-white rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={28} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

