import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

interface ProductVariant {
  aroma: string;
  color?: string;
  size?: string;
  gender?: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  variants: ProductVariant[];
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/productos/${product.id}`} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-2 hover:border-isaromas-pink/40 block">
      {/* Image Container Mejorado */}
      <div className="relative h-72 w-full overflow-hidden bg-gradient-to-br from-isaromas-gray/40 to-isaromas-pink/10">
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
        {/* Overlay sutil en hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        {/* Badge de categoría mejorado */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border-2 border-white/50">
            {product.category}
        </div>
      </div>

      {/* Content Mejorado */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-rose-500 transition-all duration-300">
            {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-5 line-clamp-2 leading-relaxed">
            {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-extrabold text-gray-900">
              ${product.price.toLocaleString()}
            </span>
          </div>
          
          <button 
            className="group/btn flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
            aria-label="Ver producto"
            onClick={(e) => e.preventDefault()}
          >
            <ShoppingCart size={18} className="transition-transform group-hover/btn:scale-110" />
            <span>Ver</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
