import { formatPrice } from './formatPrice';

export const generateQueryMessage = () => {
  return encodeURIComponent("Hola 👋, quiero hacer una consulta sobre los productos de ISAROMAS.");
};

export const generateCartMessage = (items: any[], totalPrice: number) => {
  let message = `*Hola ISAROMA! Quiero realizar el siguiente pedido:*\n\n`;
  
  items.forEach(item => {
    message += `• ${item.quantity}x ${item.product.name}`;
    if (item.variant) {
      const variantDetails = [
          item.variant.aroma,
          item.variant.color,
          item.variant.size
      ].filter(Boolean).join(', ');
      message += ` (${variantDetails})`;
    }
    message += ` - ${formatPrice(item.product.price * item.quantity)}\n`;
  });

  message += `\n*Total: ${formatPrice(totalPrice)}*\n\n`;
  
  return message;
};
