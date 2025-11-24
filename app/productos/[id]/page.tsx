'use client';

// React
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Iconos
import { ShoppingCart, Star, Truck, ShieldCheck, ArrowLeft, ShoppingBag } from 'lucide-react';

// Componentes
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

// Contextos
import { useCart } from '@/context/CartContext';

// Datos
import productsData from '@/data/products.json';
import { normalizeProduct } from '@/types/product';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { addToCart } = useCart();

  const rawProduct = productsData.find(p => p.id === id);
  const product = rawProduct ? normalizeProduct(rawProduct) : null;

  const [selectedVariant, setSelectedVariant] = useState<{
    aroma: string;
    color?: string;
    size?: string;
    gender?: string;
  } | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Inicializar variante por defecto cuando se carga el producto
  useEffect(() => {
    if (product && product.variants.length > 0 && !selectedVariant) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product, selectedVariant]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-isaromas-cream">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-isaromas-text-main mb-2">Producto no encontrado</h1>
          <p className="text-isaromas-text-secondary">El producto que buscas no existe.</p>
          <Link href="/catalogo" className="text-isaromas-primary hover:underline mt-4 inline-block font-bold">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant || undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-isaromas-cream">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 px-4 container mx-auto">
        <ScrollReveal>
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-isaromas-card-border max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Imagen del Producto */}
            <div className="relative h-[400px] md:h-[600px] bg-gradient-to-br from-isaromas-cream to-pink-50 p-8 flex items-center justify-center">
                <div className="absolute top-6 left-6 z-10">
                    <Link href="/catalogo" className="flex items-center gap-2 text-isaromas-text-secondary hover:text-isaromas-primary transition-colors font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md">
                        <ArrowLeft size={18} /> Volver
                    </Link>
                </div>
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                />
            </div>

            {/* Detalles del Producto */}
            <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-isaromas-pink-light text-isaromas-text-main text-xs font-bold tracking-widest uppercase mb-4 shadow-sm border border-white/50">
                    {product.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-isaromas-text-main mb-3 tracking-tight leading-tight">
                    {product.name}
                </h1>
                
                {/* Benefits */}
                {product.benefits && product.benefits.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.benefits.map((benefit: string, index: number) => (
                      <span 
                        key={index}
                        className="px-3 py-1.5 bg-isaromas-bg-hover text-sm font-medium text-isaromas-primary-hover rounded-full border border-isaromas-card-border"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-isaromas-card-border">
                    {product.id !== 'experiencia-personalizada-001' && (
                        <span className="text-4xl font-bold text-isaromas-text-main">
                            ${product.price.toLocaleString()}
                        </span>
                    )}
                </div>
                <p className="text-lg text-isaromas-text-secondary leading-relaxed font-light mb-8">
                    {product.description}
                </p>
              </div>

              {/* Selectores de Variantes */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-6 mb-8">
                    <h3 className="font-bold text-isaromas-text-main tracking-wide uppercase text-sm">Elegí tu variante:</h3>
                    <div className="flex flex-wrap gap-3">
                        {product.variants.map((v, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedVariant(v)}
                                className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                                    selectedVariant === v
                                        ? 'bg-isaromas-primary text-white border-isaromas-primary shadow-md transform scale-105'
                                        : 'bg-isaromas-cream text-isaromas-text-secondary border-isaromas-card-border hover:border-isaromas-primary hover:text-isaromas-primary'
                                }`}
                            >
                                {[v.aroma, (v as any).color, (v as any).size, (v as any).gender].filter(Boolean).join(' - ')}
                            </button>
                        ))}
                    </div>
                </div>
              )}

              {/* Controles de Cantidad y Agregar al Carrito */}
              {product.id === 'experiencia-personalizada-001' ? (
                <div className="mt-auto pt-8 border-t border-isaromas-card-border">
                    <div className="bg-isaromas-pink-light/20 border border-isaromas-pink-light rounded-xl p-6 text-center">
                        <p className="text-isaromas-text-main font-medium text-lg mb-2">
                            Esta es una experiencia personalizada.
                        </p>
                        <p className="text-isaromas-text-secondary mb-4">
                            Nuestras velas de soja se realizan a pedido con el diseño, aroma y colores que vos elijas.
                        </p>
                        <p className="text-isaromas-primary font-bold">
                            Escribinos por WhatsApp para crear tu combinación ideal.
                        </p>
                    </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-8 border-t border-isaromas-card-border">
                    <div className="flex items-center border border-isaromas-card-border rounded-xl bg-isaromas-cream">
                        <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-5 py-3 text-isaromas-text-secondary hover:text-isaromas-primary transition-colors font-bold text-lg"
                        >-</button>
                        <span className="px-5 font-bold text-isaromas-text-main text-lg min-w-[3rem] text-center">{quantity}</span>
                        <button 
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-5 py-3 text-isaromas-text-secondary hover:text-isaromas-primary transition-colors font-bold text-lg"
                        >+</button>
                    </div>
                    <button 
                        onClick={handleAddToCart}
                        className="flex-1 bg-isaromas-primary hover:bg-isaromas-primary-hover text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 tracking-wide hover:-translate-y-1"
                    >
                        <ShoppingBag size={22} strokeWidth={2.5} />
                        Agregar al Carrito
                    </button>
                </div>
              )}

              {/* Info Adicional */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-isaromas-card-border">
                <div className="flex items-center gap-3 text-sm text-isaromas-text-secondary">
                    <div className="p-2 bg-isaromas-pink-light/30 rounded-full text-isaromas-primary">
                        <Truck size={18} />
                    </div>
                    <span>Envíos a todo el país</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-isaromas-text-secondary">
                    <div className="p-2 bg-isaromas-pink-light/30 rounded-full text-isaromas-primary">
                        <ShieldCheck size={18} />
                    </div>
                    <span>Compra protegida</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
