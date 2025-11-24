import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ShoppingCart, Star, Truck, ShieldCheck } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import productsData from '@/data/products.json';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart, toggleCart, totalItems } = useCart();

  const product = productsData.find(p => p.id === id);

  const [selectedVariant, setSelectedVariant] = useState<{
    aroma: string;
    color?: string;
    size?: string;
    gender?: string;
  } | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Initialize default variant when product loads
  React.useEffect(() => {
    if (product && product.variants.length > 0 && !selectedVariant) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product, selectedVariant]);

  if (!router.isReady) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Producto no encontrado</div>;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant || undefined);
    // Optional: Show toast notification
    // alert('Producto agregado al carrito'); 
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-rose-50/20 to-pink-50/10">
      <Head>
        <title>{product.name} | ISAROMAS</title>
        <meta name="description" content={product.description} />
      </Head>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 pt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Image Section Mejorado */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-isaromas-gray/40 to-isaromas-pink/10 rounded-3xl overflow-hidden relative group shadow-2xl border border-gray-100">
               <div className="absolute inset-0 flex items-center justify-center">
                 <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.classList.add('bg-gradient-to-br', 'from-isaromas-pink/20', 'to-isaromas-cream/30');
                    }}
                />
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4 flex items-center gap-3 flex-wrap">
                <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                    {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-yellow-400 bg-yellow-50 px-3 py-1 rounded-full">
                    <Star size={16} fill="currentColor" />
                    <span className="text-xs font-bold text-gray-700">4.9</span>
                    <span className="text-xs font-medium text-gray-500">(120 reseñas)</span>
                </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-8">
              ${product.price.toLocaleString()}
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-10 font-light">
              {product.description}
            </p>

            {/* Variants Mejorado */}
            <div className="mb-10">
              <h3 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wide">Variantes Disponibles</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-300
                      ${selectedVariant === variant 
                        ? 'border-pink-500 bg-gradient-to-r from-pink-500 to-rose-500 text-white ring-2 ring-pink-300 shadow-lg scale-105' 
                        : 'border-gray-200 text-gray-700 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600 hover:scale-105'
                      }
                    `}
                  >
                    {variant.aroma} 
                    {'color' in variant && variant.color ? ` - ${variant.color}` : ''} 
                    {'size' in variant && variant.size ? ` - ${variant.size}` : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart Mejorado */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
               <div className="flex items-center border-2 border-gray-200 rounded-xl w-fit overflow-hidden shadow-sm">
                  <button 
                    className="px-5 py-3.5 text-gray-700 hover:bg-gray-50 font-bold text-lg transition-colors duration-200"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Disminuir cantidad"
                  >-</button>
                  <span className="px-6 font-bold text-gray-900 text-lg min-w-[3rem] text-center">{quantity}</span>
                  <button 
                    className="px-5 py-3.5 text-gray-700 hover:bg-gray-50 font-bold text-lg transition-colors duration-200"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Aumentar cantidad"
                  >+</button>
               </div>

               <button 
                 onClick={handleAddToCart}
                 className="group flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-xl font-bold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:shadow-pink-500/40 hover:scale-105 flex items-center justify-center gap-3 text-lg"
               >
                 <ShoppingCart size={22} className="transition-transform group-hover:scale-110" />
                 Agregar al Carrito
               </button>
            </div>

            {/* Additional Info Mejorado */}
            <div className="space-y-5 border-t border-gray-200 pt-8">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                    <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-xl shadow-lg">
                        <Truck size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-1">Producto Artesanal</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">Se fabrica a pedido. Demora de producción: <span className="font-semibold">1-5 días hábiles</span>.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                    <div className="p-3 bg-gradient-to-br from-blue-400 to-cyan-500 text-white rounded-xl shadow-lg">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-1">Compra Segura</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">Garantía de calidad en todos nuestros productos.</p>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
