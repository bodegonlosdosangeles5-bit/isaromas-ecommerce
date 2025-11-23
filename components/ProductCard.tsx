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
    <Link href={`/productos/${product.id}`} className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 block">
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-isaromas-gray/30">
        {/* Placeholder for image if not available or using next/image later */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            {/* In a real app, use next/image here. For now, a colored placeholder or the img tag if valid URL */}
            <img 
                src={product.image} 
                alt={product.name} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.classList.add('bg-isaromas-pink/20');
                }}
            />
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-600 shadow-sm">
            {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-pink-500 transition-colors">
            {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </span>
          
          <button 
            className="flex items-center gap-2 bg-isaromas-pink hover:bg-pink-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors shadow-sm hover:shadow active:scale-95"
            aria-label="Ver producto"
          >
            <ShoppingCart size={18} />
            <span>Ver</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
