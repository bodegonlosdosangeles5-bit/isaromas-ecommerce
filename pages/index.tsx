import Head from 'next/head';
import Link from 'next/link';
import NextImage from 'next/image';
import { Geist, Geist_Mono } from "next/font/google";
import { Sparkles, Palette, Clock, Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import productsData from '@/data/products.json';
import { useCart } from '@/context/CartContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  // Simulating best sellers by taking the first 3 products
  const bestSellers = productsData.slice(0, 3);
  const { toggleCart, totalItems } = useCart();

  return (
    <div className={`${geistSans.className} ${geistMono.className} min-h-screen flex flex-col bg-white font-sans`}>
      <Head>
        <title>ISAROMAS | Esencias que iluminan</title>
        <meta name="description" content="Velas de soja, difusores y esencias artesanales personalizadas." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar Placeholder (Simple) */}
      <nav className="absolute top-0 left-0 w-full z-10 p-6 flex justify-between items-center">
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
        <div className="flex items-center gap-6">
            <Link href="/catalogo" className="text-gray-600 hover:text-isaromas-pink font-medium transition-colors">
            Catálogo
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
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center bg-isaromas-cream/30 overflow-hidden">
           {/* Abstract Background Shapes */}
           <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-isaromas-pink/20 rounded-full blur-3xl"></div>
           <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-isaromas-cream rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-white border border-isaromas-pink/30 text-isaromas-pink text-sm font-semibold mb-6 tracking-wide uppercase">
              Artesanal & Hecho a Mano
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 tracking-tight leading-tight">
              Iluminá tus momentos con <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">esencias únicas</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Creamos velas de soja y aromas personalizados que transforman tu hogar en un refugio de paz y armonía.
            </p>
            <Link 
              href="/catalogo" 
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Comprar Ahora <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="py-20 px-4 container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Más Vendidos</h2>
            <p className="text-gray-500">Los favoritos de nuestra comunidad</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/catalogo" className="text-isaromas-pink font-semibold hover:text-pink-400 transition-colors border-b-2 border-isaromas-pink pb-1">
              Ver todos los productos
            </Link>
          </div>
        </section>

        {/* Customization / Info Section */}
        <section className="py-20 bg-isaromas-gray/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Personalizá tu Pedido</h2>
              <p className="text-lg text-gray-600">
                Cada producto es creado especialmente para vos. Elegí el aroma, el color y el envase que más te guste.
                Debido a nuestro proceso artesanal, los pedidos tienen una demora de producción de <span className="font-bold text-gray-800">1 a 5 días hábiles</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Sparkles, title: "Calidad Premium", desc: "Cera de soja 100% natural y esencias puras." },
                { icon: Palette, title: "Personalizado", desc: "Elegí tus colores y aromas favoritos." },
                { icon: Clock, title: "Tiempo de Dedicación", desc: "Producción artesanal en 1-5 días." },
                { icon: Heart, title: "Hecho con Amor", desc: "Cada pieza es única y hecha a mano." },
              ].map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-isaromas-pink/20 text-isaromas-pink rounded-xl mb-6">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
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
