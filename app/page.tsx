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
import FAQ from '@/components/FAQ';
import Hero from '@/components/Hero';
import ContactSection from '@/components/ContactSection';


// Datos
import productsData from '@/data/products.json';
import { normalizeProduct } from '@/types/product';

export const metadata: Metadata = {
  title: 'ISAROMA | Esencias que iluminan',
  description: 'Velas de soja, difusores y esencias artesanales personalizadas.',
};

export default function Home() {
  // Obtener los productos más vendidos (primeros 3) y normalizarlos
  const bestSellers = productsData.slice(0, 3).map(normalizeProduct);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-rose-50/30 to-pink-50/20">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />



        {/* Featured Products Section */}
        <section id="destacados" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
            <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12 md:mb-16 max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-isaroma-text-main mb-3 sm:mb-4 tracking-tight relative inline-block">
                Productos Destacados
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 sm:w-16 h-1 bg-isaroma-primary/50 rounded-full"></div>
                </h2>
                <p className="text-isaroma-text-secondary text-base sm:text-lg font-light mt-4 sm:mt-6 px-4">
                Las fragancias favoritas de nuestros clientes, creadas para perdurar.
                </p>
            </div>
            </ScrollReveal>
            
            <ScrollReveal delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
            </ScrollReveal>
            
            <div className="text-center mt-8 sm:mt-12 md:mt-16">
                <Link 
                    href="/catalogo" 
                    className="inline-flex items-center gap-2 text-isaroma-primary font-bold text-base sm:text-lg hover:text-isaroma-primary-hover link-underline transition-all"
                >
                    Ver todos los productos <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                </Link>
            </div>
            </div>
        </section>

        {/* Personalization Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-isaroma-cream border-t border-isaroma-card-border">
            <div className="container mx-auto px-4 sm:px-6">
            <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
                <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-isaroma-text-main tracking-tight relative inline-block">
                    Personalizá tu Experiencia
                    <div className="absolute -bottom-2 left-0 w-12 sm:w-16 h-1 bg-isaroma-primary/50 rounded-full"></div>
                </h2>
                <p className="text-base sm:text-lg text-isaroma-text-secondary font-light leading-relaxed">
                    En ISAROMA creemos que cada hogar es único. Por eso te ofrecemos la posibilidad de personalizar tus fragancias favoritas.
                </p>
                
                <div className="space-y-4 sm:space-y-6">
                    {[
                    { title: "Elegí tu Aroma", desc: "Más de 20 esencias exclusivas." },
                    { title: "Seleccioná el Envase", desc: "Diseños que decoran tu espacio." },
                    { title: "Creá tu Momento", desc: "Disfrutá de un ambiente único." }
                    ].map((item, idx) => (
                    <div key={idx} className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl border border-isaroma-card-border shadow-sm hover:shadow-md transition-all hover:border-isaroma-primary/30">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-isaroma-pink-light/30 rounded-full flex items-center justify-center text-isaroma-primary font-bold text-lg sm:text-xl shrink-0">
                        {idx + 1}
                        </div>
                        <div>
                        <h3 className="font-bold text-isaroma-text-main text-base sm:text-lg tracking-tight">{item.title}</h3>
                        <p className="text-sm sm:text-base text-isaroma-text-secondary font-light">{item.desc}</p>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white hover-image">
                <img 
                    src="/images/personaliza-experiencia.webp" 
                    alt="Personalización" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
            </div>
            </ScrollReveal>
            </div>
        </section>

        {/* FAQ Section */}
        <FAQ />

        {/* Contact Section */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
