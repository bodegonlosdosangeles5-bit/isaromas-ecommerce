import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NextImage from 'next/image';
import { ShoppingCart, ArrowLeft, Star, Truck, ShieldCheck, ShoppingBag } from 'lucide-react';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import productsData from '@/data/products.json';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart, toggleCart, totalItems } = useCart();

  const product = productsData.find(p => p.id === id);

  const [selectedVariant, setSelectedVariant] = useState<any>(null);
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
    addToCart(product, quantity, selectedVariant);
    // Optional: Show toast notification
    // alert('Producto agregado al carrito'); 
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Head>
        <title>{product.name} | ISAROMAS</title>
        <meta name="description" content={product.description} />
      </Head>

      {/* Navbar (Simple) */}
      <nav className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <NextImage 
              src="/isaromas_logo.png" 
              alt="Logo ISAROMAS" 
              width={150} 
              height={50} 
              className="object-contain"
              priority
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/catalogo" className="text-gray-600 hover:text-isaromas-pink flex items-center gap-1">
                <ArrowLeft size={18} /> Volver
            </Link>
            <button 
                onClick={toggleCart}
                className="relative text-gray-600 hover:text-isaromas-pink transition-colors"
            >
                <ShoppingBag size={24} />
                {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-isaromas-pink text-gray-800 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {totalItems}
                    </span>
                )}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square bg-isaromas-gray/30 rounded-2xl overflow-hidden relative group">
               {/* Placeholder for main image */}
               <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                 <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.classList.add('bg-isaromas-pink/20');
                    }}
                />
               </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-2 flex items-center gap-2">
                <span className="bg-isaromas-pink/20 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    {product.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-medium text-gray-500">4.9 (120 reseñas)</span>
                </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-gray-900 mb-6">${product.price.toLocaleString()}</p>
            
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Variants */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Variantes Disponibles</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all
                      ${selectedVariant === variant 
                        ? 'border-isaromas-pink bg-isaromas-pink/10 text-pink-700 ring-1 ring-isaromas-pink' 
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    {variant.aroma} 
                    {'color' in variant && variant.color ? `- ${variant.color}` : ''} 
                    {'size' in variant && variant.size ? `- ${variant.size}` : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
               <div className="flex items-center border border-gray-200 rounded-lg w-fit">
                  <button 
                    className="px-4 py-3 text-gray-600 hover:bg-gray-50"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >-</button>
                  <span className="px-4 font-medium text-gray-900">{quantity}</span>
                  <button 
                    className="px-4 py-3 text-gray-600 hover:bg-gray-50"
                    onClick={() => setQuantity(quantity + 1)}
                  >+</button>
               </div>

               <button 
                 onClick={handleAddToCart}
                 className="flex-1 bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
               >
                 <ShoppingCart size={20} />
                 Agregar al Carrito
               </button>
            </div>

            {/* Additional Info */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg mt-1">
                        <Truck size={18} />
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900">Producto Artesanal</h4>
                        <p className="text-sm text-gray-500">Se fabrica a pedido. Demora de producción: 1-5 días hábiles.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mt-1">
                        <ShieldCheck size={18} />
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900">Compra Segura</h4>
                        <p className="text-sm text-gray-500">Garantía de calidad en todos nuestros productos.</p>
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
