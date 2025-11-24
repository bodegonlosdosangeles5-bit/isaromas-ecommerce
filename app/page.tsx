// Next.js
import Link from 'next/link';
import { Metadata } from 'next';

// Iconos
import { Sparkles, Palette, Clock, Heart, ArrowRight } from 'lucide-react';

// Componentes
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';

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
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-isaromas-cream">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/40 to-transparent"></div>
                <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-isaromas-pink-light/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-isaromas-pink-light/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 z-10 text-center">
            <ScrollReveal className="space-y-8 max-w-4xl mx-auto">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-isaromas-card-border text-isaromas-primary text-sm font-bold tracking-widest uppercase shadow-sm mb-4">
                    Nueva Colección 2024
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-isaromas-text-main leading-tight tracking-tight">
                Aromas que <span className="text-isaromas-primary relative inline-block">
                    Enamoran
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-isaromas-pink-light opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                    </svg>
                </span>
                </h1>
                <p className="text-xl md:text-2xl text-isaromas-text-secondary font-light max-w-2xl mx-auto leading-relaxed">
                Descubrí nuestra línea exclusiva de fragancias artesanales para transformar cada rincón de tu hogar.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link 
                    href="/catalogo" 
                    className="bg-isaromas-primary hover:bg-isaromas-primary-hover text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover-button tracking-wide"
                >
                    Ver Catálogo
                </Link>
                <Link 
                    href="#destacados" 
                    className="bg-white hover:bg-isaromas-cream text-isaromas-text-main border border-isaromas-card-border px-10 py-4 rounded-full font-bold text-lg shadow-sm hover:shadow-md transition-all hover-button tracking-wide"
                >
                    Más Vendidos
                </Link>
                </div>
            </ScrollReveal>
            </div>
        </section>

        {/* Featured Products Section */}
        <section id="destacados" className="py-24 bg-white">
            <div className="container mx-auto px-4">
            <ScrollReveal>
            <div className="text-center mb-16 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-isaromas-text-main mb-4 tracking-tight relative inline-block">
                Productos Destacados
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-isaromas-primary/50 rounded-full"></div>
                </h2>
                <p className="text-isaromas-text-secondary text-lg font-light mt-6">
                Las fragancias favoritas de nuestros clientes, creadas para perdurar.
                </p>
            </div>
            </ScrollReveal>
            
            <ScrollReveal delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
            </ScrollReveal>
            
            <div className="text-center mt-16">
                <Link 
                    href="/catalogo" 
                    className="inline-flex items-center gap-2 text-isaromas-primary font-bold text-lg hover:text-isaromas-primary-hover link-underline transition-all"
                >
                    Ver todos los productos <ArrowRight size={20} />
                </Link>
            </div>
            </div>
        </section>

        {/* Personalization Section */}
        <section className="py-24 bg-isaromas-cream border-t border-isaromas-card-border">
            <div className="container mx-auto px-4">
            <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-isaromas-text-main tracking-tight relative inline-block">
                    Personaliz á tu Experiencia
                    <div className="absolute -bottom-2 left-0 w-16 h-1 bg-isaromas-primary/50 rounded-full"></div>
                </h2>
                <p className="text-lg text-isaromas-text-secondary font-light leading-relaxed">
                    En ISAROMAS creemos que cada hogar es único. Por eso te ofrecemos la posibilidad de personalizar tus fragancias favoritas.
                </p>
                
                <div className="space-y-6">
                    {[
                    { title: "Elegí tu Aroma", desc: "Más de 20 esencias exclusivas." },
                    { title: "Seleccioná el Envase", desc: "Diseños que decoran tu espacio." },
                    { title: "Creá tu Momento", desc: "Disfrutá de un ambiente único." }
                    ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 bg-white rounded-2xl border border-isaromas-card-border shadow-sm hover:shadow-md transition-all hover:border-isaromas-primary/30">
                        <div className="w-12 h-12 bg-isaromas-pink-light/30 rounded-full flex items-center justify-center text-isaromas-primary font-bold text-xl">
                        {idx + 1}
                        </div>
                        <div>
                        <h3 className="font-bold text-isaromas-text-main text-lg tracking-tight">{item.title}</h3>
                        <p className="text-isaromas-text-secondary font-light">{item.desc}</p>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
                <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white hover-image">
                <img 
                    src="/images/products/difusor-de-ambiente-con-varilla.webp" 
                    alt="Personalización" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
            </div>
            </ScrollReveal>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
