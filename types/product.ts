export interface ProductVariant {
  aroma: string;
  color?: string;
  size?: string;
  gender?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  benefits?: string[];
  imageFit?: "contain" | "cover";
  variants: ProductVariant[];
  image: string;
  tags?: string[];
}

/**
 * Normalizes a product from JSON to ensure type safety
 */
export function normalizeProduct(product: any): Product {
  return {
    ...product,
    imageFit: product.imageFit === "contain" ? "contain" : product.imageFit === "cover" ? "cover" : undefined,
  };
}
