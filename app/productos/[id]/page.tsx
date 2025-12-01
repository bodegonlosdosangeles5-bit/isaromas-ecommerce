'use client';

// React
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Iconos
import { ShoppingCart, Star, Truck, ShieldCheck, ArrowLeft, ShoppingBag, Search } from 'lucide-react';

// Componentes
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

// Contextos
import { useCart } from '@/context/CartContext';

// Datos
import productsData from '@/data/products.json';
import { normalizeProduct } from '@/types/product';

import { formatPrice } from '@/utils/formatPrice';

const GenderTabs = ({ variants, selectedVariant, onSelect }: { variants: any[], selectedVariant: any, onSelect: (v: any) => void }) => {
    const [activeTab, setActiveTab] = useState<'Femeninas' | 'Masculinas'>('Femeninas');

    const filteredVariants = variants.filter(v => {
        if (activeTab === 'Femeninas') {
            return v.gender === 'Femenino' || v.gender === 'Unisex';
        } else {
            return v.gender === 'Masculino';
        }
    });

    return (
        <div>
            <div className="flex p-1 bg-isaroma-cream rounded-xl mb-4 border border-isaroma-card-border w-fit">
                <button
                    onClick={() => setActiveTab('Femeninas')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                        activeTab === 'Femeninas'
                            ? 'bg-isaroma-primary text-white shadow-sm'
                            : 'text-isaroma-text-secondary hover:text-isaroma-primary'
                    }`}
                >
                    Femeninas
                </button>
                <button
                    onClick={() => setActiveTab('Masculinas')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                        activeTab === 'Masculinas'
                            ? 'bg-isaroma-primary text-white shadow-sm'
                            : 'text-isaroma-text-secondary hover:text-isaroma-primary'
                    }`}
                >
                    Masculinas
                </button>
            </div>

            <div className="flex flex-wrap gap-3">
                {filteredVariants.map((v, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelect(v)}
                        className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                            selectedVariant === v
                                ? 'bg-isaroma-primary text-white border-isaroma-primary shadow-md transform scale-105'
                                : 'bg-isaroma-cream text-isaroma-text-secondary border-isaroma-card-border hover:border-isaroma-primary hover:text-isaroma-primary'
                        }`}
                    >
                        {v.aroma}
                    </button>
                ))}
            </div>
        </div>
    );
};



const AromaSelector = ({ title, helperText, options, selectedOption, onSelect }: { title: string, helperText: string, options: any[], selectedOption: any, onSelect: (v: any) => void }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // Sync searchTerm with selectedOption when it changes externally or on initial load
    useEffect(() => {
        if (selectedOption) {
            setSearchTerm(selectedOption.aroma);
        }
    }, [selectedOption]);

    const filteredOptions = options.filter(option => 
        option.aroma.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option: any) => {
        onSelect(option);
        setSearchTerm(option.aroma);
        setIsOpen(false);
    };

    return (
        <div className="space-y-4 mb-8">
            {/* Header */}
            <div>
                <h3 className="font-bold text-isaroma-text-main tracking-wide uppercase text-sm mb-1">
                    {title}
                </h3>
            </div>

            {/* Autocomplete Input */}
            <div className="relative">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar aroma..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                        // Delay hiding to allow click on option
                        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-isaroma-card-border focus:border-isaroma-primary focus:ring-2 focus:ring-isaroma-pink-light outline-none transition-all bg-white text-isaroma-text-main placeholder:text-isaroma-text-muted text-sm shadow-sm"
                    />
                    <Search className="absolute left-3 top-3.5 text-isaroma-icon-muted" size={18} />
                </div>

                {/* Dropdown List */}
                {isOpen && (
                    <div className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto rounded-xl border border-isaroma-card-border bg-white shadow-lg custom-scrollbar">
                        {filteredOptions.length === 0 ? (
                            <div className="px-4 py-3 text-xs text-isaroma-text-muted italic">
                                No encontramos ese aroma. Si querés uno especial, consultanos.
                            </div>
                        ) : (
                            filteredOptions.map((v, idx) => {
                                const isSelected = selectedOption === v;
                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleSelect(v)}
                                        className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors border-b border-gray-50 last:border-0 ${
                                            isSelected
                                                ? 'bg-isaroma-pink-light/20 text-isaroma-primary font-medium'
                                                : 'hover:bg-isaroma-pink-light/10 text-isaroma-text-main'
                                        }`}
                                    >
                                        <span>{v.aroma}</span>
                                        {isSelected && <span className="text-xs text-isaroma-primary ml-2">Seleccionado</span>}
                                    </button>
                                );
                            })
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

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
      <div className="min-h-screen flex items-center justify-center bg-isaroma-cream">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-isaroma-text-main mb-2">Producto no encontrado</h1>
          <p className="text-isaroma-text-secondary">El producto que buscas no existe.</p>
          <Link href="/catalogo" className="text-isaroma-primary hover:underline mt-4 inline-block font-bold">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant || undefined);
  };

  const isCandle = product.category.includes('Velas') || product.name.toLowerCase().includes('vela');
  const isAromaProduct = ['Perfuminas', 'Aceites', 'Difusores'].includes(product.category);

  return (
    <div className="min-h-screen flex flex-col bg-isaroma-cream">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 px-4 container mx-auto">
        <ScrollReveal>
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-isaroma-card-border max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Imagen del Producto */}
            <div className="relative h-[400px] md:h-[600px] bg-gradient-to-br from-isaroma-cream to-pink-50 p-8 flex items-center justify-center">
                <div className="absolute top-6 left-6 z-10">
                    <Link href="/catalogo" className="flex items-center gap-2 text-isaroma-text-secondary hover:text-isaroma-primary transition-colors font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md">
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
                <span className="inline-block px-4 py-1.5 rounded-full bg-isaroma-pink-light text-isaroma-text-main text-xs font-bold tracking-widest uppercase mb-4 shadow-sm border border-white/50">
                    {product.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-isaroma-text-main mb-3 tracking-tight leading-tight">
                    {product.name}
                </h1>
                
                {/* Benefits */}
                {product.benefits && product.benefits.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.benefits.map((benefit: string, index: number) => (
                      <span 
                        key={index}
                        className="px-3 py-1.5 bg-isaroma-bg-hover text-sm font-medium text-isaroma-primary-hover rounded-full border border-isaroma-card-border"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-isaroma-card-border">
                    {product.id !== 'experiencia-personalizada-001' && (
                        <span className="text-4xl font-bold text-isaroma-text-main">
                            {formatPrice(product.price)}
                        </span>
                    )}
                </div>
                <p className="text-lg text-isaroma-text-secondary leading-relaxed font-light mb-8">
                    {product.description}
                </p>
              </div>

              {/* Selectores de Variantes */}
              {product.variants && product.variants.length > 0 && (
                <>
                    {/* Pestañas de fragancias: Femeninas (más Ana Abiyedh unisex) y Masculinas. */}
                    {product.variants.some((v: any) => v.gender) ? (
                        <div className="space-y-6 mb-8">
                            <h3 className="font-bold text-isaroma-text-main tracking-wide uppercase text-sm">
                                {product.id === 'perfume-001' ? 'ELEGÍ TU FRAGANCIA:' : 'ELEGÍ TU VARIANTE:'}
                            </h3>
                            <GenderTabs 
                                variants={product.variants} 
                                selectedVariant={selectedVariant} 
                                onSelect={setSelectedVariant} 
                            />
                            {product.id === 'perfume-001' && (
                                <p className="text-sm text-isaroma-text-secondary italic mt-2">
                                    Consultá por más fragancias.
                                </p>
                            )}
                        </div>
                    ) : (isCandle || isAromaProduct) ? (
                        <AromaSelector 
                            title="ELEGÍ TU AROMA:"
                            helperText={isCandle 
                                ? "Podés elegir el aroma de tu vela entre estas opciones disponibles." 
                                : "Podés elegir el aroma de tu producto entre estas opciones disponibles."}
                            options={product.variants}
                            selectedOption={selectedVariant}
                            onSelect={setSelectedVariant}
                        />
                    ) : (
                        <div className="space-y-6 mb-8">
                            <h3 className="font-bold text-isaroma-text-main tracking-wide uppercase text-sm">
                                ELEGÍ TU VARIANTE:
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {product.variants.map((v, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedVariant(v)}
                                        className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                                            selectedVariant === v
                                                ? 'bg-isaroma-primary text-white border-isaroma-primary shadow-md transform scale-105'
                                                : 'bg-isaroma-cream text-isaroma-text-secondary border-isaroma-card-border hover:border-isaroma-primary hover:text-isaroma-primary'
                                        }`}
                                    >
                                        {[v.aroma, (v as any).color, (v as any).size].filter(Boolean).join(' - ')}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </>
              )}

              {/* Controles de Cantidad y Agregar al Carrito */}
              {product.id === 'experiencia-personalizada-001' ? (
                <div className="mt-auto pt-8 border-t border-isaroma-card-border">
                    <div className="bg-isaroma-pink-light/20 border border-isaroma-pink-light rounded-xl p-6 text-center">
                        <p className="text-isaroma-text-main font-medium text-lg mb-2">
                            Esta es una experiencia personalizada.
                        </p>
                        <p className="text-isaroma-text-secondary mb-4">
                            Nuestras velas de soja se realizan a pedido con el diseño, aroma y colores que vos elijas.
                        </p>
                        <p className="text-isaroma-primary font-bold">
                            Escribinos por WhatsApp para crear tu combinación ideal.
                        </p>
                    </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-8 border-t border-isaroma-card-border">
                    <div className="flex items-center border border-isaroma-card-border rounded-xl bg-isaroma-cream">
                        <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-5 py-3 text-isaroma-text-secondary hover:text-isaroma-primary transition-colors font-bold text-lg"
                        >-</button>
                        <span className="px-5 font-bold text-isaroma-text-main text-lg min-w-[3rem] text-center">{quantity}</span>
                        <button 
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-5 py-3 text-isaroma-text-secondary hover:text-isaroma-primary transition-colors font-bold text-lg"
                        >+</button>
                    </div>
                    <button 
                        onClick={handleAddToCart}
                        className="flex-1 bg-isaroma-primary hover:bg-isaroma-primary-hover text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 tracking-wide hover:-translate-y-1"
                    >
                        <ShoppingBag size={22} strokeWidth={2.5} />
                        Agregar al Carrito
                    </button>
                </div>
              )}

              {/* Info Adicional */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-isaroma-card-border">
                <div className="flex items-center gap-3 text-sm text-isaroma-text-secondary">
                    <div className="p-2 bg-isaroma-pink-light/30 rounded-full text-isaroma-primary">
                        <Truck size={18} />
                    </div>
                    <span>Envíos a todo el país</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-isaroma-text-secondary">
                    <div className="p-2 bg-isaroma-pink-light/30 rounded-full text-isaroma-primary">
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
